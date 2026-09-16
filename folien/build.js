const pptxgen = require("pptxgenjs");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

const C = { dark:"12302F", teal:"0E6B5B", tealSoft:"DCEFE9", sun:"F2B705", sunSoft:"FFF3C7", ink:"14262A", muted:"5A6C6E", light:"F2F5F4", white:"FFFFFF", line:"D2DCD7", ok:"237A41", okSoft:"DFF2E4", bad:"BE3E33", badSoft:"FBE4E0" };
const STATION_COL = ["D64545","E8772E","E9B400","9BBF2E","4CA64C","1E7A4E"];
const HEAD = "Cambria", BODY = "Calibri";

async function icon(Comp, color, size=256){
  const svg = renderToStaticMarkup(React.createElement(Comp,{color:"#"+color,size:String(size)}));
  const buf = await sharp(Buffer.from(svg)).resize(size,size).png().toBuffer();
  return "image/png;base64,"+buf.toString("base64");
}

(async()=>{
  const ICONS = {
    list: await icon(fa.FaClipboardCheck,"FFFFFF"), cert: await icon(fa.FaFileAlt,"FFFFFF"), shield: await icon(fa.FaShieldAlt,"FFFFFF"),
    horn: await icon(fa.FaBullhorn,"FFFFFF"), phone: await icon(fa.FaPhoneAlt,"FFFFFF"), home: await icon(fa.FaHome,"FFFFFF"),
    check: await icon(fa.FaCheck,"FFFFFF"), q: await icon(fa.FaQuestion,C.dark), flower: await icon(fa.FaSeedling,"FFFFFF"), euro: await icon(fa.FaEuroSign,"FFFFFF"),
    camera: await icon(fa.FaCamera,"FFFFFF"), hand: await icon(fa.FaHandshake,"FFFFFF"), search: await icon(fa.FaSearch,"FFFFFF"), listalt: await icon(fa.FaListUl,"FFFFFF"),
  };
  const STATIONS = [
    {n:"Listung", icon:ICONS.list, one:"Ohne EEE-Eintrag keine Förderanträge"},
    {n:"Energieausweise", icon:ICONS.cert, one:"DIBt-Konto, 6,90 € je Nummer"},
    {n:"Versicherung", icon:ICONS.shield, one:"Vor dem ersten Projekt abschließen"},
    {n:"Akquise", icon:ICONS.horn, one:"Aktiv und passiv, beides"},
    {n:"Gespräch & Angebot", icon:ICONS.phone, one:"Förderung vor Vertrag"},
    {n:"Begehung", icon:ICONS.home, one:"Bester Zeitpunkt für Daten"},
  ];

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Lerngruppe Energieberatung";
  pres.title = "Vom Zertifikat zum ersten Projekt";

  const T = (slide, text, o) => slide.addText(text, Object.assign({ isTextBox:true, fontFace:BODY, color:C.ink, margin:0, valign:"top" }, o));
  const badge = (slide, x, y, d, col, img) => { slide.addShape(pres.shapes.OVAL,{x,y,w:d,h:d,fill:{color:col},line:{color:col}}); slide.addImage({data:img,x:x+d*0.25,y:y+d*0.25,w:d*0.5,h:d*0.5}); };
  const stationHeader = (slide, idx, title, eyebrow) => {
    slide.background = { color: C.white };
    badge(slide, 0.5, 0.42, 0.62, STATION_COL[idx], STATIONS[idx].icon);
    T(slide, eyebrow, { x:1.3, y:0.4, w:8.2, h:0.25, fontSize:11, color:C.muted, bold:true, charSpacing:2 });
    T(slide, title, { x:1.3, y:0.62, w:8.2, h:0.5, fontFace:HEAD, fontSize:28, bold:true, color:C.dark });
    T(slide, "Block 8 Teil 1 · Vom Zertifikat zum ersten Projekt", { x:0.5, y:5.2, w:6, h:0.25, fontSize:9, color:C.muted });
  };
  const stationHeader2 = (slide, a, b, title, eyebrow) => {
    slide.background = { color: C.white };
    badge(slide, 0.5, 0.42, 0.62, STATION_COL[a], STATIONS[a].icon); badge(slide, 1.2, 0.42, 0.62, STATION_COL[b], STATIONS[b].icon);
    T(slide, eyebrow, { x:2.0, y:0.4, w:7.5, h:0.25, fontSize:11, color:C.muted, bold:true, charSpacing:2 });
    T(slide, title, { x:2.0, y:0.62, w:7.5, h:0.5, fontFace:HEAD, fontSize:28, bold:true, color:C.dark });
    T(slide, "Block 8 Teil 1 · Vom Zertifikat zum ersten Projekt", { x:0.5, y:5.2, w:6, h:0.25, fontSize:9, color:C.muted });
  };
  const card = (slide, x, y, w, h, fill) => slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill:{color:fill}, line:{color:fill}, rectRadius:0.1 });
  const bullets = (slide, items, o) => T(slide, items.map((t,i)=>({ text:t, options:{ bullet:{indent:12}, breakLine:i<items.length-1, paraSpaceAfter:o.gap??4 } })), o);

  /* ---------- 1 Titel ---------- */
  {
    const s = pres.addSlide(); s.background = { color:C.dark };
    T(s, "PAKET 5 · BLOCK 8 TEIL 1", { x:0.6, y:1.05, w:8.8, h:0.3, fontSize:12, color:C.sun, bold:true, charSpacing:3 });
    T(s, "Vom Zertifikat zum ersten Projekt", { x:0.6, y:1.4, w:8.8, h:1.4, fontFace:HEAD, fontSize:44, bold:true, color:C.white });
    T(s, "Was nach dem Kurs zu tun ist. In drei Minuten, plus ein Quiz.", { x:0.6, y:2.85, w:8.8, h:0.4, fontSize:18, color:"CFE0DB" });
    STATIONS.forEach((st,i)=>{ const x=0.6+i*1.5; badge(s, x, 3.75, 0.62, STATION_COL[i], st.icon); T(s, st.n, { x:x-0.3, y:4.45, w:1.22, h:0.5, fontSize:10.5, color:"CFE0DB", align:"center" }); });
    s.addNotes("Roter Faden: Was muss ich nach dem Kurs administrativ erledigen, wie komme ich an den ersten Kunden, wie starte ich das erste Projekt sauber? Sechs Stationen, dann drei Quizfragen.");
  }

  /* ---------- 2 Sechs Stationen ---------- */
  {
    const s = pres.addSlide(); s.background = { color:C.white };
    T(s, "DER ROTE FADEN", { x:0.5, y:0.4, w:9, h:0.25, fontSize:11, color:C.muted, bold:true, charSpacing:2 });
    T(s, "Sechs Stationen bis zum ersten Projekt", { x:0.5, y:0.62, w:9, h:0.5, fontFace:HEAD, fontSize:28, bold:true, color:C.dark });
    s.addShape(pres.shapes.LINE, { x:1.05, y:2.05, w:7.9, h:0, line:{ color:C.line, width:2 } });
    STATIONS.forEach((st,i)=>{
      const cx = 0.6 + i*1.55; const w = 1.4;
      badge(s, cx+ (w-0.7)/2, 1.7, 0.7, STATION_COL[i], st.icon);
      T(s, String(i+1), { x:cx, y:2.55, w, h:0.3, fontFace:HEAD, fontSize:16, bold:true, color:STATION_COL[i], align:"center" });
      T(s, st.n, { x:cx-0.1, y:2.85, w:w+0.2, h:0.5, fontSize:12, bold:true, color:C.dark, align:"center" });
      T(s, st.one, { x:cx, y:3.35, w, h:0.8, fontSize:11, color:C.muted, align:"center" });
    });
    card(s, 0.6, 4.35, 8.8, 0.65, C.sunSoft);
    T(s, "Reihenfolge ist Programm: Erst gelistet, dann registriert, dann versichert. Und erst dann öffnet man bei einem Kunden ein Fenster.", { x:0.85, y:4.35, w:8.3, h:0.65, fontSize:13, color:C.ink, valign:"middle" });
    s.addNotes("Erst Verwaltung (Listung, DIBt, Versicherung), dann Akquise, dann das Projekt. Die Reihenfolge ist wichtig: Ohne Listung keine Anträge, ohne Versicherung keine Begehung.");
  }

  /* ---------- 3 Listung + Ausweise ---------- */
  {
    const s = pres.addSlide(); stationHeader2(s, 0, 1, "Listung und Energieausweise", "STATION 1 UND 2");
    // left card: EEE
    card(s, 0.5, 1.4, 4.35, 3.65, C.light);
    T(s, "EEE-Liste", { x:0.75, y:1.55, w:3.9, h:0.35, fontFace:HEAD, fontSize:18, bold:true, color:C.dark });
    T(s, "Voraussetzung für jeden Förderantrag", { x:0.75, y:1.9, w:3.9, h:0.3, fontSize:13, bold:true, color:C.teal });
    bullets(s, [
      "Zwei Dokumente: Erklärung des Weiterbildungsanbieters + Hochschulzeugnis",
      "Prüfung 100 € je Modul, über Referenzen +200 €",
      "Jahresbeitrag 120 € (ein Modul) / 170 € (zwei), Nebenadresse 10 €, alles zzgl. MwSt.",
      "Früh starten: Bearbeitung nach Eingangsdatum",
      "Profil pflegen: Kurzbeschreibung, Leistungen, Netzwerk-Logo",
    ], { x:0.75, y:2.3, w:3.9, h:2.7, fontSize:12, color:C.ink, gap:5 });
    // right card: DIBt
    card(s, 5.15, 1.4, 4.35, 3.65, C.light);
    T(s, "Energieausweise", { x:5.4, y:1.55, w:3.9, h:0.35, fontFace:HEAD, fontSize:18, bold:true, color:C.dark });
    T(s, "DIBt-Konto, 6,90 € je Nummer", { x:5.4, y:1.9, w:3.9, h:0.3, fontSize:13, bold:true, color:C.teal });
    bullets(s, [
      "Stufe 1 (DIBt): rein statistisch, keine Rückfragen, nur Nummern an die Behörde",
      "Stufe 2 + 3 (Bauaufsicht, § 99 GModG): unabhängige Stichproben, Antwort schriftlich",
      "Kein Neuausstellen ohne Aufforderung, Bußgeld bis 5.000 €",
      "Übergabe an den Eigentümer macht den Ausweis rechtskräftig",
      "Ausweis nach GModG noch nicht verfügbar",
    ], { x:5.4, y:2.3, w:3.9, h:2.7, fontSize:12, color:C.ink, gap:5 });
    s.addNotes("EEE-Liste: ohne Eintrag keine Förderanträge. Zwei Dokumente. Kosten live zusammenrechnen: 100 € Prüfung je Modul, Jahresbeitrag 120 oder 170 €, alles zzgl. MwSt. DIBt: GEG-Benutzerkonto, 6,90 € je Registriernummer. Stufe 1 ist Statistik, Stufe 2 und 3 sind Behördenprüfung.");
  }

  /* ---------- 4 Versicherung ---------- */
  {
    const s = pres.addSlide(); stationHeader(s, 2, "Zwei Policen, zwei Welten", "STATION 3 · VERSICHERUNG");
    // left: Betriebshaftpflicht
    card(s, 0.5, 1.35, 4.35, 2.45, C.light);
    badge(s, 0.75, 1.55, 0.5, C.teal, ICONS.flower);
    T(s, "Betriebshaftpflicht", { x:1.4, y:1.55, w:3.3, h:0.3, fontFace:HEAD, fontSize:15, bold:true, color:C.dark });
    T(s, "Der Blumenkasten", { x:1.4, y:1.85, w:3.3, h:0.25, fontSize:12, italic:true, color:C.muted });
    bullets(s, ["Personen- und Sachschäden", "Haftung nach § 823 BGB: vorsätzlich oder fahrlässig", "Ereignis und Schaden fallen sofort zusammen"], { x:0.75, y:2.25, w:3.9, h:1.5, fontSize:12, gap:4 });
    // right: VSH
    card(s, 5.15, 1.35, 4.35, 2.45, C.light);
    badge(s, 5.4, 1.55, 0.5, C.teal, ICONS.euro);
    T(s, "Vermögensschadenhaftpflicht", { x:6.05, y:1.55, w:3.4, h:0.3, fontFace:HEAD, fontSize:13.5, bold:true, color:C.dark });
    T(s, "Der Beratungsfehler", { x:6.05, y:1.85, w:3.3, h:0.25, fontSize:12, italic:true, color:C.muted });
    bullets(s, ["Finanzielle Schäden bei Kunden oder Dritten", "Verstoß-Theorie: Auslöser ist der Verstoß, der Schaden zeigt sich später", "Passiver Rechtsschutz inklusive"], { x:5.4, y:2.25, w:3.9, h:1.5, fontSize:12, gap:4 });
    // bottom callout
    card(s, 0.5, 4.0, 9.0, 1.05, C.sunSoft);
    T(s, [
      { text:"Vor dem ersten Projekt abschließen. ", options:{ bold:true } },
      { text:"Verstöße vor Vertragsbeginn sind nicht versichert. Auf Nachhaftung achten, die Haftung kann auf Erben übergehen. Die Prämie ist Betriebsausgabe.", options:{} },
      { text:"\nVier Fragen vor dem Gespräch: ", options:{ bold:true } },
      { text:"Welche Leistungen? Welches Hauptgeschäftsfeld? Welche Risiken und welches Schadenspotenzial? Welcher Umsatz?", options:{} },
    ], { x:0.75, y:4.0, w:8.5, h:1.05, fontSize:12, valign:"middle" });
    s.addNotes("Blumenkasten-Beispiel: Fenster öffnen, Blumenkasten fällt, trifft eine Person. Fahrlässig, § 823 BGB, Betriebshaftpflicht. Beratungsfehler dagegen: Vermögensschadenhaftpflicht, Verstoß-Theorie. Wichtig: vorher abschließen, Nachhaftung. Regelheft EEE-Liste 1.1.2 verlangt eine passende Haftpflicht.");
  }

  /* ---------- 5 Akquise + Projekt ---------- */
  {
    const s = pres.addSlide(); stationHeader2(s, 3, 4, "Vom Kontakt zum Auftrag", "STATION 4 UND 5 · AKQUISE, GESPRÄCH, ANGEBOT");
    // left: Akquise two mini columns
    card(s, 0.5, 1.4, 4.1, 3.65, C.light);
    T(s, "Akquise: beide Kanäle", { x:0.75, y:1.55, w:3.7, h:0.35, fontFace:HEAD, fontSize:17, bold:true, color:C.dark });
    T(s, "Aktiv", { x:0.75, y:2.0, w:1.7, h:0.25, fontSize:12, bold:true, color:C.teal });
    bullets(s, ["Partner-Berater:innen", "GIH oder DEN", "Messen", "Multiplikatoren: Zimmerer, Schornsteinfeger", "Social Media", "Architekturbüros über BDB"], { x:0.75, y:2.3, w:1.85, h:2.7, fontSize:11, gap:3 });
    T(s, "Passiv", { x:2.75, y:2.0, w:1.7, h:0.25, fontSize:12, bold:true, color:C.teal });
    bullets(s, ["EEE-Liste", "Eigene Webseite", "Portale", "Google-Maps-Eintrag"], { x:2.75, y:2.3, w:1.7, h:2.7, fontSize:11, gap:3 });
    // right: 4 steps + callout
    card(s, 4.9, 1.4, 4.6, 2.05, C.light);
    T(s, "Erstes Projekt: vier Schritte", { x:5.15, y:1.55, w:4.2, h:0.35, fontFace:HEAD, fontSize:17, bold:true, color:C.dark });
    ["Erster Austausch, Projektziel abstimmen", "Angebot erstellen", "Fördermittel identifizieren", "Fördermittel beantragen, für die Beratung"].forEach((t,i)=>{
      s.addShape(pres.shapes.OVAL, { x:5.15, y:1.98+i*0.35, w:0.26, h:0.26, fill:{color:STATION_COL[4]}, line:{color:STATION_COL[4]} });
      T(s, String(i+1), { x:5.15, y:1.98+i*0.35, w:0.26, h:0.26, fontSize:11, bold:true, color:C.white, align:"center", valign:"middle" });
      T(s, t, { x:5.5, y:1.98+i*0.35, w:3.9, h:0.26, fontSize:12, valign:"middle" });
    });
    card(s, 4.9, 3.6, 4.6, 1.45, C.sunSoft);
    T(s, [
      { text:"Im Gespräch klären: ", options:{ bold:true } },
      { text:"Umfang, Zeitrahmen, Verhältnis zum Gebäude, frühere Beratung, Kosten, Bedingungen.", options:{} },
      { text:"\nFörderung vor Vertragsschluss: ", options:{ bold:true } },
      { text:"Der Kunde beantragt online beim BAFA mit deiner Beraternummer. Das Angebot beschreibt die Leistung klar, mit Preis, Förderhöhe und Fristen.", options:{} },
    ], { x:5.15, y:3.6, w:4.1, h:1.45, fontSize:11.5, valign:"middle" });
    s.addNotes("Akquise: aktive und passive Kanäle, beide nutzen. Erstes Projekt: Austausch, Angebot, Fördermittel identifizieren, beantragen. Sechs Erstinformationen im ersten Gespräch. Wichtig: Förderung beantragen, bevor das Vertragsverhältnis eingegangen wird. Angebot: Checkliste Vertragsgestaltung vom Gebäudeforum.");
  }

  /* ---------- 6 Begehung ---------- */
  {
    const s = pres.addSlide(); stationHeader(s, 5, "Die Vor-Ort-Begehung", "STATION 6");
    const goals = [["hand","Persönliches Kennenlernen"],["search","Sanierungsziel bestimmen"],["listalt","Datenerfassung mit Checkliste"],["euro","Fördermittel und nächste Schritte"],["home","Sonderwünsche abklären"],["camera","Thermografie nur mit Schulung"]];
    goals.forEach(([ic,t],i)=>{
      const col=i%3, row=Math.floor(i/3); const x=0.5+col*3.05, y=1.4+row*1.25;
      card(s, x, y, 2.85, 1.05, C.light);
      badge(s, x+0.2, y+0.25, 0.55, i===5?C.sun:C.teal, ICONS[ic]);
      T(s, t, { x:x+0.9, y:y, w:1.85, h:1.05, fontSize:13, bold:true, color:C.dark, valign:"middle" });
    });
    card(s, 0.5, 3.95, 9.0, 1.1, C.sunSoft);
    T(s, [
      { text:"Drei freie Checklisten: ", options:{ bold:true } },
      { text:"Energieberatungstag (Rosenheim / GIH Bayern), Vorabgespräch mit dem Eigentümer (BAFA / FEBS), Datenaufnahme (Gebäudeforum). Dazu die virtuelle Gebäudebegehung der Uni Kassel zum Üben.", options:{} },
      { text:"\nMerksatz: ", options:{ bold:true } },
      { text:"Die Begehung ist der beste Zeitpunkt, um Daten zu sammeln. Was Kund:innen wünschen und was möglich ist, deckt sich nicht immer.", options:{} },
    ], { x:0.75, y:3.95, w:8.5, h:1.1, fontSize:12, valign:"middle" });
    s.addNotes("Ziele der Begehung. Wärmebildkamera: Wärmelecks und Schäden früh erkennen, aber ohne passende Randbedingungen und Schulung schnell fehlinterpretiert. Drei Checklisten nennen, virtuelle Begehung der Uni Kassel erwähnen.");
  }

  /* ---------- Quiz ---------- */
  const QUIZ = [
    { story:"Bei einer Begehung öffnest du ein Fenster, um die Wanddicke zu messen, und stößt einen Blumenkasten hinunter. Er trifft eine Person.", q:"Welche Versicherung reguliert?", opts:["Betriebshaftpflicht","Vermögensschadenhaftpflicht","Rechtsschutz"], a:0, why:"Personenschaden, fahrlässig, § 823 BGB. Beratungsfehler wären die Vermögensschadenhaftpflicht. Beide vor dem ersten Projekt abschließen." },
    { story:"Herr Weber hat dein Angebot für den Vor-Ort-Termin und will sofort den Vertrag unterschreiben.", q:"Was muss vorher passieren?", opts:["Nichts, erst Vertrag, dann Förderung","Er stellt den BAFA-Antrag mit deiner Beraternummer","Du stellst den Antrag für ihn"], a:1, why:"Die Förderung wird beantragt, bevor das Vertragsverhältnis eingegangen wird. Der Kunde stellt den Antrag online beim BAFA und gibt deine Beraternummer an." },
    { story:"Zwei Module, Eintragung über Referenzen, eine Nebenadresse.", q:"Was kostet die Listung im ersten Jahr?", opts:["220 € netto","370 € netto","580 € netto"], a:2, why:"2 × 100 € Prüfung + 200 € Referenzzuschlag + 170 € Jahresbeitrag + 10 € Nebenadresse = 580 € netto, 690,20 € mit MwSt." },
  ];
  QUIZ.forEach((qz,qi)=>{
    for(const reveal of [false,true]){
      const s = pres.addSlide(); s.background = { color:C.dark };
      T(s, "QUIZ · FRAGE "+(qi+1)+" VON 3", { x:0.6, y:0.45, w:8.8, h:0.25, fontSize:11, color:C.sun, bold:true, charSpacing:3 });
      T(s, qz.story, { x:0.6, y:0.85, w:8.8, h:0.7, fontSize:15, color:"CFE0DB", italic:true });
      T(s, qz.q, { x:0.6, y:1.6, w:8.8, h:0.7, fontFace:HEAD, fontSize:28, bold:true, color:C.white });
      qz.opts.forEach((o,i)=>{
        const x=0.6+i*2.95, y=2.5, w=2.75, h=1.1;
        const isA = reveal && i===qz.a; const fill = isA ? C.ok : "1D4540";
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill:{color:fill}, line:{color: isA?C.ok:"2F5C55", width:1.5}, rectRadius:0.12 });
        T(s, ["A","B","C"][i], { x:x+0.2, y:y+0.15, w:0.5, h:0.4, fontFace:HEAD, fontSize:20, bold:true, color: isA?C.white:C.sun });
        T(s, o, { x:x+0.2, y:y+0.5, w:w-0.4, h:0.55, fontSize:12, color:C.white, valign:"top" });
        if(isA) s.addImage({ data:ICONS.check, x:x+w-0.5, y:y+0.15, w:0.3, h:0.3 });
      });
      if(reveal){
        card(s, 0.6, 3.9, 8.8, 1.05, "1D4540");
        T(s, [{ text:"Auflösung: ", options:{ bold:true, color:C.sun } }, { text:qz.why, options:{ color:C.white } }], { x:0.85, y:3.9, w:8.3, h:1.05, fontSize:13, valign:"middle" });
      } else {
        T(s, "Handzeichen: A, B oder C?", { x:0.6, y:4.1, w:8.8, h:0.4, fontSize:16, color:C.sun, bold:true });
      }
      s.addNotes(reveal ? "Auflösung: "+qz.why : "Frage vorlesen, kurz warten, Handzeichen abfragen. Dann weiter zur Auflösung.");
    }
  });

  /* ---------- Schluss ---------- */
  {
    const s = pres.addSlide(); s.background = { color:C.white };
    T(s, "ZUM MITNEHMEN", { x:0.5, y:0.4, w:9, h:0.25, fontSize:11, color:C.muted, bold:true, charSpacing:2 });
    T(s, "Drei Kernaussagen", { x:0.5, y:0.62, w:9, h:0.5, fontFace:HEAD, fontSize:28, bold:true, color:C.dark });
    [["EEE-Liste","Frühzeitig registrieren, das Profil aussagekräftig machen. Ohne Eintrag keine Förderanträge.", STATION_COL[0], ICONS.list],
     ["Versicherung","Genau definieren, welche Leistungen man anbietet, und dann den passenden Schutz suchen. Vor dem ersten Projekt.", STATION_COL[2], ICONS.shield],
     ["Energieausweise","Prüfen, ob ein Ausweis überhaupt nötig ist. Profil beim DIBt anlegen und Nummern bestellen.", STATION_COL[1], ICONS.cert]].forEach(([h,t,col,ic],i)=>{
      const y=1.4+i*1.15; card(s, 0.5, y, 9.0, 1.0, C.light); badge(s, 0.75, y+0.2, 0.6, col, ic);
      T(s, h, { x:1.55, y:y+0.15, w:7.7, h:0.3, fontFace:HEAD, fontSize:16, bold:true, color:C.dark });
      T(s, t, { x:1.55, y:y+0.47, w:7.7, h:0.45, fontSize:12.5, color:C.ink });
    });
    T(s, "Grundlage: Zusammenfassung Paket 5, Block 8 Teil 1, v3.0 (14.08.2026)", { x:0.5, y:5.0, w:9, h:0.25, fontSize:9, color:C.muted });
    s.addNotes("Die drei Kernaussagen der Unterlage. Danke, Fragen?");
  }

  await pres.writeFile({ fileName: "Block8_Vom_Zertifikat_zum_Projekt.pptx" });
  console.log("written");
})();
