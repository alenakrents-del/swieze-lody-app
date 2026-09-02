#!/usr/bin/env python3
"""Package's Pillow/LANCZOS/WebP optimizer adapted to existing portrait v2 masters.

Keep originals, portrait masters, responsive paths, and the existing Sharp helper.
Only regenerate the nine existing Episode 1 WebP variants and size report.
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ASSET_DIR = ROOT / 'assets/comic/season-1'
MASTER_DIR = ROOT / 'artwork-masters/comic/season-1'
report = []

# Validate every source before writing any output; no mixed/partial source set.
for panel in ('01', '02', '03'):
    for version in ('v1', 'v2'):
        path = MASTER_DIR / f'episode-01-panel-{panel}-{version}.png'
        with Image.open(path) as image:
            image.verify()
    with Image.open(MASTER_DIR / f'episode-01-panel-{panel}-v2.png') as image:
        if image.width * 7 != image.height * 4 or image.width < 900:
            raise SystemExit(f'Unexpected portrait dimensions in panel {panel}: {image.size}')

for panel in ('01', '02', '03'):
    name = f'episode-01-panel-{panel}-v2'
    source = MASTER_DIR / f'{name}.png'
    original = MASTER_DIR / f'episode-01-panel-{panel}-v1.png'
    row = {'panel': panel, 'originalBytes': original.stat().st_size,
           'masterBytes': source.stat().st_size, 'variants': []}
    with Image.open(source) as master:
        for width in (360, 720, 900):
            image = master.convert('RGB')
            image.thumbnail((width, width * 7 // 4), Image.Resampling.LANCZOS)
            destination = ASSET_DIR / f'{name}-{width}.webp'
            image.save(destination, 'WEBP', quality=84, method=6)
            row['variants'].append({'file': destination.name, 'width': image.width,
                                    'height': image.height, 'bytes': destination.stat().st_size})
    report.append(row)

(ASSET_DIR / 'asset-sizes.json').write_text(json.dumps(report, indent=2) + '\n')
for width in (360, 720, 900):
    before = sum(row['masterBytes'] for row in report)
    after = sum(next(v['bytes'] for v in row['variants'] if v['width'] == width) for row in report)
    print(f'{width}px: {before} -> {after} bytes; {100 * (1 - after / before):.2f}% smaller than portrait PNG masters')
