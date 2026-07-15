// ⚠ CLAUDE - NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - JSX text, title=, placeholder=, aria-label=,
//   confirm/alert/setMsg arguments - MUST go through t('keyName'). No exceptions.
//   Workflow: add keys to src/i18n.js EN, then translate, sort and audit every
//   language via the i18n key workflow. Full procedure: see CLAUDE-i18n.md.
//   Never paste translations by hand. The scripts ARE the work.
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import pkg from '../package.json';
import yaiolLogo from './assets/yaiol-logo.svg';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, EditorSelection, Compartment, Prec } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { FolderOpen, FilePlus, ChevronRight, ChevronUp, ChevronDown, Printer, FileDown, FileCode, Save, SavePlus, Settings, HelpCircle, Sun, Moon, X, Info, Columns, Edit, Eye, Bold, Italic, Strikethrough, Heading, List, ListOrdered, Quote, Code, Code2, Link, Image, Minus, AlignLeft, AlignCenter, AlignRight, ArrowLeftRight, Search, Check } from 'lucide-react';
import { GithubIcon } from './lib/ui-icons';
import { Splitter } from './lib/ui-ctl-splitter';
import { CollapseToggle } from './lib/ui-ctl-collapsetoggle';
import DOMPurify from 'dompurify';
import katex from 'katex';
import { Transformer, builtInPlugins } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { Factory, Renderer, VoiceMode } from 'vexflow';
import Plotly from 'plotly.js-dist-min';
import { useT, LANGUAGES } from './i18n';
import { checkForUpdate } from './lib/update-check';
import { UpdateBanner } from './lib/ui-update-banner';
import { AppHeader } from './lib/ui-header';
import { NumberField } from './lib/ui-ctl-numberfield';
import { Menu, MenuItem, MenuLabel, MenuDivider } from './lib/ui-ctl-menu';
import { formats, defaultFormat, getFormatByExtension, FORMAT_ALIGN } from './formats/index';
import FONT_CATALOG from '../seeds/fonts.json';
// Storage namespace - single source: package.json `storagePrefix`. Never hardcode a prefix.
const STORAGE_PREFIX = pkg.storagePrefix;

const NATIVE_EXPORT_FORMATS = [
  { id: 'epub3', label: 'EPUB 3 (.epub)',             ext: 'epub' },
  { id: 'docx',  label: 'Microsoft Word (.docx)',     ext: 'docx' },
  { id: 'odt',   label: 'OpenDocument (.odt)',        ext: 'odt'  },
  { id: 'pptx',  label: 'PowerPoint (.pptx)',         ext: 'pptx' },
  { id: 'rtf',   label: 'Rich Text Format (.rtf)',    ext: 'rtf'  },
];

const PANDOC_EXPORT_SECTIONS = [
  { section: 'Ebooks', formats: [
    { id: 'epub3', label: 'EPUB 3 (.epub)'      },
    { id: 'fb2',   label: 'FictionBook2 (.fb2)' },
  ]},
  { section: 'Word Processor', formats: [
    { id: 'docx', label: 'Microsoft Word (.docx)'    },
    { id: 'odt',  label: 'OpenDocument (.odt)'       },
    { id: 'rtf',  label: 'Rich Text Format (.rtf)'   },
  ]},
  { section: 'Presentation', formats: [
    { id: 'pptx',     label: 'Microsoft PowerPoint (.pptx)' },
    { id: 'revealjs', label: 'reveal.js (.html)'            },
  ]},
  { section: 'Typesetting', formats: [
    { id: 'icml',  label: 'InDesign ICML (.icml)' },
    { id: 'latex', label: 'LaTeX (.tex)'          },
    { id: 'typst', label: 'Typst (.typ)'          },
  ]},
  { section: 'XML', formats: [
    { id: 'docbook',      label: 'DocBook (.xml)'          },
    { id: 'jats',         label: 'JATS (.xml)'             },
    { id: 'opendocument', label: 'OpenDocument XML (.xml)' },
    { id: 'tei',          label: 'TEI Simple (.xml)'       },
  ]},
  { section: 'Wiki', formats: [
    { id: 'mediawiki', label: 'MediaWiki (.wiki)' },
  ]},
  { section: 'Notebook', formats: [
    { id: 'ipynb', label: 'Jupyter Notebook (.ipynb)' },
  ]},
  { section: 'Outline', formats: [
    { id: 'opml', label: 'OPML (.opml)' },
  ]},
];

// ─────────────────────────────────────────────────────────────────
// Electron local API
// ─────────────────────────────────────────────────────────────────

function getApiPort() {
  const params = new URLSearchParams(window.location.search);
  return params.get('apiPort') || '4000';
}
const API = `http://localhost:${getApiPort()}`;

function getStartFile() {
  const params = new URLSearchParams(window.location.search);
  const enc = params.get('startFile');
  return enc ? atob(enc) : null;
}

function getCliParams() {
  const params = new URLSearchParams(window.location.search);
  const enc = params.get('cliOut');
  const fmt = params.get('cliFormat');
  if (!enc || !fmt) return null;
  return { outPath: atob(enc), format: fmt };
}
const CLI = getCliParams();

// Markmap transformer - built-in katex plugin disabled so $...$ survives as &#x24;...&#x24;
// in the content strings. We render math directly into root.content before Markmap.create(),
// so every render cycle (initial + collapse/expand) uses the pre-rendered KaTeX HTML.
const markmapTransformer = new Transformer(
  builtInPlugins.filter(p => p.name !== 'katex')
);

function applyMathToMarkmapRoot(node) {
  if (typeof node.content === 'string' && node.content.includes('&#x24;')) {
    node.content = node.content.replace(/&#x24;([\s\S]+?)&#x24;/g, (_, tex) => {
      const decoded = tex.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
      try { return katex.renderToString(decoded, { throwOnError: false }); }
      catch { return tex; }
    });
  }
  node.children?.forEach(applyMathToMarkmapRoot);
}

// ─── App identity - single source of truth for the app name ──────────────────
const APP_NAME    = pkg.productName;
const APP_VERSION = pkg.version;

// Help page - opens at the user's setting language; the help site falls back to
// EN for languages it doesn't publish (no app-side fallback).
const HELP_URL = 'https://apps.yaiol.com/en/p/markzen/help/';
// GitHub source - owner is constant (yaiol); repo name is the app id (pkg.name).
const GITHUB_URL = `https://github.com/yaiol/${pkg.name}`;


const STYLE_TEMPLATES = [
  { key: 'standard', label: 'Standard', css: (_th) => `` },
  {
    key: 'github', label: 'GitHub',
    css: () => `
      .md-body { font-size: 16px; line-height: 1.5; }
      .md-body h1, .md-body h2 { padding-bottom: 0.3em; border-bottom: 1px solid var(--border); }
      .md-body h1 { font-size: 2em; } .md-body h2 { font-size: 1.5em; } .md-body h3 { font-size: 1.25em; }
      .md-body code { background: var(--bg-row); border-radius: 6px; font-size: 85%; padding: 0.2em 0.4em; }
      .md-body pre { background: var(--bg-row); border-radius: 6px; padding: 16px; font-size: 85%; }
      .md-body blockquote { border-left: 4px solid var(--border); background: transparent; color: var(--text-dim); padding: 0 1em; margin: 0 0 16px; border-radius: 0; }
      .md-body th { background: var(--bg-elev); } .md-body tr:nth-child(even) { background: var(--bg-elev); }
    `,
  },
  {
    key: 'book', label: 'Book',
    css: (_th) => `
      .md-body { font-size: 17px; line-height: 1.9; max-width: 68ch; margin: 0 auto; }
      .md-body h1, .md-body h2, .md-body h3 { font-weight: 700; }
      .md-body h1 { font-size: 2.2em; border-bottom: none; text-align: center; margin-bottom: 0.8em; }
      .md-body h2 { font-size: 1.6em; border-bottom: none; }
      .md-body h3 { font-size: 1.25em; font-style: italic; font-weight: 400; }
      .md-body p { text-align: justify; hyphens: auto; }
      .md-body blockquote { border-left: none; font-style: italic; padding: 0 2em; margin: 1.5em 0; background: transparent; border-radius: 0; }
    `,
  },
  {
    key: 'modern', label: 'Modern',
    css: () => `
      .md-body { font-size: 15px; line-height: 1.7; }
      .md-body h1, .md-body h2, .md-body h3 { font-weight: 800; letter-spacing: -0.5px; border-bottom: none; }
      .md-body h1 { font-size: 2.4em; color: var(--accent); margin-bottom: 0.4em; }
      .md-body h2 { font-size: 1.7em; border-left: 4px solid var(--accent); padding-left: 12px; margin-top: 1.6em; }
      .md-body h3 { font-size: 0.95em; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
      .md-body blockquote { background: var(--accent)18; border-left: 4px solid var(--accent); border-radius: 0 8px 8px 0; font-weight: 500; }
      .md-body code { background: var(--accent)18; color: var(--accent); }
      .md-body th { background: var(--accent)22; color: var(--accent); }
    `,
  },
  {
    key: 'minimal', label: 'Minimal',
    css: () => `
      .md-body { font-size: 15px; line-height: 1.75; }
      .md-body h1, .md-body h2, .md-body h3 { font-weight: 600; border-bottom: none; margin-top: 1.8em; }
      .md-body h1 { font-size: 1.6em; } .md-body h2 { font-size: 1.25em; } .md-body h3 { font-size: 1.05em; color: var(--text-dim); }
      .md-body blockquote { border-left: 2px solid var(--border-strong); background: transparent; border-radius: 0; color: var(--text-dim); font-style: italic; padding: 4px 14px; }
      .md-body pre { border: 1px solid var(--border); border-radius: 6px; }
      .md-body th { font-weight: 600; background: transparent; border-bottom: 2px solid var(--border); }
      .md-body tr:nth-child(even) { background: transparent; }
    `,
  },
];

// ─────────────────────────────────────────────────────────────────
// UI layout constants - single source of truth for all sizing
// ─────────────────────────────────────────────────────────────────

// Colors come from the shared palette (src/assets/ui-colors.css) via var(--token).


