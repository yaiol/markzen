# Changelog

## 1.0.6 — 2026-08-07

- Open, edit, preview and export **BBCode** (`.bbcode`) — the eighth markup format, with its own file icon and file association. Pandoc can write BBCode but cannot read it, so exporting uses its `bbcode_hubzilla` dialect (the only one that keeps real headings, tables, rules and images) while reading uses Markzen's own parser, deliberately tolerant of the many forum dialects
- Insert a table from the editor toolbar: pick the size on a hover grid and Markzen writes it in whatever markup is open — Markdown, AsciiDoc, reStructuredText, Org, Textile, Djot, MediaWiki or BBCode
- Fix the submenus of the Convert menu (Ebooks, Word Processor, Presentation, …) being impossible to open: the flyout was drawn inside the menu's own scroll box, which clipped it out of sight as soon as the menu was long enough to scroll
- Fix menus being capped at a fixed 320 px and scrolling even with plenty of window left — a dropdown now uses the height actually available on screen
- Fix several submenus staying on screen at once when moving down a menu, each lingering until its own timer expired
- Add a shared hover-grid table-size picker to the UI catalog, and run the toolbar's table insert and the tab-separated-paste table through one shared insertion path

## 1.0.5 — 2026-08-03

- Fix CLI exports leaving an orphan temp folder behind on every run: each run now sweeps the leftover folders of runs that have exited, instead of trying to delete its own cache on the way out (which can never work on Windows while Chromium still holds it open)

## 1.0.4 — 2026-07-24

- Insert an image as embedded or linked: embedded images are stored inside the document as base64 data, so the file is self-contained; linked images just point at a path or URL
- Fold long embedded (base64 `data:`) images into a compact chip in the editor so they no longer drown the surrounding text
- Re-edit an existing link or image in place — put the caret on it and press Ctrl+K (or the toolbar button) to load its text and URL instead of nesting a new one
- Split the editor toolbar's combined link/image control into separate Link and Image buttons
- Add a shared radio control to the UI catalog and move the link/image popup onto the shared input/button styling

## 1.0.3 — 2026-07-23

- Batch CLI exports: pass several `source -o output` pairs in one call — a single app launch renders them all, cutting per-document time from ~15 s to ~2 s

## 1.0.2 — 2026-07-21

- Fix AsciiDoc code blocks containing literal math delimiters being mangled by the KaTeX renderer

## 1.0.1 — 2026-07-19

- Restore each tab's editor scroll position and text selection when switching between open files
- Keep a live preview pane per tab — scroll position, images and rendered diagrams survive tab switches, and switching back is instant
- Fix TOC clicks needing two clicks to move the editor to the chapter
- Scope TOC and in-page anchor navigation to the active tab's preview

## 1.0.0 — 2026-07-15

- Initial release
