import { unified } from 'unified';
import uniorgParse from 'uniorg-parse';
import uniorgRehype from 'uniorg-rehype';
import rehypeStringify from 'rehype-stringify';

// ─── Unified pipeline - singleton ────────────────────────────────────────────
const processor = unified()
  .use(uniorgParse)
  .use(uniorgRehype)
  .use(rehypeStringify);

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
export function orgToHtml(text) {
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
