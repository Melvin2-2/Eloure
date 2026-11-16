// Alle Leistungen 1:1 aus dem bestehenden Wix-Buchungssystem übernommen
// (Name, Dauer, Preis, Beschreibung, Kategorie). Gruppierung nach Körperregion ist neu.

export type Group = 'frauen' | 'maenner';

export interface Service {
  id: string; // = Slug im alten Wix-System
  name: string;
  group: Group;
  region: string;
  minutes: number;
  price: number | null; // null = kostenlos
  priceLabel?: string; // überschreibt die Preisanzeige
  note?: string;
  single?: boolean; // kann nur einzeln gebucht werden
  requires?: string[]; // nur in Verbindung mit …
  popular?: boolean;
}

export const firstVisit: Service[] = [
  {
    id: 'beratungsgespraech',
    name: 'Beratungsgespräch',
    group: 'frauen',
    region: 'Erster Besuch',
    minutes: 25,
    price: null,
    note: 'Wir erklären dir den Ablauf, analysieren deine Haut & Haare und finden den passenden Behandlungsplan.',
    single: true,
  },
  {
    id: 'probebehandlung-achsel-inkl-beratung',
    name: 'Probebehandlung Achsel inkl. Beratung',
    group: 'frauen',
    region: 'Erster Besuch',
    minutes: 30,
    price: null,
    // TODO: Preis von Eloure bestätigen lassen – im alten Buchungssystem war kein Preis hinterlegt.
    priceLabel: 'Preis folgt',
    note: 'Exklusiv für Laserjungfrauen – kann nur einzeln gebucht werden.',
    single: true,
  },
];

