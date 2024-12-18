import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-ignore
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths()],
  test: {
    watch: true,
    globals: true,
    environment: "jsdom",
    setupFiles: ["@testing-library/jest-dom", "./setupFiles.ts"],
    exclude: ["node_modules/**","tests/**"],
  },
});
