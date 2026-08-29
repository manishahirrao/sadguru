import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');

function svg(bg, tc, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <rect width="800" height="600" fill="${bg}"/>
  <text x="400" y="300" dominant-baseline="middle" text-anchor="middle"
        font-family="Georgia,serif" font-size="60" font-weight="bold"
        fill="${tc}" opacity="0.7">${label}</text>
</svg>`;
}

const items = [
  ['momos.jpg',              '#C15B2C', '#F3E7D3', 'Momos'],
  ['toast.jpg',              '#D9A441', '#241712', 'Toast'],
  ['cream-roll.jpg',         '#F7EFDD', '#241712', 'Cream Roll'],
  ['chocolate-biscuits.jpg', '#241712', '#D9A441', 'Choco Biscuits'],
  ['cold-coffee.jpg',        '#241712', '#F3E7D3', 'Cold Coffee'],
  ['water-bottle.jpg',       '#e8f4f8', '#241712', 'Water Bottle'],
  ['sprite.jpg',             '#2ecc40', '#ffffff', 'Sprite'],
  ['thums-up.jpg',           '#cc2200', '#ffffff', 'Thums Up'],
  ['smoothy.jpg',            '#D9A441', '#241712', 'Smoothy'],
];

for (const [filename, bg, tc, label] of items) {
  writeFileSync(join(outDir, filename), svg(bg, tc, label));
  console.log('wrote', filename);
}
console.log('Done.');
