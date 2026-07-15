import cytoscape from 'cytoscape';
import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

export default createExtension({
  id: 'cytoscape',
  containerClass: 'cytoscape-diagram',

  render(div, src, ctx) {
    const mznStyle = readMznStyle(div);
    const spec = JSON.parse(src);
    div.innerHTML = '';
    if (mznStyle.width)  div.style.width  = mznStyle.width  + 'px';
    if (mznStyle.height) div.style.height = mznStyle.height + 'px';
    const cy = cytoscape({
      container: div,
      style: spec.style || [
        { selector: 'node', style: { 'background-color': '#4a9eff', 'color': '#fff', 'text-valign': 'center', 'font-size': '12px', 'width': 40, 'height': 40 } },
        { selector: 'node[label]', style: { 'label': 'data(label)' } },
        { selector: 'edge', style: { 'width': 2, 'line-color': '#aaa', 'target-arrow-color': '#aaa', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier', 'font-size': '10px', 'color': '#888' } },
        { selector: 'edge[label]', style: { 'label': 'data(label)' } },
      ],
      ...spec,
    });
    // Layout runs before the container has its final pixel dimensions - re-fit after paint
    requestAnimationFrame(() => {
      cy.resize(); cy.fit(undefined, 20);
      if (mznStyle.align) {
        if (!mznStyle.width) div.style.width = div.offsetWidth + 'px';
        applyMznAlign(div, mznStyle);
      }
    });
    // Register instance so export can capture canvas snapshots
    ctx?.cytoscapeRegistry?.set(div, cy);
  },
});
