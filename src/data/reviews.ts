// Echte Kundenstimmen hier eintragen (z. B. aus Google-Bewertungen – mit Einverständnis).
// Solange die Liste leer ist, wird der Bewertungsbereich automatisch ausgeblendet.
// Bitte KEINE erfundenen Bewertungen verwenden.

export interface Review {
  name: string; // z. B. "Laura M."
  text: string;
  treatment?: string; // z. B. "Beine komplett"
  source?: 'Google' | 'Instagram' | 'Direkt';
}

export const reviews: Review[] = [];

// Optional: Google-Gesamtbewertung, z. B. { rating: 5.0, count: 48, url: 'https://g.page/...' }
export const googleRating: { rating: number; count: number; url: string } | null = null;
