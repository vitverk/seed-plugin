import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, rm, readFile, writeFile, symlink, utimes } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { defaultRoot, validate, safePath } from '../scripts/validate.mjs';
import { buildPackage } from '../scripts/package.mjs';
import { parseRpcResponse } from '../scripts/rpc.mjs';
import YAML from 'yaml';
import { createMetadataValidator, decodeDocument, canonicalBody, bodyHash } from '../scripts/document-metadata.mjs';

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
test('lockfile root versions stay aligned with the released package', async t => {
  const root = await fixture(t);
  const original = await readFile(join(root, 'package-lock.json'), 'utf8');
  for (const modify of [data => { data.version = '99.0.0'; }, data => { data.packages[''].version = '99.0.0'; }]) {
    await alter(root, 'package-lock.json', modify);
    await assert.rejects(validate(root, { quiet: true }), /package-lock.json.*version drift/);
    await writeFile(join(root, 'package-lock.json'), original);
  }
});
test('release packaging rejects extra archived material in the skills directory', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'skills/manage-calendar/references/archive.md'), '# Earlier calendar research\n');
  await assert.rejects(buildPackage(root, { quiet: true }), /only the guest workflows and calendar reference/);
});
test('release packaging rejects archived research or app control inside allowed skill files', async t => {
  const root = await fixture(t);
  const replacements = [
    ['skills/manage-calendar/references/seed-calendar.md', '# Native-game research\nhttps://klang-games.eu.theymes.com/hc/en/seed\n'],
    ['skills/manage-calendar/SKILL.md', '\nOpen the app with cua.getApp("com.Klang.Seed").\n'],
  ];
  for (const [path, forbidden] of replacements) {
    const original = await readFile(join(root, path), 'utf8');
    await writeFile(join(root, path), original + forbidden);
    await assert.rejects(buildPackage(root, { quiet: true }), /Native app control or archived research/);
    await writeFile(join(root, path), original);
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
test('documentation inventory rejects an omitted source article', async t => {
  const root = await fixture(t);
  await rm(join(root, 'skills/seed-building/references/access-rights-317.md'));
  await assert.rejects(validate(root, { quiet: true }), /coverage differs|not packaged/);
});
test('documentation content remains tied to its source digest', async t => {
  const root = await fixture(t);
  const path = join(root, 'skills/seed-building/references/access-rights-317.md');
  await writeFile(path, `${await readFile(path, 'utf8')}\nA changed rule without refreshed provenance.\n`);
  await assert.rejects(validate(root, { quiet: true }), /content hash mismatch/);
});
test('transport parser handles JSON and SSE while selecting the correct request', () => {
  const reply = { jsonrpc: '2.0', id: 2, result: { ok: true } };
  assert.deepEqual(parseRpcResponse(JSON.stringify(reply), 'application/json', 2), reply);
  assert.deepEqual(parseRpcResponse(`: heartbeat\r\n\r\ndata: {"jsonrpc":"2.0","method":"notice"}\r\n\r\nevent: message\r\ndata: ${JSON.stringify(reply)}\r\n\r\n`, 'text/event-stream', 2), reply);
  assert.throws(() => parseRpcResponse(JSON.stringify(reply), 'application/json', 3), /No JSON-RPC response/);
});

async function alterDocument(root, path, modify, { mirrorInventory = false } = {}) {
  const fullPath = join(root, path);
  const source = await readFile(fullPath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match);
  const metadata = YAML.parse(match[1]);
  modify(metadata);
  await writeFile(fullPath, `---\n${YAML.stringify(metadata)}---\n${source.slice(match[0].length)}`);
  if (mirrorInventory) await alter(root, 'sources/documentation-inventory.json', inventory => {
    const entry = inventory.documents.find(item => item.path === path);
    assert.ok(entry);
    entry.metadata = metadata;
  });
}
const importedManualPath = 'skills/seed-reference-library/references/library/manual-farming-and-crops.md';
test('all references use the shared schema and canonical body hashing', async () => {
  const schema = JSON.parse(await readFile(join(defaultRoot, 'schemas/document-metadata.schema.json'), 'utf8'));
  const check = createMetadataValidator(schema);
  const text = await readFile(join(defaultRoot, importedManualPath), 'utf8');
  const parsed = decodeDocument(text, importedManualPath, check);
  assert.equal(parsed.metadata.source_url, null);
  assert.equal(parsed.metadata.verification_status, 'unverified_reference');
  assert.equal(parsed.metadata.content_hash, bodyHash(parsed.body));
  assert.equal(canonicalBody('\r\n  \r\n# Topic\r\n\r\nBody.\r\n\r\n'), '# Topic\n\nBody.\n');
  assert.deepEqual(decodeDocument(text.replaceAll('\n', '\r\n'), importedManualPath, check), parsed);
});
test('missing imported source document cannot pass inventory coverage', async t => {
  const root = await fixture(t);
  await rm(join(root, importedManualPath));
  await assert.rejects(validate(root, { quiet: true }), /not packaged/);
});
test('archive metadata cannot invent source URLs or current-game verification', async t => {
  const root = await fixture(t);
  const original = await readFile(join(root, importedManualPath), 'utf8');
  for (const [modify, expected] of [
    [metadata => { metadata.source_url = 'https://example.com/fake-source'; }, /no public source URL/],
    [metadata => { metadata.retrieved_at = '2026-10-27T00:00:00Z'; }, /must not invent a retrieval date/],
    [metadata => { metadata.verification_status = 'source_snapshot'; }, /Archive verification/],
    [metadata => { metadata.source_type = 'help_center'; }, /Archive provenance kind/],
  ]) {
    await alterDocument(root, importedManualPath, modify);
    await assert.rejects(validate(root, { quiet: true }), expected);
    await writeFile(join(root, importedManualPath), original);
  }
});
test('shared metadata schema rejects unknown fields and missing provenance', async t => {
  const root = await fixture(t);
  const original = await readFile(join(root, importedManualPath), 'utf8');
  for (const modify of [metadata => { metadata.unknown_metadata = 'unreviewed'; }, metadata => { delete metadata.source_path; }, metadata => { metadata.imported_at = 'not-a-timestamp'; }]) {
    await alterDocument(root, importedManualPath, modify);
    await assert.rejects(validate(root, { quiet: true }), /invalid document metadata/);
    await writeFile(join(root, importedManualPath), original);
  }
});
test('document identities and canonical source metadata cannot drift silently', async t => {
  const root = await fixture(t);
  const original = await readFile(join(root, importedManualPath), 'utf8');
  await alterDocument(root, importedManualPath, metadata => { metadata.id = 'seed-help-center:article:317'; });
  await assert.rejects(validate(root, { quiet: true }), /Duplicate documentation ID/);
  await writeFile(join(root, importedManualPath), original);
  await alterDocument(root, importedManualPath, metadata => { metadata.title = 'Changed source title'; });
  await assert.rejects(validate(root, { quiet: true }), /differs from canonical inventory/);
});
test('known source conflicts remain resolvable and symmetric', async t => {
  const root = await fixture(t);
  await alterDocument(root, importedManualPath, metadata => { metadata.conflicts_with = []; }, { mirrorInventory: true });
  await assert.rejects(validate(root, { quiet: true }), /conflict must be symmetric/);
  await alterDocument(root, 'skills/seed-building/references/farming-310.md', metadata => { metadata.conflicts_with = []; }, { mirrorInventory: true });
  await assert.rejects(validate(root, { quiet: true }), /Known source conflict must remain recorded/);
});
test('archive code cannot enter the packaged reference skill', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'skills/seed-reference-library/references/AgentPlayApi.cs'), '// Not part of the documentation corpus.\n');
  await assert.rejects(buildPackage(root, { quiet: true }), /no archive code or configuration/);
});
test('source paths stay relative and source conflicts cannot reference themselves', async t => {
  const root = await fixture(t);
  const original = await readFile(join(root, importedManualPath), 'utf8');
  const inventoryPath = join(root, 'sources/documentation-inventory.json');
  const originalInventory = await readFile(inventoryPath, 'utf8');
  for (const sourcePath of ['/tmp/external.md', 'tools/agent-play-api/../../external.md', 'tools\\agent-play-api\\library\\manual.md']) {
    await alterDocument(root, importedManualPath, metadata => { metadata.source_path = sourcePath; }, { mirrorInventory: true });
    await assert.rejects(validate(root, { quiet: true }), /source[_ ]?path|relative|traversal/i);
    await writeFile(join(root, importedManualPath), original);
    await writeFile(inventoryPath, originalInventory);
  }
  await alterDocument(root, importedManualPath, metadata => { metadata.imported_at = '2026-02-30T00:00:00Z'; }, { mirrorInventory: true });
  await assert.rejects(validate(root, { quiet: true }), /invalid document metadata/);
  await writeFile(join(root, importedManualPath), original);
  await writeFile(inventoryPath, originalInventory);
  await alterDocument(root, importedManualPath, metadata => { metadata.conflicts_with.push(metadata.id); }, { mirrorInventory: true });
  await assert.rejects(validate(root, { quiet: true }), /self|own.*conflict/i);
});
