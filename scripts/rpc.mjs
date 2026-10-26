import assert from 'node:assert/strict';

/** Parse both MCP JSON and SSE transport responses without logging server data. */
export function parseRpcResponse(wire, contentType, id) {
  const messages = contentType?.includes('text/event-stream')
    ? wire.split(/\r?\n\r?\n/).map(event => event.split(/\r?\n/).filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n')).filter(Boolean).map(data => JSON.parse(data))
    : [JSON.parse(wire)];
  const result = messages.find(message => message.id === id);
  assert.ok(result, `No JSON-RPC response for request ${id}`);
  assert.equal(result.jsonrpc, '2.0');
  return result;
}
