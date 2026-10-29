import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { defaultRoot, endpoint } from './validate.mjs';
import { parseRpcResponse } from './rpc.mjs';

// Public checks need no credentials. Authenticated checks only discover tools,
// read documentation and UI resources; they never call game or note-write tools.
export async function runSmoke({ docsOnly = false, token = process.env.SEED_SMOKE_TOKEN,
  expectedVersion = process.env.SEED_EXPECTED_VERSION, fetchImpl = fetch,
  outputDirectory = resolve(defaultRoot, 'dist'), log = console.log } = {}) {
  assert.ok(!docsOnly || token, 'Authenticated documentation smoke requires SEED_SMOKE_TOKEN');
  const origin = new URL(endpoint).origin;
  const checks = [];
  const check = name => { checks.push({ name, status: 'passed' }); log(`✓ ${name}`); };
  async function request(path, options = {}) {
    return fetchImpl(new URL(path, origin), { ...options, redirect: 'error', signal: AbortSignal.timeout(20000) });
  }
  const healthResponse = await request('/health');
  assert.equal(healthResponse.status, 200);
  const health = await healthResponse.json();
  assert.equal(health.name, 'SEED');
  assert.equal(health.authentication, 'oauth2');
  assert.equal(health.mcp, endpoint);
  if (expectedVersion) assert.equal(health.version, expectedVersion);
  check('SEED health and authenticated canonical endpoint');
  for (const path of ['/demo/mcp', '/guest/channel']) for (const method of ['GET', 'POST']) {
    assert.equal((await request(path, {method})).status, 404, `Retired route: ${method} ${path}`);
  }
  check('Retired anonymous routes remain unavailable');
  for (const path of ['/mcp', '/live/mcp', '/staging/mcp']) {
    const response = await request(path);
    assert.equal(response.status, 401, `${path} must require authentication`);
    const metadataPath = `/.well-known/oauth-protected-resource${path}`;
    assert.ok(response.headers.get('www-authenticate')?.includes(`resource_metadata="${origin}${metadataPath}"`), `${path} must advertise its own resource metadata`);
    const resourceResponse = await request(metadataPath);
    assert.equal(resourceResponse.status, 200, `${metadataPath} must be available`);
    const resource = await resourceResponse.json();
    assert.equal(resource.resource, `${origin}${path}`);
    assert.deepEqual(resource.authorization_servers, [path === '/mcp' ? origin : `${origin}/staging`], `${path} OAuth issuer`);
  }
  check('Canonical endpoint and compatibility aliases preserve OAuth audiences');
  for (const prefix of ['', '/staging']) {
    const metadataPath = `/.well-known/oauth-authorization-server${prefix}`;
    const response = await request(metadataPath);
    assert.equal(response.status, 200, `${metadataPath} must be available`);
    const authorization = await response.json();
    const issuer = `${origin}${prefix}`;
    assert.equal(authorization.issuer, issuer, `${metadataPath} issuer`);
    for (const [field, route] of [['authorization_endpoint', 'authorize'], ['token_endpoint', 'token'], ['registration_endpoint', 'register']]) {
      assert.equal(authorization[field], `${issuer}/oauth/${route}`, `${metadataPath} ${field}`);
    }
    assert.ok(authorization.protected_resources?.includes(endpoint), `${metadataPath} must support the canonical MCP audience`);
  }
  check('Root OAuth discovery advertises canonical endpoints and staging discovery remains compatible');
  let server;
  if (token) {
    let id = 0;
    async function rpc(method, params = {}) {
      const current = ++id;
      const response = await request('/mcp', {method:'POST', headers:{Authorization:`Bearer ${token}`, 'Content-Type':'application/json', Accept:'application/json, text/event-stream', 'MCP-Protocol-Version':'2025-11-25'}, body:JSON.stringify({jsonrpc:'2.0',id:current,method,params})});
      assert.equal(response.status, 200, `Authenticated ${method} failed`);
      const reply = parseRpcResponse(await response.text(), response.headers.get('content-type'), current);
      assert.ok(!reply.error && !reply.result?.isError, `${method} failed`);
      return reply.result;
    }
    const initialized = await rpc('initialize', {protocolVersion:'2025-11-25', clientInfo:{name:'seed-release-smoke',version:'3.0.0'},capabilities:{}});
    assert.equal(initialized.serverInfo.title, 'SEED');
    assert.equal(initialized.serverInfo.name, 'flaxa-seed');
    if (expectedVersion) assert.equal(initialized.serverInfo.version, expectedVersion);
    assert.match(initialized.instructions, /user need not say "card" or "widget"/);
    assert.doesNotMatch(initialized.instructions, /Render only for an explicit visual request|SEED Live/);
    server = initialized.serverInfo;
    assert.match(initialized.instructions, /prepare_presentation_review/);
    assert.match(initialized.instructions, /verified completion transitions do trigger panels/);
    check('Authenticated SEED initialization and meaningful-change policy');
    const listed = await rpc('tools/list');
    for (const retired of ['get_seedling_state','get_companion_capabilities','schedule_activity','advance_demo_time','show_seedling_calendar']) assert.ok(!listed.tools.some(tool=>tool.name===retired), `Retired tool ${retired}`);
    const focused = listed.tools.filter(tool=>tool.name.startsWith('show_'));
    assert.equal(focused.length,14);
    for(const tool of focused) {
      assert.match(tool.description,/user need not say "card" or "widget"/);
      assert.doesNotMatch(tool.description,/Only call when the user explicitly|SEED Live|SEED staging/);
      assert.equal(tool.annotations.readOnlyHint,true);
      assert.ok(tool._meta?.ui?.resourceUri?.startsWith('ui://'));
    }
    const ui = await rpc('resources/read',{uri:focused[0]._meta.ui.resourceUri});
    assert.ok(ui.contents.some(item=>item.mimeType==='text/html;profile=mcp-app' && item.text?.includes('<html')));
    check('Fourteen focused widgets with render-only resources; no retired gameplay tools');
    async function read(uri) {
      const result = await rpc('tools/call',{name:'read_seed_doc',arguments:{uri}});
      assert.ok(result.structuredContent?.text);
      return result.structuredContent.text;
    }
    const index = await read('seed://docs/index');
    assert.match(index,/SEED documentation/);
    assert.doesNotMatch(index,/SEED Live|SEED Demo|seed-workflows-demo/);
    const guide = await read('seed://docs/seed-workflow%3Alive%2Fstart-here');
    assert.match(guide,/focused card/);
    check('Current SEED documentation and focused guidance without gameplay calls');
  }
  const report = {checkedAt:new Date().toISOString(),endpoint,healthVersion:health.version,server,
    authenticated:token ? 'passed' : 'not_run',scope:'Read-only routing, OAuth metadata, optional authenticated documentation and widget discovery; no game mutations or host UI acceptance.',checks};
  await mkdir(outputDirectory,{recursive:true});
  await writeFile(resolve(outputDirectory, docsOnly?'smoke-docs-results.json':'smoke-results.json'),JSON.stringify(report,null,2)+'\n');
  return report;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { await runSmoke({docsOnly:process.argv.includes('--docs-only')}); }
  catch(error) { console.error(`Smoke failed: ${error.message}`); process.exitCode=1; }
}
