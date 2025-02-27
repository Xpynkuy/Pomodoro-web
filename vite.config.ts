import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    svgr(), // Добавьте этот плагин
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});