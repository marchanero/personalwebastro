import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://robertosanchezreolid.com', // Reemplaza con tu dominio real
	integrations: [
		tailwind(),
		react(),
		sitemap(),
	]
});
