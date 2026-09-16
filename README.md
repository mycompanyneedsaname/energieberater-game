# Das Geheimnis der Wärmebrücke

Ein Point-and-Click-Adventure im Stil der alten LucasArts-Spiele zu **Paket 5, Block 8 Teil 1**
(Listung · Energieausweise · Versicherungen · Akquise · Kundengespräch & Angebot · Vor-Ort-Begehung).

Du spielst Kim Kelvin: frisch zertifiziert, Konto 1.500 Euro, Kunden null. Ziel ist das erste
Projekt. Der Weg dorthin führt durch die Inhalte der Unterlage, verpackt als Rätsel, Dialoge
und einen Blumenkasten.

## Nutzen

`index.html` ist vollständig eigenständig, kein Build, kein Server. Öffnen genügt. Zum Teilen
reicht es, den Ordner zu verschicken oder als statische Seite zu hosten (GitHub Pages, Netlify,
beliebiger Webspace).

| Datei | Inhalt |
|---|---|
| `folien/Block8_Vom_Zertifikat_zum_Projekt.pptx` | **Klassische Folien**, drei Minuten plus drei Quizfragen per Handzeichen, mit Sprechernotizen (auch als PDF) |
| `live.html` | **Finger hoch**: fünf Fragen für fünf Minuten am Beamer, die Gruppe antwortet mit erhobenen Fingern |
| `index.html` | Das Adventure (Canvas-Pixelgrafik, Verben, Inventar, Dialoge), etwa 30 bis 40 Minuten |
| `quiz.html` | Das Stationen-Quiz mit 29 Aufgaben in zehn Formaten, als Wiederholung vor der Prüfung |

## Drei Minuten im Kurs: die Folien

13 Folien in `folien/`: Titel, Überblick über die sechs Stationen, vier Inhaltsfolien
(Listung und Ausweise, Versicherung, Akquise und erstes Projekt, Begehung), dann drei Quizfragen
mit jeweils einer Auflösungsfolie, zum Schluss die drei Kernaussagen. Die Sprechernotizen enthalten
die Stichworte je Folie. Die Datei wird aus `folien/build.js` erzeugt (`node build.js`, benötigt
`pptxgenjs`, `react-icons` und `sharp`).

## Fünf Minuten im Kurs: `live.html`

Für die kurze Vermittlung im Team. Du wirfst die Seite an die Wand und klickst durch:

1. Frage erscheint, ein Countdown von 30 Sekunden läuft.
2. Bei null steht „Finger!“ auf dem Bildschirm: alle zeigen gleichzeitig ein bis vier Finger.
3. Du drückst die Zahl, die die Mehrheit gezeigt hat. Die Antwort wird markiert und aufgelöst,
   der Merksatz steht darunter.
4. Leertaste oder Klick: nächste Frage. Am Ende die sechs Merksätze.

Die fünf Fragen sind die Aha-Momente der Unterlage: Blumenkasten-Fall, Profil-Vergleich,
Kosten der Listung, Förderantrag vor Vertrag, Stufe 1 der Ausweiskontrolle. Fragen, Antworten
und Auflösungen stehen im `Q`-Array am Anfang des Skripts, der Countdown in `TIMER`.

## Ablauf des Abenteuers

Fünf Schauplätze: dein Büro, der Marktplatz, das Versicherungsbüro „Assekuranz Prämie“, die
Kneipe „Zum Wärmeleck“ mit GIH-Stammtisch und das Mehrfamilienhaus am Mühlenweg 4.

1. **Listung.** Zeugnis und Formular finden, auf der EEE-Liste hochladen, die richtigen Gebühren
   berechnen, ein Profil wählen, das jemand anrufen würde.
2. **DIBt.** Drei Kontrollfragen zu Registriernummer und Kontrollstufen, dann bestellen.
3. **Versicherung.** Frau Prämie stellt die vier Vorbereitungsfragen, dann den Blumenkasten-Fall
   und die Verstoß-Theorie. Ohne Police fährt Kim zu keiner Begehung.
4. **Akquise.** Frau Ruß empfiehlt nur Gelistete, und nur, wenn man bei Google Maps zu finden ist.
   Zimmerer und Architektin sind Multiplikatoren.
5. **Kundengespräch.** Herr Weber ruft an. Sechs Gesprächszüge, am Ende die Bilanz der sechs
   Erstinformationen. Danach das Angebot am Computer zusammenstellen.
6. **Begehung.** Wärmebildkamera einordnen, Fenster öffnen (Blumenkasten), Wanddicke messen,
   Dach und Keller ansehen, Checkliste Datenaufnahme durchgehen.

Richtige Antworten beim ersten Versuch geben Punkte, falsche kosten nur Zeit. Das Notizbuch
zeigt die offenen Aufgaben. Gespeichert wird automatisch im Browser.

## Einsatz in der Gruppe

- Allein durchspielen dauert etwa 30 bis 40 Minuten.
- Live im Kurs per Bildschirmfreigabe: Die Gruppe entscheidet gemeinsam, was Kim antwortet.
- Das Quiz eignet sich als Wiederholung vor der Prüfung.

## Technik

Eine HTML-Datei je Modus, Vanilla JavaScript, Canvas 2D bei 320 × 180 Pixeln, hochskaliert.
Alle Grafiken werden im Code gezeichnet, es gibt keine Bilddateien. Schriftart VT323 von Google
Fonts mit Monospace-Fallback. Spielstand in `localStorage`, es werden keine Daten übertragen.

Die Dialoge und Rätsel stehen in `index.html` als Skript-Funktionen (`eee`, `dibt`, `praemie`,
`telefon`, `angebot`, `weberTalk` usw.), die Räume als Objekte im `ROOMS`-Block. Fragen lassen
sich dort direkt ändern.

## Inhaltliche Grundlage

Alle Zahlen, Paragrafen und Merksätze stammen aus der Zusammenfassung „Paket 5 — Block 8 Teil 1:
Vom Zertifikat zum ersten Projekt“ (Stand v3.0, 14.08.2026, Folien 9–35 und 60–64).
