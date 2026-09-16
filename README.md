# Vom Zertifikat zum ersten Projekt

Ein browserbasiertes Lernspiel zu **Paket 5, Block 8 Teil 1** (Listung · Energieausweise ·
Versicherungen · Akquise · Kundengespräch & Angebot · Vor-Ort-Begehung).

Gedacht für die Lerngruppe: einmal durchspielen dauert rund 20–30 Minuten, jede Aufgabe
liefert die fachliche Erklärung gleich mit.

## Nutzen

Die Datei `index.html` ist vollständig eigenständig — kein Build, kein Server, keine
Abhängigkeiten außer den Webfonts. Öffnen genügt:

```
open index.html          # macOS
xdg-open index.html      # Linux
```

Zum Teilen reicht es, die Datei zu verschicken oder als statische Seite zu hosten
(GitHub Pages, Netlify, beliebiger Webspace).

## Aufbau

Sechs Stationen folgen dem roten Faden der Unterlage: Was muss ich nach dem Kurs
administrativ erledigen, wie komme ich an den ersten Kunden, wie starte ich das erste
Projekt sauber?

| # | Station | Aufgaben |
|---|---|---|
| 1 | EEE-Liste | 5 |
| 2 | Energieausweise | 5 |
| 3 | Versicherungen | 7 |
| 4 | Akquise | 4 |
| 5 | Erstes Projekt | 4 |
| 6 | Vor-Ort-Begehung | 4 |

Insgesamt 29 Aufgaben, 290 Punkte. Nach jeder Station erscheinen die Merksätze des
Kapitels, am Ende eine Auswertung je Station mit Rang.

## Aufgabentypen

- **Auswahl / Mehrfachauswahl** — klassische Wissensfragen mit Erklärung
- **Richtig oder falsch** — Schnellcheck über mehrere Aussagen
- **Zuordnen** — Karten in zwei Töpfe sortieren (z. B. Betriebshaftpflicht vs. Vermögensschadenhaftpflicht)
- **Paare finden** — Versicherung ↔ Zweck, Checkliste ↔ Herausgeber
- **Reihenfolge** — die vier Schritte des ersten Projekts
- **Kostenrechner** — Beiträge der EEE-Listung selbst ausrechnen, mit Auflösung als Rechenweg
- **Kundengespräch** — sechs Gesprächszüge als Dialog, am Ende die Bilanz der sechs Erstinformationen
- **Fehlersuche** — drei fehlerhafte Zeilen in einem Angebotsentwurf markieren
- **Profil-Vergleich** — zwei EEE-Profile nebeneinander, welches ruft man an?

## Einsatz in der Gruppe

- **Vor der Sitzung** als Selbststudium, danach nur noch die strittigen Punkte besprechen
- **Live im Kurs** per Bildschirmfreigabe: Frage zeigen, Gruppe abstimmen lassen, dann auflösen —
  besonders der Blumenkasten-Fall und der Profil-Vergleich funktionieren so gut
- **Als Wettbewerb**: alle spielen allein, die Punktzahl wird über „Ergebnis kopieren" geteilt

## Technik

Eine HTML-Datei, Vanilla JavaScript, keine Frameworks. Punktestand und Fortschritt liegen
in `localStorage` und damit nur im Browser der spielenden Person — es werden keine Daten
übertragen. Die Oberfläche folgt dem Hell-/Dunkelmodus des Systems und funktioniert ab
etwa 400 px Breite.

## Inhaltliche Grundlage

Alle Fragen, Zahlen und Merksätze stammen aus der Zusammenfassung „Paket 5 — Block 8 Teil 1:
Vom Zertifikat zum ersten Projekt" (Stand v3.0, 14.08.2026, Folien 9–35 und 60–64).
Ändert sich die Unterlage, werden die Inhalte im `STATIONS`-Array am Anfang des
`<script>`-Blocks in `index.html` angepasst — Fragen, Antworten und Erklärungen stehen dort
als eine zusammenhängende Datenstruktur.
