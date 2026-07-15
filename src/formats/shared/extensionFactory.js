import { decodeHtmlEntities } from './utils';

// ─── Extension factory ────────────────────────────────────────────────────────
// Eliminates boilerplate for the ~24 extensions that follow the standard pattern:
//   inject: replace language-X code blocks with placeholder divs (data-encoded src)
//   render: find placeholders, decode src, call library, handle errors
//
// Extensions too unique for the standard pattern (katex, plantuml, railroad,
// style, markzen) are written by hand and do NOT use this factory.

export function createExtension({
  id,
  langPattern,    // regex pattern for the language tag (default: id)
  langId,         // value of data-mzn-lang on the generated div (default: id)
  containerClass, // CSS class of the generated div (default: `${id}-render`)
  dataKey,        // data attribute key for encoded source (default: id)
  trim = false,   // trim decoded source before encoding (qrcode, smiles)
  inject: customInject,   // override standard inject entirely
  render: renderFn,       // (div, decodedSrc, context) => void | Promise<void>
}) {
  const cls  = containerClass || `${id}-render`;
  const dk   = dataKey        || id;
  const lid  = langId         || id;
  const lpat = langPattern    || id;

  return {
    id,
    inject: customInject ?? ((html) => injectBlocks(html, lpat, cls, dk, lid, trim)),
    render: renderFn ? (el, ctx) => renderBlocks(el, cls, dk, renderFn, ctx) : null,
  };
}

// ─── Standard inject ──────────────────────────────────────────────────────────
function injectBlocks(html, langPattern, containerClass, dataKey, langId, trim) {
  let nth = 0;
  return html.replace(
    new RegExp(`<pre><code class="[^"]*language-${langPattern}[^"]*">([\\s\\S]*?)</code></pre>`, 'g'),
    (_, code) => {
      const src = trim
        ? decodeHtmlEntities(code).trim()
        : decodeHtmlEntities(code);
      return `<div class="${containerClass}" data-mzn-lang="${langId}" data-mzn-nth="${++nth}" data-${dataKey}="${encodeURIComponent(src)}"></div>`;
    }
  );
}

// ─── Standard render ─────────────────────────────────────────────────────────
async function renderBlocks(el, containerClass, dataKey, renderFn, ctx) {
  const divs = el.querySelectorAll(`.${containerClass}`);
  for (const div of divs) {
    const src = decodeURIComponent(div.dataset[dataKey] || '');
    try {
      await renderFn(div, src, ctx);
    } catch (e) {
      div.innerHTML = `<pre style="color:red">${e.message}</pre>`;
    }
  }
}
