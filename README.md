# 🦷 ZFA Lernapp (Bilingual: Deutsch / Französisch)

Eine moderne, mobile-optimierte E-Learning Web-App für Zahnmedizinische Fachangestellte (ZFA) im 1. Ausbildungsjahr (Sprachniveau A2/B1). 

Gebaut mit **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Lucide Icons** und Duolingo-artiger Gamification.

---

## 🌟 Highlights & Funktionen

- 📱 **Mobile-First Design:** Zu 100 % für Smartphones optimiert (`max-w-md mx-auto`, sichere Touch-Flächen von min. 48px Höhe, feste Aktionsleiste am Bildschirmrand).
- 🌍 **Strikte Zweisprachigkeit:**
  - **Haupttext:** Großes, fettes, leicht verständliches Deutsch (A2/B1 Niveau).
  - **Französische Übersetzung:** Direkt darunter in kontrastierendem Indigo-Farbton zur optimalen Verständlichkeit.
  - **Lateinische Fachterminologie:** Standardisiert für die ZFA-Prüfungen.
- 🎨 **Interaktive Grafiken & Visualisierungen:**
  - **Zahnanatomie (`ToothAnatomyDiagram`):** Interaktiver Zahnquerschnitt mit Schmelz, Dentin, Pulpa, Zement, Wurzelhaut, Kieferknochen und Zahnfleisch.
  - **Zahnhartsubstanzen (`ToothSubstancesDiagram`):** Vergleich des Mineralgehalts (96 %, 70 %, 65 %, 0 %) und der Härte.
  - **Zahnarten (`ToothTypesDiagram`):** Schneidezähne, Eckzähne, Prämolaren und Molaren im direkten Vergleich.
  - **FDI-Zahnschema (`FdiSchemeDiagram`):** Das 2-Ziffern-Quadrantenkreuz (Erwachsene 1–4, Milchzähne 5–8) mit Aussprache-Regeln.
  - **Hygienekette (`HygieneStepsDiagram`):** Händedesinfektion, PSA, RDG und Autoklav.
- 🎮 **Gamification & Duolingo-UX:**
  - Vertikaler Pfad (Roadmap) mit bunten Modul-Knoten und Statusanzeigen (gesperrt / aktiv / gemeistert).
  - Sofortiges Feedback bei Quizzes: Fehler-Wackeln (`animate-shake`) und Signal-Rot bei falscher Antwort, sanfter Sprung (`animate-bounce-short`) und Signal-Grün bei richtiger Antwort.
  - Web Audio API Sound-Synthesizer: Null Latenz, keine externen MP3-Dateien nötig, inklusive Stummschalt-Schalter.
  - Feierliches Konfetti-Feuerwerk (`canvas-confetti`) und Tusch bei Modulabschluss.
  - Streak-Zähler (🔥) und XP-Punkte (⚡).
  - Zuordnungsspiele (Matching Pairs) für Fachbegriffe.
- 📖 **Integriertes Fachwörterbuch (`/glossary`):**
  - Schnelle Live-Suche nach Begriffen auf Deutsch, Französisch oder Latein.
  - Filterung nach Modulen und Fachbereichen.
- 💾 **Offline & Daten-Persistenz:**
  - Gesamter Lernfortschritt wird automatisch im `localStorage` gespeichert.
  - Fortschritt-Zurücksetzen-Funktion direkt im Header.
- 🧱 **Erweiterbare Datenstruktur (`src/data/courseData.ts`):**
  - Neue Module, Vokabeln und Quizzes können einfach per JSON/TypeScript ohne Programmierung hinzugefügt werden.

---

## 📚 Enthaltene Module (1. Lehrjahr)

1. **Modul 1: Aufbau des Zahnes** (*Structure de la dent*)
   - Krone (*Corona dentis*), Hals (*Collum dentis*), Wurzel (*Radix dentis*), Wurzelspitze (*Apex dentis*)
