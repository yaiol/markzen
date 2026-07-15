import { Parser as DbmlParser } from '@dbml/core';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle, fixSvgDims } from '../shared/utils';

function renderDbml(src) {
  const db = DbmlParser.parse(src, 'dbml');
  const schema = db.schemas[0];
  const tables = schema.tables || [];
  const refs = schema.refs || [];

  const COL_W = 210;
  const COL_GAP = 40;
  const ROW_GAP = 30;
  const HDR_H = 30;
  const FIELD_H = 22;
  const COLS = Math.min(3, tables.length);
  const PAD = 16;

  const tablePos = {};
  tables.forEach((t, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const h = HDR_H + t.fields.length * FIELD_H + PAD;
    tablePos[t.name] = { col, row, h, fields: t.fields };
  });

  const rowHeights = {};
  tables.forEach((t, i) => {
    const row = Math.floor(i / COLS);
    rowHeights[row] = Math.max(rowHeights[row] || 0, tablePos[t.name].h);
  });

  const rowY = {};
  let cumY = 20;
  Object.keys(rowHeights).sort().forEach(r => {
    rowY[r] = cumY;
    cumY += rowHeights[r] + ROW_GAP;
  });
  tables.forEach((t) => {
    const { col, row } = tablePos[t.name];
    tablePos[t.name].x = 20 + col * (COL_W + COL_GAP);
    tablePos[t.name].y = rowY[row];
  });

  const totalW = 20 + COLS * (COL_W + COL_GAP) - COL_GAP + 20;
  const totalH = cumY;

  let rects = '';
  let texts = '';
  let arrows = '';

  tables.forEach(t => {
    const { x, y, h, fields } = tablePos[t.name];
    rects += `<rect x="${x}" y="${y}" width="${COL_W}" height="${h}" rx="6" fill="#fff" stroke="#ccc" stroke-width="1.5"/>`;
    rects += `<rect x="${x}" y="${y}" width="${COL_W}" height="${HDR_H}" rx="6" fill="#5a4fff" stroke="#5a4fff"/>`;
    rects += `<rect x="${x}" y="${y + HDR_H - 6}" width="${COL_W}" height="6" fill="#5a4fff" stroke="none"/>`;
    texts += `<text x="${x + COL_W / 2}" y="${y + HDR_H - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" font-family="'Inter',system-ui,sans-serif">${t.name}</text>`;
    fields.forEach((f, fi) => {
      const fy = y + HDR_H + PAD / 2 + fi * FIELD_H;
      const isPk = f.pk || (f.dbdefault && f.dbdefault.value === 'increment');
      const typeStr = f.type?.type_name || '';
      texts += `<text x="${x + 10}" y="${fy + 14}" font-size="11" fill="${isPk ? '#5a4fff' : '#333'}" font-weight="${isPk ? '600' : '400'}" font-family="'DM Mono','Fira Code',monospace">${f.name}</text>`;
      texts += `<text x="${x + COL_W - 10}" y="${fy + 14}" text-anchor="end" font-size="10" fill="#999" font-family="'DM Mono','Fira Code',monospace">${typeStr}</text>`;
      if (fi < fields.length - 1) {
        rects += `<line x1="${x + 6}" y1="${fy + FIELD_H}" x2="${x + COL_W - 6}" y2="${fy + FIELD_H}" stroke="#eee" stroke-width="1"/>`;
      }
    });
  });

  refs.forEach(ref => {
    try {
      const [ep1, ep2] = ref.endpoints;
      const t1 = tablePos[ep1.tableName];
      const t2 = tablePos[ep2.tableName];
      if (!t1 || !t2) return;
      const x1 = t1.x + COL_W;
      const y1 = t1.y + t1.h / 2;
      const x2 = t2.x;
      const y2 = t2.y + t2.h / 2;
      const cx = (x1 + x2) / 2;
      arrows += `<path d="M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}" fill="none" stroke="#5a4fff" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arr)"/>`;
    } catch {}
  });

  const defs = `<defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#5a4fff"/></marker></defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" style="max-width:100%;font-family:'Inter',system-ui,sans-serif">${defs}${rects}${texts}${arrows}</svg>`;
}

export default createExtension({
  id: 'dbml',
  containerClass: 'dbml-diagram',

  render(div, src) {
    const mznStyle = applyMznStyle(div);
    div.innerHTML = renderDbml(src);
    if (mznStyle.align) fixSvgDims(div);
  },
});
