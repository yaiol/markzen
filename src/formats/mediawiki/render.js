import { resetMath, protectMathToken } from '../extensions/katex';

// ⚠ CLAUDE: this parser is loaded the first time a document of THIS format is opened,
// never at startup — a static import puts the whole parser in the entry chunk, which every
// user pays for even when they only ever open Markdown. The exported toHtml is async for
// that reason; App.jsx's single call site already handles a Promise. Do not restore a
// top-level import or drop the async.
//
// (katex above is the one exception: it is a STATIC import everywhere already — see the
// guard at the top of extensions/katex.js — so importing it here adds nothing to the bundle.)
let wtf, wtfHtml;
let __libsP;
const __loadLibs = () => (__libsP ??= (async () => {
  wtf = (await import('wtf_wikipedia')).default;
  wtfHtml = (await import('wtf-plugin-html')).default;
  wtf.extend(wtfHtml);          // must run here — `wtf` does not exist before the import
})());

// ⚠ CLAUDE: wtf_wikipedia is an ARTICLE-TEXT extractor, not a wikitext renderer. It keeps prose
// and SILENTLY DELETES everything else: <syntaxhighlight>, <math>, <score> vanish outright, and
// <pre> is flattened into an ordinary paragraph. A Wikipedia article pasted into Markzen lost
// every formula and every code block, with no error (PLAN-compatibility.md F2/F13).
//
// So the tags are pulled OUT before wtf sees them and put back after, exactly the way
// protectMath shields $...$ from showdown for Markdown. Verified: a bare token survives wtf
// untouched, wrapped in <p class="paragraph"><span class="sentence">…</span></p>.
//
// Do NOT "simplify" this back to a bare wtf(text).html() — that is the bug, not the tidy version.

const BLOCK_TOKEN = (n) => `WIKIBLOCK${n}ENDWIKIBLOCK`;

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Pull every non-prose block out of the wikitext, leaving a bare token in its place.
// Returns [protectedText, blocks] where each block is the HTML to restore.
function extractBlocks(text) {
  const blocks = [];
  const hold = (html) => { blocks.push(html); return BLOCK_TOKEN(blocks.length - 1); };

  // <math> — MediaWiki's math tag (the Math extension). `display="block"` is display mode;
  // bare <math> is inline, which is how Wikipedia writes most of its formulas.
  // Registered with katex directly, so it uses the same renderer as every other format.
  text = text.replace(/<math([^>]*)>([\s\S]*?)<\/math>/gi, (_, attrs, tex) =>
    protectMathToken(tex.trim(), /display\s*=\s*["']?block/i.test(attrs)));

  // <syntaxhighlight lang="X"> and its deprecated alias <source lang="X"> — the SyntaxHighlight
  // extension bundled with MediaWiki. The `lang` becomes the code-block language, so a
  // lang Markzen recognises (mermaid, chess, …) renders as a live figure exactly as it would
  // in any other markup: the shape below is what every extension's inject() matches.
  text = text.replace(
    /<(syntaxhighlight|source)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_, _tag, attrs, code) => {
      const m = /lang\s*=\s*["']?([\w+-]+)/i.exec(attrs);
      const cls = m ? ` class="language-${m[1].toLowerCase()}"` : '';
      return hold(`<pre><code${cls}>${esc(code.replace(/^\n/, '').replace(/\n\s*$/, ''))}</code></pre>`);
    });

  // <pre> — plain preformatted text. wtf flattens it into a paragraph, losing the whole point.
  text = text.replace(/<pre([^>]*)>([\s\S]*?)<\/pre>/gi, (_, _attrs, code) =>
    hold(`<pre><code>${esc(code.replace(/^\n/, '').replace(/\n\s*$/, ''))}</code></pre>`));

  // <score> — the LilyPond music extension. Markzen has no LilyPond renderer, so the score
  // is shown as its source rather than deleted: keeping the content beats losing it silently.
  text = text.replace(/<score([^>]*)>([\s\S]*?)<\/score>/gi, (_, _attrs, code) =>
    hold(`<pre><code class="language-lilypond">${esc(code.trim())}</code></pre>`));

  return [text, blocks];
}

// Put the held blocks back. wtf wraps a lone token in its paragraph/sentence markup, so that
// wrapper is consumed too — a <pre> nested inside a <p> is invalid and the browser would
// re-parent it, splitting the paragraph around it.
function restoreBlocks(html, blocks) {
  if (!blocks.length) return html;
  return html.replace(
    /(?:<p class="paragraph">\s*<span class="sentence">\s*)?WIKIBLOCK(\d+)ENDWIKIBLOCK(?:\s*<\/span>\s*<\/p>)?/g,
    (_, i) => blocks[parseInt(i, 10)] ?? '');
}

// ─── MediaWiki Wikitext → HTML ────────────────────────────────────────────────
export async function wikitextToHtml(text) {
  await __loadLibs();
  resetMath();                       // math tokens are absolute indices into katex's store
  const [protectedText, blocks] = extractBlocks(text);
  const doc = wtf(protectedText);
  return restoreBlocks(doc.html(), blocks);
}