function buildCss(fontHeading, fontBody, fontCode, templateCss = '') {
  // Always-loaded workspace fonts (Inter UI + JetBrains Mono) + any picked content fonts on top.
  const _baseImps = ['Inter:wght@400;500;600;700', 'JetBrains+Mono:wght@400;500;600'];
  const _imps = [...new Set([..._baseImps, ...[fontHeading, fontBody, fontCode].filter(f => f.import).map(f => f.import)])];
  const _gf = `@import url('https://fonts.googleapis.com/css2?family=${_imps.join('&family=')}&display=swap');`;
  return `
    ${_gf}
    /* Palette (--bg, --accent, --text, …) comes from lib/ui-colors.css, switched by data-theme on <html>. */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; overflow: hidden; }
    body { background: var(--bg); color: var(--text); font-family: 'Inter', system-ui, sans-serif; font-size: 13px; }
    button { cursor: pointer; border: none; background: none; color: inherit; font-family: inherit; font-size: inherit; }
    button:focus-visible { outline: 2px solid var(--accent) !important; outline-offset: 2px; border-radius: 4px; }
    input, select { font-family: inherit; font-size: inherit; color: var(--text); background: var(--bg-input); border: 1px solid var(--border); border-radius: 4px; outline: none; }
    input:focus, select:focus { border-color: var(--accent); }
    /* .barh-app-name + .barh-app-version — shared, unscoped, in ui-app.css. Not redefined here. */
    .md-body { line-height: 1.7; color: var(--text); font-size: 15px; font-family: ${fontBody.stack}; }
    .md-body h1, .md-body h2, .md-body h3, .md-body h4, .md-body h5, .md-body h6 { margin: 1.4em 0 0.5em; font-weight: 700; line-height: 1.25; font-family: ${fontHeading.stack}; }
    .md-body h1 { font-size: 2em; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
    .md-body h2 { font-size: 1.5em; border-bottom: 1px solid var(--border); padding-bottom: 0.2em; }
    .md-body h3 { font-size: 1.25em; }
    .md-body p { margin: 0.8em 0; }
    .md-body .mzn-frontmatter { margin: 0 0 1.6em; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-elev); overflow: hidden; }
    .md-body .mzn-fm-row { display: flex; gap: 12px; padding: 6px 12px; }
    .md-body .mzn-fm-row + .mzn-fm-row { border-top: 1px solid var(--border); }
    .md-body .mzn-fm-key { flex: 0 0 8em; color: var(--text-dim); font-weight: 600; }
    .md-body .mzn-fm-val { flex: 1; min-width: 0; color: var(--text); white-space: pre-wrap; word-break: break-word; }
    .md-body a { color: var(--accent); text-decoration: none; }
    .md-body a:hover { text-decoration: underline; }
    .md-body code { background: var(--bg-row); color: var(--text); padding: 2px 6px; border-radius: 4px; font-family: ${fontCode.stack}; font-size: 0.9em; }
    .md-body pre { background: var(--bg-row); border: 1px solid var(--border); border-radius: 8px; padding: 16px; overflow-x: auto; margin: 1em 0; font-family: ${fontCode.stack}; position: relative; }
    .md-body pre code { background: none; padding: 0; font-size: 0.88em; }
    .md-body .table-wrap { position: relative; }
    .md-body pre .copy-code-btn,
    .md-body .table-wrap .copy-table-btn { position: absolute; top: 6px; right: 6px; background: var(--bg-elev); border: 1px solid var(--border); border-radius: 4px; padding: 3px 6px; cursor: pointer; opacity: 0; transition: opacity 0.15s; color: var(--text-dim); font-size: 12px; line-height: 1; display: flex; align-items: center; gap: 4px; z-index: 1; }
    .md-body pre:hover .copy-code-btn,
    .md-body .table-wrap:hover .copy-table-btn { opacity: 0.7; }
    .md-body pre .copy-code-btn:hover,
    .md-body .table-wrap .copy-table-btn:hover { opacity: 1; background: var(--accent); color: #fff; border-color: var(--accent); }
    .md-body blockquote { border-left: 4px solid var(--accent); background: var(--bg-hov); margin: 1em 0; padding: 10px 16px; border-radius: 0 6px 6px 0; color: var(--text-dim); }
    .md-body ul, .md-body ol { padding-left: 1.8em; margin: 0.8em 0; }
    .md-body li { margin: 0.3em 0; }
    .md-body table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    .md-body th, .md-body td { border: 1px solid var(--border); padding: 8px 12px; text-align: left; }
    .md-body th { background: var(--bg-elev); font-weight: 600; }
    .md-body tr:nth-child(even) { background: var(--bg-elev); }
    .md-body hr { border: none; border-top: 1px solid var(--border); margin: 1.5em 0; }
    .md-body img { max-width: 100%; border-radius: 6px; }
    .text-left { text-align: left; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .center { text-align: center; }
    .markmap-container { width: 100%; height: 420px; margin: 1em 0; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
    .graphviz-diagram { width: 100%; margin: 1em 0; text-align: center; }
    .graphviz-diagram svg { max-width: 100%; height: auto; }
    .wavedrom-diagram { width: 100%; margin: 1em 0; overflow-x: auto; }
    .wavedrom-diagram svg { display: block; }
    .chordpro-sheet { margin: 1em 0; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.9em; line-height: 1.4; }
    .chordpro-sheet h1.title { font-size: 1.3em; font-weight: 700; margin-bottom: 0.2em; font-family: 'Inter', system-ui, sans-serif; }
    .chordpro-sheet h2.subtitle { font-size: 1em; font-weight: 400; color: var(--text-dim); margin-bottom: 0.8em; font-family: 'Inter', system-ui, sans-serif; }
    .chordpro-sheet .paragraph { margin-bottom: 1.2em; }
    .chordpro-sheet .paragraph-label { font-size: 0.75em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 0.3em; font-family: 'Inter', system-ui, sans-serif; }
    .chordpro-sheet .row { display: flex; flex-wrap: wrap; align-items: flex-end; line-height: 1; margin-bottom: 0.1em; }
    .chordpro-sheet .column { display: flex; flex-direction: column; margin-right: 2px; }
    .chordpro-sheet .chord { color: var(--accent); font-weight: 600; white-space: pre; min-height: 1.2em; }
    .chordpro-sheet .chord:empty { min-height: 1.2em; }
    .chordpro-sheet .lyrics { white-space: pre; color: var(--text); }
    .chess-diagram { display: block; margin: 1em 0; }
    .chess-diagram figcaption { text-align: center; font-size: 0.85em; color: var(--text-dim); margin-top: 0.4em; font-style: italic; }
    .echarts-diagram { width: 100%; height: 350px; margin: 1em 0; }
    .vexflow-diagram { width: 100%; margin: 1em 0; overflow-x: auto; }
    .vexflow-diagram svg { display: block; }
    .vexchords-sheet { display: flex; flex-wrap: wrap; gap: 16px; margin: 1em 0; align-items: flex-start; }
    .vexchords-sheet .vexchords-chord { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .vexchords-sheet .vexchords-name { font-size: 0.85em; font-weight: 600; color: var(--accent); text-align: center; font-family: 'Inter', system-ui, sans-serif; }
    .asciimath-block { text-align: center; margin: 1em 0; overflow-x: auto; }
    .pseudocode-block { margin: 1em 0; }
    .pseudocode-block .ps-algorithm { border: 1px solid var(--border); border-radius: 6px; padding: 0.5em 1em; background: var(--bg-elev); }
    .plantuml-block { margin: 1em 0; text-align: center; }
    .plantuml-block img { max-width: 100%; height: auto; }
    .railroad-block { margin: 1em 0; overflow-x: auto; }
    svg.railroad-diagram { background: transparent; display: block; }
    svg.railroad-diagram path { stroke-width: 2; stroke: var(--text); fill: none; }
    svg.railroad-diagram text { font: bold 13px 'JetBrains Mono', monospace; fill: var(--text); text-anchor: middle; }
    svg.railroad-diagram text.label { text-anchor: start; fill: var(--text-dim); }
    svg.railroad-diagram text.comment { font: italic 11px 'JetBrains Mono', monospace; fill: var(--text-dim); }
    svg.railroad-diagram rect { stroke-width: 2; stroke: var(--accent); fill: var(--bg-elev); }
    svg.railroad-diagram rect.group-box { stroke: var(--border); stroke-dasharray: 10 5; fill: none; }
    .cytoscape-diagram { width: 100%; height: 420px; margin: 1em 0; border-radius: 6px; background: var(--bg-elev); border: 1px solid var(--border); }
    .go-board { display: inline-block; margin: 1em 0; }
    .go-board figcaption { text-align: center; font-size: 0.85em; color: var(--text-dim); margin-top: 0.4em; font-style: italic; }
    .chartjs-diagram { width: 100%; max-width: 640px; margin: 1em auto; display: block; }
    .chartjs-diagram canvas { max-width: 100%; }
    .qrcode-diagram { display: flex; flex-direction: column; align-items: center; margin: 1em 0; gap: 6px; }
    .qrcode-diagram svg { width: 180px; height: 180px; }
    .qrcode-caption { font-size: 0.8em; color: var(--text-mute); text-align: center; max-width: 240px; word-break: break-all; }
    .nomnoml-diagram { margin: 1em 0; overflow-x: auto; }
    .nomnoml-diagram svg { max-width: 100%; display: block; }
    .bytefield-diagram { margin: 1em 0; overflow-x: auto; }
    .bytefield-diagram svg { display: block; }
    .fnplot-diagram { margin: 1em 0; }
    .fnplot-diagram .title { display: none; }
    .tabulator-diagram { margin: 1em 0; }
    .tabulator-diagram .tabulator { border-radius: 6px; overflow: hidden; font-size: 13px; }
    .timeline-diagram { margin: 1em 0; overflow-x: auto; }
    .timeline-diagram svg { display: block; }
    .dbml-diagram { margin: 1em 0; overflow-x: auto; }
    .dbml-diagram svg { display: block; }
    .smiles-diagram { margin: 1em auto; text-align: center; }
    .smiles-diagram svg { max-width: 100%; height: auto; }
    .jsxgraph-diagram { margin: 1em 0; width: 100%; }
    .jxgbox { position: relative; overflow: hidden; background-color: #fff; border-style: solid; border-width: 1px; border-color: #356aa0; border-radius: 10px; margin: 0; -ms-touch-action: none; }
    .jxgbox svg text { cursor: default; user-select: none; }
    .JXGtext { font-family: Courier, monospace; background-color: transparent; padding: 0; margin: 0; }
    .JXGinfobox { border-style: none; border-width: 0; }
    .jxgbox :focus { outline-width: 0.5px; outline-style: dotted; }
    .JXG_navigation { position: absolute; right: 5px; bottom: 5px; z-index: 100; background-color: transparent; padding: 2px; font-size: 14px; cursor: pointer; }
    .JXG_navigation_button { color: #666; }
    .JXG_navigation_button:hover { border-radius: 2px; background: rgba(184,184,184,0.5); }
    .JXG_navigation_button svg { top: 0.2em; position: relative; padding: 0; }
    .plotly-diagram { margin: 1em 0; width: 100%; min-height: 350px; }
    .osmd-diagram { margin: 1em 0; width: 100%; overflow-x: auto; background: #fff; border-radius: 6px; padding: 8px 0; }
    mark.mzn-find-mark { background: #ffd700; color: #000; border-radius: 2px; padding: 0 1px; }
    mark.mzn-find-mark.mzn-find-active { background: #e8810a; color: #fff; }
    ${templateCss}
  `;
}

// ─────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────

// Detect tab-separated tabular text (Excel, Sheets, web tables, …).
// Returns { header, rows } - first line is the header, remaining lines are rows.
// A single tabbed line is a valid header-only table. Returns null when the text
// is not a clean rectangular TSV - caller falls back to default paste.
function parseTsvTable(text) {
  if (!text || !text.includes('\t')) return null;
  const src = text.replace(/\r\n?/g, '\n').replace(/\n+$/, '');
  // Quote-aware TSV reader: Excel/Sheets wrap cells containing tabs or newlines
  // in double quotes, with "" → literal ". Outside quotes, \t splits cells and
  // \n splits rows.
  const grid = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') { cell += '"'; i++; } // escaped quote
        else inQuotes = false;
      } else {
        cell += c;
      }
      continue;
    }
    if (c === '"' && cell === '') { inQuotes = true; continue; }
    if (c === '\t') { row.push(cell); cell = ''; continue; }
    if (c === '\n') { row.push(cell); grid.push(row); row = []; cell = ''; continue; }
    cell += c;
  }
  row.push(cell);
  grid.push(row);
  if (inQuotes) return null; // unterminated quoted cell → not safe to treat as TSV
  const cols = grid[0].length;
  if (cols < 2) return null;
  for (const r of grid) {
    if (r.length !== cols) return null; // not rectangular → not a table paste
  }
  const [header, ...rows] = grid;
  return { header, rows };
}

function toggleInlineFormat(view, marker) {
  const { state } = view;
  const mLen = marker.length;
  const docLen = state.doc.length;

  const changes = state.changeByRange(range => {
    const selected = state.sliceDoc(range.from, range.to);
    const markerCount = selected.split(marker).length - 1;

    // No markers in selection → wrap
    if (markerCount === 0) {
      const wrapped = `${marker}${selected}${marker}`;
      return {
        changes: { from: range.from, to: range.to, insert: wrapped },
        range: selected
          ? EditorSelection.range(range.from, range.from + wrapped.length)
          : EditorSelection.cursor(range.from + mLen),
      };
    }

    // Even count → complete pairs inside selection → strip all
    if (markerCount % 2 === 0) {
      const stripped = selected.split(marker).join('');
      return {
        changes: { from: range.from, to: range.to, insert: stripped },
        range: EditorSelection.range(range.from, range.from + stripped.length),
      };
    }

    // Odd count → one unmatched marker - scan outside, remove both internal + partner
    const stripped = selected.split(marker).join('');

    // Scan forward for a closing partner
    let partnerAfterPos = -1;
    for (let i = range.to; i <= Math.min(docLen - mLen, range.to + 500); i++) {
      if (state.sliceDoc(i, i + mLen) === marker) { partnerAfterPos = i; break; }
    }
    if (partnerAfterPos !== -1) {
      return {
        changes: [
          { from: range.from,      to: range.to,               insert: stripped },
          { from: partnerAfterPos, to: partnerAfterPos + mLen,  insert: '' },
        ],
        range: EditorSelection.range(range.from, range.from + stripped.length),
      };
    }

    // Scan backward for an opening partner
    let partnerBeforePos = -1;
    for (let i = range.from - mLen; i >= Math.max(0, range.from - 500); i--) {
      if (state.sliceDoc(i, i + mLen) === marker) { partnerBeforePos = i; break; }
    }
    if (partnerBeforePos !== -1) {
      return {
        changes: [
          { from: partnerBeforePos, to: partnerBeforePos + mLen, insert: '' },
          { from: range.from,       to: range.to,                insert: stripped },
        ],
        range: EditorSelection.range(range.from - mLen, range.from - mLen + stripped.length),
      };
    }

    // No partner found → just strip the orphan
    return {
      changes: { from: range.from, to: range.to, insert: stripped },
      range: EditorSelection.range(range.from, range.from + stripped.length),
    };
  });

  view.dispatch(changes, { scrollIntoView: true, userEvent: 'input' });
  return true;
}

// Toggle a line prefix (e.g. '- ', '> ', '1. ') on all lines in the selection.
// detect: optional regex to recognise an existing prefix (e.g. /^\d+\. / for numbered lists)
// If ALL lines already have the prefix → remove it. Otherwise → add it to all.
function toggleLinePrefix(view, prefix, detect = null) {
  const { state } = view;
  const hasPrefix = line => detect ? detect.test(line.text) : line.text.startsWith(prefix);
  const stripPrefix = text => detect ? text.replace(detect, '') : text.slice(prefix.length);

  // Collect all lines touched by any selection range
  const lines = [];
  const seen = new Set();
  for (const range of state.selection.ranges) {
    const startLine = state.doc.lineAt(range.from).number;
    const endLine   = state.doc.lineAt(range.to === range.from ? range.from : range.to - 1 < range.from ? range.from : range.to).number;
    for (let n = startLine; n <= endLine; n++) {
      if (!seen.has(n)) { seen.add(n); lines.push(state.doc.line(n)); }
    }
  }

  const allHave = lines.every(hasPrefix);
  const changes = lines.map(line => allHave
    ? { from: line.from, to: line.from + (detect ? line.text.match(detect)?.[0].length ?? 0 : prefix.length), insert: '' }
    : { from: line.from, insert: prefix }
  );

  view.dispatch({ changes, scrollIntoView: true, userEvent: 'input' });
  return true;
}

// Cycle heading level on the current line: plain → H1 → H2 → H3 → plain.
// levels: array of prefixes ordered H1→H3 (e.g. ['# ','## ','### '])
// Checks longest prefix first to avoid '# ' matching '## '.
function cycleHeading(view, levels) {
  const { state } = view;
  const line = state.doc.lineAt(state.selection.main.from);

  let currentLevel = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (line.text.startsWith(levels[i])) { currentLevel = i + 1; break; }
  }

  const nextLevel = (currentLevel + 1) % (levels.length + 1);
  const stripped  = currentLevel > 0 ? line.text.slice(levels[currentLevel - 1].length) : line.text;
  const newText   = nextLevel > 0 ? levels[nextLevel - 1] + stripped : stripped;

  view.dispatch({
    changes: { from: line.from, to: line.to, insert: newText },
    selection: EditorSelection.cursor(line.from + newText.length),
    scrollIntoView: true,
    userEvent: 'input',
  });
  return true;
}

// Toggle a code block around the selection (open/close delimiter strings).
// Already wrapped → unwrap. Has selection → wrap and keep selection on content.
// No selection → insert empty block with cursor between open and close.
function toggleCodeBlock(view, open, close) {
  const { state } = view;
  const range    = state.selection.main;
  const selected = state.sliceDoc(range.from, range.to);

  // Detect if selection is already surrounded by this block's delimiters
  const before = state.sliceDoc(Math.max(0, range.from - open.length), range.from);
  const after  = state.sliceDoc(range.to, Math.min(state.doc.length, range.to + close.length));
  if (before === open && after === close) {
    // Unwrap
    view.dispatch({
      changes: [
        { from: range.from - open.length, to: range.from,              insert: '' },
        { from: range.to,                 to: range.to + close.length, insert: '' },
      ],
      selection: EditorSelection.range(range.from - open.length, range.to - open.length),
      scrollIntoView: true,
      userEvent: 'input',
    });
    return true;
  }

  if (!selected) {
    // No selection: insert empty block, cursor inside
    view.dispatch({
      changes: { from: range.from, insert: open + close },
      selection: EditorSelection.cursor(range.from + open.length),
      scrollIntoView: true,
      userEvent: 'input',
    });
    return true;
  }

  // Wrap - keep selection on the content so the next toggle detects and unwraps
  view.dispatch({
    changes: { from: range.from, to: range.to, insert: open + selected + close },
    selection: EditorSelection.range(range.from + open.length, range.from + open.length + selected.length),
    scrollIntoView: true,
    userEvent: 'input',
  });
  return true;
}

// Insert a standalone line (e.g. '---', "'''") after the current line, cursor moves past it.
function insertLine(view, text) {
  const { state } = view;
  const line = state.doc.lineAt(state.selection.main.from);
  const insert = `\n${text}\n`;
  view.dispatch({
    changes: { from: line.to, insert },
    selection: EditorSelection.cursor(line.to + insert.length),
    scrollIntoView: true,
    userEvent: 'input',
  });
  return true;
}

