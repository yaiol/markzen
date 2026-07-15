import Chart from 'chart.js/auto';
import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

export default createExtension({
  id: 'chartjs',
  containerClass: 'chartjs-diagram',

  render(div, src) {
    const mznStyle = readMznStyle(div);
    const spec = JSON.parse(src);
    if (mznStyle.width)  div.style.width  = mznStyle.width  + 'px';
    if (mznStyle.height) div.style.height = mznStyle.height + 'px';
    div.innerHTML = '<canvas></canvas>';
    new Chart(div.querySelector('canvas'), spec);
    if (mznStyle.align) {
      if (!mznStyle.width) div.style.width = div.offsetWidth + 'px';
      applyMznAlign(div, mznStyle);
    }
  },
});
