import { CourseData } from '@/types/course';

export const courseData: CourseData = {
  modules: [
    {
      id: "modul-1",
      order: 1,
      titleDe: "Aufbau des Zahnes & Parodontium",
      titleFr: "Structure de la dent & Parodonte",
      subtitleDe: "Krone, Wurzel & die 4 Halteapparat-Gewebe",
      subtitleFr: "Couronne, racine & les 4 tissus de soutien",
      descriptionDe: "Lerne die anatomischen Abschnitte des Zahnes, seine Gewebeschichten und das Parodontium kennen.",
      descriptionFr: "Apprenez l'anatomie de la dent, ses couches tissulaires et l'appareil de soutien parodontal.",
      badge: "🦷",
      color: "emerald",
      xpReward: 120,
      lessons: [
        {
          id: "m1-l1",
          type: "theory",
          titleDe: "Die drei Hauptabschnitte & Zahnhartsubstanzen",
          titleFr: "Les trois parties principales & tissus dentaires",
          contentDe: "Ein menschlicher Zahn gliedert sich in drei Hauptzonen: Die Zahnkrone (Corona dentis) ragt sichtbar in die Mundhöhle. Der Zahnhals (Collum dentis) bildet den empfindlichen Übergangsbereich am Zahnfleischsaum. Die Zahnwurzel (Radix dentis) verankert den Zahn fest im Kieferknochen. Erkunde die interaktiven Hotspots in der eckigen anatomischen Schnittgrafik.",
          contentFr: "Une dent humaine comprend trois zones principales : la couronne (Corona dentis), le collet (Collum dentis) et la racine (Radix dentis) ancrée dans l'os maxillaire. Explorez les points interactifs du schéma anatomique.",
          imageKey: "tooth-anatomy",
          hotspots: [
            {
              id: "hs-enamel",
              x: 50,
              y: 18,
              titleDe: "Zahnschmelz",
              titleFr: "Émail dentaire",
              latin: "Enamelum",
              descriptionDe: "Härteste Substanz des Körpers (ca. 96 % Hydroxylapatit / anorganisch). Bildet die prismatische Schutzschicht der Krone gegen Abrieb und Säuren.",
              descriptionFr: "Substance la plus dure de l'organisme (env. 96 % inorganique). Protège la couronne contre l'usure mécanique et les attaques acides."
            },
            {
              id: "hs-dentin",
              x: 50,
              y: 35,
              titleDe: "Zahnbein",
              titleFr: "Dentine",
              latin: "Dentinum",
              descriptionDe: "Hauptmasse des Zahnes (ca. 70 % anorganisch, 20 % organisch, 10 % Wasser). Durchzogen von Dentinkanälchen mit Tomes-Fasern zur Reizweiterleitung.",
              descriptionFr: "Masse principale de la dent (env. 70 % inorganique). Traversée de tubuli dentinaires transmettant les sensations thermiques et douloureuses."
            },
            {
              id: "hs-pulp",
              x: 50,
              y: 46,
              titleDe: "Zahnmark / Pulpa",
              titleFr: "Pulpe dentaire",
              latin: "Pulpa dentis",
              descriptionDe: "Lockeres Bindegewebe mit Blutkapillaren, Lymphgefäßen und sensiblen Nervenfasern. Versorgt das Dentin und reagiert auf Entzündungen.",
              descriptionFr: "Tissu conjonctif lâche richement vascularisé et innervé, situé au cœur de la chambre pulpaire."
            },
            {
              id: "hs-cementum",
              x: 28,
              y: 65,
              titleDe: "Wurzelzement",
              titleFr: "Cément radiculaire",
              latin: "Cementum",
              descriptionDe: "Knochenähnliche Hartsubstanz (ca. 65 % anorganisch), die die Wurzel umgibt und die Sharpey-Fasern des Zahnhalteapparats verankert.",
              descriptionFr: "Substance dure analogue à l'os recouvrant la racine et assurant l'ancrage des fibres desmodontales."
            },
            {
              id: "hs-root-canal",
              x: 50,
              y: 72,
              titleDe: "Wurzelkanal",
              titleFr: "Canal radiculaire",
              latin: "Canalis radicis dentis",
              descriptionDe: "Kanal im Wurzelinneren zur Aufnahme des neurovaskulären Leitungsbündels von der Wurzelspitze zur Pulpenkammer.",
              descriptionFr: "Conduit traversant la racine pour acheminer les vaisseaux et nerfs vers la pulpe dentaire."
            },
            {
              id: "hs-apex",
              x: 50,
              y: 92,
              titleDe: "Wurzelspitze / Foramen apicale",
              titleFr: "Apex radiculaire / Foramen apical",
              latin: "Apex dentis / Foramen apicale",
              descriptionDe: "Austrittsöffnung des Nerven- und Gefäßbündels an der Wurzelspitze in das umgebende Kiefergewebe.",
              descriptionFr: "Orifice terminal de la racine dentaire par lequel pénètrent les artères, veines et fibres nerveuses."
            }
          ],
          keyPoints: [
            { de: "Zahnkrone (Corona dentis): Im Mund sichtbar, mit Schmelz überzogen", fr: "Couronne (Corona dentis) : partie visible recouverte d'émail" },
            { de: "Zahnhals (Collum dentis): Schmelz-Zement-Grenze am Zahnfleischrand", fr: "Collet (Collum dentis) : jonction émail-cément au niveau gingival" },
            { de: "Zahnwurzel (Radix dentis): Verankerung im Alveolarknochen via Zement", fr: "Racine (Radix dentis) : ancrage osseux recouvert de cément" }
          ]
        },
        {
          id: "m1-l2",
          type: "theory",
          titleDe: "Der Zahnhalteapparat (Parodontium)",
          titleFr: "Le parodonte (Appareil de soutien)",
          contentDe: "Das Parodontium (Zahnhalteapparat) sorgt für die federnde Verankerung des Zahnes im Kieferknochen. Es besteht aus genau 4 Gewebestrukturen: Freies und befestigtes Zahnfleisch (Gingiva), Wurzelzement (Cementum), Wurzelhaut mit Sharpey-Fasern (Desmodont / Periodontium) und Alveolarknochen (Os alveolare). Klicke auf die Hotspots der Grafik für mikroskopische Details.",
          contentFr: "Le parodonte assure la suspension élastique de la dent dans l'alvéole. Il comprend 4 structures : la gencive (Gingiva), le cément (Cementum), le desmodonte avec fibres de Sharpey et l'os alvéolaire (Os alveolare).",
          imageKey: "periodontium",
          hotspots: [
            {
              id: "hs-gingiva",
              x: 25,
              y: 22,
              titleDe: "Zahnfleisch",
              titleFr: "Gencive",
              latin: "Gingiva",
              descriptionDe: "Mundschleimhaut, die den Zahnhals kragenförmig umschließt und das darunterliegende Parodontium vor Bakterieneindringen schützt.",
              descriptionFr: "Muqueuse buccale kératinisée entourant le collet dentaire pour former une barrière étanche contre les bactéries."
            },
            {
              id: "hs-desmodont",
              x: 45,
              y: 48,
              titleDe: "Wurzelhaut / Sharpey-Fasern",
              titleFr: "Desmodonte / Ligament parodontal",
              latin: "Desmodontium / Ligamentum periodontale",
              descriptionDe: "Kollagene Faserbündel (Sharpey-Fasern), die den Zahn elastisch und stoßdämpfend in der Knochenalveole aufhängen und Kaudruck abfedern.",
              descriptionFr: "Réseau de fibres de collagène (fibres de Sharpey) reliant le cément à l'os alvéolaire pour amortir les forces occlusales."
            },
            {
              id: "hs-cementum-paro",
              x: 65,
              y: 40,
              titleDe: "Wurzelzement",
              titleFr: "Cément radiculaire",
              latin: "Cementum",
              descriptionDe: "Dünne mineralisierte Schicht auf der Wurzeloberfläche, in der die parodontalen Fasern fest inserieren.",
              descriptionFr: "Couche minéralisée recouvrant la dentine radiculaire permettant l'insertion solide des fibres ligamentaires."
            },
            {
              id: "hs-bone",
              x: 75,
              y: 75,
              titleDe: "Alveolarknochen",
              titleFr: "Os alvéolaire",
              latin: "Os alveolare / Processus alveolaris",
              descriptionDe: "Teil des Ober- bzw. Unterkiefers, der die knöchernen Zahnfächer (Alveolen) bildet und den Kaudruck aufnimmt.",
              descriptionFr: "Partie osseuse des maxillaires formant les alvéoles qui soutiennent les racines dentaires."
            }
          ],
          keyPoints: [
            { de: "4 Komponenten: Gingiva, Wurzelzement, Desmodont & Alveolarknochen", fr: "4 composants : gencive, cément, desmodonte & os alvéolaire" },
            { de: "Sharpey-Fasern fangen Kaukräfte elastisch wie Stoßdämpfer ab", fr: "Les fibres de Sharpey amortissent les chocs masticatoires" },
            { de: "Schutzfunktion: Die Gingiva dichtet den Zahnhals keimdicht ab", fr: "La gencive protège le parodonte profond contre les agents pathogènes" }
          ]
        },
        {
          id: "m1-l3",
          type: "vocabulary",
          titleDe: "Fachbegriffe: Zahnaufbau & Parodontium",
          titleFr: "Vocabulaire : Anatomie & Parodonte",
          instructionDe: "Präge dir diese lateinischen Grundbegriffe für deinen Praxisalltag und die Assistenz ein.",
          instructionFr: "Mémorisez ces termes latins indispensables au cabinet dentaire.",
          imageKey: "tooth-anatomy",
          vocab: [
            { de: "Die Zahnkrone", latin: "Corona dentis", fr: "La couronne dentaire", noteDe: "Sichtbarer Teil im Mund", noteFr: "Partie visible en bouche" },
            { de: "Der Zahnhals", latin: "Collum dentis", fr: "Le collet dentaire", noteDe: "Übergangszone Schmelz/Zement", noteFr: "Zone de jonction amélo-cémentaire" },
            { de: "Die Zahnwurzel", latin: "Radix dentis", fr: "La racine dentaire", noteDe: "Im Knochen verankert", noteFr: "Ancrée dans l'alvéole osseuse" },
            { de: "Der Zahnschmelz", latin: "Enamelum", fr: "L'émail", noteDe: "96% anorganisch, härtestes Gewebe", noteFr: "96% minéral, tissu le plus dur" },
            { de: "Das Zahnbein", latin: "Dentinum", fr: "La dentine", noteDe: "Elastischer Hauptkörper mit Tubuli", noteFr: "Corps principal élastique avec tubuli" },
            { de: "Die Zahnpulpa", latin: "Pulpa dentis", fr: "La pulpe dentaire", noteDe: "Gefäße und Nerven", noteFr: "Vaisseaux et nerfs" },
            { de: "Das Zahnfleisch", latin: "Gingiva", fr: "La gencive", noteDe: "Kragenschutz um Zahnhals", noteFr: "Protection gingivale" },
            { de: "Die Wurzelhaut", latin: "Desmodontium", fr: "Le desmodonte", noteDe: "Sharpey-Fasern zur Federung", noteFr: "Fibres de suspension parodontales" }
          ]
        },
        {
          id: "m1-l4",
          type: "quiz",
          questionDe: "Welche Substanz ist das härteste Gewebe im gesamten menschlichen Körper?",
          questionFr: "Quelle substance constitue le tissu le plus dur de tout le corps humain ?",
          imageKey: "tooth-anatomy",
          options: [
            { textDe: "Zahnschmelz (Enamelum)", textFr: "Émail (Enamelum)", isCorrect: true, explanationDe: "Richtig! Schmelz besteht zu ca. 96 % aus Hydroxylapatit-Kristallen.", explanationFr: "Correct ! L'émail est composé à 96 % de cristaux d'hydroxyapatite." },
            { textDe: "Zahnbein (Dentinum)", textFr: "Dentine (Dentinum)", isCorrect: false, explanationDe: "Dentin ist elastischer und hat ca. 70 % Mineralanteil.", explanationFr: "La dentine est plus élastique avec environ 70 % de minéraux." },
            { textDe: "Wurzelzement (Cementum)", textFr: "Cément (Cementum)", isCorrect: false, explanationDe: "Wurzelzement ähnelt kompaktem Knochen (ca. 65 % Mineralanteil).", explanationFr: "Le cément ressemble à l'os compact (env. 65 % de minéraux)." },
            { textDe: "Alveolarknochen (Os alveolare)", textFr: "Os alvéolaire", isCorrect: false, explanationDe: "Knochen ist weniger mineralisiert als Zahnschmelz.", explanationFr: "L'os est moins minéralisé que l'émail dentaire." }
          ],
          tipDe: "Besteht zu ca. 96 % aus Hydroxylapatit und schützt die Zahnkrone.",
          tipFr: "Composé à 96 % d'hydroxyapatite protégeant la couronne."
        },
        {
          id: "m1-l5",
          type: "matching",
          instructionDe: "Ordne die anatomischen deutschen Bezeichnungen ihren lateinischen Fachbegriffen zu:",
          instructionFr: "Associez les termes anatomiques allemands/français aux termes latins :",
          imageKey: "periodontium",
          pairs: [
            { id: "p1", left: "Zahnkrone / Couronne", right: "Corona dentis" },
            { id: "p2", left: "Zahnschmelz / Émail", right: "Enamelum" },
            { id: "p3", left: "Zahnmark / Pulpe", right: "Pulpa dentis" },
            { id: "p4", left: "Zahnfleisch / Gencive", right: "Gingiva" },
            { id: "p5", left: "Wurzelhaut / Desmodonte", right: "Desmodontium" }
          ]
        }
      ]
    },
    {
      id: "modul-2",
      order: 2,
      titleDe: "Zahnarten & Gebissformen",
      titleFr: "Types de dents & Dentures",
      subtitleDe: "Schneidezähne, Eckzähne, Prämolaren & Molaren",
      subtitleFr: "Incisives, canines, prémolaires & molaires",
      descriptionDe: "Verstehe die funktionelle Morphologie der 4 Zahnarten sowie die Unterschiede zwischen Milch- und bleibendem Gebiss.",
      descriptionFr: "Comprenez la morphologie des 4 types de dents et les différences entre denture temporaire et permanente.",
      badge: "✨",
      color: "blue",
      xpReward: 120,
      lessons: [
        {
          id: "m2-l1",
          type: "theory",
          titleDe: "Die vier Zahntypen und ihre Aufgaben",
          titleFr: "Les quatre types de dents et leurs fonctions",
          contentDe: "Das menschliche Gebiss ist heterodont (aus verschiedenen Zahntypen aufgebaut). Jede Zahnart besitzt eine spezialisierte Kronen- und Wurzelform: Schneidezähne mit meißelförmiger Schneidekante zum Abbeißen, Eckzähne mit spitzer Höckerform zum Festhalten, Prämolaren mit 2 Höckern zum Zerkleinern und Molaren mit breiter Kaufläche (4-5 Höcker) zum Mahlen der Nahrung. Untersuche die eckigen 3D-Prismenmodelle in der Grafik.",
          contentFr: "La denture humaine comporte 4 catégories : incisives tranchantes, canines pointues, prémolaires bicuspidées et molaires plurituberculées avec surface de broyage.",
          imageKey: "tooth-types",
          hotspots: [
            {
              id: "hs-incisor",
              x: 15,
              y: 40,
              titleDe: "Schneidezahn (Incisivus)",
              titleFr: "Incisive (Dens incisivus)",
              latin: "Dens incisivus",
              descriptionDe: "Meißelförmige Krone mit gerader Inzisalkante und 1 Wurzel. Dient dem Abbeißen fester Nahrung (8 Zähne im bleibenden Gebiss).",
              descriptionFr: "Couronne biseautée à bord tranchant et racine unique pour couper les aliments (8 incisives au total)."
            },
            {
              id: "hs-canine",
              x: 38,
              y: 38,
              titleDe: "Eckzahn (Caninus)",
              titleFr: "Canine (Dens caninus)",
              latin: "Dens caninus",
              descriptionDe: "Längste und stärkste Wurzel im Kiefer (Eckzahnführung). Spitz zulaufende Höckerform zum Halten und Abreißen (4 Zähne gesamt).",
              descriptionFr: "Dent à racine la plus longue, formant le pilier d'angle de l'arcade pour guider la mastication (4 canines)."
            },
            {
              id: "hs-premolar",
              x: 62,
              y: 42,
              titleDe: "Prämolar (Backenzahn)",
              titleFr: "Prémolaire (Dens premolaris)",
              latin: "Dens premolaris",
              descriptionDe: "Bikuspide Kaufläche mit bukkalem und oralem Höcker. 1. oberer Prämolar oft 2-wurzelig, übrige 1-wurzelig (8 Zähne, fehlen im Milchgebiss).",
              descriptionFr: "Dent à deux cuspides (vestibulaire et orale) pour écraser la nourriture. Absente en denture lactéale."
            },
            {
              id: "hs-molar",
              x: 85,
              y: 45,
              titleDe: "Molar (Mahlzahn)",
              titleFr: "Molaire (Dens molaris)",
              latin: "Dens molaris",
              descriptionDe: "Große Kaufläche mit Fissurenrelief und 4–5 Höckern. Oberkiefermolaren haben 3 Wurzeln, Unterkiefermolaren 2 Wurzeln (12 Zähne inkl. Weisheitszähne).",
              descriptionFr: "Grande table occlusale à 4-5 cuspides pour broyer. 3 racines au maxillaire, 2 racines à la mandibule."
            }
          ],
          keyPoints: [
            { de: "Incisivi (8 Stück): Meißelform mit Inzisalkante zum Abbeißen", fr: "Incisives (8) : forme en biseau pour sectionner" },
            { de: "Canini (4 Stück): Längste Wurzel, stabiler Eckpfeiler des Kiefers", fr: "Canines (4) : racine la plus longue, guidage canin" },
            { de: "Prämolaren (8 Stück): 2 Höcker, existieren nur im bleibenden Gebiss", fr: "Prémolaires (8) : 2 cuspides, uniquement en denture adulte" },
            { de: "Molaren (12 Stück): 4-5 Höcker, Mahlzähne mit 2-3 Wurzeln", fr: "Molaires (12) : 4 à 5 cuspides, 2 à 3 racines pour broyer" }
          ]
        },
        {
          id: "m2-l2",
          type: "theory",
          titleDe: "Milchgebiss vs. Bleibendes Gebiss",
          titleFr: "Denture temporaire vs. Denture permanente",
          contentDe: "Das Milchgebiss (Dentes decidui) umfasst genau 20 Zähne (5 pro Quadrant: 2 Schneidezähne, 1 Eckzahn, 2 Milchmolaren - KEINE Prämolaren!). Das bleibende Erwachsenengebiss (Dentes permanentes) besitzt 32 Zähne (8 pro Quadrant: 2 Schneidezähne, 1 Eckzahn, 2 Prämolaren, 3 Molaren inkl. Weisheitszahn 'Dens serotinus').",
          contentFr: "La denture temporaire compte 20 dents (sans prémolaires). La denture permanente complète comprend 32 dents réparties sur 4 quadrants.",
          imageKey: "tooth-types",
          keyPoints: [
            { de: "Milchgebiss: 20 Zähne (Quadranten 5, 6, 7, 8) – keine Prämolaren", fr: "Denture de lait : 20 dents (quadrants 5-8) – sans prémolaires" },
            { de: "Bleibendes Gebiss: 32 Zähne (Quadranten 1, 2, 3, 4) inkl. 4 Weisheitszähnen", fr: "Denture permanente : 32 dents (quadrants 1-4) avec dents de sagesse" },
            { de: "Sechsjahrmolar (1. Molar / 16, 26, 36, 46): Bricht hinter den Milchzähnen durch", fr: "Dent de 6 ans (1ère molaire) : pousse sans chute préalable de dent lactéale" }
          ]
        },
        {
          id: "m2-l3",
          type: "vocabulary",
          titleDe: "Fachbegriffe: Zahnarten & Anatomie",
          titleFr: "Vocabulaire : Types de dents",
          instructionDe: "Lerne die lateinischen Bezeichnungen der vier Zahnarten und Gebissstrukturen.",
          instructionFr: "Mémorisez les noms latins des quatre catégories dentaires.",
          imageKey: "tooth-types",
          vocab: [
            { de: "Schneidezahn", latin: "Dens incisivus", fr: "Incisive", noteDe: "Meißelförmige Schneidekante", noteFr: "Bord incisif biseauté" },
            { de: "Eckzahn", latin: "Dens caninus", fr: "Canine", noteDe: "Längste Wurzel im Gebiss", noteFr: "Plus longue racine" },
            { de: "Vormahlzahn / Prämolar", latin: "Dens premolaris", fr: "Prémolaire", noteDe: "2 Höcker (bispide)", noteFr: "Bicuspidée" },
            { de: "Großer Mahlzahn / Molar", latin: "Dens molaris", fr: "Molaire", noteDe: "Große Kaufläche mit Fissuren", noteFr: "Grande table occlusale" },
            { de: "Weisheitszahn", latin: "Dens serotinus (3. Molar)", fr: "Dent de sagesse", noteDe: "Zähne 18, 28, 38, 48", noteFr: "Dents 18, 28, 38, 48" },
            { de: "Milchzähne", latin: "Dentes decidui", fr: "Dents temporaires (de lait)", noteDe: "Insgesamt 20 Zähne", noteFr: "20 dents au total" }
          ]
        },
        {
          id: "m2-l4",
          type: "quiz",
          questionDe: "Wie viele Wurzeln besitzen die Molaren (großen Mahlzähne) im Oberkiefer in der Regel?",
          questionFr: "Combien de racines possèdent généralement les molaires supérieures ?",
          imageKey: "tooth-types",
          options: [
            { textDe: "3 Wurzeln (2 bukkal, 1 palatinal)", textFr: "3 racines (2 vestibulaires, 1 palatine)", isCorrect: true, explanationDe: "Richtig! Oberkiefermolaren haben 3 divergierende Wurzeln für optimalen Halt gegen Kaudruck.", explanationFr: "Correct ! Les molaires maxillaires possèdent 3 racines stables." },
            { textDe: "2 Wurzeln (1 mesial, 1 distal)", textFr: "2 racines (1 mésiale, 1 distale)", isCorrect: false, explanationDe: "2 Wurzeln haben typischerweise die Molaren im Unterkiefer.", explanationFr: "2 racines caractérisent les molaires mandibulaires (inférieures)." },
            { textDe: "1 Wurzel", textFr: "1 racine", isCorrect: false, explanationDe: "Eckzähne und Schneidezähne sind typischerweise einwurzelig.", explanationFr: "Les incisives et canines ont une seule racine." },
            { textDe: "4 Wurzeln", textFr: "4 racines", isCorrect: false, explanationDe: "4 Wurzeln kommen anatomisch bei normalen Molaren extrem selten vor.", explanationFr: "4 racines sont une anomalie anatomique très rare." }
          ],
          tipDe: "Im Oberkiefer spreizen sich zwei bukkale und eine große palatinale Wurzel.",
          tipFr: "Au maxillaire supérieur : 2 racines côté joue, 1 côté palais."
        }
      ]
    },
    {
      id: "modul-3",
      order: 3,
      titleDe: "FDI-Zahnschema & Richtungsbezeichnungen",
      titleFr: "Schéma dentaire FDI & Orientations",
      subtitleDe: "Zwei-Ziffern-System & Lagebezeichnungen",
      subtitleFr: "Système à deux chiffres & orientations spatiales",
      descriptionDe: "Beherrsche das internationale 2-Ziffern-FDI-Zahnschema sowie alle zahnmedizinischen Lage- und Richtungsbezeichnungen im Schlaf.",
      descriptionFr: "Maîtrisez le système international FDI à 2 chiffres et le vocabulaire d'orientation anatomique.",
      badge: "🧭",
      color: "purple",
      xpReward: 140,
      lessons: [
        {
          id: "m3-l1",
          type: "theory",
          titleDe: "Das 2-Ziffern-System der FDI",
          titleFr: "Le système FDI à deux chiffres",
          contentDe: "Das FDI-Zahnschema (Fédération Dentaire Internationale) kennzeichnet jeden Zahn durch 2 Ziffern: Die 1. Ziffer bezeichnet den Quadranten (1–4 für bleibendes Gebiss, 5–8 für Milchgebiss), gezählt im Uhrzeigersinn aus Sicht des Patienten (oben rechts = 1, oben links = 2, unten links = 3, unten rechts = 4). Die 2. Ziffer bezeichnet die Zahnposition von der Kiefermitte nach hinten (1 = mittlerer Schneidezahn bis 8 = Weisheitszahn). Der Zahn 'eins-sechs' (16) ist somit der erste Molar oben rechts!",
          contentFr: "Le schéma FDI identifie chaque dent par 2 chiffres prononcés séparément : le 1er pour le quadrant (1 à 4 adulte, 5 à 8 enfant dans le sens horaire du patient), le 2nd pour la position de 1 (médiane) à 8 (sagesse).",
          imageKey: "fdi-scheme",
          hotspots: [
            {
              id: "hs-q1",
              x: 28,
              y: 22,
              titleDe: "Quadrant 1: Oberkiefer rechts (Patient)",
              titleFr: "Quadrant 1 : Maxillaire droit (Patient)",
              latin: "Regio maxillaris dextra (11–18)",
              descriptionDe: "Oben rechts aus Patientensicht (auf dem Zahnschema links oben dargestellt). Zähne 11 bis 18 (Milchgebiss Quadrant 5: 51–55).",
              descriptionFr: "Haut droit du point de vue patient (en haut à gauche sur le schéma). Dents 11 à 18 (dents de lait 51 à 55)."
            },
            {
              id: "hs-q2",
              x: 72,
              y: 22,
              titleDe: "Quadrant 2: Oberkiefer links (Patient)",
              titleFr: "Quadrant 2 : Maxillaire gauche (Patient)",
              latin: "Regio maxillaris sinistra (21–28)",
              descriptionDe: "Oben links aus Patientensicht (im Schema rechts oben dargestellt). Zähne 21 bis 28 (Milchgebiss Quadrant 6: 61–65).",
              descriptionFr: "Haut gauche du point de vue patient (en haut à droite sur le schéma). Dents 21 à 28 (dents de lait 61 à 65)."
            },
            {
              id: "hs-q3",
              x: 72,
              y: 78,
              titleDe: "Quadrant 3: Unterkiefer links (Patient)",
              titleFr: "Quadrant 3 : Mandibule gauche (Patient)",
              latin: "Regio mandibularis sinistra (31–38)",
              descriptionDe: "Unten links aus Patientensicht (im Schema rechts unten dargestellt). Zähne 31 bis 38 (Milchgebiss Quadrant 7: 71–75).",
              descriptionFr: "Bas gauche du point de vue patient (en bas à droite sur le schéma). Dents 31 à 38 (dents de lait 71 à 75)."
            },
            {
              id: "hs-q4",
              x: 28,
              y: 78,
              titleDe: "Quadrant 4: Unterkiefer rechts (Patient)",
              titleFr: "Quadrant 4 : Mandibule droite (Patient)",
              latin: "Regio mandibularis dextra (41–48)",
              descriptionDe: "Unten rechts aus Patientensicht (im Schema links unten dargestellt). Zähne 41 bis 48 (Milchgebiss Quadrant 8: 81–85).",
              descriptionFr: "Bas droit du point de vue patient (en bas à gauche sur le schéma). Dents 41 à 48 (dents de lait 81 à 85)."
            }
          ],
          keyPoints: [
            { de: "Patienten-Perspektive: Quadrant 1 ist oben rechts beim Patienten!", fr: "Perspective patient : le quadrant 1 est en haut à droite du patient !" },
            { de: "Ziffern einzeln aussprechen: Immer 'Eins-Sechs' (16) sagen, nie 'Sechzehn'", fr: "Énonciation : prononcer toujours 'un-six' (16), jamais 'seize'" },
            { de: "Milchgebiss nutzt Quadranten 5, 6, 7, 8 (Zähne 51–85)", fr: "Dents temporaires : quadrants 5, 6, 7, 8 (dents 51 à 85)" }
          ]
        },
        {
          id: "m3-l2",
          type: "theory",
          titleDe: "Zahnmedizinische Lage- und Richtungsbezeichnungen",
          titleFr: "Orientations et faces dentaires",
          contentDe: "Zur präzisen Dokumentation von Befunden und Füllungen werden exakte Richtungsbegriffe verwendet: Mesial (zur Mitte des Zahnbogens hin), Distal (vom Zahnbogenzentrum weg / nach hinten), Vestibulär (zum Mundvorhof / Lippen / Wangen hin), Palatinal (zum Gaumen hin, im OK), Lingual (zur Zunge hin, im UK), Okklusal (auf der Kaufläche von Molaren/Prämolaren) und Inzisal (an der Schneidekante von Frontzähnen).",
          contentFr: "Termes d'orientation : mésial (vers la ligne médiane), distal (vers l'arrière), vestibulaire (vers les joues/lèvres), palatin (vers le palais au maxillaire), lingual (vers la langue à la mandibule), occlusal (face masticatoire) et incisif (bord coupant).",
          imageKey: "fdi-scheme",
          keyPoints: [
            { de: "Mesial = Zur Mitte des Zahnbogens | Distal = Zum Ende des Zahnbogens", fr: "Mésial = Vers la ligne médiane | Distal = Vers l'extrémité de l'arcade" },
            { de: "Vestibulär / Bukkal = Zur Wange | Labial = Zur Lippe", fr: "Vestibulaire / Buccal = Côté joue | Labial = Côté lèvre" },
            { de: "Palatinal = Zum Gaumen (nur OK) | Lingual = Zur Zunge (nur UK)", fr: "Palatin = Vers le palais (maxillaire) | Lingual = Vers la langue (mandibule)" },
            { de: "Okklusal = Auf der Kaufläche | Inzisal = An der Schneidekante", fr: "Occlusal = Surface masticatoire | Incisif = Bord tranchant" },
            { de: "Apikal = Zur Wurzelspitze | Koronal = Zur Zahnkrone hin", fr: "Apical = Vers l'apex | Coronaire = Vers la couronne" }
          ]
        },
        {
          id: "m3-l3",
          type: "vocabulary",
          titleDe: "Fachbegriffe: Lage- & Richtungsbezeichnungen",
          titleFr: "Vocabulaire : Orientations anatomiques",
          instructionDe: "Präge dir diese Richtungsbegriffe ein – sie werden bei jedem zahnärztlichen Befund diktiert!",
          instructionFr: "Mémorisez ces termes indispensables pour la saisie des bilans dentaires.",
          imageKey: "fdi-scheme",
          vocab: [
            { de: "Zur Kiefermitte hin", latin: "Mesial", fr: "Mésial", noteDe: "Entlang des Zahnbogens nach vorne", noteFr: "Vers le milieu de l'arcade" },
            { de: "Von der Kiefermitte weg", latin: "Distal", fr: "Distal", noteDe: "Entlang des Zahnbogens nach hinten", noteFr: "Vers l'arrière de l'arcade" },
            { de: "Zur Wange hin", latin: "Bukkal", fr: "Buccal / Jugal", noteDe: "Bei Prämolaren und Molaren", noteFr: "Pour molaires et prémolaires" },
            { de: "Zur Lippe hin", latin: "Labial", fr: "Labial", noteDe: "Bei Schneide- und Eckzähnen", noteFr: "Pour incisives et canines" },
            { de: "Zum Gaumen hin", latin: "Palatinal", fr: "Palatin", noteDe: "Nur im Oberkiefer (OK)", noteFr: "Uniquement au maxillaire supérieur" },
            { de: "Zur Zunge hin", latin: "Lingual", fr: "Lingual", noteDe: "Nur im Unterkiefer (UK)", noteFr: "Uniquement à la mandibule (inférieur)" },
            { de: "Auf der Kaufläche", latin: "Okklusal", fr: "Occlusal", noteDe: "Kauflächen von Seitenzähnen", noteFr: "Face masticatoire des molaires" },
            { de: "Zur Wurzelspitze hin", latin: "Apikal", fr: "Apical", noteDe: "Richtung Apex dentis", noteFr: "En direction de l'apex radiculaire" }
          ]
        },
        {
          id: "m3-l4",
          type: "quiz",
          questionDe: "Welcher Zahn verbirgt sich hinter der FDI-Bezeichnung 'Zahn 24'?",
          questionFr: "Quelle dent correspond à la désignation FDI 'Dent 24' ?",
          imageKey: "fdi-scheme",
          options: [
            { textDe: "Erster Prämolar oben links (Patient)", textFr: "Première prémolaire supérieure gauche (Patient)", isCorrect: true, explanationDe: "Richtig! Quadrant 2 = Oberkiefer links, Position 4 = erster Prämolar.", explanationFr: "Correct ! Quadrant 2 = haut gauche, position 4 = 1ère prémolaire." },
            { textDe: "Erster Prämolar oben rechts (Patient)", textFr: "Première prémolaire supérieure droite (Patient)", isCorrect: false, explanationDe: "Oben rechts wäre Quadrant 1 (also Zahn 14).", explanationFr: "En haut à droite correspond au quadrant 1 (dent 14)." },
            { textDe: "Zweiter Prämolar unten links (Patient)", textFr: "Deuxième prémolaire inférieure gauche (Patient)", isCorrect: false, explanationDe: "Unten links wäre Quadrant 3, zweiter Prämolar wäre 35.", explanationFr: "En bas à gauche correspond au quadrant 3 (dent 35)." },
            { textDe: "Eckzahn oben links (Patient)", textFr: "Canine supérieure gauche (Patient)", isCorrect: false, explanationDe: "Der Eckzahn oben links ist Zahn 23.", explanationFr: "La canine supérieure gauche est la dent 23." }
          ],
          tipDe: "Erste Ziffer 2 = Oberkiefer links; Vierte Ziffer 4 = erster Backenzahn.",
          tipFr: "Premier chiffre 2 = maxillaire gauche ; deuxième chiffre 4 = 1ère prémolaire."
        }
      ]
    },
    {
      id: "modul-4",
      order: 4,
      titleDe: "Kariesentstehung, Parodontitis & Prophylaxe",
      titleFr: "Cariogenèse, Parodontite & Prophylaxie",
      subtitleDe: "Biofilm, Säureangriff, Zahnstein & PZR",
      subtitleFr: "Biofilm, déminéralisation acide, tartre & hygiène",
      descriptionDe: "Verstehe die Entstehung von Karies (Keyes-Trias), Gingivitis/Parodontitis und die Maßnahmen der zahnmedizinischen Prophylaxe.",
      descriptionFr: "Comprenez le mécanisme de la carie, des parodontopathies et les protocoles de prophylaxie dentaire professionnelle.",
      badge: "🛡️",
      color: "teal",
      xpReward: 140,
      lessons: [
        {
          id: "m4-l1",
          type: "theory",
          titleDe: "Die Keyes-Trias der Kariesentstehung",
          titleFr: "Le trièdre de Keyes et la formation de la carie",
          contentDe: "Karies entsteht durch das Zusammenspiel von vier Hauptfaktoren (nach Keyes): 1. Wirt & anfälliger Zahn (Schmelzstruktur), 2. Kariogene Mikroorganismen im Plaque-Biofilm (insb. Streptococcus mutans & Laktobazillen), 3. Substrat / niedermolekulare Kohlenhydrate (Zucker, Stärke) und 4. Einwirkzeit. Die Bakterien verstoffwechseln Zucker zu organischen Säuren (Milchsäure), die den pH-Wert unter den kritischen Wert von 5,5 absenken und Mineralien aus dem Zahnschmelz herauslösen (Demineralisation).",
          contentFr: "La carie résulte de l'interaction de 4 facteurs (schéma de Keyes) : hôte/dent vulnérable, bactéries cariogènes (Streptococcus mutans), substrat sucré et temps d'exposition entraînant une déminéralisation acide sous pH 5.5.",
          imageKey: "tooth-anatomy",
          hotspots: [
            {
              id: "hs-enamel-caries",
              x: 50,
              y: 18,
              titleDe: "Schmelzkaries (Caries superficialis)",
              titleFr: "Carie de l'émail",
              latin: "Caries superficialis / White Spot",
              descriptionDe: "Erstes Stadium als Kreidefleck (White Spot). Durch Remineralisation mit Fluoriden noch vollständig reversibel!",
              descriptionFr: "Premier stade réversible sous forme de tache blanche (white spot), traitable par fluoration."
            },
            {
              id: "hs-dentin-caries",
              x: 50,
              y: 35,
              titleDe: "Dentingkaries (Caries media / profunda)",
              titleFr: "Carie dentinaire",
              latin: "Caries media / Caries profunda",
              descriptionDe: "Säuren und Bakterien dringen in die Dentinkanälchen ein. Schnelleres Fortschreiten und Schmerzempfindlichkeit auf Kälte/Süßes.",
              descriptionFr: "Progression rapide dans les tubuli dentinaires avec sensibilité au froid et aux sucres."
            },
            {
              id: "hs-pulpitis",
              x: 50,
              y: 46,
              titleDe: "Pulpitis (Nervenentzündung)",
              titleFr: "Pulpite aiguë",
              latin: "Pulpitis acuta / purulenta",
              descriptionDe: "Bakterientoxine erreichen das Zahnmark. Starke pulsierende Schmerzen, erfordert Wurzelkanalbehandlung (Endodontie).",
              descriptionFr: "Infection du tissu pulpaire provoquant de vives douleurs spontanées et nécessitant une pulpectomie."
            }
          ],
          keyPoints: [
            { de: "Kritischer pH-Wert: Ab pH < 5,5 beginnt die Demineralisation des Schmelzes", fr: "pH critique : la déminéralisation de l'émail débute dès pH < 5,5" },
            { de: "Hauptkeime: Streptococcus mutans und Laktobazillen bilden Säuren", fr: "Bactéries clés : Streptococcus mutans produit des acides corrosifs" },
            { de: "Fluoridierung: Wandelt Hydroxylapatit in säureresistenteren Fluorapatit um", fr: "Fluoration : transforme l'hydroxyapatite en fluorapatite résistante" }
          ]
        },
        {
          id: "m4-l2",
          type: "theory",
          titleDe: "Von der Gingivitis zur Parodontitis",
          titleFr: "De la gingivite à la parodontite",
          contentDe: "Wird Plaque nicht rechtzeitig entfernt, mineralisiert sie durch Speichelbestandteile zu Zahnstein (Calculus). Die Plaquebakterien am Zahnfleischrand lösen zunächst eine oberflächliche, reversible Zahnfleischentzündung aus (Gingivitis: Rötung, Schwellung, Blutung, aber KEIN Knochenabbau). Unbehandelt greift die Entzündung auf das gesamte Parodontium über (Parodontitis): Sharpey-Fasern werden zerstört, Zahnfleischtaschen vertiefen sich (> 3,5 mm) und der Alveolarknochen baut sich irreversibel ab – Zahnlockerung droht!",
          contentFr: "La gingivite est une inflammation superficielle réversible sans perte osseuse. Non traitée, elle évolue en parodontite avec destruction des fibres de Sharpey, poches parodontales et résorption osseuse irréversible.",
          imageKey: "periodontium",
          hotspots: [
            {
              id: "hs-gingivitis-zone",
              x: 25,
              y: 22,
              titleDe: "Gingivitis (Zahnfleischentzündung)",
              titleFr: "Gingivite superficielle",
              latin: "Gingivitis",
              descriptionDe: "Reversible Rötung, Schwellung und Blutung bei Berührung (BOP). Der Zahnhalteapparat ist noch intakt.",
              descriptionFr: "Inflammation superficielle réversible avec saignement au sondage, sans perte d'attache."
            },
            {
              id: "hs-pocket-zone",
              x: 45,
              y: 48,
              titleDe: "Parodontale Tasche / Faserverlust",
              titleFr: "Poche parodontale & lyse ligamentaire",
              latin: "Periodontitis / Sulcus deepening",
              descriptionDe: "Bakterielle Zerstörung der desmodontalen Sharpey-Fasern. Bildung echter Zahnfleischtaschen (> 3,5 mm Tiefe).",
              descriptionFr: "Destruction des fibres de soutien et approfondissement pathologique du sillon gingivo-dentaire."
            },
            {
              id: "hs-bone-loss",
              x: 75,
              y: 75,
              titleDe: "Knochenabbau (Alveolarresorption)",
              titleFr: "Résorption osseuse alvéolaire",
              latin: "Resorptio ossis alveolaris",
              descriptionDe: "Irreversibler horizontaler oder vertikaler Knochenschwund mit Lockerung und möglichem Zahnverlust.",
              descriptionFr: "Perte osseuse irréversible menant à la mobilité puis à l'expulsion spontanée de la dent."
            }
          ],
          keyPoints: [
            { de: "Gingivitis = Reversible Entzündung des Zahnfleischs ohne Knochenabbau", fr: "Gingivite = Réversible, limitée à la gencive sans lyse osseuse" },
            { de: "Parodontitis = Irreversibler Verlust von Alveolarknochen und Haltefasern", fr: "Parodontite = Irréversible avec résorption de l'os alvéolaire" },
            { de: "Plaque-Entfernung & professionelle Zahnreinigung (PZR) sind der beste Schutz", fr: "Le détartrage et l'hygiène quotidienne sont la clé de voûte préventive" }
          ]
        },
        {
          id: "m4-l3",
          type: "vocabulary",
          titleDe: "Fachbegriffe: Prophylaxe & Parodontologie",
          titleFr: "Vocabulaire : Prophylaxie & Parodontologie",
          instructionDe: "Wichtige Begriffe rund um Prophylaxe, Zahnreinigung und Befunderhebung:",
          instructionFr: "Termes clés pour les soins d'hygiène et les bilans parodontaux :",
          imageKey: "periodontium",
          vocab: [
            { de: "Zahnbelag / Bakterienrasen", latin: "Plaque / Biofilm", fr: "Plaque dentaire / Biofilm", noteDe: "Weicher, klebriger Belag", noteFr: "Dépôt mou adhérent" },
            { de: "Zahnstein (verkalkte Plaque)", latin: "Calculus dentis", fr: "Tartre dentaire", noteDe: "Supragingival & subgingival (Konkrement)", noteFr: "Supra et sous-gingival" },
            { de: "Zahnfleischentzündung", latin: "Gingivitis", fr: "Gingivite", noteDe: "Reversibel, blutet leicht", noteFr: "Réversible, saignements fréquents" },
            { de: "Zahnbetterkrankung", latin: "Parodontitis", fr: "Parodontite", noteDe: "Mit Knochenabbau & Taschen", noteFr: "Avec poches et perte osseuse" },
            { de: "Wurzelkanalbehandlung", latin: "Endodontie", fr: "Traitement endodontique", noteDe: "Bei irreversibler Pulpitis", noteFr: "Dévitalisation et obturation canalaire" },
            { de: "Professionelle Zahnreinigung", latin: "PZR / Prophylaxis", fr: "Nettoyage professionnel (PZR)", noteDe: "Entfernung aller weichen/harten Beläge", noteFr: "Élimination des dépôts mous et durs" }
          ]
        },
        {
          id: "m4-l4",
          type: "quiz",
          questionDe: "Was unterscheidet eine Gingivitis von einer echten Parodontitis?",
          questionFr: "Quelle est la différence fondamentale entre une gingivite et une parodontite ?",
          imageKey: "periodontium",
          options: [
            { textDe: "Bei der Gingivitis ist kein Knochen abgebaut (voll reversibel); bei der Parodontitis liegt Knochen- und Faserverlust vor.", textFr: "La gingivite ne présente aucune perte osseuse (réversible) ; la parodontite détruit l'os et le ligament (irréversible).", isCorrect: true, explanationDe: "Richtig! Die Gingivitis beschränkt sich auf das Weichgewebe, während die Parodontitis das gesamte Stützgewebe zerstört.", explanationFr: "Correct ! La gingivite est réversible alors que la parodontite engendre une perte d'attache osseuse irréversible." },
            { textDe: "Gingivitis betrifft nur Milchzähne, Parodontitis nur bleibende Zähne.", textFr: "La gingivite touche les enfants, la parodontite uniquement les adultes.", isCorrect: false, explanationDe: "Beide Krankheitsbilder können in jedem Alter auftreten.", explanationFr: "Les deux affections peuvent survenir à tout âge." },
            { textDe: "Eine Parodontitis heilt von alleine ab, wenn man zuckerfreie Kaugummis kaut.", textFr: "Une parodontite guérit spontanément avec du chewing-gum sans sucre.", isCorrect: false, explanationDe: "Parodontitis erfordert eine systematische zahnärztliche Parodontaltherapie.", explanationFr: "La parodontite nécessite un traitement parodontal approfondi en cabinet." },
            { textDe: "Es gibt keinen Unterschied – beide Begriffe bezeichnen exakt denselben Zustand.", textFr: "Il n'y a aucune différence, les deux termes sont synonymes.", isCorrect: false, explanationDe: "Gingivitis betrifft nur das Zahnfleisch, Parodontitis den Zahnhalteapparat.", explanationFr: "La gingivite est gingivale pure, la parodontite détruit l'appareil d'ancrage." }
          ],
          tipDe: "Achte auf die Beteiligung des Alveolarknochens und der Sharpey-Fasern.",
          tipFr: "Considérez l'intégrité ou la résorption de l'os alvéolaire."
        }
      ]
    }
  ]
};
