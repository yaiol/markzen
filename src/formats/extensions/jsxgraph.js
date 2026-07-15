import JXG from 'jsxgraph';
// ⚠ CLAUDE: jsxgraph CSS cannot be imported directly - its package.json exports field
// does not expose ./distrib/jsxgraph.css. CSS is inlined in buildCss() in App.jsx instead.
import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

export default createExtension({
  id: 'jsxgraph',
  containerClass: 'jsxgraph-diagram',

  render(div, src) {
    const mznStyle = readMznStyle(div);
    const spec = JSON.parse(src);
    div.innerHTML = '';
    const inner = document.createElement('div');
    const id = `jxg-${Date.now()}-${div.dataset.mznNth || 0}`;
    inner.id = id;
    inner.style.cssText = `width:${mznStyle.width ? mznStyle.width + 'px' : '100%'};height:${mznStyle.height ? mznStyle.height + 'px' : '400px'};`;
    if (mznStyle.width) div.style.width = mznStyle.width + 'px';
    div.appendChild(inner);
    const board = JXG.JSXGraph.initBoard(id, {
      boundingbox: spec.boundingbox || [-5, 5, 5, -5],
      axis:        spec.axis !== false,
      showNavigation: false,
      showCopyright:  false,
    });
    (spec.elements || []).forEach(el => {
      if (el.type === 'functiongraph') {
        board.create('functiongraph', [new Function('x', `return ${el.fn}`)], { strokeColor: el.color || '#0066cc' }); // eslint-disable-line no-new-func
      } else if (el.type === 'point') {
        board.create('point', el.coords, { name: el.name || '', fixed: true, color: el.color || '#cc0000', showInfobox: false });
      } else if (el.type === 'circle') {
        const ctr = board.create('point', el.center, { visible: false });
        board.create('circle', [ctr, el.radius], { strokeColor: el.color || '#0066cc', fillOpacity: 0 });
      } else if (el.type === 'line') {
        board.create('line', [el.p1, el.p2], { strokeColor: el.color || '#333' });
      }
    });
    if (mznStyle.align) {
      if (!mznStyle.width) div.style.width = div.offsetWidth + 'px';
      applyMznAlign(div, mznStyle);
    }
  },
});
