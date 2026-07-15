import { renderAny as wavedromRenderAny } from 'wavedrom';
import wavedromSkin from 'wavedrom/skins/default';
import onmlStringify from 'onml/stringify.js';
import { createExtension } from '../shared/extensionFactory';
import { applyMznStyle } from '../shared/utils';

let wavedromIndex = 0;

export default createExtension({
  id: 'wavedrom',
  containerClass: 'wavedrom-diagram',

  render(div, src) {
    applyMznStyle(div);
    try {
      // eslint-disable-next-line no-new-func
      const source = new Function('return (' + src + ')')();
      // Render WaveDrom SVG and inline all <use href="#id"> references.
      // ⚠ CLAUDE: Do NOT use <use href="#id"> in the injected SVG - Chromium 130+ with
      // contextIsolation+preload breaks inline SVG <use> ID resolution regardless of
      // whether href or xlink:href is used, or how the SVG is injected.
      // Fix: use DOMParser to parse the SVG string (isolated, no insertion into the live
      // doc), replace every <use> with a deep clone of its referenced <defs> element
      // (transform preserved), then serialize back to string and inject via innerHTML.
      // This eliminates all ID lookups entirely - the SVG is fully self-contained.
      const idx = wavedromIndex++;
      const rawSvg = onmlStringify(wavedromRenderAny(idx, source, wavedromSkin));
      const svgDoc = new DOMParser().parseFromString(rawSvg, 'image/svg+xml');
      const defsMap = {};
      svgDoc.querySelectorAll('defs > [id]').forEach(el => { defsMap['#' + el.id] = el; });
      svgDoc.querySelectorAll('use').forEach(use => {
        const href = use.getAttributeNS('http://www.w3.org/1999/xlink', 'href') || use.getAttribute('href');
        const def = href && defsMap[href];
        if (!def) return;
        const clone = def.cloneNode(true);
        clone.removeAttribute('id');
        const t = use.getAttribute('transform');
        if (t) clone.setAttribute('transform', (clone.getAttribute('transform') ? clone.getAttribute('transform') + ' ' : '') + t);
        const cls = use.getAttribute('class');
        if (cls) clone.setAttribute('class', cls);
        use.parentNode.replaceChild(clone, use);
      });
      const inlinedSvg = new XMLSerializer().serializeToString(svgDoc.documentElement);
      div.innerHTML = inlinedSvg;
      // Scope WaveDrom's injected <style> rules to its own SVG element via ID.
      // ⚠ CLAUDE: Do NOT scope via HTML ancestor (.wavedrom-diagram) - that broke SVG
      // rendering in Chromium 130. Scope via the SVG's own id (#svgcontent_N) instead.
      // This prevents WaveDrom's bare selectors (e.g. text{font-family:Helvetica})
      // from overriding other extensions' fonts (e.g. VexFlow's Bravura music font).
      const svgId = div.querySelector('svg')?.id;
      if (svgId) {
        div.querySelectorAll('style').forEach(styleEl => {
          styleEl.textContent = styleEl.textContent.replace(
            /([^{}]+)\{/g,
            (_, selectors) => selectors.split(',').map(s => `#${svgId} ${s.trim()}`).join(', ') + '{'
          );
        });
      }
    } catch (e) {
      div.innerHTML = `<pre style="color:red">WaveDrom error: ${e.message}</pre>`;
    }
  },
});