// Apply text alignment to the current selection.
// linePrefix (Textile): toggles the prefix on each selected line.
// indent (RST): prepends the directive and indents each line by the given string.
// plain wrap (AsciiDoc, Djot, Org): inserts open before and close after the selection.
function applyAlign(view, spec) {
  if (!spec) return false;
  const { open, close = '', indent, linePrefix } = spec;
  const { state } = view;
  const sel = state.selection.main;
  const selectedText = state.sliceDoc(sel.from, sel.to);

  let newText;
  if (linePrefix) {
    const lines = (selectedText || '').split('\n');
    const allPrefixed = lines.length > 0 && lines.every(l => l.startsWith(open));
    newText = allPrefixed
      ? lines.map(l => l.slice(open.length)).join('\n')
      : lines.map(l => l.startsWith(open) ? l : open + l).join('\n');
  } else if (indent) {
    const indented = (selectedText || '').split('\n').map(l => indent + l).join('\n');
    newText = open + indented + close;
  } else {
    newText = open + (selectedText || '') + close;
  }

  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert: newText },
    selection: EditorSelection.cursor(sel.from + newText.length),
    scrollIntoView: true,
    userEvent: 'input',
  });
  return true;
}

export default function App() {
  const [updateInfo, setUpdateInfo]         = useState(null);
  const [themeKey, setThemeKey] = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-theme`) || 'light');
  const [lang, setLang]         = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-lang`)  || 'en');
  const [fontKeyHeading, setFontKeyHeading] = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-font-heading`) || 'oswald');
  const [fontKeyBody,    setFontKeyBody]    = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-font-body`)    || 'inter');
  const [fontKeyCode,    setFontKeyCode]    = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-font-code`)    || 'jetbrains-mono');
  const [styleTemplateKey, setStyleTemplateKey] = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-styleTemplate`) || 'standard');
  const [showSettings, setShowSettings] = useState(false);
  const [showConvertMenu, setShowConvertMenu] = useState(false);
  const [tabSettingsActive, setTabSettingsActive]   = useState('display');
  const [html, setHtml]           = useState('');
  const [fontSize, setFontSize]   = useState(() => parseInt(localStorage.getItem(`${STORAGE_PREFIX}-fontsize`) || '15', 10));
  const [splitRatio, setSplitRatio]   = useState(() => parseFloat(localStorage.getItem(`${STORAGE_PREFIX}-splitRatio`) || '0.5'));
  const [showToc, setShowToc]         = useState(true);
  const [tocItems, setTocItems]       = useState([]);
  const [tocWidth, setTocWidth]       = useState(220);
  const [tocMaxLevel, setTocMaxLevel] = useState(null); // null = show all levels; 2/3/4 caps the deepest shown level
  const [tocCollapsed, setTocCollapsed] = useState(() => new Set()); // ids of collapsed parent headings (their descendants are hidden)
  const [centerMode, setCenterMode]   = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-centerMode`) || 'split');
  const [centerView, setCenterView]   = useState(() => localStorage.getItem(`${STORAGE_PREFIX}-centerView`) || 'editor');
  const [dragOver, setDragOver]       = useState(false);
  const [linkPopup, setLinkPopup]     = useState(null); // { from, to, text, x, y }
  const [stylePanel, setStylePanel]   = useState(null);
  const stylePanelLeaveTimer          = useRef(null);
  // Extensions that support width / height directives in the style panel
  const EXT_SUPPORTS_WIDTH  = new Set(['smiles','cytoscape','echarts','fnplot','jsxgraph','markmap','plotly','qrcode','vega-lite','vexflow','chartjs','timeline']);
  const EXT_SUPPORTS_HEIGHT = new Set(['smiles','cytoscape','echarts','fnplot','jsxgraph','markmap','plotly','vega-lite','chartjs','tabulator']);
  // Extensions incompatible with all markzen style directives (renders at 100% width, crops on resize, no alignment possible)
  const EXT_STYLE_INCOMPATIBLE = new Set(['musicxml']);

  function makeNewTab(fp = '', text = '', displayName = '', formatId = '') {
    const fmt = formatId
      ? (formats.find(f => f.id === formatId) || defaultFormat)
      : (fp ? getFormatByExtension(fp.slice(fp.lastIndexOf('.'))) : defaultFormat);
    return {
      id: crypto.randomUUID(),
      filePath: fp,
      fileName: fp ? fp.replace(/.*[\\/]/, '') : (displayName || 'Untitled'),
      text,
      unsaved: false,
      scrollTop: 0,
      formatId: fmt.id,
    };
  }
  const [tabs, setTabs]               = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [confirmCloseId, setConfirmCloseId]     = useState(null);
  const [confirmReloadId, setConfirmReloadId]   = useState(null);
  const [pendingReloadData, setPendingReloadData] = useState(null);

  const editorContainerRef = useRef(null);
  const centerRef          = useRef(null);
  const newDocBtnRef       = useRef(null);
  const convertBtnRef      = useRef(null);
  const cmViewRef          = useRef(null);
  const onCmUpdateRef      = useRef(null);
  const activeFormatRef    = useRef(null);
  const themeCompartment   = useRef(new Compartment());
  const keymapCompartment  = useRef(new Compartment());
  const previewRef         = useRef(null);
  const mdBodyRef          = useRef(null);
  const suppressSyncRef       = useRef(false);
  const preservePreviewScrollRef = useRef(null); // set before programmatic source edits; syncScroll restores it
  const prevActiveTabIdRef    = useRef(null);
  const cytoscapeInstancesRef = useRef(new Map()); // keyed by container div - used for cy.png() export
  const openLinkPopupRef      = useRef(null);       // set below; called by Ctrl+K keymap handler
  const findInputRef          = useRef(null);
  const findMarksRef          = useRef([]);
  const [findOpen, setFindOpen]   = useState(false);
  const [findQuery, setFindQuery] = useState('');
  const [findIndex, setFindIndex] = useState(0);
  const [findCount, setFindCount] = useState(0);

  const t    = useT(lang);
  const fontHeading = FONT_CATALOG.heading.find(f => f.key === fontKeyHeading) || FONT_CATALOG.heading[0];
  const fontBody    = FONT_CATALOG.body.find(f => f.key === fontKeyBody)       || FONT_CATALOG.body[0];
  const fontCode    = FONT_CATALOG.code.find(f => f.key === fontKeyCode)       || FONT_CATALOG.code[0];
  const templateCss = (STYLE_TEMPLATES.find(t => t.key === styleTemplateKey) || STYLE_TEMPLATES[0]).css();
  const activeTab = tabs.find(tab => tab.id === activeTabId) ?? null;
  const activeFormat = activeTab
    ? (formats.find(f => f.id === activeTab.formatId) || defaultFormat)
    : defaultFormat;
  activeFormatRef.current = activeFormat;

  // New Document format picker dropdown state
  const [showNewDocMenu, setShowNewDocMenu] = useState(false);

  function closeSettings() { setShowSettings(false); }
  function getRenderedHtml() { return previewRef.current?.innerHTML || html; }
  function getSanitizedHtml() { return DOMPurify.sanitize(getRenderedHtml(), { FORCE_BODY: true, ADD_TAGS: ['use'] }); }

  // Collect all CSS for exports: inline <style> tags (dev) + linked <link> stylesheets (production).
  // In dev, Vite injects CSS as <style> tags. In production, Vite extracts CSS to linked files.
  // buildCss() only covers theme-aware extension styles - third-party CSS (katex, pseudocode,
  // etc.) must be collected from the DOM to survive the dev/production difference.
  async function getExportCss() {
    const docStyles = Array.from(document.querySelectorAll('style')).map(s => s.textContent || '').join('\n');
    const linkStyles = await Promise.all(
      Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => fetch(link.href).then(r => r.text()).catch(() => ''))
    );
    // Fetch VexFlow fonts from the local API (seeds/bravura.woff2 + seeds/academico.woff2)
    // and embed as data URIs so the exported HTML and PDF window have Bravura available
    // without any CDN dependency or timing issues.
    async function fontToDataUri(name) {
      try {
        const buf = await fetch(`${API}/fonts/${name}`).then(r => r.arrayBuffer());
        const bytes = new Uint8Array(buf);
        let b64 = '';
        for (let i = 0; i < bytes.length; i += 8192) b64 += String.fromCharCode(...bytes.subarray(i, i + 8192));
        return `data:font/woff2;base64,${btoa(b64)}`;
      } catch { return null; }
    }
    const [bravuraUri, academicoUri] = await Promise.all([fontToDataUri('bravura.woff2'), fontToDataUri('academico.woff2')]);
    const vexflowFonts = [
      bravuraUri  ? `@font-face{font-family:'Bravura';src:url('${bravuraUri}') format('woff2');}` : '',
      academicoUri ? `@font-face{font-family:'Academico';src:url('${academicoUri}') format('woff2');}` : '',
    ].filter(Boolean).join('\n');
    return (vexflowFonts ? vexflowFonts + '\n' : '') + buildCss(fontHeading, fontBody, fontCode, templateCss) + '\n' + docStyles + '\n' + linkStyles.join('\n');
  }

  // For export: clone the live DOM, then in order:
  //  1. General canvases → data URI (Chart.js, ECharts baseline; Cytoscape/Plotly will be overridden)
  //  2. Cytoscape → cy.png() composite (multiple abs-positioned canvases → single image)
  //  3. Plotly → Plotly.toImage() (handles WebGL 3D where toDataURL() returns blank)
  //  4. Markmap → re-render with duration:0; clone captures pre-transition M0,0 state
  //  5. PlantUML → fetch SVG and inline it (lazy-loaded images may not be loaded yet)
  //  6. VexFlow → SVG left as-is (HTML) or canvas PNG (PDF); Bravura in getExportCss()
  // No DOMPurify - content is our own pipeline output; SVG attributes must survive.
  async function getExportHtml(forPdf = false) {
    const container = previewRef.current;
    if (!container) return html;
    const clone = container.cloneNode(true);

    // Hover copy buttons are UI-only - strip them and unwrap the table wrappers so the
    // export markup is the clean rendered content, not the editor's affordances.
    clone.querySelectorAll('.copy-code-btn, .copy-table-btn').forEach(b => b.remove());
    clone.querySelectorAll('.table-wrap').forEach(w => { const tbl = w.querySelector('table'); if (tbl) w.replaceWith(tbl); });

    // 1. General canvases → data URI images
    const liveCanvases = Array.from(container.querySelectorAll('canvas'));
    Array.from(clone.querySelectorAll('canvas')).forEach((cc, i) => {
      const live = liveCanvases[i];
      if (!live) return;
      try {
        const img = document.createElement('img');
        img.src = live.toDataURL('image/png');
        img.style.maxWidth = '100%';
        if (live.style.width) img.style.width = live.style.width;
        else if (live.width) img.style.width = live.width + 'px';
        if (live.style.height) img.style.height = live.style.height;
        else if (live.height) img.style.height = live.height + 'px';
        cc.replaceWith(img);
      } catch { /* tainted canvas - leave as-is */ }
    });

    // 2. Cytoscape → cy.png() composite image (overrides the per-canvas imgs from step 1)
    Array.from(container.querySelectorAll('div.cytoscape-diagram')).forEach((liveDiv, i) => {
      const cy = cytoscapeInstancesRef.current.get(liveDiv);
      const cloneDiv = Array.from(clone.querySelectorAll('div.cytoscape-diagram'))[i];
      if (!cy || !cloneDiv || cy.destroyed()) return;
      try {
        const img = document.createElement('img');
        img.src = cy.png({ bg: 'white' });
        img.style.maxWidth = '100%';
        img.style.width = '100%';
        cloneDiv.innerHTML = '';
        cloneDiv.appendChild(img);
      } catch { /* leave per-canvas imgs from step 1 */ }
    });

    // 3. Plotly → Plotly.toImage() (handles WebGL 3D; overrides blank canvas from step 1)
    await Promise.all(
      Array.from(container.querySelectorAll('div.plotly-diagram')).map(async (liveDiv, i) => {
        const cloneDiv = Array.from(clone.querySelectorAll('div.plotly-diagram'))[i];
        if (!cloneDiv) return;
        try {
          const dataUrl = await Plotly.toImage(liveDiv, {
            format: 'png', width: liveDiv.clientWidth || 700, height: liveDiv.clientHeight || 350,
          });
          const img = document.createElement('img');
          img.src = dataUrl;
          img.style.maxWidth = '100%';
          cloneDiv.innerHTML = '';
          cloneDiv.appendChild(img);
        } catch { /* leave as-is */ }
      })
    );

    // 4. Markmap → re-render with duration:0 in an offscreen div so D3 transitions settle
    // instantly before serialization. The live clone captures the initial M0,0 path state
    // (before transitions complete), so we must re-render fresh for correct output.
    await Promise.all(
      Array.from(container.querySelectorAll('div.markmap-container')).map(async (liveDiv, i) => {
        const cloneDiv = Array.from(clone.querySelectorAll('div.markmap-container'))[i];
        if (!cloneDiv) return;
        const md = decodeURIComponent(liveDiv.dataset.markmap || '');
        if (!md) return;
        const w = liveDiv.clientWidth  || 800;
        const h = liveDiv.clientHeight || 420;
        const tmpDiv = document.createElement('div');
        tmpDiv.style.cssText = `position:fixed;left:-9999px;top:0;width:${w}px;height:${h}px;`;
        document.body.appendChild(tmpDiv);
        try {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', w);
          svg.setAttribute('height', h);
          tmpDiv.appendChild(svg);
          const { root } = markmapTransformer.transform(md);
          applyMathToMarkmapRoot(root);
          const mm = Markmap.create(svg, { pan: false, zoom: false, duration: 0 }, root);
          // Two frames: first for D3 to draw nodes, second for fit() to apply zoom transform
          await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
          mm.fit();
          await new Promise(r => requestAnimationFrame(r));
          cloneDiv.innerHTML = new XMLSerializer().serializeToString(svg);
        } catch { /* leave clone as-is */ }
        finally { document.body.removeChild(tmpDiv); }
      })
    );

    // 5. PlantUML → fetch SVG and inline it so lazy-loaded (off-screen) images always appear.
    await Promise.all(
      Array.from(container.querySelectorAll('div.plantuml-block img')).map(async (liveImg, i) => {
        const cloneImg = Array.from(clone.querySelectorAll('div.plantuml-block img'))[i];
        if (!cloneImg) return;
        try {
          const resp = await fetch(liveImg.src);
          const svgText = await resp.text();
          const svgEl = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
          svgEl.style.maxWidth = '100%';
          svgEl.style.height = 'auto';
          cloneImg.replaceWith(svgEl);
        } catch { /* leave img as-is */ }
      })
    );

    // 5. VexFlow - For PDF: re-render using CANVAS backend in the current window where Bravura is
    // already loaded in document.fonts. Canvas text rendering uses document.fonts so glyphs render
    // correctly. The PNG is then embedded, requiring no fonts in the PDF window.
    // For HTML: SVG left as-is - Bravura @font-face in getExportCss() handles it.
    // ⚠ CLAUDE: Do NOT apply this canvas conversion to HTML export - it changes SVG to PNG
    // unnecessarily and risks breaking HTML if the canvas render fails.
    if (forPdf) {
      await document.fonts.ready;
      await Promise.all(
        Array.from(container.querySelectorAll('div.vexflow-diagram')).map(async (liveDiv, i) => {
          const cloneDiv = Array.from(clone.querySelectorAll('div.vexflow-diagram'))[i];
          if (!cloneDiv) return;
          try {
            const src = decodeURIComponent(liveDiv.dataset.vexflow || '');
            const spec = JSON.parse(src);
            const staves = spec.staves || [{ clef: spec.clef || 'treble', time: spec.time || '4/4', key: spec.key || 'C', notes: spec.notes || '' }];
            const width = liveDiv.clientWidth || 600;
            const height = staves.length * 120 + 40;
            const tmpDiv = document.createElement('div');
            tmpDiv.style.cssText = `position:fixed;left:-9999px;top:0;width:${width}px;height:${height}px;`;
            document.body.appendChild(tmpDiv);
            try {
              const vf = new Factory({ renderer: { elementId: tmpDiv, width, height, backend: Renderer.Backends.CANVAS } });
              const score = vf.EasyScore();
              staves.forEach(({ clef = 'treble', time = '4/4', key = 'C', notes = '' }, idx) => {
                const sys = vf.System({ x: 10, y: idx * 120 + 10, width: width - 20 });
                const voice = score.voice(score.notes(notes, { clef, key }));
                voice.setMode(VoiceMode.SOFT);
                sys.addStave({ voices: [voice] }).addClef(clef).addTimeSignature(time);
              });
              vf.draw();
              const canvas = tmpDiv.querySelector('canvas');
              if (canvas) {
                const exportImg = document.createElement('img');
                exportImg.src = canvas.toDataURL('image/png');
                exportImg.style.maxWidth = '100%';
                cloneDiv.innerHTML = '';
                cloneDiv.appendChild(exportImg);
              }
            } finally {
              document.body.removeChild(tmpDiv);
            }
          } catch { /* leave SVG as-is */ }
        })
      );
    }

    // Restore image sources from data-src for export - no server proxy URLs in the output.
    // ⚠ CLAUDE: PDF temp file is written to os.tmpdir() - relative paths resolve against the temp
    // directory, not the original file's directory. For PDF, ALL local paths must become file:// URLs.
    // For HTML export, absolute paths keep backslashes (readable on Windows), relative paths stay as-is.
    const fileDir = activeTab?.filePath ? activeTab.filePath.replace(/[/\\][^/\\]*$/, '') : '';
    const toFileUrl = (winPath) => 'file:///' + winPath.replace(/\\/g, '/').replace(/ /g, '%20');
    Array.from(clone.querySelectorAll('img[data-src]')).forEach(img => {
      const original = img.getAttribute('data-src') || '';
      img.removeAttribute('data-src');
      const isWinAbsolute = /^[A-Za-z]:[/\\]/.test(original);
      const isRelative = !isWinAbsolute && !original.startsWith('/') && !original.startsWith('\\\\') && !original.startsWith('http') && !original.startsWith('data:');
      if (forPdf) {
        if (isWinAbsolute) {
          img.setAttribute('src', toFileUrl(original));
        } else if (isRelative && fileDir) {
          const absPath = fileDir + '\\' + original.replace(/\//g, '\\').replace(/^\.\\/, '');
          img.setAttribute('src', toFileUrl(absPath));
        } else {
          img.setAttribute('src', original);
        }
      } else if (isWinAbsolute) {
        img.setAttribute('src', original.replace(/\//g, '\\').replace(/ /g, '%20'));
      } else {
        img.setAttribute('src', original);
      }
    });

    return clone.innerHTML;
  }

  // Flattened HTML for native exports (DOCX, ODT, RTF, PPTX) - all SVGs converted to PNG.
  // Builds on getExportHtml(true) which already handles canvases, Cytoscape, Plotly, Markmap,
  // PlantUML, VexFlow. This step converts any remaining <svg> elements to inline PNG <img>.
  async function getExportHtmlFlattened() {
    const htmlStr = await getExportHtml(true);
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlStr;
    // Unwrap mermaid SVGs from their <pre> containers BEFORE conversion.
    // Mermaid renders into <pre class="mermaid"><svg>...</svg></pre>.
    // Pandoc treats <pre> as a code block - any content inside (img or raw SVG) becomes literal text.
    // Replacing <pre> with <div> first ensures the converted <img> lands in a flow block.
    tmp.querySelectorAll('pre').forEach(pre => {
      const div = document.createElement('div');
      div.style.margin = '1em 0';
      while (pre.firstChild) div.appendChild(pre.firstChild);
      pre.replaceWith(div);
    });
    const svgEls = Array.from(tmp.querySelectorAll('svg'));
    await Promise.all(svgEls.map(async svgEl => {
      try {
        // ⚠ CLAUDE: Chrome refuses to load SVG images containing <foreignObject> as <img> sources
        // (security policy). The SVG renders fine INLINE (HTML export works) but fails as a blob URL.
        // Fix: serialize the SVG to HTML and render it in a hidden BrowserWindow via /render-html-to-png.
        // This avoids all viewport/scroll issues - the offscreen window is completely isolated.
        if (svgEl.querySelector('foreignObject')) {
          const vbRaw = svgEl.getAttribute('viewBox') || svgEl.getAttribute('viewbox');
          const vb    = vbRaw?.split(/[\s,]+/).map(Number);
          const attrW = parseFloat(svgEl.getAttribute('width'));
          const attrH = parseFloat(svgEl.getAttribute('height'));
          const isRelW = (svgEl.getAttribute('width')  || '').includes('%');
          const isRelH = (svgEl.getAttribute('height') || '').includes('%');
          const w = Math.round((!isRelW && attrW > 0 ? attrW : 0) || (vb?.[2] > 0 ? vb[2] : 0) || 800);
          const h = Math.round((!isRelH && attrH > 0 ? attrH : 0) || (vb?.[3] > 0 ? vb[3] : 0) || 400);
          const pw = w * 2; const ph = h * 2; // 2× for print quality
          if (isRelW || !attrW || attrW <= 0) svgEl.setAttribute('width',  String(pw));
          if (isRelH || !attrH || attrH <= 0) svgEl.setAttribute('height', String(ph));
          const svgStr = new XMLSerializer().serializeToString(svgEl);
          const cleanSvg = svgStr
            .replace(/@import\s+url\([^)]*\)\s*;?\s*/g, '')
            .replace(/url\((['"]?)https?:\/\/[^)]*\1\)/g, 'none');
          const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:white;">${cleanSvg}</body></html>`;
          const resp = await fetch(`${API}/render-html-to-png`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html, width: pw, height: ph }),
          });
          if (resp.ok) {
            const { dataUrl } = await resp.json();
            if (dataUrl) {
              const out = document.createElement('img');
              out.src = dataUrl;
              out.setAttribute('width',  String(w));
              out.setAttribute('height', String(h));
              out.style.maxWidth = '100%';
              svgEl.replaceWith(out);
            }
          }
          return;
        }

        // SVGs without foreignObject: serialize → blob URL → canvas → PNG
        // Use getAttribute - svgEl.width.baseVal.value throws for relative lengths (e.g. width="100%")
        // ⚠ CLAUDE: mermaid uses lowercase `viewbox`, NOT camelCase `viewBox` - check both
        const vbRaw = svgEl.getAttribute('viewBox') || svgEl.getAttribute('viewbox');
        const vb = vbRaw?.split(/[\s,]+/).map(Number);
        const attrW = parseFloat(svgEl.getAttribute('width'));
        const attrH = parseFloat(svgEl.getAttribute('height'));
        const isRelW = (svgEl.getAttribute('width')  || '').includes('%');
        const isRelH = (svgEl.getAttribute('height') || '').includes('%');
        const w = Math.round((!isRelW && attrW > 0 ? attrW : 0) || (vb?.[2] > 0 ? vb[2] : 0) || 800);
        const h = Math.round((!isRelH && attrH > 0 ? attrH : 0) || (vb?.[3] > 0 ? vb[3] : 0) || 400);
        // Rasterize at 2× for print quality - SVG intrinsic size is too small for documents.
        // Canvas renders at 2×, output img keeps logical 1× size for correct pandoc sizing.
        const pw = w * 2;
        const ph = h * 2;
        // Set explicit pixel dimensions - SVGs with width="100%" fail as standalone images
        if (isRelW || !attrW || attrW <= 0) svgEl.setAttribute('width',  String(pw));
        if (isRelH || !attrH || attrH <= 0) svgEl.setAttribute('height', String(ph));
        const svgStr = new XMLSerializer().serializeToString(svgEl);
        // Strip external URL refs from SVG CSS - Chromium tries to fetch them from blob,
        // gets blocked ("Could not fetch resource"), causing img.onerror to fire.
        const cleanSvgStr = svgStr
          .replace(/@import\s+url\([^)]*\)\s*;?\s*/g, '')
          .replace(/url\((['"]?)https?:\/\/[^)]*\1\)/g, 'none');
        const blob = new Blob([cleanSvgStr], { type: 'image/svg+xml' });
        const url  = URL.createObjectURL(blob);
        // ⚠ CLAUDE: do NOT use `new Image()` - lucide-react exports an Image icon that shadows
        // the global window.Image constructor, causing "Image is not a constructor".
        await new Promise(resolve => {
          const img = document.createElement('img');
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = pw; canvas.height = ph;
              canvas.getContext('2d').drawImage(img, 0, 0, pw, ph);
              URL.revokeObjectURL(url);
              const out = document.createElement('img');
              out.src = canvas.toDataURL('image/png');
              out.setAttribute('width',  String(w));
              out.setAttribute('height', String(h));
              out.style.maxWidth = '100%';
              svgEl.replaceWith(out);
            } catch { URL.revokeObjectURL(url); }
            resolve();
          };
          img.onerror = () => { URL.revokeObjectURL(url); resolve(); };
          img.src = url;
        });
      } catch { /* leave as-is, will be removed by cleanup below */ }
    }));
    // Remove any SVGs that couldn't be converted - pandoc chokes on inline SVGs with external
    // resource refs, failing with "Could not fetch resource" and aborting the export.
    tmp.querySelectorAll('svg').forEach(el => el.remove());
    return tmp.innerHTML;
  }

  function buildToc() {
    if (!previewRef.current || !activeTab) { setTocItems([]); return; }
    const tocDef = previewRef.current.querySelector('.mzn-toc-def');
    if (tocDef) {
      const raw = decodeURIComponent(tocDef.dataset.toc || '');
      const lines = activeTab.text.split('\n');
      const items = [];
      for (const line of raw.split('\n')) {
        const m = line.match(/^(\s*)- \[([^\]]+)\]\(#([^)]+)\)/);
        if (!m) continue;
        const level = m[1].length === 0 ? 1 : m[1].length <= 2 ? 2 : 3;
        let lineNumber = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(`id="${m[3]}"`) || lines[i].includes(`name="${m[3]}"`)) {
            lineNumber = i; break;
          }
        }
        items.push({ id: m[3], text: m[2], level, lineNumber });
      }
      setTocItems(items);
      return;
    }
    const nodes = [...previewRef.current.querySelectorAll('h1,h2,h3,h4,h5,h6')];
    const counts = {};
    const lines = activeTab.text.split('\n');
    const headingCounters = {};
    // ⚠ CLAUDE: the source heading line keeps inline markup (`.mpeg`, **bold**, [link](url))
    // but the rendered DOM text does not. Strip it before matching, or any heading with
    // inline formatting fails to match and the editor jump silently lands on line 1.
    const stripInlineMd = s => s
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/__([^_]+)__/g, '$1')
      .replace(/~~([^~]+)~~/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1').replace(/_([^_]+)_/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\s+/g, ' ').trim();
    const items = nodes.map(el => {
      const text = el.textContent.trim();
      const level = parseInt(el.tagName[1], 10);
      let slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      counts[slug] = (counts[slug] || 0) + 1;
      if (counts[slug] > 1) slug = `${slug}-${counts[slug] - 1}`;
      el.id = slug;
      // Find line offset in editor - use the format's heading marker char (# for md, = for adoc)
      const headingChar = (activeFormat.shortcuts?.headings?.[0] || '# ')[0];
      const prefix = headingChar.repeat(level);
      const key = `${level}:${text}`;
      headingCounters[key] = (headingCounters[key] || 0) + 1;
      const targetOcc = headingCounters[key];
      let occ = 0;
      let lineNumber = 0; // 0-indexed line number; resolved to CM pos at click time
      for (let i = 0; i < lines.length; i++) {
        const t2 = lines[i].trimStart();
        if ((t2.startsWith(prefix + ' ') || t2.startsWith(prefix + '\t')) && !t2.startsWith(prefix + headingChar)) {
          const heading = stripInlineMd(t2.slice(level + 1).trim());
          if (heading === text.replace(/\s+/g, ' ')) { occ++; if (occ === targetOcc) { lineNumber = i; break; } }
        }
      }
      return { id: slug, text, level, lineNumber };
    });
    setTocItems(items);
  }

  function scrollToHeading(id) {
    const el = document.getElementById(id);
    if (el && previewRef.current) {
      const container = previewRef.current;
      container.scrollTop += el.getBoundingClientRect().top - container.getBoundingClientRect().top;
    }
    const item = tocItems.find(i => i.id === id);
    if (item == null || !cmViewRef.current) return;
    const view = cmViewRef.current;
    const cmLineNum = item.lineNumber + 1; // CM lines are 1-indexed
    if (cmLineNum > view.state.doc.lines) return;
    const pos = view.state.doc.line(cmLineNum).from;
    // Always update the cursor - selection dispatch is safe on a hidden editor.
    // Only scroll when the editor is visible - scrolling a hidden CM instance causes
    // the browser to scroll the page (win.scrollBy) and makes the header disappear.
    suppressSyncRef.current = true;
    view.dispatch({ selection: EditorSelection.cursor(pos) });
    const editorVisible = centerMode === 'split' || centerView === 'editor';
    if (editorVisible) {
      const lineTop = view.lineBlockAt(pos).top;
      view.scrollDOM.scrollTop = Math.max(0, lineTop - 20);
    }
  }

  function toggleTocCollapse(id) {
    setTocCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  // Rendered TOC list: apply the level cap, flag each parent (a heading whose next visible
  // item is deeper) as collapsible, and drop descendants of any collapsed parent.
  function visibleTocItems() {
    const out = [];
    let hideDeeperThan = null; // while set, skip items deeper than this (a collapsed subtree)
    for (let i = 0; i < tocItems.length; i++) {
      const item = tocItems[i];
      if (hideDeeperThan != null) {
        if (item.level > hideDeeperThan) continue;
        hideDeeperThan = null;
      }
      if (tocMaxLevel != null && item.level > tocMaxLevel) continue;
      const next = tocItems[i + 1];
      const hasChildren = !!next && next.level > item.level && (tocMaxLevel == null || next.level <= tocMaxLevel);
      out.push({ ...item, hasChildren });
      if (hasChildren && tocCollapsed.has(item.id)) hideDeeperThan = item.level;
    }
    return out;
  }

  // Resolve a doc-relative path (link href or img src) against the active tab's directory.
  // Absolute paths and links with no open file pass through unchanged.
  function resolveDocRelativePath(raw) {
    const isAbsolute = /^[A-Za-z]:[/\\]/.test(raw) || raw.startsWith('/') || raw.startsWith('\\\\');
    if (isAbsolute || !activeTab?.filePath) return raw;
    const dir = activeTab.filePath.replace(/[/\\][^/\\]*$/, '');
    return dir + '\\' + raw.replace(/\//g, '\\').replace(/^\.\\/, '');
  }

  // Intercept link clicks in the rendered preview. Local file links open inside mzn (a new tab);
  // letting the browser follow them would navigate the window away and blank the whole app.
  // External URLs (http/mailto/…) fall through to main.js will-navigate → system browser.
  function handlePreviewClick(e) {
    const a = e.target.closest('a');
    if (!a || !mdBodyRef.current?.contains(a)) return;
    const raw = a.getAttribute('href') || '';
    if (!raw || raw.startsWith('#')) return;                                  // in-page anchor → native scroll
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^file:/i.test(raw)) return;     // http(s)/mailto/etc → system browser
    e.preventDefault();
    const path = resolveDocRelativePath(raw.replace(/^file:\/+/i, '')).replace(/\//g, '\\');
    fetch(`${API}/read-file?path=${btoa(path)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.text != null) openFileInNewTab(data.filePath, data.text); })
      .catch(err => console.error('[mzn] link open error:', err));
  }

  function applyStyleToSource(lang, nth, directives) {
    const view = cmViewRef.current;
    if (!view) return;
    preservePreviewScrollRef.current = previewRef.current?.scrollTop ?? null;
    suppressSyncRef.current = true;
    const text = view.state.doc.toString();
    const lines = text.split('\n');
    const isAdoc = activeFormat.id === 'asciidoc';

    // Find nth occurrence of the fenced block in source
    const langEsc = lang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const langRe = isAdoc
      ? new RegExp('^\\[source,' + langEsc + '\\]\\s*$')
      : new RegExp('^```' + langEsc + '\\s*$');
    let count = 0, fenceLineIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().match(langRe)) { count++; if (count === nth) { fenceLineIdx = i; break; } }
    }
    if (fenceLineIdx === -1) return;

    const lineStart = (idx) => { let p = 0; for (let i = 0; i < idx; i++) p += lines[i].length + 1; return p; };

    // Detect existing markzen style block immediately before the fence
    let blockStart = -1;
    if (isAdoc) {
      // AsciiDoc: look for [source,markzen]\n----\nstyle\n...\n---- before [source,lang]
      let searchFrom = fenceLineIdx - 1;
      while (searchFrom >= 0 && lines[searchFrom].trim() === '') searchFrom--;
      if (searchFrom >= 0 && lines[searchFrom].trim() === '----') {
        const closeIdx = searchFrom;
        for (let i = closeIdx - 1; i >= 0; i--) {
          if (lines[i].trim() === '----') {
            if (i > 0 && lines[i - 1].trim() === '[source,markzen]' && lines[i + 1]?.trim() === 'style') {
              blockStart = i - 1;
            }
            break;
          }
        }
      }
    } else {
      // Markdown: look for ```markzen\nstyle\n...\n``` before ```lang
      if (fenceLineIdx >= 2 && lines[fenceLineIdx - 1]?.trim() === '```') {
        for (let i = fenceLineIdx - 2; i >= 0; i--) {
          if (lines[i].trim() === '```markzen' && lines[i + 1]?.trim() === 'style') {
            blockStart = i; break;
          }
          if (lines[i].trim().startsWith('```')) break;
        }
      }
    }

    const isEmpty = !directives.width && !directives.height && !directives.align;
    let insertStr = '';
    if (!isEmpty) {
      const bLines = isAdoc ? ['[source,markzen]', '----', 'style'] : ['```markzen', 'style'];
      if (directives.width)  bLines.push(`width ${directives.width}`);
      if (directives.height) bLines.push(`height ${directives.height}`);
      if (directives.align)  bLines.push(`align ${directives.align}`);
      bLines.push(isAdoc ? '----' : '```', '');
      insertStr = bLines.join('\n');
    }

    // Replace from blockStart (or fence line) up to (not including) the fence line
    const fromPos = lineStart(blockStart !== -1 ? blockStart : fenceLineIdx);
    const toPos   = lineStart(fenceLineIdx);
    view.dispatch({ changes: { from: fromPos, to: toPos, insert: insertStr } });
  }

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}-theme`, themeKey);
    document.documentElement.setAttribute('data-theme', themeKey); // drives :root[data-theme] in the shared CSS
  }, [themeKey]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-lang`, lang); }, [lang]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-font-heading`, fontKeyHeading); }, [fontKeyHeading]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-font-body`,    fontKeyBody);    }, [fontKeyBody]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-font-code`,    fontKeyCode);    }, [fontKeyCode]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-styleTemplate`, styleTemplateKey); }, [styleTemplateKey]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-fontsize`, fontSize); }, [fontSize]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-centerMode`, centerMode); }, [centerMode]);
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-centerView`, centerView); }, [centerView]);

  // ── Preview find (Ctrl+F) ─────────────────────────────────────────────────
  function clearFindMarks() {
    for (const mark of findMarksRef.current) {
      const parent = mark.parentNode;
      if (!parent) continue;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    }
    findMarksRef.current = [];
  }

  function highlightFindMark(marks, idx) {
    marks.forEach((m, i) => {
      m.classList.toggle('mzn-find-active', i === idx);
    });
    if (marks[idx]) marks[idx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function applyFind(query, targetIndex) {
    clearFindMarks();
    if (!query || !mdBodyRef.current) { setFindCount(0); setFindIndex(0); return; }
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const walker = document.createTreeWalker(mdBodyRef.current, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);
    const marks = [];
    for (const textNode of textNodes) {
      const text = textNode.textContent;
      const matches = [...text.matchAll(regex)];
      if (!matches.length) continue;
      const frag = document.createDocumentFragment();
      let last = 0;
      for (const m of matches) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const mark = document.createElement('mark');
        mark.className = 'mzn-find-mark';
        mark.textContent = m[0];
        frag.appendChild(mark);
        marks.push(mark);
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      textNode.parentNode.replaceChild(frag, textNode);
    }
    findMarksRef.current = marks;
    setFindCount(marks.length);
    const idx = marks.length > 0 ? ((targetIndex % marks.length) + marks.length) % marks.length : 0;
    setFindIndex(idx);
    highlightFindMark(marks, idx);
  }

  function navigateFind(delta) {
    const marks = findMarksRef.current;
    if (!marks.length) return;
    const newIdx = ((findIndex + delta) % marks.length + marks.length) % marks.length;
    setFindIndex(newIdx);
    highlightFindMark(marks, newIdx);
  }

  function closeFind() {
    clearFindMarks();
    setFindOpen(false);
    setFindQuery('');
    setFindCount(0);
    setFindIndex(0);
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'f') {
        const previewVisible = centerMode === 'split' || centerView === 'render';
        if (!previewVisible) return;
        e.preventDefault();
        setFindOpen(true);
        setTimeout(() => findInputRef.current?.focus(), 30);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [centerMode, centerView]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear marks when content changes (tab switch or edit)
  useEffect(() => { clearFindMarks(); setFindCount(0); setFindIndex(0); }, [html]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { localStorage.setItem(`${STORAGE_PREFIX}-splitRatio`, splitRatio); }, [splitRatio]);
  useEffect(() => {
    if (!activeTab) { setHtml(''); return; }
    // Most formats' toHtml is sync (string); asciidoc's is async (Promise, asciidoctor v4). Handle both,
    // and guard against a slow async result landing after the tab/format already changed.
    const out = activeFormat.toHtml(activeTab.text);
    if (out && typeof out.then === 'function') {
      let alive = true;
      out.then(h => { if (alive) setHtml(h); });
      return () => { alive = false; };
    }
    setHtml(out);
  }, [activeTab?.text, activeTabId, activeFormat]); // eslint-disable-line
  useLayoutEffect(() => {
    if (!mdBodyRef.current) return;
    mdBodyRef.current.innerHTML = html;
    // Hover copy buttons - same affordance on code blocks and tables.
    const COPY_ICON  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const CHECK_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    const makeCopyBtn = (className, getText) => {
      const btn = document.createElement('button');
      btn.className = className;
      btn.innerHTML = COPY_ICON;
      btn.onclick = () => navigator.clipboard.writeText(getText()).then(() => {
        btn.innerHTML = CHECK_ICON;
        setTimeout(() => { btn.innerHTML = COPY_ICON; }, 1500);
      });
      return btn;
    };
    // Code blocks → copy the raw code text.
    mdBodyRef.current.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.copy-code-btn')) return;
      const code = pre.querySelector('code');
      pre.appendChild(makeCopyBtn('copy-code-btn', () => (code || pre).textContent));
    });
    // Tables → wrap (so the button can be absolutely positioned - a <button> can't be a
    // direct child of <table>) and copy as TSV: tab-separated, pastes cleanly into
    // spreadsheets/Word, and round-trips through this app's own parseTsvTable.
    mdBodyRef.current.querySelectorAll('table').forEach(table => {
      if (table.parentElement?.classList.contains('table-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'table-wrap';
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
      wrap.appendChild(makeCopyBtn('copy-table-btn', () =>
        Array.from(table.querySelectorAll('tr')).map(tr =>
          Array.from(tr.querySelectorAll('th, td')).map(c => c.textContent.trim()).join('\t')
        ).join('\n')));
    });
    // Proxy local image paths through the Express server - file:// is blocked by Electron security policy.
    // Original src is saved in data-src so the export can restore it without the proxy URL.
    // Relative paths are resolved against the open file's directory for the proxy only.
    mdBodyRef.current.querySelectorAll('img[src]').forEach(img => {
      const src = img.getAttribute('src');
      if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:')) return;
      img.setAttribute('data-src', src);
      // Always send backslashes to the proxy - fs.readFileSync is more reliable with them on Windows
      const proxyPath = resolveDocRelativePath(src).replace(/\//g, '\\');
      img.src = `${API}/local-image?path=${encodeURIComponent(proxyPath)}`;
    });
  }, [html]);
  useEffect(() => { syncScroll(); buildToc(); }, [html]); // eslint-disable-line react-hooks/exhaustive-deps
  // Theme change - notify active format (e.g. mermaid re-initializes with new theme)
  useEffect(() => { activeFormat.onThemeChange?.(themeKey); }, [themeKey, activeFormat]); // eslint-disable-line
  // Single postRender dispatch - all DOM rendering delegated to the active format adapter
  useEffect(() => {
    if (!previewRef.current) return;
    cytoscapeInstancesRef.current.clear();
    const ctx = { themeKey, cytoscapeRegistry: cytoscapeInstancesRef.current };
    activeFormat.postRender(previewRef.current, ctx).catch(e => console.error('[mzn] postRender error:', e));
  }, [html]); // eslint-disable-line

  // Swap CM content when active tab changes
  useEffect(() => {
    const view = cmViewRef.current;
    if (!view) return;

    // Save scroll position of outgoing tab
    if (prevActiveTabIdRef.current && prevActiveTabIdRef.current !== activeTabId) {
      const scrollEl = view.scrollDOM;
      setTabs(prev => prev.map(tab =>
        tab.id === prevActiveTabIdRef.current ? { ...tab, scrollTop: scrollEl.scrollTop } : tab
      ));
    }

    // Load incoming tab content into CM
    const incoming = tabs.find(tab => tab.id === activeTabId);
    if (!incoming) return;
    suppressSyncRef.current = true;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: incoming.text },
      selection: EditorSelection.cursor(0),
      effects: EditorView.scrollIntoView(0, { y: 'start' }),
    });

    // Restore preview scroll
    if (previewRef.current) previewRef.current.scrollTop = incoming.scrollTop;
    prevActiveTabIdRef.current = activeTabId;
  }, [activeTabId]); // eslint-disable-line

  function syncScroll() {
    const view    = cmViewRef.current;
    const preview = previewRef.current;
    if (!view || !preview) return;
    if (preservePreviewScrollRef.current !== null) {
      preview.scrollTop = preservePreviewScrollRef.current;
      preservePreviewScrollRef.current = null;
      return;
    }
    const totalLines = view.state.doc.lines;
    const cursorLine = view.state.doc.lineAt(view.state.selection.main.head).number - 1;
    const ratio = totalLines <= 1 ? 0 : cursorLine / (totalLines - 1);
    preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);
  }

  // Always-fresh CM update callback - avoids stale closures in updateListener
  openLinkPopupRef.current = (view) => {
    const range  = view.state.selection.main;
    const text   = view.state.sliceDoc(range.from, range.to);
    const coords = view.coordsAtPos(range.from);
    setLinkPopup({ from: range.from, to: range.to, text, x: coords?.left ?? 200, y: coords?.bottom ?? 200 });
  };

  onCmUpdateRef.current = (update) => {
    if (update.docChanged) {
      const isProgrammatic = suppressSyncRef.current; // read before it resets below
      const newText = update.state.doc.toString();
      setTabs(prev => prev.map(tab =>
        tab.id === activeTabId ? { ...tab, text: newText, unsaved: isProgrammatic ? tab.unsaved : true } : tab
      ));
    }
    if (update.docChanged || update.selectionSet) {
      if (suppressSyncRef.current) { suppressSyncRef.current = false; }
      else { syncScroll(); }
    }
  };

  // Check for a new version once on launch (silent if up to date / offline / skipped)
  useEffect(() => {
    checkForUpdate({ appId: pkg.name, alias: STORAGE_PREFIX, currentVersion: APP_VERSION })
      .then(u => { if (u) setUpdateInfo(u); });
  }, []);

  // Create EditorView once on mount
  useEffect(() => {
    if (!editorContainerRef.current) return;
    const view = new EditorView({
      state: EditorState.create({
        doc: '',
        extensions: [
          basicSetup,
          markdown(),
          EditorView.lineWrapping,
          keymapCompartment.current.of([]),
          themeCompartment.current.of([]),
          EditorView.theme({
            '&':            { height: '100%', fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: '13px' },
            '.cm-scroller': { lineHeight: '1.6', overflowY: 'auto' },
            '.cm-content':  { padding: '12px' },
            '.cm-focused':  { outline: 'none' },
          }),
          EditorView.updateListener.of(u => onCmUpdateRef.current?.(u)),
          // Auto-convert tab-separated clipboard text (Excel, Sheets, web tables…)
          // into a native table for the active format.
          EditorView.domEventHandlers({
            paste(event, view) {
              const text = event.clipboardData?.getData('text/plain');
              if (!text) return false;
              const table = parseTsvTable(text);
              if (!table) return false;
              const fmt = activeFormatRef.current;
              if (!fmt?.formatTable) return false;
              const inserted = fmt.formatTable(table);
              event.preventDefault();
              const { from, to } = view.state.selection.main;
              view.dispatch({
                changes: { from, to, insert: inserted },
                selection: EditorSelection.cursor(from + inserted.length),
                scrollIntoView: true,
                userEvent: 'input.paste',
              });
              return true;
            },
          }),
        ],
      }),
      parent: editorContainerRef.current,
    });
    cmViewRef.current = view;
    return () => { view.destroy(); cmViewRef.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reconfigure CM theme when themeKey changes
  useEffect(() => {
    cmViewRef.current?.dispatch({
      effects: themeCompartment.current.reconfigure(themeKey === 'dark' ? oneDark : []),
    });
  }, [themeKey]);

  // Reconfigure CM keybindings when active format changes
  useEffect(() => {
    const s = activeFormat.shortcuts || {};
    const inline    = (key, marker) => marker      ? [{ key, run(view) { return toggleInlineFormat(view, marker); } }] : [];
    const prefix    = (key, pfx, detect) => pfx    ? [{ key, run(view) { return toggleLinePrefix(view, pfx, detect); } }] : [];
    const insert    = (key, text) => text           ? [{ key, run(view) { return insertLine(view, text); } }] : [];
    const heading   = (key, levels) => levels?.length ? [{ key, run(view) { return cycleHeading(view, levels); } }] : [];
    const codeblock = (key, cb) => cb              ? [{ key, run(view) { return toggleCodeBlock(view, cb.open, cb.close); } }] : [];
    const bindings = [
      ...inline   ('Mod-b', s.bold),
      ...inline   ('Mod-i', s.italic),
      ...inline   ('Mod-e', s.inlineCode),
      ...inline   ('Mod-d', s.strikethrough),
      ...prefix   ('Mod-l', s.bulletList),
      ...prefix   ('Mod-u', s.numberedList, s.numberedList === '1. ' ? /^\d+\.\s/ : null),
      ...prefix   ('Mod-q', s.blockquote),
      ...insert   ('Mod-r', s.horizontalRule),
      ...heading  ('Mod-h', s.headings),
      ...codeblock('Mod-m', s.codeBlock),
      { key: 'Mod-k', run(view) { openLinkPopupRef.current?.(view); return true; } },
    ];
    cmViewRef.current?.dispatch({
      effects: keymapCompartment.current.reconfigure(Prec.highest(keymap.of(bindings))),
    });
  }, [activeFormat]); // eslint-disable-line

  // Poll for files opened via second instance
  useEffect(() => {
    let timer = null;
    function poll() {
      fetch(`${API}/pending-file`)
        .then(r => r.json())
        .then(data => { if (data) openFileInNewTab(data.filePath, data.text); })
        .catch(() => {})
        .finally(() => { timer = setTimeout(poll, 400); });
    }
    function onFocus() { poll(); }
    function onBlur()  { clearTimeout(timer); }
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    if (document.hasFocus()) poll();
    return () => { clearTimeout(timer); window.removeEventListener('focus', onFocus); window.removeEventListener('blur', onBlur); };
  }, []); // eslint-disable-line

  // Poll for external file changes (chokidar in main process). Reuses
  // openFileInNewTab's clean-vs-unsaved logic: clean tabs refresh silently,
  // unsaved tabs get a reload confirmation prompt.
  useEffect(() => {
    let timer = null;
    function poll() {
      fetch(`${API}/file-changes`)
        .then(r => r.json())
        .then(list => { if (Array.isArray(list)) list.forEach(({ filePath, text }) => openFileInNewTab(filePath, text)); })
        .catch(() => {})
        .finally(() => { timer = setTimeout(poll, 800); });
    }
    poll();
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line

  // Open file passed via double-click / file association at startup
  useEffect(() => {
    const fp = getStartFile();
    if (!fp) return;
    fetch(`${API}/read-file?path=${btoa(fp)}`)
      .then(r => r.json())
      .then(data => { if (data?.text) openFileInNewTab(data.filePath, data.text); })
      .catch(e => console.error('[mzn] startup file open error:', e));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // CLI export - runs once html is rendered, waits 2s for async extensions (mermaid etc.)
  useEffect(() => {
    if (!CLI || !html) return;
    const timer = setTimeout(async () => {
      try {
        const exportHtml = await getExportHtml(CLI.format === 'pdf');
        const exportCss  = await getExportCss();
        const endpoint   = CLI.format === 'pdf' ? 'cli-write-pdf' : 'cli-write-html';
        await fetch(`${API}/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: exportHtml, css: exportCss, outPath: CLI.outPath }),
        });
      } catch (e) {
        console.error('[mzn-cli] export error:', e);
      } finally {
        fetch(`${API}/cli-done`, { method: 'POST' }).catch(() => {});
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [html]); // eslint-disable-line react-hooks/exhaustive-deps

  function startTocResize(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startW = tocWidth;
    function onMove(ev) {
      setTocWidth(Math.max(150, Math.min(500, startW + (ev.clientX - startX))));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function startEditorResize(e) {
    e.preventDefault();
    const container = centerRef.current;
    function onMove(ev) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const minPx = 200;
      const lo = minPx / rect.width;
      setSplitRatio(Math.max(lo, Math.min(1 - lo, (ev.clientX - rect.left) / rect.width)));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  async function doOpenFile() {
    try {
      const allFilters = [
        ...formats.flatMap(f => f.fileFilter),
        { name: 'All Files', extensions: ['*'] },
      ];
      const res = await fetch(`${API}/open-file`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t('ttlOsdOpenMd'), filters: allFilters }) });
      const data = await res.json();
      if (!data) return;
      openFileInNewTab(data.filePath, data.text);
    } catch (e) {
      console.error('[mzn] doOpenFile error:', e);
    }
  }

  async function doSave() {
    if (!activeTab) return;
    if (!activeTab.filePath) { await doSaveAs(); return; }
    await fetch(`${API}/save-md`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: activeTab.filePath, text: activeTab.text }) });
    setTabs(prev => prev.map(tab => tab.id === activeTabId ? { ...tab, unsaved: false } : tab));
  }

  async function doSaveAs() {
    if (!activeTab) return;
    const res = await fetch(`${API}/save-md-as`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: activeTab.text, fileName: activeTab.fileName, sourceFilePath: activeTab.filePath, title: t('ttlOsdSaveMd') }) });
    const data = await res.json();
    if (!data) return;
    setTabs(prev => {
      const oldPath = activeTab.filePath;
      const next = prev.map(tab => tab.id === activeTabId ? {
        ...tab, filePath: data.filePath, fileName: data.filePath.replace(/.*[\\/]/, ''), unsaved: false
      } : tab);
      if (oldPath && oldPath !== data.filePath && !next.some(tab => tab.filePath === oldPath)) {
        fetch(`${API}/unwatch-file`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filePath: oldPath }) }).catch(() => {});
      }
      fetch(`${API}/watch-file`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: data.filePath }) }).catch(() => {});
      return next;
    });
  }

  // Convert the active doc to another lightweight-markup format (writes via save dialog).
  async function convertTo(f) {
    const r = await fetch(`${API}/convert-format`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: activeTab.text, fromFormat: activeFormat.id, toFormat: f.id, fileName: activeTab.fileName, sourceFilePath: activeTab.filePath, title: t('ttlHdrConvertSave') }),
    });
    if (!r.ok) { const e = await r.json(); alert(e.error || 'Conversion failed'); }
  }

  // Export the active doc to a Pandoc/native format; native targets render the HTML,
  // everything else goes through the same markup conversion as convertTo.
  async function exportTo(f) {
    if (!NATIVE_EXPORT_FORMATS.some(n => n.id === f.id)) return convertTo(f);
    const html = await getExportHtmlFlattened();
    const css  = await getExportCss();
    const r = await fetch(`${API}/export-native`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html, css, format: f.id, fileName: activeTab.fileName, sourceFilePath: activeTab.filePath, title: t('ttlHdrConvertSave') }),
    });
    if (!r.ok) { const e = await r.json(); alert(e.error || 'Export failed'); }
  }

  function openNewTab() {
    const newTab = makeNewTab('', '', '', defaultFormat.id);
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }

  function openNewTabWithFormat(formatId) {
    const newTab = makeNewTab('', '', '', formatId);
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }

  function openFileInNewTab(filePath, text, displayName = '') {
    setTabs(prev => {
      const existing = prev.find(tab => tab.filePath === filePath);
      if (existing) {
        setActiveTabId(existing.id);
        if (existing.unsaved) {
          setPendingReloadData({ filePath, text, displayName });
          setTimeout(() => setConfirmReloadId(existing.id), 0);
          return prev;
        }
        if (existing.text === text) return prev;
        const view = cmViewRef.current;
        // ⚠ CLAUDE: use prevActiveTabIdRef (ref - fresh) not activeTabId (closure - stale
        // when called from the /file-changes poll effect, whose deps are []).
        if (view && existing.id === prevActiveTabIdRef.current) {
          suppressSyncRef.current = true;
          view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: text },
            selection: EditorSelection.cursor(0),
            effects: EditorView.scrollIntoView(0, { y: 'start' }),
          });
        }
        return prev.map(tab => tab.id === existing.id ? { ...tab, text } : tab);
      }
      const newTab = makeNewTab(filePath, text, displayName);
      setActiveTabId(newTab.id);
      if (filePath) {
        fetch(`${API}/watch-file`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filePath }) }).catch(() => {});
      }
      return [...prev, newTab];
    });
  }

  function doReload() {
    if (!confirmReloadId || !pendingReloadData) return;
    const { text } = pendingReloadData;
    setTabs(prev => prev.map(tab =>
      tab.id === confirmReloadId ? { ...tab, text, unsaved: false } : tab
    ));
    const view = cmViewRef.current;
    if (view && confirmReloadId === activeTabId) {
      suppressSyncRef.current = true;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: text },
        selection: EditorSelection.cursor(0),
        effects: EditorView.scrollIntoView(0, { y: 'start' }),
      });
    }
    setConfirmReloadId(null);
    setPendingReloadData(null);
  }

  function switchToTab(tabId) {
    setConfirmCloseId(null);
    setActiveTabId(tabId);
  }

  function requestCloseTab(tabId) {
    const tab = tabs.find(tab => tab.id === tabId);
    if (!tab) return;
    if (tab.unsaved) { setConfirmCloseId(tabId); }
    else { doForceClose(tabId); }
  }

  function doForceClose(tabId) {
    setConfirmCloseId(null);
    setTabs(prev => {
      const closing = prev.find(tab => tab.id === tabId);
      const remaining = prev.filter(tab => tab.id !== tabId);
      if (closing?.filePath && !remaining.some(tab => tab.filePath === closing.filePath)) {
        fetch(`${API}/unwatch-file`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filePath: closing.filePath }) }).catch(() => {});
      }
      if (remaining.length === 0) {
        setActiveTabId(null);
        return [];
      }
      if (activeTabId === tabId) {
        const closedIdx = prev.findIndex(tab => tab.id === tabId);
        const nextActive = remaining[Math.min(closedIdx, remaining.length - 1)];
        setActiveTabId(nextActive.id);
      }
      return remaining;
    });
  }

  async function doSaveAndClose(tabId) {
    const tab = tabs.find(tab => tab.id === tabId);
    if (!tab) return;
    if (tab.filePath) {
      await fetch(`${API}/save-md`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: tab.filePath, text: tab.text }) });
    } else {
      setActiveTabId(tabId);
      const res = await fetch(`${API}/save-md-as`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: tab.text, fileName: tab.fileName, sourceFilePath: tab.filePath, title: t('ttlOsdSaveMd') }) });
      const data = await res.json();
      if (!data) { setConfirmCloseId(null); return; } // user cancelled
    }
    doForceClose(tabId);
  }

  // ─── Settings modal ──────────────────────────────────────────

  function SettingsModal() {
    return (
      <div className="dl-backdrop"
        onMouseDown={e => { if (e.target === e.currentTarget) closeSettings(); }}>
        <div className="dlg" onKeyDown={e => {
          if (e.key === 'Escape') closeSettings();
          if (e.key !== 'Tab') return;
          const els = [...e.currentTarget.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled && el.offsetParent !== null);
          const first = els[0]; const last = els[els.length - 1];
          if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
          else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
        }}>
          {/* Header */}
          <div className="dlg-head">
            <span className="dlg-title"><Settings />{t('ttlDlgSettings')}</span>
            <button className="dl-close" ref={el => { if (el && !el.dataset.didFocus) { el.dataset.didFocus = '1'; el.focus(); } }}
              onClick={() => closeSettings()}>
              <X />
            </button>
          </div>
          {/* Tab bar */}
          <div className="tabs">
            {[{ key: 'display', label: t('tabDlgSettingsDisplay'), Icon: Sun }, { key: 'about', label: t('tabDlgSettingsAbout'), Icon: Info }].map(({ key, label, Icon }) => {
              const active = tabSettingsActive === key;
              return (
                <button key={key} className={`tab${active ? ' active' : ''}`} onClick={() => setTabSettingsActive(key)}>
                  <Icon />{label}
                </button>
              );
            })}
          </div>
          {/* Content - grid stacks all tabs in one cell, height = tallest tab, no yoyo */}
          <div className="dlg-body" style={{ display: 'grid' }}>
            {/* display tab */}
            <div style={{ gridArea: '1/1', visibility: tabSettingsActive === 'display' ? 'visible' : 'hidden', zIndex: tabSettingsActive === 'display' ? 1 : 0, background: 'var(--dlg-bgd)', transition: 'none' }}>
              {/* Language */}
              <div className="dlg-field">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayLang')}</label>
                <select className="select" value={lang} onChange={e => setLang(e.target.value)}>
                  {LANGUAGES.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
                </select>
              </div>
              {/* Theme */}
              <div className="dlg-field divider">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayTheme')}</label>
                <div className="opt-btns">
                  {[{ key: 'dark', Icon: Moon }, { key: 'light', Icon: Sun }].map(({ key: tk, Icon }) => {
                    const active = themeKey === tk;
                    return (
                      <button key={tk} className={`opt-btn${active ? ' active' : ''}`} onClick={() => setThemeKey(tk)}>
                        <Icon />
                        <span>{t(tk === 'dark' ? 'btnDlgSettingsDisplayThemeDark' : 'btnDlgSettingsDisplayThemeLight')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* about tab */}
            <div className="dlg-about" style={{ gridArea: '1/1', visibility: tabSettingsActive === 'about' ? 'visible' : 'hidden', zIndex: tabSettingsActive === 'about' ? 1 : 0, background: 'var(--dlg-bgd)', transition: 'none' }}>
              <img src={yaiolLogo} alt="Yaiol" style={{ width: 120, height: 'auto', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                <div className="dlg-about-desc">
                  {APP_NAME} <b>v{APP_VERSION}</b> by yaiol
                </div>
                <div className="dlg-about-id" style={{ color: 'var(--text-dim)' }}>{t('msgDlgSettingsAboutDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{buildCss(fontHeading, fontBody, fontCode, templateCss)}</style>
      <div className="app-root" style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative' }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(false); }}
        onDrop={e => { e.preventDefault(); setDragOver(false); }}>

        {/* ── Update banner ── */}
        <UpdateBanner info={updateInfo} appId={pkg.name} lang={lang} storagePrefix={STORAGE_PREFIX} t={t} onClose={() => setUpdateInfo(null)} />

        {/* ── Header bar ── */}
        <AppHeader appName={APP_NAME} appVersion={APP_VERSION}>

          {/* File actions — one welded group: New · Open · Save · Save As (standard file
              icons, CLAUDE-ui-standards). ⚠ The New-doc flyout lives OUTSIDE the .barh-grp, in this
              relative wrapper: a menu placed inside a .barh-grp inherits `.barh-grp > *` height:100% and
              gets clipped to the 30px bar (only its header shows). */}
          <div style={{ position: 'relative' }}>
            <div className="barh-grp">
              <button ref={newDocBtnRef} className="btn icon" title={t('tipHdrNew')} onClick={() => setShowNewDocMenu(v => !v)}>
                <FilePlus />
              </button>
              <button className="btn icon" title={t('tipHdrOpen')} onClick={doOpenFile}>
                <FolderOpen />
              </button>
              <button className="btn icon" title={t('tipHdrSave')} onClick={doSave} disabled={!activeTab?.unsaved}>
                <Save />
              </button>
              <button className="btn icon" title={t('tipHdrSaveAs')} onClick={doSaveAs} disabled={!activeTab}>
                <SavePlus />
              </button>
            </div>
            <Menu anchorRef={newDocBtnRef} open={showNewDocMenu} onClose={() => setShowNewDocMenu(false)} title={t('lblHdrNewDoc')}>
              {formats.map(fmt => (
                <MenuItem key={fmt.id} label={fmt.label} onClick={() => openNewTabWithFormat(fmt.id)} />
              ))}
            </Menu>
          </div>

          {/* Convert format — a standalone control (not a file-op), a lone .btn.icon with its
              flyout; the file icons are the welded group above. See CLAUDE-ui-standards. */}
          {activeTab && <div style={{ position: 'relative', overflow: 'visible' }}>
              <button ref={convertBtnRef} className="btn icon" title={t('tipHdrConvertFormat')}
                onClick={() => setShowConvertMenu(v => !v)}>
                <ArrowLeftRight />
              </button>
              <Menu anchorRef={convertBtnRef} open={showConvertMenu} onClose={() => setShowConvertMenu(false)} title={t('lblHdrConvertTo')}>
                <MenuLabel>Lightweight markup</MenuLabel>
                {formats.filter(f => f.id !== activeFormat.id).sort((a, b) => a.label.localeCompare(b.label)).map(f => (
                  <MenuItem key={f.id} label={f.label} onClick={() => convertTo(f)} />
                ))}
                <MenuDivider />
                {PANDOC_EXPORT_SECTIONS.map(({ section, formats: sectionFmts }) => (
                  <MenuItem key={section} label={section} submenu={
                    sectionFmts.map(f => <MenuItem key={f.id} label={f.label} onClick={() => exportTo(f)} />)
                  } />
                ))}
              </Menu>
          </div>}

          {/* Print / HTML / PDF / Native exports */}
          <div className="barh-grp" style={{ position: 'relative', overflow: 'visible' }}>
            <button className="btn icon" title={t('tipHdrPrint')} onClick={async () => {
              if (!html) return;
              fetch(`${API}/print`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ html: await getExportHtml(true), css: await getExportCss() }) });
            }}>
              <Printer />
            </button>
            <button className="btn icon" title={t('tipHdrSaveHtml')} onClick={async () => {
              if (!html) return;
              fetch(`${API}/save-html`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ html: await getExportHtml(), css: await getExportCss(), fileName: activeTab.fileName, sourceFilePath: activeTab.filePath, title: t('ttlHdrSaveHtml') }) });
            }}>
              <FileCode />
            </button>
            <button className="btn icon" title={t('tipHdrSavePdf')} onClick={async () => {
              if (!html) return;
              fetch(`${API}/save-pdf`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ html: await getExportHtml(true), css: await getExportCss(), fileName: activeTab.fileName, sourceFilePath: activeTab.filePath, title: t('ttlHdrSavePdf') }) });
            }}>
              <FileDown />
            </button>
          </div>

          {/* Zoom buttons */}
          <div className="barh-grp">
            <button className="btn icon" title={t('tipHdrZoomOut')} onClick={() => setFontSize(s => Math.max(10, s - 1))}>
              <span style={{ fontWeight: 400, fontSize: 11 }}>A</span>
            </button>
            <button className="btn icon" title={t('tipHdrZoomIn')} onClick={() => setFontSize(s => Math.min(28, s + 1))}>
              <span style={{ fontWeight: 700, fontSize: 17 }}>A</span>
            </button>
          </div>

          {/* Center view toggle: multiple (split) | single edit | single preview */}
          <div className="barh-grp">
            <button className={`btn icon${centerMode === 'split' ? ' active' : ''}`} title={t('tipHdrModeSplit')}
              onClick={() => setCenterMode('split')}>
              <Columns />
            </button>
            <button className={`btn icon${centerMode === 'single' && centerView === 'editor' ? ' active' : ''}`} title={t('tipHdrShowEditor')}
              onClick={() => { setCenterMode('single'); setCenterView('editor'); }}>
              <Edit />
            </button>
            <button className={`btn icon${centerMode === 'single' && centerView === 'render' ? ' active' : ''}`} title={t('tipHdrViewRender')}
              onClick={() => { setCenterMode('single'); setCenterView('render'); }}>
              <Eye />
            </button>
          </div>

          {/* Style template */}
          <select className="select" value={styleTemplateKey} onChange={e => setStyleTemplateKey(e.target.value)}
            title={t('tipHdrStyleTemplate')}>
            {STYLE_TEMPLATES.map(tpl => <option key={tpl.key} value={tpl.key}>{tpl.label}</option>)}
          </select>

          {/* Font selects - Heading / Body / Code */}
          <select className="select" value={fontKeyHeading} onChange={e => setFontKeyHeading(e.target.value)}
            title={t('tipHdrFontHeading')}>
            {FONT_CATALOG.heading.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
          </select>
          <select className="select" value={fontKeyBody} onChange={e => setFontKeyBody(e.target.value)}
            title={t('tipHdrFontBody')}>
            {FONT_CATALOG.body.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
          </select>
          <select className="select" value={fontKeyCode} onChange={e => setFontKeyCode(e.target.value)}
            title={t('tipHdrFontCode')}>
            {FONT_CATALOG.code.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
          </select>

          <span className="bar-spacer" />
          {/* Settings + Help — the standard group, pushed right (only group aligned right). */}
          <div className="barh-grp">
            <button className="btn icon" title="GitHub" onClick={() => window.open(GITHUB_URL, '_blank')}>
              <GithubIcon />
            </button>
            <button className="btn icon" title={t('tipHdrHelp')} onClick={() => window.open(HELP_URL.replace('/en/p/', `/${lang.replace(/_/g, '-')}/p/`), '_blank')}>
              <HelpCircle />
            </button>
            <button className="btn icon" title={t('tipHdrSettings')} onClick={() => setShowSettings(true)}>
              <Settings />
            </button>
          </div>

        </AppHeader>

        {/* ── Tab bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', flexShrink: 0,
          background: 'var(--bg-elev)', borderBottom: `1px solid var(--border)`,
          overflowX: 'auto', overflowY: 'hidden',
        }}>
          {tabs.map(tab => {
            const isActive = tab.id === activeTabId;
            const isConfirming = confirmCloseId === tab.id;
            const isConfirmingReload = confirmReloadId === tab.id;
            return (
              <div key={tab.id} onClick={() => switchToTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', flexShrink: 0,
                height: 30,                           // [GUI Standard: ctlHeight]
                padding: '0 6px 0 12px', cursor: 'pointer',
                background: isActive ? 'var(--bg)' : 'transparent',
                borderRight: `1px solid var(--border)`,
                borderBottom: isActive ? `2px solid var(--accent)` : '2px solid transparent',
                color: isActive ? 'var(--text)' : 'var(--text-mute)',
                fontSize: 13,                       // [GUI Standard: ctlFontSize]
                minWidth: 80, maxWidth: 200,
              }}>
                {!isConfirming && !isConfirmingReload && <>
                  {tab.unsaved && (
                    <span style={{ color: 'var(--accent)', marginRight: 4, fontSize: 10 }}>●</span>
                  )}
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tab.fileName}
                  </span>
                  {tab.formatId && tab.formatId !== 'markdown' && (
                    <span style={{ fontSize: 9, color: 'var(--text-mute)', background: 'var(--bg-elev)', border: `1px solid var(--border)`, borderRadius: 3, padding: '0 3px', flexShrink: 0, marginLeft: 2 }}>
                      {tab.formatId}
                    </span>
                  )}
                  <button className="btn icon small subtle" onClick={e => { e.stopPropagation(); requestCloseTab(tab.id); }}
                   >
                    <X />
                  </button>
                </>}
                {isConfirming && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: 'var(--text)', whiteSpace: 'nowrap' }}>{t('cfmDlgUnsavedMsg')}</span>
                    <button onClick={e => { e.stopPropagation(); doSaveAndClose(tab.id); }} className="btn primary">
                      {t('btnHdrSave')}
                    </button>
                    <button onClick={e => { e.stopPropagation(); doForceClose(tab.id); }} className="btn">
                      {t('btnDlgUnsavedDiscard')}
                    </button>
                    <button className="btn icon small subtle" onClick={e => { e.stopPropagation(); setConfirmCloseId(null); }}
                     >
                      <X />
                    </button>
                  </div>
                )}
                {isConfirmingReload && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: 'var(--text)', whiteSpace: 'nowrap' }}>{t('cfmDlgUnsavedReload')}</span>
                    <button onClick={e => { e.stopPropagation(); doReload(); }} className="btn primary">
                      {t('btnDlgUnsavedReload')}
                    </button>
                    <button className="btn icon small subtle" onClick={e => { e.stopPropagation(); setConfirmReloadId(null); setPendingReloadData(null); }}
                     >
                      <X />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Main content area = .app-main content region (Rule 14): TOC + editor/
              preview split. Tagged in place with flex-direction:row so .app-main's
              column default doesn't stack it; header + tab bar above are chrome. ── */}
        <div className="app-main" style={{ flex: 1, display: 'flex', overflow: 'hidden', flexDirection: 'row' }}>

          {/* TOC panel (LEFT, toggleable) */}
          {showToc && activeFormat.supportsToc && tocItems.length > 0 && (
            <div className="pnl" style={{ width: tocWidth, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderBottom: `1px solid var(--border)`, flexShrink: 0 }}>
                <span className="hint" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t('tipHdrToc')}</span>
                {[2, 3, 4].map(lvl => {
                  const active = tocMaxLevel === lvl;
                  return (
                    <button key={lvl}
                      onClick={() => setTocMaxLevel(v => v === lvl ? null : lvl)}
                      title={t('tipHdrTocLevel').replace('{n}', lvl)}
                      className={`btn icon small${active ? ' primary' : ''}`}>
                      {lvl}
                    </button>
                  );
                })}
              </div>
              <div className="lv-scroll" style={{ padding: '6px 0' }}>
                {visibleTocItems().map((item) => {
                  const tocColor = item.level === 1 ? 'var(--text)' : item.level === 2 ? 'var(--text-dim)' : 'var(--text-mute)';
                  const tocWeight = item.level === 1 ? 700 : 400;
                  const collapsed = tocCollapsed.has(item.id);
                  return (
                    <div key={item.id} className="lv-item" onClick={() => scrollToHeading(item.id)}
                      style={{ paddingLeft: 10 + (item.level - 1) * 12 }}>
                      {item.hasChildren ? (
                        <button
                          onClick={e => { e.stopPropagation(); toggleTocCollapse(item.id); }}
                          title={t(collapsed ? 'tipHdrTocExpand' : 'tipHdrTocCollapse')}
                          className="lv-item-icon"
                          style={{ justifyContent: 'center', color: 'var(--text-mute)' }}>
                          {collapsed ? <ChevronRight /> : <ChevronDown />}
                        </button>
                      ) : (
                        <span className="lv-item-icon" style={{ width: 16 }} />
                      )}
                      <span className="lv-item-name" style={{ color: tocColor, fontWeight: tocWeight }}>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TOC splitter */}
          {showToc && activeFormat.supportsToc && tocItems.length > 0 && (
            <Splitter theme={themeKey} onResizeStart={startTocResize} />
          )}

          {/* TOC toggle button */}
          {activeFormat.supportsToc && tocItems.length > 0 && (
            <CollapseToggle open={showToc} onToggle={() => setShowToc(v => !v)} side="left" title={t('tipHdrToc')} />
          )}

          {/* Center view - force single when no document is open */}
          {(() => { const eMode = activeTab ? centerMode : 'single'; return (
          <div ref={centerRef} style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

            {/* Editor panel - always in DOM so CM keeps its instance */}
            <div style={{
              ...(eMode === 'split' ? { flex: splitRatio, minWidth: 200 } : { flex: 1 }),
              display: eMode === 'split'
                ? 'flex'
                : (activeTab && centerView === 'editor' ? 'flex' : 'none'),
              flexDirection: 'column',
              borderRight: eMode === 'split' ? `1px solid var(--border)` : 'none',
            }}>
              {/* Editor toolbar */}
              {(() => {
                const s   = activeFormat.shortcuts || {};
                const dis = !activeTab;
                const run = (fn) => { const v = cmViewRef.current; if (!v) return; v.focus(); fn(v); };
                const btn = (icon, title, onClick, disabled = false) => (
                  <button title={title} disabled={dis || disabled} onClick={onClick} className="btn icon">{icon}</button>
                );
                const fmtAlign = FORMAT_ALIGN[activeFormat.id];
                return (
                  <div className="barf" style={{ padding: '6px 10px', background: 'var(--pnl-bgd)', borderBottom: `1px solid var(--border)`, flexShrink: 0 }}>
                    {btn(<Bold />,         t('tipEditorBold'),           () => run(v => toggleInlineFormat(v, s.bold)))}
                    {btn(<Italic />,       t('tipEditorItalic'),         () => run(v => toggleInlineFormat(v, s.italic)))}
                    {btn(<Strikethrough />, t('tipEditorStrikethrough'), () => run(v => toggleInlineFormat(v, s.strikethrough)), !s.strikethrough)}
                    {btn(<Heading />,      t('tipEditorHeading'),        () => run(v => cycleHeading(v, s.headings)))}
                    {btn(<List />,         t('tipEditorBulletList'),     () => run(v => toggleLinePrefix(v, s.bulletList)))}
                    {btn(<ListOrdered />,  t('tipEditorNumberedList'),   () => run(v => toggleLinePrefix(v, s.numberedList, s.numberedList === '1. ' ? /^\d+\.\s/ : null)))}
                    {btn(<Quote />,        t('tipEditorBlockquote'),     () => run(v => toggleLinePrefix(v, s.blockquote)))}
                    {btn(<Code />,         t('tipEditorInlineCode'),     () => run(v => toggleInlineFormat(v, s.inlineCode)))}
                    {btn(<Code2 />,        t('tipEditorCodeBlock'),      () => run(v => s.codeBlock && toggleCodeBlock(v, s.codeBlock.open, s.codeBlock.close)))}
                    {btn(<Link />,         t('tipEditorLinkImage'),      () => run(v => openLinkPopupRef.current?.(v)))}
                    {btn(<Minus />,        t('tipEditorHorizontalRule'), () => run(v => s.horizontalRule && insertLine(v, s.horizontalRule)))}
                    {fmtAlign && btn(<AlignLeft />,   t('tipEditorAlignLeft'),   () => run(v => applyAlign(v, fmtAlign.left)),   !fmtAlign.left)}
                    {fmtAlign && btn(<AlignCenter />, t('tipEditorAlignCenter'), () => run(v => applyAlign(v, fmtAlign.center)), !fmtAlign.center)}
                    {fmtAlign && btn(<AlignRight />,  t('tipEditorAlignRight'),  () => run(v => applyAlign(v, fmtAlign.right)),  !fmtAlign.right)}
                  </div>
                );
              })()}

              <div ref={editorContainerRef}
                style={{ flex: 1, overflow: 'hidden', background: 'var(--bg-input)', color: 'var(--text)' }} />
            </div>

            {/* Split-mode splitter */}
            {eMode === 'split' && (
              <Splitter theme={themeKey} onResizeStart={startEditorResize} />
            )}

            {/* Preview panel - always in DOM; hidden in single+editor mode */}
            <div style={{
              flex: eMode === 'split' ? 1 - splitRatio : 1,
              minWidth: eMode === 'split' ? 200 : 0,
              display: eMode === 'split' || centerView === 'render' ? 'flex' : 'none',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}>
            {/* Find bar - floats above content, does not scroll */}
            {findOpen && (
              <div style={{ position: 'absolute', top: 10, right: 14, zIndex: 200, display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', background: 'var(--pnl-bgd)', border: `1px solid var(--border-strong)`, borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.18)', minWidth: 280 }}>
                <div className="search" style={{ flex: 1, minWidth: 0 }}>
                  <span className="search-glyph"><Search /></span>
                  <input ref={findInputRef} className="search-input" value={findQuery}
                    onChange={e => { setFindQuery(e.target.value); applyFind(e.target.value, 0); }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.shiftKey ? navigateFind(-1) : navigateFind(1); } if (e.key === 'Escape') closeFind(); }}
                    placeholder={t('plhPreviewFind')} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap', minWidth: 52, textAlign: 'right' }}>
                  {findQuery ? (findCount > 0 ? `${findIndex + 1} / ${findCount}` : t('lblPreviewNoResults')) : ''}
                </span>
                <button className="btn icon" onClick={() => navigateFind(-1)} title={t('tipPreviewFindPrev')}><ChevronUp /></button>
                <button className="btn icon" onClick={() => navigateFind(1)}  title={t('tipPreviewFindNext')}><ChevronDown /></button>
                <button className="search-clear" onClick={closeFind} title={t('tipPreviewFindClose')}><X className="icon-inline" /></button>
              </div>
            )}
            <div ref={previewRef} style={{
              flex: 1,
              overflowY: 'auto',
              padding: '32px 48px',
              position: 'relative',
            }}
              onMouseOver={e => {
                const target = e.target.closest('[data-mzn-lang]');
                if (!target) return;
                clearTimeout(stylePanelLeaveTimer.current);
                const lang = target.dataset.mznLang;
                if (EXT_STYLE_INCOMPATIBLE.has(lang)) return;
                const nth = parseInt(target.dataset.mznNth, 10);
                const hint = target.previousElementSibling;
                const currentStyle = (hint?.classList.contains('mzn-style-hint'))
                  ? (() => { try { return JSON.parse(decodeURIComponent(hint.dataset.mznStyle || '{}')); } catch { return {}; } })()
                  : {};
                const rect = target.getBoundingClientRect();
                const pRect = previewRef.current.getBoundingClientRect();
                setStylePanel({ lang, nth, top: rect.top - pRect.top + previewRef.current.scrollTop, currentStyle, wInput: currentStyle.width || '', hInput: currentStyle.height || '' });
              }}
              onMouseLeave={() => {
                stylePanelLeaveTimer.current = setTimeout(() => setStylePanel(null), 400);
              }}
            >
              {html ? (
                <div
                  className="md-body"
                  style={{ maxWidth: 860, margin: '0 auto', fontSize }}
                  ref={mdBodyRef}
                  onClick={handlePreviewClick}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-mute)', fontSize: 15 }}>
                  {t('empAppNoFile')}
                </div>
              )}
              {stylePanel && (() => {
                // Shared control styles — every single-line control at the control height (30).
                // One width/height row — dim is 'width' | 'height', inputKey the matching state field.
                const dimRow = (dim, label, inputKey) => {
                  const inputVal = stylePanel[inputKey];
                  const commit = () => {
                    const newStyle = { ...stylePanel.currentStyle };
                    if (inputVal) newStyle[dim] = inputVal; else delete newStyle[dim];
                    applyStyleToSource(stylePanel.lang, stylePanel.nth, newStyle);
                  };
                  return (
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-mute)', width: 32 }}>{label}</span>
                      <NumberField allowEmpty placeholder={t('plhImagePropsPx')} value={inputVal} width={56}
                        className={stylePanel.currentStyle[dim] ? 'is-active' : ''}
                        onChange={v => setStylePanel(p => ({ ...p, [inputKey]: v }))}
                        onKeyDown={e => { if (e.key === 'Enter') commit(); }} />
                      <button className="btn icon" title={t('tipImagePropsApply')} onClick={commit}><Check /></button>
                      {stylePanel.currentStyle[dim] && (
                        <button className="btn icon subtle" title={t('tipImagePropsClear')} onClick={() => { const newStyle = { ...stylePanel.currentStyle }; delete newStyle[dim]; applyStyleToSource(stylePanel.lang, stylePanel.nth, newStyle); }}><X /></button>
                      )}
                    </div>
                  );
                };
                return (
                <div
                  onMouseEnter={() => clearTimeout(stylePanelLeaveTimer.current)}
                  onMouseLeave={() => { stylePanelLeaveTimer.current = setTimeout(() => setStylePanel(null), 400); }}
                  style={{
                    position: 'absolute',
                    top: stylePanel.top + 4,
                    right: 52,
                    zIndex: 100,
                    background: 'var(--pnl-bgd)',
                    border: `1px solid var(--border)`,
                    borderRadius: 8,
                    padding: '8px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    fontSize: 12,
                    color: 'var(--text-dim)',
                    minWidth: 160,
                  }}>
                  {/* Align row */}
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-mute)', marginRight: 2 }}>{t('lblImagePropsAlign')}</span>
                    {['left','center','right'].map(a => (
                      <button className="btn icon primary" key={a} title={a}
                        onClick={() => {
                          const newStyle = { ...stylePanel.currentStyle };
                          if (newStyle.align === a) delete newStyle.align; else newStyle.align = a;
                          applyStyleToSource(stylePanel.lang, stylePanel.nth, newStyle);
                        }}
                       >
                        {a === 'left' ? '⬅' : a === 'center' ? '↔' : '➡'}
                      </button>
                    ))}
                  </div>
                  {/* Width / Height rows - only for extensions that support each */}
                  {EXT_SUPPORTS_WIDTH.has(stylePanel.lang)  && dimRow('width',  t('lblImagePropsWidth'),  'wInput')}
                  {EXT_SUPPORTS_HEIGHT.has(stylePanel.lang) && dimRow('height', t('lblImagePropsHeight'), 'hInput')}
                  {/* Remove all */}
                  <button className="btn" onClick={() => applyStyleToSource(stylePanel.lang, stylePanel.nth, {})}
                    style={{ marginTop: 2 }}>
                    {t('btnImagePropsRemoveStyle')}
                  </button>
                </div>
                );
              })()}
            </div>
            </div>{/* end preview wrapper */}

          </div>
          ); })()}

        </div>


        {dragOver && (
          <div
            onDrop={e => {
              e.preventDefault();
              e.stopPropagation();
              setDragOver(false);
              Array.from(e.dataTransfer.files).forEach(file => {
                const name = file.name.toLowerCase();
                const allExts = formats.flatMap(f => f.fileExtensions);
                if (!allExts.some(ext => name.endsWith(ext))) return;
                const reader = new FileReader();
                reader.onload = ev => { openFileInNewTab(window.electronAPI?.getFilePath(file) || '', ev.target.result, file.name); };
                reader.readAsText(file);
              });
            }}
            onDragOver={e => e.preventDefault()}
            style={{ position: 'fixed', inset: 0, background: 'var(--accent)' + '22', border: `3px dashed var(--accent)`, borderRadius: 8, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>{t('empAppDropFile')}</span>
          </div>
        )}

      </div>

      {showSettings && SettingsModal()}

      {linkPopup && (() => {
        const confirmLink = (text, url, mode, useRelative) => {
          const u = url.trim();
          if (u) {
            let finalUrl = u;
            if (mode === 'image' && useRelative && activeTab?.filePath && !u.startsWith('http')) {
              const docDir = activeTab.filePath.replace(/\\/g, '/').split('/').slice(0, -1).join('/');
              const imgParts = u.replace(/\\/g, '/').split('/').filter(Boolean);
              const docParts = docDir.split('/').filter(Boolean);
              let common = 0;
              while (common < docParts.length && common < imgParts.length && docParts[common] === imgParts[common]) common++;
              finalUrl = imgParts.slice(common).join('/') || u;
            }
            const s = activeFormat.shortcuts;
            const builder = mode === 'image' ? s.image : s.link;
            const insert = builder(text.trim() || (mode === 'image' ? 'image' : finalUrl), finalUrl);
            cmViewRef.current?.dispatch({
              changes: { from: linkPopup.from, to: linkPopup.to, insert },
              selection: EditorSelection.cursor(linkPopup.from + insert.length),
              scrollIntoView: true, userEvent: 'input',
            });
          }
          setLinkPopup(null);
          cmViewRef.current?.focus();
        };
        return (
          <LinkPopup
            x={linkPopup.x} y={linkPopup.y}
            initialText={linkPopup.text}
            apiBase={API}
            docFilePath={activeTab?.filePath || ''}
            onConfirm={confirmLink}
            onCancel={() => { setLinkPopup(null); cmViewRef.current?.focus(); }}
            langKey={lang}
          />
        );
      })()}
    </>
  );
}

// Returns true only when imgPath is in the same folder or a subfolder of docFilePath's directory.
// Paths going up (requiring ../) are not considered relative-safe per project convention.
function canRelativize(imgPath, docFilePath) {
  if (!docFilePath || !imgPath || imgPath.startsWith('http') || imgPath.startsWith('data:')) return false;
  const docParts = docFilePath.replace(/\\/g, '/').split('/').slice(0, -1).filter(Boolean);
  const imgParts = imgPath.replace(/\\/g, '/').split('/').filter(Boolean);
  if (!docParts.length || docParts[0] !== imgParts[0]) return false; // different drive or no doc path
  let common = 0;
  while (common < docParts.length && common < imgParts.length && docParts[common] === imgParts[common]) common++;
  return docParts.length === common; // image is at or below the doc's directory
}

function LinkPopup({ x, y, initialText, apiBase, docFilePath, onConfirm, onCancel, langKey }) {
  const t = useT(langKey);
  const [mode, setMode]       = React.useState('link');
  const [text, setText]       = React.useState(initialText);
  const [url,  setUrl]        = React.useState('');
  const [relative, setRelative] = React.useState(false);
  const urlRef  = React.useRef(null);
  const textRef = React.useRef(null);

  React.useEffect(() => {
    (initialText ? urlRef : textRef).current?.focus();
  }, [initialText]);

  const updateUrl = (val) => {
    setUrl(val);
    setRelative(canRelativize(val, docFilePath));
  };

  const handleKey = (e) => {
    if (e.key === 'Enter')  { e.preventDefault(); onConfirm(text, url, mode, relative); }
    if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
  };

  const browse = async () => {
    const res  = await fetch(`${apiBase}/open-image`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    const data = await res.json();
    if (data?.filePath) { updateUrl(data.filePath); urlRef.current?.focus(); }
  };

  const relPossible = mode === 'image' && canRelativize(url, docFilePath);

  const popupW = 300;
  const left   = Math.min(x, window.innerWidth - popupW - 16);
  const inputStyle = {
    flex: 1, height: 30, boxSizing: 'border-box',     // [GUI Standard: ctlHeight]
    background: 'var(--bg)', border: `1px solid var(--border-strong)`, borderRadius: 5,
    padding: '0 8px', fontSize: 13, color: 'var(--text)', outline: 'none', fontFamily: 'inherit',
  };
  const tabStyle = (active) => ({
    flex: 1, height: 30, boxSizing: 'border-box',     // [GUI Standard: ctlHeight]
    padding: '0', fontSize: 12, fontWeight: active ? 600 : 400, cursor: 'pointer',
    border: 'none', borderRadius: 4, background: active ? 'var(--accent)' : 'transparent',
    color: active ? '#fff' : 'var(--text-dim)',
  });
  // Single-line action buttons (browse / cancel / insert) — all at the control height.
  const btnStyle = (extra) => ({
    height: 30, boxSizing: 'border-box',             // [GUI Standard: ctlHeight]
    padding: '0 10px', fontSize: 12, borderRadius: 5, cursor: 'pointer',
    border: `1px solid var(--border-strong)`, background: 'transparent', color: 'var(--text)',
    ...extra,
  });

  return (
    <div onKeyDown={handleKey} style={{
      position: 'fixed', top: y + 6, left, width: popupW,
      background: 'var(--bg-elev)', border: `1px solid var(--border)`,
      borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      padding: '10px 12px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg)', borderRadius: 5, padding: 2 }}>
        <button style={tabStyle(mode === 'link')}  onClick={() => setMode('link')}>{t('btnDlgLinkLink')}</button>
        <button style={tabStyle(mode === 'image')} onClick={() => setMode('image')}>{t('btnDlgLinkImage')}</button>
      </div>
      <input ref={textRef} value={text} onChange={e => setText(e.target.value)}
        placeholder={mode === 'image' ? t('plhDlgLinkAltText') : t('plhDlgLinkText')} style={inputStyle} />
      <div style={{ display: 'flex', gap: 6 }}>
        <input ref={urlRef} value={url} onChange={e => updateUrl(e.target.value)}
          placeholder={mode === 'image' ? t('plhDlgLinkUrlOrPath') : t('plhDlgLinkUrl')} style={inputStyle} />
        {mode === 'image' && (
          <button onClick={browse} style={btnStyle({ whiteSpace: 'nowrap' })}>{t('btnDlgLinkBrowse')}</button>
        )}
      </div>
      {mode === 'image' && (
        <label title={!relPossible ? t('tipDlgLinkImageFolder') : ''}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
                   color: relPossible ? 'var(--text)' : 'var(--text-mute)', cursor: relPossible ? 'pointer' : 'default', userSelect: 'none' }}>
          <input type="checkbox" className="check-box" checked={relative} disabled={!relPossible}
            onChange={e => setRelative(e.target.checked)} style={{ cursor: relPossible ? 'pointer' : 'default' }} />
          {t('lblDlgLinkRelativePath')}
        </label>
      )}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={btnStyle({ color: 'var(--text-dim)' })}>{t('btnGlobalCancel')}</button>
        <button onClick={() => onConfirm(text, url, mode, relative)}
          style={btnStyle({ border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600 })}>{t('btnDlgLinkInsert')}</button>
      </div>
    </div>
  );
}
