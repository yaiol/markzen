
// ⚠ CLAUDE: this parser is loaded the first time a document of THIS format is opened,
// never at startup — a static import puts the whole parser in the entry chunk, which every
// user pays for even when they only ever open Markdown. The exported toHtml is async for
// that reason; App.jsx's single call site already handles a Promise. Do not restore a
// top-level import or drop the async.
let wtf, wtfHtml;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  wtf = (await import('wtf_wikipedia')).default;
  wtfHtml = (await import('wtf-plugin-html')).default;
  wtf.extend(wtfHtml);          // must run here — `wtf` does not exist before the import
})());

// ─── MediaWiki Wikitext → HTML ────────────────────────────────────────────────
export async function wikitextToHtml(text) {
  await __loadLibs();
  const doc = wtf(text);
  return doc.html();
}
