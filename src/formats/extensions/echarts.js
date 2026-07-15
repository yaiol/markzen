import * as echarts from 'echarts';
import { createExtension } from '../shared/extensionFactory';
import { readMznStyle, applyMznAlign } from '../shared/utils';

export default createExtension({
  id: 'echarts',
  containerClass: 'echarts-diagram',

  render(div, src) {
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
