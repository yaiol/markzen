import { createExtension } from '../shared/extensionFactory';
import { readMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let ABCJS;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ABCJS = (await import('abcjs')).default;
})());

export default createExtension({
  id: 'abc',
  containerClass: 'abc-notation',

  async render(div) {

    await __loadLibs();
    // Read mzn style before render - ABCJS overwrites div.style during draw,
    // so any styles set before render are lost. Apply alignment AFTER.
    const hint = div.previousElementSibling;
    let mznStyle = {};
    try { if (hint?.classList.contains('mzn-style-hint')) mznStyle = JSON.parse(decodeURIComponent(hint.dataset.mznStyle || '{}')); } catch {}
    const abc = decodeURIComponent(div.dataset.abc || '');
    // When align is set, use staffwidth to constrain the SVG width so margin:auto has room.
    // responsive:'resize' renders at container width - unusable when container is fit-content.
    const abcOpts = mznStyle.align
      ? { staffwidth: mznStyle.width ? parseInt(mznStyle.width) : 400 }
      : { responsive: 'resize' };
    if (abc) ABCJS.renderAbc(div, abc, abcOpts);
    // Apply mzn align AFTER render - ABCJS overwrites the entire div.style during draw
    if (mznStyle.align) {
      const svg = div.querySelector('svg');
      const svgW = svg?.getAttribute('width');
      if (svgW) div.style.width = svgW + 'px';
      if (mznStyle.align === 'center') { div.style.display = 'block'; div.style.margin = '0 auto'; }
      else if (mznStyle.align === 'left')  { div.style.display = 'block'; div.style.marginLeft = '0'; div.style.marginRight = 'auto'; }
      else if (mznStyle.align === 'right') { div.style.display = 'block'; div.style.marginLeft = 'auto'; div.style.marginRight = '0'; }
    }
  },
});
