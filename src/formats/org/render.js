
// ⚠ CLAUDE: this parser is loaded the first time a document of THIS format is opened,
// never at startup — a static import puts the whole parser in the entry chunk, which every
// user pays for even when they only ever open Markdown. The exported toHtml is async for
// that reason; App.jsx's single call site already handles a Promise. Do not restore a
// top-level import or drop the async.
let unified, uniorgParse, uniorgRehype, rehypeStringify;
let processor;                  // unified pipeline singleton, built inside the loader
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  ({ unified } = await import('unified'));
  uniorgParse = (await import('uniorg-parse')).default;
  uniorgRehype = (await import('uniorg-rehype')).default;
  rehypeStringify = (await import('rehype-stringify')).default;
  // ─── Unified pipeline - singleton ──────────────────────────────────────────
  // Built here, not at module scope: `unified` does not exist before the import above.
  processor = unified()
    .use(uniorgParse)
    .use(uniorgRehype)
    .use(rehypeStringify);
})());

// ─── Org-Mode → HTML ─────────────────────────────────────────────────────────
// uniorg-rehype outputs math as <span class="math math-inline"> and
// <div class="math math-display">. We convert those to \(...\) and \[...\]
// so the katex extension inject() handles them correctly.
//
// uniorg-rehype outputs code blocks as <pre class="src-block"><code class="language-X">
// which we normalize to <pre><code class="language-X"> so all extension inject()s work.
//
// ⚠ CLAUDE: katex protectMath is not called - uniorg emits math spans directly;
// orgToHtml() converts them to \(...\) / \[...\] which the katex inject() handles.
export async function orgToHtml(text) {
  await __loadLibs();
  let html = processor.processSync(text).toString();

  // Normalize src-block pre wrapper - extensions expect plain <pre>
  html = html.replace(/<pre class="src-block">/g, '<pre>');

  // #+BEGIN_EXAMPLE outputs <div class="example"> which loses whitespace.
  // Convert to <pre> so source examples render with monospace + preserved line breaks.
  html = html.replace(/<div class="example">([\s\S]*?)<\/div>/g, '<pre>$1</pre>');

  // Convert uniorg inline math spans to \(...\) for katex inject
  html = html.replace(/<span class="math math-inline">([\s\S]*?)<\/span>/g, (_, tex) => `\\(${tex}\\)`);

  // Convert uniorg display math divs to \[...\] for katex inject
  html = html.replace(/<div class="math math-display">([\s\S]*?)<\/div>/g, (_, tex) => `\\[${tex}\\]`);

  return html;
}
