import { CourseData } from '@/types/course';

export const courseData: CourseData = {
  modules: [
    {
      id: "modul-1",
      order: 1,
      titleDe: "Aufbau des Zahnes",
      titleFr: "Structure de la dent",
      subtitleDe: "Krone, Hals, Wurzel & Gewebeschichten",
      subtitleFr: "Couronne, collet, racine & tissus",
      descriptionDe: "Lerne die anatomischen Abschnitte des Zahnes und ihre lateinischen Fachbegriffe kennen.",
      descriptionFr: "Apprenez les parties anatomiques de la dent et leurs termes en latin médical.",
      badge: "🦷",
      color: "emerald",
      xpReward: 100,
      lessons: [
        {
          id: "m1-l1",
          type: "theory",
          titleDe: "Die drei Hauptteile des Zahnes",
          titleFr: "Les trois parties principales de la dent",
          contentDe: "Ein Zahn besteht aus drei Hauptabschnitten: Die Zahnkrone ist der sichtbare Teil im Mund. Der Zahnhals wird vom Zahnfleisch umschlossen. Die Zahnwurzel steckt fest im Kieferknochen.",
          contentFr: "Une dent se compose de trois parties principales : la couronne est la partie visible dans la bouche. Le collet est entouré par la gencive. La racine est solidement ancrée dans l'os de la mâchoire.",
          imageKey: "tooth-anatomy",
          keyPoints: [
            { de: "Zahnkrone: Im Mund sichtbar", fr: "Couronne : visible dans la bouche" },
            { de: "Zahnhals: Übergangszone am Zahnfleisch", fr: "Collet : zone de transition au niveau de la gencive" },
            { de: "Zahnwurzel: Verankert im Knochen", fr: "Racine : ancrée dans l'os alvéolaire" }
          ]
        },
        {
          id: "m1-l2",
          type: "vocabulary",
          titleDe: "Fachwörter: Zahnaufbau",
          titleFr: "Vocabulaire : Structure dentaire",
          instructionDe: "Präge dir diese wichtigen lateinischen Begriffe für die Praxis ein.",
          instructionFr: "Mémorisez ces termes latins indispensables au cabinet dentaire.",
          vocab: [
            {
              de: "Die Zahnkrone",
              latin: "Corona dentis",
              fr: "La couronne dentaire",
              noteDe: "Klinische Krone = sichtbarer Teil",
              noteFr: "Couronne clinique = partie visible"
            },
            {
              de: "Der Zahnhals",
              latin: "Collum dentis",
              fr: "Le collet dentaire",
              noteDe: "Verbindung zwischen Krone und Wurzel",
              noteFr: "Jonction entre couronne et racine"
            },
            {
              de: "Die Zahnwurzel",
              latin: "Radix dentis",
              fr: "La racine dentaire",
              noteDe: "Ein- oder mehrwurzelig",
              noteFr: "À racine unique ou multiple"
            },
            {
              de: "Die Wurzelspitze",
              latin: "Apex dentis",
              fr: "L'apex radiculaire",
              noteDe: "Hier treten Nerven und Gefäße ein",
              noteFr: "Point d'entrée des nerfs et vaisseaux"
            },
            {
              de: "Das Zahnfleisch",
              latin: "Gingiva",
              fr: "La gencive",
              noteDe: "Schützt den Kieferknochen",
              noteFr: "Protège l'os de la mâchoire"
            }
          ]
        },
        {
          id: "m1-l3",
          type: "quiz",
          questionDe: "Wie heißt der sichtbare Teil des Zahnes im Mund?",
          questionFr: "Comment s'appelle la partie visible de la dent dans la bouche ?",
          imageKey: "tooth-anatomy",
          options: [
            {
              textDe: "Zahnwurzel (Radix)",
              textFr: "Racine (Radix)",
              isCorrect: false,
              explanationDe: "Die Wurzel steckt unsichtbar im Knochen.",
              explanationFr: "La racine est cachée dans l'os."
            },
            {
              textDe: "Zahnkrone (Corona)",
              textFr: "Couronne (Corona)",
              isCorrect: true,
              explanationDe: "Richtig! Die Krone ist der weiße, sichtbare Teil.",
              explanationFr: "Correct ! La couronne est la partie blanche visible."
            },
            {
              textDe: "Zahnhals (Collum)",
              textFr: "Collet (Collum)",
              isCorrect: false,
              explanationDe: "Der Zahnhals ist der Übergang am Zahnfleischsaum.",
              explanationFr: "Le collet est la transition au niveau de la gencive."
            }
          ],
          tipDe: "Denke an das lateinische Wort 'Corona' wie eine königliche Krone.",
          tipFr: "Pensez au mot 'Couronne'."
        },
        {
          id: "m1-l4",
          type: "matching",
          instructionDe: "Ordne die deutschen Begriffe den passenden lateinischen Fachwörtern zu.",
          instructionFr: "Associez les termes allemands aux termes latins correspondants.",
          pairs: [
            { id: "p1", left: "Zahnkrone", right: "Corona dentis" },
            { id: "p2", left: "Zahnwurzel", right: "Radix dentis" },
            { id: "p3", left: "Zahnhals", right: "Collum dentis" },
            { id: "p4", left: "Wurzelspitze", right: "Apex dentis" }
          ]
        },
        {
          id: "m1-l5",
          type: "quiz",
          questionDe: "Wo treten Nerven und Blutgefäße in den Zahn ein?",
          questionFr: "Par où les nerfs et vaisseaux sanguins pénètrent-ils dans la dent ?",
          options: [
            {
              textDe: "An der Wurzelspitze (Apex)",
              textFr: "À l'apex de la racine",
              isCorrect: true,
              explanationDe: "Richtig! Am Foramen apicale an der Wurzelspitze treten Gefäße und Nerven ein.",
              explanationFr: "Correct ! C'est par le foramen apical à l'extrémité de la racine."
            },
            {
              textDe: "Mitten auf der Kaufläche",
              textFr: "Au milieu de la surface de mastication",
              isCorrect: false,
              explanationDe: "Auf der Kaufläche befindet sich nur der harte Zahnschmelz.",
              explanationFr: "La surface de mastication n'est couverte que d'émail dur."
            },
            {
              textDe: "Am Zahnhals",
              textFr: "Au niveau du collet",
              isCorrect: false,
              explanationDe: "Am Zahnhals endet der Schmelz und beginnt das Zement.",
              explanationFr: "Au collet, l'émail se termine et le cément commence."
            }
          ]
        }
      ]
    },
    {
      id: "modul-2",
      order: 2,
      titleDe: "Zahnhartsubstanzen & Pulpa",
      titleFr: "Tissus durs de la dent & Pulpe",
      subtitleDe: "Schmelz, Dentin, Zement & Zahnnerv",
      subtitleFr: "Émail, dentine, cément & pulpe dentaire",
      descriptionDe: "Verstehe die drei Zahnhartsubstanzen und das empfindliche Weichgewebe im Inneren.",
      descriptionFr: "Découvrez les 3 tissus durs et le tissu mou vivant au cœur de la dent.",
      badge: "💎",
      color: "blue",
      xpReward: 120,
      lessons: [
        {
          id: "m2-l1",
          type: "theory",
          titleDe: "Die Schichten des Zahnes",
          titleFr: "Les couches de la dent",
          contentDe: "Ein Zahn hat 3 Hartsubstanzen: Zahnschmelz (außen an der Krone, härteste Substanz), Dentin (Zahnbein, Hauptmasse) und Wurzelzement (um die Wurzel). Im Inneren liegt die weiche Pulpa mit Nerven und Blutgefäßen.",
          contentFr: "Une dent possède 3 tissus minéralisés : l'émail (sur la couronne, substance la plus dure), la dentine (masse principale) et le cément (autour de la racine). Au centre se trouve la pulpe molle avec nerfs et vaisseaux.",
          imageKey: "tooth-substances",
          keyPoints: [
            { de: "Schmelz: 96% Mineralien – härteste Körpersubstanz", fr: "Émail : 96% de minéraux – tissu le plus dur du corps" },
            { de: "Dentin: 70% Mineralien – elastisch, mit Nervenkanälchen", fr: "Dentine : 70% de minéraux – élastique et sensible" },
            { de: "Zement: 65% Mineralien – verankert die Haltefasern", fr: "Cément : 65% de minéraux – ancre les fibres de soutien" },
            { de: "Pulpa: Weichgewebe – ernährt und versorgt den Zahn", fr: "Pulpe : tissu mou – nourrit et innerve la dent" }
          ]
        },
        {
          id: "m2-l2",
          type: "vocabulary",
          titleDe: "Fachwörter: Zahnsubstanzen",
          titleFr: "Vocabulaire : Tissus dentaires",
          vocab: [
            {
              de: "Der Zahnschmelz",
              latin: "Enamelum",
              fr: "L'émail dentaire",
              noteDe: "Härteste Körpersubstanz (96% Mineralien)",
              noteFr: "Substance la plus dure du corps (96% minéraux)"
            },
            {
              de: "Das Dentin (Zahnbein)",
              latin: "Dentinum",
              fr: "La dentine",
              noteDe: "Hauptmasse des Zahnes (70% Mineralien)",
              noteFr: "Masse principale de la dent (70% minéraux)"
            },
            {
              de: "Das Wurzelzement",
              latin: "Cementum",
              fr: "Le cément",
              noteDe: "Überzieht die Wurzel (65% Mineralien)",
              noteFr: "Recouvre la racine (65% minéraux)"
            },
            {
              de: "Die Zahnpulpa",
              latin: "Pulpa dentis",
              fr: "La pulpe dentaire",
              noteDe: "Zahnmark / Zahnnerv (Weichgewebe)",
              noteFr: "Nerf et vaisseaux sanguins (tissu mou)"
            }
          ]
        },
        {
          id: "m2-l3",
          type: "quiz",
          questionDe: "Was ist die härteste Substanz im gesamten menschlichen Körper?",
          questionFr: "Quelle est la substance la plus dure de tout le corps humain ?",
          imageKey: "tooth-substances",
          options: [
            {
              textDe: "Dentin (Zahnbein)",
              textFr: "Dentine",
              isCorrect: false,
              explanationDe: "Dentin hat nur ca. 70 % Mineralgehalt und ist weicher.",
              explanationFr: "La dentine ne contient que ~70 % de minéraux."
            },
            {
              textDe: "Zahnschmelz (Enamelum)",
              textFr: "Émail dentaire (Enamelum)",
              isCorrect: true,
              explanationDe: "Exzellent! Zahnschmelz besteht zu ca. 96 % aus anorganischen Mineralien (Hydroxylapatit).",
              explanationFr: "Excellent ! L'émail est composé à ~96 % de minéraux (hydroxyapatite)."
            },
            {
              textDe: "Kieferknochen",
              textFr: "Os alvéolaire",
              isCorrect: false,
              explanationDe: "Knochen ist deutlich weicher und elastischer als Schmelz.",
              explanationFr: "L'os est nettement plus mou et élastique que l'émail."
            }
          ]
        },
        {
          id: "m2-l4",
          type: "quiz",
          questionDe: "Kann sich zerstörter Zahnschmelz von selbst nachbilden?",
          questionFr: "L'émail dentaire détruit peut-il se régénérer tout seul ?",
          options: [
            {
              textDe: "Nein, da Schmelz keine lebenden Zellen mehr enthält.",
              textFr: "Non, car l'émail ne contient plus de cellules vivantes.",
              isCorrect: true,
              explanationDe: "Richtig! Die Schmelzbildner (Ameloblasten) gehen beim Zahndurchbruch zugrunde. Karies muss repariert werden!",
              explanationFr: "Exact ! Les améloblastes meurent lors de l'éruption de la dent."
            },
            {
              textDe: "Ja, Schmelz wächst wie Haare nach.",
              textFr: "Oui, l'émail repousse comme les cheveux.",
              isCorrect: false,
              explanationDe: "Leider nein! Schmelz kann nicht nachwachsen.",
              explanationFr: "Malheureusement non, l'émail ne repousse jamais."
            }
          ]
        }
      ]
    },
    {
      id: "modul-3",
      order: 3,
      titleDe: "Zahnarten & Gebissentwicklung",
      titleFr: "Types de dents & Dentition",
      subtitleDe: "Milchgebiss vs. Bleibendes Gebiss",
      subtitleFr: "Dents de lait vs. Dentition définitive",
      descriptionDe: "Lerne Schneidezähne, Eckzähne, Prämolaren, Molaren und die Zahnanzahl beider Gebisse.",
      descriptionFr: "Découvrez les incisives, canines, prémolaires, molaires et le nombre de dents.",
      badge: "👶",
      color: "purple",
      xpReward: 130,
      lessons: [
        {
          id: "m3-l1",
          type: "theory",
          titleDe: "Milchgebiss und bleibendes Gebiss",
          titleFr: "Dentition de lait et dentition définitive",
          contentDe: "Der Mensch hat im Leben zwei Gebisse: Das Milchgebiss hat insgesamt 20 Zähne (keine Prämolaren!). Das bleibende Gebiss des Erwachsenen hat 32 Zähne (inklusive 4 Weisheitszähnen).",
          contentFr: "L'être humain possède deux dentitions : La dentition de lait compte 20 dents au total (aucune prémolaire !). La dentition définitive de l'adulte compte 32 dents (avec 4 dents de sagesse).",
          imageKey: "tooth-types",
          keyPoints: [
            { de: "Milchgebiss: 20 Zähne (10 oben, 10 unten)", fr: "Dents de lait : 20 dents (10 en haut, 10 en bas)" },
            { de: "Bleibendes Gebiss: 32 Zähne (16 oben, 16 unten)", fr: "Dentition adulte : 32 dents (16 en haut, 16 en bas)" },
            { de: "Prämolaren fehlen im Milchgebiss komplett!", fr: "Les prémolaires sont totalement absentes chez l'enfant !" }
          ]
        },
        {
          id: "m3-l2",
          type: "vocabulary",
          titleDe: "Fachbegriffe der Zahnarten",
          titleFr: "Terminologie des types de dents",
          vocab: [
            {
              de: "Schneidezähne",
              latin: "Dentes incisivi",
              fr: "Les incisives",
              noteDe: "8 Zähne im Gebiss (zum Abbeißen)",
              noteFr: "8 dents au total (pour trancher)"
            },
            {
              de: "Eckzähne",
              latin: "Dentes canini",
              fr: "Les canines",
              noteDe: "4 Zähne im Gebiss (längste Wurzel)",
              noteFr: "4 dents au total (racine la plus longue)"
            },
            {
              de: "Vormahlzähne (Prämolaren)",
              latin: "Dentes praemolares",
              fr: "Les prémolaires",
              noteDe: "8 Zähne (nur im bleibenden Gebiss!)",
              noteFr: "8 dents (uniquement chez l'adulte !)"
            },
            {
              de: "Mahlzähne (Molaren)",
              latin: "Dentes molares",
              fr: "Les molaires",
              noteDe: "12 Zähne im bleibenden Gebiss (inkl. Weisheitszähne)",
              noteFr: "12 dents chez l'adulte (avec dents de sagesse)"
            }
          ]
        },
        {
          id: "m3-l3",
          type: "quiz",
          questionDe: "Wie viele Zähne hat das vollständige Milchgebiss eines Kindes?",
          questionFr: "Combien de dents compte la dentition de lait complète d'un enfant ?",
          options: [
            {
              textDe: "20 Zähne",
              textFr: "20 dents",
              isCorrect: true,
              explanationDe: "Genau! 5 Zähne pro Quadrant = 20 Zähne insgesamt.",
              explanationFr: "Exact ! 5 dents par quadrant = 20 dents au total."
            },
            {
              textDe: "32 Zähne",
              textFr: "32 dents",
              isCorrect: false,
              explanationDe: "32 Zähne hat das bleibende Gebiss eines Erwachsenen.",
              explanationFr: "32 dents correspond à l'adulte complet."
            },
            {
              textDe: "28 Zähne",
              textFr: "28 dents",
              isCorrect: false,
              explanationDe: "28 Zähne hat ein Erwachsener ohne Weisheitszähne.",
              explanationFr: "28 dents correspond à l'adulte sans dents de sagesse."
            }
          ]
        },
        {
          id: "m3-l4",
          type: "quiz",
          questionDe: "Welche Zahngruppe gibt es im Milchgebiss NICHT?",
          questionFr: "Quel groupe de dents N'EXISTE PAS dans la dentition de lait ?",
          options: [
            {
              textDe: "Eckzähne (Canini)",
              textFr: "Canines",
              isCorrect: false,
              explanationDe: "Eckzähne sind auch bei Kindern vorhanden (je 1 pro Quadrant).",
              explanationFr: "Les canines existent aussi chez l'enfant."
            },
            {
              textDe: "Prämolaren (Vormahlzähne)",
              textFr: "Prémolaires",
              isCorrect: true,
              explanationDe: "Richtig! Milchzähne haben nur Schneidezähne, Eckzähne und Milchmolaren. Keine Prämolaren!",
              explanationFr: "Exact ! Les enfants ont des incisives, canines et molaires de lait, mais 0 prémolaire !"
            },
            {
              textDe: "Schneidezähne (Incisivi)",
              textFr: "Incisives",
              isCorrect: false,
              explanationDe: "Schneidezähne hat jedes Kind.",
              explanationFr: "Les incisives sont les premières à pousser."
            }
          ]
        }
      ]
    },
    {
      id: "modul-4",
      order: 4,
      titleDe: "Das FDI-Zahnschema",
      titleFr: "Le schéma dentaire FDI",
      subtitleDe: "Quadranten & Zahnbezeichnung (11, 26, 38...)",
      subtitleFr: "Quadrants & Numérotation dentaire",
      descriptionDe: "Meistere das internationale 2-Ziffern-System zur fehlerfreien Kommunikation am Behandlungsstuhl.",
      descriptionFr: "Maîtrisez le système à 2 chiffres pour communiquer sans erreur au fauteuil dentaire.",
      badge: "🎯",
      color: "amber",
      xpReward: 150,
      lessons: [
        {
          id: "m4-l1",
          type: "theory",
          titleDe: "Die 4 Quadranten nach FDI",
          titleFr: "Les 4 quadrants selon le système FDI",
          contentDe: "Das Gebiss wird vom Behandler aus in 4 Quadranten unterteilt: 1 = Oberkiefer rechts (vom Patienten aus gesehen!), 2 = Oberkiefer links, 3 = Unterkiefer links, 4 = Unterkiefer rechts. Gezählt wird im Uhrzeigersinn!",
          contentFr: "La denture est divisée en 4 quadrants du point de vue du praticien : 1 = haut droit (vu par le patient !), 2 = haut gauche, 3 = bas gauche, 4 = bas droit. On tourne dans le sens des aiguilles d'une montre !",
          imageKey: "fdi-scheme",
          keyPoints: [
            { de: "1. Ziffer = Quadrant (1 bis 4)", fr: "1er chiffre = Quadrant (1 à 4)" },
            { de: "2. Ziffer = Zahnposition von der Mitte nach hinten (1 bis 8)", fr: "2e chiffre = Position de la ligne médiane vers l'arrière (1 à 8)" },
            { de: "Wichtig: Jede Ziffer einzeln aussprechen! ('Eins-Eins', niemals 'Elf')", fr: "Important : prononcer chiffre par chiffre ! ('Un-Un', jamais 'Onze')" }
          ]
        },
        {
          id: "m4-l2",
          type: "vocabulary",
          titleDe: "FDI-Fachbegriffe & Richtungsangaben",
          titleFr: "Termes FDI & Orientations dentaires",
          vocab: [
            {
              de: "Mesial",
              latin: "mesialis",
              fr: "Mésial",
              noteDe: "Zur Mitte des Zahnbogens hin gerichtet",
              noteFr: "Tourné vers la ligne médiane"
            },
            {
              de: "Distal",
              latin: "distalis",
              fr: "Distal",
              noteDe: "Von der Zahnbogenmitte weg (nach hinten)",
              noteFr: "Éloigné de la ligne médiane"
            },
            {
              de: "Okklusal",
              latin: "occlusalis",
              fr: "Occlusal",
              noteDe: "Auf der Kaufläche (bei Backenzähnen)",
              noteFr: "Sur la face masticatoire"
            },
            {
              de: "Vestibulär (Bukkal / Labial)",
              latin: "vestibularis",
              fr: "Vestibulaire",
              noteDe: "Zur Wange bzw. Lippe hin gewandt",
              noteFr: "Orienté vers la joue ou les lèvres"
            },
            {
              de: "Palatinal / Lingual",
              latin: "palatinalis / lingualis",
              fr: "Palatin / Lingual",
              noteDe: "Zum Gaumen (OK) bzw. zur Zunge (UK) hin",
              noteFr: "Vers le palais (haut) ou vers la langue (bas)"
            }
          ]
        },
        {
          id: "m4-l3",
          type: "quiz",
          questionDe: "Wie wird die Zahnbezeichnung '26' in der Zahnarztpraxis korrekt ausgesprochen?",
          questionFr: "Comment se prononce correctement le numéro de dent '26' au cabinet ?",
          imageKey: "fdi-scheme",
          options: [
            {
              textDe: "Zwei-Sechs",
              textFr: "Deux-Six",
              isCorrect: true,
              explanationDe: "Perfekt! Im FDI-System spricht man die Ziffern IMMER einzeln aus: 2 für Quadrant, 6 für Zahnposition.",
              explanationFr: "Parfait ! En dentisterie, on prononce toujours chiffre par chiffre : Deux-Six !"
            },
            {
              textDe: "Sechsundzwanzig",
              textFr: "Vingt-six",
              isCorrect: false,
              explanationDe: "Falsch! Sag niemals 'Sechsundzwanzig', das führt zu Verwechslungen.",
              explanationFr: "Faux ! Ne dites jamais 'Vingt-six'."
            }
          ]
        },
        {
          id: "m4-l4",
          type: "quiz",
          questionDe: "Welcher Zahn ist der Zahn '11'?",
          questionFr: "Quelle est la dent numéro '11' ?",
          imageKey: "fdi-scheme",
          options: [
            {
              textDe: "Oberer rechter mittlerer Schneidezahn",
              textFr: "Incisive centrale supérieure droite",
              isCorrect: true,
              explanationDe: "Richtig: 1 = Oberkiefer rechts, 1 = erster Zahn ab der Mitte (mittlerer Schneidezahn).",
              explanationFr: "Correct : 1 = haut droit, 1 = première dent depuis la médiane."
            },
            {
              textDe: "Unterer linker Eckzahn",
              textFr: "Canine inférieure gauche",
              isCorrect: false,
              explanationDe: "Der untere linke Eckzahn wäre 33.",
              explanationFr: "La canine inférieure gauche est la 33."
            },
            {
              textDe: "Oberer linker Weisheitszahn",
              textFr: "Dent de sagesse supérieure gauche",
              isCorrect: false,
              explanationDe: "Der obere linke Weisheitszahn ist die 28.",
              explanationFr: "La dent de sagesse supérieure gauche est la 28."
            }
          ]
        },
        {
          id: "m4-l5",
          type: "matching",
          instructionDe: "Verbinde die FDI-Nummer mit der korrekten Zahnposition.",
          instructionFr: "Reliez le numéro FDI à la position correspondante.",
          pairs: [
            { id: "f1", left: "Zahn 11", right: "OK rechts mittlerer Schneidezahn" },
            { id: "f2", left: "Zahn 23", right: "OK links Eckzahn" },
            { id: "f3", left: "Zahn 36", right: "UK links 1. Molar" },
            { id: "f4", left: "Zahn 48", right: "UK rechts Weisheitszahn" }
          ]
        }
      ]
    },
    {
      id: "modul-5",
      order: 5,
      titleDe: "Hygiene & Infektionsschutz",
      titleFr: "Hygiène & Prévention des infections",
      subtitleDe: "Händedesinfektion, PSA, RDG & Sterilisation",
      subtitleFr: "Désinfection, EPI, laveur & stérilisation",
      descriptionDe: "Verstehe die unabdingbare Hygienekette zur Vermeidung von Kreuzkontaminationen.",
      descriptionFr: "Comprenez la chaîne d'hygiène rigoureuse pour éviter toute contamination croisée.",
      badge: "🧼",
      color: "teal",
      xpReward: 140,
      lessons: [
        {
          id: "m5-l1",
          type: "theory",
          titleDe: "Die Hygienekette in der Praxis",
          titleFr: "La chaîne d'hygiène au cabinet dentaire",
          contentDe: "Als ZFA schützt du Patient und Praxisteam: 1. Hygienische Händedesinfektion (mind. 30 Sekunden). 2. Persönliche Schutzausrüstung (Handschuhe, Maske, Brille). 3. Maschinelle Aufbereitung im RDG (Thermodesinfektor). 4. Sterilisation im Autoklav bei 134°C.",
          contentFr: "En tant qu'assistante dentaire, vous protégez le patient et l'équipe : 1. Désinfection des mains (min. 30 sec). 2. Port des EPI (gants, masque, lunettes). 3. Désinfection en thermodésinfecteur (RDG). 4. Stérilisation à l'autoclave à 134°C.",
          imageKey: "hygiene-steps",
          keyPoints: [
            { de: "Händedesinfektion: 30 Sekunden vollständig einreiben", fr: "Désinfection des mains : frotter pendant 30 secondes complètes" },
            { de: "PSA vor jeder Behandlung frisch anlegen", fr: "Enfiler des EPI propres avant chaque soin" },
            { de: "Autoklav: Tötet Viren, Bakterien UND hitzeresistente Sporen ab", fr: "Autoclave : détruit virus, bactéries ET spores résistantes" }
          ]
        },
        {
          id: "m5-l2",
          type: "vocabulary",
          titleDe: "Fachbegriffe: Hygiene & Sterilisation",
          titleFr: "Vocabulaire : Hygiène et Stérilisation",
          vocab: [
            {
              de: "Asepsis (Keimfreiheit)",
              latin: "Asepsis",
              fr: "Asepsie",
              noteDe: "Zustand völliger Abwesenheit von Keimen",
              noteFr: "Absence totale de tout germe infectieux"
            },
            {
              de: "Antisepsis",
              latin: "Antisepsis",
              fr: "Antisepsie",
              noteDe: "Vernichtung von Keimen an lebendem Gewebe",
              noteFr: "Destruction des germes sur tissu vivant"
            },
            {
              de: "Desinfektion",
              latin: "Desinfectio",
              fr: "Désinfection",
              noteDe: "Reduktion krankmachender Keime (nicht sporenfrei)",
              noteFr: "Réduction des germes pathogènes (non sporicide)"
            },
            {
              de: "Sterilisation",
              latin: "Sterilisatio",
              fr: "Stérilisation",
              noteDe: "Vollständige Abtötung ALLER Keime und Sporen",
              noteFr: "Élimination absolue de TOUS les germes et spores"
            }
          ]
        },
        {
          id: "m5-l3",
          type: "quiz",
          questionDe: "Wie lange muss das Desinfektionsmittel bei der hygienischen Händedesinfektion mindestens verrieben werden?",
          questionFr: "Combien de temps au minimum faut-il frictionner le produit lors de la désinfection des mains ?",
          imageKey: "hygiene-steps",
          options: [
            {
              textDe: "Mindestens 30 Sekunden",
              textFr: "Au moins 30 secondes",
              isCorrect: true,
              explanationDe: "Genau! 30 Sekunden sind die vorgeschriebene Mindesteinwirkzeit nach RKI-Vorgaben.",
              explanationFr: "Exact ! 30 secondes complètes sont obligatoires selon les normes d'hygiène."
            },
            {
              textDe: "5 Sekunden",
              textFr: "5 secondes",
              isCorrect: false,
              explanationDe: "5 Sekunden reichen keinesfalls aus, um Krankheitserreger abzutöten.",
              explanationFr: "5 secondes ne suffisent absolument pas."
            },
            {
              textDe: "2 Minuten",
              textFr: "2 minutes",
              isCorrect: false,
              explanationDe: "2 Minuten ist die Dauer für die chirurgische Händedesinfektion vor OPs.",
              explanationFr: "2 minutes correspond à la désinfection chirurgicale avant intervention."
            }
          ]
        },
        {
          id: "m5-l4",
          type: "quiz",
          questionDe: "Was unterscheidet die Sterilisation von der Desinfektion?",
          questionFr: "Quelle est la différence essentielle entre stérilisation et désinfection ?",
          options: [
            {
              textDe: "Sterilisation tötet auch hitzeresistente bakterielle Sporen ab.",
              textFr: "La stérilisation détruit également les spores bactériennes.",
              isCorrect: true,
              explanationDe: "Korrekt! Desinfektion tötet viele Keime, aber nur die Sterilisation macht absolut keimfrei (inkl. Sporen).",
              explanationFr: "Correct ! Seule la stérilisation garantit l'élimination absolue des spores."
            },
            {
              textDe: "Desinfektion ist immer heißer als Sterilisation.",
              textFr: "La désinfection est plus chaude que la stérilisation.",
              isCorrect: false,
              explanationDe: "Nein, die Sterilisation im Autoklav erfolgt bei 134°C Dampfdruck.",
              explanationFr: "Non, la stérilisation fonctionne sous haute pression à 134°C."
            }
          ]
        }
      ]
    }
  ]
};

