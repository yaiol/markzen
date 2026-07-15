import textile from 'textile-js';

// ─── Textile → HTML ──────────────────────────────────────────────────────────
// textile-js copies the language class to both <pre class="language-X"> and
// <code class="language-X">, but all extension inject()s match only the pattern
// <pre><code class="language-X"> (no class on the <pre> element).
// Strip the class from <pre> so the inject regexes fire correctly.
export function textileToHtml(text) {
  let html = textile(text);
  html = html.replace(/<pre class="[^"]*">/g, '<pre>');
  return html;
}
