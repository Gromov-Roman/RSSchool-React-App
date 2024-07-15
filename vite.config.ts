import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
    setupFiles: ['./setupVitest.ts'],
  },
  resolve: {
    alias: {
      '@core': resolve(__dirname, './src/core/'),
      '@pages': resolve(__dirname, './src/pages/'),
      '@components': resolve(__dirname, './src/components/'),
      '@models': resolve(__dirname, './src/models/'),
      '@enums': resolve(__dirname, './src/enums/'),
      '@constants': resolve(__dirname, './src/constants/'),
      '@utils': resolve(__dirname, './src/utils/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
      '@mocks': resolve(__dirname, './src/mocks/'),
    },
  },
});
