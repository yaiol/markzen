import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let Chart;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  Chart = (await import('chart.js/auto')).default;
})());

export default createExtension({
  id: 'chartjs',
  containerClass: 'chartjs-diagram',

  async render(div, src) {

    await __loadLibs();
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
