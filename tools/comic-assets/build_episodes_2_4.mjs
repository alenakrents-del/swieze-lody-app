// Build responsive delivery WebP files for Episodes 2–4.
// Run from repository root: node tools/comic-assets/build_episodes_2_4.mjs
// Never downloads artwork and never touches Supabase.
import { createRequire } from 'node:module';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = fileURLToPath(new URL('../../', import.meta.url));
const masters = path.join(root, 'artwork-masters/comic/season-1');
const destination = path.join(root, 'assets/comic/season-1');
await mkdir(destination, { recursive: true });

const episodes = ['02', '03', '04'];
const panels = ['01', '02', '03'];
const widths = [360, 720, 900];
const version = 'v1';
const report = [];

for (const episode of episodes) {
  for (const panel of panels) {
    const name = `episode-${episode}-panel-${panel}-${version}`;
    const master = path.join(masters, `${name}.png`);
    const source = await stat(master);
    const metadata = await sharp(master).metadata();
    if (!metadata.width || !metadata.height) throw new Error(`Missing dimensions: ${master}`);
    if (metadata.width < 900) throw new Error(`Master must be at least 900px wide: ${master}`);
    const ratio = metadata.width / metadata.height;
    const targetRatio = 4 / 7;
    if (Math.abs(ratio - targetRatio) > 0.035) {
      throw new Error(`Master must be portrait ~4:7, got ${metadata.width}x${metadata.height}: ${master}`);
    }

    const row = { episode, panel, master: `${name}.png`, masterBytes: source.size, variants: [] };
    for (const width of widths) {
      const file = `${name}-${width}.webp`;
      const output = await sharp(master)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 86, effort: 6, smartSubsample: true })
        .toFile(path.join(destination, file));
      if (output.width !== width) throw new Error(`Unexpected output width for ${file}: ${output.width}`);
      row.variants.push({ file, width: output.width, height: output.height, bytes: output.size });
    }
    report.push(row);
  }
}

const reportFile = path.join(destination, 'asset-sizes-episodes-02-04.json');
await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`);

const masterTotal = report.reduce((sum, row) => sum + row.masterBytes, 0);
const webpTotal = report.reduce((sum, row) => sum + row.variants.reduce((s, v) => s + v.bytes, 0), 0);
const webp900Total = report.reduce((sum, row) => sum + row.variants.find(v => v.width === 900).bytes, 0);
console.table(report.map(row => ({
  episode: row.episode,
  panel: row.panel,
  master: row.masterBytes,
  webp360: row.variants[0].bytes,
  webp720: row.variants[1].bytes,
  webp900: row.variants[2].bytes
})));
console.log({ masterTotal, webpTotal, webp900Total, reportFile });
