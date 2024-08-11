import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      exclude: [
        'dist/*',
        '.next/*',
        '**/*.test.tsx',
        '**/*.test.ts',
        './src/app/layout.tsx',
        './src/app/page.tsx',
        './src/mocks/*',
        './src/setupVitest.mts',
        './src/vitest.config.mts',
        '.eslintrc.cjs',
        'next.config.mjs',
      ]
    },
    setupFiles: ['./setupVitest.mts']
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src/'),
      '@assets': resolve(__dirname, './src/assets/'),
      '@core': resolve(__dirname, './src/core/'),
      '@pages': resolve(__dirname, './src/pages/'),
      '@components': resolve(__dirname, './src/components/'),
      '@models': resolve(__dirname, './src/models/'),
      '@enums': resolve(__dirname, './src/enums/'),
      '@constants': resolve(__dirname, './src/constants/'),
      '@utils': resolve(__dirname, './src/utils/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
      '@context': resolve(__dirname, './src/context/'),
      '@mocks': resolve(__dirname, './src/mocks/')
    }
  }
});
