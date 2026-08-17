import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let SmilesDrawer;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  SmilesDrawer = (await import('smiles-drawer')).default;
})());

export default createExtension({
  id: 'smiles',
  containerClass: 'smiles-diagram',
  trim: true,

  async render(div, src, ctx) {

    await __loadLibs();
    const mznStyle = applyMznStyle(div);
    if (!src) return;
    const w = mznStyle.width  ? parseInt(mznStyle.width)  : 300;
    // When only width is set, use a square canvas so the molecule scales with width.
    // With a fixed height and a square viewBox, preserveAspectRatio clips to height - the molecule never grows.
    const h = mznStyle.height ? parseInt(mznStyle.height) : (mznStyle.width ? w : 180);
    const drawer = new SmilesDrawer.SvgDrawer({ width: w, height: h });
    div.innerHTML = '';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    div.appendChild(svg);
    const theme = ctx?.themeKey === 'dark' ? 'dark' : 'light';
    SmilesDrawer.parse(src, (tree) => {
      drawer.draw(tree, svg, theme, false);
      svg.style.width  = w + 'px'; // override SvgWrapper's auto-computed style (takes precedence over attributes)
      svg.style.height = h + 'px';
      div.style.width  = w + 'px'; // constrain div so margin:0 auto align works
    }, (err) => {
      div.innerHTML = `<pre style="color:red">SMILES error: ${err}</pre>`;
    });
  },
});
