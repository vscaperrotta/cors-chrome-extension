import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import paths from './config/paths';
import zipBuild from './scripts/zip.js'
import pkgJson from './package.json';

const APP_DIR = paths.appSrc;

export default defineConfig({
  plugins: [
    react(),
    zipBuild({
      folderPath: 'dist',
      outPath: `${pkgJson.name}.zip`,
    })
  ],
  resolve: {
    alias: {
      '@background': `${APP_DIR}/background`,
      '@options': `${APP_DIR}/options`,
      '@styles': `${APP_DIR}/styles`,
      '@utils': `${APP_DIR}/utils`,
    },
  },
  build: {
    rollupOptions: {
      input: {
        background: path.resolve(APP_DIR, 'background', 'index.js'),
        options: path.resolve(APP_DIR, 'options', 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
