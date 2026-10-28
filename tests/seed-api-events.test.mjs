import test from 'node:test';
import assert from 'node:assert/strict';
import { apiEndpoint, probeApiEvents } from '../scripts/seed-api-events.mjs';

const event = { name: 'fixture.changed', delivery: ['webhook'], inputSchema: { type: 'object', properties: { fixture: { type: 'string' } } }, payloadSchema: { type: 'object', properties: { value: { type: 'string' } } } };
function transport(replies) {
  const calls = [];
  return { calls, fetchImpl: async (url, init) => {
    const request = JSON.parse(init.body); calls.push(request);
    assert.equal(url, apiEndpoint); assert.equal(init.redirect, 'manual');
    assert.equal(init.headers['Mcp-Method'], request.method);
    assert.equal(init.headers['MCP-Protocol-Version'], '2026-07-28');
    assert.equal(request.params._meta['io.modelcontextprotocol/protocolVersion'], '2026-07-28');
    const reply = replies.shift(); assert(reply, 'No unexpected RPCs');
    return reply instanceof Response ? reply : Response.json({ jsonrpc: '2.0', id: request.id, ...reply });
  } };
}
const discovery = (events = {}) => ({ result: { resultType: 'complete', supportedVersions: ['2026-07-28'], capabilities: events === null ? { tools: {} } : { tools: {}, events } } });
const page = (events, extra = {}) => ({ result: { resultType: 'complete', events, ...extra } });

test('probe verifies paginated modern discovery without subscribing or exposing token', async () => {
  const f = transport([discovery(), page([event], { nextCursor: 'fixture-cursor' }), page([{ ...event, name: 'fixture.finished' }])]);
  const report = await probeApiEvents({ token: 'private-test-token', fetchImpl: f.fetchImpl });
  assert.equal(report.status, 'discovery_verified'); assert.equal(report.pushDelivery, 'unverified');
  assert.equal(report.subscriptionCreated, false); assert.equal(report.pages, 2);
  assert.deepEqual(f.calls.map(call => call.method), ['server/discover', 'events/list', 'events/list']);
  assert.equal(f.calls[2].params.cursor, 'fixture-cursor'); assert(!JSON.stringify(report).includes('private-test-token'));
});
test('anonymous auth challenge and missing event capability are distinct blocked stages', async () => {
  const unauth = transport([new Response('private-provider-diagnostic', { status: 401 })]);
  const report = await probeApiEvents(unauth);
  assert.equal(report.code, 'http_401'); assert.equal(report.authenticated, false);
  assert(!JSON.stringify(report).includes('private-provider-diagnostic'));
  const disabled = transport([discovery(null)]);
  assert.equal((await probeApiEvents(disabled)).code, 'events_not_advertised'); assert.equal(disabled.calls.length, 1);
});
test('upstream RPC failures retain code and stage without raw server data', async () => {
  const f = transport([discovery(), { error: { code: -32601, message: 'private callback or token' } }]);
  const report = await probeApiEvents(f);
  assert.equal(report.stage, 'events/list'); assert.equal(report.code, 'rpc_-32601');
  assert(!JSON.stringify(report).includes('private callback'));
});
test('empty, invalid and repeated-page catalogs cannot report discovery verified', async () => {
  for (const [replies, code] of [
    [[discovery(), page([])], 'empty_event_catalog'],
    [[discovery(), page([{ ...event, payloadSchema: undefined }])], 'invalid_event_definition'],
    [[discovery(), page([event], { nextCursor: 'repeat' }), page([], { nextCursor: 'repeat' })], 'invalid_or_repeated_cursor'],
    [[discovery(), page([event, event])], 'invalid_event_definition'],
  ]) assert.equal((await probeApiEvents(transport(replies))).code, code);
});
test('redirects, oversized bodies and partial results fail without forwarding credentials', async () => {
  for (const response of [new Response(null, { status: 302, headers: { Location: 'https://example.invalid' } }), new Response('x'.repeat(1024 * 1024 + 1)), Response.json({ jsonrpc: '2.0', id: 1, result: { resultType: 'partial' } })]) {
    const f = transport([response]);
    assert.equal((await probeApiEvents({ ...f, token: 'private-token' })).status, 'blocked');
    assert.equal(f.calls.length, 1);
  }
});
