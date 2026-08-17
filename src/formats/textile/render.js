
// ⚠ CLAUDE: this parser is loaded the first time a document of THIS format is opened,
// never at startup — a static import puts the whole parser in the entry chunk, which every
// user pays for even when they only ever open Markdown. The exported toHtml is async for
// that reason; App.jsx's single call site already handles a Promise. Do not restore a
// top-level import or drop the async.
let textile;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  textile = (await import('textile-js')).default;
})());

// ─── Textile → HTML ──────────────────────────────────────────────────────────
// textile-js copies the language class to both <pre class="language-X"> and
// <code class="language-X">, but all extension inject()s match only the pattern
// <pre><code class="language-X"> (no class on the <pre> element).
// Strip the class from <pre> so the inject regexes fire correctly.
export async function textileToHtml(text) {
  await __loadLibs();
  let html = textile(text);
  html = html.replace(/<pre class="[^"]*">/g, '<pre>');
  return html;
}
