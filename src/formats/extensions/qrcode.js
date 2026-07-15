import QRCode from 'qrcode';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

export default createExtension({
  id: 'qrcode',
  containerClass: 'qrcode-diagram',
  trim: true,

  async render(div, src) {
    const mznStyle = applyMznStyle(div);
    const text = src;
    const size = mznStyle.width ? parseInt(mznStyle.width) : 180;
    const svg = await QRCode.toString(text, { type: 'svg', margin: 2, width: size, color: { dark: '#000', light: '#fff' } });
    div.innerHTML = `${svg}<div class="qrcode-caption">${text}</div>`;
    const svgEl = div.querySelector('svg');
    // Set inline style (not just attributes) - CSS class rule beats HTML attributes
    if (svgEl) { svgEl.style.width = size + 'px'; svgEl.style.height = size + 'px'; }
    if (mznStyle.width) div.style.width = size + 'px';
  },
});
