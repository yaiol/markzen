// ⚠ CLAUDE: showdown nests a list item only when it is indented 4 spaces per level (original Markdown),
// but CommonMark nests it when it sits at its parent item's content column ("- " = 2 spaces, "1. " = 3).
// `disableForced4SpacesIndentedSublists` fixes the second level; from the third level showdown's
// outdent strips up to 4 leading spaces and flattens one step. So list items at depth >= 2 are
// re-indented to 4 spaces per level BEFORE showdown. Depth 0/1, continuation lines, fenced code and
// tab-indented lines are left alone, so documents already written with 4 spaces render as before.
const FENCE_RE = /^ {0,3}(`{3,}|~{3,})/;
const ITEM_RE  = /^( *)([-*+]|\d{1,9}[.)])( +)(?=\S)/;

export function normalizeListIndent(md) {
  const lines = md.split('\n');
  const stack = []; // content column of each open list item
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fm = line.match(FENCE_RE);
    if (fm) {
      if (fence === null) fence = { char: fm[1][0], len: fm[1].length };
      else if (fm[1][0] === fence.char && fm[1].length >= fence.len && line.slice(fm[0].length).trim() === '') fence = null;
      continue;
    }
    if (fence !== null || line.trim() === '') continue;
    const m = line.match(ITEM_RE);
    if (!m) {
      const indent = line.match(/^ */)[0].length;
      while (stack.length && indent < stack[stack.length - 1]) stack.pop();
      continue;
    }
    while (stack.length && m[1].length < stack[stack.length - 1]) stack.pop();
    const depth = stack.length;
    stack.push(m[1].length + m[2].length + Math.min(m[3].length, 4));
    if (depth >= 2 && m[1].length !== 4 * depth) lines[i] = ' '.repeat(4 * depth) + line.slice(m[1].length);
  }
  return lines.join('\n');
}
