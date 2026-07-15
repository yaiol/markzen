const { contextBridge, webUtils } = require('electron');

// ⚠ CLAUDE: Only webUtils is exposed here - no IPC, no dialog calls.
// See root CLAUDE.md "Electron IPC / Preload" for why IPC+preload is forbidden.
// webUtils.getPathForFile() is the official Electron 32+ replacement for file.path
// (which the renderer sandbox strips). It is safe to expose here because it only
// reads a path from a File object the user already selected - no filesystem access granted.
contextBridge.exposeInMainWorld('electronAPI', {
  getFilePath: (file) => webUtils.getPathForFile(file),
});