export const services: Service[] = [
  // ——— Frauen ———
  { id: 'oberlippe', name: 'Oberlippe', group: 'frauen', region: 'Gesicht', minutes: 15, price: 39 },
  { id: 'oberlippe-kinn', name: 'Oberlippe & Kinn', group: 'frauen', region: 'Gesicht', minutes: 15, price: 49 },
  { id: 'gesicht', name: 'Gesicht', group: 'frauen', region: 'Gesicht', minutes: 15, price: 69 },

  { id: 'achseln', name: 'Achseln', group: 'frauen', region: 'Oberkörper', minutes: 15, price: 49, popular: true },
  { id: 'bauch', name: 'Bauch', group: 'frauen', region: 'Oberkörper', minutes: 15, price: 49 },
  { id: 'halber-ruecken-1', name: 'Halber Rücken', group: 'frauen', region: 'Oberkörper', minutes: 15, price: 49 },

  { id: 'arme-1', name: 'Arme', group: 'frauen', region: 'Arme & Hände', minutes: 30, price: 69 },
  { id: 'haende-inkl-finger', name: 'Hände inkl. Finger', group: 'frauen', region: 'Arme & Hände', minutes: 15, price: 29 },

  { id: 'bikinilinie', name: 'Bikinilinie', group: 'frauen', region: 'Intim & Po', minutes: 15, price: 59 },
  { id: 'bikini-intim', name: 'Bikini / Intim', group: 'frauen', region: 'Intim & Po', minutes: 15, price: 79, popular: true },
  { id: 'pobacken', name: 'Pobacken', group: 'frauen', region: 'Intim & Po', minutes: 15, price: 59 },

  { id: 'unterschenkel', name: 'Unterschenkel', group: 'frauen', region: 'Beine & Füsse', minutes: 30, price: 89, popular: true },
  { id: 'oberschenkel', name: 'Oberschenkel', group: 'frauen', region: 'Beine & Füsse', minutes: 30, price: 89 },
  { id: 'beine-komplett', name: 'Beine komplett', group: 'frauen', region: 'Beine & Füsse', minutes: 45, price: 129, popular: true },
  { id: 'fuesse-inkl-zehen', name: 'Füsse inkl. Zehen', group: 'frauen', region: 'Beine & Füsse', minutes: 15, price: 29 },

  { id: 'kombi-intim-achseln', name: 'Kombi Intim + Achseln', group: 'frauen', region: 'Kombis & Ganzkörper', minutes: 30, price: 119, popular: true },
  { id: 'ganzkoerper-halbes-bein', name: 'Ganzkörper halbes Bein', group: 'frauen', region: 'Kombis & Ganzkörper', minutes: 60, price: 169, note: '3 Zonen deiner Wahl, jede weitere Zone + CHF 10' },
  { id: 'ganzkoerper', name: 'Ganzkörper', group: 'frauen', region: 'Kombis & Ganzkörper', minutes: 75, price: 179, note: '3 Zonen deiner Wahl, jede weitere Zone + CHF 10', popular: true },

  // ——— Männer ———
  { id: 'konturen', name: 'Konturen', group: 'maenner', region: 'Gesicht & Hals', minutes: 15, price: 35 },
  { id: 'hals', name: 'Hals', group: 'maenner', region: 'Gesicht & Hals', minutes: 15, price: 49 },
  { id: 'nacken', name: 'Nacken', group: 'maenner', region: 'Gesicht & Hals', minutes: 15, price: 39 },

  { id: 'achseln-1', name: 'Achseln', group: 'maenner', region: 'Oberkörper', minutes: 15, price: 49 },
  { id: 'brust', name: 'Brust', group: 'maenner', region: 'Oberkörper', minutes: 30, price: 69 },
  { id: 'bauch-1', name: 'Bauch', group: 'maenner', region: 'Oberkörper', minutes: 30, price: 69 },
  { id: 'brust-bauch', name: 'Brust & Bauch', group: 'maenner', region: 'Oberkörper', minutes: 30, price: 119, popular: true },
  { id: 'ruecken-inkl-nacken', name: 'Rücken inkl. Nacken', group: 'maenner', region: 'Oberkörper', minutes: 30, price: 99, popular: true },

  { id: 'oberarme', name: 'Oberarme', group: 'maenner', region: 'Arme & Hände', minutes: 15, price: 49 },
  { id: 'arme-komplett', name: 'Arme komplett', group: 'maenner', region: 'Arme & Hände', minutes: 30, price: 79 },
  { id: 'haende-inkl-finger-1', name: 'Hände inkl. Finger', group: 'maenner', region: 'Arme & Hände', minutes: 15, price: 29 },

  { id: 'beine', name: 'Beine', group: 'maenner', region: 'Beine & Füsse', minutes: 45, price: 129 },
  { id: 'fuesse-inkl-zehen-1', name: 'Füsse inkl. Zehen', group: 'maenner', region: 'Beine & Füsse', minutes: 15, price: 29 },

  { id: 'ganzkoerper-1', name: 'Ganzkörper', group: 'maenner', region: 'Ganzkörper', minutes: 120, price: 249, note: '3 Zonen deiner Wahl, jede weitere Zone + CHF 15', popular: true },
  { id: 'jede-weitere-zone-2', name: 'Jede weitere Zone', group: 'maenner', region: 'Ganzkörper', minutes: 25, price: 15, note: 'Gilt nur in Verbindung mit einer Ganzkörperbehandlung', requires: ['ganzkoerper-1'] },
];

export const groupLabel: Record<Group, string> = { frauen: 'Frauen', maenner: 'Männer' };

export function byRegion(group: Group) {
  const map = new Map<string, Service[]>();
  for (const s of services.filter((s) => s.group === group)) {
    if (!map.has(s.region)) map.set(s.region, []);
    map.get(s.region)!.push(s);
  }
  return [...map.entries()];
}

export const findService = (id: string) => [...firstVisit, ...services].find((s) => s.id === id);

export function chf(value: number | null) {
  if (value === null) return 'kostenlos';
  const fixed = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return `CHF ${fixed}`;
}

export function duration(min: number) {
  if (min < 60) return `${min} Min.`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} Std. ${m} Min.` : `${h} Std.`;
}

/** Rabattpreis, auf ganze Franken gerundet */
export function discounted(price: number, percent: number) {
  return Math.round((price * (100 - percent)) / 100);
}

export const priceText = (s: Service) => s.priceLabel ?? chf(s.price);