2. **Modul 2: Zahnhartsubstanzen & Pulpa** (*Tissus durs de la dent & Pulpe*)
   - Zahnschmelz (*Enamelum*), Dentin (*Dentinum*), Wurzelzement (*Cementum*) und Zahnpulpa (*Pulpa dentis*)
3. **Modul 3: Zahnarten & Gebissentwicklung** (*Types de dents & Dentition*)
   - Schneidezähne (*Incisivi*), Eckzähne (*Canini*), Prämolaren (*Praemolares*) & Molaren (*Molares*)
   - Milchgebiss (20 Zähne) vs. Bleibendes Gebiss (32 Zähne)
4. **Modul 4: Das FDI-Zahnschema** (*Le schéma dentaire FDI*)
   - Die 4 Quadranten, Milchzahn-Quadranten 5–8, Ausspracheregeln ("Eins-Eins" statt "Elf")
5. **Modul 5: Hygiene & Infektionsschutz** (*Hygiène & Prévention des infections*)
   - Händedesinfektion (30 Sek.), PSA, Thermodesinfektor (RDG) und Autoklav (134°C Dampfdruck)

---

## 🚀 Schnellstart

### 1. Repository klonen & Abhängigkeiten installieren
```bash
npm install
```

### 2. Entwicklungsserver starten
```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem mobilen Browser oder aktiviere im Desktop-Browser die DevTools-Mobilansicht (Strg+Umschalt+M).

### 3. Production Build erstellen
```bash
npm run build
npm run start
```

---

## 📂 Projektstruktur

```
src/
├── app/
│   ├── layout.tsx             # Root-Layout mit Viewport & ProgressProvider
│   ├── page.tsx               # Dashboard / Duolingo-Roadmap
│   ├── globals.css            # Tailwind & 3D-Button Keyframes
│   ├── module/[id]/page.tsx   # Dynamische Lektions-Engine (Theorie, Vocab, Quiz, Matching)
│   └── glossary/page.tsx      # Durchsuchbares ZFA-Fachwörterbuch
├── components/
│   ├── layout/                # MobileContainer & Header
│   ├── lesson/                # TheoryCard, VocabTable, QuizCard, MatchingCard, CompletionModal
│   ├── roadmap/               # ModuleNode für den Lernpfad
│   ├── ui/                    # Button, ProgressBar
│   └── visual/                # Interaktive SVG-Grafiken (Zahnaufbau, FDI, Substanzen...)
├── context/
│   └── ProgressContext.tsx    # State-Management & LocalStorage
├── data/
│   └── courseData.ts          # Vollständige Datenbasis (bilingual)
├── lib/
│   ├── sound.ts               # Web Audio API Soundeffekte & Vibration
│   └── utils.ts               # Tailwind Hilfsfunktionen
└── types/
    └── course.ts              # TypeScript-Typdefinitionen
```

---

## 🌐 Hosting auf GitHub Pages

Die Web-App ist vollautomatisch für **GitHub Pages** eingerichtet!

### Live-URL nach Aktivierung:
👉 **[https://gladiii92.github.io/ZFA_Lernapp/](https://gladiii92.github.io/ZFA_Lernapp/)**

### Einmalige Aktivierung in den GitHub-Repository-Einstellungen:
1. Gehe in deinem GitHub-Repository auf **Settings** (oben rechts).
2. Klicke in der linken Seitenleiste auf **Pages**.
3. Wähle unter **Build and deployment -> Source** im Dropdown-Menü:
   **GitHub Actions** (statt "Deploy from a branch").
4. Fertig! Sobald ein Commit auf `main` gepusht wird (oder du den Workflow manuell startest), baut GitHub die App und schaltet sie automatisch live.

---

## 🚢 Alternatives Deployment auf Vercel

Die App kann auch jederzeit auf Vercel gehostet werden:
1. Repository auf GitHub pushen
2. In Vercel importieren
3. Vercel erkennt Next.js automatisch und führt das Deployment durch.
