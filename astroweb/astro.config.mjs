import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://robertosanchezreolid.ovh',
    output: 'server',
    adapter: node({
        mode: 'standalone'
    }),
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
