import katex from 'katex';
import 'katex/dist/katex.min.css';

// ⚠ CLAUDE: Expose katex globally so pseudocode can find it as a math backend.
// This must run before pseudocode is rendered.
window.katex = katex;

// ─── Math protection / restoration pipeline ───────────────────────────────────
// katex is NOT a standard factory extension - it intercepts $...$ before showdown
// converts them (protectMath) and restores them after all other injects run.
// The mathStore is module-level state shared between protectMath and the inject fn.

const mathStore = [];

// Called in render pipeline BEFORE showdown conversion
export function protectMath(md) {
  mathStore.length = 0;
  // Single pass: skip fenced code blocks and inline code spans, protect $$...$$ then $...$
  md = md.replace(/(`{3,})[^\n]*\n[\s\S]*?\n\1[ \t]*(?=\n|$)|`[^`\n]*`|(\$\$[\s\S]*?\$\$)|(\$[^\n$]*?\$)/g, (match, fenced, block, inline) => {
    if (fenced !== undefined) return match;
    if (block !== undefined) {
      mathStore.push({ tex: block.slice(2, -2), display: true });
      return `MATHPLACEHOLDER${mathStore.length - 1}ENDMATH`;
    }
    if (inline !== undefined) {
      mathStore.push({ tex: inline.slice(1, -1), display: false });
      return `MATHPLACEHOLDER${mathStore.length - 1}ENDMATH`;
    }
    return match;
  });
  return md;
}

export default {
  id: 'katex',

  // Runs after showdown + other injects - replaces MATHPLACEHOLDER tokens with KaTeX HTML.
  // Also handles [source,katex] code blocks from AsciiDoc (language-katex class).
  inject(html) {
    // Markdown: replace $...$ / $$...$$ placeholders
    html = html.replace(/MATHPLACEHOLDER(\d+)ENDMATH/g, (_, i) => {
      const { tex, display } = mathStore[parseInt(i)];
      try {
        return katex.renderToString(tex, { displayMode: display, throwOnError: false });
      } catch {
        return `<span style="color:red">${tex}</span>`;
      }
    });
    // AsciiDoc: render [source,katex] fenced blocks as display-mode KaTeX
    html = html.replace(/<pre><code class="[^"]*language-katex[^"]*">([\s\S]*?)<\/code><\/pre>/g, (_, code) => {
      const tex = code.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
      try {
        return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false });
      } catch (e) {
        return `<span style="color:red">${e.message}</span>`;
      }
    });
    // AsciiDoc: render stem:[...] inline math - Asciidoctor emits \(...\) for inline, \[...\] for display.
    // ⚠ CLAUDE: these two passes run on the FULL converted HTML, so they must skip
    // <pre>/<code> chunks — a code block containing literal \(...\) or \[...\]
    // (e.g. a regex over LaTeX delimiters) was being math-rendered, mangling the
    // code and inserting display-math line breaks mid-block (2026-07-21).
    const outsideCode = (input, fn) => input
      .split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/g)
      .map((part, i) => (i % 2 ? part : fn(part)))
      .join("");
    html = outsideCode(html, part => part.replace(/\\\((.+?)\\\)/g, (_, tex) => {
      try { return katex.renderToString(tex, { displayMode: false, throwOnError: false }); }
      catch (e) { return `<span style="color:red">${e.message}</span>`; }
    }));
    html = outsideCode(html, part => part.replace(/\\\[([\s\S]+?)\\\]/g, (_, tex) => {
      try { return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false }); }
      catch (e) { return `<span style="color:red">${e.message}</span>`; }
    }));
    return html;
  },

  render: null, // no async DOM rendering needed
};
