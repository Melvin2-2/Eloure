# Eloure The Studio – Website (Astro)

Neue, conversion-optimierte Website für **Eloure The Studio**, Laserhaarentfernung in Amriswil.
Alle Inhalte, Preise, Fotos und Videos stammen von der bisherigen Wix-Website (Stand Nov. 2026).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # statische Seite in ./dist
```

## Seitenstruktur

| URL | Zweck | alt (Wix) |
|---|---|---|
| `/` | Startseite – Positionierung, Preise-Teaser, Ablauf, Team, Studio, Ängste-FAQ, Doppel-CTA | `/` |
| `/preise` | Alle 34 Leistungen, nach Körperregion gruppiert, Frauen/Männer, je mit Direkt-Buchen | `/book-online` |
| `/laserhaarentfernung` | Wirkung, Sitzungen, Eignung, Ablauf, Vorbereitung & Nachsorge | (verteilt auf FAQ) |
| `/studio` | Corine & Caro, Werte, Studio-Galerie, Anfahrt | `/über-uns` |
| `/faq` | 19 Fragen in 4 Themen, mit Schema.org-FAQ | `/faq` |
| `/kontakt` | Kanäle (Buchen, WhatsApp, Tel., Mail, Instagram), Formular, Anfahrt | `/kontakt` |
| `/termin` | Buchungsstrecke in 4 Schritten (visuell, noch ohne Backend) | `/book-online` |
| `/neukundenangebot` | **Paid-Ads-Landingpage**, nicht verlinkt, `noindex`, nicht in Sitemap | `/neukundenangebot` |
| `/impressum`, `/agb`, `/datenschutz` | Rechtstexte (übernommen) | gleich |

Alte Wix-URLs werden umgeleitet (`astro.config.mjs` → `redirects` sowie `public/_redirects`).

## Wichtigste Optimierungen

- **Sofort klar, worum es geht:** H1 + Lead sagen in einem Satz: Laserhaarentfernung, Amriswil, persönlich.
- **Bezahlte Buchung zuerst, Beratung als Sicherheitsnetz:** Haupt-CTA ist immer «Termin buchen». Die kostenlose Beratung erscheint nur als leiser Zweitweg («Noch unsicher?»). Im Buchungstool steht sie unter den Zonen, mit dem Hinweis, dass jede Erstbehandlung ohnehin eine Beratung enthält.
- **Ängste aktiv beantwortet:** Schmerz, Scham im Intimbereich, Eignung, Kosten, Absage – auf der Startseite direkt sichtbar.
- **Risiko-Umkehr an jedem Entscheidungspunkt:** «Bezahlt wird erst vor Ort», «kostenlos absagen bis 24 Std. vorher», «Beratung inklusive».
- **Transparente Preise** statt PDF-artiger Liste – mit Direkt-Buchen-Link pro Zone (`/termin?behandlung=…`).
- **Buchungstool:** Mehrfachauswahl mit Warenkorb, Regeln aus Wix übernommen (Beratung/Probebehandlung nur einzeln, «Jede weitere Zone» nur mit Ganzkörper), Kalender nach Öffnungszeiten, Gutscheincode mit Prüfung (Code gilt nur für Neukund:innen), Mobile-Sticky-Summary.
- **Landingpage für Ads:** schnellerer USP, Code zum Kopieren, Rabattpreise werden automatisch aus der Preisliste berechnet, alle CTAs führen mit `?code=NEU26` ins Buchungstool (Code ist dort schon eingetragen).
- **Technik:** statisch, schnell (Bilder automatisch als WebP in mehreren Grössen, Videos komprimiert ohne Ton), Schriften selbst gehostet (kein Google-Fonts-Tracking), LocalBusiness- & FAQ-Schema, Sitemap, Barrierefreiheit (Fokus-Stile, Skip-Link, reduzierte Bewegung).

## Wo was gepflegt wird

- `src/data/site.ts` – Adresse, Telefon, Öffnungszeiten, Promo-Code, `BOOKING_DEMO`
- `src/data/services.ts` – alle Leistungen/Preise
- `src/data/faq.ts` – FAQ
- `src/data/reviews.ts` – Kundenstimmen (leer → Bereich wird ausgeblendet)
- `src/data/legal/*.html` – AGB & Datenschutz

## Vor dem Livegang

1. Buchung an ein echtes System anbinden (z. B. weiterhin Wix Bookings via Link, oder Salonized/Treatwell/Calendly) und `BOOKING_DEMO = false` setzen.
2. Kontaktformular an einen Formulardienst anbinden (`src/pages/kontakt.astro`).
3. Datenschutzerklärung aktualisieren (siehe offene Punkte).
