// asciidoctor 4 exports convert/load as top-level named functions (the v3 callable
// default factory, `Asciidoctor()`, was removed).
import { convert } from 'asciidoctor';

// ─── AsciiDoc → HTML ──────────────────────────────────────────────────────────
// safe: 'safe' allows most content but restricts dangerous directives.
// header_footer: false - we inject into an existing HTML page, not a standalone doc.
// showtitle: true - render the = Title line as an <h1>.
export async function asciidocToHtml(text) {
  // ⚠ CLAUDE: asciidoctor v4's ESM convert() is ASYNC (returns a Promise) — it MUST be awaited, or the
  // .replace() normalisation below gets a Promise and throws (v3's synchronous factory was removed).
  let html = await convert(text || '', {
    safe: 'safe',
    header_footer: false,
    showtitle: true,
    attributes: {
      'source-highlighter': false, // we handle code blocks via extensions
      'icons': false,
      'stem': 'latexmath',         // enable stem:[...] inline math macro → outputs \(...\)
    },
  });
  // Unwrap listingblock divs - Asciidoctor wraps each code block in
  // <div class="listingblock"><div class="content">...</div></div>.
  // Removing these wrappers gives a flat structure identical to Markdown output,
  // so mzn-style-hint previousElementSibling detection works correctly.
  html = html.replace(/<div class="listingblock">\n?<div class="content">\n?([\s\S]*?)\n?<\/div>\n?<\/div>/g, '$1');
  // Normalize code block HTML to match the <pre><code class="language-X"> pattern
  // expected by all extension inject() functions.
  // Asciidoctor outputs: <pre class="highlight"><code class="language-X" data-lang="X">
  // Extensions expect:   <pre><code class="language-X">
  html = html.replace(/<pre[^>]*class="highlight"[^>]*>/g, '<pre>');
  html = html.replace(/(<code\b[^>]*?) data-lang="[^"]*"/g, '$1');
  return html;
}
