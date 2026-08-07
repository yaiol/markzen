// ─── BBCode → HTML ───────────────────────────────────────────────────────────
//
// Hand-written because Pandoc has no BBCode READER. It has six BBCode *writers*
// (bbcode, bbcode_phpbb, bbcode_xenforo, bbcode_steam, bbcode_fluxbb,
// bbcode_hubzilla), which is why export needs no code of ours — but nothing can
// parse BBCode back, so opening a .bbcode file is entirely this file's job.
//
// ⚠ CLAUDE: BBCode has no specification. Every forum invented its own dialect,
// so this reader is deliberately TOLERANT — it accepts the union of the common
// spellings ([list]/[ul], [s]/[strike]/[del], [h1]/[heading=1], [code]/[icode]/
// [noparse]) rather than enforcing one. An unrecognised tag is emitted as
// literal text, never dropped: a forum post full of exotic tags must still be
// readable, and silently swallowing "[size=huge]" would look like data loss.
//
// The dialect Markzen WRITES is bbcode_hubzilla (see PANDOC_WRITE_MAP in
// electron/main.mjs) — the only variant that keeps real [h1] headings, tables,
// [hr] AND images. Everything hubzilla emits must round-trip through here.

// ─── Escaping ────────────────────────────────────────────────────────────────

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escAttr(s) {
  return esc(s).replace(/"/g, '&quot;');
}

// ⚠ CLAUDE: a .bbcode file is untrusted input (it is, literally, a forum post).
// Never emit a href/src the browser would execute — javascript: and non-image
// data: URIs are the two that matter. Rejected URLs render as plain text.
function safeUrl(raw, { allowData = false } = {}) {
  const u = String(raw || '').trim();
  if (!u) return null;
  if (/^\s*javascript:/i.test(u)) return null;
  if (/^\s*vbscript:/i.test(u)) return null;
  if (/^\s*data:/i.test(u)) return allowData && /^data:image\//i.test(u) ? u : null;
  return u;
}

// CSS values land inside a style="" attribute, so keep them to a boring subset.
function safeColor(v) {
  const c = String(v || '').trim();
  return /^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\))$/i.test(c) ? c : null;
}

function safeFont(v) {
  const f = String(v || '').trim();
  return /^[\w\s,'-]+$/.test(f) ? f : null;
}

// BBCode [size] is either a 1-7 scale (forum convention) or an explicit px value.
function safeSize(v) {
  const s = String(v || '').trim();
  if (/^[1-7]$/.test(s)) return `${[0.7, 0.85, 1, 1.2, 1.5, 2, 2.5][Number(s) - 1]}em`;
  if (/^\d{1,3}(px|pt|em|rem|%)$/.test(s)) return s;
  if (/^\d{1,3}$/.test(s)) return `${s}px`;
  return null;
}

// ─── Lexer ───────────────────────────────────────────────────────────────────

// [b] [/b] [url=x] [img alt="y"] [*] [h1] [list=1]
const TAG_RE = /\[(\/?)([a-z*][a-z0-9]*)((?:=[^\]]*)|(?:\s+[^\]]*))?\]/gi;

// Verbatim spans are lexed FIRST and never tokenized, so "[b]" inside a code
// block stays literal text instead of turning into markup.
const VERBATIM_RE = /\[(code|noparse|icode)((?:=[^\]]*)?)\]([\s\S]*?)\[\/\1\]/gi;

function tokenizeMarkup(src) {
  const out = [];
  let last = 0;
  let m;
  TAG_RE.lastIndex = 0;
  while ((m = TAG_RE.exec(src)) !== null) {
    if (m.index > last) out.push({ t: 'text', v: src.slice(last, m.index) });
    out.push({
      t: 'tag',
      name: m[2].toLowerCase(),
      closing: m[1] === '/',
      arg: m[3] || '',
      raw: m[0],
    });
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push({ t: 'text', v: src.slice(last) });
  return out;
}

function lex(src) {
  const out = [];
  let pos = 0;
  let m;
  VERBATIM_RE.lastIndex = 0;
  while ((m = VERBATIM_RE.exec(src)) !== null) {
    if (m.index > pos) out.push(...tokenizeMarkup(src.slice(pos, m.index)));
    out.push({
      t: 'verbatim',
      tag: m[1].toLowerCase(),
      lang: (m[2] || '').replace(/^=/, '').trim(),
      body: m[3],
    });
    pos = m.index + m[0].length;
  }
  if (pos < src.length) out.push(...tokenizeMarkup(src.slice(pos)));
  return out;
}

// ─── Parser ──────────────────────────────────────────────────────────────────

const BLOCK_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'heading',
  'list', 'ul', 'ol', 'olist', 'quote', 'table', 'tr', 'td', 'th',
  'center', 'left', 'right', 'align', 'spoiler', '*',
]);

const INLINE_TAGS = new Set([
  'b', 'i', 'u', 's', 'strike', 'del', 'em', 'strong',
  'url', 'img', 'color', 'size', 'font', 'sub', 'sup', 'highlight',
]);

const VOID_TAGS = new Set(['hr', 'br']);

