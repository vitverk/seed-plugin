import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, rm, readFile, writeFile, symlink, utimes, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { defaultRoot, validate, validateLivePackage, validateApiPackage, packageFiles, safePath } from '../scripts/validate.mjs';
import { buildPackage, buildLivePackage, buildApiPackage } from '../scripts/package.mjs';
import { parseRpcResponse } from '../scripts/rpc.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'seed-plugin-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(defaultRoot, root, { recursive: true, filter: path => !/(?:^|\/)(?:\.git|node_modules|dist)(?:\/|$)/.test(path) });
  return root;
}
async function alter(root, path, modify) {
  const data = JSON.parse(await readFile(join(root, path), 'utf8'));
  modify(data);
  await writeFile(join(root, path), `${JSON.stringify(data, null, 2)}\n`);
}
async function syntheticSubmission(t) {
  // Test-only declarations in a disposable directory. These are not actual policies,
  // license grants, commerce declarations, country targeting or review evidence.
  const root = await fixture(t);
  const privacy = 'https://example.invalid/test-only/privacy';
  const terms = 'https://example.invalid/test-only/terms';
  await alter(root, 'plugin.json', data => {
    data.license = 'LicenseRef-TestOnly';
    const openai = data.extensions['com.openai'];
    Object.assign(openai.interface, { privacyPolicyURL: privacy, termsOfServiceURL: terms });
    Object.assign(openai.review, { demo_recording_url: 'https://example.invalid/test-only/demo', commerce: false });
    openai.publication.countries = ['IS', 'US'];
  });
  await alter(root, '.codex-plugin/plugin.json', data => {
    Object.assign(data.interface, { privacyPolicyURL: privacy, termsOfServiceURL: terms });
  });
  await alter(root, '.claude-plugin/plugin.json', data => {
    for (const key of ['documentationUrl', 'supportUrl', 'privacyPolicyUrl', 'termsOfServiceUrl', 'license']) delete data[key];
  });
  await alter(root, 'submission/readiness.json', data => {
    for (const check of data.checks) {
      check.status = 'passed';
      check.detail = 'Test-only synthetic evidence; never publish this fixture.';
    }
  });
  return { root, privacy, terms };
}
async function completeSyntheticClaude({ root, privacy, terms }) {
  await alter(root, '.claude-plugin/plugin.json', data => Object.assign(data, {
    documentationUrl: 'https://example.invalid/test-only/docs',
    supportUrl: 'https://example.invalid/test-only/support',
    privacyPolicyUrl: privacy,
    termsOfServiceUrl: terms,
    license: 'LicenseRef-TestOnly',
  }));
}
test('release archive is deterministic and contains only allowlisted plugin files', async t => {
  const root = await fixture(t);
  const first = await buildPackage(root, { quiet: true });
  await utimes(join(root, 'plugin.json'), new Date(), new Date());
  const second = await buildPackage(root, { quiet: true });
  assert.equal(first.sha256, second.sha256);
  assert.ok(first.files.includes('.claude-plugin/plugin.json'));
  assert.ok(!first.files.some(path => /marketplace\.json|^submission\/|^scripts\/|^tests\/|^schemas\/|^sources\/|^\.github\//.test(path)));
});
test('private app binding in a shadowed compatibility manifest is rejected', async t => {
  const root = await fixture(t);
  await alter(root, '.codex-plugin/plugin.json', data => { data.apps = './.app.json'; });
  await assert.rejects(validate(root, { quiet: true }), /apps binding/);
});
test('root private app file cannot be hidden by the package allowlist', async t => {
  const root = await fixture(t);
  await writeFile(join(root, '.app.json'), '{}');
  await assert.rejects(validate(root, { quiet: true }), /must not contain \.app\.json/);
});
test('version drift across clients fails validation', async t => {
  const root = await fixture(t);
  await alter(root, '.claude-plugin/plugin.json', data => { data.version = '99.0.0'; });
  await assert.rejects(validate(root, { quiet: true }), /version drift/);
});
test('marketplace live connection cannot silently point at the guest or direct upstream', async t => {
  const root = await fixture(t);
  const path = 'plugins/seed-live/mcp.json';
  const original = await readFile(join(root, path), 'utf8');
  for (const url of ['https://mcp.flaxa.app/demo/mcp', 'https://mcp.flaxa.app/live/mcp', 'https://mcp.flaxa.app/staging/mcp', 'https://api.seed-universe.com/seed-api/staging-mcp-dev/mcp']) {
    await alter(root, path, data => { data.mcpServers.seed_live.url = url; });
    await assert.rejects(validate(root, { quiet: true }), /proxy canonical URL/);
    await writeFile(join(root, path), original);
  }
});
test('marketplace keeps all installed identities and self-contained live assets', async t => {
  const root = await fixture(t);
  await alter(root, '.agents/plugins/marketplace.json', data => { data.plugins.pop(); });
  await assert.rejects(validate(root, { quiet: true }), /preserve the demo/);
  const live = JSON.parse(await readFile(join(root, 'plugins/seed-live/plugin.json'), 'utf8'));
  assert.equal(live.extensions['com.openai'].interface.displayName, 'SEED Live');
  assert.ok((await readFile(join(root, 'plugins/seed-live/assets/icon.png'))).length > 0);
});
test('Demo and Live archives contain zero skills and reject reintroduced skill folders', async t => {
  const root = await fixture(t);
  for (const [kind, prefix, build] of [['demo', '', buildPackage], ['live', 'plugins/seed-live', buildLivePackage]]) {
    const archive = await build(root, { quiet: true });
    assert.deepEqual(archive.files.filter(path => /(^|\/)skills(\/|$)|(^|\/)SKILL\.md$/.test(path)), []);
    assert.deepEqual(archive.files, await packageFiles(join(root, prefix), { kind }));
    assert.ok(!archive.files.some(path => /^(sources|knowledge|schemas|scripts|tests|plugins)\//.test(path)));
    const skills = join(root, prefix, 'skills');
    await mkdir(skills);
    await assert.rejects(build(root, { quiet: true }), /must not bundle a skills directory/);
    await rm(skills, { recursive: true });
    const misplaced = join(root, prefix, 'assets/SKILL.md');
    await writeFile(misplaced, '# Misplaced skill\n');
    await assert.rejects(build(root, { quiet: true }), /must not bundle skill files in assets/);
    await rm(misplaced);
  }
});
test('Demo and Live manifests reject skill declarations and onboarding bindings', async t => {
  const root = await fixture(t);
  for (const prefix of ['', 'plugins/seed-live/']) {
    for (const suffix of ['plugin.json', '.codex-plugin/plugin.json', '.claude-plugin/plugin.json']) {
      const path = `${prefix}${suffix}`;
      const original = await readFile(join(root, path), 'utf8');
      await alter(root, path, data => { data.skills = './skills/'; });
      await assert.rejects(validate(root, { quiet: true }), /must not declare|cannot declare root skills|manifest schema|does not match Agent Plugins/);
      await writeFile(join(root, path), original);
      await alter(root, path, data => {
        data.extensions ??= {};
        data.extensions['com.openai'] ??= {};
        data.extensions['com.openai'].onboardingSkill = './skills/onboarding/SKILL.md';
      });
      await assert.rejects(validate(root, { quiet: true }), /must not declare an onboarding skill/);
      await writeFile(join(root, path), original);
    }
  }
});
test('lockfile root versions stay aligned with the released package', async t => {
  const root = await fixture(t);
  const original = await readFile(join(root, 'package-lock.json'), 'utf8');
  for (const modify of [data => { data.version = '99.0.0'; }, data => { data.packages[''].version = '99.0.0'; }]) {
    await alter(root, 'package-lock.json', modify);
    await assert.rejects(validate(root, { quiet: true }), /package-lock.json.*version drift/);
    await writeFile(join(root, 'package-lock.json'), original);
  }
});
test('portable MCP configuration is checked against the official schema', async t => {
  const root = await fixture(t);
  await alter(root, 'mcp.json', data => { data.mcpServers.seed.unrecognized = true; });
  await assert.rejects(validate(root, { quiet: true }), /does not match Agent Plugins/);
});
test('submission readiness cannot be bypassed with missing, empty or malformed checks', async t => {
  const root = await fixture(t);
  for (const value of [{ ready: true }, { ready: true, checks: [] }, { checks: [null] }]) {
    await writeFile(join(root, 'submission/readiness.json'), JSON.stringify(value));
    await assert.rejects(validate(root, { submission: true, quiet: true }), /Readiness checks must/);
  }
  await validate(root, { quiet: true }); // Incomplete evidence does not prevent a technical package.
});
test('submission requires independent Claude metadata and matching policy URLs', async t => {
  const synthetic = await syntheticSubmission(t);
  const { root, privacy, terms } = synthetic;
  await assert.rejects(validate(root, { submission: true, quiet: true }), error => {
    for (const field of ['documentationUrl', 'supportUrl', 'privacyPolicyUrl', 'termsOfServiceUrl']) assert.match(error.message, new RegExp(`Claude manifest\\.${field}`));
    assert.match(error.message, /Claude manifest license/);
    return true;
  });
  await completeSyntheticClaude(synthetic);
  await validate(root, { submission: true, quiet: true });
  for (const [field, original] of [['privacyPolicyUrl', privacy], ['termsOfServiceUrl', terms]]) {
    await alter(root, '.claude-plugin/plugin.json', data => { data[field] = `${original}-different`; });
    await assert.rejects(validate(root, { submission: true, quiet: true }), /must reference the same URL/);
    await alter(root, '.claude-plugin/plugin.json', data => { data[field] = original; });
  }
  await alter(root, '.claude-plugin/plugin.json', data => { delete data.license; });
  await assert.rejects(validate(root, { submission: true, quiet: true }), /Claude manifest license/);
  await writeFile(join(root, 'LICENSE'), 'Test-only synthetic license file. No actual license grant.\n');
  await validate(root, { submission: true, quiet: true });
});
test('submission validates demo HTTPS, uppercase countries and applicable commerce details', async t => {
  const synthetic = await syntheticSubmission(t);
  await completeSyntheticClaude(synthetic);
  const { root } = synthetic;
  for (const url of ['/test-only/demo', 'http://example.invalid/test-only/demo']) {
    await alter(root, 'plugin.json', data => { data.extensions['com.openai'].review.demo_recording_url = url; });
    await assert.rejects(validate(root, { submission: true, quiet: true }), /Invalid URL|must use HTTPS/);
  }
  await alter(root, 'plugin.json', data => { data.extensions['com.openai'].review.demo_recording_url = 'https://example.invalid/test-only/demo'; });
  for (const countries of [['is'], ['USA'], [null]]) {
    await alter(root, 'plugin.json', data => { data.extensions['com.openai'].publication.countries = countries; });
    await assert.rejects(validate(root, { submission: true, quiet: true }), /two-letter uppercase/);
  }
  await alter(root, 'plugin.json', data => { data.extensions['com.openai'].publication.countries = []; });
  await validate(root, { submission: true, quiet: true });
  await alter(root, 'plugin.json', data => {
    data.extensions['com.openai'].review.commerce = true;
    data.extensions['com.openai'].review.commerce_description = ' ';
  });
  await assert.rejects(validate(root, { submission: true, quiet: true }), /Commerce description is required/);
  await alter(root, 'plugin.json', data => { data.extensions['com.openai'].review.commerce_description = 'Test-only commerce description; no real purchases.'; });
  await validate(root, { submission: true, quiet: true });
});
test('package rejects symbolic links and unresolved Git LFS assets', async t => {
  const root = await fixture(t);
  await symlink('/etc/hosts', join(root, 'assets/linked.txt'));
  await assert.rejects(validate(root, { quiet: true }), /Symlinks/);
  await rm(join(root, 'assets/linked.txt'));
  await writeFile(join(root, 'assets/pointer.txt'), 'version https://git-lfs.github.com/spec/v1\noid sha256:example\nsize 100\n');
  await assert.rejects(validate(root, { quiet: true }), /Git LFS pointer/);
});
test('referenced paths cannot escape the package root', () => {
  assert.throws(() => safePath(defaultRoot, './../private/icon.png'), /escapes/);
  assert.throws(() => safePath(defaultRoot, '/tmp/icon.png'), /prefixed/);
});
test('transport parser handles JSON and SSE while selecting the correct request', () => {
  const reply = { jsonrpc: '2.0', id: 2, result: { ok: true } };
  assert.deepEqual(parseRpcResponse(JSON.stringify(reply), 'application/json', 2), reply);
  assert.deepEqual(parseRpcResponse(`: heartbeat\r\n\r\ndata: {"jsonrpc":"2.0","method":"notice"}\r\n\r\nevent: message\r\ndata: ${JSON.stringify(reply)}\r\n\r\n`, 'text/event-stream', 2), reply);
  assert.throws(() => parseRpcResponse(JSON.stringify(reply), 'application/json', 3), /No JSON-RPC response/);
});

test('connected packages retain secret, symlink and private binding checks', async t => {
  const root = await fixture(t);
  for (const [prefix, validator] of [['plugins/seed-live', validateLivePackage], ['plugins/seed-api', validateApiPackage]]) {
    const manifest = `${prefix}/.codex-plugin/plugin.json`;
    const original = await readFile(join(root, manifest), 'utf8');
    await alter(root, manifest, data => { data.apps = './.app.json'; });
    await assert.rejects(validator(root), /apps binding/);
    await writeFile(join(root, manifest), original);
    const secret = join(root, prefix, 'assets/secret.txt');
    await writeFile(secret, '-----BEGIN PRIVATE KEY-----');
    await assert.rejects(validator(root), /Potential credential/);
    await rm(secret);
    const link = join(root, prefix, 'assets/link.txt');
    await symlink('/etc/hosts', link);
    await assert.rejects(validator(root), /Symlinks/);
    await rm(link);
  }
});
test('API skill allowlist still rejects missing and extra guidance', async t => {
  const root = await fixture(t);
  const required = join(root, 'plugins/seed-api/skills/seed-api/references/tools.md');
  const original = await readFile(required, 'utf8');
  await rm(required);
  await assert.rejects(validateApiPackage(root), /only its direct API guidance/);
  await writeFile(required, original);
  const extra = join(root, 'plugins/seed-api/skills/seed-api/extra.md');
  await writeFile(extra, '# Unreviewed guidance\n');
  await assert.rejects(validateApiPackage(root), /only its direct API guidance/);
});

// Keep the direct upstream connection distinct from both Flaxa packages.
test('direct API rejects proxy endpoints and produces an isolated archive', async t => {
  const root = await fixture(t);
  const path = 'plugins/seed-api/mcp.json';
  const original = await readFile(join(root, path), 'utf8');
  for (const url of ['https://mcp.flaxa.app/live/mcp', 'https://mcp.flaxa.app/demo/mcp']) {
    await alter(root, path, data => { data.mcpServers['seed-api'].url = url; });
    await assert.rejects(validate(root, { quiet: true }), /direct staging URL/);
    await writeFile(join(root, path), original);
  }
  const archive = await buildApiPackage(root);
  const manifest = JSON.parse(await readFile(join(root, 'plugins/seed-api/plugin.json'), 'utf8'));
  assert.ok(archive.output.endsWith(`seed-api-plugin-${manifest.version}.zip`));
  assert.ok(archive.files.includes('mcp.json'));
  assert.deepEqual(archive.files.filter(path => path.startsWith('skills/')), [
    'skills/seed-api/SKILL.md', 'skills/seed-api/references/tools.md',
  ]);
  assert.ok(!archive.files.some(path => /marketplace|seed-live|seedling-companion/.test(path)));
});
