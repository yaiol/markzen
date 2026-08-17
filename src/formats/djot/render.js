
// ⚠ CLAUDE: this parser is loaded the first time a document of THIS format is opened,
// never at startup — a static import puts the whole parser in the entry chunk, which every
// user pays for even when they only ever open Markdown. The exported toHtml is async for
// that reason; App.jsx's single call site already handles a Promise. Do not restore a
// top-level import or drop the async.
let parse, renderHTML;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ({ parse, renderHTML } = await import('@djot/djot'));
})());

// ─── Djot → HTML ─────────────────────────────────────────────────────────────
export async function djotToHtml(text) {
  await __loadLibs();
  return renderHTML(parse(text));
}
