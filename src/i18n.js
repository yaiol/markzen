// ⚠ CLAUDE PRE-COMMIT GUARD - STOP before editing this file.
//   It holds every UI string, in every language. Do NOT hand-edit it: no empty
//   {} blocks, no copying values from another app, no pasting translations, no
//   "I'll fill the others later" - all of those are bugs. The only correct path
//   is the i18n key workflow: add keys in EN, then translate, sort and audit
//   across every language. Full procedure and exact commands: see CLAUDE-i18n.md.
// ██████████████████████████████████████████████████████████████████████████████
// ██                                                                        ██
// ██  TRANSLATION RULES - no exceptions:                                    ██
// ██    - NEVER copy an English value into a non-English language block.     ██
// ██    - Every language MUST have its OWN translation of every key.         ██
// ██    - Using replace_all to stamp English across all blocks is FORBIDDEN. ██
// ██    - Translate each language individually. There is no shortcut.        ██
// ██                                                                        ██
// ██████████████████████████████████████████████████████████████████████████████

import { useMemo } from 'react';

const TRANSLATIONS = {
  en: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "New version available:",
    lnkUpdateWhatsNew:                      "What's new",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Skip this version",
    tipUpdateDismiss:                       "Dismiss",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Open or drop a Markdown file here to view/edit it.",
    empAppDropFile:                         "Drop a Markdown file here",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Open Markdown File",
    ttlOsdSaveMd:                           "Save Markdown File",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "New document",
    tipHdrOpen:                             "Open a Markdown file",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Save",
    tipHdrSave:                             "Save",
    tipHdrSaveAs:                           "Save As",
    tipHdrConvertFormat:                    "Convert to another format",
    lblHdrConvertTo:                        "Convert to",
    ttlHdrConvertSave:                      "Save Converted Document",
    tipHdrPrint:                            "Print",
    tipHdrSaveHtml:                         "Save as HTML",
    ttlHdrSaveHtml:                         "Save as HTML",
    tipHdrSavePdf:                          "Save as PDF",
    ttlHdrSavePdf:                          "Save as PDF",
    tipHdrZoomOut:                          "Decrease font size",
    tipHdrZoomIn:                           "Increase font size",
    tipHdrModeSplit:                        "Split view",
    tipHdrShowEditor:                       "Show editor",
    tipHdrViewRender:                       "Show preview",
    tipHdrToc:                              "Table of Contents",
    tipHdrTocLevel:                         "Limit to level {n}",
    tipHdrTocCollapse:                      "Collapse",
    tipHdrTocExpand:                        "Expand",
    tipHdrStyleTemplate:                    "Choose a Markdown preview style",
    tipHdrFontHeading:                      "Header",
    tipHdrFontBody:                         "Body",
    tipHdrFontCode:                         "Code",
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Help",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edit and preview Markdown files.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Unsaved changes -",
    btnDlgUnsavedDiscard:                   "Discard",
    cfmDlgUnsavedReload:                    "Reload? Changes will be lost",
    btnDlgUnsavedReload:                    "Reload",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

    // ⚠ CLAUDE: do NOT add keys here - every key must belong to an existing Prefix block above. If no block fits, ask the user.
  },

  fr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nouvelle version disponible :",
    lnkUpdateWhatsNew:                      "Nouveautés",
    btnUpdateDownload:                      "Télécharger",
    lnkUpdateSkip:                          "Ignorer cette version",
    tipUpdateDismiss:                       "Ignorer",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Ouvrez ou déposez un fichier Markdown ici pour l'afficher/modifier.",
    empAppDropFile:                         "Déposez un fichier Markdown ici",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Ouvrir un fichier Markdown",
    ttlOsdSaveMd:                           "Enregistrer le fichier Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nouveau document",
    tipHdrOpen:                             "Ouvrir un fichier Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Enregistrer",
    tipHdrSave:                             "Enregistrer",
    tipHdrSaveAs:                           "Enregistrer sous",
    tipHdrConvertFormat:                    "Convertir vers un autre format",
    lblHdrConvertTo:                        "Convertir en",
    ttlHdrConvertSave:                      "Enregistrer le document converti",
    tipHdrPrint:                            "Imprimer",
    tipHdrSaveHtml:                         "Enregistrer en HTML",
    ttlHdrSaveHtml:                         "Enregistrer en HTML",
    tipHdrSavePdf:                          "Enregistrer en PDF",
    ttlHdrSavePdf:                          "Enregistrer en PDF",
    tipHdrZoomOut:                          "Réduire le texte",
    tipHdrZoomIn:                           "Agrandir le texte",
    tipHdrModeSplit:                        "Vue partagée",
    tipHdrShowEditor:                       "Afficher l'éditeur",
    tipHdrViewRender:                       "Afficher l'aperçu",
    tipHdrToc:                              "Table des matières",
    tipHdrTocLevel:                         "Limiter au niveau {n}",
    tipHdrTocCollapse:                      "Réduire",
    tipHdrTocExpand:                        "Développer",
    tipHdrStyleTemplate:                    "Choisir un style de prévisualisation Markdown",
    tipHdrFontHeading:                      "Titre",
    tipHdrFontBody:                         "Corps",
    tipHdrFontCode:                         "Code",
    tipHdrSettings:                         "Ouvrir les paramètres",
    tipHdrHelp:                             "Aide",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Paramètres",
    tabDlgSettingsDisplay:                  "Affichage",
    tabDlgSettingsAbout:                    "À propos",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Langue",
    lblDlgSettingsDisplayTheme:             "Thème",
    btnDlgSettingsDisplayThemeDark:         "Sombre",
    btnDlgSettingsDisplayThemeLight:        "Clair",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "modifiez et prévisualisez des fichiers Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Modifications non enregistrées -",
    btnDlgUnsavedDiscard:                   "Ignorer",
    cfmDlgUnsavedReload:                    "Recharger ? Les modifications seront perdues",
    btnDlgUnsavedReload:                    "Recharger",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  de: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Neue Version verfügbar:",
    lnkUpdateWhatsNew:                      "Was ist neu",
    btnUpdateDownload:                      "Herunterladen",
    lnkUpdateSkip:                          "Diese Version überspringen",
    tipUpdateDismiss:                       "Schließen",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Öffne oder lege eine Markdown-Datei hier ab, um sie anzuzeigen/bearbeiten.",
    empAppDropFile:                         "Markdown-Datei hier ablegen",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown-Datei öffnen",
    ttlOsdSaveMd:                           "Markdown-Datei speichern",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Neues Dokument",
    tipHdrOpen:                             "Markdown-Datei öffnen",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Speichern",
    tipHdrSave:                             "Speichern",
    tipHdrSaveAs:                           "Speichern unter",
    tipHdrConvertFormat:                    "In ein anderes Format konvertieren",
    lblHdrConvertTo:                        "Konvertieren in",
    ttlHdrConvertSave:                      "Konvertiertes Dokument speichern",
    tipHdrPrint:                            "Drucken",
    tipHdrSaveHtml:                         "Als HTML speichern",
    ttlHdrSaveHtml:                         "Als HTML speichern",
    tipHdrSavePdf:                          "Als PDF speichern",
    ttlHdrSavePdf:                          "Als PDF speichern",
    tipHdrZoomOut:                          "Text verkleinern",
    tipHdrZoomIn:                           "Text vergrößern",
    tipHdrModeSplit:                        "Geteilte Ansicht",
    tipHdrShowEditor:                       "Editor einblenden",
    tipHdrViewRender:                       "Vorschau anzeigen",
    tipHdrToc:                              "Inhaltsverzeichnis",
    tipHdrTocLevel:                         "Auf Ebene {n} begrenzen",
    tipHdrTocCollapse:                      "Einklappen",
    tipHdrTocExpand:                        "Ausklappen",
    tipHdrStyleTemplate:                    "Markdown-Vorschau-Stil auswählen",
    tipHdrFontHeading:                      "Überschrift",
    tipHdrFontBody:                         "Fließtext",
    tipHdrFontCode:                         "Code",
    tipHdrSettings:                         "Einstellungen öffnen",
    tipHdrHelp:                             "Hilfe",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Einstellungen",
    tabDlgSettingsDisplay:                  "Anzeige",
    tabDlgSettingsAbout:                    "Über",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Sprache",
    lblDlgSettingsDisplayTheme:             "Thema",
    btnDlgSettingsDisplayThemeDark:         "Dunkel",
    btnDlgSettingsDisplayThemeLight:        "Hell",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown-Dateien bearbeiten und anzeigen.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Nicht gespeicherte Änderungen -",
    btnDlgUnsavedDiscard:                   "Verwerfen",
    cfmDlgUnsavedReload:                    "Neu laden? Änderungen gehen verloren",
    btnDlgUnsavedReload:                    "Neu laden",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  es: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nueva versión disponible:",
    lnkUpdateWhatsNew:                      "Novedades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Abre o suelta un archivo Markdown aquí para verlo/editarlo.",
    empAppDropFile:                         "Suelta un archivo Markdown aquí",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Abrir archivo Markdown",
    ttlOsdSaveMd:                           "Guardar archivo Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nuevo documento",
    tipHdrOpen:                             "Abrir un archivo Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Guardar",
    tipHdrSave:                             "Guardar",
    tipHdrSaveAs:                           "Guardar como",
    tipHdrConvertFormat:                    "Convertir a otro formato",
    lblHdrConvertTo:                        "Convertir a",
    ttlHdrConvertSave:                      "Guardar documento convertido",
    tipHdrPrint:                            "Imprimir",
    tipHdrSaveHtml:                         "Guardar como HTML",
    ttlHdrSaveHtml:                         "Guardar como HTML",
    tipHdrSavePdf:                          "Guardar como PDF",
    ttlHdrSavePdf:                          "Guardar como PDF",
    tipHdrZoomOut:                          "Reducir fuente",
    tipHdrZoomIn:                           "Aumentar fuente",
    tipHdrModeSplit:                        "Vista dividida",
    tipHdrShowEditor:                       "Mostrar editor",
    tipHdrViewRender:                       "Mostrar vista previa",
    tipHdrToc:                              "Tabla de contenido",
    tipHdrTocLevel:                         "Limitar al nivel {n}",
    tipHdrTocCollapse:                      "Contraer",
    tipHdrTocExpand:                        "Expandir",
    tipHdrStyleTemplate:                    "Elegir un estilo de vista previa de Markdown",
    tipHdrFontHeading:                      "Encabezado",
    tipHdrFontBody:                         "Cuerpo",
    tipHdrFontCode:                         "Código",
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Ayuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Pantalla",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Oscuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edita y previsualiza archivos Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Cambios sin guardar -",
    btnDlgUnsavedDiscard:                   "Descartar",
    cfmDlgUnsavedReload:                    "¿Recargar? Los cambios se perderán",
    btnDlgUnsavedReload:                    "Recargar",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  pt_BR: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Baixar",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Abra ou solte um arquivo Markdown aqui para visualizá-lo/editá-lo.",
    empAppDropFile:                         "Solte um arquivo Markdown aqui",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Abrir ficheiro Markdown",
    ttlOsdSaveMd:                           "Guardar ficheiro Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Novo documento",
    tipHdrOpen:                             "Abrir um arquivo Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Salvar",
    tipHdrSave:                             "Salvar",
    tipHdrSaveAs:                           "Salvar como",
    tipHdrConvertFormat:                    "Converter para outro formato",
    lblHdrConvertTo:                        "Converter para",
    ttlHdrConvertSave:                      "Salvar documento convertido",
    tipHdrPrint:                            "Imprimir",
    tipHdrSaveHtml:                         "Salvar como HTML",
    ttlHdrSaveHtml:                         "Guardar como HTML",
    tipHdrSavePdf:                          "Salvar como PDF",
    ttlHdrSavePdf:                          "Guardar como PDF",
    tipHdrZoomOut:                          "Reduzir fonte",
    tipHdrZoomIn:                           "Aumentar fonte",
    tipHdrModeSplit:                        "Vista dividida",
    tipHdrShowEditor:                       "Mostrar editor",
    tipHdrViewRender:                       "Mostrar pré-visualização",
    tipHdrToc:                              "Índice",
    tipHdrTocLevel:                         "Limitar ao nível {n}",
    tipHdrTocCollapse:                      "Recolher",
    tipHdrTocExpand:                        "Expandir",
    tipHdrStyleTemplate:                    "Escolher um estilo de pré-visualização Markdown",
    tipHdrFontHeading:                      "Cabeçalho",
    tipHdrFontBody:                         "Corpo",
    tipHdrFontCode:                         "Código",
    tipHdrSettings:                         "Abrir definições",
    tipHdrHelp:                             "Ajuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Definições",
    tabDlgSettingsDisplay:                  "Exibição",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edite e visualize ficheiros Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Alterações não salvas -",
    btnDlgUnsavedDiscard:                   "Descartar",
    cfmDlgUnsavedReload:                    "Recarregar? As alterações serão perdidas",
    btnDlgUnsavedReload:                    "Recarregar",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  pt_PT: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Descarregar",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Abra ou solte um ficheiro Markdown aqui para visualizá-lo/editá-lo.",
    empAppDropFile:                         "Solte um ficheiro Markdown aqui",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Abrir ficheiro Markdown",
    ttlOsdSaveMd:                           "Guardar ficheiro Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Novo documento",
    tipHdrOpen:                             "Abrir um ficheiro Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Guardar",
    tipHdrSave:                             "Guardar",
    tipHdrSaveAs:                           "Guardar como",
    tipHdrConvertFormat:                    "Converter para outro formato",
    lblHdrConvertTo:                        "Converter para",
    ttlHdrConvertSave:                      "Guardar documento convertido",
    tipHdrPrint:                            "Imprimir",
    tipHdrSaveHtml:                         "Guardar como HTML",
    ttlHdrSaveHtml:                         "Guardar como HTML",
    tipHdrSavePdf:                          "Guardar como PDF",
    ttlHdrSavePdf:                          "Guardar como PDF",
    tipHdrZoomOut:                          "Reduzir tipo de letra",
    tipHdrZoomIn:                           "Aumentar tipo de letra",
    tipHdrModeSplit:                        "Vista dividida",
    tipHdrShowEditor:                       "Mostrar editor",
    tipHdrViewRender:                       "Mostrar pré-visualização",
    tipHdrToc:                              "Índice",
    tipHdrTocLevel:                         "Limitar ao nível {n}",
    tipHdrTocCollapse:                      "Recolher",
    tipHdrTocExpand:                        "Expandir",
    tipHdrStyleTemplate:                    "Escolher um estilo de pré-visualização Markdown",
    tipHdrFontHeading:                      "Cabeçalho",
    tipHdrFontBody:                         "Corpo",
    tipHdrFontCode:                         "Código",
    tipHdrSettings:                         "Abrir definições",
    tipHdrHelp:                             "Ajuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Definições",
    tabDlgSettingsDisplay:                  "Apresentação",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edite e visualize ficheiros Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Ligação",
    btnDlgLinkImage:                        "Imagem",
    plhDlgLinkAltText:                      "Texto alternativo",
    plhDlgLinkText:                         "Texto",
    plhDlgLinkUrlOrPath:                    "URL ou caminho local",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Procurar…",
    tipDlgLinkImageFolder:                  "A imagem tem de estar na pasta do documento ou numa subpasta",
    lblDlgLinkRelativePath:                 "Caminho relativo",
    btnDlgLinkInsert:                       "Inserir",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Alterações não guardadas -",
    btnDlgUnsavedDiscard:                   "Descartar",
    cfmDlgUnsavedReload:                    "Recarregar? As alterações serão perdidas",
    btnDlgUnsavedReload:                    "Recarregar",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Negrito (Ctrl+B)",
    tipEditorItalic:                        "Itálico (Ctrl+I)",
    tipEditorStrikethrough:                 "Rasurado (Ctrl+D)",
    tipEditorHeading:                       "Título (Ctrl+H)",
    tipEditorBulletList:                    "Lista com marcas (Ctrl+L)",
    tipEditorNumberedList:                  "Lista numerada (Ctrl+U)",
    tipEditorBlockquote:                    "Citação (Ctrl+Q)",
    tipEditorInlineCode:                    "Código em linha (Ctrl+E)",
    tipEditorCodeBlock:                     "Bloco de código (Ctrl+M)",
    tipEditorLinkImage:                     "Ligação / Imagem (Ctrl+K)",
    tipEditorHorizontalRule:                "Linha horizontal (Ctrl+R)",
    tipEditorAlignLeft:                     "Alinhar à esquerda",
    tipEditorAlignCenter:                   "Alinhar ao centro",
    tipEditorAlignRight:                    "Alinhar à direita",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Procurar na pré-visualização…",
    lblPreviewNoResults:                    "0 resultados",
    tipPreviewFindPrev:                     "Anterior (Shift+Enter)",
    tipPreviewFindNext:                     "Seguinte (Enter)",
    tipPreviewFindClose:                    "Fechar (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "alinhar",
    lblImagePropsWidth:                     "largura",
    lblImagePropsHeight:                    "altura",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "aplicar",
    tipImagePropsClear:                     "limpar",
    btnImagePropsRemoveStyle:               "remover bloco de estilo",

  },

  it: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nuova versione disponibile:",
    lnkUpdateWhatsNew:                      "Novità",
    btnUpdateDownload:                      "Scarica",
    lnkUpdateSkip:                          "Salta questa versione",
    tipUpdateDismiss:                       "Ignora",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Apri o rilascia un file Markdown qui per visualizzarlo/modificarlo.",
    empAppDropFile:                         "Trascina un file Markdown qui",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Apri file Markdown",
    ttlOsdSaveMd:                           "Salva file Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nuovo documento",
    tipHdrOpen:                             "Apri un file Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Salva",
    tipHdrSave:                             "Salva",
    tipHdrSaveAs:                           "Salva come",
    tipHdrConvertFormat:                    "Converti in altro formato",
    lblHdrConvertTo:                        "Converti in",
    ttlHdrConvertSave:                      "Salva documento convertito",
    tipHdrPrint:                            "Stampa",
    tipHdrSaveHtml:                         "Salva come HTML",
    ttlHdrSaveHtml:                         "Salva come HTML",
    tipHdrSavePdf:                          "Salva come PDF",
    ttlHdrSavePdf:                          "Salva come PDF",
    tipHdrZoomOut:                          "Riduci testo",
    tipHdrZoomIn:                           "Ingrandisci testo",
    tipHdrModeSplit:                        "Vista divisa",
    tipHdrShowEditor:                       "Mostra editor",
    tipHdrViewRender:                       "Mostra anteprima",
    tipHdrToc:                              "Indice",
    tipHdrTocLevel:                         "Limita al livello {n}",
    tipHdrTocCollapse:                      "Comprimi",
    tipHdrTocExpand:                        "Espandi",
    tipHdrStyleTemplate:                    "Scegli uno stile di anteprima Markdown",
    tipHdrFontHeading:                      "Intestazione",
    tipHdrFontBody:                         "Corpo",
    tipHdrFontCode:                         "Codice",
    tipHdrSettings:                         "Apri impostazioni",
    tipHdrHelp:                             "Aiuto",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Impostazioni",
    tabDlgSettingsDisplay:                  "Visualizzazione",
    tabDlgSettingsAbout:                    "Informazioni",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lingua",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Scuro",
    btnDlgSettingsDisplayThemeLight:        "Chiaro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "modifica e visualizza file Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Modifiche non salvate -",
    btnDlgUnsavedDiscard:                   "Ignora",
    cfmDlgUnsavedReload:                    "Ricaricare? Le modifiche andranno perse",
    btnDlgUnsavedReload:                    "Ricarica",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  nl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nieuwe versie beschikbaar:",
    lnkUpdateWhatsNew:                      "Wat is nieuw",
    btnUpdateDownload:                      "Downloaden",
    lnkUpdateSkip:                          "Deze versie overslaan",
    tipUpdateDismiss:                       "Sluiten",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Open of zet een Markdown-bestand hier neer om het te bekijken/bewerken.",
    empAppDropFile:                         "Zet een Markdown-bestand hier neer",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown-bestand openen",
    ttlOsdSaveMd:                           "Markdown-bestand opslaan",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nieuw document",
    tipHdrOpen:                             "Open een Markdown-bestand",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Opslaan",
    tipHdrSave:                             "Opslaan",
    tipHdrSaveAs:                           "Opslaan als",
    tipHdrConvertFormat:                    "Converteren naar ander formaat",
    lblHdrConvertTo:                        "Converteren naar",
    ttlHdrConvertSave:                      "Geconverteerd document opslaan",
    tipHdrPrint:                            "Afdrukken",
    tipHdrSaveHtml:                         "Opslaan als HTML",
    ttlHdrSaveHtml:                         "Opslaan als HTML",
    tipHdrSavePdf:                          "Opslaan als PDF",
    ttlHdrSavePdf:                          "Opslaan als PDF",
    tipHdrZoomOut:                          "Tekst verkleinen",
    tipHdrZoomIn:                           "Tekst vergroten",
    tipHdrModeSplit:                        "Gesplitste weergave",
    tipHdrShowEditor:                       "Editor tonen",
    tipHdrViewRender:                       "Voorbeeld tonen",
    tipHdrToc:                              "Inhoudsopgave",
    tipHdrTocLevel:                         "Beperken tot niveau {n}",
    tipHdrTocCollapse:                      "Samenvouwen",
    tipHdrTocExpand:                        "Uitvouwen",
    tipHdrStyleTemplate:                    "Kies een Markdown-voorbeeldstijl",
    tipHdrFontHeading:                      "Koptekst",
    tipHdrFontBody:                         "Broodtekst",
    tipHdrFontCode:                         "Code",
    tipHdrSettings:                         "Instellingen openen",
    tipHdrHelp:                             "Hulp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Instellingen",
    tabDlgSettingsDisplay:                  "Weergave",
    tabDlgSettingsAbout:                    "Over",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Taal",
    lblDlgSettingsDisplayTheme:             "Thema",
    btnDlgSettingsDisplayThemeDark:         "Donker",
    btnDlgSettingsDisplayThemeLight:        "Licht",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "bewerk en bekijk Markdown-bestanden.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Niet-opgeslagen wijzigingen -",
    btnDlgUnsavedDiscard:                   "Verwijderen",
    cfmDlgUnsavedReload:                    "Herladen? Wijzigingen gaan verloren",
    btnDlgUnsavedReload:                    "Herladen",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ru: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна новая версия:",
    lnkUpdateWhatsNew:                      "Что нового",
    btnUpdateDownload:                      "Скачать",
    lnkUpdateSkip:                          "Пропустить эту версию",
    tipUpdateDismiss:                       "Закрыть",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Откройте или перетащите файл Markdown сюда, чтобы просмотреть/редактировать его.",
    empAppDropFile:                         "Перетащите файл Markdown сюда",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Открыть файл Markdown",
    ttlOsdSaveMd:                           "Сохранить файл Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Новый документ",
    tipHdrOpen:                             "Открыть файл Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Сохранить",
    tipHdrSave:                             "Сохранить",
    tipHdrSaveAs:                           "Сохранить как",
    tipHdrConvertFormat:                    "Конвертировать в другой формат",
    lblHdrConvertTo:                        "Конвертировать в",
    ttlHdrConvertSave:                      "Сохранить конвертированный документ",
    tipHdrPrint:                            "Печать",
    tipHdrSaveHtml:                         "Сохранить как HTML",
    ttlHdrSaveHtml:                         "Сохранить как HTML",
    tipHdrSavePdf:                          "Сохранить как PDF",
    ttlHdrSavePdf:                          "Сохранить как PDF",
    tipHdrZoomOut:                          "Уменьшить шрифт",
    tipHdrZoomIn:                           "Увеличить шрифт",
    tipHdrModeSplit:                        "Разделённый вид",
    tipHdrShowEditor:                       "Показать редактор",
    tipHdrViewRender:                       "Показать предпросмотр",
    tipHdrToc:                              "Содержание",
    tipHdrTocLevel:                         "Ограничить до уровня {n}",
    tipHdrTocCollapse:                      "Свернуть",
    tipHdrTocExpand:                        "Развернуть",
    tipHdrStyleTemplate:                    "Выбрать стиль предварительного просмотра Markdown",
    tipHdrFontHeading:                      "Заголовок",
    tipHdrFontBody:                         "Основной",
    tipHdrFontCode:                         "Код",
    tipHdrSettings:                         "Открыть настройки",
    tipHdrHelp:                             "Помощь",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Отображение",
    tabDlgSettingsAbout:                    "О программе",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Язык",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тёмная",
    btnDlgSettingsDisplayThemeLight:        "Светлая",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "редактирование и просмотр Markdown-файлов.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Несохранённые изменения -",
    btnDlgUnsavedDiscard:                   "Отменить",
    cfmDlgUnsavedReload:                    "Обновить? Изменения будут потеряны",
    btnDlgUnsavedReload:                    "Обновить",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  uk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна нова версія:",
    lnkUpdateWhatsNew:                      "Що нового",
    btnUpdateDownload:                      "Завантажити",
    lnkUpdateSkip:                          "Пропустити цю версію",
    tipUpdateDismiss:                       "Закрити",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Відкрийте або скиньте файл Markdown сюди, щоб переглянути/редагувати його.",
    empAppDropFile:                         "Перетягніть файл Markdown сюди",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Відкрити файл Markdown",
    ttlOsdSaveMd:                           "Зберегти файл Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Новий документ",
    tipHdrOpen:                             "Відкрити файл Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Зберегти",
    tipHdrSave:                             "Зберегти",
    tipHdrSaveAs:                           "Зберегти як",
    tipHdrConvertFormat:                    "Конвертувати в інший формат",
    lblHdrConvertTo:                        "Конвертувати в",
    ttlHdrConvertSave:                      "Зберегти конвертований документ",
    tipHdrPrint:                            "Друк",
    tipHdrSaveHtml:                         "Зберегти як HTML",
    ttlHdrSaveHtml:                         "Зберегти як HTML",
    tipHdrSavePdf:                          "Зберегти як PDF",
    ttlHdrSavePdf:                          "Зберегти як PDF",
    tipHdrZoomOut:                          "Зменшити шрифт",
    tipHdrZoomIn:                           "Збільшити шрифт",
    tipHdrModeSplit:                        "Розділений вид",
    tipHdrShowEditor:                       "Показати редактор",
    tipHdrViewRender:                       "Показати попередній перегляд",
    tipHdrToc:                              "Зміст",
    tipHdrTocLevel:                         "Обмежити до рівня {n}",
    tipHdrTocCollapse:                      "Згорнути",
    tipHdrTocExpand:                        "Розгорнути",
    tipHdrStyleTemplate:                    "Вибрати стиль попереднього перегляду Markdown",
    tipHdrFontHeading:                      "Заголовок",
    tipHdrFontBody:                         "Основний",
    tipHdrFontCode:                         "Код",
    tipHdrSettings:                         "Відкрити налаштування",
    tipHdrHelp:                             "Довідка",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Налаштування",
    tabDlgSettingsDisplay:                  "Відображення",
    tabDlgSettingsAbout:                    "Про програму",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Мова",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Темна",
    btnDlgSettingsDisplayThemeLight:        "Світла",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "редагування та перегляд файлів Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Незбережені зміни -",
    btnDlgUnsavedDiscard:                   "Скасувати",
    cfmDlgUnsavedReload:                    "Оновити? Зміни буде втрачено",
    btnDlgUnsavedReload:                    "Оновити",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  pl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Dostępna nowa wersja:",
    lnkUpdateWhatsNew:                      "Co nowego",
    btnUpdateDownload:                      "Pobierz",
    lnkUpdateSkip:                          "Pomiń tę wersję",
    tipUpdateDismiss:                       "Zamknij",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Otwórz lub upuść plik Markdown tutaj, aby go wyświetlić/edytować.",
    empAppDropFile:                         "Upuść plik Markdown tutaj",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Otwórz plik Markdown",
    ttlOsdSaveMd:                           "Zapisz plik Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nowy dokument",
    tipHdrOpen:                             "Otwórz plik Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Zapisz",
    tipHdrSave:                             "Zapisz",
    tipHdrSaveAs:                           "Zapisz jako",
    tipHdrConvertFormat:                    "Konwertuj do innego formatu",
    lblHdrConvertTo:                        "Konwertuj do",
    ttlHdrConvertSave:                      "Zapisz przekonwertowany dokument",
    tipHdrPrint:                            "Drukuj",
    tipHdrSaveHtml:                         "Zapisz jako HTML",
    ttlHdrSaveHtml:                         "Zapisz jako HTML",
    tipHdrSavePdf:                          "Zapisz jako PDF",
    ttlHdrSavePdf:                          "Zapisz jako PDF",
    tipHdrZoomOut:                          "Zmniejsz czcionkę",
    tipHdrZoomIn:                           "Powiększ czcionkę",
    tipHdrModeSplit:                        "Widok podzielony",
    tipHdrShowEditor:                       "Pokaż edytor",
    tipHdrViewRender:                       "Pokaż podgląd",
    tipHdrToc:                              "Spis treści",
    tipHdrTocLevel:                         "Ogranicz do poziomu {n}",
    tipHdrTocCollapse:                      "Zwiń",
    tipHdrTocExpand:                        "Rozwiń",
    tipHdrStyleTemplate:                    "Wybierz styl podglądu Markdown",
    tipHdrFontHeading:                      "Nagłówek",
    tipHdrFontBody:                         "Treść",
    tipHdrFontCode:                         "Kod",
    tipHdrSettings:                         "Otwórz ustawienia",
    tipHdrHelp:                             "Pomoc",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ustawienia",
    tabDlgSettingsDisplay:                  "Wyświetlanie",
    tabDlgSettingsAbout:                    "O programie",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Język",
    lblDlgSettingsDisplayTheme:             "Motyw",
    btnDlgSettingsDisplayThemeDark:         "Ciemny",
    btnDlgSettingsDisplayThemeLight:        "Jasny",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edytuj i podglądaj pliki Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Niezapisane zmiany -",
    btnDlgUnsavedDiscard:                   "Odrzuc",
    cfmDlgUnsavedReload:                    "Przeładować? Zmiany zostaną utracone",
    btnDlgUnsavedReload:                    "Przeładuj",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ro: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versiune nouă disponibilă:",
    lnkUpdateWhatsNew:                      "Ce e nou",
    btnUpdateDownload:                      "Descarcă",
    lnkUpdateSkip:                          "Omite această versiune",
    tipUpdateDismiss:                       "Ignoră",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Deschide sau plasează un fișier Markdown aici pentru a-l vizualiza/edita.",
    empAppDropFile:                         "Plasează un fișier Markdown aici",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Deschide fișier Markdown",
    ttlOsdSaveMd:                           "Salvează fișier Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Document nou",
    tipHdrOpen:                             "Deschide un fișier Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Salvează",
    tipHdrSave:                             "Salvează",
    tipHdrSaveAs:                           "Salvează ca",
    tipHdrConvertFormat:                    "Convertiți în alt format",
    lblHdrConvertTo:                        "Convertiți în",
    ttlHdrConvertSave:                      "Salvați documentul convertit",
    tipHdrPrint:                            "Tipărește",
    tipHdrSaveHtml:                         "Salvează ca HTML",
    ttlHdrSaveHtml:                         "Salvează ca HTML",
    tipHdrSavePdf:                          "Salvează ca PDF",
    ttlHdrSavePdf:                          "Salvează ca PDF",
    tipHdrZoomOut:                          "Micșorează fontul",
    tipHdrZoomIn:                           "Mărește fontul",
    tipHdrModeSplit:                        "Vizualizare divizată",
    tipHdrShowEditor:                       "Afișează editorul",
    tipHdrViewRender:                       "Afișează previzualizarea",
    tipHdrToc:                              "Cuprins",
    tipHdrTocLevel:                         "Limitează la nivelul {n}",
    tipHdrTocCollapse:                      "Restrânge",
    tipHdrTocExpand:                        "Extinde",
    tipHdrStyleTemplate:                    "Alegeți un stil de previzualizare Markdown",
    tipHdrFontHeading:                      "Titlu",
    tipHdrFontBody:                         "Corp",
    tipHdrFontCode:                         "Cod",
    tipHdrSettings:                         "Deschide setări",
    tipHdrHelp:                             "Ajutor",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Setări",
    tabDlgSettingsDisplay:                  "Afișaj",
    tabDlgSettingsAbout:                    "Despre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Limbă",
    lblDlgSettingsDisplayTheme:             "Temă",
    btnDlgSettingsDisplayThemeDark:         "Întunecat",
    btnDlgSettingsDisplayThemeLight:        "Deschis",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "editați și vizualizați fișiere Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Modificări nesalvate -",
    btnDlgUnsavedDiscard:                   "Renunță",
    cfmDlgUnsavedReload:                    "Reîncărcați? Modificările vor fi pierdute",
    btnDlgUnsavedReload:                    "Reîncarcă",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  sv: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tillgänglig:",
    lnkUpdateWhatsNew:                      "Vad är nytt",
    btnUpdateDownload:                      "Ladda ner",
    lnkUpdateSkip:                          "Hoppa över den här versionen",
    tipUpdateDismiss:                       "Avfärda",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Öppna eller släpp en Markdown-fil här för att visa/redigera den.",
    empAppDropFile:                         "Släpp en Markdown-fil här",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Öppna Markdown-fil",
    ttlOsdSaveMd:                           "Spara Markdown-fil",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nytt dokument",
    tipHdrOpen:                             "Öppna en Markdown-fil",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Spara",
    tipHdrSave:                             "Spara",
    tipHdrSaveAs:                           "Spara som",
    tipHdrConvertFormat:                    "Konvertera till annat format",
    lblHdrConvertTo:                        "Konvertera till",
    ttlHdrConvertSave:                      "Spara konverterat dokument",
    tipHdrPrint:                            "Skriv ut",
    tipHdrSaveHtml:                         "Spara som HTML",
    ttlHdrSaveHtml:                         "Spara som HTML",
    tipHdrSavePdf:                          "Spara som PDF",
    ttlHdrSavePdf:                          "Spara som PDF",
    tipHdrZoomOut:                          "Minska textstorlek",
    tipHdrZoomIn:                           "Öka textstorlek",
    tipHdrModeSplit:                        "Delad vy",
    tipHdrShowEditor:                       "Visa editor",
    tipHdrViewRender:                       "Visa förhandsgranskning",
    tipHdrToc:                              "Innehållsförteckning",
    tipHdrTocLevel:                         "Begränsa till nivå {n}",
    tipHdrTocCollapse:                      "Fäll ihop",
    tipHdrTocExpand:                        "Fäll ut",
    tipHdrStyleTemplate:                    "Välj ett Markdown-förhandsgranskningsstil",
    tipHdrFontHeading:                      "Rubrik",
    tipHdrFontBody:                         "Brödtext",
    tipHdrFontCode:                         "Kod",
    tipHdrSettings:                         "Öppna inställningar",
    tipHdrHelp:                             "Hjälp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Inställningar",
    tabDlgSettingsDisplay:                  "Visning",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Språk",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mörkt",
    btnDlgSettingsDisplayThemeLight:        "Ljust",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "redigera och förhandsgranska Markdown-filer.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Osparade ändringar -",
    btnDlgUnsavedDiscard:                   "Ignorera",
    cfmDlgUnsavedReload:                    "Ladda om? Ändringar går förlorade",
    btnDlgUnsavedReload:                    "Ladda om",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  nb: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny versjon tilgjengelig:",
    lnkUpdateWhatsNew:                      "Hva er nytt",
    btnUpdateDownload:                      "Last ned",
    lnkUpdateSkip:                          "Hopp over denne versjonen",
    tipUpdateDismiss:                       "Avvis",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Åpne eller slipp en Markdown-fil her for å vise/redigere den.",
    empAppDropFile:                         "Slipp en Markdown-fil her",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Åpne Markdown-fil",
    ttlOsdSaveMd:                           "Lagre Markdown-fil",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nytt dokument",
    tipHdrOpen:                             "Åpne en Markdown-fil",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Lagre",
    tipHdrSave:                             "Lagre",
    tipHdrSaveAs:                           "Lagre som",
    tipHdrConvertFormat:                    "Konverter til annet format",
    lblHdrConvertTo:                        "Konverter til",
    ttlHdrConvertSave:                      "Lagre konvertert dokument",
    tipHdrPrint:                            "Skriv ut",
    tipHdrSaveHtml:                         "Lagre som HTML",
    ttlHdrSaveHtml:                         "Lagre som HTML",
    tipHdrSavePdf:                          "Lagre som PDF",
    ttlHdrSavePdf:                          "Lagre som PDF",
    tipHdrZoomOut:                          "Forminsk tekst",
    tipHdrZoomIn:                           "Forstørr tekst",
    tipHdrModeSplit:                        "Delt visning",
    tipHdrShowEditor:                       "Vis editor",
    tipHdrViewRender:                       "Vis forhåndsvisning",
    tipHdrToc:                              "Innholdsfortegnelse",
    tipHdrTocLevel:                         "Begrens til nivå {n}",
    tipHdrTocCollapse:                      "Slå sammen",
    tipHdrTocExpand:                        "Utvid",
    tipHdrStyleTemplate:                    "Velg en Markdown-forhåndsvisningsstil",
    tipHdrFontHeading:                      "Overskrift",
    tipHdrFontBody:                         "Brødtekst",
    tipHdrFontCode:                         "Kode",
    tipHdrSettings:                         "Åpne innstillinger",
    tipHdrHelp:                             "Hjelp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Innstillinger",
    tabDlgSettingsDisplay:                  "Visning",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Språk",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mørk",
    btnDlgSettingsDisplayThemeLight:        "Lys",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "rediger og forhåndsvis Markdown-filer.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Ulagrede endringer -",
    btnDlgUnsavedDiscard:                   "Forkast",
    cfmDlgUnsavedReload:                    "Last inn på nytt? Endringer vil gå tapt",
    btnDlgUnsavedReload:                    "Last inn på nytt",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  tr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yeni sürüm mevcut:",
    lnkUpdateWhatsNew:                      "Yenilikler",
    btnUpdateDownload:                      "İndir",
    lnkUpdateSkip:                          "Bu sürümü atla",
    tipUpdateDismiss:                       "Kapat",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Burada görüntülemek/düzenlemek için bir Markdown dosyası açın veya bırakın.",
    empAppDropFile:                         "Markdown dosyasını buraya bırakın",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown Dosyası Aç",
    ttlOsdSaveMd:                           "Markdown Dosyası Kaydet",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Yeni belge",
    tipHdrOpen:                             "Bir Markdown dosyası aç",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Kaydet",
    tipHdrSave:                             "Kaydet",
    tipHdrSaveAs:                           "Farklı kaydet",
    tipHdrConvertFormat:                    "Başka bir biçime dönüştür",
    lblHdrConvertTo:                        "Dönüştür:",
    ttlHdrConvertSave:                      "Dönüştürülen belgeyi kaydet",
    tipHdrPrint:                            "Yazdır",
    tipHdrSaveHtml:                         "HTML olarak kaydet",
    ttlHdrSaveHtml:                         "HTML olarak kaydet",
    tipHdrSavePdf:                          "PDF olarak kaydet",
    ttlHdrSavePdf:                          "PDF olarak kaydet",
    tipHdrZoomOut:                          "Yazı küçült",
    tipHdrZoomIn:                           "Yazı büyüt",
    tipHdrModeSplit:                        "Bölünmüş görünüm",
    tipHdrShowEditor:                       "Editörü göster",
    tipHdrViewRender:                       "Önizlemeyi göster",
    tipHdrToc:                              "İçindekiler",
    tipHdrTocLevel:                         "Seviye {n} ile sınırla",
    tipHdrTocCollapse:                      "Daralt",
    tipHdrTocExpand:                        "Genişlet",
    tipHdrStyleTemplate:                    "Markdown önizleme stili seçin",
    tipHdrFontHeading:                      "Başlık",
    tipHdrFontBody:                         "Gövde",
    tipHdrFontCode:                         "Kod",
    tipHdrSettings:                         "Ayarları aç",
    tipHdrHelp:                             "Yardım",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ayarlar",
    tabDlgSettingsDisplay:                  "Görünüm",
    tabDlgSettingsAbout:                    "Hakkında",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Dil",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Koyu",
    btnDlgSettingsDisplayThemeLight:        "Açık",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown dosyalarını düzenleyin ve önizleyin.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Kaydedilmemiş değişiklikler -",
    btnDlgUnsavedDiscard:                   "Vazgeç",
    cfmDlgUnsavedReload:                    "Yeniden yükle? Değişiklikler kaybolacak",
    btnDlgUnsavedReload:                    "Yeniden yükle",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  hr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova verzija dostupna:",
    lnkUpdateWhatsNew:                      "Što je novo",
    btnUpdateDownload:                      "Preuzmi",
    lnkUpdateSkip:                          "Preskoči ovu verziju",
    tipUpdateDismiss:                       "Odbaci",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Otvori ili ispusti Markdown datoteku ovdje za prikaz/uređivanje.",
    empAppDropFile:                         "Ovdje ispustite Markdown datoteku",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Otvori Markdown datoteku",
    ttlOsdSaveMd:                           "Spremi Markdown datoteku",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Novi dokument",
    tipHdrOpen:                             "Otvori Markdown datoteku",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Spremi",
    tipHdrSave:                             "Spremi",
    tipHdrSaveAs:                           "Spremi kao",
    tipHdrConvertFormat:                    "Pretvori u drugi format",
    lblHdrConvertTo:                        "Pretvori u",
    ttlHdrConvertSave:                      "Spremi pretvoreni dokument",
    tipHdrPrint:                            "Ispis",
    tipHdrSaveHtml:                         "Spremi kao HTML",
    ttlHdrSaveHtml:                         "Spremi kao HTML",
    tipHdrSavePdf:                          "Spremi kao PDF",
    ttlHdrSavePdf:                          "Spremi kao PDF",
    tipHdrZoomOut:                          "Smanji font",
    tipHdrZoomIn:                           "Povećaj font",
    tipHdrModeSplit:                        "Podijeljeni prikaz",
    tipHdrShowEditor:                       "Prikaži uređivač",
    tipHdrViewRender:                       "Prikaži pregled",
    tipHdrToc:                              "Sadržaj",
    tipHdrTocLevel:                         "Ograniči na razinu {n}",
    tipHdrTocCollapse:                      "Sažmi",
    tipHdrTocExpand:                        "Proširi",
    tipHdrStyleTemplate:                    "Odaberite stil prikaza Markdowna",
    tipHdrFontHeading:                      "Naslov",
    tipHdrFontBody:                         "Tijelo",
    tipHdrFontCode:                         "Kod",
    tipHdrSettings:                         "Otvori postavke",
    tipHdrHelp:                             "Pomoć",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Postavke",
    tabDlgSettingsDisplay:                  "Prikaz",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jezik",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Tamna",
    btnDlgSettingsDisplayThemeLight:        "Svijetla",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "uređujte i pregledajte Markdown datoteke.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Nespremljene promjene -",
    btnDlgUnsavedDiscard:                   "Odbaci",
    cfmDlgUnsavedReload:                    "Ponovo učitati? Promjene će biti izgubljene",
    btnDlgUnsavedReload:                    "Učitaj ponovo",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  el: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Νέα έκδοση διαθέσιμη:",
    lnkUpdateWhatsNew:                      "Τι νέο υπάρχει",
    btnUpdateDownload:                      "Λήψη",
    lnkUpdateSkip:                          "Παράλειψη αυτής της έκδοσης",
    tipUpdateDismiss:                       "Απόρριψη",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Ανοίξτε ή αποθέστε ένα αρχείο Markdown εδώ για προβολή/επεξεργασία.",
    empAppDropFile:                         "Αποθέστε ένα αρχείο Markdown εδώ",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Άνοιγμα αρχείου Markdown",
    ttlOsdSaveMd:                           "Αποθήκευση αρχείου Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Νέο έγγραφο",
    tipHdrOpen:                             "Άνοιγμα αρχείου Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Αποθήκευση",
    tipHdrSave:                             "Αποθήκευση",
    tipHdrSaveAs:                           "Αποθήκευση ως",
    tipHdrConvertFormat:                    "Μετατροπή σε άλλη μορφή",
    lblHdrConvertTo:                        "Μετατροπή σε",
    ttlHdrConvertSave:                      "Αποθήκευση μετατραπέντος εγγράφου",
    tipHdrPrint:                            "Εκτύπωση",
    tipHdrSaveHtml:                         "Αποθήκευση ως HTML",
    ttlHdrSaveHtml:                         "Αποθήκευση ως HTML",
    tipHdrSavePdf:                          "Αποθήκευση ως PDF",
    ttlHdrSavePdf:                          "Αποθήκευση ως PDF",
    tipHdrZoomOut:                          "Σμίκρυνση κειμένου",
    tipHdrZoomIn:                           "Μεγέθυνση κειμένου",
    tipHdrModeSplit:                        "Διαιρεμένη προβολή",
    tipHdrShowEditor:                       "Εμφάνιση επεξεργαστή",
    tipHdrViewRender:                       "Εμφάνιση προεπισκόπησης",
    tipHdrToc:                              "Πίνακας περιεχομένων",
    tipHdrTocLevel:                         "Περιορισμός στο επίπεδο {n}",
    tipHdrTocCollapse:                      "Σύμπτυξη",
    tipHdrTocExpand:                        "Ανάπτυξη",
    tipHdrStyleTemplate:                    "Επιλέξτε στυλ προεπισκόπησης Markdown",
    tipHdrFontHeading:                      "Επικεφαλίδα",
    tipHdrFontBody:                         "Κύριο",
    tipHdrFontCode:                         "Κώδικας",
    tipHdrSettings:                         "Άνοιγμα ρυθμίσεων",
    tipHdrHelp:                             "Βοήθεια",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ρυθμίσεις",
    tabDlgSettingsDisplay:                  "Εμφάνιση",
    tabDlgSettingsAbout:                    "Σχετικά",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Γλώσσα",
    lblDlgSettingsDisplayTheme:             "Θέμα",
    btnDlgSettingsDisplayThemeDark:         "Σκοτεινό",
    btnDlgSettingsDisplayThemeLight:        "Φωτεινό",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "επεξεργαστείτε και προβάλετε αρχεία Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Μη αποθηκευμένες αλλαγές -",
    btnDlgUnsavedDiscard:                   "Απόρριψη",
    cfmDlgUnsavedReload:                    "Επαναφόρτωση; Οι αλλαγές θα χαθούν",
    btnDlgUnsavedReload:                    "Επαναφόρτωση",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  he: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "גרסה חדשה זמינה:",
    lnkUpdateWhatsNew:                      "מה חדש",
    btnUpdateDownload:                      "הורדה",
    lnkUpdateSkip:                          "דלג על גרסה זו",
    tipUpdateDismiss:                       "בטל",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "פתח או שחרר קובץ Markdown כאן כדי להציגו/לערוך אותו.",
    empAppDropFile:                         "גרור קובץ Markdown לכאן",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "פתח קובץ Markdown",
    ttlOsdSaveMd:                           "שמור קובץ Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "מסמך חדש",
    tipHdrOpen:                             "פתח קובץ Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "שמור",
    tipHdrSave:                             "שמור",
    tipHdrSaveAs:                           "שמור בשם",
    tipHdrConvertFormat:                    "המר לפורמט אחר",
    lblHdrConvertTo:                        "המר ל",
    ttlHdrConvertSave:                      "שמור מסמך מומר",
    tipHdrPrint:                            "הדפס",
    tipHdrSaveHtml:                         "שמור כ-HTML",
    ttlHdrSaveHtml:                         "שמור כ-HTML",
    tipHdrSavePdf:                          "שמור כ-PDF",
    ttlHdrSavePdf:                          "שמור כ-PDF",
    tipHdrZoomOut:                          "הקטן גופן",
    tipHdrZoomIn:                           "הגדל גופן",
    tipHdrModeSplit:                        "תצוגה מפוצלת",
    tipHdrShowEditor:                       "הצג עורך",
    tipHdrViewRender:                       "הצג תצוגה מקדימה",
    tipHdrToc:                              "תוכן עניינים",
    tipHdrTocLevel:                         "הגבל לרמה {n}",
    tipHdrTocCollapse:                      "כווץ",
    tipHdrTocExpand:                        "הרחב",
    tipHdrStyleTemplate:                    "בחר סגנון תצוגה מקדימה של Markdown",
    tipHdrFontHeading:                      "כותרת",
    tipHdrFontBody:                         "גוף",
    tipHdrFontCode:                         "קוד",
    tipHdrSettings:                         "פתח הגדרות",
    tipHdrHelp:                             "עזרה",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "הגדרות",
    tabDlgSettingsDisplay:                  "תצוגה",
    tabDlgSettingsAbout:                    "אודות",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "שפה",
    lblDlgSettingsDisplayTheme:             "ערכת נושא",
    btnDlgSettingsDisplayThemeDark:         "כהה",
    btnDlgSettingsDisplayThemeLight:        "בהיר",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ערוך וצפה בקבצי Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "שינויים לא שמורים -",
    btnDlgUnsavedDiscard:                   "בטל",
    cfmDlgUnsavedReload:                    "לטעון מחדש? השינויים יאבדו",
    btnDlgUnsavedReload:                    "טען מחדש",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ar: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "إصدار جديد متوفر:",
    lnkUpdateWhatsNew:                      "ما الجديد",
    btnUpdateDownload:                      "تنزيل",
    lnkUpdateSkip:                          "تخطي هذا الإصدار",
    tipUpdateDismiss:                       "تجاهل",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "افتح أو أفلت ملف Markdown هنا لعرضه/تحريره.",
    empAppDropFile:                         "أفلت ملف Markdown هنا",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "فتح ملف Markdown",
    ttlOsdSaveMd:                           "حفظ ملف Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "مستند جديد",
    tipHdrOpen:                             "فتح ملف Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "حفظ",
    tipHdrSave:                             "حفظ",
    tipHdrSaveAs:                           "حفظ باسم",
    tipHdrConvertFormat:                    "تحويل إلى تنسيق آخر",
    lblHdrConvertTo:                        "تحويل إلى",
    ttlHdrConvertSave:                      "حفظ المستند المحوَّل",
    tipHdrPrint:                            "طباعة",
    tipHdrSaveHtml:                         "حفظ بصيغة HTML",
    ttlHdrSaveHtml:                         "حفظ بصيغة HTML",
    tipHdrSavePdf:                          "حفظ بصيغة PDF",
    ttlHdrSavePdf:                          "حفظ بصيغة PDF",
    tipHdrZoomOut:                          "تصغير الخط",
    tipHdrZoomIn:                           "تكبير الخط",
    tipHdrModeSplit:                        "عرض مقسم",
    tipHdrShowEditor:                       "إظهار المحرر",
    tipHdrViewRender:                       "إظهار المعاينة",
    tipHdrToc:                              "جدول المحتويات",
    tipHdrTocLevel:                         "الحد إلى المستوى {n}",
    tipHdrTocCollapse:                      "طي",
    tipHdrTocExpand:                        "توسيع",
    tipHdrStyleTemplate:                    "اختر نمط معاينة Markdown",
    tipHdrFontHeading:                      "عنوان",
    tipHdrFontBody:                         "جسم",
    tipHdrFontCode:                         "كود",
    tipHdrSettings:                         "فتح الإعدادات",
    tipHdrHelp:                             "مساعدة",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "الإعدادات",
    tabDlgSettingsDisplay:                  "العرض",
    tabDlgSettingsAbout:                    "حول",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "اللغة",
    lblDlgSettingsDisplayTheme:             "السمة",
    btnDlgSettingsDisplayThemeDark:         "داكن",
    btnDlgSettingsDisplayThemeLight:        "فاتح",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "حرِّر ملفات Markdown وعاينها.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "تغييرات غير محفوظة -",
    btnDlgUnsavedDiscard:                   "تجاهل",
    cfmDlgUnsavedReload:                    "إعادة تحميل؟ ستُفقد التغييرات",
    btnDlgUnsavedReload:                    "إعادة تحميل",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  fa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نسخه جدید موجود است:",
    lnkUpdateWhatsNew:                      "چه خبر",
    btnUpdateDownload:                      "دانلود",
    lnkUpdateSkip:                          "رد کردن این نسخه",
    tipUpdateDismiss:                       "رد کردن",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "یک فایل Markdown را اینجا باز کنید یا رها کنید تا نمایش/ویرایش شود.",
    empAppDropFile:                         "فایل Markdown را اینجا رها کنید",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "باز کردن فایل Markdown",
    ttlOsdSaveMd:                           "ذخیره فایل Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "سند جدید",
    tipHdrOpen:                             "باز کردن فایل Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "ذخیره",
    tipHdrSave:                             "ذخیره",
    tipHdrSaveAs:                           "ذخیره با نام",
    tipHdrConvertFormat:                    "تبدیل به فرمت دیگر",
    lblHdrConvertTo:                        "تبدیل به",
    ttlHdrConvertSave:                      "ذخیره سند تبدیل‌شده",
    tipHdrPrint:                            "چاپ",
    tipHdrSaveHtml:                         "ذخیره به عنوان HTML",
    ttlHdrSaveHtml:                         "ذخیره به عنوان HTML",
    tipHdrSavePdf:                          "ذخیره به عنوان PDF",
    ttlHdrSavePdf:                          "ذخیره به عنوان PDF",
    tipHdrZoomOut:                          "کوچک‌تر کردن متن",
    tipHdrZoomIn:                           "بزرگ‌تر کردن متن",
    tipHdrModeSplit:                        "نمای تقسیم‌شده",
    tipHdrShowEditor:                       "نمایش ویرایشگر",
    tipHdrViewRender:                       "نمایش پیش‌نمایش",
    tipHdrToc:                              "فهرست مطالب",
    tipHdrTocLevel:                         "محدود کردن به سطح {n}",
    tipHdrTocCollapse:                      "جمع کردن",
    tipHdrTocExpand:                        "گسترش",
    tipHdrStyleTemplate:                    "یک سبک پیش‌نمایش Markdown انتخاب کنید",
    tipHdrFontHeading:                      "سرتیتر",
    tipHdrFontBody:                         "متن",
    tipHdrFontCode:                         "کد",
    tipHdrSettings:                         "باز کردن تنظیمات",
    tipHdrHelp:                             "راهنما",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "تنظیمات",
    tabDlgSettingsDisplay:                  "نمایش",
    tabDlgSettingsAbout:                    "درباره",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "زبان",
    lblDlgSettingsDisplayTheme:             "پوسته",
    btnDlgSettingsDisplayThemeDark:         "تاریک",
    btnDlgSettingsDisplayThemeLight:        "روشن",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "فایل‌های Markdown را ویرایش و پیش‌نمایش کنید.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "تغییرات ذخیره‌نشده -",
    btnDlgUnsavedDiscard:                   "رد کردن",
    cfmDlgUnsavedReload:                    "بارگذاری مجدد؟ تغییرات از دست خواهند رفت",
    btnDlgUnsavedReload:                    "بارگذاری مجدد",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  zh_CN: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下载",
    lnkUpdateSkip:                          "跳过此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "在此打开或拖放 Markdown 文件以查看/编辑。",
    empAppDropFile:                         "将 Markdown 文件拖放到此处",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "打开 Markdown 文件",
    ttlOsdSaveMd:                           "保存 Markdown 文件",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "新建文档",
    tipHdrOpen:                             "打开 Markdown 文件",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "保存",
    tipHdrSave:                             "保存",
    tipHdrSaveAs:                           "另存为",
    tipHdrConvertFormat:                    "转换为其他格式",
    lblHdrConvertTo:                        "转换为",
    ttlHdrConvertSave:                      "保存已转换文档",
    tipHdrPrint:                            "打印",
    tipHdrSaveHtml:                         "保存为 HTML",
    ttlHdrSaveHtml:                         "保存为 HTML",
    tipHdrSavePdf:                          "保存为 PDF",
    ttlHdrSavePdf:                          "保存为 PDF",
    tipHdrZoomOut:                          "缩小字体",
    tipHdrZoomIn:                           "放大字体",
    tipHdrModeSplit:                        "分屏视图",
    tipHdrShowEditor:                       "显示编辑器",
    tipHdrViewRender:                       "显示预览",
    tipHdrToc:                              "目录",
    tipHdrTocLevel:                         "限制到级别 {n}",
    tipHdrTocCollapse:                      "折叠",
    tipHdrTocExpand:                        "展开",
    tipHdrStyleTemplate:                    "选择 Markdown 预览样式",
    tipHdrFontHeading:                      "标题",
    tipHdrFontBody:                         "正文",
    tipHdrFontCode:                         "代码",
    tipHdrSettings:                         "打开设置",
    tipHdrHelp:                             "帮助",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "设置",
    tabDlgSettingsDisplay:                  "显示",
    tabDlgSettingsAbout:                    "关于",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "语言",
    lblDlgSettingsDisplayTheme:             "主题",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "浅色",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "编辑并预览 Markdown 文件。",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "未保存的更改 -",
    btnDlgUnsavedDiscard:                   "放弃",
    cfmDlgUnsavedReload:                    "重新加载？更改将丢失",
    btnDlgUnsavedReload:                    "重新加载",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  zh_TW: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "取消",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下載",
    lnkUpdateSkip:                          "跳過此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "在此開啟或拖放 Markdown 檔案以檢視/編輯。",
    empAppDropFile:                         "將 Markdown 檔案拖放到此處",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "開啟 Markdown 檔案",
    ttlOsdSaveMd:                           "儲存 Markdown 檔案",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "新增文件",
    tipHdrOpen:                             "開啟 Markdown 檔案",
    lblHdrNewDoc:                           "新增",
    btnHdrSave:                             "儲存",
    tipHdrSave:                             "儲存",
    tipHdrSaveAs:                           "另存新檔",
    tipHdrConvertFormat:                    "轉換為其他格式",
    lblHdrConvertTo:                        "轉換為",
    ttlHdrConvertSave:                      "儲存已轉換文件",
    tipHdrPrint:                            "列印",
    tipHdrSaveHtml:                         "儲存為 HTML",
    ttlHdrSaveHtml:                         "儲存為 HTML",
    tipHdrSavePdf:                          "儲存為 PDF",
    ttlHdrSavePdf:                          "儲存為 PDF",
    tipHdrZoomOut:                          "縮小字體",
    tipHdrZoomIn:                           "放大字體",
    tipHdrModeSplit:                        "分割畫面",
    tipHdrShowEditor:                       "顯示編輯器",
    tipHdrViewRender:                       "顯示預覽",
    tipHdrToc:                              "目錄",
    tipHdrTocLevel:                         "限制為級別 {n}",
    tipHdrTocCollapse:                      "收合",
    tipHdrTocExpand:                        "展開",
    tipHdrStyleTemplate:                    "選取 Markdown 預覽樣式",
    tipHdrFontHeading:                      "標題",
    tipHdrFontBody:                         "內文",
    tipHdrFontCode:                         "程式碼",
    tipHdrSettings:                         "開啟設定",
    tipHdrHelp:                             "說明",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "顯示",
    tabDlgSettingsAbout:                    "關於",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "語言",
    lblDlgSettingsDisplayTheme:             "主題",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "淺色",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "編輯並預覽 Markdown 檔案。",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "未儲存的變更 -",
    btnDlgUnsavedDiscard:                   "放棄",
    cfmDlgUnsavedReload:                    "重新載入？變更將遺失",
    btnDlgUnsavedReload:                    "重新載入",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "寬",
    lblImagePropsHeight:                    "高",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "套用",
    tipImagePropsClear:                     "清除",
    btnImagePropsRemoveStyle:               "移除樣式區塊",

  },

  ja: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新しいバージョンが利用可能です:",
    lnkUpdateWhatsNew:                      "新機能",
    btnUpdateDownload:                      "ダウンロード",
    lnkUpdateSkip:                          "このバージョンをスキップ",
    tipUpdateDismiss:                       "閉じる",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Markdown ファイルをここで開くかドロップして表示/編集します。",
    empAppDropFile:                         "Markdown ファイルをここにドロップ",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown ファイルを開く",
    ttlOsdSaveMd:                           "Markdown ファイルを保存",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "新規ドキュメント",
    tipHdrOpen:                             "Markdown ファイルを開く",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "保存",
    tipHdrSave:                             "保存",
    tipHdrSaveAs:                           "名前を付けて保存",
    tipHdrConvertFormat:                    "別の形式に変換",
    lblHdrConvertTo:                        "変換先",
    ttlHdrConvertSave:                      "変換済みドキュメントを保存",
    tipHdrPrint:                            "印刷",
    tipHdrSaveHtml:                         "HTMLとして保存",
    ttlHdrSaveHtml:                         "HTMLとして保存",
    tipHdrSavePdf:                          "PDFとして保存",
    ttlHdrSavePdf:                          "PDFとして保存",
    tipHdrZoomOut:                          "文字を小さく",
    tipHdrZoomIn:                           "文字を大きく",
    tipHdrModeSplit:                        "分割ビュー",
    tipHdrShowEditor:                       "エディタを表示",
    tipHdrViewRender:                       "プレビューを表示",
    tipHdrToc:                              "目次",
    tipHdrTocLevel:                         "レベル {n} に制限",
    tipHdrTocCollapse:                      "折りたたむ",
    tipHdrTocExpand:                        "展開",
    tipHdrStyleTemplate:                    "Markdown プレビューのスタイルを選択",
    tipHdrFontHeading:                      "見出し",
    tipHdrFontBody:                         "本文",
    tipHdrFontCode:                         "コード",
    tipHdrSettings:                         "設定を開く",
    tipHdrHelp:                             "ヘルプ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "表示",
    tabDlgSettingsAbout:                    "概要",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "言語",
    lblDlgSettingsDisplayTheme:             "テーマ",
    btnDlgSettingsDisplayThemeDark:         "ダーク",
    btnDlgSettingsDisplayThemeLight:        "ライト",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown ファイルを編集・プレビューします。",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "未保存の変更 -",
    btnDlgUnsavedDiscard:                   "破棄",
    cfmDlgUnsavedReload:                    "再読み込み？変更は失われます",
    btnDlgUnsavedReload:                    "再読み込み",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ko: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "새 버전 사용 가능:",
    lnkUpdateWhatsNew:                      "새로운 기능",
    btnUpdateDownload:                      "다운로드",
    lnkUpdateSkip:                          "이 버전 건너뛰기",
    tipUpdateDismiss:                       "닫기",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Markdown 파일을 여기서 열거나 드롭하여 보기/편집하세요.",
    empAppDropFile:                         "여기에 Markdown 파일을 놓으세요",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown 파일 열기",
    ttlOsdSaveMd:                           "Markdown 파일 저장",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "새 문서",
    tipHdrOpen:                             "Markdown 파일 열기",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "저장",
    tipHdrSave:                             "저장",
    tipHdrSaveAs:                           "다른 이름으로 저장",
    tipHdrConvertFormat:                    "다른 형식으로 변환",
    lblHdrConvertTo:                        "변환:",
    ttlHdrConvertSave:                      "변환된 문서 저장",
    tipHdrPrint:                            "인쇄",
    tipHdrSaveHtml:                         "HTML로 저장",
    ttlHdrSaveHtml:                         "HTML로 저장",
    tipHdrSavePdf:                          "PDF로 저장",
    ttlHdrSavePdf:                          "PDF로 저장",
    tipHdrZoomOut:                          "글자 작게",
    tipHdrZoomIn:                           "글자 크게",
    tipHdrModeSplit:                        "분할 보기",
    tipHdrShowEditor:                       "편집기 표시",
    tipHdrViewRender:                       "미리보기 표시",
    tipHdrToc:                              "목차",
    tipHdrTocLevel:                         "레벨 {n}으로 제한",
    tipHdrTocCollapse:                      "접기",
    tipHdrTocExpand:                        "펼치기",
    tipHdrStyleTemplate:                    "Markdown 미리보기 스타일 선택",
    tipHdrFontHeading:                      "제목",
    tipHdrFontBody:                         "본문",
    tipHdrFontCode:                         "코드",
    tipHdrSettings:                         "설정 열기",
    tipHdrHelp:                             "도움말",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "설정",
    tabDlgSettingsDisplay:                  "표시",
    tabDlgSettingsAbout:                    "정보",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "언어",
    lblDlgSettingsDisplayTheme:             "테마",
    btnDlgSettingsDisplayThemeDark:         "어둡게",
    btnDlgSettingsDisplayThemeLight:        "밝게",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown 파일을 편집하고 미리 봅니다.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "저장되지 않은 변경 사항 -",
    btnDlgUnsavedDiscard:                   "삭제",
    cfmDlgUnsavedReload:                    "다시 로드? 변경 사항이 손실됩니다",
    btnDlgUnsavedReload:                    "다시 로드",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  vi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Phiên bản mới có sẵn:",
    lnkUpdateWhatsNew:                      "Có gì mới",
    btnUpdateDownload:                      "Tải xuống",
    lnkUpdateSkip:                          "Bỏ qua phiên bản này",
    tipUpdateDismiss:                       "Bỏ qua",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Mở hoặc thả tệp Markdown vào đây để xem/chỉnh sửa.",
    empAppDropFile:                         "Thả tệp Markdown vào đây",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Mở tệp Markdown",
    ttlOsdSaveMd:                           "Lưu tệp Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Tài liệu mới",
    tipHdrOpen:                             "Mở tệp Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Lưu",
    tipHdrSave:                             "Lưu",
    tipHdrSaveAs:                           "Lưu dưới dạng",
    tipHdrConvertFormat:                    "Chuyển đổi sang định dạng khác",
    lblHdrConvertTo:                        "Chuyển đổi sang",
    ttlHdrConvertSave:                      "Lưu tài liệu đã chuyển đổi",
    tipHdrPrint:                            "In",
    tipHdrSaveHtml:                         "Lưu dưới dạng HTML",
    ttlHdrSaveHtml:                         "Lưu dưới dạng HTML",
    tipHdrSavePdf:                          "Lưu dưới dạng PDF",
    ttlHdrSavePdf:                          "Lưu dưới dạng PDF",
    tipHdrZoomOut:                          "Thu nhỏ chữ",
    tipHdrZoomIn:                           "Phóng to chữ",
    tipHdrModeSplit:                        "Chế độ xem chia đôi",
    tipHdrShowEditor:                       "Hiện trình soạn thảo",
    tipHdrViewRender:                       "Hiện bản xem trước",
    tipHdrToc:                              "Mục lục",
    tipHdrTocLevel:                         "Giới hạn ở cấp {n}",
    tipHdrTocCollapse:                      "Thu gọn",
    tipHdrTocExpand:                        "Mở rộng",
    tipHdrStyleTemplate:                    "Chọn phong cách xem trước Markdown",
    tipHdrFontHeading:                      "Tiêu đề",
    tipHdrFontBody:                         "Thân bài",
    tipHdrFontCode:                         "Mã",
    tipHdrSettings:                         "Mở cài đặt",
    tipHdrHelp:                             "Trợ giúp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Cài đặt",
    tabDlgSettingsDisplay:                  "Hiển thị",
    tabDlgSettingsAbout:                    "Giới thiệu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Ngôn ngữ",
    lblDlgSettingsDisplayTheme:             "Giao diện",
    btnDlgSettingsDisplayThemeDark:         "Tối",
    btnDlgSettingsDisplayThemeLight:        "Sáng",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "chỉnh sửa và xem trước tệp Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Thay đổi chưa lưu -",
    btnDlgUnsavedDiscard:                   "Bỏ qua",
    cfmDlgUnsavedReload:                    "Tải lại? Các thay đổi sẽ bị mất",
    btnDlgUnsavedReload:                    "Tải lại",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  th: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "มีเวอร์ชันใหม่:",
    lnkUpdateWhatsNew:                      "มีอะไรใหม่",
    btnUpdateDownload:                      "ดาวน์โหลด",
    lnkUpdateSkip:                          "ข้ามเวอร์ชันนี้",
    tipUpdateDismiss:                       "ปิด",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "เปิดหรือวางไฟล์ Markdown ที่นี่เพื่อดู/แก้ไข",
    empAppDropFile:                         "วางไฟล์ Markdown ที่นี่",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "เปิดไฟล์ Markdown",
    ttlOsdSaveMd:                           "บันทึกไฟล์ Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "เอกสารใหม่",
    tipHdrOpen:                             "เปิดไฟล์ Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "บันทึก",
    tipHdrSave:                             "บันทึก",
    tipHdrSaveAs:                           "บันทึกเป็น",
    tipHdrConvertFormat:                    "แปลงเป็นรูปแบบอื่น",
    lblHdrConvertTo:                        "แปลงเป็น",
    ttlHdrConvertSave:                      "บันทึกเอกสารที่แปลงแล้ว",
    tipHdrPrint:                            "พิมพ์",
    tipHdrSaveHtml:                         "บันทึกเป็น HTML",
    ttlHdrSaveHtml:                         "บันทึกเป็น HTML",
    tipHdrSavePdf:                          "บันทึกเป็น PDF",
    ttlHdrSavePdf:                          "บันทึกเป็น PDF",
    tipHdrZoomOut:                          "ย่อตัวอักษร",
    tipHdrZoomIn:                           "ขยายตัวอักษร",
    tipHdrModeSplit:                        "มุมมองแบบแบ่ง",
    tipHdrShowEditor:                       "แสดงตัวแก้ไข",
    tipHdrViewRender:                       "แสดงตัวอย่าง",
    tipHdrToc:                              "สารบัญ",
    tipHdrTocLevel:                         "จำกัดที่ระดับ {n}",
    tipHdrTocCollapse:                      "ยุบ",
    tipHdrTocExpand:                        "ขยาย",
    tipHdrStyleTemplate:                    "เลือกสไตล์ตัวอย่าง Markdown",
    tipHdrFontHeading:                      "หัวข้อ",
    tipHdrFontBody:                         "เนื้อหา",
    tipHdrFontCode:                         "โค้ด",
    tipHdrSettings:                         "เปิดการตั้งค่า",
    tipHdrHelp:                             "ช่วยเหลือ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "การตั้งค่า",
    tabDlgSettingsDisplay:                  "แสดงผล",
    tabDlgSettingsAbout:                    "เกี่ยวกับ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ภาษา",
    lblDlgSettingsDisplayTheme:             "ธีม",
    btnDlgSettingsDisplayThemeDark:         "มืด",
    btnDlgSettingsDisplayThemeLight:        "สว่าง",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "แก้ไขและดูตัวอย่างไฟล์ Markdown",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "การเปลี่ยนแปลงที่ยังไม่ได้บันทึก -",
    btnDlgUnsavedDiscard:                   "ยกเลิก",
    cfmDlgUnsavedReload:                    "โหลดใหม่? การเปลี่ยนแปลงจะสูญหาย",
    btnDlgUnsavedReload:                    "โหลดใหม่",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  id: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baru tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baru",
    btnUpdateDownload:                      "Unduh",
    lnkUpdateSkip:                          "Lewati versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Buka atau lepaskan file Markdown di sini untuk melihat/mengeditnya.",
    empAppDropFile:                         "Letakkan file Markdown di sini",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Buka file Markdown",
    ttlOsdSaveMd:                           "Simpan file Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Dokumen baru",
    tipHdrOpen:                             "Buka file Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Simpan",
    tipHdrSave:                             "Simpan",
    tipHdrSaveAs:                           "Simpan sebagai",
    tipHdrConvertFormat:                    "Konversi ke format lain",
    lblHdrConvertTo:                        "Konversi ke",
    ttlHdrConvertSave:                      "Simpan dokumen yang dikonversi",
    tipHdrPrint:                            "Cetak",
    tipHdrSaveHtml:                         "Simpan sebagai HTML",
    ttlHdrSaveHtml:                         "Simpan sebagai HTML",
    tipHdrSavePdf:                          "Simpan sebagai PDF",
    ttlHdrSavePdf:                          "Simpan sebagai PDF",
    tipHdrZoomOut:                          "Perkecil teks",
    tipHdrZoomIn:                           "Perbesar teks",
    tipHdrModeSplit:                        "Tampilan terpisah",
    tipHdrShowEditor:                       "Tampilkan editor",
    tipHdrViewRender:                       "Tampilkan pratinjau",
    tipHdrToc:                              "Daftar isi",
    tipHdrTocLevel:                         "Batasi hingga level {n}",
    tipHdrTocCollapse:                      "Ciutkan",
    tipHdrTocExpand:                        "Perluas",
    tipHdrStyleTemplate:                    "Pilih gaya pratinjau Markdown",
    tipHdrFontHeading:                      "Judul",
    tipHdrFontBody:                         "Teks",
    tipHdrFontCode:                         "Kode",
    tipHdrSettings:                         "Buka pengaturan",
    tipHdrHelp:                             "Bantuan",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Pengaturan",
    tabDlgSettingsDisplay:                  "Tampilan",
    tabDlgSettingsAbout:                    "Tentang",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Terang",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edit dan pratinjau file Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Perubahan belum disimpan -",
    btnDlgUnsavedDiscard:                   "Buang",
    cfmDlgUnsavedReload:                    "Muat ulang? Perubahan akan hilang",
    btnDlgUnsavedReload:                    "Muat ulang",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ca: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versió disponible:",
    lnkUpdateWhatsNew:                      "Novetats",
    btnUpdateDownload:                      "Baixa",
    lnkUpdateSkip:                          "Omet aquesta versió",
    tipUpdateDismiss:                       "Descarta",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Obre o deixa anar un fitxer Markdown aquí per visualitzar-lo/editar-lo.",
    empAppDropFile:                         "Deixa anar un fitxer Markdown aquí",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Obre un fitxer Markdown",
    ttlOsdSaveMd:                           "Desa el fitxer Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nou document",
    tipHdrOpen:                             "Obrir un fitxer Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Desa",
    tipHdrSave:                             "Desa",
    tipHdrSaveAs:                           "Desa com a",
    tipHdrConvertFormat:                    "Converteix a un altre format",
    lblHdrConvertTo:                        "Converteix a",
    ttlHdrConvertSave:                      "Desa el document convertit",
    tipHdrPrint:                            "Imprimeix",
    tipHdrSaveHtml:                         "Desa com a HTML",
    ttlHdrSaveHtml:                         "Desa com a HTML",
    tipHdrSavePdf:                          "Desa com a PDF",
    ttlHdrSavePdf:                          "Desa com a PDF",
    tipHdrZoomOut:                          "Reduir la mida del text",
    tipHdrZoomIn:                           "Augmentar la mida del text",
    tipHdrModeSplit:                        "Vista dividida",
    tipHdrShowEditor:                       "Mostra l'editor",
    tipHdrViewRender:                       "Mostra la previsualització",
    tipHdrToc:                              "Taula de continguts",
    tipHdrTocLevel:                         "Limita al nivell {n}",
    tipHdrTocCollapse:                      "Replega",
    tipHdrTocExpand:                        "Desplega",
    tipHdrStyleTemplate:                    "Trieu un estil de previsualització de Markdown",
    tipHdrFontHeading:                      "Capçalera",
    tipHdrFontBody:                         "Cos",
    tipHdrFontCode:                         "Codi",
    tipHdrSettings:                         "Obre la configuració",
    tipHdrHelp:                             "Ajuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuració",
    tabDlgSettingsDisplay:                  "Pantalla",
    tabDlgSettingsAbout:                    "Quant a",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Fosc",
    btnDlgSettingsDisplayThemeLight:        "Clar",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "editeu i previsualitzeu fitxers Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Canvis no desats -",
    btnDlgUnsavedDiscard:                   "Descarta",
    cfmDlgUnsavedReload:                    "Recarregar? Els canvis es perdran",
    btnDlgUnsavedReload:                    "Recarregar",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  cs: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nová verze je k dispozici:",
    lnkUpdateWhatsNew:                      "Co je nového",
    btnUpdateDownload:                      "Stáhnout",
    lnkUpdateSkip:                          "Přeskočit tuto verzi",
    tipUpdateDismiss:                       "Zavřít",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Otevřete nebo přetáhněte soubor Markdown sem pro zobrazení/úpravu.",
    empAppDropFile:                         "Přetáhněte soubor Markdown sem",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Otevřít soubor Markdown",
    ttlOsdSaveMd:                           "Uložit soubor Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nový dokument",
    tipHdrOpen:                             "Otevřít soubor Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Uložit",
    tipHdrSave:                             "Uložit",
    tipHdrSaveAs:                           "Uložit jako",
    tipHdrConvertFormat:                    "Převést do jiného formátu",
    lblHdrConvertTo:                        "Převést do",
    ttlHdrConvertSave:                      "Uložit převedený dokument",
    tipHdrPrint:                            "Tisk",
    tipHdrSaveHtml:                         "Uložit jako HTML",
    ttlHdrSaveHtml:                         "Uložit jako HTML",
    tipHdrSavePdf:                          "Uložit jako PDF",
    ttlHdrSavePdf:                          "Uložit jako PDF",
    tipHdrZoomOut:                          "Zmenšit text",
    tipHdrZoomIn:                           "Zvětšit text",
    tipHdrModeSplit:                        "Rozdělené zobrazení",
    tipHdrShowEditor:                       "Zobrazit editor",
    tipHdrViewRender:                       "Zobrazit náhled",
    tipHdrToc:                              "Obsah",
    tipHdrTocLevel:                         "Omezit na úroveň {n}",
    tipHdrTocCollapse:                      "Sbalit",
    tipHdrTocExpand:                        "Rozbalit",
    tipHdrStyleTemplate:                    "Vyberte styl náhledu Markdown",
    tipHdrFontHeading:                      "Nadpis",
    tipHdrFontBody:                         "Tělo",
    tipHdrFontCode:                         "Kód",
    tipHdrSettings:                         "Otevřít nastavení",
    tipHdrHelp:                             "Nápověda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavení",
    tabDlgSettingsDisplay:                  "Zobrazení",
    tabDlgSettingsAbout:                    "O aplikaci",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jazyk",
    lblDlgSettingsDisplayTheme:             "Motiv",
    btnDlgSettingsDisplayThemeDark:         "Tmavý",
    btnDlgSettingsDisplayThemeLight:        "Světlý",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "upravujte a zobrazujte soubory Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Neuložené změny -",
    btnDlgUnsavedDiscard:                   "Zahodit",
    cfmDlgUnsavedReload:                    "Znovu načíst? Změny budou ztraceny",
    btnDlgUnsavedReload:                    "Znovu načíst",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  da: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tilgængelig:",
    lnkUpdateWhatsNew:                      "Hvad er nyt",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Spring denne version over",
    tipUpdateDismiss:                       "Afvis",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Åbn eller slip en Markdown-fil her for at se/redigere den.",
    empAppDropFile:                         "Slip en Markdown-fil her",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Åbn Markdown-fil",
    ttlOsdSaveMd:                           "Gem Markdown-fil",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nyt dokument",
    tipHdrOpen:                             "Åbn en Markdown-fil",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Gem",
    tipHdrSave:                             "Gem",
    tipHdrSaveAs:                           "Gem som",
    tipHdrConvertFormat:                    "Konverter til andet format",
    lblHdrConvertTo:                        "Konverter til",
    ttlHdrConvertSave:                      "Gem konverteret dokument",
    tipHdrPrint:                            "Udskriv",
    tipHdrSaveHtml:                         "Gem som HTML",
    ttlHdrSaveHtml:                         "Gem som HTML",
    tipHdrSavePdf:                          "Gem som PDF",
    ttlHdrSavePdf:                          "Gem som PDF",
    tipHdrZoomOut:                          "Reducer tekststørrelse",
    tipHdrZoomIn:                           "Øg tekststørrelse",
    tipHdrModeSplit:                        "Delt visning",
    tipHdrShowEditor:                       "Vis editor",
    tipHdrViewRender:                       "Vis forhåndsvisning",
    tipHdrToc:                              "Indholdsfortegnelse",
    tipHdrTocLevel:                         "Begræns til niveau {n}",
    tipHdrTocCollapse:                      "Fold sammen",
    tipHdrTocExpand:                        "Fold ud",
    tipHdrStyleTemplate:                    "Vælg en Markdown-forhåndsvisningsstil",
    tipHdrFontHeading:                      "Overskrift",
    tipHdrFontBody:                         "Brødtekst",
    tipHdrFontCode:                         "Kode",
    tipHdrSettings:                         "Åbn indstillinger",
    tipHdrHelp:                             "Hjælp",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Indstillinger",
    tabDlgSettingsDisplay:                  "Visning",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Sprog",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mørkt",
    btnDlgSettingsDisplayThemeLight:        "Lyst",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "rediger og forhåndsvis Markdown-filer.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Ugemte ændringer -",
    btnDlgUnsavedDiscard:                   "Kassér",
    cfmDlgUnsavedReload:                    "Genindlæs? Ændringer mistes",
    btnDlgUnsavedReload:                    "Genindlæs",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  fi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Uusi versio saatavilla:",
    lnkUpdateWhatsNew:                      "Mitä uutta",
    btnUpdateDownload:                      "Lataa",
    lnkUpdateSkip:                          "Ohita tämä versio",
    tipUpdateDismiss:                       "Hylkää",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Avaa tai pudota Markdown-tiedosto tähän nähdäksesi/muokataksesi sitä.",
    empAppDropFile:                         "Pudota Markdown-tiedosto tähän",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Avaa Markdown-tiedosto",
    ttlOsdSaveMd:                           "Tallenna Markdown-tiedosto",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Uusi asiakirja",
    tipHdrOpen:                             "Avaa Markdown-tiedosto",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Tallenna",
    tipHdrSave:                             "Tallenna",
    tipHdrSaveAs:                           "Tallenna nimellä",
    tipHdrConvertFormat:                    "Muunna toiseen muotoon",
    lblHdrConvertTo:                        "Muunna muotoon",
    ttlHdrConvertSave:                      "Tallenna muunnettu asiakirja",
    tipHdrPrint:                            "Tulosta",
    tipHdrSaveHtml:                         "Tallenna HTML-muodossa",
    ttlHdrSaveHtml:                         "Tallenna HTML-muodossa",
    tipHdrSavePdf:                          "Tallenna PDF-muodossa",
    ttlHdrSavePdf:                          "Tallenna PDF-muodossa",
    tipHdrZoomOut:                          "Pienennä tekstiä",
    tipHdrZoomIn:                           "Suurenna tekstiä",
    tipHdrModeSplit:                        "Jaettu näkymä",
    tipHdrShowEditor:                       "Näytä editori",
    tipHdrViewRender:                       "Näytä esikatselu",
    tipHdrToc:                              "Sisällysluettelo",
    tipHdrTocLevel:                         "Rajoita tasoon {n}",
    tipHdrTocCollapse:                      "Tiivistä",
    tipHdrTocExpand:                        "Laajenna",
    tipHdrStyleTemplate:                    "Valitse Markdown-esikatselutyyli",
    tipHdrFontHeading:                      "Otsikko",
    tipHdrFontBody:                         "Leipäteksti",
    tipHdrFontCode:                         "Koodi",
    tipHdrSettings:                         "Avaa asetukset",
    tipHdrHelp:                             "Ohje",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Asetukset",
    tabDlgSettingsDisplay:                  "Näyttö",
    tabDlgSettingsAbout:                    "Tietoja",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Kieli",
    lblDlgSettingsDisplayTheme:             "Teema",
    btnDlgSettingsDisplayThemeDark:         "Tumma",
    btnDlgSettingsDisplayThemeLight:        "Vaalea",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "muokkaa ja esikatsele Markdown-tiedostoja.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Tallentamattomat muutokset -",
    btnDlgUnsavedDiscard:                   "Hylkää",
    cfmDlgUnsavedReload:                    "Lataa uudelleen? Muutokset menetetään",
    btnDlgUnsavedReload:                    "Lataa uudelleen",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ms: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baharu tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baharu",
    btnUpdateDownload:                      "Muat turun",
    lnkUpdateSkip:                          "Langkau versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Buka atau lepaskan fail Markdown di sini untuk melihat/mengeditnya.",
    empAppDropFile:                         "Lepaskan fail Markdown di sini",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Buka fail Markdown",
    ttlOsdSaveMd:                           "Simpan fail Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Dokumen baharu",
    tipHdrOpen:                             "Buka fail Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Simpan",
    tipHdrSave:                             "Simpan",
    tipHdrSaveAs:                           "Simpan sebagai",
    tipHdrConvertFormat:                    "Tukar ke format lain",
    lblHdrConvertTo:                        "Tukar ke",
    ttlHdrConvertSave:                      "Simpan dokumen yang ditukar",
    tipHdrPrint:                            "Cetak",
    tipHdrSaveHtml:                         "Simpan sebagai HTML",
    ttlHdrSaveHtml:                         "Simpan sebagai HTML",
    tipHdrSavePdf:                          "Simpan sebagai PDF",
    ttlHdrSavePdf:                          "Simpan sebagai PDF",
    tipHdrZoomOut:                          "Kecilkan teks",
    tipHdrZoomIn:                           "Besarkan teks",
    tipHdrModeSplit:                        "Paparan dibahagikan",
    tipHdrShowEditor:                       "Tunjukkan editor",
    tipHdrViewRender:                       "Tunjukkan pratonton",
    tipHdrToc:                              "Jadual kandungan",
    tipHdrTocLevel:                         "Hadkan kepada tahap {n}",
    tipHdrTocCollapse:                      "Runtuhkan",
    tipHdrTocExpand:                        "Kembangkan",
    tipHdrStyleTemplate:                    "Pilih gaya pratonton Markdown",
    tipHdrFontHeading:                      "Tajuk",
    tipHdrFontBody:                         "Teks",
    tipHdrFontCode:                         "Kod",
    tipHdrSettings:                         "Buka tetapan",
    tipHdrHelp:                             "Bantuan",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Tetapan",
    tabDlgSettingsDisplay:                  "Paparan",
    tabDlgSettingsAbout:                    "Tentang",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Cerah",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edit dan pratonton fail Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Perubahan belum disimpan -",
    btnDlgUnsavedDiscard:                   "Buang",
    cfmDlgUnsavedReload:                    "Muat semula? Perubahan akan hilang",
    btnDlgUnsavedReload:                    "Muat semula",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  hy: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Նոր տարբերակ հասանելի է:",
    lnkUpdateWhatsNew:                      "Ինչ նորություն կա",
    btnUpdateDownload:                      "Ներբեռնել",
    lnkUpdateSkip:                          "Բաց թողնել այս տարբերակը",
    tipUpdateDismiss:                       "Մերժել",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Բացեք կամ գցեք Markdown ֆայլ այստեղ՝ դիտելու/խմբագրելու համար։",
    empAppDropFile:                         "Գցեք Markdown ֆայլ այստեղ",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Բացել Markdown ֆայլ",
    ttlOsdSaveMd:                           "Պահպանել Markdown ֆայլ",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Նոր փաստաթուղթ",
    tipHdrOpen:                             "Բացել Markdown ֆայլ",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Պահպանել",
    tipHdrSave:                             "Պահպանել",
    tipHdrSaveAs:                           "Պահպանել որպես",
    tipHdrConvertFormat:                    "Փոխակերպել այլ ձևաչափի",
    lblHdrConvertTo:                        "Փոխակերպել",
    ttlHdrConvertSave:                      "Պահպանել փոխակերպված փաստաթուղթը",
    tipHdrPrint:                            "Տպել",
    tipHdrSaveHtml:                         "Պահպանել որպես HTML",
    ttlHdrSaveHtml:                         "Պահպանել որպես HTML",
    tipHdrSavePdf:                          "Պահպանել որպես PDF",
    ttlHdrSavePdf:                          "Պահպանել որպես PDF",
    tipHdrZoomOut:                          "Փոքրացնել տառատեսակը",
    tipHdrZoomIn:                           "Մեծացնել տառատեսակը",
    tipHdrModeSplit:                        "Բաժանված տեսք",
    tipHdrShowEditor:                       "Ցուցադրել խմբագիրը",
    tipHdrViewRender:                       "Ցուցադրել նախադիտումը",
    tipHdrToc:                              "Բովանդակության աղյուսակ",
    tipHdrTocLevel:                         "Սահմանափակել մինչև մակարդակ {n}",
    tipHdrTocCollapse:                      "Ծալել",
    tipHdrTocExpand:                        "Ընդլայնել",
    tipHdrStyleTemplate:                    "Ընտրեք Markdown նախադիտման ոճ",
    tipHdrFontHeading:                      "Վերնագիր",
    tipHdrFontBody:                         "Հիմնական",
    tipHdrFontCode:                         "Կոդ",
    tipHdrSettings:                         "Բացել կարգավորումները",
    tipHdrHelp:                             "Օգնություն",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Կարգավորումներ",
    tabDlgSettingsDisplay:                  "Ցուցադրում",
    tabDlgSettingsAbout:                    "Մասին",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Լեզու",
    lblDlgSettingsDisplayTheme:             "Թեմա",
    btnDlgSettingsDisplayThemeDark:         "Մուգ",
    btnDlgSettingsDisplayThemeLight:        "Բաց",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "խմբագրեք և դիտեք Markdown ֆայլեր։",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Չպահպանված փոփոխություններ -",
    btnDlgUnsavedDiscard:                   "Մերժել",
    cfmDlgUnsavedReload:                    "Վերաբեռնե՞լ։ Փոփոխությունները կկորչեն",
    btnDlgUnsavedReload:                    "Վերաբեռնել",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  bg: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Налична е нова версия:",
    lnkUpdateWhatsNew:                      "Какво ново",
    btnUpdateDownload:                      "Изтегли",
    lnkUpdateSkip:                          "Пропусни тази версия",
    tipUpdateDismiss:                       "Отхвърли",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Отворете или пуснете Markdown файл тук, за да го прегледате/редактирате.",
    empAppDropFile:                         "Пуснете Markdown файл тук",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Отвори Markdown файл",
    ttlOsdSaveMd:                           "Запази Markdown файл",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Нов документ",
    tipHdrOpen:                             "Отвори Markdown файл",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Запази",
    tipHdrSave:                             "Запази",
    tipHdrSaveAs:                           "Запази като",
    tipHdrConvertFormat:                    "Конвертирай в друг формат",
    lblHdrConvertTo:                        "Конвертирай в",
    ttlHdrConvertSave:                      "Запази конвертирания документ",
    tipHdrPrint:                            "Печат",
    tipHdrSaveHtml:                         "Запази като HTML",
    ttlHdrSaveHtml:                         "Запази като HTML",
    tipHdrSavePdf:                          "Запази като PDF",
    ttlHdrSavePdf:                          "Запази като PDF",
    tipHdrZoomOut:                          "Намали шрифта",
    tipHdrZoomIn:                           "Увеличи шрифта",
    tipHdrModeSplit:                        "Разделен изглед",
    tipHdrShowEditor:                       "Покажи редактора",
    tipHdrViewRender:                       "Покажи предварителен преглед",
    tipHdrToc:                              "Съдържание",
    tipHdrTocLevel:                         "Ограничи до ниво {n}",
    tipHdrTocCollapse:                      "Свиване",
    tipHdrTocExpand:                        "Разширяване",
    tipHdrStyleTemplate:                    "Изберете стил за предварителен преглед на Markdown",
    tipHdrFontHeading:                      "Заглавие",
    tipHdrFontBody:                         "Основен",
    tipHdrFontCode:                         "Код",
    tipHdrSettings:                         "Отвори настройките",
    tipHdrHelp:                             "Помощ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Дисплей",
    tabDlgSettingsAbout:                    "За програмата",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Език",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тъмна",
    btnDlgSettingsDisplayThemeLight:        "Светла",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "редактирайте и преглеждайте Markdown файлове.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Незапазени промени -",
    btnDlgUnsavedDiscard:                   "Отхвърли",
    cfmDlgUnsavedReload:                    "Презареждане? Промените ще бъдат изгубени",
    btnDlgUnsavedReload:                    "Презареди",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  gl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versión dispoñible:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Abre ou solta un ficheiro Markdown aquí para velo/editalo.",
    empAppDropFile:                         "Solta un ficheiro Markdown aquí",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Abrir ficheiro Markdown",
    ttlOsdSaveMd:                           "Gardar ficheiro Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Novo documento",
    tipHdrOpen:                             "Abrir un ficheiro Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Gardar",
    tipHdrSave:                             "Gardar",
    tipHdrSaveAs:                           "Gardar como",
    tipHdrConvertFormat:                    "Converter a outro formato",
    lblHdrConvertTo:                        "Converter a",
    ttlHdrConvertSave:                      "Gardar documento convertido",
    tipHdrPrint:                            "Imprimir",
    tipHdrSaveHtml:                         "Gardar como HTML",
    ttlHdrSaveHtml:                         "Gardar como HTML",
    tipHdrSavePdf:                          "Gardar como PDF",
    ttlHdrSavePdf:                          "Gardar como PDF",
    tipHdrZoomOut:                          "Diminuír o tipo de letra",
    tipHdrZoomIn:                           "Aumentar o tipo de letra",
    tipHdrModeSplit:                        "Vista dividida",
    tipHdrShowEditor:                       "Mostrar o editor",
    tipHdrViewRender:                       "Mostrar vista previa",
    tipHdrToc:                              "Táboa de contidos",
    tipHdrTocLevel:                         "Limitar ao nivel {n}",
    tipHdrTocCollapse:                      "Contraer",
    tipHdrTocExpand:                        "Expandir",
    tipHdrStyleTemplate:                    "Escoller un estilo de vista previa de Markdown",
    tipHdrFontHeading:                      "Cabeceira",
    tipHdrFontBody:                         "Corpo",
    tipHdrFontCode:                         "Código",
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Axuda",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Pantalla",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "edita e previsualiza ficheiros Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Cambios sen gardar -",
    btnDlgUnsavedDiscard:                   "Descartar",
    cfmDlgUnsavedReload:                    "Recargar? Os cambios perderanse",
    btnDlgUnsavedReload:                    "Recargar",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  hu: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Új verzió elérhető:",
    lnkUpdateWhatsNew:                      "Újdonságok",
    btnUpdateDownload:                      "Letöltés",
    lnkUpdateSkip:                          "Verzió kihagyása",
    tipUpdateDismiss:                       "Elvetés",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Nyisson meg vagy ejtsen ide egy Markdown fájlt a megtekintéshez/szerkesztéshez.",
    empAppDropFile:                         "Ejtsen ide egy Markdown fájlt",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown fájl megnyitása",
    ttlOsdSaveMd:                           "Markdown fájl mentése",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Új dokumentum",
    tipHdrOpen:                             "Markdown fájl megnyitása",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Mentés",
    tipHdrSave:                             "Mentés",
    tipHdrSaveAs:                           "Mentés másként",
    tipHdrConvertFormat:                    "Konvertálás más formátumba",
    lblHdrConvertTo:                        "Konvertálás",
    ttlHdrConvertSave:                      "Konvertált dokumentum mentése",
    tipHdrPrint:                            "Nyomtatás",
    tipHdrSaveHtml:                         "Mentés HTML-ként",
    ttlHdrSaveHtml:                         "Mentés HTML-ként",
    tipHdrSavePdf:                          "Mentés PDF-ként",
    ttlHdrSavePdf:                          "Mentés PDF-ként",
    tipHdrZoomOut:                          "Betűméret csökkentése",
    tipHdrZoomIn:                           "Betűméret növelése",
    tipHdrModeSplit:                        "Osztott nézet",
    tipHdrShowEditor:                       "Szerkesztő megjelenítése",
    tipHdrViewRender:                       "Előnézet megjelenítése",
    tipHdrToc:                              "Tartalomjegyzék",
    tipHdrTocLevel:                         "Korlátozás {n}. szintre",
    tipHdrTocCollapse:                      "Összecsukás",
    tipHdrTocExpand:                        "Kibontás",
    tipHdrStyleTemplate:                    "Válasszon Markdown előnézeti stílust",
    tipHdrFontHeading:                      "Fejléc",
    tipHdrFontBody:                         "Törzs",
    tipHdrFontCode:                         "Kód",
    tipHdrSettings:                         "Beállítások megnyitása",
    tipHdrHelp:                             "Súgó",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Beállítások",
    tabDlgSettingsDisplay:                  "Megjelenítés",
    tabDlgSettingsAbout:                    "Névjegy",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Nyelv",
    lblDlgSettingsDisplayTheme:             "Téma",
    btnDlgSettingsDisplayThemeDark:         "Sötét",
    btnDlgSettingsDisplayThemeLight:        "Világos",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "szerkessze és tekintse meg a Markdown fájlokat.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Nem mentett változtatások -",
    btnDlgUnsavedDiscard:                   "Elvetés",
    cfmDlgUnsavedReload:                    "Újratöltés? A változtatások elvesznek",
    btnDlgUnsavedReload:                    "Újratöltés",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  lt: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yra nauja versija:",
    lnkUpdateWhatsNew:                      "Kas naujo",
    btnUpdateDownload:                      "Atsisiųsti",
    lnkUpdateSkip:                          "Praleisti šią versiją",
    tipUpdateDismiss:                       "Atmesti",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Atidarykite arba numeskite Markdown failą čia, kad peržiūrėtumėte/redaguotumėte.",
    empAppDropFile:                         "Numeskite Markdown failą čia",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Atidaryti Markdown failą",
    ttlOsdSaveMd:                           "Išsaugoti Markdown failą",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Naujas dokumentas",
    tipHdrOpen:                             "Atidaryti Markdown failą",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Išsaugoti",
    tipHdrSave:                             "Išsaugoti",
    tipHdrSaveAs:                           "Išsaugoti kaip",
    tipHdrConvertFormat:                    "Konvertuoti į kitą formatą",
    lblHdrConvertTo:                        "Konvertuoti į",
    ttlHdrConvertSave:                      "Išsaugoti konvertuotą dokumentą",
    tipHdrPrint:                            "Spausdinti",
    tipHdrSaveHtml:                         "Išsaugoti kaip HTML",
    ttlHdrSaveHtml:                         "Išsaugoti kaip HTML",
    tipHdrSavePdf:                          "Išsaugoti kaip PDF",
    ttlHdrSavePdf:                          "Išsaugoti kaip PDF",
    tipHdrZoomOut:                          "Sumažinti šrifto dydį",
    tipHdrZoomIn:                           "Padidinti šrifto dydį",
    tipHdrModeSplit:                        "Padalintas vaizdas",
    tipHdrShowEditor:                       "Rodyti redaktorių",
    tipHdrViewRender:                       "Rodyti peržiūrą",
    tipHdrToc:                              "Turinys",
    tipHdrTocLevel:                         "Apriboti iki {n} lygio",
    tipHdrTocCollapse:                      "Sutraukti",
    tipHdrTocExpand:                        "Išskleisti",
    tipHdrStyleTemplate:                    "Pasirinkite Markdown peržiūros stilių",
    tipHdrFontHeading:                      "Antraštė",
    tipHdrFontBody:                         "Tekstas",
    tipHdrFontCode:                         "Kodas",
    tipHdrSettings:                         "Atidaryti nustatymus",
    tipHdrHelp:                             "Pagalba",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nustatymai",
    tabDlgSettingsDisplay:                  "Ekranas",
    tabDlgSettingsAbout:                    "Apie",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Kalba",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Tamsi",
    btnDlgSettingsDisplayThemeLight:        "Šviesi",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "redaguokite ir peržiūrėkite Markdown failus.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Neišsaugoti pakeitimai -",
    btnDlgUnsavedDiscard:                   "Atmesti",
    cfmDlgUnsavedReload:                    "Perkrauti? Pakeitimai bus prarasti",
    btnDlgUnsavedReload:                    "Perkrauti",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  mk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Достапна е нова верзија:",
    lnkUpdateWhatsNew:                      "Што е ново",
    btnUpdateDownload:                      "Преземи",
    lnkUpdateSkip:                          "Прескокни ја оваа верзија",
    tipUpdateDismiss:                       "Отфрли",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Отворете или пуштете Markdown датотека овде за да ја прегледате/уредите.",
    empAppDropFile:                         "Пуштете Markdown датотека овде",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Отвори Markdown датотека",
    ttlOsdSaveMd:                           "Зачувај Markdown датотека",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Нов документ",
    tipHdrOpen:                             "Отвори Markdown датотека",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Зачувај",
    tipHdrSave:                             "Зачувај",
    tipHdrSaveAs:                           "Зачувај како",
    tipHdrConvertFormat:                    "Конвертирај во друг формат",
    lblHdrConvertTo:                        "Конвертирај во",
    ttlHdrConvertSave:                      "Зачувај конвертиран документ",
    tipHdrPrint:                            "Печати",
    tipHdrSaveHtml:                         "Зачувај како HTML",
    ttlHdrSaveHtml:                         "Зачувај како HTML",
    tipHdrSavePdf:                          "Зачувај како PDF",
    ttlHdrSavePdf:                          "Зачувај како PDF",
    tipHdrZoomOut:                          "Намали фонт",
    tipHdrZoomIn:                           "Зголеми фонт",
    tipHdrModeSplit:                        "Поделен приказ",
    tipHdrShowEditor:                       "Прикажи едитор",
    tipHdrViewRender:                       "Прикажи преглед",
    tipHdrToc:                              "Содржина",
    tipHdrTocLevel:                         "Ограничи до ниво {n}",
    tipHdrTocCollapse:                      "Собери",
    tipHdrTocExpand:                        "Прошири",
    tipHdrStyleTemplate:                    "Изберете стил за преглед на Markdown",
    tipHdrFontHeading:                      "Наслов",
    tipHdrFontBody:                         "Основен",
    tipHdrFontCode:                         "Код",
    tipHdrSettings:                         "Отвори поставки",
    tipHdrHelp:                             "Помош",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Поставки",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsAbout:                    "За апликацијата",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Јазик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Темна",
    btnDlgSettingsDisplayThemeLight:        "Светла",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "уредувај и прегледај Markdown датотеки.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Незачувани промени -",
    btnDlgUnsavedDiscard:                   "Отфрли",
    cfmDlgUnsavedReload:                    "Повторно вчитување? Промените ќе се изгубат",
    btnDlgUnsavedReload:                    "Повторно вчитај",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  sr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна је нова верзија:",
    lnkUpdateWhatsNew:                      "Шта је ново",
    btnUpdateDownload:                      "Преузми",
    lnkUpdateSkip:                          "Прескочи ову верзију",
    tipUpdateDismiss:                       "Одбаци",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Отворите или превуците Markdown датотеку овде да бисте је прегледали/уредили.",
    empAppDropFile:                         "Превуците Markdown датотеку овде",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Отвори Markdown датотеку",
    ttlOsdSaveMd:                           "Сачувај Markdown датотеку",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Нови документ",
    tipHdrOpen:                             "Отвори Markdown датотеку",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Сачувај",
    tipHdrSave:                             "Сачувај",
    tipHdrSaveAs:                           "Сачувај као",
    tipHdrConvertFormat:                    "Конвертуј у други формат",
    lblHdrConvertTo:                        "Конвертуј у",
    ttlHdrConvertSave:                      "Сачувај конвертовани документ",
    tipHdrPrint:                            "Штампај",
    tipHdrSaveHtml:                         "Сачувај као HTML",
    ttlHdrSaveHtml:                         "Сачувај као HTML",
    tipHdrSavePdf:                          "Сачувај као PDF",
    ttlHdrSavePdf:                          "Сачувај као PDF",
    tipHdrZoomOut:                          "Смањи фонт",
    tipHdrZoomIn:                           "Повећај фонт",
    tipHdrModeSplit:                        "Подељени приказ",
    tipHdrShowEditor:                       "Прикажи едитор",
    tipHdrViewRender:                       "Прикажи преглед",
    tipHdrToc:                              "Садржај",
    tipHdrTocLevel:                         "Ограничи на ниво {n}",
    tipHdrTocCollapse:                      "Сажми",
    tipHdrTocExpand:                        "Прошири",
    tipHdrStyleTemplate:                    "Изаберите стил приказа Markdown-а",
    tipHdrFontHeading:                      "Заглавље",
    tipHdrFontBody:                         "Основни",
    tipHdrFontCode:                         "Код",
    tipHdrSettings:                         "Отвори подешавања",
    tipHdrHelp:                             "Помоћ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Подешавања",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsAbout:                    "О апликацији",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Језик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тамна",
    btnDlgSettingsDisplayThemeLight:        "Светла",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "уређујте и прегледајте Markdown датотеке.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Несачуване измене -",
    btnDlgUnsavedDiscard:                   "Одбаци",
    cfmDlgUnsavedReload:                    "Поново учитати? Измене ће бити изгубљене",
    btnDlgUnsavedReload:                    "Поново учитај",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  sk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "K dispozícii je nová verzia:",
    lnkUpdateWhatsNew:                      "Čo je nové",
    btnUpdateDownload:                      "Stiahnuť",
    lnkUpdateSkip:                          "Preskočiť túto verziu",
    tipUpdateDismiss:                       "Zavrieť",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Otvorte alebo presuňte Markdown súbor sem na zobrazenie/úpravu.",
    empAppDropFile:                         "Presuňte Markdown súbor sem",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Otvoriť Markdown súbor",
    ttlOsdSaveMd:                           "Uložiť Markdown súbor",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nový dokument",
    tipHdrOpen:                             "Otvoriť Markdown súbor",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Uložiť",
    tipHdrSave:                             "Uložiť",
    tipHdrSaveAs:                           "Uložiť ako",
    tipHdrConvertFormat:                    "Konvertovať do iného formátu",
    lblHdrConvertTo:                        "Konvertovať do",
    ttlHdrConvertSave:                      "Uložiť konvertovaný dokument",
    tipHdrPrint:                            "Tlačiť",
    tipHdrSaveHtml:                         "Uložiť ako HTML",
    ttlHdrSaveHtml:                         "Uložiť ako HTML",
    tipHdrSavePdf:                          "Uložiť ako PDF",
    ttlHdrSavePdf:                          "Uložiť ako PDF",
    tipHdrZoomOut:                          "Zmenšiť písmo",
    tipHdrZoomIn:                           "Zväčšiť písmo",
    tipHdrModeSplit:                        "Rozdelený pohľad",
    tipHdrShowEditor:                       "Zobraziť editor",
    tipHdrViewRender:                       "Zobraziť náhľad",
    tipHdrToc:                              "Obsah",
    tipHdrTocLevel:                         "Obmedziť na úroveň {n}",
    tipHdrTocCollapse:                      "Zbaliť",
    tipHdrTocExpand:                        "Rozbaliť",
    tipHdrStyleTemplate:                    "Vyberte štýl náhľadu Markdown",
    tipHdrFontHeading:                      "Nadpis",
    tipHdrFontBody:                         "Text",
    tipHdrFontCode:                         "Kód",
    tipHdrSettings:                         "Otvoriť nastavenia",
    tipHdrHelp:                             "Pomoc",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavenia",
    tabDlgSettingsDisplay:                  "Zobrazenie",
    tabDlgSettingsAbout:                    "O aplikácii",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jazyk",
    lblDlgSettingsDisplayTheme:             "Motív",
    btnDlgSettingsDisplayThemeDark:         "Tmavý",
    btnDlgSettingsDisplayThemeLight:        "Svetlý",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "upravujte a zobrazujte Markdown súbory.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Neuložené zmeny -",
    btnDlgUnsavedDiscard:                   "Zahodiť",
    cfmDlgUnsavedReload:                    "Znovu načítať? Zmeny budú stratené",
    btnDlgUnsavedReload:                    "Znovu načítať",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  sl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Na voljo je nova različica:",
    lnkUpdateWhatsNew:                      "Kaj je novega",
    btnUpdateDownload:                      "Prenesi",
    lnkUpdateSkip:                          "Preskoči to različico",
    tipUpdateDismiss:                       "Zavrni",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Odprite ali spustite datoteko Markdown sem za ogled/urejanje.",
    empAppDropFile:                         "Spustite datoteko Markdown sem",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Odpri datoteko Markdown",
    ttlOsdSaveMd:                           "Shrani datoteko Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Nov dokument",
    tipHdrOpen:                             "Odpri datoteko Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Shrani",
    tipHdrSave:                             "Shrani",
    tipHdrSaveAs:                           "Shrani kot",
    tipHdrConvertFormat:                    "Pretvori v drug format",
    lblHdrConvertTo:                        "Pretvori v",
    ttlHdrConvertSave:                      "Shrani pretvorjen dokument",
    tipHdrPrint:                            "Natisni",
    tipHdrSaveHtml:                         "Shrani kot HTML",
    ttlHdrSaveHtml:                         "Shrani kot HTML",
    tipHdrSavePdf:                          "Shrani kot PDF",
    ttlHdrSavePdf:                          "Shrani kot PDF",
    tipHdrZoomOut:                          "Zmanjšaj pisavo",
    tipHdrZoomIn:                           "Povečaj pisavo",
    tipHdrModeSplit:                        "Razdeljen pogled",
    tipHdrShowEditor:                       "Prikaži urejevalnik",
    tipHdrViewRender:                       "Prikaži predogled",
    tipHdrToc:                              "Kazalo vsebine",
    tipHdrTocLevel:                         "Omeji na raven {n}",
    tipHdrTocCollapse:                      "Strni",
    tipHdrTocExpand:                        "Razširi",
    tipHdrStyleTemplate:                    "Izberite slog predogleda Markdown",
    tipHdrFontHeading:                      "Glava",
    tipHdrFontBody:                         "Besedilo",
    tipHdrFontCode:                         "Koda",
    tipHdrSettings:                         "Odpri nastavitve",
    tipHdrHelp:                             "Pomoč",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavitve",
    tabDlgSettingsDisplay:                  "Prikaz",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jezik",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Temna",
    btnDlgSettingsDisplayThemeLight:        "Svetla",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "urejajte in pregledujte datoteke Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Neshranjene spremembe -",
    btnDlgUnsavedDiscard:                   "Zavrzi",
    cfmDlgUnsavedReload:                    "Znova naloži? Spremembe bodo izgubljene",
    btnDlgUnsavedReload:                    "Znova naloži",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ta: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "புதிய பதிப்பு உள்ளது:",
    lnkUpdateWhatsNew:                      "புதியது என்ன",
    btnUpdateDownload:                      "பதிவிறக்கு",
    lnkUpdateSkip:                          "இந்த பதிப்பைத் தவிர்க்கவும்",
    tipUpdateDismiss:                       "நிராகரி",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "காண/திருத்த Markdown கோப்பை இங்கே திறக்கவும் அல்லது இழுக்கவும்.",
    empAppDropFile:                         "Markdown கோப்பை இங்கே இழுக்கவும்",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown கோப்பைத் திறக்கவும்",
    ttlOsdSaveMd:                           "Markdown கோப்பை சேமிக்கவும்",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "புதிய ஆவணம்",
    tipHdrOpen:                             "Markdown கோப்பைத் திறக்கவும்",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "சேமி",
    tipHdrSave:                             "சேமி",
    tipHdrSaveAs:                           "இவ்வாறு சேமி",
    tipHdrConvertFormat:                    "மற்றொரு வடிவமைப்பிற்கு மாற்றவும்",
    lblHdrConvertTo:                        "இதற்கு மாற்று",
    ttlHdrConvertSave:                      "மாற்றப்பட்ட ஆவணத்தை சேமி",
    tipHdrPrint:                            "அச்சிடு",
    tipHdrSaveHtml:                         "HTML ஆக சேமி",
    ttlHdrSaveHtml:                         "HTML ஆக சேமி",
    tipHdrSavePdf:                          "PDF ஆக சேமி",
    ttlHdrSavePdf:                          "PDF ஆக சேமி",
    tipHdrZoomOut:                          "எழுத்துரு அளவை குறைக்கவும்",
    tipHdrZoomIn:                           "எழுத்துரு அளவை அதிகரிக்கவும்",
    tipHdrModeSplit:                        "பிரிந்த காட்சி",
    tipHdrShowEditor:                       "எடிட்டரைக் காட்டு",
    tipHdrViewRender:                       "முன்னோட்டம் காட்டு",
    tipHdrToc:                              "உள்ளடக்க அட்டவணை",
    tipHdrTocLevel:                         "நிலை {n} வரை வரம்பு",
    tipHdrTocCollapse:                      "சுருக்கு",
    tipHdrTocExpand:                        "விரி",
    tipHdrStyleTemplate:                    "Markdown முன்னோட்ட பாணியைத் தேர்ந்தெடுக்கவும்",
    tipHdrFontHeading:                      "தலைப்பு",
    tipHdrFontBody:                         "உரை",
    tipHdrFontCode:                         "குறியீடு",
    tipHdrSettings:                         "அமைப்புகளைத் திறக்கவும்",
    tipHdrHelp:                             "உதவி",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "அமைப்புகள்",
    tabDlgSettingsDisplay:                  "காட்சி",
    tabDlgSettingsAbout:                    "பற்றி",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "மொழி",
    lblDlgSettingsDisplayTheme:             "தீம்",
    btnDlgSettingsDisplayThemeDark:         "இருள்",
    btnDlgSettingsDisplayThemeLight:        "ஒளி",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown கோப்புகளை திருத்தி மற்றும் பார்க்கவும்.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "சேமிக்கப்படாத மாற்றங்கள் -",
    btnDlgUnsavedDiscard:                   "நிராகரி",
    cfmDlgUnsavedReload:                    "மீண்டும் ஏற்றவா? மாற்றங்கள் இழக்கப்படும்",
    btnDlgUnsavedReload:                    "மீண்டும் ஏற்று",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  hi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नया संस्करण उपलब्ध है:",
    lnkUpdateWhatsNew:                      "नया क्या है",
    btnUpdateDownload:                      "डाउनलोड करें",
    lnkUpdateSkip:                          "इस संस्करण को छोड़ें",
    tipUpdateDismiss:                       "खारिज करें",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "देखने/संपादित करने के लिए Markdown फ़ाइल यहाँ खोलें या छोड़ें।",
    empAppDropFile:                         "Markdown फ़ाइल यहाँ छोड़ें",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown फ़ाइल खोलें",
    ttlOsdSaveMd:                           "Markdown फ़ाइल सहेजें",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "नया दस्तावेज़",
    tipHdrOpen:                             "Markdown फ़ाइल खोलें",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "सहेजें",
    tipHdrSave:                             "सहेजें",
    tipHdrSaveAs:                           "इस रूप में सहेजें",
    tipHdrConvertFormat:                    "दूसरे प्रारूप में बदलें",
    lblHdrConvertTo:                        "इसमें बदलें",
    ttlHdrConvertSave:                      "परिवर्तित दस्तावेज़ सहेजें",
    tipHdrPrint:                            "प्रिंट करें",
    tipHdrSaveHtml:                         "HTML के रूप में सहेजें",
    ttlHdrSaveHtml:                         "HTML के रूप में सहेजें",
    tipHdrSavePdf:                          "PDF के रूप में सहेजें",
    ttlHdrSavePdf:                          "PDF के रूप में सहेजें",
    tipHdrZoomOut:                          "फ़ॉन्ट आकार घटाएं",
    tipHdrZoomIn:                           "फ़ॉन्ट आकार बढ़ाएं",
    tipHdrModeSplit:                        "विभाजित दृश्य",
    tipHdrShowEditor:                       "संपादक दिखाएं",
    tipHdrViewRender:                       "पूर्वावलोकन दिखाएं",
    tipHdrToc:                              "सामग्री तालिका",
    tipHdrTocLevel:                         "स्तर {n} तक सीमित करें",
    tipHdrTocCollapse:                      "संक्षिप्त करें",
    tipHdrTocExpand:                        "विस्तृत करें",
    tipHdrStyleTemplate:                    "Markdown पूर्वावलोकन शैली चुनें",
    tipHdrFontHeading:                      "शीर्षक",
    tipHdrFontBody:                         "मुख्य",
    tipHdrFontCode:                         "कोड",
    tipHdrSettings:                         "सेटिंग्स खोलें",
    tipHdrHelp:                             "सहायता",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्स",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsAbout:                    "के बारे में",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "गहरा",
    btnDlgSettingsDisplayThemeLight:        "हल्का",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown फ़ाइलें संपादित और देखें।",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "असहेजे बदलाव -",
    btnDlgUnsavedDiscard:                   "त्यागें",
    cfmDlgUnsavedReload:                    "पुनः लोड करें? बदलाव खो जाएंगे",
    btnDlgUnsavedReload:                    "पुनः लोड",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  bn: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "নতুন সংস্করণ উপলব্ধ:",
    lnkUpdateWhatsNew:                      "নতুন কি আছে",
    btnUpdateDownload:                      "ডাউনলোড করুন",
    lnkUpdateSkip:                          "এই সংস্করণটি এড়িয়ে যান",
    tipUpdateDismiss:                       "খারিজ করুন",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "দেখতে/সম্পাদনা করতে এখানে Markdown ফাইল খুলুন বা ফেলুন।",
    empAppDropFile:                         "এখানে Markdown ফাইল ফেলুন",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown ফাইল খুলুন",
    ttlOsdSaveMd:                           "Markdown ফাইল সংরক্ষণ করুন",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "নতুন নথি",
    tipHdrOpen:                             "Markdown ফাইল খুলুন",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "সংরক্ষণ করুন",
    tipHdrSave:                             "সংরক্ষণ করুন",
    tipHdrSaveAs:                           "এভাবে সংরক্ষণ করুন",
    tipHdrConvertFormat:                    "অন্য ফরম্যাটে রূপান্তর করুন",
    lblHdrConvertTo:                        "এতে রূপান্তর করুন",
    ttlHdrConvertSave:                      "রূপান্তরিত নথি সংরক্ষণ করুন",
    tipHdrPrint:                            "মুদ্রণ করুন",
    tipHdrSaveHtml:                         "HTML হিসেবে সংরক্ষণ করুন",
    ttlHdrSaveHtml:                         "HTML হিসেবে সংরক্ষণ করুন",
    tipHdrSavePdf:                          "PDF হিসেবে সংরক্ষণ করুন",
    ttlHdrSavePdf:                          "PDF হিসেবে সংরক্ষণ করুন",
    tipHdrZoomOut:                          "ফন্ট আকার কমান",
    tipHdrZoomIn:                           "ফন্ট আকার বাড়ান",
    tipHdrModeSplit:                        "বিভক্ত দৃশ্য",
    tipHdrShowEditor:                       "এডিটর দেখান",
    tipHdrViewRender:                       "পূর্বরূপ দেখান",
    tipHdrToc:                              "বিষয়বস্তুর সারণী",
    tipHdrTocLevel:                         "স্তর {n} পর্যন্ত সীমাবদ্ধ করুন",
    tipHdrTocCollapse:                      "সঙ্কুচিত করুন",
    tipHdrTocExpand:                        "প্রসারিত করুন",
    tipHdrStyleTemplate:                    "Markdown পূর্বরূপ স্টাইল বেছে নিন",
    tipHdrFontHeading:                      "শিরোনাম",
    tipHdrFontBody:                         "মূল",
    tipHdrFontCode:                         "কোড",
    tipHdrSettings:                         "সেটিংস খুলুন",
    tipHdrHelp:                             "সাহায্য",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "সেটিংস",
    tabDlgSettingsDisplay:                  "প্রদর্শন",
    tabDlgSettingsAbout:                    "সম্পর্কে",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ভাষা",
    lblDlgSettingsDisplayTheme:             "থিম",
    btnDlgSettingsDisplayThemeDark:         "গাঢ়",
    btnDlgSettingsDisplayThemeLight:        "হালকা",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown ফাইল সম্পাদনা ও দেখুন।",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "অসংরক্ষিত পরিবর্তন -",
    btnDlgUnsavedDiscard:                   "বাতিল করুন",
    cfmDlgUnsavedReload:                    "পুনরায় লোড করবেন? পরিবর্তনগুলো হারিয়ে যাবে",
    btnDlgUnsavedReload:                    "পুনরায় লোড",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ur: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نیا ورژن دستیاب ہے:",
    lnkUpdateWhatsNew:                      "نیا کیا ہے",
    btnUpdateDownload:                      "ڈاؤن لوڈ کریں",
    lnkUpdateSkip:                          "اس ورژن کو چھوڑ دیں",
    tipUpdateDismiss:                       "مسترد کریں",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "دیکھنے/ترمیم کرنے کے لیے یہاں Markdown فائل کھولیں یا چھوڑیں۔",
    empAppDropFile:                         "یہاں Markdown فائل چھوڑیں",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown فائل کھولیں",
    ttlOsdSaveMd:                           "Markdown فائل محفوظ کریں",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "نئی دستاویز",
    tipHdrOpen:                             "Markdown فائل کھولیں",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "محفوظ کریں",
    tipHdrSave:                             "محفوظ کریں",
    tipHdrSaveAs:                           "اس طرح محفوظ کریں",
    tipHdrConvertFormat:                    "دوسرے فارمیٹ میں تبدیل کریں",
    lblHdrConvertTo:                        "اس میں تبدیل کریں",
    ttlHdrConvertSave:                      "تبدیل شدہ دستاویز محفوظ کریں",
    tipHdrPrint:                            "پرنٹ کریں",
    tipHdrSaveHtml:                         "HTML کے طور پر محفوظ کریں",
    ttlHdrSaveHtml:                         "HTML کے طور پر محفوظ کریں",
    tipHdrSavePdf:                          "PDF کے طور پر محفوظ کریں",
    ttlHdrSavePdf:                          "PDF کے طور پر محفوظ کریں",
    tipHdrZoomOut:                          "فونٹ سائز گھٹائیں",
    tipHdrZoomIn:                           "فونٹ سائز بڑھائیں",
    tipHdrModeSplit:                        "تقسیم شدہ نظارہ",
    tipHdrShowEditor:                       "ایڈیٹر دکھائیں",
    tipHdrViewRender:                       "پیش نظارہ دکھائیں",
    tipHdrToc:                              "فہرست مضامین",
    tipHdrTocLevel:                         "سطح {n} تک محدود کریں",
    tipHdrTocCollapse:                      "سمیٹیں",
    tipHdrTocExpand:                        "پھیلائیں",
    tipHdrStyleTemplate:                    "Markdown پیش نظارہ اسٹائل منتخب کریں",
    tipHdrFontHeading:                      "سرخی",
    tipHdrFontBody:                         "مرکزی",
    tipHdrFontCode:                         "کوڈ",
    tipHdrSettings:                         "ترتیبات کھولیں",
    tipHdrHelp:                             "مدد",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ترتیبات",
    tabDlgSettingsDisplay:                  "ڈسپلے",
    tabDlgSettingsAbout:                    "کے بارے میں",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "زبان",
    lblDlgSettingsDisplayTheme:             "تھیم",
    btnDlgSettingsDisplayThemeDark:         "گہرا",
    btnDlgSettingsDisplayThemeLight:        "ہلکا",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown فائلیں ترمیم اور دیکھیں۔",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "غیر محفوظ تبدیلیاں -",
    btnDlgUnsavedDiscard:                   "رد کریں",
    cfmDlgUnsavedReload:                    "دوبارہ لوڈ کریں؟ تبدیلیاں ضائع ہو جائیں گی",
    btnDlgUnsavedReload:                    "دوبارہ لوڈ کریں",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  sw: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Toleo jipya linapatikana:",
    lnkUpdateWhatsNew:                      "Nini kipya",
    btnUpdateDownload:                      "Pakua",
    lnkUpdateSkip:                          "Ruka toleo hili",
    tipUpdateDismiss:                       "Futa",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Fungua au dondosha faili ya Markdown hapa ili kuona/kuhariri.",
    empAppDropFile:                         "Dondosha faili ya Markdown hapa",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Fungua faili ya Markdown",
    ttlOsdSaveMd:                           "Hifadhi faili ya Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Hati mpya",
    tipHdrOpen:                             "Fungua faili ya Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Hifadhi",
    tipHdrSave:                             "Hifadhi",
    tipHdrSaveAs:                           "Hifadhi kama",
    tipHdrConvertFormat:                    "Badilisha hadi muundo mwingine",
    lblHdrConvertTo:                        "Badilisha hadi",
    ttlHdrConvertSave:                      "Hifadhi hati iliyobadilishwa",
    tipHdrPrint:                            "Chapisha",
    tipHdrSaveHtml:                         "Hifadhi kama HTML",
    ttlHdrSaveHtml:                         "Hifadhi kama HTML",
    tipHdrSavePdf:                          "Hifadhi kama PDF",
    ttlHdrSavePdf:                          "Hifadhi kama PDF",
    tipHdrZoomOut:                          "Punguza ukubwa wa maandishi",
    tipHdrZoomIn:                           "Ongeza ukubwa wa maandishi",
    tipHdrModeSplit:                        "Mtazamo uliotawanyika",
    tipHdrShowEditor:                       "Onyesha mhariri",
    tipHdrViewRender:                       "Onyesha uhakiki",
    tipHdrToc:                              "Jedwali la maudhui",
    tipHdrTocLevel:                         "Punguza hadi kiwango cha {n}",
    tipHdrTocCollapse:                      "Kunja",
    tipHdrTocExpand:                        "Panua",
    tipHdrStyleTemplate:                    "Chagua mtindo wa uhakiki wa Markdown",
    tipHdrFontHeading:                      "Kichwa",
    tipHdrFontBody:                         "Mwili",
    tipHdrFontCode:                         "Msimbo",
    tipHdrSettings:                         "Fungua mipangilio",
    tipHdrHelp:                             "Msaada",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mipangilio",
    tabDlgSettingsDisplay:                  "Onyesho",
    tabDlgSettingsAbout:                    "Kuhusu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lugha",
    lblDlgSettingsDisplayTheme:             "Mandhari",
    btnDlgSettingsDisplayThemeDark:         "Giza",
    btnDlgSettingsDisplayThemeLight:        "Mwanga",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "hariri na uone faili za Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Mabadiliko ambayo hayajahifadhiwa -",
    btnDlgUnsavedDiscard:                   "Kataa",
    cfmDlgUnsavedReload:                    "Pakia tena? Mabadiliko yatapotea",
    btnDlgUnsavedReload:                    "Pakia tena",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  pa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "ਨਵਾਂ ਸੰਸਕਰਨ ਉਪਲਬਧ ਹੈ:",
    lnkUpdateWhatsNew:                      "ਨਵਾਂ ਕੀ ਹੈ",
    btnUpdateDownload:                      "ਡਾਊਨਲੋਡ ਕਰੋ",
    lnkUpdateSkip:                          "ਇਸ ਸੰਸਕਰਨ ਨੂੰ ਛੱਡੋ",
    tipUpdateDismiss:                       "ਖਾਰਜ ਕਰੋ",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "ਦੇਖਣ/ਸੰਪਾਦਿਤ ਕਰਨ ਲਈ Markdown ਫਾਈਲ ਇੱਥੇ ਖੋਲ੍ਹੋ ਜਾਂ ਸੁੱਟੋ।",
    empAppDropFile:                         "Markdown ਫਾਈਲ ਇੱਥੇ ਸੁੱਟੋ",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown ਫਾਈਲ ਖੋਲ੍ਹੋ",
    ttlOsdSaveMd:                           "Markdown ਫਾਈਲ ਸੇਵ ਕਰੋ",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "ਨਵਾਂ ਦਸਤਾਵੇਜ਼",
    tipHdrOpen:                             "Markdown ਫਾਈਲ ਖੋਲ੍ਹੋ",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "ਸੇਵ ਕਰੋ",
    tipHdrSave:                             "ਸੇਵ ਕਰੋ",
    tipHdrSaveAs:                           "ਇਸ ਤਰ੍ਹਾਂ ਸੇਵ ਕਰੋ",
    tipHdrConvertFormat:                    "ਕਿਸੇ ਹੋਰ ਫਾਰਮੈਟ ਵਿੱਚ ਬਦਲੋ",
    lblHdrConvertTo:                        "ਇਸ ਵਿੱਚ ਬਦਲੋ",
    ttlHdrConvertSave:                      "ਬਦਲਿਆ ਦਸਤਾਵੇਜ਼ ਸੇਵ ਕਰੋ",
    tipHdrPrint:                            "ਛਾਪੋ",
    tipHdrSaveHtml:                         "HTML ਵਜੋਂ ਸੇਵ ਕਰੋ",
    ttlHdrSaveHtml:                         "HTML ਵਜੋਂ ਸੇਵ ਕਰੋ",
    tipHdrSavePdf:                          "PDF ਵਜੋਂ ਸੇਵ ਕਰੋ",
    ttlHdrSavePdf:                          "PDF ਵਜੋਂ ਸੇਵ ਕਰੋ",
    tipHdrZoomOut:                          "ਫੌਂਟ ਆਕਾਰ ਘਟਾਓ",
    tipHdrZoomIn:                           "ਫੌਂਟ ਆਕਾਰ ਵਧਾਓ",
    tipHdrModeSplit:                        "ਵੰਡਿਆ ਦ੍ਰਿਸ਼",
    tipHdrShowEditor:                       "ਐਡੀਟਰ ਦਿਖਾਓ",
    tipHdrViewRender:                       "ਪੂਰਵਦਰਸ਼ਨ ਦਿਖਾਓ",
    tipHdrToc:                              "ਸਮੱਗਰੀ ਸਾਰਣੀ",
    tipHdrTocLevel:                         "ਪੱਧਰ {n} ਤੱਕ ਸੀਮਤ ਕਰੋ",
    tipHdrTocCollapse:                      "ਛੋਟਾ ਕਰੋ",
    tipHdrTocExpand:                        "ਫੈਲਾਓ",
    tipHdrStyleTemplate:                    "Markdown ਪੂਰਵਦਰਸ਼ਨ ਸਟਾਈਲ ਚੁਣੋ",
    tipHdrFontHeading:                      "ਸਿਰਲੇਖ",
    tipHdrFontBody:                         "ਮੂਲ",
    tipHdrFontCode:                         "ਕੋਡ",
    tipHdrSettings:                         "ਸੈਟਿੰਗਾਂ ਖੋਲ੍ਹੋ",
    tipHdrHelp:                             "ਮਦਦ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ਸੈਟਿੰਗਾਂ",
    tabDlgSettingsDisplay:                  "ਡਿਸਪਲੇ",
    tabDlgSettingsAbout:                    "ਬਾਰੇ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ਭਾਸ਼ਾ",
    lblDlgSettingsDisplayTheme:             "ਥੀਮ",
    btnDlgSettingsDisplayThemeDark:         "ਗਹਿਰਾ",
    btnDlgSettingsDisplayThemeLight:        "ਹਲਕਾ",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown ਫਾਈਲਾਂ ਸੰਪਾਦਿਤ ਅਤੇ ਦੇਖੋ।",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "ਸੇਵ ਨਹੀਂ ਕੀਤੇ ਬਦਲਾਅ -",
    btnDlgUnsavedDiscard:                   "ਛੱਡੋ",
    cfmDlgUnsavedReload:                    "ਦੁਬਾਰਾ ਲੋਡ ਕਰੋ? ਬਦਲਾਅ ਗੁੰਮ ਹੋ ਜਾਣਗੇ",
    btnDlgUnsavedReload:                    "ਦੁਬਾਰਾ ਲੋਡ ਕਰੋ",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  ha: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Sabon sigar yana nan:",
    lnkUpdateWhatsNew:                      "Menene sabo",
    btnUpdateDownload:                      "Zazzage",
    lnkUpdateSkip:                          "Tsallake wannan sigar",
    tipUpdateDismiss:                       "Watsar",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Buɗe ko zubda fayil ɗin Markdown anan don kallo/gyarawa.",
    empAppDropFile:                         "Zubda fayil ɗin Markdown anan",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Buɗe fayil ɗin Markdown",
    ttlOsdSaveMd:                           "Ajiye fayil ɗin Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Sabon takarda",
    tipHdrOpen:                             "Buɗe fayil ɗin Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Ajiye",
    tipHdrSave:                             "Ajiye",
    tipHdrSaveAs:                           "Ajiye a matsayin",
    tipHdrConvertFormat:                    "Canza zuwa wani tsari",
    lblHdrConvertTo:                        "Canza zuwa",
    ttlHdrConvertSave:                      "Ajiye takardar da aka canza",
    tipHdrPrint:                            "Buga",
    tipHdrSaveHtml:                         "Ajiye a matsayin HTML",
    ttlHdrSaveHtml:                         "Ajiye a matsayin HTML",
    tipHdrSavePdf:                          "Ajiye a matsayin PDF",
    ttlHdrSavePdf:                          "Ajiye a matsayin PDF",
    tipHdrZoomOut:                          "Rage girman rubutu",
    tipHdrZoomIn:                           "Ƙara girman rubutu",
    tipHdrModeSplit:                        "Kallon rarrabewa",
    tipHdrShowEditor:                       "Nuna mai gyarawa",
    tipHdrViewRender:                       "Nuna kallon farko",
    tipHdrToc:                              "Jerin abubuwa",
    tipHdrTocLevel:                         "Iyakance zuwa mataki {n}",
    tipHdrTocCollapse:                      "Rufe",
    tipHdrTocExpand:                        "Buɗe",
    tipHdrStyleTemplate:                    "Zaɓi salon kallon farko na Markdown",
    tipHdrFontHeading:                      "Taken",
    tipHdrFontBody:                         "Rubutu",
    tipHdrFontCode:                         "Kode",
    tipHdrSettings:                         "Buɗe saitunan",
    tipHdrHelp:                             "Taimako",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Saitunan",
    tabDlgSettingsDisplay:                  "Nuna",
    tabDlgSettingsAbout:                    "Game da",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Harshe",
    lblDlgSettingsDisplayTheme:             "Jigo",
    btnDlgSettingsDisplayThemeDark:         "Duhu",
    btnDlgSettingsDisplayThemeLight:        "Haske",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "gyara kuma kalli fayilolin Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Canje-canje da ba a ajiye ba -",
    btnDlgUnsavedDiscard:                   "Watsar",
    cfmDlgUnsavedReload:                    "Sake loda? Canje-canje za su ɓace",
    btnDlgUnsavedReload:                    "Sake loda",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  yo: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ẹya tuntun wa:",
    lnkUpdateWhatsNew:                      "Kí ni titun",
    btnUpdateDownload:                      "Ṣe igbasilẹ",
    lnkUpdateSkip:                          "Fo ẹya yii",
    tipUpdateDismiss:                       "Foju pa",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Ṣi tàbí sọ̀ fayili Markdown síbí láti wo/ṣàtúnkọ.",
    empAppDropFile:                         "Sọ̀ fayili Markdown síbí",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Ṣi fayili Markdown",
    ttlOsdSaveMd:                           "Fipamọ́ fayili Markdown",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Iwe tuntun",
    tipHdrOpen:                             "Ṣi faili Markdown",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "Fipamọ́",
    tipHdrSave:                             "Fipamọ́",
    tipHdrSaveAs:                           "Fipamọ́ gẹgẹ bí",
    tipHdrConvertFormat:                    "Yí padà sí ìdánimọ̀ míràn",
    lblHdrConvertTo:                        "Yí padà sí",
    ttlHdrConvertSave:                      "Fipamọ́ iwe tí a yí padà",
    tipHdrPrint:                            "Tẹ",
    tipHdrSaveHtml:                         "Fipamọ́ gẹgẹ bí HTML",
    ttlHdrSaveHtml:                         "Fipamọ́ gẹgẹ bí HTML",
    tipHdrSavePdf:                          "Fipamọ́ gẹgẹ bí PDF",
    ttlHdrSavePdf:                          "Fipamọ́ gẹgẹ bí PDF",
    tipHdrZoomOut:                          "Jẹ́ kí àkọ kékeré",
    tipHdrZoomIn:                           "Jẹ́ kí àkọ tóbi",
    tipHdrModeSplit:                        "Ìwòye tí pin",
    tipHdrShowEditor:                       "Ṣàfihàn olùṣàtúnkọ",
    tipHdrViewRender:                       "Ṣàfihàn àgbéwò",
    tipHdrToc:                              "Àtọ́kọ àwọn ọ̀rọ̀",
    tipHdrTocLevel:                         "Ṣe ààlà sí ìpele {n}",
    tipHdrTocCollapse:                      "Wómi",
    tipHdrTocExpand:                        "Fẹ̀",
    tipHdrStyleTemplate:                    "Yan ìṣọ̀ àgbéwò Markdown",
    tipHdrFontHeading:                      "Àkọlé",
    tipHdrFontBody:                         "Ìpìlẹ̀",
    tipHdrFontCode:                         "Kóòdù",
    tipHdrSettings:                         "Ṣi ètò",
    tipHdrHelp:                             "Iranlọwọ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ètò",
    tabDlgSettingsDisplay:                  "Ìfihàn",
    tabDlgSettingsAbout:                    "Nípa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Èdè",
    lblDlgSettingsDisplayTheme:             "Àkójọ",
    btnDlgSettingsDisplayThemeDark:         "Òkùnkùn",
    btnDlgSettingsDisplayThemeLight:        "Ìmọ́lẹ̀",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ṣàtúnkọ àti wo àwọn fayili Markdown.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Àwọn ìyípadà tí a kò fipamọ́ -",
    btnDlgUnsavedDiscard:                   "Kọ̀",
    cfmDlgUnsavedReload:                    "Tún ṣe? Àwọn ìyípadà yóò sọnù",
    btnDlgUnsavedReload:                    "Tún ṣe",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  te: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "కొత్త వెర్షన్ అందుబాటులో ఉంది:",
    lnkUpdateWhatsNew:                      "కొత్తవి ఏమిటి",
    btnUpdateDownload:                      "డౌన్‌లోడ్ చేయండి",
    lnkUpdateSkip:                          "ఈ వెర్షన్‌ను దాటవేయి",
    tipUpdateDismiss:                       "తిరస్కరించు",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "చూడడానికి/సవరించడానికి Markdown ఫైల్‌ను ఇక్కడ తెరువు లేదా డ్రాప్ చేయి.",
    empAppDropFile:                         "Markdown ఫైల్‌ను ఇక్కడ డ్రాప్ చేయి",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown ఫైల్ తెరువు",
    ttlOsdSaveMd:                           "Markdown ఫైల్ సేవ్ చేయి",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "కొత్త పత్రం",
    tipHdrOpen:                             "Markdown ఫైల్ తెరువు",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "సేవ్ చేయి",
    tipHdrSave:                             "సేవ్ చేయి",
    tipHdrSaveAs:                           "ఇలా సేవ్ చేయి",
    tipHdrConvertFormat:                    "మరొక ఫార్మాట్‌కు మార్చు",
    lblHdrConvertTo:                        "దీనికి మార్చు",
    ttlHdrConvertSave:                      "మార్చిన పత్రాన్ని సేవ్ చేయి",
    tipHdrPrint:                            "ముద్రించు",
    tipHdrSaveHtml:                         "HTML గా సేవ్ చేయి",
    ttlHdrSaveHtml:                         "HTML గా సేవ్ చేయి",
    tipHdrSavePdf:                          "PDF గా సేవ్ చేయి",
    ttlHdrSavePdf:                          "PDF గా సేవ్ చేయి",
    tipHdrZoomOut:                          "ఫాంట్ పరిమాణం తగ్గించు",
    tipHdrZoomIn:                           "ఫాంట్ పరిమాణం పెంచు",
    tipHdrModeSplit:                        "విభజించిన వీక్షణ",
    tipHdrShowEditor:                       "ఎడిటర్ చూపు",
    tipHdrViewRender:                       "పూర్వావలోకనం చూపు",
    tipHdrToc:                              "విషయ సూచిక",
    tipHdrTocLevel:                         "స్థాయి {n}కి పరిమితం చేయండి",
    tipHdrTocCollapse:                      "కుదించు",
    tipHdrTocExpand:                        "విస్తరించు",
    tipHdrStyleTemplate:                    "Markdown పూర్వావలోకన శైలిని ఎంచుకోండి",
    tipHdrFontHeading:                      "శీర్షిక",
    tipHdrFontBody:                         "మూల",
    tipHdrFontCode:                         "కోడ్",
    tipHdrSettings:                         "సెట్టింగులు తెరువు",
    tipHdrHelp:                             "సహాయం",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "సెట్టింగులు",
    tabDlgSettingsDisplay:                  "ప్రదర్శన",
    tabDlgSettingsAbout:                    "గురించి",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "భాష",
    lblDlgSettingsDisplayTheme:             "థీమ్",
    btnDlgSettingsDisplayThemeDark:         "చీకటి",
    btnDlgSettingsDisplayThemeLight:        "వెలుతురు",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown ఫైల్‌లను సవరించి చూడండి.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "సేవ్ చేయని మార్పులు -",
    btnDlgUnsavedDiscard:                   "విస్మరించు",
    cfmDlgUnsavedReload:                    "మళ్ళీ లోడ్ చేయాలా? మార్పులు కోల్పోతాయి",
    btnDlgUnsavedReload:                    "మళ్ళీ లోడ్ చేయి",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  mr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नवीन आवृत्ती उपलब्ध आहे:",
    lnkUpdateWhatsNew:                      "नवीन काय आहे",
    btnUpdateDownload:                      "डाउनलोड करा",
    lnkUpdateSkip:                          "ही आवृत्ती वगळा",
    tipUpdateDismiss:                       "डिसमिस करा",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "पाहण्यासाठी/संपादित करण्यासाठी Markdown फाइल येथे उघडा किंवा टाका.",
    empAppDropFile:                         "Markdown फाइल येथे टाका",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Markdown फाइल उघडा",
    ttlOsdSaveMd:                           "Markdown फाइल सेव्ह करा",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "नवीन दस्तावेज",
    tipHdrOpen:                             "Markdown फाइल उघडा",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "सेव्ह करा",
    tipHdrSave:                             "सेव्ह करा",
    tipHdrSaveAs:                           "म्हणून सेव्ह करा",
    tipHdrConvertFormat:                    "दुसऱ्या स्वरूपात रूपांतरित करा",
    lblHdrConvertTo:                        "यामध्ये रूपांतरित करा",
    ttlHdrConvertSave:                      "रूपांतरित दस्तावेज सेव्ह करा",
    tipHdrPrint:                            "छपाई करा",
    tipHdrSaveHtml:                         "HTML म्हणून सेव्ह करा",
    ttlHdrSaveHtml:                         "HTML म्हणून सेव्ह करा",
    tipHdrSavePdf:                          "PDF म्हणून सेव्ह करा",
    ttlHdrSavePdf:                          "PDF म्हणून सेव्ह करा",
    tipHdrZoomOut:                          "फॉन्ट आकार कमी करा",
    tipHdrZoomIn:                           "फॉन्ट आकार वाढवा",
    tipHdrModeSplit:                        "विभाजित दृश्य",
    tipHdrShowEditor:                       "संपादक दाखवा",
    tipHdrViewRender:                       "पूर्वावलोकन दाखवा",
    tipHdrToc:                              "विषय सूची",
    tipHdrTocLevel:                         "स्तर {n} पर्यंत मर्यादित करा",
    tipHdrTocCollapse:                      "संकुचित करा",
    tipHdrTocExpand:                        "विस्तृत करा",
    tipHdrStyleTemplate:                    "Markdown पूर्वावलोकन शैली निवडा",
    tipHdrFontHeading:                      "शीर्षक",
    tipHdrFontBody:                         "मुख्य",
    tipHdrFontCode:                         "कोड",
    tipHdrSettings:                         "सेटिंग्ज उघडा",
    tipHdrHelp:                             "मदत",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्ज",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsAbout:                    "बद्दल",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "गडद",
    btnDlgSettingsDisplayThemeLight:        "हलका",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Markdown फाइल्स संपादित आणि पाहा.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "न सेव्ह केलेले बदल -",
    btnDlgUnsavedDiscard:                   "टाकून द्या",
    cfmDlgUnsavedReload:                    "पुन्हा लोड करायचे? बदल गमावले जातील",
    btnDlgUnsavedReload:                    "पुन्हा लोड करा",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },

  tl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "May bagong bersyon:",
    lnkUpdateWhatsNew:                      "Ano ang bago",
    btnUpdateDownload:                      "I-download",
    lnkUpdateSkip:                          "Laktawan ang bersyon na ito",
    tipUpdateDismiss:                       "Balewalain",

    // Prefix:App - Scope:app-level empty states
    empAppNoFile:                           "Buksan o i-drop ang isang Markdown na file dito para tingnan/i-edit.",
    empAppDropFile:                         "I-drop ang isang Markdown na file dito",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdOpenMd:                           "Buksan ang Markdown na file",
    ttlOsdSaveMd:                           "I-save ang Markdown na file",

    // Prefix:Hdr - Scope:top toolbar buttons and tooltips
    tipHdrNew:                              "Bagong dokumento",
    tipHdrOpen:                             "Buksan ang Markdown na file",
    lblHdrNewDoc:                           "Create a new",
    btnHdrSave:                             "I-save",
    tipHdrSave:                             "I-save",
    tipHdrSaveAs:                           "I-save bilang",
    tipHdrConvertFormat:                    "I-convert sa ibang format",
    lblHdrConvertTo:                        "I-convert sa",
    ttlHdrConvertSave:                      "I-save ang na-convert na dokumento",
    tipHdrPrint:                            "I-print",
    tipHdrSaveHtml:                         "I-save bilang HTML",
    ttlHdrSaveHtml:                         "I-save bilang HTML",
    tipHdrSavePdf:                          "I-save bilang PDF",
    ttlHdrSavePdf:                          "I-save bilang PDF",
    tipHdrZoomOut:                          "Paliitin ang font",
    tipHdrZoomIn:                           "Palakihin ang font",
    tipHdrModeSplit:                        "Hatíng tanawin",
    tipHdrShowEditor:                       "Ipakita ang editor",
    tipHdrViewRender:                       "Ipakita ang preview",
    tipHdrToc:                              "Talaan ng Nilalaman",
    tipHdrTocLevel:                         "Limitahan sa antas {n}",
    tipHdrTocCollapse:                      "Tiklupin",
    tipHdrTocExpand:                        "Palawakin",
    tipHdrStyleTemplate:                    "Pumili ng estilo ng preview ng Markdown",
    tipHdrFontHeading:                      "Header",
    tipHdrFontBody:                         "Katawan",
    tipHdrFontCode:                         "Code",
    tipHdrSettings:                         "Buksan ang mga setting",
    tipHdrHelp:                             "Tulong",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mga Setting",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsAbout:                    "Tungkol sa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Wika",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Madilim",
    btnDlgSettingsDisplayThemeLight:        "Maliwanag",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "i-edit at tingnan ang mga Markdown na file.",

    // Prefix:DlgLink - Scope:link/image insert dialog
    btnDlgLinkLink:                         "Link",
    btnDlgLinkImage:                        "Image",
    plhDlgLinkAltText:                      "Alt text",
    plhDlgLinkText:                         "Text",
    plhDlgLinkUrlOrPath:                    "URL or local path",
    plhDlgLinkUrl:                          "URL",
    btnDlgLinkBrowse:                       "Browse…",
    tipDlgLinkImageFolder:                  "Image must be in the document folder or a subfolder",
    lblDlgLinkRelativePath:                 "Relative path",
    btnDlgLinkInsert:                       "Insert",

    // Prefix:DlgUnsaved - Scope:unsaved changes confirmation
    cfmDlgUnsavedMsg:                       "Hindi pa-save na mga pagbabago -",
    btnDlgUnsavedDiscard:                   "Itapon",
    cfmDlgUnsavedReload:                    "I-reload? Mawawala ang mga pagbabago",
    btnDlgUnsavedReload:                    "I-reload",

    // Prefix:Editor - Scope:markdown editor area and toolbar
    tipEditorBold:                          "Bold (Ctrl+B)",
    tipEditorItalic:                        "Italic (Ctrl+I)",
    tipEditorStrikethrough:                 "Strikethrough (Ctrl+D)",
    tipEditorHeading:                       "Heading (Ctrl+H)",
    tipEditorBulletList:                    "Bullet list (Ctrl+L)",
    tipEditorNumberedList:                  "Numbered list (Ctrl+U)",
    tipEditorBlockquote:                    "Blockquote (Ctrl+Q)",
    tipEditorInlineCode:                    "Inline code (Ctrl+E)",
    tipEditorCodeBlock:                     "Code block (Ctrl+M)",
    tipEditorLinkImage:                     "Link / Image (Ctrl+K)",
    tipEditorHorizontalRule:                "Horizontal rule (Ctrl+R)",
    tipEditorAlignLeft:                     "Align left",
    tipEditorAlignCenter:                   "Align center",
    tipEditorAlignRight:                    "Align right",

    // Prefix:Preview - Scope:preview panel and find bar
    plhPreviewFind:                         "Find in preview…",
    lblPreviewNoResults:                    "0 results",
    tipPreviewFindPrev:                     "Previous (Shift+Enter)",
    tipPreviewFindNext:                     "Next (Enter)",
    tipPreviewFindClose:                    "Close (Escape)",

    // Prefix:ImageProps - Scope:inline image property popup
    lblImagePropsAlign:                     "align",
    lblImagePropsWidth:                     "width",
    lblImagePropsHeight:                    "height",
    plhImagePropsPx:                        "px",
    tipImagePropsApply:                     "apply",
    tipImagePropsClear:                     "clear",
    btnImagePropsRemoveStyle:               "remove style block",

  },
};

