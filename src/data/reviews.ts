// Echte Google-Bewertungen (Stand 16.11.2026, Quelle: Google Maps).
// Wörtlich übernommen; bei langen Texten mit «…» gekürzt.
// Bewusst ausgewählt: Stimmen, die Caro oder das Studio/Team allgemein nennen
// (Corine ist nicht mehr im Team).

export interface Review {
  name: string;
  text: string;
  short?: string; // Kurzfassung für kleine Karten
  topic?: string; // worauf die Stimme einzahlt
  when?: string;
}

export const googleRating = { rating: 5.0, count: 126 } as const;

export const reviews: Review[] = [
  {
    name: 'Sascha N.',
    topic: 'Angst vor dem ersten Mal',
    when: 'vor 3 Jahren',
    text: 'Ich hatte ein bischen Angst vor der ersten Laserbehandlung, jedoch konnten mir Caro durch ihr professionelles, freundliches und empathisches Auftreten diese sofort nehmen. Das Studio ist wunderschön, modern und sehr sauber. Schon nach einer Behandlung sehe ich grosse Fortschritte.',
    short: 'Ich hatte ein bischen Angst vor der ersten Laserbehandlung, jedoch konnten mir Caro durch ihr professionelles, freundliches und empathisches Auftreten diese sofort nehmen.',
  },
  {
    name: 'Julia F.',
    topic: 'Ergebnis',
    when: 'vor 8 Monaten',
    text: 'Ich bin seit über einem Jahr bei Caro in Behandlung und kann das Studio nur jedem wärmstens ans Herz legen. Es ist super sauber, wunderschön und ich habe mich jederzeit ausgezeichnet beraten und wohlgefühlt. Das Ergebnis ist der Hammer und ich habe schon seit Monaten nicht mehr ans Rasieren gedacht – genau so soll es sein.',
    short: 'Das Ergebnis ist der Hammer und ich habe schon seit Monaten nicht mehr ans Rasieren gedacht.',
  },
  {
    name: 'Luli',
    topic: 'Ehrlichkeit',
    when: 'vor 2 Jahren',
    text: 'Schon nach wenigen Sitzungen merkt man, dass die Haare weniger und/oder viel feiner/schwächer geworden sind. Ich bin sehr zufrieden und begrüsse es auch sehr, dass keine falschen Hoffnungen und unrealistischen Versprechungen gemacht werden. Sie sind stets transparent und ehrlich zu Ihren Kunden/Kundinnen …',
    short: 'Ich begrüsse es sehr, dass keine falschen Hoffnungen und unrealistischen Versprechungen gemacht werden.',
  },
  {
    name: 'Cindy A.',
    topic: 'Nervosität',
    when: 'vor 9 Monaten',
    text: 'Die Beratung war sehr kompetent: Es wurde genau auf meine Haut, Wünsche und Fragen eingegangen. Die Behandlung selbst war angenehm, schnell und absolut hygienisch durchgeführt. Auch auf meine Nervosität wurde sensibel eingegangen – ich habe mich jederzeit sicher gefühlt.',
    short: 'Auch auf meine Nervosität wurde sensibel eingegangen – ich habe mich jederzeit sicher gefühlt.',
  },
  {
    name: 'Dina G.',
    topic: 'Beratung',
    when: 'vor 10 Monaten',
    text: 'Caro nimmt sich immer viel Zeit für mich und arbeitet mega professionell! Schon nach meinem ersten Besuch für ein Beratungsgespräch, wusste ich, ich bin am richtigen Ort. Mittlerweile sind meine Haare auch deutlich weniger und dünner geworden und ich bin super happy!',
    short: 'Schon nach meinem ersten Beratungsgespräch wusste ich, ich bin am richtigen Ort.',
  },
  {
    name: 'Arani',
    topic: 'Betreuung',
    when: 'vor 11 Monaten',
    text: 'Ich bin bei der lieben Caro in Behandlung und fühle mich jedes Mal rundum wohl. Sie ist unglaublich aufmerksam, freundlich und sorgt immer dafür, dass ich mich während der ganzen Behandlung gut aufgehoben fühle … Ihre einfühlsame Art macht jede Sitzung angenehm.',
    short: 'Ihre einfühlsame Art macht jede Sitzung angenehm.',
  },
  {
    name: 'Lea R.',
    topic: 'Preis-Leistung',
    when: 'vor 6 Monaten',
    text: 'Eine grosse Empfehlung! Ich bin sehr zufrieden und finde das Preis-Leistungsverhältnis top. Das Studio ist modern und die Beratung/Behandlung ist professionell und trotzdem freundschaftlich.',
    short: 'Ich finde das Preis-Leistungsverhältnis top. Professionell und trotzdem freundschaftlich.',
  },
  {
    name: 'Amy H.',
    topic: 'Erster Termin',
    when: 'vor 11 Monaten',
    text: 'Ich war zum ersten Mal zum Lasern bei eloure the studio und bei der lieben Caro und ich habe mich von Anfang an super wohlgefühlt. Caro ist sehr freundlich, einfühlsam und erklärt alles verständlich.',
    short: 'Caro ist sehr freundlich, einfühlsam und erklärt alles verständlich.',
  },
  {
    name: 'Gökce',
    topic: 'Ergebnis',
    when: 'vor einem Jahr',
    text: 'Meine Haut ist viel glatter, und die störenden Haare sind fast komplett verschwunden. Das Team ist super freundlich, professionell und sehr zuvorkommend …',
    short: 'Meine Haut ist viel glatter, und die störenden Haare sind fast komplett verschwunden.',
  },
  {
    name: 'Natalie B.',
    topic: 'Atmosphäre',
    when: 'vor einem Jahr',
    text: 'Schon wenn man reinkommt, fühlt man sich total wohl. Alles ist super sauber, modern und gemütlich. Das Team ist mega freundlich und nimmt sich immer Zeit, alles genau zu erklären.',
    short: 'Schon wenn man reinkommt, fühlt man sich total wohl.',
  },
];

export const pickReview = (name: string) => reviews.find((r) => r.name === name)!;
