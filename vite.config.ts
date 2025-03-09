import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@style': '/src/style',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@style/value.scss";
        `,
      },
    },
  },
});
