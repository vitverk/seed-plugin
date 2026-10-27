import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import Ajv from 'ajv';
import YAML from 'yaml';

export function canonicalBody(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines.at(-1).trim()) lines.pop();
  return lines.length ? lines.join('\n') + '\n' : '';
}
export const bodyHash = text => `sha256:${createHash('sha256').update(canonicalBody(text)).digest('hex')}`;

export function createMetadataValidator(schema) {
  const ajv = new Ajv({ allErrors: true, strict: true });
  ajv.addFormat('date-time', value => {
    const match = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:\.\d+)?(?:Z|[+-](\d\d):(\d\d))$/.exec(value);
    if (!match) return false;
    const [year, month, day, hour, minute, second, zoneHour = 0, zoneMinute = 0] = match.slice(1).map(Number);
    const days = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= days[month - 1]
      && hour <= 23 && minute <= 59 && second <= 59
      && (Number.isNaN(zoneHour) || zoneHour <= 23) && (Number.isNaN(zoneMinute) || zoneMinute <= 59)
      && Number.isFinite(Date.parse(value));
  });
  const validate = ajv.compile(schema);
  return (metadata, path = 'document') => {
    assert.ok(validate(metadata), `${path}: invalid document metadata: ${ajv.errorsText(validate.errors)}`);
    if (metadata.source_url) {
      const url = new URL(metadata.source_url);
      assert.ok(!url.username && !url.password, `${path}: source URL cannot contain credentials`);
    }
    assert.ok(!metadata.source_path.startsWith('/') && !metadata.source_path.includes('\\') && !metadata.source_path.split('/').includes('..'), `${path}: source_path must stay within its source collection`);
    assert.ok(!metadata.conflicts_with.includes(metadata.id), `${path}: document cannot conflict with itself`);
    return metadata;
  };
}

export function decodeDocument(text, path, validate) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  assert.ok(match, `${path}: missing document frontmatter`);
  const metadata = validate(YAML.parse(match[1], { uniqueKeys: true }), path);
  const body = canonicalBody(text.slice(match[0].length));
  assert.ok(body, `${path}: document body must not be empty`);
  assert.equal(bodyHash(body), metadata.content_hash, `${path}: document content hash mismatch`);
  return { metadata, body };
}

export function encodeDocument(metadata, body, validate) {
  body = canonicalBody(body);
  assert.ok(body, 'Document body must not be empty');
  const complete = { ...metadata, content_hash: bodyHash(body) };
  validate(complete);
  return `---\n${YAML.stringify(complete, { lineWidth: 0 })}---\n\n${body}`;
}
