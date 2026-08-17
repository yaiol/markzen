import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import pkg from '../package.json';
import { loadLang } from './i18n-gen';
import './assets/ui-colors.css';
import './assets/ui-app.css';
import './assets/ui-listview.css';

// ⚠ CLAUDE: the active language chunk is awaited BEFORE the first render, so a non-English
// user never sees a flash of English. `.finally` (not `.then`) so a failed or unknown language
// still renders, in English. src/i18n-gen/ is GENERATED — see scripts/i18n-split.mjs.
const root = ReactDOM.createRoot(document.getElementById('root'));
loadLang(localStorage.getItem(`${pkg.storagePrefix}-lang`) || 'en')
  .finally(() => root.render(<App />));
