# Changelog

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
