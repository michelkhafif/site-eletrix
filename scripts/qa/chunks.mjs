// Divide um PNG alto em pedaços para visualizar: node scripts/qa/chunks.mjs in.png outPrefix altura
import sharp from 'sharp';
const [inp, pre, h = '1500'] = process.argv.slice(2);
const m = await sharp(inp).metadata();
for (let i = 0, y = 0; y < m.height; i++, y += +h) {
  await sharp(inp).extract({ left: 0, top: y, width: m.width, height: Math.min(+h, m.height - y) }).toFile(`${pre}-${i}.png`);
  console.log(`${pre}-${i}.png`);
}
