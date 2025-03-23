import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@styles': '/src/styles',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@styles/variables.scss";`,
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
});
