import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

// ⚠ CLAUDE: this library is loaded ON FIRST RENDER, never at startup. Static imports here
// put the whole library in the entry chunk — 40 of them cost ~3s of cold start. Keep the
// binding declared here and resolved in __loadLibs(); do NOT restore a top-level import.
let echarts;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  echarts = await import('echarts');
})());

export default createExtension({
  id: 'echarts',
  containerClass: 'echarts-diagram',

  async render(div, src) {

    await __loadLibs();
    const mznStyle = readMznStyle(div);
    const option = JSON.parse(src);
    if (mznStyle.width)  div.style.width  = mznStyle.width  + 'px';
    if (mznStyle.height) div.style.height = mznStyle.height + 'px';
    const chart = echarts.init(div);
    chart.setOption(option);
    if (mznStyle.width || mznStyle.height) chart.resize();
    if (mznStyle.align) {
      if (!mznStyle.width) div.style.width = div.offsetWidth + 'px';
      applyMznAlign(div, mznStyle);
    }
  },
});
