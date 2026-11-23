// Online-Buchung über Cal.com.
// Die Website spricht direkt mit der öffentlichen Buchungs-Schnittstelle von Cal.com
// (freie Zeiten abfragen, Termin anlegen) – dafür ist KEIN API-Schlüssel nötig.
// Cal.com prüft den verbundenen iCloud-Kalender und trägt die Buchung dort ein.
//
// Pro Person: ein Event-Typ je Dauer (Minuten → Event-Typ-ID) und das Beratungsgespräch.
// Weitere Personen (z. B. Sarah) einfach als weiteren Eintrag ergänzen – das Tool
// führt die freien Zeiten aller Personen zusammen.

export interface StaffCalendar {
  id: string;
  name: string;
  eventTypes: Record<number, number>;
  consult: number;
}

export const booking = {
  api: 'https://api.cal.com/v2',
  timeZone: 'Europe/Zurich',
  /** wie weit im Voraus gebucht werden kann (muss zu Cal.com passen) */
  windowDays: 56,
  /** Raster der Startzeiten in Minuten (wie in Cal.com eingestellt) */
  slotStep: 15,
  /** Testphase: Buchungen landen im Testkalender */
  testMode: true,
  /**
   * Kennung der Buchungsfrage „Behandlung“ in Cal.com (für den Kalendertitel).
   * Erst eintragen, wenn die Frage in ALLEN Event-Typen angelegt ist – sonst null lassen.
   */
  treatmentField: null as string | null,
  staff: [
    {
      id: 'studio',
      name: 'Eloure',
      eventTypes: {
        15: 8030363,
        30: 8030365,
        45: 8030364,
        60: 8030366,
        75: 8030367,
        90: 8030369,
        105: 8030368,
        120: 8030370,
        135: 8030371,
        150: 8030372,
        180: 8030373,
      },
      consult: 8030337,
    },
  ] as StaffCalendar[],
};
