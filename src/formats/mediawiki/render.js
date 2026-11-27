import DOMPurify from 'dompurify';
import { resetMath, protectMathToken } from '../extensions/katex';

// Markzen's own wikitext reader: blocks line by line, in source order, then inline markup.
//
// ⚠ never hand the DOCUMENT back to wtf_wikipedia. It is an article-text extractor: it
// regroups a page into lists, tables, images and prose, so a paragraph written above a list
// comes out below it, `#` lists turn into bullets, and list nesting is lost. It is used here
// for ONE thing, expanding a single {{template}}, where that regrouping cannot reorder anything.
//
// ⚠ the output goes into the preview as innerHTML, unsanitised. Every character of the source
// is escaped unless it is a tag in HTML_TAGS, and that tag keeps only the HTML_ATTRS. What
// wtf_wikipedia returns for a template is NOT safe and goes through DOMPurify.
//
// ⚠ this reader never throws: the preview runs it on half-typed markup at every keystroke.

// ⚠ this library is loaded the first time a document of THIS format is opened, never at
// startup — a static import puts it in the entry chunk, which every user pays for even when
// they only ever open Markdown. The exported toHtml is async for that reason; App.jsx's single
// call site already handles a Promise. Do not restore a top-level import or drop the async.
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

const HTML_TAGS = new Set(('abbr b bdi big blockquote br caption center cite code data dd del dfn div dl dt em font '
  + 'h1 h2 h3 h4 h5 h6 hr i ins kbd li mark ol p q rp rt ruby s samp small span strike strong sub sup table tbody '
  + 'td tfoot th thead time tr tt u ul var wbr').split(' '));
const HTML_ATTRS = new Set(('align bgcolor border cellpadding cellspacing cite class color colspan datetime dir face '
  + 'height id lang rowspan scope size start style title type valign value width').split(' '));
// A line holding one of these is not paragraph text.
const BLOCK_TAG = /<\/?(blockquote|caption|center|dd|div|dl|dt|h[1-6]|hr|li|ol|p|table|tbody|td|tfoot|th|thead|tr|ul)\b/i;

// Namespace names as the larger wikis write them.
const FILE_NS = /^(file|image|datei|bild|fichier|archivo|imagen|immagine|ficheiro|arquivo|bestand|afbeelding|plik|fil|файл|ファイル|文件)\s*:\s*/i;
const CATEGORY_NS = /^(category|kategorie|catégorie|categoría|categoria|categorie|kategoria|kategori|категория|категорія|分类|分類)\s*:/i;
const LANGUAGE_NS = /^(ar|bg|ca|cs|da|de|el|en|es|et|fa|fi|fr|he|hi|hr|hu|id|it|ja|ko|lt|lv|ms|nl|no|pl|pt|ro|ru|sk|sl|sr|sv|th|tr|uk|vi|zh):\S/;
const IMAGE_OPTION = /^(thumb|thumbnail|frame|framed|frameless|border|left|right|center|centre|none|upright([ =].*)?|\d*x?\d+\s*px|(link|alt|class|lang|page)=.*|baseline|sub|super|top|text-top|middle|bottom|text-bottom)$/i;

// Held fragments: finished HTML is swapped for a token so later passes cannot rewrite it.
const TOKEN = /(\d+)/g;
const GONE = '';          // something that renders as nothing (a comment, a category)
let held = [];
let blockHeld = new Set();
let linkNumber = 0;

function hold(html, block = false) {
  held.push(html);
  if (block) blockHeld.add(held.length - 1);
  return `${held.length - 1}`;
}
const restore = (s) => s.replace(TOKEN, (_, i) => restore(held[+i] ?? ''));
const hasBlockToken = (s) => [...s.matchAll(TOKEN)].some(m => blockHeld.has(+m[1]));

