// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',              // rootnya tetap di folder utama
  publicDir: 'public',    // folder public static asset (kalau ada)
  build: {
    outDir: 'dist',
  },
})
