// ─── Shared DOM and string utilities used by multiple extensions ──────────────

export function decodeHtmlEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

// Read the mzn-style-hint div that precedes an extension div (set by markzen inject)
export function readMznStyle(el) {
  const hint = el.previousElementSibling;
  if (!hint?.classList.contains('mzn-style-hint')) return {};
  try { return JSON.parse(decodeURIComponent(hint.dataset.mznStyle || '{}')); } catch { return {}; }
}

// Apply mzn alignment directives (align, width) to an extension container div.
// Returns the parsed style object so callers can inspect width/height.
export function applyMznStyle(el) {
  const style = readMznStyle(el);
  if (style.align) {
    if (!style.width) el.style.width = 'fit-content';
    applyMznAlign(el, style);
  }
  return style;
}

export function applyMznAlign(el, style) {
  if (!style.align) return;
  if (style.align === 'center') { el.style.display = 'block'; el.style.margin = '0 auto'; }
  else if (style.align === 'left')  { el.style.display = 'block'; el.style.marginLeft = '0'; el.style.marginRight = 'auto'; }
  else if (style.align === 'right') { el.style.display = 'block'; el.style.marginLeft = 'auto'; el.style.marginRight = '0'; }
}

// SVGs that use viewBox + max-width:100% without explicit width/height attrs collapse
// when their container is fit-content. Extract viewBox dims, set explicit attrs.
export function fixSvgDims(div) {
  const svgEl = div.querySelector('svg');
  if (!svgEl) return;
  const vb = (svgEl.getAttribute('viewBox') || '').split(' ');
  if (vb.length === 4) {
    svgEl.setAttribute('width',  vb[2]);
    svgEl.setAttribute('height', vb[3]);
    svgEl.style.removeProperty('max-width');
    div.style.width = vb[2] + 'px';
  }
}