// A line that held nothing but invisible markup disappears — left behind, it would read as a
// blank line and split the paragraph or list around it.
const dropGoneLines = (s) => s
  .replace(/^[ \t]*(?:[ \t]*)+(?:\n|$)/gm, '')
  .replace(//g, '');

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Like esc(), but an entity the author typed (&nbsp;) stays an entity.
function escText(s) {
  return s.replace(/&(?!(#\d+|#x[\da-f]+|[a-z][a-z\d]*);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function safeAttrs(raw) {
  let out = '';
  for (const m of String(raw || '').matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`/]+)))?/g)) {
    const name = m[1].toLowerCase();
    const value = m[2] ?? m[3] ?? m[4] ?? '';
    if (!HTML_ATTRS.has(name)) continue;
    if (name === 'style' && /url\s*\(|expression|javascript:|@import|\\|&/i.test(value)) continue;
    out += ` ${name}="${escText(value)}"`;
  }
  return out;
}

// ─── Tags whose content is not wikitext ───────────────────────────────────────

const trimCode = (code) => code.replace(/^\n/, '').replace(/\n\s*$/, '');

function holdTag(tag, attrs, body) {
  switch (tag) {
    case 'nowiki':
      return hold(escText(body));
    // MediaWiki's math tag (the Math extension). `display="block"` is display mode;
    // bare <math> is inline, which is how Wikipedia writes most of its formulas.
    case 'math':
      return protectMathToken(body.trim(), /display\s*=\s*["']?block/i.test(attrs));
    // The SyntaxHighlight extension and its deprecated alias. The `lang` becomes the code-block
    // language, so a lang Markzen recognises (mermaid, chess, …) renders as a live figure:
    // the shape below is what every extension's inject() matches.
    case 'syntaxhighlight':
    case 'source': {
      if (/\binline\b/i.test(attrs)) return hold(`<code>${esc(body)}</code>`);
      const m = /lang\s*=\s*["']?([\w+-]+)/i.exec(attrs);
      const cls = m ? ` class="language-${m[1].toLowerCase()}"` : '';
      return hold(`<pre><code${cls}>${esc(trimCode(body))}</code></pre>`, true);
    }
    // <pre> ignores wiki markup but still reads entities.
    case 'pre':
      return hold(`<pre><code>${escText(trimCode(body))}</code></pre>`, true);
    // The LilyPond music extension. Markzen has no LilyPond renderer, so the score is shown
    // as its source: keeping the content beats losing it silently.
    default:
      return hold(`<pre><code class="language-lilypond">${esc(body.trim())}</code></pre>`, true);
  }
}

// One pass, so whichever of comment / tag opens first wins: a comment inside <pre> is text,
// a <pre> inside a comment is nothing.
function extractRaw(text) {
  return text.replace(
    /<!--[\s\S]*?(?:-->|$)|<(nowiki|pre|syntaxhighlight|source|math|score)\b([^<>]*?)(?:\/>|>([\s\S]*?)<\/\1\s*>)/gi,
    (match, tag, attrs, body) => {
      if (!tag) return GONE;
      return body === undefined ? '' : holdTag(tag.toLowerCase(), attrs, body);
    });
}

// ─── Templates ────────────────────────────────────────────────────────────────

function expandTemplate(source) {
  let html;
  try { html = DOMPurify.sanitize(wtf(source).html()); } catch { return hold(escText(source)); }
  html = html.replace(/<div class="(section|text)">|<\/div>/g, '').trim();
  if (/<(table|ul|ol|img|h[1-6])\b/.test(html)) return hold(html, true);
  html = html
    .replace(/<span class="sentence">([\s\S]*?)<\/span>/g, '$1')
    .replace(/<\/p>\s*<p[^>]*>/g, '<br />')
    .replace(/<\/?p[^>]*>/g, '')
    .trim();
  return html ? hold(html) : GONE;
}

// Replace every outermost, balanced {{…}}. An unclosed one stays as text.
function expandTemplates(text) {
  let out = '', from = 0, depth = 0, start = 0;
  for (const m of text.matchAll(/\{\{|\}\}/g)) {
    if (m[0] === '{{') {
      if (depth++ === 0) start = m.index;
    } else if (depth && --depth === 0) {
      const end = m.index + 2 + (text[m.index + 2] === '}' ? 1 : 0);   // {{{parameter}}}
      out += text.slice(from, start) + expandTemplate(text.slice(start, end));
      from = end;
    }
  }
  return out + text.slice(from);
}

// ─── Inline markup ────────────────────────────────────────────────────────────

// ''italic'' / '''bold''', following MediaWiki's own rules for unbalanced apostrophes.
function quotes(line) {
  const parts = line.split(/(''+)/);
  if (parts.length === 1) return line;
  let italics = 0, bolds = 0;
  for (let i = 1; i < parts.length; i += 2) {
    const n = parts[i].length;
    if (n === 4)    { parts[i - 1] += "'"; parts[i] = "'''"; }
    else if (n > 5) { parts[i - 1] += "'".repeat(n - 5); parts[i] = "'''''"; }
    if (parts[i].length === 2) italics++;
    else if (parts[i].length === 3) bolds++;
    else { italics++; bolds++; }
  }
  // Both counts odd: one ''' was really an apostrophe followed by '' (as in l'''amour'').
  if (italics % 2 && bolds % 2) {
    let single = -1, multi = -1, space = -1;
    for (let i = 1; i < parts.length; i += 2) {
      if (parts[i].length !== 3) continue;
      const a = parts[i - 1].slice(-1), b = parts[i - 1].slice(-2, -1);
      if (a === ' ') { if (space < 0) space = i; }
      else if (b === ' ') { single = i; break; }
      else if (multi < 0) multi = i;
    }
    const pick = single >= 0 ? single : multi >= 0 ? multi : space;
    if (pick >= 0) { parts[pick - 1] += "'"; parts[pick] = "''"; }
  }
  let out = '', buffer = '', state = '';
  const STEP = {
    2: { i: ['</i>', ''], bi: ['</i>', 'b'], ib: ['</b></i><b>', 'b'], b: ['<i>', 'bi'], '': ['<i>', 'i'] },
    3: { b: ['</b>', ''], bi: ['</i></b><i>', 'i'], ib: ['</b>', 'i'], i: ['<b>', 'ib'], '': ['<b>', 'b'] },
    5: { b: ['</b><i>', 'i'], i: ['</i><b>', 'b'], bi: ['</i></b>', ''], ib: ['</b></i>', ''] },
  };
  parts.forEach((part, i) => {
    if (i % 2 === 0) {
      if (state === 'both') buffer += part; else out += part;
      return;
    }
    const n = part.length;
    if (state === 'both') {
      if (n === 2)      { out += `<b><i>${buffer}</i>`; state = 'b'; }
      else if (n === 3) { out += `<i><b>${buffer}</b>`; state = 'i'; }
      else              { out += `<i><b>${buffer}</b></i>`; state = ''; }
    } else if (n === 5 && state === '') { buffer = ''; state = 'both'; }
    else { const [html, next] = STEP[n][state]; out += html; state = next; }
  });
  if (state === 'both') return buffer ? `${out}<b><i>${buffer}</i></b>` : out;
  return out + { '': '', i: '</i>', b: '</b>', bi: '</i></b>', ib: '</b></i>' }[state];
}

const unescape = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

// A bare file name is looked up on Wikipedia (a pasted article names its pictures that way);
// anything with a path or a scheme is used as written, so a local picture shows.
function imageSrc(name, width) {
  if (/^(https?:|data:|blob:)/i.test(name) || /[\\/]/.test(name)) return name;
  const file = name.charAt(0).toUpperCase() + name.slice(1).replace(/ /g, '_');
  return `https://wikipedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width || 300}`;
}

function imageLink(name, options) {
  const width = options.map(o => /^(\d+)\s*px$/i.exec(o)?.[1]).find(Boolean);
  const alt = options.map(o => /^alt=(.*)$/i.exec(o)?.[1]).find(v => v !== undefined);
  const caption = options.filter(o => o && !IMAGE_OPTION.test(o)).pop() || '';
  const framed = options.some(o => /^(thumb|thumbnail|frame|framed)$/i.test(o));
  const plain = restore(caption).replace(/<[^>]*>/g, '').replace(/'{2,}|\[\[|\]\]/g, '');
  const img = `<img src="${esc(imageSrc(unescape(name), width))}" alt="${escText(alt ?? plain)}"${width ? ` width="${width}"` : ''} />`;
  if (!framed || !caption) return hold(img);
  return hold(`<span class="thumb">${img}<br /><small>${quotes(caption)}</small></span>`);
}

function internalLink(inner, trail) {
  const parts = inner.split('|').map(p => p.trim());
  let target = parts[0];
  if (!target || /[\n<>]/.test(target)) return null;
  if (CATEGORY_NS.test(target) || LANGUAGE_NS.test(target)) return GONE + trail;
  const file = FILE_NS.exec(target);
  if (file) return imageLink(target.slice(file[0].length), parts.slice(1)) + trail;
  target = target.replace(/^:/, '');
  const label = parts.length > 1 && parts[1] ? parts.slice(1).join('|') : target;
  const page = target.replace(/ /g, '_');
  const href = /^https?:/i.test(target) || target.startsWith('#') ? page : `./${page}`;
  return hold(`<a class="link" href="${escText(href)}">${quotes(label + trail)}</a>`);
}

function inline(text) {
  let s = text.replace(/<(\/?)([a-z][a-z\d]*)((?:\s[^<>]*?)?)\s*(\/?)>/gi, (match, close, name, attrs, self) => {
    const tag = name.toLowerCase();
    if (!HTML_TAGS.has(tag)) return match;
    if (tag === 'br' || tag === 'hr' || tag === 'wbr') return hold(`<${tag}${safeAttrs(attrs)} />`);
    if (close) return hold(`</${tag}>`);
    return hold(`<${tag}${safeAttrs(attrs)}>${self ? `</${tag}>` : ''}`);
  });
  s = escText(s);
  // Innermost link first, so a picture caption may hold links of its own.
  for (let before = null; before !== s;) {
    before = s;
    s = s.replace(/\[\[((?:(?!\[\[|\]\])[\s\S])*)\]\](\p{Ll}*)/gu, (match, inner, trail) => internalLink(inner, trail) ?? match);
  }
  // `''` ends a URL: it is italic markup, not part of the address.
  const URL = String.raw`(?:https?://|ftp://|mailto:)(?:(?!'')[^\s\[\]])+`;
  s = s.replace(new RegExp(String.raw`\[(${URL})(?:[ \t]+([^\]\n]*))?\]`, 'gi'), (_, url, label) =>
    hold(`<a class="link" href="${url}">${label ? quotes(label) : `[${++linkNumber}]`}</a>`));
  s = s.replace(new RegExp(URL, 'gi'), (url) => {
    const end = /(?:&quot;|&gt;|&lt;|[.,;:!?)])+$/.exec(url)?.[0] || '';
    const bare = url.slice(0, url.length - end.length);
    return hold(`<a class="link" href="${bare}">${bare}</a>`) + end;
  });
  return s.split('\n').map(quotes).join('\n').replace(//g, '');
}

// ─── Blocks ───────────────────────────────────────────────────────────────────

// `== Title ==` → { level, title }. MediaWiki's top section level (==) is Markzen's <h1>.
// The table of contents uses this too, to find a heading's line in the editor.
export function parseHeading(line) {
  const m = /^(={1,6})(.+?)\1[ \t]*$/.exec(line);
  return m ? { level: Math.max(1, m[1].length - 1), title: m[2].trim() } : null;
}

// Split on a separator, ignoring any occurrence inside [[…]] or an HTML tag.
function splitOutside(s, separator) {
  const found = [];
  let last = 0, depth = 0;
  for (const m of s.matchAll(new RegExp(String.raw`\[\[|\]\]|<[^<>]*>|${separator.source}`, 'g'))) {
    if (m[0] === '[[') depth++;
    else if (m[0] === ']]') depth = Math.max(0, depth - 1);
    else if (!depth && !m[0].startsWith('<')) {
      found.push(s.slice(last, m.index));
      last = m.index + m[0].length;
    }
  }
  found.push(s.slice(last));
  return found;
}

// `; term : definition` on one line. A colon inside a link or an address does not count.
function splitTerm(s) {
  let depth = 0;
  for (const m of s.matchAll(/\[\[|\]\]|\[[^\[\]]*\]|<[^<>]*>|(?:https?|ftp):\/\/\S+|mailto:\S+|:/g)) {
    if (m[0] === '[[') depth++;
    else if (m[0] === ']]') depth--;
    else if (m[0] === ':' && !depth) return [s.slice(0, m.index), s.slice(m.index + 1)];
  }
  return [s, null];
}

const TABLE_START = /^[ \t]*(:*)[ \t]*\{\|(.*)$/;
const TABLE_END = /^[ \t]*\|\}(.*)$/;

// "attributes | content" — the single pipe separates them.
function cellParts(raw) {
  const parts = splitOutside(raw, /\|/);
  if (parts.length < 2 || parts[0].includes('[[')) return { attrs: '', first: raw };
  return { attrs: parts[0], first: raw.slice(parts[0].length + 1) };
}

function cellHtml({ first, rest }) {
  const head = first.trim() ? inline(first.trim()) : '';
  if (!rest.some(l => l.trim())) return head;
  const body = blocks(rest);
  const alone = /^<p>((?:(?!<\/p>)[\s\S])*)<\/p>$/.exec(body);
  if (alone) return head ? `${head} ${alone[1]}` : alone[1];
  return head + body;
}

// `lines` are the table's own lines, without its `{|` and `|}`.
function table(attrs, lines) {
  const rows = [{ attrs: '', cells: [] }];
  let caption = null, cell = null, depth = 0;
  const stray = [];
  for (const line of lines) {
    const t = line.trimStart();
    if (depth || TABLE_START.test(line)) {          // a nested table belongs to the current cell
      if (TABLE_START.test(line)) depth++; else if (TABLE_END.test(line)) depth--;
      (cell ? cell.rest : stray).push(line);
    } else if (t.startsWith('|+')) {
      const { attrs: a, first } = cellParts(t.slice(2));
      caption = cell = { attrs: a, first, rest: [] };
    } else if (t.startsWith('|-')) {
      rows.push({ attrs: t.replace(/^\|-+/, ''), cells: [] });
      cell = null;
    } else if (t.startsWith('|') || t.startsWith('!')) {
      const tag = t[0] === '!' ? 'th' : 'td';
      for (const raw of splitOutside(t.slice(1), tag === 'th' ? /!!|\|\|/ : /\|\|/)) {
        const { attrs: a, first } = cellParts(raw);
        cell = { tag, attrs: a, first, rest: [] };
        rows[rows.length - 1].cells.push(cell);
      }
    } else {
      (cell ? cell.rest : stray).push(line);
    }
  }
  const row = (r) => `<tr${safeAttrs(r.attrs)}>${r.cells.map(c =>
    `<${c.tag}${safeAttrs(c.attrs)}>${cellHtml(c)}</${c.tag}>`).join('')}</tr>`;
  const filled = rows.filter(r => r.cells.length);
  const headed = filled.length > 1 && filled[0].cells.every(c => c.tag === 'th');
  return (stray.length ? blocks(stray) : '')
    + `<table${safeAttrs(attrs)}>`
    + (caption ? `<caption${safeAttrs(caption.attrs)}>${cellHtml(caption)}</caption>` : '')
    + (headed ? `<thead>${row(filled.shift())}</thead>` : '')
    + `<tbody>${filled.map(row).join('')}</tbody></table>`;
}

const LIST_TAG = { '*': 'ul', '#': 'ol', ':': 'dl', ';': 'dl' };
const ITEM_TAG = { '*': 'li', '#': 'li', ':': 'dd', ';': 'dt' };

function blocks(lines) {
  const out = [];
  let paragraph = [], pre = [], open = [];      // open = the list markers currently open

  const endParagraph = () => {
    if (paragraph.length) out.push(`<p>${inline(paragraph.join('\n'))}</p>`);
    paragraph = [];
  };
  const endPre = () => {
    while (pre.length && !pre[pre.length - 1].trim()) pre.pop();
    if (pre.length) out.push(`<pre><code>${inline(pre.join('\n'))}</code></pre>`);
    pre = [];
  };
  const closeItem = () => { const c = open.pop(); out.push(`</${ITEM_TAG[c]}></${LIST_TAG[c]}>`); };
  const endList = () => { while (open.length) closeItem(); };
  const endAll = () => { endParagraph(); endPre(); endList(); };

  // The line's marker string says which lists it sits in: keep the ones it shares with the
  // line above (`;` and `:` are the same list), close the others, open the new ones inside.
  function listItem(markers, content) {
    endParagraph(); endPre();
    let same = 0;
    while (same < open.length && same < markers.length && LIST_TAG[open[same]] === LIST_TAG[markers[same]]) same++;
    while (open.length > same) closeItem();
    if (same === markers.length) {
      const c = markers[same - 1];
      out.push(`</${ITEM_TAG[open[same - 1]]}><${ITEM_TAG[c]}>`);
      open[same - 1] = c;
    }
    for (const c of markers.slice(same)) {
      out.push(`<${LIST_TAG[c]}><${ITEM_TAG[c]}>`);
      open.push(c);
    }
    const [term, definition] = markers.endsWith(';') ? splitTerm(content) : [content, null];
    out.push(inline(term.trim()));
    if (definition !== null) listItem(`${markers.slice(0, -1)}:`, definition);
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    if ((m = TABLE_START.exec(line))) {
      endAll();
      const body = [];
      let depth = 1, after = '';
      while (++i < lines.length) {
        if (TABLE_START.test(lines[i])) depth++;
        else if (TABLE_END.test(lines[i]) && --depth === 0) { after = TABLE_END.exec(lines[i])[1]; break; }
        body.push(lines[i]);
      }
      const indent = m[1].length;
      out.push('<dl><dd>'.repeat(indent) + table(m[2], body) + '</dd></dl>'.repeat(indent));
      if (after.trim()) paragraph.push(after.trim());
    } else if ((m = parseHeading(line))) {
      endAll();
      out.push(`<h${m.level}>${inline(m.title)}</h${m.level}>`);
    } else if ((m = /^-{4,}(.*)$/.exec(line))) {
      endAll();
      out.push('<hr />');
      if (m[1].trim()) paragraph.push(m[1].trim());
    } else if ((m = /^([*#:;]+)(.*)$/.exec(line))) {
      listItem(m[1], m[2]);
    } else if (!line.trim()) {
      if (pre.length && line.startsWith(' ')) pre.push('');
      else endAll();
    } else if (BLOCK_TAG.test(line) || (hasBlockToken(line) && !line.replace(TOKEN, '').trim())) {
      endAll();
      out.push(inline(line.trim()));
    } else if (line.startsWith(' ')) {            // a leading space means preformatted
      endParagraph(); endList();
      pre.push(line.slice(1));
    } else {
      endPre(); endList();
      paragraph.push(line);
    }
  }
  endAll();
  return out.join('\n');
}

// <poem> keeps its line breaks, <gallery> lists one picture per line.
function extensionBlocks(text) {
  return text
    .replace(/<poem\b[^<>]*>([\s\S]*?)<\/poem>/gi, (_, body) =>
      hold(`<div class="poem">${inline(trimCode(body)).replace(/\n/g, '<br />\n')}</div>`, true))
    .replace(/<gallery\b[^<>]*>([\s\S]*?)<\/gallery>/gi, (_, body) => {
      // Each line becomes an ordinary file link, so it is escaped on the same path as any other.
      const pictures = body.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
        const [name, ...options] = l.split('|');
        return inline(`[[File:${[name.replace(FILE_NS, ''), 'thumb', ...options].join('|')}]]`);
      });
      return hold(`<div class="gallery">${pictures.join(' ')}</div>`, true);
    });
}

// ─── MediaWiki Wikitext → HTML ────────────────────────────────────────────────
export async function wikitextToHtml(source) {
  await __loadLibs();
  resetMath();                       // math tokens are absolute indices into katex's store
  held = []; blockHeld = new Set(); linkNumber = 0;

  let text = source.replace(/\r\n?/g, '\n').replace(/[-]/g, '');
  text = extractRaw(text);
  // Footnotes are not rendered; behaviour switches (__TOC__, …) print nothing.
  text = text
    .replace(/<ref\b[^<>]*\/>|<ref\b[^<>]*>[\s\S]*?<\/ref\s*>/gi, '')
    .replace(/<references\b[^<>]*\/>|<references\b[^<>]*>[\s\S]*?<\/references\s*>/gi, GONE)
    .replace(/__[A-Z]+__/g, GONE);
  text = expandTemplates(text);
  text = extensionBlocks(text);
  // Category and language links print nothing; remove their lines before the block pass.
  text = text.replace(/\[\[([^\[\]|]*)(\|[^\[\]]*)?\]\]/g, (match, target) =>
    CATEGORY_NS.test(target.trim()) || LANGUAGE_NS.test(target.trim()) ? GONE : match);
  return restore(blocks(dropGoneLines(text).split('\n')));
}
