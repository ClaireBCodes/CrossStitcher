import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'vite-project',
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.storybook/**', '**/src/stories/**'],
  },
});