const KNOWN = new Set([...BLOCK_TAGS, ...INLINE_TAGS, ...VOID_TAGS]);

/** Strip the leading "=" or the attribute form off a tag argument. */
function cleanArg(arg) {
  const a = String(arg || '').trim();
  if (a.startsWith('=')) return a.slice(1).trim().replace(/^["']|["']$/g, '');
  return a; // attribute form, e.g. ' alt="x"' — read by the tag that wants it
}

function attrOf(arg, name) {
  const m = new RegExp(`${name}\\s*=\\s*"([^"]*)"|${name}\\s*=\\s*'([^']*)'`, 'i').exec(arg || '');
  return m ? (m[1] ?? m[2]) : null;
}

function parse(tokens) {
  const root = { name: 'root', children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];

  for (const tk of tokens) {
    if (tk.t === 'text') { top().children.push({ name: '#text', value: tk.v }); continue; }
    if (tk.t === 'verbatim') {
      top().children.push({ name: '#verbatim', tag: tk.tag, lang: tk.lang, value: tk.body });
      continue;
    }

    const { name, closing, arg, raw } = tk;

    // [*] is a self-closing item marker in most dialects: the previous item is
    // implicitly closed by the next one (and by [/list]).
    if (name === '*') {
      if (!closing) {
        while (top().name === '*') stack.pop();
        const li = { name: '*', children: [] };
        top().children.push(li);
        stack.push(li);
      } else {
        while (top().name === '*') stack.pop();
      }
      continue;
    }

    if (closing) {
      let idx = -1;
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].name === name) { idx = i; break; }
      }
      // A close with no opener is not markup — keep it visible rather than eat it.
      if (idx === -1) { top().children.push({ name: '#text', value: raw }); continue; }
      stack.length = idx; // also pops anything left unclosed inside
      continue;
    }

    if (VOID_TAGS.has(name)) { top().children.push({ name, children: [] }); continue; }

    if (!KNOWN.has(name)) { top().children.push({ name: '#text', value: raw }); continue; }

    const node = { name, arg: cleanArg(arg), rawArg: arg, children: [] };
    top().children.push(node);
    stack.push(node);
  }

  return root;
}

// ─── Renderer ────────────────────────────────────────────────────────────────

function isBlock(node) {
  if (node.name === '#verbatim') return node.tag === 'code' && (node.lang || /\n/.test(node.value));
  if (node.name === 'hr') return true;
  return BLOCK_TAGS.has(node.name);
}

function textOf(node) {
  if (node.name === '#text') return node.value;
  if (node.name === '#verbatim') return node.value;
  return (node.children || []).map(textOf).join('');
}

function renderInline(node) {
  switch (node.name) {
    case '#text':      return esc(node.value);
    case '#verbatim':  return `<code>${esc(node.value)}</code>`;
    case 'br':         return '<br>';
    case 'b': case 'strong':   return `<strong>${renderInlineList(node.children)}</strong>`;
    case 'i': case 'em':       return `<em>${renderInlineList(node.children)}</em>`;
    case 'u':                  return `<u>${renderInlineList(node.children)}</u>`;
    case 's': case 'strike': case 'del': return `<del>${renderInlineList(node.children)}</del>`;
    case 'sub':                return `<sub>${renderInlineList(node.children)}</sub>`;
    case 'sup':                return `<sup>${renderInlineList(node.children)}</sup>`;
    case 'highlight':          return `<mark>${renderInlineList(node.children)}</mark>`;

    case 'url': {
      // [url=href]label[/url] and [url]href[/url] are both standard.
      const href = safeUrl(node.arg || textOf(node));
      const label = node.arg ? renderInlineList(node.children) : esc(textOf(node));
      if (!href) return label || esc(node.arg);
      return `<a href="${escAttr(href)}">${label || escAttr(href)}</a>`;
    }

    case 'img': {
      // [img]src[/img], [img=src]alt[/img], [img alt="x"]src[/img] (pandoc's form)
      const attrAlt = attrOf(node.rawArg, 'alt');
      const src = safeUrl(node.arg && !attrAlt ? node.arg : textOf(node), { allowData: true });
      const alt = attrAlt != null ? attrAlt : (node.arg && !attrAlt ? textOf(node) : '');
      if (!src) return esc(textOf(node));
      return `<img src="${escAttr(src)}" alt="${escAttr(alt)}">`;
    }

    case 'color': {
      const c = safeColor(node.arg);
      const inner = renderInlineList(node.children);
      return c ? `<span style="color:${escAttr(c)}">${inner}</span>` : inner;
    }
    case 'size': {
      const sz = safeSize(node.arg);
      const inner = renderInlineList(node.children);
      return sz ? `<span style="font-size:${escAttr(sz)}">${inner}</span>` : inner;
    }
    case 'font': {
      const f = safeFont(node.arg);
      const inner = renderInlineList(node.children);
      return f ? `<span style="font-family:${escAttr(f)}">${inner}</span>` : inner;
    }

    default:
      return renderInlineList(node.children);
  }
}

