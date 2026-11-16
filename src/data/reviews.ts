// Echte Kundenstimmen aus Google (bitte wörtlich übernehmen, mit Vorname + Initial).
// Solange die Liste leer ist, zeigt der Bereich nur den Link zu den Google-Bewertungen.
// Bitte KEINE erfundenen Bewertungen verwenden.

export interface Review {
  name: string; // z. B. "Laura M."
  text: string;
  treatment?: string; // z. B. "Beine komplett"
}

export const reviews: Review[] = [];

// Optional: Gesamtbewertung aus Google eintragen, z. B. { rating: 5.0, count: 48 }
export const googleRating: { rating: number; count: number } | null = null;
