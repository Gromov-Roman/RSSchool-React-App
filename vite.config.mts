import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    !process.env.VITEST && remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  base: '',
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'istanbul',
      exclude: [
        'dist/*',
        '**/*.test.tsx',
        '**/*.test.ts',
        './app/root.tsx',
        './app/entry.client.tsx',
        './app/entry.server.tsx',
        './app/routes/_index.tsx',
        './app/mocks/*',
        './app/setupVitest.mts',
        './app/vitest.config.mts',
        '.eslintrc.cjs',
        'vite.config.mts',
      ]
    },
    setupFiles: ['./setupVitest.mts']
  },
  resolve: {
    alias: {
      '@app': resolve(__dirname, './app/'),
      '@assets': resolve(__dirname, './app/assets/'),
      '@core': resolve(__dirname, './app/core/'),
      '@pages': resolve(__dirname, './app/pages/'),
      '@components': resolve(__dirname, './app/components/'),
      '@models': resolve(__dirname, './app/models/'),
      '@enums': resolve(__dirname, './app/enums/'),
      '@constants': resolve(__dirname, './app/constants/'),
      '@utils': resolve(__dirname, './app/utils/'),
      '@hooks': resolve(__dirname, './app/hooks/'),
      '@context': resolve(__dirname, './app/context/'),
      '@mocks': resolve(__dirname, './app/mocks/')
    }
  }
});
