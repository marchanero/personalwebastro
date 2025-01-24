import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://robertosanchezreolid.com',
    output: 'server',
    integrations: [
        tailwind(),
        react(),
        sitemap(),
    ],
    server: {
        host: true
    },
    vite: {
        server: {
            watch: {
                usePolling: true
            }
        },
        envPrefix: 'VITE_'
    }
});
