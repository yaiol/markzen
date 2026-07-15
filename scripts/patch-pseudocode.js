"use strict";
// Patches pseudocode@2.4.1 Renderer.js - undeclared variables that throw ReferenceError
// in strict mode (Vite/ES modules). Each patch adds a `var` declaration.
// Runs automatically via postinstall.
//
// ⚠ CLAUDE: Do NOT add `var` to `katex = require('katex')` or `MathJax = require('mathjax')`.
// Those lines are inside `if (typeof katex === 'undefined')` guards. When `window.katex` is
// set (App.jsx: `window.katex = katex`), the condition is false and require() is never called,
// so strict mode never fires. Adding `var` causes hoisting that ALWAYS shadows window.katex,
// forcing pseudocode to use require_katex() whose Rolldown-bundled instance fails to resolve
// symbols like `\gets` and `\neq` in production builds.
const fs   = require('fs');
const path = require('path');

const file = path.join(__dirname, '../node_modules/pseudocode/src/Renderer.js');
if (!fs.existsSync(file)) {
  console.log('patch-pseudocode: file not found, skipping');
  process.exit(0);
}

let src = fs.readFileSync(file, 'utf8');
let changed = false;

const patches = [
  { broken: 'attrVal = style[attrName]',           fixed: 'var attrVal = style[attrName]' },
  { broken: 'ifCond = node.children[0]',           fixed: 'var ifCond = node.children[0]' },
];

for (const { broken, fixed } of patches) {
  if (src.includes(fixed)) {
    console.log(`patch-pseudocode: already applied - ${broken.split('=')[0].trim()}`);
  } else if (src.includes(broken)) {
    src = src.replace(broken, fixed);
    changed = true;
    console.log(`patch-pseudocode: applied - added var for ${broken.split('=')[0].trim()}`);
  } else {
    console.log(`patch-pseudocode: pattern not found - ${broken.split('=')[0].trim()} (library may have changed)`);
  }
}

if (changed) fs.writeFileSync(file, src, 'utf8');
