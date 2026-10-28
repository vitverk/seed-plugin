import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runSmoke } from '../scripts/smoke.mjs';
import { endpoint } from '../scripts/validate.mjs';

const canonical = id => `seed://docs/${encodeURIComponent(id)}`;
const toolNames = ['open_seedling', 'browse_seedling', 'show_seedling_calendar', 'get_companion_capabilities', 'get_seedling_state', 'schedule_activity', 'update_schedule', 'queue_action', 'cancel_action', 'advance_demo_time', 'set_clock', 'create_goal', 'cancel_goal', 'search_seed_docs', 'read_seed_doc', 'open_character_creator', 'show_seedling_status', 'show_seedling_agenda', 'show_activity_detail', 'show_seedling_inventory', 'show_seedling_goals', 'show_seedling_health', 'show_seedling_needs', 'show_seedling_mood', 'show_seedling_radar'];

// An offline protocol fixture; every unexpected request throws before any network access.
function documentationServer({ oldUri = false, missingWorkflow = false } = {}) {
  const calls = [];
  const guide = { id: 'seed-help-center:article:317', title: 'Access Rights', sourceUrl: 'https://klang-games.eu.theymes.com/hc/en/seed/articles/access-rights-317', text: '# Access Rights\n', nextOffset: null };
  const workflow = { id: 'seed-workflows-demo:calendar', sourceCollection: 'seed-workflows-demo', documentType: 'workflow', offset: 0, text: '# Calendar\n', nextOffset: null };
  const memoria = { id: 'seed-agent-play-pr34377:library/manual-seedlings', sourceCollection: 'seed-agent-play-pr34377', sourceType: 'in_game_manual', sourceUrl: null, retrievedAt: null, importedAt: '2026-10-27T00:00:00Z', verificationStatus: 'unverified_reference', sourcePath: 'tools/agent-play-api/library/manual-seedlings.md' };
  memoria.citation = memoria.sourcePath;
  const farming = { id: 'seed-agent-play-pr34377:library/manual-farming-and-crops', conflicts: [{ id: 'seed-help-center:article:310', sourceType: 'help_center', uri: canonical('seed-help-center:article:310') }] };
  const helpFarming = { id: 'seed-help-center:article:310', conflictsWith: [farming.id], verificationNote: 'Neither source is established as current.' };
  const docs = [guide, workflow, memoria, farming, helpFarming];
  for (const doc of docs) doc.uri = canonical(doc.id);
  if (oldUri) guide.uri = 'skill://seed-game-guide/resources/building/access-rights-317.md';
  const response = value => new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } });
  return { calls, fetchImpl: async (url, options = {}) => {
    assert.equal(new URL(url).origin, 'https://mcp.flaxa.app');
    if (new URL(url).pathname === '/health') return response({ mode: 'guest', version: '0.15.0', service: 'SEED Demo', mcp: endpoint, saved: false, authentication: false, backgroundEvents: false });
    const request = JSON.parse(options.body);
    calls.push(request);
    let result;
    if (request.method === 'initialize') result = { protocolVersion: '2025-11-25', serverInfo: { name: 'seed-demo', title: 'SEED Demo', version: '0.15.0' } };
    else if (request.method === 'tools/list') result = { tools: toolNames.map(name => ({ name, title: name, description: name, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false }, _meta: { securitySchemes: [{ type: 'noauth' }] } })) };
    else if (request.method === 'resources/list') result = { resources: [{ uri: 'seed://docs/index' }] };
    else if (request.method === 'resources/read') {
      const uri = request.params.uri;
      const text = uri === 'seed://docs/index' ? '# SEED documentation\n' : docs.find(doc => doc.uri === uri)?.text;
      assert.ok(text, `Unexpected resource: ${uri}`);
      result = { contents: [{ uri, text, mimeType: 'text/markdown' }] };
    } else if (request.method === 'tools/call') {
      const { name, arguments: args } = request.params;
      assert.ok(['search_seed_docs', 'read_seed_doc'].includes(name), `Unexpected gameplay call: ${name}`);
      if (name === 'read_seed_doc') {
        const doc = docs.find(doc => doc.uri === args.uri);
        assert.ok(doc, `Unexpected document: ${args.uri}`);
        result = { structuredContent: doc };
      } else {
        const matches = { 'access rights': [guide], calendar: missingWorkflow ? [] : [workflow], Memoria: [memoria], 'farming and crops': [farming] };
        assert.ok(args.query in matches, `Unexpected search: ${args.query}`);
        result = { structuredContent: { results: matches[args.query] } };
      }
    } else assert.fail(`Unexpected MCP method: ${request.method}`);
    return response({ jsonrpc: '2.0', id: request.id, result });
  } };
}

async function output(t) {
  const directory = await mkdtemp(join(tmpdir(), 'seed-docs-smoke-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

test('documentation-only smoke uses standard MCP reads and never calls gameplay or Skills methods', async t => {
  const outputDirectory = await output(t);
  const server = documentationServer();
  const report = await runSmoke({ docsOnly: true, fetchImpl: server.fetchImpl, outputDirectory, log: () => {} });
  assert.equal(report.checks.length, 6);
  assert.match(report.scope, /no gameplay tool calls/);
  assert.deepEqual([...new Set(server.calls.filter(call => call.method === 'tools/call').map(call => call.params.name))].sort(), ['read_seed_doc', 'search_seed_docs']);
  assert.ok(server.calls.every(call => !call.method.startsWith('skills/')));
  assert.deepEqual(JSON.parse(await readFile(join(outputDirectory, 'smoke-docs-results.json'), 'utf8')), report);
});

test('documentation smoke rejects removed skill URIs and missing workflow discovery', async t => {
  const outputDirectory = await output(t);
  for (const [options, expected] of [[{ oldUri: true }, /seed:\/\/docs\//], [{ missingWorkflow: true }, /workflow must be discoverable/]]) {
    const server = documentationServer(options);
    await assert.rejects(runSmoke({ docsOnly: true, fetchImpl: server.fetchImpl, outputDirectory, log: () => {} }), expected);
  }
});
