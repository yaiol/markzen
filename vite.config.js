import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { devPort } = require('./package.json');

export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    // ⚠ CLAUDE: 'pseudocode' MUST stay here. Rolldown (Vite's default bundler) wraps CJS
    // modules in strict mode, which turns the undeclared `attrVal` and `ifCond` vars in
    // pseudocode's Renderer.js into ReferenceErrors. esbuild (used for optimizeDeps) does
    // not add strict mode to CJS files, so pre-bundling here is the fix. Do not remove,
    // do not change to 'pseudocode/build/pseudocode.js' - both were tried and broken.
    include: ['pseudocode', 'nomnoml'],
  },
  build: {
    chunkSizeWarningLimit: 10000, // Electron app - code-splitting has no benefit; large value silences expected noise (mermaid, vega, katex…)
  },
  server: {
    port: devPort,
    strictPort: true, // fail if the port is taken — never silently grab another app's port
    open: false,
    watch: {
      ignored: ['**/vendor/**'],
    },
  },
});
