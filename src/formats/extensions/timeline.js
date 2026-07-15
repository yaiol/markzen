import { createExtension } from '../shared/extensionFactory';
import { readMznStyle } from '../shared/utils';

function renderTimeline(src, w = 560) {
  const events = JSON.parse(src);
  if (!events.length) return '';
  const ROW_H = 72;
  const LINE_X = 130;
  const maxChars = Math.max(...events.map(ev => Math.max((ev.label || '').length, (ev.desc || '').length)));
  const LAYOUT_W = LINE_X + 18 + maxChars * 8 + 40;
  const H = events.length * ROW_H + 20;
  const displayH = Math.round(H * w / LAYOUT_W);
  let lines = `<line x1="${LINE_X}" y1="10" x2="${LINE_X}" y2="${H - 10}" stroke="#ccc" stroke-width="2"/>`;
  let dots = '';
  let labels = '';
  events.forEach((ev, i) => {
    const y = 20 + i * ROW_H;
    const color = ev.color || '#5a4fff';
    dots += `<circle cx="${LINE_X}" cy="${y}" r="7" fill="${color}" stroke="#fff" stroke-width="2"/>`;
    labels += `<text x="${LINE_X - 14}" y="${y + 5}" text-anchor="end" font-size="12" fill="#666" font-family="'DM Mono','Fira Code',monospace">${ev.date || ''}</text>`;
    labels += `<text x="${LINE_X + 18}" y="${y + 5}" font-size="13" font-weight="600" fill="#222" font-family="'Inter',system-ui,sans-serif">${ev.label || ''}</text>`;
    if (ev.desc) {
      labels += `<text x="${LINE_X + 18}" y="${y + 22}" font-size="11" fill="#666" font-family="'Inter',system-ui,sans-serif">${ev.desc}</text>`;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LAYOUT_W} ${H}" width="${w}" height="${displayH}" style="max-width:100%;font-family:'Inter',system-ui,sans-serif">${lines}${dots}${labels}</svg>`;
}

export default createExtension({
  id: 'timeline',
  containerClass: 'timeline-diagram',

  render(div, src) {
    // Read hint before render; apply alignment AFTER so explicit dims are known
    const mznStyle = readMznStyle(div);
    const svgW = mznStyle.width ? parseInt(mznStyle.width) : 560;
    div.innerHTML = renderTimeline(src, svgW);
    if (mznStyle.width || mznStyle.align) div.style.width = svgW + 'px';
    if (mznStyle.align) {
      if (mznStyle.align === 'center') { div.style.display = 'block'; div.style.margin = '0 auto'; }
      else if (mznStyle.align === 'left')  { div.style.display = 'block'; div.style.marginLeft = '0'; div.style.marginRight = 'auto'; }
      else if (mznStyle.align === 'right') { div.style.display = 'block'; div.style.marginLeft = 'auto'; div.style.marginRight = '0'; }
    }
  },
});
