// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Seiten, die nicht in die Sitemap gehören (Paid-Ads-Landingpage, Buchungsstrecke).
const HIDDEN = ['/neukundenangebot', '/termin'];

// PREVIEW=1 erzeugt eine Vorschau-Version mit relativen Pfaden (für Link-Vorschau ohne eigenes Hosting).
const PREVIEW = process.env.PREVIEW === '1';

export default defineConfig({
  site: 'https://www.elourethestudio.ch',
  trailingSlash: 'ignore',
  ...(PREVIEW ? { outDir: './dist-preview', build: { format: 'file', inlineStylesheets: 'never', assets: 'assets' } } : {}),
  integrations: [
    sitemap({
      filter: (page) => !HIDDEN.some((p) => new URL(page).pathname.replace(/\/$/, '') === p),
    }),
  ],
  // Alte Wix-URLs auf die neue Struktur umleiten, damit Google-Rankings & Links erhalten bleiben.
  redirects: PREVIEW ? {} : {
    '/book-online': '/preise',
    '/über-uns': '/studio',
    '/ueber-uns': '/studio',
    '/agb-s': '/agb',
    '/bewertungen': '/',
  },
});
