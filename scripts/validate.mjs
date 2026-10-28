import assert from 'node:assert/strict';
import { readFile, readdir, lstat, access } from 'node:fs/promises';
import { resolve, relative, dirname, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import YAML from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';

export const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
export const endpoint = 'https://mcp.flaxa.app/demo/mcp';
const schemaBase = 'https://agent-plugins.org/schemas/1.0.0/';
const ignored = new Set(['.git', 'node_modules', 'dist']);
const apiSkillFiles = ['skills/seed-api/SKILL.md', 'skills/seed-api/references/events.md', 'skills/seed-api/references/tools.md'];
const categories = ['Business & Operations', 'Communication', 'Creativity', 'Data & Analytics', 'Developer Tools', 'Education & Research', 'Entertainment', 'Finance', 'Healthcare', 'Other', 'Productivity', 'Scientific Research', 'Security', 'Travel'];
export async function exists(path) { try { await access(path); return true; } catch { return false; } }
export async function json(root, path) { return JSON.parse(await readFile(resolve(root, path), 'utf8')); }
function object(value, label) { assert.ok(value && typeof value === 'object' && !Array.isArray(value), `${label} must be an object`); }
function text(value, label, max = Infinity) { assert.ok(typeof value === 'string' && value.trim() && value.length <= max, `${label} must be nonblank and at most ${max} characters`); }
function https(value, label) { text(value, label, 2048); const url = new URL(value); assert.equal(url.protocol, 'https:', `${label} must use HTTPS`); assert.ok(!url.username && !url.password, `${label} must not include credentials`); }
export function safePath(root, value) {
  assert.ok(typeof value === 'string' && value.startsWith('./') && !value.includes('\\'), `Expected ./-prefixed package path: ${value}`);
  const absolute = resolve(root, value);
  const rel = relative(root, absolute);
  assert.ok(rel !== '..' && !rel.startsWith(`..${sep}`) && !rel.startsWith(sep), `Path escapes plugin root: ${value}`);
  return absolute;
}
export async function walk(root, subdir = '') {
  const files = [];
  for (const entry of await readdir(resolve(root, subdir), { withFileTypes: true })) {
    if (!subdir && ignored.has(entry.name)) continue;
    const path = subdir ? `${subdir}/${entry.name}` : entry.name;
    assert.ok(!entry.isSymbolicLink(), `Symlinks are not allowed: ${path}`);
    assert.ok(!/(^|\/)(?:\.env(?:\..*)?|id_rsa|id_ed25519|\.DS_Store)$|\.(?:pem|key)$/i.test(path), `Credential or OS file is not allowed: ${path}`);
    assert.ok(path !== '.gitmodules', 'Submodules are not allowed in a self-contained plugin');
    if (entry.isDirectory()) files.push(...await walk(root, path));
    else if (entry.isFile()) files.push(path);
    else assert.fail(`Unsupported file type: ${path}`);
  }
  return files.sort();
}
function noAppBindings(value, path = 'manifest') {
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    assert.ok(!(key === 'apps' && item !== null), `Public upload cannot contain an apps binding: ${path}.${key}`);
    assert.ok(!['clientSecret', 'test_credentials', 'reviewer_instructions', 'access_token', 'refresh_token'].includes(key), `Secret/private review field is not allowed: ${path}.${key}`);
    if (typeof item === 'object') noAppBindings(item, `${path}.${key}`);
  }
}
function scanPublicText(content, path) {
  assert.ok(!content.startsWith('version https://git-lfs.github.com/spec/v1'), `Git LFS pointer must be resolved: ${path}`);
  assert.ok(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-proj-[A-Za-z0-9_-]{30,})/.test(content), `Potential credential in ${path}`);
  assert.ok(!/plugin_asdk_app_[a-f0-9]{20,}|asdk_app_[a-f0-9]{20,}/.test(content), `Private app binding identifier in package: ${path}`);
}
function noBundledSkills(manifest, label) {
  assert.ok(!('skills' in manifest), `${label} must not declare bundled skills`);
  assert.ok(!manifest.extensions?.['com.openai']?.onboardingSkill, `${label} must not declare an onboarding skill`);
}
export async function packageFiles(root = defaultRoot, { kind = 'demo' } = {}) {
  assert.ok(['demo', 'live', 'api'].includes(kind), 'Unknown package kind');
  const required = ['plugin.json', 'mcp.json', '.mcp.json', '.codex-plugin/plugin.json', '.claude-plugin/plugin.json', 'README.md'];
  if (kind === 'demo') required.push('SUPPORT.md');
  if (kind === 'api') required.push('CONNECTION.md');
  const selected = [...required];
  for (const path of required) assert.ok(await exists(resolve(root, path)), `Missing package file: ${path}`);
  assert.ok(await exists(resolve(root, 'assets')), 'Missing package directory: assets');
  selected.push(...await walk(root, 'assets'));
  if (kind === 'api') {
    assert.ok(await exists(resolve(root, 'skills')), 'API package requires its direct API guidance');
    const skills = await walk(root, 'skills');
    assert.deepEqual(skills, apiSkillFiles, 'API package must contain only its direct API guidance');
    selected.push(...skills);
  } else {
    assert.ok(!(await exists(resolve(root, 'skills'))), `${kind} package must not bundle a skills directory`);
    assert.ok(!selected.some(path => /(^|\/)skills(\/|$)|(^|\/)SKILL\.md$/.test(path)), `${kind} package must not bundle skill files in assets`);
  }
  if (await exists(resolve(root, 'LICENSE'))) selected.push('LICENSE');
  return selected.sort();
}
export async function validate(root = defaultRoot, { submission = false, quiet = false } = {}) {
  root = resolve(root);
  const all = await walk(root);
  assert.ok(!all.includes('.app.json'), 'Public source must not contain .app.json');
  const files = await packageFiles(root);
  assert.ok(files.length <= 512, 'Plugin must contain at most 512 files');
  let total = 0;
  for (const path of files) {
    const data = await readFile(resolve(root, path));
    const stat = await lstat(resolve(root, path));
    assert.ok(stat.isFile(), `Expected regular file: ${path}`);
    assert.ok(data.length <= 5 * 1024 * 1024, `File exceeds 5 MiB: ${path}`);
    total += data.length;
    assert.ok(!data.subarray(0, 64).toString('utf8').startsWith('version https://git-lfs.github.com/spec/v1'), `Git LFS pointer must be resolved: ${path}`);
    if (!/\.(?:png|jpe?g|webp|gif|ico)$/i.test(path)) {
      assert.ok(data.length <= 256 * 1024, `Text file exceeds 256 KiB: ${path}`);
      scanPublicText(data.toString('utf8'), path);
    }
  }
  assert.ok(total < 50 * 1024 * 1024, 'Plugin exceeds 50 MiB');
  const readme = await readFile(resolve(root, 'README.md'), 'utf8');
  assert.ok(readme.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length >= 40, 'Claude listing requires at least 40 prose words in README.md');
  const portable = await json(root, 'plugin.json');
  const codex = await json(root, '.codex-plugin/plugin.json');
  const claude = await json(root, '.claude-plugin/plugin.json');
  const npm = await json(root, 'package.json');
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  for (const [path, schema] of [['plugin.json', 'plugin.schema.json'], ['mcp.json', 'mcp.schema.json']]) {
    const check = ajv.compile(await json(root, `schemas/${schema}`));
    assert.ok(check(await json(root, path)), `${path} does not match Agent Plugins 1.0.0: ${ajv.errorsText(check.errors)}`);
  }
  assert.equal(portable.$schema, `${schemaBase}plugin.schema.json`);
  assert.equal(portable.name, 'seed');
  assert.match(portable.version, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/);
  for (const [label, manifest] of [['portable', portable], ['codex', codex], ['claude', claude]]) {
    object(manifest, label); noAppBindings(manifest, label); noBundledSkills(manifest, label);
    assert.equal(manifest.name, portable.name, `${label} identity drift`);
    assert.equal(manifest.version, portable.version, `${label} version drift`);
    text(manifest.description, `${label}.description`);
    if (manifest.homepage) https(manifest.homepage, `${label}.homepage`);
    if (manifest.repository) https(manifest.repository, `${label}.repository`);
  }
  assert.equal(npm.version, portable.version, 'package.json version drift');
  const lock = await json(root, 'package-lock.json');
  assert.equal(lock.version, portable.version, 'package-lock.json version drift');
  assert.equal(lock.packages?.['']?.version, portable.version, 'package-lock.json root package version drift');
  for (const key of ['skills', 'mcpServers', 'apps', 'interface']) assert.ok(!(key in portable), `Portable manifest cannot declare root ${key}`);
  const openai = portable.extensions?.['com.openai'];
  object(openai, 'extensions.com.openai');
  const ui = openai.interface;
  object(ui, 'OpenAI interface');
  for (const [key, max] of [['displayName', 30], ['shortDescription', 30], ['longDescription', 4000]]) text(ui[key], key, max);
  if (ui.developerName) text(ui.developerName, 'developerName', 80);
  assert.ok(categories.includes(ui.category), `Unsupported OpenAI category: ${ui.category}`);
  assert.ok(Array.isArray(ui.capabilities) && ui.capabilities.every(x => typeof x === 'string' && x.trim()), 'capabilities must be an array of strings');
  assert.deepEqual(codex.interface, ui, 'OpenAI compatibility presentation drift');
  for (const [key, value] of Object.entries(ui)) if (key.endsWith('URL')) https(value, key);
  for (const key of ['documentationUrl', 'supportUrl', 'privacyPolicyUrl', 'termsOfServiceUrl']) if (claude[key]) https(claude[key], key);
  const prompts = typeof ui.defaultPrompt === 'string' ? [ui.defaultPrompt] : ui.defaultPrompt ?? [];
  assert.ok(Array.isArray(prompts) && prompts.length <= 3, 'At most three starter prompts');
  for (const prompt of prompts) { text(prompt, 'starter prompt', 128); assert.ok(!/[\r\n]|@/.test(prompt), 'Starter prompts must be single-line without @mentions'); }
  assert.equal(new Set(prompts.map(x => x.trim().replace(/\s+/g, ' '))).size, prompts.length, 'Duplicate starter prompts');
  for (const key of ['brandColor', 'brandColorDark']) if (ui[key]) assert.match(ui[key], /^#[0-9a-fA-F]{6}$/);
  for (const [path, minimum] of [[ui.logo, 256], [ui.composerIcon, 48], ...(ui.logoDark ? [[ui.logoDark, 256]] : []), ...(ui.composerIconDark ? [[ui.composerIconDark, 48]] : [])]) {
    const icon = await readFile(safePath(root, path));
    assert.deepEqual(icon.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), `Icon must be PNG: ${path}`);
    assert.equal(icon.toString('ascii', 12, 16), 'IHDR');
    const width = icon.readUInt32BE(16), height = icon.readUInt32BE(20);
    assert.ok(width === height && width >= minimum && width <= 4096, `Invalid icon dimensions ${width}x${height}: ${path}`);
    assert.ok(files.includes(relative(root, safePath(root, path)).split(sep).join('/')), `Icon missing from package: ${path}`);
  }
  if (claude.icon) assert.ok(await exists(safePath(root, claude.icon)), 'Claude icon must exist');
  for (const path of ui.screenshots ?? []) assert.ok(files.includes(relative(root, safePath(root, path)).split(sep).join('/')), `Screenshot missing from package: ${path}`);
  const mcp = await json(root, 'mcp.json');
  assert.equal(mcp.$schema, `${schemaBase}mcp.schema.json`);
  noAppBindings(mcp, 'mcp');
  const legacy = await json(root, '.mcp.json');
  assert.deepEqual(Object.keys(mcp.mcpServers), ['seed']);
  assert.deepEqual(Object.keys(legacy.mcpServers), ['seed']);
  assert.equal(mcp.mcpServers.seed.type, 'streamable-http');
  assert.equal(legacy.mcpServers.seed.type, 'http');
  assert.equal(mcp.mcpServers.seed.url, endpoint);
  assert.equal(legacy.mcpServers.seed.url, endpoint);
  assert.ok(!legacy.mcpServers.seed.headers && !mcp.mcpServers.seed.headers, 'Anonymous endpoint must not include credential headers');
  assert.equal(codex.mcpServers, './.mcp.json');
  const aiMarket = await json(root, '.agents/plugins/marketplace.json');
  const claudeMarket = await json(root, '.claude-plugin/marketplace.json');
  for (const [label, market] of [['OpenAI', aiMarket], ['Claude', claudeMarket]]) {
    assert.equal(market.name, 'vitverk-seed', `${label} marketplace name`);
    assert.deepEqual(market.plugins.map(plugin => plugin.name), ['seed', 'seed-live', 'seed-api'], `${label} marketplace must preserve the demo, live proxy and direct API`);
    assert.equal(market.plugins[0].name, portable.name);
  }
  assert.equal(aiMarket.plugins[0].source.path, './');
  assert.equal(aiMarket.plugins[0].source.source, 'local');
  assert.ok(aiMarket.plugins[0].policy?.installation && aiMarket.plugins[0].policy?.authentication, 'OpenAI marketplace needs policies');
  assert.equal(claudeMarket.plugins[0].source, './');
  assert.equal(aiMarket.plugins[1].source.path, './plugins/seed-live');
  assert.equal(aiMarket.plugins[1].source.source, 'local');
  assert.equal(aiMarket.plugins[1].policy?.authentication, 'ON_INSTALL');
  assert.equal(claudeMarket.plugins[1].source, './plugins/seed-live');
  await validateLivePackage(root);
  assert.equal(aiMarket.plugins[2].source.path, './plugins/seed-api');
  assert.equal(aiMarket.plugins[2].source.source, 'local');
  assert.equal(aiMarket.plugins[2].policy?.authentication, 'ON_INSTALL');
  assert.equal(claudeMarket.plugins[2].source, './plugins/seed-api');
  await validateApiPackage(root);
  const review = openai.review;
  if (review?.test_cases) {
    const cases = review.test_cases;
    assert.equal(cases.positive?.length, 5, 'Exactly five positive MCP review cases');
    assert.equal(cases.negative?.length, 3, 'Exactly three negative MCP review cases');
    for (const item of [...cases.positive, ...cases.negative]) { text(item.description, 'Review description'); text(item.prompt, 'Review prompt'); }
    for (const item of cases.positive) { text(item.tools_triggered, 'Expected tools'); text(item.expected_behavior, 'Expected behavior'); }
  }
  if (submission) {
    const missing = [];
    for (const key of ['websiteURL', 'supportURL', 'privacyPolicyURL', 'termsOfServiceURL', 'developerName']) if (!ui[key]) missing.push(`OpenAI interface.${key}`);
    for (const key of ['documentationUrl', 'supportUrl', 'privacyPolicyUrl', 'termsOfServiceUrl']) {
      if (!claude[key]) missing.push(`Claude manifest.${key}`);
      else https(claude[key], `Claude manifest.${key}`);
    }
    for (const [openaiKey, claudeKey] of [['privacyPolicyURL', 'privacyPolicyUrl'], ['termsOfServiceURL', 'termsOfServiceUrl']]) {
      if (ui[openaiKey] && claude[claudeKey] && new URL(ui[openaiKey]).href !== new URL(claude[claudeKey]).href) {
        missing.push(`OpenAI ${openaiKey} and Claude ${claudeKey} must reference the same URL`);
      }
    }
    if (!review?.demo_recording_url) missing.push('Verified reviewer demo recording URL');
    else https(review.demo_recording_url, 'Reviewer demo recording URL');
    if (typeof review?.commerce !== 'boolean') missing.push('Owner-confirmed commerce declaration');
    if (review?.commerce === true && (typeof review.commerce_description !== 'string' || !review.commerce_description.trim())) missing.push('Commerce description is required when commerce is true');
    if (!Array.isArray(openai.publication?.countries)) missing.push('Owner-confirmed supported countries');
    else if (!openai.publication.countries.every(country => typeof country === 'string' && /^[A-Z]{2}$/.test(country))) missing.push('Countries must be two-letter uppercase codes; use [] explicitly for all countries');
    const hasLicenseFile = files.includes('LICENSE') && Boolean((await readFile(resolve(root, 'LICENSE'), 'utf8')).trim());
    const hasLicense = manifest => typeof manifest.license === 'string' && Boolean(manifest.license.trim());
    if (!hasLicense(portable) && !hasLicenseFile) missing.push('Owner-approved LICENSE file or portable manifest license');
    if (!hasLicense(claude) && !hasLicenseFile) missing.push('Owner-approved LICENSE file or Claude manifest license');
    if (!review?.test_cases) missing.push('Five positive and three negative MCP review cases');
    if (!(await exists(resolve(root, 'submission/readiness.json')))) missing.push('submission/readiness.json evidence');
    else {
      const readiness = await json(root, 'submission/readiness.json');
      if (!Array.isArray(readiness.checks) || readiness.checks.length === 0) {
        missing.push('Readiness checks must be a nonempty detailed checklist');
      } else {
        const expected = ['verified-publisher', 'privacy-policy', 'terms-of-service', 'license-and-brand-rights', 'countries', 'commerce', 'review-contact', 'recorded-demo', 'claude-screenshots', 'host-review-cases', 'portal-validation'];
        const seen = new Set();
        for (const item of readiness.checks) {
          if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !item.id.trim() || typeof item.detail !== 'string' || !item.detail.trim() || !['passed', 'pending', 'blocked', 'not_run'].includes(item.status)) {
            missing.push('Readiness checks must contain id, detail and a supported status');
            continue;
          }
          if (seen.has(item.id)) missing.push(`Duplicate readiness check: ${item.id}`);
          seen.add(item.id);
          if (item.status !== 'passed') missing.push(`${item.id}: ${item.detail}`);
        }
        for (const name of expected) if (!seen.has(name)) missing.push(`Missing readiness evidence: ${name}`);
      }
    }
    if (missing.length) throw new Error(`Submission is incomplete:\n- ${missing.join('\n- ')}`);
  }
  if (!quiet) console.log(`Validated Seed Demo ${portable.version}: ${files.length} package files, ${(total / 1024).toFixed(1)} KiB. ${submission ? 'Submission fields and recorded readiness passed.' : 'Package validation does not imply marketplace approval or submission readiness.'}`);
  return { root, files, manifest: portable, bytes: total };
}

