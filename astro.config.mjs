// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Seiten, die nicht in die Sitemap gehören (Paid-Ads-Landingpage, Buchungsstrecke).
const HIDDEN = ['/neukundenangebot', '/termin'];

export default defineConfig({
  site: 'https://www.elourethestudio.ch',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !HIDDEN.some((p) => new URL(page).pathname.replace(/\/$/, '') === p),
    }),
  ],
  // Alte Wix-URLs auf die neue Struktur umleiten, damit Google-Rankings & Links erhalten bleiben.
  redirects: {
    '/book-online': '/preise',
    '/über-uns': '/studio',
    '/ueber-uns': '/studio',
    '/agb-s': '/agb',
    '/bewertungen': '/',
  },
});
