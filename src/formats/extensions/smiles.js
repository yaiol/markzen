import SmilesDrawer from 'smiles-drawer';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'smiles',
  containerClass: 'smiles-diagram',
  trim: true,

  render(div, src, ctx) {
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