export async function validateLivePackage(root = defaultRoot) {
  const liveRoot = resolve(root, 'plugins/seed-live');
  const all = await walk(liveRoot);
  assert.ok(!all.includes('.app.json'), 'Public source must not contain .app.json');
  const files = await packageFiles(liveRoot, { kind: 'live' });
  assert.deepEqual(all, files, 'Live package contains unexpected files');
  const portable = await json(liveRoot, 'plugin.json');
  const codex = await json(liveRoot, '.codex-plugin/plugin.json');
  const claude = await json(liveRoot, '.claude-plugin/plugin.json');
  const mcp = await json(liveRoot, 'mcp.json');
  const legacy = await json(liveRoot, '.mcp.json');
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const checkPlugin = ajv.compile(await json(root, 'schemas/plugin.schema.json'));
  assert.ok(checkPlugin(portable), `Live manifest schema: ${ajv.errorsText(checkPlugin.errors)}`);
  for (const manifest of [portable, codex, claude]) {
    noAppBindings(manifest);
    noBundledSkills(manifest, 'Live manifest');
    assert.equal(manifest.name, 'seed-live');
    assert.equal(manifest.version, portable.version, 'Live package version drift');
  }
  assert.match(portable.version, /^\d+\.\d+\.\d+$/);
  const ui = portable.extensions['com.openai'].interface;
  assert.equal(ui.displayName, 'SEED Live');
  assert.ok(ui.shortDescription.length <= 30);
  assert.deepEqual(codex.interface, ui);
  assert.equal(claude.displayName, 'SEED Live');
  assert.equal(codex.mcpServers, './.mcp.json');
  for (const key of ['logo', 'composerIcon']) {
    assert.ok(files.includes(relative(liveRoot, safePath(liveRoot, ui[key])).split(sep).join('/')), `Live icon missing: ${key}`);
  }
  assert.deepEqual(Object.keys(mcp.mcpServers), ['seed_live']);
  assert.deepEqual(Object.keys(legacy.mcpServers), ['seed_live']);
  const server = mcp.mcpServers.seed_live;
  assert.equal(server.url, 'https://mcp.flaxa.app/mcp', 'Live package must use the proxy canonical URL');
  assert.deepEqual(legacy.mcpServers.seed_live, { type: 'http', url: server.url });
  // Agent Plugins core schema excludes vendor extensions. Check the transport
  // against the core schema and validate the documented OpenAI auth separately.
  const coreMcp = structuredClone(mcp);
  delete coreMcp.mcpServers.seed_live.extensions;
  const checkMcp = ajv.compile(await json(root, 'schemas/mcp.schema.json'));
  assert.ok(checkMcp(coreMcp), `Live MCP schema: ${ajv.errorsText(checkMcp.errors)}`);
  assert.equal(server.type, 'streamable-http');
  assert.deepEqual(server.extensions, { 'com.openai': { auth: {
    type: 'oauth', client: { mode: 'dcr' }, resource: server.url,
    baseScopes: ['seed:profile:read', 'seed:character-information:read', 'seed:societies:read', 'seed:wallet:read', 'seed:staticdata:read', 'seed:developer', 'offline_access'],
  } } });
  for (const path of files) {
    const data = await readFile(resolve(liveRoot, path));
    assert.ok(data.length <= 5 * 1024 * 1024);
    if (!/\.(?:png|jpe?g|webp|gif|ico)$/i.test(path)) scanPublicText(data.toString('utf8'), path);
  }
  return { root: liveRoot, files, manifest: portable };
}

