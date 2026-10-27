import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile, rename, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { defaultRoot, validate, validateLivePackage } from './validate.mjs';

export async function buildPackage(root = defaultRoot, { outputDirectory = resolve(root, 'dist'), quiet = false } = {}) {
  const { files, manifest } = await validate(root, { quiet });
  const name = `seed-plugin-${manifest.version}.zip`;
  await mkdir(outputDirectory, { recursive: true });
  const temporary = resolve(outputDirectory, `.${name}.tmp`);
  const output = resolve(outputDirectory, name);
  try {
    execFileSync('python3', [fileURLToPath(new URL('./zip.py', import.meta.url)), root, temporary], { input: JSON.stringify(files), stdio: ['pipe', quiet ? 'pipe' : 'inherit', 'inherit'] });
    await rename(temporary, output);
  } finally { await rm(temporary, { force: true }); }
  const sha256 = createHash('sha256').update(await readFile(output)).digest('hex');
  await writeFile(resolve(outputDirectory, 'SHA256SUMS'), `${sha256}  ${name}\n`);
  await writeFile(resolve(outputDirectory, 'archive-inventory.json'), `${JSON.stringify({ version: manifest.version, archive: name, sha256, files }, null, 2)}\n`);
  if (!quiet) console.log(`${name}\nSHA-256 ${sha256}\nThis archive excludes marketplace catalogs, private app bindings, and development files.`);
  return { output, sha256, files };
}

export async function buildLivePackage(root = defaultRoot) {
  const { root: liveRoot, files, manifest } = await validateLivePackage(root);
  const outputDirectory = resolve(root, 'dist');
  await mkdir(outputDirectory, { recursive: true });
  const name = `seed-live-plugin-${manifest.version}.zip`;
  const output = resolve(outputDirectory, name);
  execFileSync('python3', [fileURLToPath(new URL('./zip.py', import.meta.url)), liveRoot, output], { input: JSON.stringify(files) });
  const sha256 = createHash('sha256').update(await readFile(output)).digest('hex');
  await writeFile(resolve(outputDirectory, 'seed-live-SHA256SUMS'), `${sha256}  ${name}\n`);
  console.log(`${name}\nSHA-256 ${sha256}`);
  return { output, sha256, files };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { await buildPackage(); await buildLivePackage(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
