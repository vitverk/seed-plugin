import { pathToFileURL } from 'node:url';
import { parseRpcResponse } from './rpc.mjs';

export const apiEndpoint = 'https://api.seed-universe.com/seed-api/staging-mcp-dev2/mcp';
const protocol = '2026-07-28';
class ProbeError extends Error {
  constructor(stage, code) { super(code); this.stage = stage; this.code = code; }
}
async function boundedText(response) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('empty_response');
  const parts = []; let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 1024 * 1024) { await reader.cancel(); throw new Error('response_too_large'); }
      parts.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(parts).toString('utf8');
}

/** Discovery only: never accept a callback, signing secret or mutation method. */
export async function probeApiEvents({ token, fetchImpl = fetch } = {}) {
  const report = { checkedAt: new Date().toISOString(), endpoint: apiEndpoint, protocol, authenticated: Boolean(token), pushDelivery: 'unverified', subscriptionCreated: false };
  let id = 0;
  async function rpc(method, args = {}) {
    try {
      const response = await fetchImpl(apiEndpoint, {
        method: 'POST', redirect: 'manual', signal: AbortSignal.timeout(20_000),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'MCP-Protocol-Version': protocol, 'Mcp-Method': method, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ jsonrpc: '2.0', id: ++id, method, params: { ...args, _meta: { 'io.modelcontextprotocol/protocolVersion': protocol, 'io.modelcontextprotocol/clientInfo': { name: 'seed-api-events-probe', version: '1.0.0' }, 'io.modelcontextprotocol/clientCapabilities': {} } } }),
      });
      if (!response.ok) { await response.body?.cancel(); throw new ProbeError(method, `http_${response.status}`); }
      const message = parseRpcResponse(await boundedText(response), response.headers.get('Content-Type'), id);
      if (message.error) throw new ProbeError(method, `rpc_${Number.isInteger(message.error.code) ? message.error.code : 'error'}`);
      if (!message.result || message.result.resultType !== 'complete') throw new ProbeError(method, 'incomplete_or_invalid_result');
      return message.result;
    } catch (error) {
      // Never echo provider errors, bodies, headers, credentials or callback URLs.
      throw error instanceof ProbeError ? error : new ProbeError(method, 'transport_or_invalid_response');
    }
  }
  try {
    const discovery = await rpc('server/discover');
    if (!discovery.supportedVersions?.includes(protocol)) throw new ProbeError('server/discover', 'protocol_not_advertised');
    report.eventsAdvertised = Boolean(discovery.capabilities?.events);
    if (!report.eventsAdvertised) return { ...report, status: 'blocked', stage: 'server/discover', code: 'events_not_advertised' };
    const names = new Set(), cursors = new Set(), events = [];
    let cursor;
    for (let page = 0; page < 20; page++) {
      const result = await rpc('events/list', cursor ? { cursor } : {});
      if (!Array.isArray(result.events)) throw new ProbeError('events/list', 'invalid_event_catalog');
      for (const event of result.events) {
        if (typeof event.name !== 'string' || !event.name || event.name.length > 200 || names.has(event.name) || !event.delivery?.includes('webhook') || !event.inputSchema || !event.payloadSchema) throw new ProbeError('events/list', 'invalid_event_definition');
        names.add(event.name);
        events.push({ name: event.name, inputFields: Object.keys(event.inputSchema.properties ?? {}), payloadFields: Object.keys(event.payloadSchema.properties ?? {}) });
        if (events.length > 200) throw new ProbeError('events/list', 'catalog_too_large');
      }
      if (result.nextCursor == null) return { ...report, status: events.length ? 'discovery_verified' : 'blocked', stage: 'events/list', ...(events.length ? {} : { code: 'empty_event_catalog' }), events, pages: page + 1 };
      if (typeof result.nextCursor !== 'string' || !result.nextCursor || result.nextCursor.length > 4096 || cursors.has(result.nextCursor)) throw new ProbeError('events/list', 'invalid_or_repeated_cursor');
      cursor = result.nextCursor; cursors.add(cursor);
    }
    throw new ProbeError('events/list', 'catalog_too_large');
  } catch (error) { return { ...report, status: 'blocked', stage: error.stage, code: error.code }; }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = await probeApiEvents({ token: process.env.SEED_API_ACCESS_TOKEN });
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.status === 'discovery_verified' ? 0 : 2;
}
