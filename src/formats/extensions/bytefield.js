import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle, fixSvgDims } from '../shared/utils';

function renderBytefield(src) {
  const BITS_PER_ROW = 32;
  const CELL_W = 15;
  const CELL_H = 28;
  const LABEL_H = 16;
  const ROW_GAP = 6;

  const fields = JSON.parse(src);
  const totalBits = fields.reduce((s, f) => s + (f.bits || 1), 0);
  const numRows = Math.ceil(totalBits / BITS_PER_ROW);
  const W = BITS_PER_ROW * CELL_W;
  const H = numRows * (LABEL_H + CELL_H + ROW_GAP);

  let rects = '';
  let labels = '';
  let headers = '';

  for (let row = 0; row < numRows; row++) {
    const y = row * (LABEL_H + CELL_H + ROW_GAP);
    for (let b = 0; b < BITS_PER_ROW; b++) {
      if (b % 8 === 0 || b === BITS_PER_ROW - 1) {
        const bitNum = row * BITS_PER_ROW + b;
        if (bitNum < totalBits) {
          headers += `<text x="${b * CELL_W + CELL_W / 2}" y="${y + 11}" text-anchor="middle" font-size="9" fill="#888">${b}</text>`;
        }
      }
    }
  }

  let bitPos = 0;
  for (const field of fields) {
    const bits = field.bits || 1;
    const fill = field.fill || '#e8eaf0';
    const name = field.name || '';
    let rem = bits;
    let isFirst = true;
    while (rem > 0) {
      const row = Math.floor(bitPos / BITS_PER_ROW);
      const col = bitPos % BITS_PER_ROW;
      const inRow = Math.min(rem, BITS_PER_ROW - col);
      const x = col * CELL_W;
      const y = row * (LABEL_H + CELL_H + ROW_GAP) + LABEL_H;
      const w = inRow * CELL_W;
      rects += `<rect x="${x}" y="${y}" width="${w}" height="${CELL_H}" fill="${fill}" stroke="#999" stroke-width="0.8"/>`;
      if (isFirst && inRow >= 2) {
        const maxChars = Math.floor(w / 7);
        const label = name.length > maxChars ? name.slice(0, maxChars - 1) + '\u2026' : name;
        labels += `<text x="${x + w / 2}" y="${y + CELL_H / 2 + 4}" text-anchor="middle" font-size="11" fill="#222">${label}</text>`;
      }
      bitPos += inRow;
      rem -= inRow;
      isFirst = false;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="max-width:100%;font-family:'DM Mono','Fira Code',monospace">${headers}${rects}${labels}</svg>`;
}

export default createExtension({
  id: 'bytefield',
  containerClass: 'bytefield-diagram',

  render(div, src) {
    const mznStyle = applyMznStyle(div);
    div.innerHTML = renderBytefield(src);
    if (mznStyle.align) fixSvgDims(div);
  },
});
