import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from '@svgr/rollup';
import copy from 'rollup-plugin-copy';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        copy({
          targets: [{ src: 'src/assets/*', dest: 'dist/assets' }],
        }),
      ],
    },
  },
});
