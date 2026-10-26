import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, rm, readFile, writeFile, symlink, utimes } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { defaultRoot, validate, safePath } from '../scripts/validate.mjs';
import { buildPackage } from '../scripts/package.mjs';
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
test('release archive is deterministic and contains only allowlisted plugin files', async t => {
  const root = await fixture(t);
  const first = await buildPackage(root, { quiet: true });
  await utimes(join(root, 'plugin.json'), new Date(), new Date());
  const second = await buildPackage(root, { quiet: true });
  assert.equal(first.sha256, second.sha256);
  assert.ok(first.files.includes('.claude-plugin/plugin.json'));
  assert.ok(!first.files.some(path => /marketplace\.json|^submission\/|^scripts\/|^tests\/|^\.github\//.test(path)));
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
