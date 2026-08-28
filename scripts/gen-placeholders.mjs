// scripts/gen-placeholders.mjs
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

function svg(w, h, bg, textColor, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <text x="${w/2}" y="${h/2}" dominant-baseline="middle" text-anchor="middle" 
        font-family="Georgia, serif" font-size="${Math.min(w,h)*0.08}" 
        font-weight="bold" fill="${textColor}" opacity="0.7">${label}</text>
</svg>`;
}

const images = [
  ['hero-bg.webp',      1920, 1080, '#241712', '#D9A441', 'Sadguru Chai & Nasta Centre'],
  ['poha.webp',          800,  600, '#F7EFDD', '#241712', 'Poha'],
  ['maggi.webp',         800,  600, '#C15B2C', '#F3E7D3', 'Maggi'],
  ['bhurji-pav.webp',    800,  600, '#C15B2C', '#F3E7D3', 'Bhurji Pav'],
  ['misal-pav.webp',     800,  600, '#C15B2C', '#F3E7D3', 'Misal Pav'],
  ['cutting-chai.webp',  800,  600, '#D9A441', '#241712', 'Cutting Chai'],
  ['masala-chai.webp',   800,  600, '#D9A441', '#241712', 'Masala Chai'],
  ['coffee.webp',        800,  600, '#241712', '#F3E7D3', 'Coffee'],
  ['cigarettes.webp',    800,  600, '#888888', '#ffffff', 'Cigarettes'],
  ['og-image.jpg',      1200,  630, '#241712', '#D9A441', 'Sadguru Chai & Nasta Centre'],
];

for (const [filename, w, h, bg, tc, label] of images) {
  writeFileSync(join(outDir, filename), svg(w, h, bg, tc, label));
  console.log('wrote', filename);
}
console.log('All placeholders written.');
