// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Seiten, die nicht in die Sitemap gehören (Paid-Ads-Landingpage, Buchungsstrecke).
const HIDDEN = ['/farben', '/neukundenangebot', '/termin'];

// RELATIVE=1 erzeugt eine Version mit relativen Pfaden, die unter jedem Unterpfad läuft
// (z. B. GitHub Pages: https://melvin2-2.github.io/Eloure/).
const RELATIVE = process.env.RELATIVE === '1';

export default defineConfig({
  site: 'https://www.elourethestudio.ch',
  trailingSlash: 'ignore',
  ...(RELATIVE ? { outDir: './dist-relative', build: { inlineStylesheets: 'never' } } : {}),
  integrations: [
    sitemap({
      filter: (page) => !HIDDEN.some((p) => new URL(page).pathname.replace(/\/$/, '') === p),
    }),
  ],
  // Alte Wix-URLs auf die neue Struktur umleiten, damit Google-Rankings & Links erhalten bleiben.
  redirects: RELATIVE ? {} : {
    '/book-online': '/preise',
    '/über-uns': '/studio',
    '/ueber-uns': '/studio',
    '/agb-s': '/agb',
    '/bewertungen': '/',
  },
});
