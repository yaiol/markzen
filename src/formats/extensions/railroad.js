import { Diagram, Sequence, Choice, Optional, OneOrMore, ZeroOrMore, Terminal, NonTerminal, Skip } from 'railroad-diagrams';
import { decodeHtmlEntities, applyMznStyle } from '../shared/utils';

// ─── Railroad DSL parser ──────────────────────────────────────────────────────
// DSL: 'term' "term"  nonterm  (a|b|c)  [optional]  {zero-or-more}  {one-or-more}+
//      {item / sep}  {item / sep}+   (separator variant)
function renderRailroad(src) {
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    if (/\s/.test(src[i])) { i++; continue; }
    const ch = src[i];
    if (ch === "'" || ch === '"') {
      const q = src[i++];
      let text = '';
      while (i < src.length && src[i] !== q) {
        if (src[i] === '\\' && i + 1 < src.length) { text += src[++i]; i++; }
        else text += src[i++];
      }
      i++;
      tokens.push({ type: 'TERM', text });
    } else if (ch === '}' && src[i + 1] === '+') { tokens.push({ type: 'RC1' }); i += 2; }
    else if (ch === '(') { tokens.push({ type: 'LP' }); i++; }
    else if (ch === ')') { tokens.push({ type: 'RP' }); i++; }
    else if (ch === '[') { tokens.push({ type: 'LB' }); i++; }
    else if (ch === ']') { tokens.push({ type: 'RB' }); i++; }
    else if (ch === '{') { tokens.push({ type: 'LC' }); i++; }
    else if (ch === '}') { tokens.push({ type: 'RC' }); i++; }
    else if (ch === '|') { tokens.push({ type: 'PIPE' }); i++; }
    else if (ch === '/') { tokens.push({ type: 'SLASH' }); i++; }
    else if (/[A-Za-z_]/.test(ch)) {
      let text = '';
      while (i < src.length && /[A-Za-z0-9_-]/.test(src[i])) text += src[i++];
      tokens.push({ type: 'NT', text });
    } else { i++; }
  }
  let pos = 0;
  const peek = () => tokens[pos] || { type: 'EOF' };
  const consume = (type) => {
    const t = tokens[pos++] || { type: 'EOF' };
    if (type && t.type !== type) throw new Error(`Expected ${type}, got ${t.type}`);
    return t;
  };
  const check = (...types) => types.includes(peek().type);
  function makeSeq(items) {
    if (items.length === 0) return Skip();
    if (items.length === 1) return items[0];
    return Sequence(...items);
  }
  function parseSequence(...stopTypes) {
    const items = [];
    while (!check('EOF', ...stopTypes)) {
      const item = parseItem();
      if (!item) break;
      items.push(item);
    }
    return makeSeq(items);
  }
  function parseItem() {
    const t = peek();
    if (t.type === 'TERM') { consume(); return Terminal(t.text); }
    if (t.type === 'NT')   { consume(); return NonTerminal(t.text); }
    if (t.type === 'LP') {
      consume();
      const branches = [parseSequence('PIPE', 'RP')];
      while (check('PIPE')) { consume(); branches.push(parseSequence('PIPE', 'RP')); }
      consume('RP');
      return branches.length === 1 ? branches[0] : Choice(0, ...branches);
    }
    if (t.type === 'LB') {
      consume();
      const inner = parseSequence('RB');
      consume('RB');
      return Optional(inner);
    }
    if (t.type === 'LC') {
      consume();
      const item = parseSequence('RC', 'RC1', 'SLASH');
      let sep = null;
      if (check('SLASH')) { consume(); sep = parseSequence('RC', 'RC1'); }
      const plus = check('RC1');
      consume();
      return plus ? OneOrMore(item, sep) : ZeroOrMore(item, sep);
    }
    return null;
  }
  return Diagram(parseSequence()).toString();
}

export default {
  id: 'railroad',

  inject(html) {
    let nth = 0;
    return html.replace(
      /<pre><code class="[^"]*language-railroad[^"]*">([\s\S]*?)<\/code><\/pre>/g,
      (_, code) => {
        const n = ++nth;
        try {
          return `<div class="railroad-block" data-mzn-lang="railroad" data-mzn-nth="${n}">${renderRailroad(decodeHtmlEntities(code).trim())}</div>`;
        } catch (e) {
          return `<div class="railroad-block" data-mzn-lang="railroad" data-mzn-nth="${n}"><pre style="color:red">Railroad error: ${e.message}</pre></div>`;
        }
      }
    );
  },

  // railroad renders SVG inline in inject; applyMznStyle runs post-render
  render(el) {
    el.querySelectorAll('.railroad-block').forEach(div => applyMznStyle(div));
  },
};
