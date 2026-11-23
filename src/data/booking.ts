// Online-Buchung über meetergo.
// Die Website spricht direkt mit der öffentlichen Buchungs-Schnittstelle von meetergo
// (freie Zeiten abfragen, Termin anlegen) – genau wie die meetergo-Buchungsseite selbst.
// Dafür ist KEIN API-Schlüssel im Browser nötig. meetergo prüft den verbundenen
// iCloud-Kalender, trägt die Buchung dort ein und verschickt Bestätigung und Erinnerung.
//
// Ein Termintyp „Laserbehandlung“ mit allen erlaubten Dauern (Summe der Zonen, auf
// 15 Min. aufgerundet) plus der Termintyp „Beratungsgespräch“.
// Weitere Personen (z. B. Sarah) als weiteren Eintrag in `staff` ergänzen – das Tool
// führt die freien Zeiten aller Personen zusammen.

export interface StaffCalendar {
  id: string;
  name: string;
  /** meetergo-Benutzer-ID (Host) */
  hostId: string;
  /** Termintyp „Laserbehandlung“ */
  treatment: string;
  /** Termintyp „Beratungsgespräch“ */
  consult: string;
}

export const booking = {
  api: 'https://api.meetergo.com/v4',
  timeZone: 'Europe/Zurich',
  /** wie weit im Voraus gebucht werden kann (muss zu meetergo passen) */
  windowDays: 56,
  /** Raster der Startzeiten in Minuten (wie in meetergo eingestellt) */
  slotStep: 15,
  /** in meetergo erlaubte Dauern des Termintyps „Laserbehandlung“ */
  durations: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 180],
  staff: [
    {
      id: 'studio',
      name: 'Eloure',
      hostId: '499a8f32-4b10-4b1f-b59d-6e3249477d56',
      treatment: '285f1cde-8941-4c9d-a606-92a3826e0a69',
      consult: '8deff375-1acd-49bf-a9a9-9c335deb5064',
    },
  ] as StaffCalendar[],
};
