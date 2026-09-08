// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://marcmarques.com',
  vite: {
    // @ts-expect-error - desajuste de tipos de Vite entre astro y @tailwindcss/vite (no afecta al build)
    plugins: [tailwindcss()],
  },
});
