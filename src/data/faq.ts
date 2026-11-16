// FAQ – inhaltlich basierend auf der bestehenden FAQ-Seite, sprachlich überarbeitet
// und nach den Fragen sortiert, die sich Kund:innen in der Reihenfolge ihrer Entscheidung stellen.
// Antworten dürfen einfaches HTML enthalten.

export interface Faq {
  q: string;
  a: string;
  id: string;
}

export interface FaqGroup {
  title: string;
  intro?: string;
  items: Faq[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: 'Vor deinem ersten Termin',
    intro: 'Die Fragen, die uns fast alle beim ersten Mal stellen – und das ist gut so.',
    items: [
      {
        id: 'schmerz',
        q: 'Tut Laserhaarentfernung weh?',
        a: `<p>Ehrlich gesagt: Das ist sehr individuell. Viele beschreiben es als kurzes, warmes Pieksen – gut aushaltbar, aber je nach Zone, Haardichte und Tagesform unterschiedlich stark.</p>
<p>Wir sagen dir vorher, was dich erwartet, fragen während der Behandlung immer wieder nach und passen die Einstellungen an dich an. Eine Pause ist jederzeit okay – du gibst das Tempo vor.</p>`,
      },
      {
        id: 'unangenehm',
        q: 'Mir ist die Behandlung im Intimbereich etwas unangenehm.',
        a: `<p>Das verstehen wir total – und du bist damit nicht allein. Für uns ist das Alltag, für dich vielleicht nicht, und genau deshalb nehmen wir uns Zeit.</p>
<p>Wir erklären dir jeden Schritt, bevor er passiert, arbeiten ruhig und diskret in einem geschlossenen Behandlungsraum und du kannst jederzeit Fragen stellen oder stoppen.</p>`,
      },
      {
        id: 'geeignet',
        q: 'Funktioniert das bei meiner Haut und meinen Haaren?',
        a: `<p>Der Laser zielt auf das Melanin – also den Farbstoff – im Haar. Darum wirkt die Behandlung bei dunkleren Haaren am besten. <strong>Sehr helle, graue oder rote Haare</strong> enthalten wenig Melanin, dort ist die Wirkung eingeschränkt.</p>
<p>Bei <strong>sehr dunkler Haut</strong> ist der Kontrast zwischen Haut und Haar geringer. In diesem Fall machen wir zuerst einen Teststreifen an einer kleinen Stelle. Ob und wie gut es bei dir funktioniert, klären wir ehrlich im Beratungsgespräch.</p>`,
      },
      {
        id: 'kontraindikationen',
        q: 'Wann ist eine Behandlung nicht möglich?',
        a: `<ul>
<li><strong>Schwangerschaft und Stillzeit</strong></li>
<li><strong>Frische Bräune</strong> oder sonnengeschädigte Haut</li>
<li><strong>Aktive Hauterkrankungen</strong> im Behandlungsbereich, z. B. Ekzeme, Psoriasis oder Akne</li>
<li><strong>Lichtsensibilisierende Medikamente</strong>, z. B. bestimmte Antibiotika oder Aknemittel wie Isotretinoin</li>
</ul>
<p>Vor der ersten Behandlung gehen wir deine Situation mit dir durch. Wenn nötig, empfehlen wir dir eine kurze Rücksprache mit deiner Ärztin oder deinem Arzt.</p>`,
      },
      {
        id: 'beratung',
        q: 'Brauche ich vorher ein Beratungsgespräch?',
        a: `<p>Nein. Bei deinem ersten Behandlungstermin beraten wir dich ohnehin ausführlich, prüfen Haut- und Haartyp und klären alle Fragen, bevor der Laser zum Einsatz kommt.</p>
<p>Wenn du dir noch unsicher bist, kannst du aber gerne zuerst ein <strong>kostenloses Beratungsgespräch (25 Min.)</strong> buchen – ganz ohne Verpflichtung.</p>`,
      },
    ],
  },
  {
    title: 'Behandlung & Ergebnis',
    items: [
      {
        id: 'funktion',
        q: 'Wie funktioniert Laserhaarentfernung?',
        a: `<p>Der Laser sendet gebündeltes Licht, das vom Melanin im Haar aufgenommen wird. Die Energie wird in Wärme umgewandelt und trifft gezielt die Haarwurzel – das umliegende Gewebe wird dabei geschont. Das Prinzip heisst selektive Photothermolyse.</p>
<p>Am besten wirkt das, wenn sich das Haar in der Wachstumsphase befindet, weil es dann aktiv wächst und am meisten Melanin enthält.</p>`,
      },
      {
        id: 'sitzungen',
        q: 'Wie viele Sitzungen brauche ich?',
        a: `<p>Weil immer nur ein Teil deiner Haare gerade in der Wachstumsphase ist, braucht es mehrere Sitzungen. Wie viele es bei dir sind, ist <strong>sehr individuell</strong> – das hängt von Zone, Haardichte, Hauttyp und Hormonhaushalt ab. Darum geben wir dir keine pauschale Zahl, sondern schauen uns deinen Verlauf von Sitzung zu Sitzung an.</p>
<p>Am Anfang liegen etwa 4 bis 8 Wochen zwischen den Terminen. Wenn der Haarwuchs nachlässt, vergrössern wir den Abstand schrittweise auf bis zu 12 Wochen. Zonen mit schnellerem Haarwuchs wie Gesicht oder Achseln brauchen oft etwas mehr Sitzungen.</p>
<p>Wir arbeiten bewusst nicht mit Standard-Versprechen wie «8 Behandlungen für alle», sondern planen mit dir, was für deinen Körper realistisch ist.</p>`,
      },
      {
        id: 'ausfallen',
        q: 'Wann fallen die Haare aus?',
        a: `<p>Nicht sofort. Die behandelten Haare fallen meist <strong>innerhalb von 1 bis 3 Wochen</strong> nach der Sitzung aus. Ein sanftes Peeling unterstützt das.</p>
<p>Schon nach der ersten Behandlung merkst du oft eine Reduktion. Weil aber noch nicht alle Haare erwischt wurden, ist das zu Beginn häufig nur vorübergehend – die dauerhafte Reduktion baut sich über die Sitzungen auf.</p>`,
      },
      {
        id: 'dauer',
        q: 'Wie lange dauert eine Sitzung?',
        a: `<p>Kleine Zonen wie Gesicht, Achseln oder Intimbereich dauern etwa <strong>10 bis 20 Minuten</strong>. Grössere Bereiche wie Beine, Rücken oder Brust <strong>30 bis 60 Minuten</strong>. Plane zusätzlich ein paar Minuten für Vor- und Nachbesprechung ein – Hektik gibt es bei uns nicht.</p>`,
      },
      {
        id: 'haarfrei',
        q: 'Wie lange bin ich danach haarfrei?',
        a: `<p>Nach den empfohlenen Sitzungen stellen die meisten eine deutliche, langfristige Reduktion des Haarwuchses fest. Wie lange das Ergebnis anhält, ist individuell – meist mehrere Monate bis Jahre. Auch der Hormonhaushalt spielt dabei eine Rolle.</p>`,
      },
      {
        id: 'ipl',
        q: 'Laser oder IPL – wo ist der Unterschied?',
        a: `<p>Ein Laser arbeitet mit einem fokussierten Lichtstrahl in einer bestimmten Wellenlänge und trifft die Haarwurzel dadurch sehr gezielt. IPL nutzt ein breites Lichtspektrum, das weniger zielgerichtet und oft weniger effektiv ist.</p>
<p>Wir arbeiten ausschliesslich mit einem <strong>medizinischen Diodenlaser</strong>. Er ist vielseitig einsetzbar und bietet eine gute Balance aus Wirksamkeit und Sicherheit – auch bei unterschiedlichen Hauttypen.</p>`,
      },
    ],
  },
  {
    title: 'Vorbereitung & Pflege',
    items: [
      {
        id: 'rasieren',
        q: 'Wann muss ich mich rasieren?',
        a: `<p><strong>24 bis 48 Stunden vor deinem Termin</strong> rasierst du die Zone gründlich. Leichte Stoppeln sollen noch sichtbar sein, damit sie die Laserenergie aufnehmen können. Sind die Haare zu lang, geht die Energie an der Oberfläche verloren.</p>
<p>Zwischen den Sitzungen darfst du weiterhin rasieren – aber bitte <strong>nicht wachsen, zupfen oder epilieren</strong>. Diese Methoden entfernen die Haarwurzel, die der Laser braucht.</p>`,
      },
      {
        id: 'gesicht-rasieren',
        q: 'Wie rasiere ich am besten mein Gesicht?',
        a: `<p>Keine Sorge: Das Abschneiden des Haares selbst lässt es nicht dicker nachwachsen. Herkömmliche Rasierer mit mehreren Klingen ziehen das Haar aber leicht aus dem Haarkanal, bevor es geschnitten wird – dieser Zug kann die Haarwurzel zu stärkerem Wachstum anregen.</p>
<p>Nimm deshalb am besten einen <strong>Gesichtsrasierer mit nur einer Klinge</strong> und rasiere immer in Wuchsrichtung.</p>`,
      },
      {
        id: 'vorher',
        q: 'Was muss ich vor der Behandlung beachten?',
        a: `<ul>
<li><strong>Rasieren:</strong> 24 bis 48 Stunden vorher</li>
<li><strong>Kein Wachsen oder Zupfen:</strong> 4 Wochen vorher damit aufhören</li>
<li><strong>Sonne:</strong> 14 Tage vorher keine direkte Sonne und keine frische Bräune</li>
<li><strong>Selbstbräuner:</strong> in den Wochen davor vermeiden</li>
<li><strong>Hautpflege:</strong> 10 Tage vorher keine Säurepeelings oder Retinoide auf der Zone</li>
<li><strong>Medikamente:</strong> sag uns vorher Bescheid oder kläre es mit deiner Ärztin / deinem Arzt</li>
<li><strong>Trinken:</strong> genug Wasser hilft deiner Haut, die Wärme besser zu verarbeiten</li>
</ul>`,
      },
      {
        id: 'nachher',
        q: 'Und was nach der Behandlung?',
        a: `<ul>
<li><strong>Kühlen</strong> reduziert Rötungen</li>
<li>Eine <strong>sanfte Feuchtigkeitscreme</strong> beruhigt die Haut</li>
<li><strong>2 Wochen keine direkte Sonne</strong> – sonst unbedingt LSF 50</li>
<li><strong>2 Tage</strong> kein Chlor- oder Salzwasser und kein starkes Schwitzen</li>
</ul>`,
      },
    ],
  },
  {
    title: 'Termin & Kosten',
    items: [
      {
        id: 'kosten',
        q: 'Was kostet Laserhaarentfernung?',
        a: `<p>Du bezahlst pro Sitzung und Zone – die Preise findest du transparent in unserer <a href="/preise">Preisliste</a>. Was du insgesamt investierst, hängt davon ab, wie viele Sitzungen du brauchst. Das schätzen wir bei deinem ersten Termin ehrlich mit dir ab.</p>`,
      },
      {
        id: 'bezahlen',
        q: 'Wann und wie bezahle ich?',
        a: `<p>Erst <strong>vor Ort, nach deinem Termin</strong> – ganz wie es dir passt: <strong>bar, mit TWINT oder mit Karte</strong>. Online musst du nichts bezahlen.</p>`,
      },
      {
        id: 'parken',
        q: 'Wo kann ich parken?',
        a: `<p>Direkt an der Strasse vor dem Studio gibt es Parkplätze. Du findest uns an der Bahnhofstrasse 20 in Amriswil.</p>`,
      },
      {
        id: 'absagen',
        q: 'Was, wenn ich meinen Termin nicht wahrnehmen kann?',
        a: `<p>Kein Problem – sag uns einfach <strong>mindestens 24 Stunden vorher</strong> Bescheid, per Telefon, WhatsApp oder E-Mail. Bei späteren Absagen müssen wir den Termin leider voll verrechnen.</p>`,
      },
      {
        id: 'wer',
        q: 'Wer darf Laserhaarentfernung durchführen?',
        a: `<p>Nur qualifizierte Fachpersonen. In der Schweiz verlangt die Verordnung V‑NISSG für kosmetische Laserbehandlungen einen Sachkundenachweis. Unser Team hat diese Ausbildung erfolgreich abgeschlossen.</p>`,
      },
    ],
  },
];

/** Auswahl für die Startseite: die typischen Ängste */
export const topFaqIds = ['schmerz', 'unangenehm', 'sitzungen', 'geeignet', 'kosten', 'absagen'];
export const allFaqs = faqGroups.flatMap((g) => g.items);
export const pickFaqs = (ids: string[]) => ids.map((id) => allFaqs.find((f) => f.id === id)!).filter(Boolean);

/** Kurzantworten für die Startseite (Details auf /faq) */
export const shortFaqs: { q: string; a: string }[] = [
  { q: 'Tut das weh?', a: 'Meist ein kurzes, warmes Pieksen. Du gibst das Tempo vor, Pausen sind jederzeit okay.' },
  { q: 'Intimbereich – ist das nicht unangenehm?', a: 'Ganz normal, dass du daran denkst. Geschlossener Raum, ruhig und diskret, jeder Schritt wird erklärt.' },
  { q: 'Wie viele Sitzungen brauche ich?', a: 'Das ist individuell. Wir schätzen es ehrlich ein und passen den Plan von Mal zu Mal an.' },
  { q: 'Wann bezahle ich?', a: 'Erst vor Ort nach dem Termin – bar, TWINT oder Karte.' },
];
