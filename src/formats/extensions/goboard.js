import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'goboard',
  containerClass: 'go-board',

  render(div, src) {
    applyMznStyle(div);
    let spec;
    const trimmed = src.trim();
    if (trimmed.startsWith('{')) { spec = JSON.parse(trimmed); } else { spec = { size: 19 }; }
    const size = spec.size || 19;
    const black = spec.black || [];
    const white = spec.white || [];
    const marks = spec.marks || {};
    const caption = spec.caption || '';
    const COL_LABELS = 'ABCDEFGHJKLMNOPQRST'.slice(0, size);
    function parseCoord(s) {
      const col = COL_LABELS.indexOf(s[0].toUpperCase());
      const row = size - parseInt(s.slice(1), 10);
      return { col, row };
    }
    const CELL = size === 9 ? 44 : size === 13 ? 34 : 28;
    const MARGIN = 26;
    const TOTAL = MARGIN * 2 + (size - 1) * CELL;
    const R = CELL * 0.46;
    const HOSHI = { 9: [[2,2],[6,2],[4,4],[2,6],[6,6]], 13: [[3,3],[9,3],[6,6],[3,9],[9,9]], 19: [[3,3],[9,3],[15,3],[3,9],[9,9],[15,9],[3,15],[9,15],[15,15]] }[size] || [];
    const gx = col => MARGIN + col * CELL;
    const gy = row => MARGIN + row * CELL;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TOTAL} ${TOTAL}" width="${TOTAL}" height="${TOTAL}" style="max-width:${TOTAL}px;height:auto;display:block">`;
    svg += `<rect width="${TOTAL}" height="${TOTAL}" fill="#DCB967"/>`;
    for (let i = 0; i < size; i++) {
      svg += `<line x1="${gx(i)}" y1="${gy(0)}" x2="${gx(i)}" y2="${gy(size-1)}" stroke="#5a3e1b" stroke-width="0.8"/>`;
      svg += `<line x1="${gx(0)}" y1="${gy(i)}" x2="${gx(size-1)}" y2="${gy(i)}" stroke="#5a3e1b" stroke-width="0.8"/>`;
    }
    svg += `<rect x="${gx(0)}" y="${gy(0)}" width="${(size-1)*CELL}" height="${(size-1)*CELL}" fill="none" stroke="#5a3e1b" stroke-width="1.5"/>`;
    for (const [sc, sr] of HOSHI) svg += `<circle cx="${gx(sc)}" cy="${gy(sr)}" r="4" fill="#5a3e1b"/>`;
    for (let i = 0; i < size; i++) {
      svg += `<text x="${gx(i)}" y="${MARGIN - 8}" text-anchor="middle" style="font-size:11px;font-family:sans-serif;fill:#5a3e1b">${COL_LABELS[i]}</text>`;
      svg += `<text x="${gx(i)}" y="${gy(size-1) + MARGIN - 6}" text-anchor="middle" style="font-size:11px;font-family:sans-serif;fill:#5a3e1b">${COL_LABELS[i]}</text>`;
      const n = size - i;
      svg += `<text x="${MARGIN - 8}" y="${gy(i) + 4}" text-anchor="middle" style="font-size:11px;font-family:sans-serif;fill:#5a3e1b">${n}</text>`;
      svg += `<text x="${gx(size-1) + 12}" y="${gy(i) + 4}" text-anchor="middle" style="font-size:11px;font-family:sans-serif;fill:#5a3e1b">${n}</text>`;
    }
    for (const coord of black) {
      const { col, row } = parseCoord(coord);
      svg += `<circle cx="${gx(col)}" cy="${gy(row)}" r="${R}" fill="#1a1a1a" stroke="#000" stroke-width="0.5"/>`;
    }
    for (const coord of white) {
      const { col, row } = parseCoord(coord);
      svg += `<circle cx="${gx(col)}" cy="${gy(row)}" r="${R}" fill="#f5f5f5" stroke="#888" stroke-width="0.8"/>`;
    }
    for (const [type, coords] of Object.entries(marks)) {
      for (const coord of coords) {
        const { col, row } = parseCoord(coord);
        if (type === 'circle')   svg += `<circle cx="${gx(col)}" cy="${gy(row)}" r="${R*0.45}" fill="none" stroke="#f00" stroke-width="1.5"/>`;
        if (type === 'triangle') svg += `<polygon points="${gx(col)},${gy(row)-R*0.55} ${gx(col)-R*0.5},${gy(row)+R*0.35} ${gx(col)+R*0.5},${gy(row)+R*0.35}" fill="none" stroke="#f00" stroke-width="1.5"/>`;
        if (type === 'square')   svg += `<rect x="${gx(col)-R*0.4}" y="${gy(row)-R*0.4}" width="${R*0.8}" height="${R*0.8}" fill="none" stroke="#f00" stroke-width="1.5"/>`;
      }
    }
    svg += '</svg>';
    div.innerHTML = caption ? `<figure style="margin:0">${svg}<figcaption>${caption}</figcaption></figure>` : svg;
  },
});
