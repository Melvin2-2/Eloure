// Zentrale Studio-Daten. Quelle: bestehende Website elourethestudio.ch (Stand Nov. 2026).
// Alles, was hier steht, erscheint auf mehreren Seiten – bitte nur hier ändern.

export const site = {
  name: 'Eloure The Studio',
  legalName: 'Eloure GmbH',
  claim: 'Laserhaarentfernung in Amriswil',
  url: 'https://www.elourethestudio.ch',
  team: ['Caro', 'Sarah'], // Caro = Inhaberin, Sarah = Mitarbeiterin

  address: {
    street: 'Bahnhofstrasse 20',
    zip: '8580',
    city: 'Amriswil',
    region: 'TG',
    country: 'CH',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Eloure+The+Studio+Bahnhofstrasse+20+8580+Amriswil',

  phone: '076 529 71 29',
  phoneHref: 'tel:+41765297129',
  // Auf der alten Website ist ein WhatsApp-Icon verlinkt → wir gehen davon aus, dass die Nummer WhatsApp nutzt.
  whatsappHref: 'https://wa.me/41765297129',
  email: 'elourethestudio@outlook.com',
  instagram: 'https://www.instagram.com/elourethestudio/',
  instagramHandle: '@elourethestudio',

  hours: [
    { days: 'Montag – Freitag', time: '10:00 – 20:00' },
    { days: 'Samstag', time: '10:00 – 16:00' },
    { days: 'Sonntag', time: 'geschlossen' },
  ],
  // Für Schema.org & den Buchungskalender
  openingSpec: [
    { days: [1, 2, 3, 4, 5], open: '10:00', close: '20:00' },
    { days: [6], open: '10:00', close: '16:00' },
  ],

  cancellationHours: 24,
  payment: 'Bezahlt wird erst vor Ort – nach deinem Termin.',
  experience: '5 Jahre Erfahrung',
  paymentMethods: 'Bar, TWINT oder Karte',
  parking: 'Parkplätze direkt an der Strasse',
  // Google-Bewertungen (Link aus Google Business Profil)
  googleReviewsUrl: 'https://share.google/16LOJS7FUaPbZWTDE',
} as const;

// Neukunden-Aktion (Paid Ads). Der Code wird im Checkout eingelöst.
export const promo = {
  code: 'NEU26',
  percent: 15,
  label: '15 % auf deine erste Behandlung',
} as const;

// Solange die Buchung noch nicht an ein echtes Buchungssystem angebunden ist,
// zeigt /termin einen dezenten Hinweis. Vor dem Livegang auf false setzen.
export const BOOKING_DEMO = true;
