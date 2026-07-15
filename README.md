# Markzen

Read seven markup languages, render 30 live extensions, and export to 20+ formats - ebooks, slides, Word, LaTeX and more. Write it once, hand it off as anything.

---

## What it is

Markzen is a cross-platform desktop editor for lightweight markup. You write in Markdown (or AsciiDoc, reStructuredText, Org, Textile, Djot, MediaWiki), see a styled preview update live as you type, and export the result to any of 20+ document formats through a bundled Pandoc - without leaving the app.

It is equally a **viewer**: open a `.md` file from the toolbar or by double-clicking it in Explorer, collapse the editor pane, and read it as a rendered document.

---

## Features

- **Reads seven markup languages** - Markdown, AsciiDoc, reStructuredText, Org, Textile, Djot, or MediaWiki, each rendered live with no conversion step.
- **30 rendering extensions** - turn fenced code blocks into live diagrams, charts, math formulas, music scores, chess boards, and QR codes.
- **Exports to 20+ formats** - ebook, Word or OpenDocument, PowerPoint or reveal.js deck, LaTeX or Typst, a Jupyter notebook, and more - or convert straight to another markup language.
- **A real editor, with live preview** - a full CodeMirror editor (syntax highlighting, formatting shortcuts, search) with the styled result updating side by side as you type.
- **Typeset typography** - separate fonts for headings, body, and code plus five style templates make documents read like print.
- **Automatic table of contents** - built from your headings, always in sync; click any entry to jump to that section.

---

## Download

Pre-built installers are available on the [Releases](../../releases) page (Windows `.exe`, macOS `.dmg`, Linux `.AppImage`).

> **Windows note:** SmartScreen may warn on first launch because the app is not code-signed. Click "More info", then "Run anyway".

---

## Build from source

```bash
npm install
npm run electron:dev   # React + Electron together (dev)
```

Requires Node.js 20+.

```bash
npm run dist        # Windows x64 installer
npm run dist:mac    # macOS DMG
npm run dist:linux  # Linux AppImage
```

Document export (DOCX/PDF/HTML) uses **pandoc**, which is not committed to the repo. The `dist`
commands download it automatically (into `vendor/pandoc/`) before packaging. To test export in
**dev mode**, fetch it once with `npm run ci:prepare`.

---

## Overview
Markzen is an Electron app: a React renderer (built with Vite) over an Electron main process that also runs a small local Express server for file and export operations. There is no database - the renderer talks to the main process over local HTTP, and UI state persists in `localStorage`. The only preload exposure is a single `webUtils.getPathForFile` helper used to resolve dropped files; there is no IPC bridge.

### Format adapters

The renderer is built around a **format registry** (`src/formats/index.js`). Each of the seven markup languages is an adapter - `markdown`, `asciidoc`, `rst`, `org`, `textile`, `djot`, `mediawiki` - exposing a uniform interface (file extensions, editor shortcuts, a `toHtml(text)` pass, and an async `postRender(el)` pass). The active format is chosen by the open file's extension, or manually. Markdown is the default and fallback.

Rendering is two-phase: each adapter first converts source text to HTML (Markdown goes through `showdown`; the other formats through their own libraries, e.g. `asciidoctor`), then runs each registered extension's DOM render pass over the mounted preview.

### Rendering extensions

The 30 extensions (`src/formats/extensions/`) turn a fenced code block - tagged with a language id after the triple backticks - into a live diagram, chart, score, math formula, or widget. They cover diagrams (Mermaid, Graphviz, Cytoscape, PlantUML, …), charts (Chart.js, Vega-Lite, ECharts, Plotly, …), math (KaTeX, AsciiMath), music notation (ABC, VexFlow, MusicXML, ChordPro), and more (chess, Go boards, QR codes, SMILES). Each extension is a small module with an HTML-injection step and a DOM render step, wired into the adapter's render chain.

### Export pipeline

Export and format conversion run in the Electron main process through a **bundled Pandoc binary** (`vendor/pandoc/`, flattened into the packaged app's resources). The renderer renders the document to HTML, then posts it to a local endpoint that shells out to Pandoc to produce the target format. Two surfaces use this: *native export* (EPUB, Word, OpenDocument, PowerPoint, RTF) and the broader *format conversion* (LaTeX, Typst, reveal.js, DocBook, JATS, Jupyter, OPML, and the rest). PDF, HTML, and print are produced directly from the rendered preview (`/save-pdf`, `/save-html`, `/print`).

### Tech stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 |
| Bundler | Vite 8 |
| Editor | CodeMirror 6 |
| Desktop shell | Electron 41 |
| Local API | Express 5 |
| Markdown rendering | showdown |
| AsciiDoc rendering | asciidoctor |
| Math | KaTeX |
| Diagrams / charts / scores | Mermaid, Chart.js, VexFlow, … (30 extensions) |
| Document export | bundled Pandoc |
| Packaging | Electron Builder |

---

## License / links
Markzen is part of [yaiol Applications](https://apps.yaiol.com).

Released under the [MIT License](LICENSE).