export const LANGUAGES = [
  { key: 'ar', label: 'العربية' },
  { key: 'bn', label: 'বাংলা' },
  { key: 'bg', label: 'Български' },
  { key: 'ca', label: 'Català' },
  { key: 'zh_CN', label: '简体中文' },
  { key: 'zh_TW', label: '繁體中文' },
  { key: 'cs', label: 'Čeština' },
  { key: 'da', label: 'Dansk' },
  { key: 'de', label: 'Deutsch' },
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español' },
  { key: 'fr', label: 'Français' },
  { key: 'gl', label: 'Galego' },
  { key: 'el', label: 'Ελληνικά' },
  { key: 'ha', label: 'Hausa' },
  { key: 'he', label: 'עברית' },
  { key: 'hi', label: 'हिन्दी' },
  { key: 'hr', label: 'Hrvatski' },
  { key: 'hu', label: 'Magyar' },
  { key: 'hy', label: 'Հայերեն' },
  { key: 'id', label: 'Indonesia' },
  { key: 'it', label: 'Italiano' },
  { key: 'ja', label: '日本語' },
  { key: 'ko', label: '한국어' },
  { key: 'lt', label: 'Lietuvių' },
  { key: 'mk', label: 'Македонски' },
  { key: 'mr', label: 'मराठी' },
  { key: 'ms', label: 'Melayu' },
  { key: 'nl', label: 'Nederlands' },
  { key: 'nb', label: 'Norsk' },
  { key: 'fa', label: 'فارسی' },
  { key: 'pa', label: 'ਪੰਜਾਬੀ' },
  { key: 'pl', label: 'Polski' },
  { key: 'pt_BR', label: 'Português (Brasil)' },
  { key: 'pt_PT', label: 'Português (Portugal)' },
  { key: 'ro', label: 'Română' },
  { key: 'ru', label: 'Русский' },
  { key: 'sk', label: 'Slovenčina' },
  { key: 'sl', label: 'Slovenščina' },
  { key: 'sr', label: 'Српски' },
  { key: 'sv', label: 'Svenska' },
  { key: 'sw', label: 'Kiswahili' },
  { key: 'fi', label: 'Suomi' },
  { key: 'ta', label: 'தமிழ்' },
  { key: 'te', label: 'తెలుగు' },
  { key: 'th', label: 'ไทย' },
  { key: 'tl', label: 'Filipino' },
  { key: 'tr', label: 'Türkçe' },
  { key: 'ur', label: 'اردو' },
  { key: 'vi', label: 'Tiếng Việt' },
  { key: 'uk', label: 'Українська' },
  { key: 'yo', label: 'Yorùbá' },
];

const base = TRANSLATIONS.en;

// ⚠ CLAUDE: useT MUST return a useMemo-wrapped function. The bare form
//   `return (key) => ...` produces a new function every render, which destabilizes
//   every useCallback/useEffect depending on `t` → infinite render loop, EMFILE crashes.
//   See CLAUDE-i18n.md → "useT() must memoize". Do not "simplify" this.
export function useT(langKey) {
  return useMemo(() => {
    const lang = TRANSLATIONS[langKey] || base;
    return (key) => lang[key] ?? base[key] ?? key;
  }, [langKey]);
}

export function getT(langKey) {
  const lang = TRANSLATIONS[langKey] || base;
  return (key) => lang[key] ?? base[key] ?? key;
}