function renderInlineList(nodes) {
  return (nodes || []).map(renderInline).join('');
}

/** Render a block-level child list, grouping loose inline content into <p>. */
function renderBlockList(nodes) {
  const out = [];
  let run = '';

  const flush = () => {
    // A blank line separates paragraphs; a single newline is a soft break.
    for (const para of run.split(/\n[ \t]*\n+/)) {
      const trimmed = para.trim();
      if (trimmed) out.push(`<p>${trimmed.replace(/\n/g, '<br>\n')}</p>`);
    }
    run = '';
  };

  for (const node of nodes || []) {
    if (isBlock(node)) { flush(); out.push(renderBlock(node)); }
    else run += renderInline(node);
  }
  flush();
  return out.join('\n');
}

/** Items of a list: explicit [*] children, so anything outside one is dropped whitespace. */
function renderItems(node) {
  return (node.children || [])
    .filter(c => c.name === '*')
    .map(c => `<li>${unwrapSoleParagraph(renderBlockList(c.children))}</li>`)
    .join('\n');
}

// A one-paragraph item reads better unwrapped (<li>text</li>), but an item with
// several blocks must keep its <p>s.
// ⚠ CLAUDE: the inner match must not be allowed to span a </p> — a greedy
// [\s\S]* here swallows the gap between two paragraphs and emits the mismatched
// `<li>a</p><p>b</li>`, which is invalid and reflows the whole list.
function unwrapSoleParagraph(html) {
  const m = /^<p>((?:(?!<\/p>)[\s\S])*)<\/p>$/.exec(html);
  return m ? m[1] : html;
}

function renderBlock(node) {
  switch (node.name) {
    case 'hr': return '<hr>';

    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
      return `<${node.name}>${renderInlineList(node.children)}</${node.name}>`;

    case 'heading': {
      // XenForo's spelling: [heading=2]…[/heading]
      const lvl = /^[1-6]$/.test(node.arg) ? node.arg : '1';
      return `<h${lvl}>${renderInlineList(node.children)}</h${lvl}>`;
    }

    case 'list': {
      // [list] is bullets; [list=1] / [list=a] / [list=i] are ordered.
      const ordered = node.arg !== '';
      const type = /^[aAiI]$/.test(node.arg) ? ` type="${node.arg}"` : '';
      return ordered
        ? `<ol${type}>\n${renderItems(node)}\n</ol>`
        : `<ul>\n${renderItems(node)}\n</ul>`;
    }
    case 'ul':   return `<ul>\n${renderItems(node)}\n</ul>`;
    case 'ol': case 'olist': return `<ol>\n${renderItems(node)}\n</ol>`;

    case 'quote': {
      const cite = node.arg ? `<cite>${esc(node.arg)}</cite>\n` : '';
      return `<blockquote>\n${cite}${renderBlockList(node.children)}\n</blockquote>`;
    }

    case 'spoiler': {
      const summary = esc(node.arg || 'Spoiler');
      return `<details><summary>${summary}</summary>\n${renderBlockList(node.children)}\n</details>`;
    }

    case 'table': {
      const rows = (node.children || []).filter(c => c.name === 'tr');
      return `<table>\n${rows.map(renderBlock).join('\n')}\n</table>`;
    }
    case 'tr': {
      const cells = (node.children || []).filter(c => c.name === 'td' || c.name === 'th');
      return `<tr>${cells.map(renderBlock).join('')}</tr>`;
    }
    case 'td': return `<td>${renderInlineList(node.children)}</td>`;
    case 'th': return `<th>${renderInlineList(node.children)}</th>`;

    // Alignment uses the same .text-* classes AsciiDoc/Djot/RST emit, so one
    // stylesheet rule covers every format (see FORMAT_ALIGN in formats/index.js).
    case 'center': return `<div class="text-center">\n${renderBlockList(node.children)}\n</div>`;
    case 'left':   return `<div class="text-left">\n${renderBlockList(node.children)}\n</div>`;
    case 'right':  return `<div class="text-right">\n${renderBlockList(node.children)}\n</div>`;
    case 'align': {
      const dir = ['left', 'center', 'right'].includes(node.arg) ? node.arg : 'left';
      return `<div class="text-${dir}">\n${renderBlockList(node.children)}\n</div>`;
    }

    case '#verbatim': {
      // ⚠ CLAUDE: this is the contract the whole extension suite rests on —
      // <pre><code class="language-X"> with NO class on the <pre>. Every
      // extension inject() matches that exact shape; changing it silently kills
      // mermaid, katex, chess and the other 27 in .bbcode files only.
      const cls = node.lang ? ` class="language-${escAttr(node.lang.toLowerCase())}"` : '';
      return `<pre><code${cls}>${esc(node.value.replace(/^\n/, ''))}</code></pre>`;
    }

    default:
      return renderBlockList(node.children);
  }
}

// ─── Entry point ─────────────────────────────────────────────────────────────

export function bbcodeToHtml(text) {
  const tree = parse(lex(String(text ?? '').replace(/\r\n?/g, '\n')));
  return renderBlockList(tree.children);
}
