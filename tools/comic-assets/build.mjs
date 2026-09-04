// Offline build only. Never downloads artwork or touches Supabase.
import { createRequire } from 'node:module';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = fileURLToPath(new URL('../../', import.meta.url));
const destination = path.join(root, 'assets/comic/season-1');
await mkdir(destination, { recursive: true });
const report = [];
for (const number of ['01', '02', '03']) {
  const name = `episode-01-panel-${number}-v2`;
  const master = path.join(root, 'artwork-masters/comic/season-1', `${name}.png`);
  const original = path.join(root, 'artwork-masters/comic/season-1', `episode-01-panel-${number}-v1.png`);
  const metadata = await sharp(master).metadata();
  const row = { panel: number, originalBytes: (await stat(original)).size, masterBytes: (await stat(master)).size, variants: [] };
  for (const width of [360, 720, 900]) {
    // Never upscale: source dimensions cap the actual output. Width-descriptors use the actual width.
    const actualWidth = Math.min(width, metadata.width);
    const file = `${name}-${actualWidth}.webp`;
    const output = await sharp(master).rotate().resize({ width: actualWidth, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6, smartSubsample: true }).toFile(path.join(destination, file));
    row.variants.push({ file, width: output.width, height: output.height, bytes: output.size });
  }
  report.push(row);
}
await writeFile(path.join(destination, 'asset-sizes.json'), `${JSON.stringify(report, null, 2)}\n`);
console.table(report.map(row => ({ panel: row.panel, before: row.originalBytes, mobile: row.variants[1].bytes, retina: row.variants[2].bytes })));