export async function validateApiPackage(root = defaultRoot) {
  const apiRoot = resolve(root, 'plugins/seed-api');
  const all = await walk(apiRoot);
  const files = await packageFiles(apiRoot, { kind: 'api' });
  assert.deepEqual(all, files, 'API package contains unexpected files');
  const portable = await json(apiRoot, 'plugin.json');
  const codex = await json(apiRoot, '.codex-plugin/plugin.json');
  const claude = await json(apiRoot, '.claude-plugin/plugin.json');
  const mcp = await json(apiRoot, 'mcp.json');
  const legacy = await json(apiRoot, '.mcp.json');
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const checkPlugin = ajv.compile(await json(root, 'schemas/plugin.schema.json'));
  assert.ok(checkPlugin(portable), `API manifest schema: ${ajv.errorsText(checkPlugin.errors)}`);
  for (const manifest of [portable, codex, claude]) {
    noAppBindings(manifest);
    assert.equal(manifest.name, 'seed-api');
    assert.equal(manifest.version, portable.version, 'API package version drift');
  }
  assert.match(portable.version, /^\d+\.\d+\.\d+$/);
  const ui = portable.extensions['com.openai'].interface;
  assert.equal(ui.displayName, 'SEED API');
  text(ui.shortDescription, 'API subtitle', 30);
  assert.deepEqual(codex.interface, ui);
  assert.equal(claude.displayName, ui.displayName);
  assert.equal(codex.mcpServers, './.mcp.json');
  assert.equal(codex.skills, './skills/');
  assert.deepEqual(files.filter(path => path.startsWith('skills/')), apiSkillFiles, 'API package must contain only its direct API guidance');
  const skill = await readFile(resolve(apiRoot, 'skills/seed-api/SKILL.md'), 'utf8');
  const frontmatter = YAML.parse(skill.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? '');
  assert.equal(frontmatter?.name, 'seed-api');
  text(frontmatter.description, 'API skill description');
  for (const key of ['logo', 'composerIcon']) {
    assert.ok(files.includes(relative(apiRoot, safePath(apiRoot, ui[key])).split(sep).join('/')), `API icon missing: ${key}`);
  }
  assert.deepEqual(Object.keys(mcp.mcpServers), ['seed-api']);
  const server = mcp.mcpServers['seed-api'];
  assert.equal(server.url, 'https://api.seed-universe.com/seed-api/staging-mcp-dev2/mcp', 'API package must use the direct staging URL');
  assert.equal(server.type, 'streamable-http');
  assert.deepEqual(server.extensions, { 'com.openai': { auth: { type: 'oauth' } } });
  assert.deepEqual(legacy, { mcpServers: { 'seed-api': { type: 'http', url: server.url } } });
  const coreMcp = structuredClone(mcp);
  delete coreMcp.mcpServers['seed-api'].extensions;
  const checkMcp = ajv.compile(await json(root, 'schemas/mcp.schema.json'));
  assert.ok(checkMcp(coreMcp), `API MCP schema: ${ajv.errorsText(checkMcp.errors)}`);
  for (const path of files) {
    const data = await readFile(resolve(apiRoot, path));
    assert.ok(data.length <= 5 * 1024 * 1024);
    if (!/\.(?:png|jpe?g|webp|gif|ico)$/i.test(path)) scanPublicText(data.toString('utf8'), path);
    if (path.endsWith('.md')) {
      for (const [, target] of data.toString('utf8').matchAll(/\]\(([^)]+)\)/g)) {
        if (/^[a-z]+:/i.test(target) || target.startsWith('#')) continue;
        const linked = relative(apiRoot, resolve(apiRoot, dirname(path), target.split('#')[0])).split(sep).join('/');
        assert.ok(files.includes(linked), `API package reference missing: ${path}: ${target}`);
      }
    }
  }
  return { root: apiRoot, files, manifest: portable };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { await validate(defaultRoot, { submission: process.argv.includes('--submission') }); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
