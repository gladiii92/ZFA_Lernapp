import { CourseData } from '../types/course';

export const courseData: CourseData = {
  modules: [
    {
      id: 'modul-1',
      order: 1,
      titleDe: 'Aufbau des Zahnes & Parodontium',
      titleFr: 'Structure de la dent & Parodonte',
      subtitleDe: 'Krone, Wurzel & die 4 Halteapparat-Gewebe',
      subtitleFr: 'Couronne, racine & les 4 tissus de soutien',
      descriptionDe: 'Lerne die anatomischen Abschnitte des Zahnes, seine Gewebeschichten und das Parodontium kennen.',
      descriptionFr: 'Apprenez l\'anatomie de la dent, ses couches tissulaires et l\'appareil de soutien parodontal.',
      badge: '🦷',
      color: 'emerald',
      xpReward: 120,
      lessons: [
        {
          id: 'm1-l1',
          type: 'theory',
          titleDe: 'Die drei Hauptabschnitte & Zahnhartsubstanzen',
          titleFr: 'Les trois parties principales & tissus dentaires',
          contentDe: 'Ein menschlicher Zahn gliedert sich in drei Hauptzonen: die sichtbare Krone (Corona dentis), den schützenden Zahnhals (Collum dentis) und die im Kieferknochen verankerte Wurzel (Radix dentis). Die Zahnhartsubstanzen umfassen Schmelz, Dentin und Zement.',
          contentFr: 'Une dent humaine comprend trois zones principales : la couronne visible (Corona dentis), le collet protecteur (Collum dentis) et la racine ancrée dans l\'os maxillaire (Radix dentis). Les tissus durs comprennent l\'émail, la dentine et le cément.',
          imageKey: 'tooth-anatomy',
          hotspots: [
            {
              id: 'hs-crown',
              x: 50,
              y: 20,
              titleDe: 'Zahnkrone (Corona dentis)',
              titleFr: 'Couronne dentaire (Corona dentis)',
              latin: 'Corona dentis',
              descriptionDe: 'Der sichtbare Teil des Zahnes, vollständig überzogen vom schützenden Zahnschmelz.',
              descriptionFr: 'Partie visible de la dent, entièrement recouverte par l\'émail protecteur.'
            },
            {
              id: 'hs-root',
              x: 50,
              y: 75,
              titleDe: 'Zahnwurzel (Radix dentis)',
              titleFr: 'Racine dentaire (Radix dentis)',
              latin: 'Radix dentis',
              descriptionDe: 'Verankert den Zahn in der knöchernen Alveole über die kollagenen Sharpey-Fasern.',
              descriptionFr: 'Ancre la dent dans l\'alvéole osseuse grâce aux fibres collagènes de Sharpey.'
            }
          ],
          keyPoints: [
            { de: 'Zahnkrone (Corona dentis): Im Mundraum sichtbar', fr: 'Couronne (Corona dentis) : visible en bouche' },
            { de: 'Zahnhals (Collum dentis): Übergangszone mit Schmelz-Zement-Grenze', fr: 'Collet (Collum dentis) : zone de jonction émail-cément' },
            { de: 'Zahnwurzel (Radix dentis): Verankerung im Alveolarknochen', fr: 'Racine (Radix dentis) : ancrage dans l\'os alvéolaire' }
          ]
        },
        {
          id: 'm1-l2',
          type: 'interactive_graphic',
          titleDe: 'Interaktive Anatomie: Zahnschmelz & Dentin',
          titleFr: 'Anatomie interactive : Émail & Dentine',
          instructionDe: 'Tippe auf den Zahnschmelz, um die härteste Substanz des Körpers zu untersuchen.',
          instructionFr: 'Touchez l\'émail dentaire pour examiner la substance la plus dure de l\'organisme.',
          graphicKey: 'tooth-anatomy',
          mode: 'locate',
          targetHotspotId: 'hs-enamel',
          hotspots: [
            {
              id: 'hs-enamel',
              x: 50,
              y: 18,
              radius: 15,
              titleDe: 'Zahnschmelz (Enamelum)',
              titleFr: 'Émail dentaire (Enamelum)',
              latin: 'Enamelum',
              descriptionDe: 'Besteht zu ca. 96 % aus anorganischem Hydroxylapatit. Kann nicht regeneriert werden.',
              descriptionFr: 'Composé à 96 % d\'hydroxyapatite inorganique. Tissu acellulaire sans régénération.'
            },
            {
              id: 'hs-dentin',
              x: 50,
              y: 40,
              radius: 15,
              titleDe: 'Zahnbein (Dentin)',
              titleFr: 'Dentine (Dentinum)',
              latin: 'Dentinum',
              descriptionDe: 'Hauptmasse des Zahnes (ca. 70 % mineralisiert), von Dentinkanälchen durchzogen.',
              descriptionFr: 'Masse principale de la dent (env. 70 % minéralisée), traversée par les tubulis dentinaires.'
            },
            {
              id: 'hs-pulp',
              x: 50,
              y: 55,
              radius: 12,
              titleDe: 'Zahnpulpa (Mark)',
              titleFr: 'Pulpe dentaire (Pulpa dentis)',
              latin: 'Pulpa dentis',
              descriptionDe: 'Zellreiches Bindegewebe mit Blutgefäßen, Lymphbahnen und sensiblen Nervenfasern.',
              descriptionFr: 'Tissu conjonctif richement vascularisé et innervé assurant la vitalité dentaire.'
            }
          ],
          feedbackSuccessDe: 'Hervorragend! Du hast den Zahnschmelz (Enamelum) präzise identifiziert.',
          feedbackSuccessFr: 'Excellent ! Vous avez identifié l\'émail dentaire (Enamelum) avec précision.',
          feedbackErrorDe: 'Das ist nicht der Zahnschmelz. Achte auf die äußere Schutzschicht der Krone.',
          feedbackErrorFr: 'Ce n\'est pas l\'émail dentaire. Observez la couche externe de la couronne.'
        },
        {
          id: 'm1-l3',
          type: 'interactive_graphic',
          titleDe: 'Parodontium: Die 4 Gewebe des Zahnhalteapparats',
          titleFr: 'Le Parodonte : les 4 tissus de soutien',
          instructionDe: 'Erkunde die vier Strukturen des Zahnhalteapparates (Parodontium).',
          instructionFr: 'Explorez les quatre structures composant l\'appareil d\'attache parodontal.',
          graphicKey: 'periodontium',
          mode: 'explore',
          hotspots: [
            {
              id: 'hs-gingiva',
              x: 30,
              y: 25,
              titleDe: 'Zahnfleisch (Gingiva)',
              titleFr: 'Gencive (Gingiva)',
              latin: 'Gingiva',
              descriptionDe: 'Dichtet den Zahn gegen bakterielle Invasion aus der Mundhöhle ab.',
              descriptionFr: 'Assure l\'étanchéité biologique contre l\'invasion bactérienne buccale.'
            },
            {
              id: 'hs-desmodont',
              x: 35,
              y: 55,
              titleDe: 'Wurzelhaut (Desmodont)',
              titleFr: 'Ligament parodontal (Desmodonte)',
              latin: 'Periodontium / Desmodontium',
              descriptionDe: 'Kollagene Sharpey-Fasern federn Kaubelastungen hydraulisch ab.',
              descriptionFr: 'Fibres de Sharpey assurant la suspension élastique et l\'amortissement occlusal.'
            },
            {
              id: 'hs-bone',
              x: 20,
              y: 65,
              titleDe: 'Alveolarknochen',
              titleFr: 'Os alvéolaire',
              latin: 'Os alveolare',
              descriptionDe: 'Knochenfach des Kiefers, in dem die Zahnwurzel elastisch verankert ist.',
              descriptionFr: 'Partie de l\'os maxillaire formant la loge osseuse accueillant la racine.'
            },
            {
              id: 'hs-cementum',
              x: 42,
              y: 60,
              titleDe: 'Wurzelzement (Cementum)',
              titleFr: 'Cément radiculaire (Cementum)',
              latin: 'Cementum',
              descriptionDe: 'Bedeckt die Wurzeloberfläche und verankert die Sharpey-Fasern fest im Dentin.',
              descriptionFr: 'Recouvre la racine et ancre solidement les fibres ligamentaires dans la dentine.'
            }
          ],
          periodontiumStructures: [
            {
              tissue: 'gingiva',
              nameDe: 'Zahnfleisch',
              nameFr: 'Gencive',
              latin: 'Gingiva',
              functionDe: 'Bakterielle Barriere und Schutz des Alveolarkamms',
              functionFr: 'Barrière antibactérienne et protection de la crête alvéolaire'
            },
            {
              tissue: 'cementum',
              nameDe: 'Wurzelzement',
              nameFr: 'Cément',
              latin: 'Cementum',
              functionDe: 'Verankerung der parodontalen Haltefasern',
              functionFr: 'Ancrage des fibres de soutien parodontales'
            },
            {
              tissue: 'desmodont',
              nameDe: 'Wurzelhaut',
              nameFr: 'Desmodonte',
              latin: 'Desmodontium',
              functionDe: 'Druckabsorption, Tastsinn und Eigenreflexsteuerung',
              functionFr: 'Amortissement de la pression et proprioception masticatoire'
            },
            {
              tissue: 'alveolar_bone',
              nameDe: 'Alveolarknochen',
              nameFr: 'Os alvéolaire',
              latin: 'Os alveolare',
              functionDe: 'Knöchernes Widerlager und Stützapparat der Zähne',
              functionFr: 'Support osseux et maintien mécanique des dents'
            }
          ]
        },
        {
          id: 'm1-l4',
          type: 'vocabulary',
          titleDe: 'Fachwortschatz Zahnaufbau & Parodontium',
          titleFr: 'Vocabulaire de l\'anatomie dentaire & du parodonte',
          instructionDe: 'Präge dir die anatomischen Fachbegriffe auf Deutsch, Französisch und Latein ein.',
          instructionFr: 'Mémorisez les termes anatomiques en allemand, français et latin.',
          vocab: [
            {
              de: 'Zahnschmelz',
              fr: 'Émail dentaire',
              latin: 'Enamelum',
              noteDe: 'Härtestes Gewebe des menschlichen Körpers (96 % Mineralien)',
              noteFr: 'Tissu le plus dur du corps humain (96 % de matière minérale)'
            },
            {
              de: 'Zahnbein',
              fr: 'Dentine',
              latin: 'Dentinum',
              noteDe: 'Hauptkörper des Zahnes, umschließt die Zahnpulpa',
              noteFr: 'Corps principal de la dent, enveloppant la pulpe dentaire'
            },
            {
              de: 'Zahnpulpa / Mark',
              fr: 'Pulpe dentaire',
              latin: 'Pulpa dentis',
              noteDe: 'Gefäß-Nerven-Strang im Inneren des Zahnes',
              noteFr: 'Paquet vasculo-nerveux assurant la vitalité et sensibilité'
            },
            {
              de: 'Wurzelhaut',
              fr: 'Desmodonte / Ligament parodontal',
              latin: 'Desmodontium',
              noteDe: 'Fasernetzwerk zur federnden Aufhängung im Knochen',
              noteFr: 'Réseau de fibres conjonctives amortissant les forces occlusales'
            },
            {
              de: 'Wurzelzement',
              fr: 'Cément dentaire',
              latin: 'Cementum',
              noteDe: 'Schützt die Zahnwurzel und verankert die Sharpey-Fasern',
              noteFr: 'Protège la surface radiculaire et insère les fibres ligamentaires'
            }
          ]
        },
        {
          id: 'm1-l5',
          type: 'quiz',
          titleDe: 'Quiz: Zahnhartsubstanzen & Parodontium',
          titleFr: 'Quiz : Tissus dentaires & Parodonte',
          questionDe: 'Welche Zahnhartsubstanz bildet die volumenmäßig größte Masse des menschlichen Zahnes?',
          questionFr: 'Quel tissu dur constitue la plus grande masse en volume de la dent humaine ?',
          options: [
            {
              textDe: 'Zahnschmelz (Enamelum)',
              textFr: 'Émail (Enamelum)',
              isCorrect: false,
              explanationDe: 'Schmelz bedeckt ausschließlich die Krone und ist nicht die volumenmäßig größte Substanz.',
              explanationFr: 'L\'émail ne recouvre que la couronne et ne représente pas la masse volumique principale.'
            },
            {
              textDe: 'Zahnbein (Dentin)',
              textFr: 'Dentine (Dentinum)',
              isCorrect: true,
              explanationDe: 'Richtig! Das Dentin bildet das elastische Grundgerüst von Krone und Wurzel.',
              explanationFr: 'Correct ! La dentine forme l\'armature principale et la majeure partie de la dent.'
            },
            {
              textDe: 'Wurzelzement (Cementum)',
              textFr: 'Cément (Cementum)',
              isCorrect: false,
              explanationDe: 'Zement bildet nur eine dünne Hüllschicht um die Zahnwurzel.',
              explanationFr: 'Le cément ne forme qu\'une fine pellicule protectrice sur la racine.'
            }
          ]
        },
        {
          id: 'm1-l6',
          type: 'matching',
          titleDe: 'Zuordnung: Zahnhartsubstanzen & Gewebe',
          titleFr: 'Correspondance : Tissus dentaires & Rôles',
          instructionDe: 'Ordne jedes Zahngewebe seiner korrekten Hauptfunktion zu.',
          instructionFr: 'Associez chaque tissu dentaire à sa fonction principale.',
          pairs: [
            {
              id: 'p1',
              leftDe: 'Zahnschmelz',
              leftFr: 'Émail dentaire',
              rightDe: 'Verschleißfeste Kaukronenkappe (96 % mineralisiert)',
              rightFr: 'Protection résistante à l\'usure (96 % minéralisé)'
            },
            {
              id: 'p2',
              leftDe: 'Dentin',
              leftFr: 'Dentine',
              rightDe: 'Elastisches Kissen und Hauptstützmasse',
              rightFr: 'Amortisseur élastique et masse fondamentale'
            },
            {
              id: 'p3',
              leftDe: 'Zahnpulpa',
              leftFr: 'Pulpe dentaire',
              rightDe: 'Ernährung und Schmerzempfindung des Zahnes',
              rightFr: 'Nutrition et sensibilité nerveuse de la dent'
            },
            {
              id: 'p4',
              leftDe: 'Desmodont',
              leftFr: 'Desmodonte',
              rightDe: 'Stoßdämpfung und Tastsensomotorik',
              rightFr: 'Suspension amortissante et proprioception'
            }
          ]
        }
      ]
    },
    {
      id: 'modul-2',
      order: 2,
      titleDe: 'Zahnarten & FDI-Zahnschema',
      titleFr: 'Types de dents & Schéma FDI',
      subtitleDe: 'Zahnformen, Quadranten & Nomenklatur',
      subtitleFr: 'Formes dentaires, quadrants & nomenclature',
      descriptionDe: 'Lerne die vier Zahntypen, die Quadranten und das international standardisierte FDI-System für bleibendes und Milchgebiss.',
      descriptionFr: 'Apprenez les quatre types de dents, les quadrants et le système international FDI pour denture permanente et temporaire.',
      badge: '🔢',
      color: 'blue',
      xpReward: 140,
      lessons: [
        {
          id: 'm2-l1',
          type: 'theory',
          titleDe: 'Die vier Zahnarten des menschlichen Gebisses',
          titleFr: 'Les quatre types de dents humaines',
          contentDe: 'Das bleibende Gebiss eines Erwachsenen umfasst 32 Zähne: 8 Schneidezähne (Incisivi), 4 Eckzähne (Canini), 8 Backenzähne (Prämolaren) und 12 Mahlzähne (Molaren). Jeder Zahntyp besitzt eine hochspezialisierte morphologische Form für die Nahrungszerkleinerung.',
          contentFr: 'La denture permanente adulte compte 32 dents : 8 incisives (Incisivi), 4 canines (Canini), 8 prémolaires (Praemolares) et 12 molaires (Molares). Chaque groupe dentaire possède une morphologie dédiée au traitement mécanique des aliments.',
          imageKey: 'tooth-types',
          keyPoints: [
            { de: 'Incisivi (Schneidezähne): Meißelförmig zum Abbeißen', fr: 'Incisives : forme en biseau pour trancher' },
            { de: 'Canini (Eckzähne): Kronenspitze und längste Wurzel zum Reißen', fr: 'Canines : pointe cuspidienne et racine la plus longue' },
            { de: 'Prämolaren & Molaren: Breite Kauflächen zum Zermahlen', fr: 'Prémolaires & molaires : larges tables occlusales pour broyer' }
          ]
        },
        {
          id: 'm2-l2',
          type: 'interactive_graphic',
          titleDe: 'Interaktives FDI-Schema: Die vier Quadranten',
          titleFr: 'Schéma FDI interactif : Les quatre quadrants',
          instructionDe: 'Tippe auf die Zähne, um deren FDI-Kennziffer nach Quadrant und Position zu erkunden.',
          instructionFr: 'Touchez les dents pour découvrir leur notation FDI selon le quadrant et la position.',
          graphicKey: 'fdi-scheme',
          mode: 'explore',
          hotspots: [
            {
              id: 'hs-q1',
              x: 65,
              y: 25,
              titleDe: '1. Quadrant (Oberkiefer rechts)',
              titleFr: '1er Quadrant (Maxillaire supérieur droit)',
              descriptionDe: 'Zähne 18 bis 11 (vom Weisheitszahn bis zum mittleren Schneidezahn).',
              descriptionFr: 'Dents 18 à 11 (de la dent de sagesse à l\'incisive centrale).'
            },
            {
              id: 'hs-q2',
              x: 35,
              y: 25,
              titleDe: '2. Quadrant (Oberkiefer links)',
              titleFr: '2e Quadrant (Maxillaire supérieur gauche)',
              descriptionDe: 'Zähne 21 bis 28 (vom mittleren Schneidezahn bis zum Weisheitszahn).',
              descriptionFr: 'Dents 21 à 28 (de l\'incisive centrale à la dent de sagesse).'
            },
            {
              id: 'hs-q3',
              x: 35,
              y: 75,
              titleDe: '3. Quadrant (Unterkiefer links)',
              titleFr: '3e Quadrant (Mandibule inférieure gauche)',
              descriptionDe: 'Zähne 31 bis 38.',
              descriptionFr: 'Dents 31 à 38.'
            },
            {
              id: 'hs-q4',
              x: 65,
              y: 75,
              titleDe: '4. Quadrant (Unterkiefer rechts)',
              titleFr: '4e Quadrant (Mandibule inférieure droite)',
              descriptionDe: 'Zähne 41 bis 48.',
              descriptionFr: 'Dents 41 à 48.'
            }
          ],
          fdiTeeth: [
            {
              number: 11,
              quadrant: 1,
              position: 1,
              nameDe: 'Mittlerer Schneidezahn oben rechts',
              nameFr: 'Incisive centrale supérieure droite',
              latin: 'Dens incisivus primus superior dexter',
              type: 'incisor',
              typeDe: 'Schneidezahn',
              typeFr: 'Incisive',
              rootsCount: 1,
              fdiNotation: '11'
            },
            {
              number: 21,
              quadrant: 2,
              position: 1,
              nameDe: 'Mittlerer Schneidezahn oben links',
              nameFr: 'Incisive centrale supérieure gauche',
              latin: 'Dens incisivus primus superior sinister',
              type: 'incisor',
              typeDe: 'Schneidezahn',
              typeFr: 'Incisive',
              rootsCount: 1,
              fdiNotation: '21'
            },
            {
              number: 16,
              quadrant: 1,
              position: 6,
              nameDe: 'Erster großer Backenzahn (Sechser) oben rechts',
              nameFr: 'Première molaire supérieure droite (dent de 6 ans)',
              latin: 'Dens molaris primus superior dexter',
              type: 'molar',
              typeDe: 'Molar',
              typeFr: 'Molaire',
              rootsCount: 3,
              fdiNotation: '16'
            },
            {
              number: 46,
              quadrant: 4,
              position: 6,
              nameDe: 'Erster großer Backenzahn unten rechts',
              nameFr: 'Première molaire inférieure droite',
              latin: 'Dens molaris primus inferior dexter',
              type: 'molar',
              typeDe: 'Molar',
              typeFr: 'Molaire',
              rootsCount: 2,
              fdiNotation: '46'
            }
          ]
        },
        {
          id: 'm2-l3',
          type: 'interactive_graphic',
          titleDe: 'Zahnarten identifizieren: Molaren & Prämolaren',
          titleFr: 'Identifier les types de dents : Molaires & Prémolaires',
          instructionDe: 'Lokalisiere den Mahlzahn (Molar) mit seiner breiten, mehrhöckrigen Kaufläche.',
          instructionFr: 'Localisez la molaire avec sa large table occlusale multi-cuspidée.',
          graphicKey: 'tooth-types',
          mode: 'locate',
          targetHotspotId: 'hs-molar',
          hotspots: [
            {
              id: 'hs-incisor',
              x: 20,
              y: 50,
              titleDe: 'Schneidezahn (Incisivus)',
              titleFr: 'Incisive (Incisivus)',
              descriptionDe: 'Schmale, meißelartige Schneidekante zum Trennen von Speisen.',
              descriptionFr: 'Bord incisif tranchant pour la section des aliments.'
            },
            {
              id: 'hs-canine',
              x: 40,
              y: 50,
              titleDe: 'Eckzahn (Caninus)',
              titleFr: 'Canine (Caninus)',
              descriptionDe: 'Erhöhte Eckzahnspitze und kräftige, lange Wurzel zur Führung des Unterkiefers.',
              descriptionFr: 'Pointe cuspidienne proéminente et racine robuste guidant l\'occlusion.'
            },
            {
              id: 'hs-premolar',
              x: 60,
              y: 50,
              titleDe: 'Prämolar (Backenzahn)',
              titleFr: 'Prémolaire (Praemolaris)',
              descriptionDe: 'Zweihöckrige Kaufläche (bicuspid) zum Zerdrücken.',
              descriptionFr: 'Surface bicuspide adaptée à l\'écrasement bol alimentaire.'
            },
            {
              id: 'hs-molar',
              x: 80,
              y: 50,
              titleDe: 'Molar (Mahlzahn)',
              titleFr: 'Molaire (Molaris)',
              descriptionDe: 'Große Kaufläche mit 4 bis 5 Höckern und mehreren Wurzeln zum Zermahlen.',
              descriptionFr: 'Large surface occlusale à 4-5 cuspides et racines multiples pour broyer.'
            }
          ],
          feedbackSuccessDe: 'Perfekt! Du hast den Molaren korrekt ausgewählt.',
          feedbackSuccessFr: 'Parfait ! Vous avez correctement sélectionné la molaire.'
        },
        {
          id: 'm2-l4',
          type: 'vocabulary',
          titleDe: 'Fachwortschatz Zahnarten & FDI-System',
          titleFr: 'Vocabulaire des types de dents & système FDI',
          instructionDe: 'Lerne die lateinischen und französischen Bezeichnungen der Zahngruppen.',
          instructionFr: 'Apprenez les dénominations latines et françaises des groupes dentaires.',
          vocab: [
            {
              de: 'Schneidezahn',
              fr: 'Incisive',
              latin: 'Dens incisivus',
              noteDe: 'Position 1 und 2 in jedem Quadranten',
              noteFr: 'Positions 1 et 2 dans chaque quadrant'
            },
            {
              de: 'Eckzahn',
              fr: 'Canine',
              latin: 'Dens caninus',
              noteDe: 'Position 3 in jedem Quadranten',
              noteFr: 'Position 3 dans chaque quadrant'
            },
            {
              de: 'Vormahlzahn / Prämolar',
              fr: 'Prémolaire',
              latin: 'Dens praemolaris',
              noteDe: 'Position 4 und 5 (fehlt im Milchgebiss)',
              noteFr: 'Positions 4 et 5 (absente de la denture lactéale)'
            },
            {
              de: 'Mahlzahn / Molar',
              fr: 'Molaire',
              latin: 'Dens molaris',
              noteDe: 'Position 6, 7 und 8 (Weisheitszahn)',
              noteFr: 'Positions 6, 7 et 8 (dent de sagesse)'
            }
          ]
        },
        {
          id: 'm2-l5',
          type: 'quiz',
          titleDe: 'Quiz: FDI-Notation & Zahnmerkmale',
          titleFr: 'Quiz : Notation FDI & caractéristiques dentaires',
          questionDe: 'Welcher Zahn wird im FDI-Schema mit der Ziffer 24 bezeichnet?',
          questionFr: 'Quelle dent est désignée par le code 24 dans le schéma FDI ?',
          options: [
            {
              textDe: 'Erster Prämolar oben links',
              textFr: 'Première prémolaire supérieure gauche',
              isCorrect: true,
              explanationDe: 'Korrekt! Die 2 steht für den 2. Quadranten (oben links), die 4 für den 1. Prämolaren.',
              explanationFr: 'Exact ! Le chiffre 2 indique le 2e quadrant (haut gauche), le 4 la 1re prémolaire.'
            },
            {
              textDe: 'Erster Prämolar oben rechts',
              textFr: 'Première prémolaire supérieure droite',
              isCorrect: false,
              explanationDe: 'Falsch. Der 1. Prämolar oben rechts heißt 14.',
              explanationFr: 'Faux. La première prémolaire supérieure droite est la 14.'
            },
            {
              textDe: 'Zweiter Prämolar unten links',
              textFr: 'Deuxième prémolaire inférieure gauche',
              isCorrect: false,
              explanationDe: 'Falsch. Der 2. Prämolar unten links heißt 35.',
              explanationFr: 'Faux. La deuxième prémolaire inférieure gauche est la 35.'
            }
          ]
        },
        {
          id: 'm2-l6',
          type: 'matching',
          titleDe: 'Zuordnung: FDI-Zahnnummer & Quadrant',
          titleFr: 'Correspondance : Numéro FDI & Quadrant',
          instructionDe: 'Verbinde jede Zahnnummer mit der korrekten Lagebeschreibung.',
          instructionFr: 'Reliez chaque numéro FDI à sa localisation anatomique exacte.',
          pairs: [
            {
              id: 'fp1',
              leftDe: 'Zahn 11',
              leftFr: 'Dent 11',
              rightDe: 'Mittlerer Schneidezahn oben rechts',
              rightFr: 'Incisive centrale supérieure droite'
            },
            {
              id: 'fp2',
              leftDe: 'Zahn 26',
              leftFr: 'Dent 26',
              rightDe: 'Erster Molar oben links (6er)',
              rightFr: 'Première molaire supérieure gauche (dent de 6 ans)'
            },
            {
              id: 'fp3',
              leftDe: 'Zahn 33',
              leftFr: 'Dent 33',
              rightDe: 'Eckzahn unten links',
              rightFr: 'Canine inférieure gauche'
            },
            {
              id: 'fp4',
              leftDe: 'Zahn 48',
              leftFr: 'Dent 48',
              rightDe: 'Weisheitszahn unten rechts',
              rightFr: 'Dent de sagesse inférieure droite'
            }
          ]
        }
      ]
    },
    {
      id: 'modul-3',
      order: 3,
      titleDe: 'Kariespathologie & Stadien',
      titleFr: 'Pathologie carieuse & Stades',
      subtitleDe: 'Demineralisation, Karieskaskade D1-D4',
      subtitleFr: 'Déminéralisation, cascade carieuse D1-D4',
      descriptionDe: 'Verstehe die Entstehung von Zahnkaries, den Einfluss von Biofilm und Zuckern sowie die vier Stadien von der Initialkaries bis zur Caries profunda.',
      descriptionFr: 'Comprenez le développement de la carie, l\'impact du biofilm et des sucres ainsi que les quatre stades de la carie initiale à la carie profonde.',
      badge: '🔬',
      color: 'amber',
      xpReward: 150,
      lessons: [
        {
          id: 'm3-l1',
          type: 'theory',
          titleDe: 'Entstehung der Karies & Demineralisation',
          titleFr: 'Étiologie de la carie & Déminéralisation',
          contentDe: 'Zahnkaries ist eine infektiöse multifaktorielle Erkrankung. Bakterien im oralen Biofilm (insbesondere Streptococcus mutans und Laktobazillen) fermentieren niedermolekulare Kohlenhydrate zu organischen Säuren (Milchsäure). Fällt der pH-Wert unter den kritischen Wert von ca. 5,5, beginnt die Demineralisation des Zahnschmelzes.',
          contentFr: 'La carie dentaire est une pathologie infectieuse multifactorielle. Les bactéries du biofilm buccal (notamment Streptococcus mutans et lactobacilles) métabolisent les glucides en acides organiques. Dès que le pH descend sous le seuil critique de 5,5, la déminéralisation de l\'émail s\'amorce.',
          imageKey: 'caries-stages',
          keyPoints: [
            { de: 'Biofilm + Zucker = Säurebildung (Milchsäure)', fr: 'Biofilm + Sucres = Production d\'acides organiques' },
            { de: 'Kritischer pH-Wert: 5,5 beim Schmelz, 6,2–6,7 beim Wurzelzement', fr: 'pH critique : 5,5 pour l\'émail, 6,2–6,7 pour le cément' },
            { de: 'Remineralisation durch Speichel und Fluoride im Initialstadium möglich', fr: 'Reminéralisation possible par la salive et le fluor au stade initial' }
          ]
        },
        {
          id: 'm3-l2',
          type: 'interactive_graphic',
          titleDe: 'Interaktive Kariesstadien: D1 bis D4',
          titleFr: 'Stades carieux interactifs : D1 à D4',
          instructionDe: 'Wähle nacheinander die Kariesstadien aus, um das Vordringen der Infektion zu verfolgen.',
          instructionFr: 'Sélectionnez successivement les stades carieux pour suivre la progression de la lésion.',
          graphicKey: 'caries-stages',
          mode: 'sequence',
          hotspots: [
            {
              id: 'hs-d1',
              x: 50,
              y: 15,
              titleDe: 'Stadium D1: Initialkaries',
              titleFr: 'Stade D1 : Carie initiale',
              descriptionDe: 'Entkalkung der Schmelzoberfläche ohne Kavitation (White Spot / Kreidefleck). Reversibel durch Fluoridierung.',
              descriptionFr: 'Déminéralisation sous-surfacique sans cavitation (tache blanche). Réversible par fluoration.'
            },
            {
              id: 'hs-d2',
              x: 50,
              y: 28,
              titleDe: 'Stadium D2: Schmelzkaries',
              titleFr: 'Stade D2 : Carie amélaire',
              descriptionDe: 'Schmelzeinbruch mit sichtbarer Kavität, aber noch auf den Schmelz begrenzt.',
              descriptionFr: 'Perte de substance et cavitation limitée à l\'épaisseur de l\'émail dentaire.'
            },
            {
              id: 'hs-d3',
              x: 50,
              y: 45,
              titleDe: 'Stadium D3: Dentinkaries (Caries media)',
              titleFr: 'Stade D3 : Carie dentinaire (Caries media)',
              descriptionDe: 'Rasch fortschreitende Erweichung im Dentin infolge enzymatischer Zersetzung durch Dentinkanälchen.',
              descriptionFr: 'Invasion rapide des tubulis dentinaires avec ramollissement tissulaire et sensibilité.'
            },
            {
              id: 'hs-d4',
              x: 50,
              y: 65,
              titleDe: 'Stadium D4: Tiefe Karies & Penetration (Caries profunda / penetrans)',
              titleFr: 'Stade D4 : Carie profonde & pénétrante (Caries profunda / penetrans)',
              descriptionDe: 'Erreicht die unmittelbare Nähe der Pulpa oder eröffnet diese. Akute Gefahr einer irreversiblen Pulpitis oder Pulpanekrose.',
              descriptionFr: 'Atteinte proche de la pulpe dentaire ou effraction pulpaire. Risque élevé de pulpite irréversible ou nécrose.'
            }
          ],
          cariesStages: [
            {
              level: 'initial',
              nameDe: 'D1 - Initialkaries',
              nameFr: 'D1 - Carie initiale',
              depthDe: 'Äußere Schmelzschicht (subsurface demineralization)',
              depthFr: 'Couche externe de l\'émail',
              symptomsDe: 'Kreidiger Fleck (White Spot), symptomlos',
              symptomsFr: 'Tache blanche crayeuse, asymptomatique',
              therapyDe: 'Non-invasiv: Professionelle Zahnreinigung & hochdosiertes Fluorid',
              therapyFr: 'Non-invasif : Fluoration topique et reminéralisation',
              reversible: true
            },
            {
              level: 'enamel',
              nameDe: 'D2 - Schmelzkaries',
              nameFr: 'D2 - Carie amélaire',
              depthDe: 'Gesamte Schmelzbreite bis zur Schmelz-Dentin-Grenze',
              depthFr: 'Émail jusqu\'à la jonction amélo-dentinaire',
              symptomsDe: 'Kleine Kavitation, raue Zahnoberfläche',
              symptomsFr: 'Cavitation visible, rugosité de surface',
              therapyDe: 'Minimalinvasiv: Kariesinfiltration oder Füllung',
              therapyFr: 'Micro-invasif : Restauration adhésive ou infiltration',
              reversible: false
            },
            {
              level: 'dentin',
              nameDe: 'D3 - Dentinkaries (Caries media)',
              nameFr: 'D3 - Carie de la dentine',
              depthDe: 'Dringt tief in das Zahnbein vor',
              depthFr: 'Pénétration profonde dans la dentine',
              symptomsDe: 'Schmerzen bei süß, sauer, kalt oder heiß',
              symptomsFr: 'Douleurs provoquées (froid, chaud, sucré, acide)',
              therapyDe: 'Exkavieren der erweichten Karies & Kompositfüllung',
              therapyFr: 'Curetage carieux et obturation composite directe',
              reversible: false
            },
            {
              level: 'profunda',
              nameDe: 'D4 - Caries profunda',
              nameFr: 'D4 - Carie profonde',
              depthDe: 'Über 2/3 des Dentins erfasst, pulpanahe Läsion',
              depthFr: 'Atteinte de plus des deux tiers dentinaires, juxta-pulpaire',
              symptomsDe: 'Spontanschmerzen, Klopfempfindlichkeit möglich',
              symptomsFr: 'Douleurs spontanées, risque d\'atteinte pulpaire aiguë',
              therapyDe: 'Überkappung (indirekt/direkt) oder Wurzelkanalbehandlung',
              therapyFr: 'Coiffage pulpaire ou endodontie (dévitalisation)',
              reversible: false
            }
          ]
        },
        {
          id: 'm3-l3',
          type: 'quiz',
          titleDe: 'Quiz: Kariesstadien D1 bis D4',
          titleFr: 'Quiz : Stades de la carie D1 à D4',
          questionDe: 'Welches Kariesstadium kann durch Remineralisation und Fluoridgabe noch vollständig ausgeheilt werden?',
          questionFr: 'Quel stade carieux peut encore être complètement guéri par reminéralisation et fluoration ?',
          options: [
            {
              textDe: 'Stadium D1 (Initialkaries / White Spot)',
              textFr: 'Stade D1 (Carie initiale / Tache blanche)',
              isCorrect: true,
              explanationDe: 'Richtig! Solange die Schmelzoberfläche intakt ist, können Mineralien wie Fluorapatit eingelagert werden.',
              explanationFr: 'Correct ! Tant que la surface de l\'émail est intacte, les minéraux peuvent s\'y réincorporer.'
            },
            {
              textDe: 'Stadium D2 (Schmelzkaries mit Kavität)',
              textFr: 'Stade D2 (Carie amélaire avec cavité)',
              isCorrect: false,
              explanationDe: 'Falsch. Sobald ein Substanzdefekt vorliegt, ist eine Remineralisation nicht mehr ausreichend.',
              explanationFr: 'Faux. Dès qu\'une perte de substance apparaît, une obturation devient nécessaire.'
            },
            {
              textDe: 'Stadium D3 (Dentinkaries)',
              textFr: 'Stade D3 (Carie dentinaire)',
              isCorrect: false,
              explanationDe: 'Falsch. Dentinkaries erfordert immer die instrumentelle Entfernung des erweichten Dentins.',
              explanationFr: 'Faux. La carie dentinaire nécessite toujours l\'élimination mécanique de la dentine infectée.'
            }
          ]
        },
        {
          id: 'm3-l4',
          type: 'vocabulary',
          titleDe: 'Fachbegriffe der Kariologie',
          titleFr: 'Terminologie de la cariologie',
          instructionDe: 'Präge dir die Schlüsselbegriffe der Kariespathologie ein.',
          instructionFr: 'Retenez les concepts fondamentaux de la cariologie clinique.',
          vocab: [
            {
              de: 'Demineralisation',
              fr: 'Déminéralisation',
              latin: 'Demineralisatio',
              noteDe: 'Herauslösen von Kalzium und Phosphat durch Säuren',
              noteFr: 'Perte d\'ions calcium et phosphate sous l\'effet des acides'
            },
            {
              de: 'Remineralisation',
              fr: 'Reminéralisation',
              latin: 'Remineralisatio',
              noteDe: 'Wiedereinlagerung von Mineralien in den Zahnschmelz',
              noteFr: 'Réincorporation de minéraux fortifiants dans l\'émail'
            },
            {
              de: 'Initialkaries',
              fr: 'Carie initiale (tache blanche)',
              latin: 'Caries initialis',
              noteDe: 'Erstes reversibles Kariesstadium ohne Schmelzeinbruch',
              noteFr: 'Premier stade carieux réversible sans effondrement amélaire'
            },
            {
              de: 'Tiefe Karies',
              fr: 'Carie profonde',
              latin: 'Caries profunda',
              noteDe: 'Pulpanahe Kariesläsion mit Entzündungsrisiko',
              noteFr: 'Lésion carieuse proche de la chambre pulpaire'
            }
          ]
        }
      ]
    },
    {
      id: 'modul-4',
      order: 4,
      titleDe: 'Instrumentarium & Praxishygiene',
      titleFr: 'Instrumentation & Hygiène au cabinet',
      subtitleDe: 'Grundbesteck, RKI-Hygienekette & Sterilisation',
      subtitleFr: 'Set d\'examen, chaîne d\'hygiène & stérilisation',
      descriptionDe: 'Beherrsche das zahnärztliche Grundbesteck, die Klassifizierung von Medizinprodukten und den lückenlosen Sterilisationskreislauf.',
      descriptionFr: 'Maîtrisez les instruments de base, la classification des dispositifs médicaux et le cycle complet de stérilisation.',
      badge: '🧼',
      color: 'cyan',
      xpReward: 160,
      lessons: [
        {
          id: 'm4-l1',
          type: 'theory',
          titleDe: 'Das zahnärztliche Grundbesteck',
          titleFr: 'Le set d\'examen de base',
          contentDe: 'Das zahnärztliche Grundbesteck (Untersuchungsbesteck) ist bei jeder klinischen Befunderhebung unverzichtbar. Es besteht standardmäßig aus Mundspiegel, zahnärztlicher Sonde und zahnärztlicher Pinzette.',
          contentFr: 'Le plateau d\'examen de base est indispensable à toute consultation clinique. Il se compose traditionnellement du miroir buccal, de la sonde exploratrice et des précelles dentaires.',
          imageKey: 'instruments',
          keyPoints: [
            { de: 'Mundspiegel: Indirekte Sicht, Abhalten von Wange/Zunge und Ausleuchtung', fr: 'Miroir : vision indirecte, rétraction des tissus et éclairage' },
            { de: 'Zahnärztliche Sonde: Tasten nach Karies, Füllungsrändern und Fissuren', fr: 'Sonde : détection tactile des caries, anfractuosités et bords' },
            { de: 'Zahnpinzette: Fassen von Watterollen, Pellets und Kleinmaterialien', fr: 'Précelles : manipulation stérile des rouleaux de coton et inserts' }
          ]
        },
        {
          id: 'm4-l2',
          type: 'interactive_graphic',
          titleDe: 'Instrumenten-Erkennung: Diagnostik & Konservierend',
          titleFr: 'Identification des instruments : Diagnostic & Conservateur',
          instructionDe: 'Tippe auf die Instrumente, um deren Namen und präzisen Verwendungszweck kennenzulernen.',
          instructionFr: 'Touchez les instruments pour identifier leur rôle clinique spécifique.',
          graphicKey: 'instruments',
          mode: 'explore',
          hotspots: [
            {
              id: 'hs-mirror',
              x: 20,
              y: 50,
              titleDe: 'Planer Mundspiegel',
              titleFr: 'Miroir buccal plan',
              descriptionDe: 'Ermöglicht indirekte Sicht in unzugängliche Mundregionen und lenkt Licht um.',
              descriptionFr: 'Offre une vision indirecte des zones postérieures et réfléchit la lumière opératoire.'
            },
            {
              id: 'hs-probe',
              x: 40,
              y: 50,
              titleDe: 'Häkchensonde',
              titleFr: 'Sonde exploratrice',
              descriptionDe: 'Tastinstrument zur Erkennung von Schmelzerweichungen und undichten Füllungsrändern.',
              descriptionFr: 'Instrument tactile permettant de déceler le ramollissement carieux et les hiatus marginaux.'
            },
            {
              id: 'hs-tweezers',
              x: 60,
              y: 50,
              titleDe: 'Zahnärztliche Pinzette (geknickt)',
              titleFr: 'Précelles dentaires (angulées)',
              descriptionDe: 'Präzises Greifen von sterilen Watterollen, Pinseln und rotierenden Bohrern.',
              descriptionFr: 'Saisie atraumatique et stérile des cotons salivaires, boulettes et petits instruments.'
            },
            {
              id: 'hs-heidemann',
              x: 80,
              y: 50,
              titleDe: 'Heidemann-Spatel',
              titleFr: 'Spatule de Heidemann',
              descriptionDe: 'Flaches Metallinstrument zum Einbringen und Modellieren von Füllungswerkstoffen.',
              descriptionFr: 'Instrument métallique plat servant à insérer et sculpter les résines composites.'
            }
          ],
          instruments: [
            {
              id: 'ins-mirror',
              nameDe: 'Mundspiegel',
              nameFr: 'Miroir buccal',
              latin: 'Speculum dentale',
              category: 'diagnostic',
              usageDe: 'Sichtverbesserung und Weichgewebeabhalten',
              usageFr: 'Vision indirecte et rétraction linguale/jugale'
            },
            {
              id: 'ins-probe',
              nameDe: 'Zahnärztliche Sonde',
              nameFr: 'Sonde dentaire',
              latin: 'Exploratorium dentale',
              category: 'diagnostic',
              usageDe: 'Taktile Inspektion von Fissuren und Zementgrenzen',
              usageFr: 'Exploration tactile des surfaces et fentes dentaires'
            },
            {
              id: 'ins-heidemann',
              nameDe: 'Heidemann-Spatel',
              nameFr: 'Spatule de Heidemann',
              category: 'conservative',
              usageDe: 'Plazierung und Glättung von Matrizen und Füllungen',
              usageFr: 'Modelage et adaptation marginale des composites'
            }
          ]
        },
        {
          id: 'm4-l3',
          type: 'interactive_graphic',
          titleDe: 'RKI-Aufbereitungskette in 6 Schritten',
          titleFr: 'Chaîne de retraitement en 6 étapes',
          instructionDe: 'Bringe die Schritte der Instrumentenaufbereitung in die richtige Reihenfolge.',
          instructionFr: 'Suivez le protocole séquentiel de retraitement des dispositifs médicaux.',
          graphicKey: 'hygiene-steps',
          mode: 'sequence',
          sequenceSteps: [
            {
              stepNumber: 1,
              hotspotId: 'hs-prep',
              titleDe: '1. Vorbereitung & Entsorgung',
              titleFr: '1. Pré-désinfection & tri',
              descriptionDe: 'Abwurf von Einmalartikeln am Behandlungsstuhl und Trockenentsorgung im Container.',
              descriptionFr: 'Élimination des consommables à usage unique et pré-désinfection au fauteuil.'
            },
            {
              stepNumber: 2,
              hotspotId: 'hs-rdg',
              titleDe: '2. Maschinelle Reinigung & Desinfektion (RDG)',
              titleFr: '2. Nettoyage & thermo-désinfection (Laveur)',
              descriptionDe: 'Validierte Reinigung im Thermodesinfektor bei mind. 90 °C mit 5 Minuten Haltezeit (A0-Wert ≥ 3000).',
              descriptionFr: 'Lavage et thermo-désinfection automatisée validée (90 °C, A0 ≥ 3000).'
            },
            {
              stepNumber: 3,
              hotspotId: 'hs-check',
              titleDe: '3. Sichtprüfung & Pflege',
              titleFr: '3. Contrôle visuel & lubrification',
              descriptionDe: 'Lupenkontrolle auf Sauberkeit, Korrosion und Pflege rotierender Instrumente mit Spezialöl.',
              descriptionFr: 'Contrôle à la loupe de la propreté, absence de corrosion et huilage des turbines.'
            },
            {
              stepNumber: 4,
              hotspotId: 'hs-pack',
              titleDe: '4. Verpackung & Siegelung',
              titleFr: '4. Conditionnement & thermoscellage',
              descriptionDe: 'Einschweißen in Klarsicht-Sterilisationsfolie mit Mindestsiegelnahtbreite von 8 mm.',
              descriptionFr: 'Mise sous sachet pelable thermo-scellé avec soudure conforme de 8 mm minimum.'
            },
            {
              stepNumber: 5,
              hotspotId: 'hs-auto',
              titleDe: '5. Dampfsterilisation (Autoklav Klasse B)',
              titleFr: '5. Stérilisation vapeur (Autoclave classe B)',
              descriptionDe: 'Fraktioniertes Vorvakuumverfahren bei 134 °C und mindestens 3 Minuten Haltezeit (2,1 bar).',
              descriptionFr: 'Cycle à vide fractionné à la vapeur d\'eau saturée à 134 °C pendant au moins 3 minutes.'
            },
            {
              stepNumber: 6,
              hotspotId: 'hs-release',
              titleDe: '6. Freigabe & Dokumentation',
              titleFr: '6. Libération de charge & traçabilité',
              descriptionDe: 'Prüfung der Prozessindikatoren, Barcode-Etikettierung und digitale Archivierung der Chargennummer.',
              descriptionFr: 'Vérification des indicateurs physico-chimiques, étiquetage code-barres et archivage.'
            }
          ],
          hotspots: [
            {
              id: 'hs-prep',
              x: 16,
              y: 50,
              titleDe: 'Schritt 1: Entsorgung',
              titleFr: 'Étape 1 : Tri',
              descriptionDe: 'Trockenablage direkt nach der Behandlung.',
              descriptionFr: 'Dépôt sécurisé après le soin.'
            },
            {
              id: 'hs-rdg',
              x: 32,
              y: 50,
              titleDe: 'Schritt 2: RDG',
              titleFr: 'Étape 2 : Laveur-désinfecteur',
              descriptionDe: 'Validierter Thermodesinfektor.',
              descriptionFr: 'Thermo-désinfecteur automatisé.'
            },
            {
              id: 'hs-check',
              x: 48,
              y: 50,
              titleDe: 'Schritt 3: Kontrolle',
              titleFr: 'Étape 3 : Contrôle visuel',
              descriptionDe: 'Sauberkeit & Funktionsprüfung.',
              descriptionFr: 'Vérification de l\'intégrité.'
            },
            {
              id: 'hs-pack',
              x: 64,
              y: 50,
              titleDe: 'Schritt 4: Verpackung',
              titleFr: 'Étape 4 : Emballage',
              descriptionDe: 'Siegeln der Sterilverpackung.',
              descriptionFr: 'Thermoscellage étanche.'
            },
            {
              id: 'hs-auto',
              x: 80,
              y: 50,
              titleDe: 'Schritt 5: Autoklav',
              titleFr: 'Étape 5 : Autoclave B',
              descriptionDe: 'Dampfsterilisation bei 134 °C.',
              descriptionFr: 'Vapeur saturée à 134 °C.'
            },
            {
              id: 'hs-release',
              x: 95,
              y: 50,
              titleDe: 'Schritt 6: Freigabe',
              titleFr: 'Étape 6 : Traçabilité',
              descriptionDe: 'Chargendokumentation & Lagerung.',
              descriptionFr: 'Validation finale et étiquetage.'
            }
          ]
        },
        {
          id: 'm4-l4',
          type: 'vocabulary',
          titleDe: 'Fachbegriffe Instrumente & Sterilisation',
          titleFr: 'Vocabulaire instrumentation & stérilisation',
          instructionDe: 'Wiederhole die wichtigsten Fachausdrücke der zahnärztlichen Hygiene.',
          instructionFr: 'Révisez les termes fondamentaux de la stérilisation et désinfection.',
          vocab: [
            {
              de: 'Autoklav',
              fr: 'Autoclave',
              latin: 'Autoclavum',
              noteDe: 'Dampfsterilisator zur keimfreien Aufbereitung',
              noteFr: 'Stérilisateur à vapeur d\'eau sous pression saturée'
            },
            {
              de: 'Thermodesinfektor (RDG)',
              fr: 'Laveur-désinfecteur (LDE)',
              noteDe: 'Reinigungs- und Desinfektionsgerät für Medizinprodukte',
              noteFr: 'Appareil automatisé de lavage et désinfection thermique'
            },
            {
              de: 'Kritisch B',
              fr: 'Critique B',
              noteDe: 'Instrumente, die Haut/Schleimhaut durchdringen mit Hohlkörpern',
              noteFr: 'Dispositifs invasifs franchissant la muqueuse et présentant des lumières'
            }
          ]
        },
        {
          id: 'm4-l5',
          type: 'quiz',
          titleDe: 'Quiz: Aufbereitung & Hygieneanforderungen',
          titleFr: 'Quiz : Retraitement & exigences d\'hygiène',
          questionDe: 'Bei welcher Temperatur und Mindesthaltezeit erfolgt das Standard-Sterilisationsprogramm für chirurgische Instrumente im Klasse-B-Autoklaven?',
          questionFr: 'À quelle température et pour quelle durée minimale le programme standard d\'un autoclave de classe B est-il exécuté ?',
          options: [
            {
              textDe: '134 °C für mindestens 3 Minuten (bei 2,1 bar)',
              textFr: '134 °C pendant au moins 3 minutes (à 2,1 bars)',
              isCorrect: true,
              explanationDe: 'Richtig! Die Sattdampfsterilisation bei 134 °C tötet alle vegetativen Keime, Viren und widerstandsfähigen Sporen sicher ab.',
              explanationFr: 'Correct ! La vapeur saturée à 134 °C garantit la destruction des spores et agents pathogènes.'
            },
            {
              textDe: '100 °C für 20 Minuten',
              textFr: '100 °C pendant 20 minutes',
              isCorrect: false,
              explanationDe: 'Falsch. 100 °C entspricht kochendem Wasser und sterilisiert nicht (Sporen überleben).',
              explanationFr: 'Faux. 100 °C ne permet pas d\'éliminer les spores bactériennes thermo-résistantes.'
            },
            {
              textDe: '180 °C für 1 Minute im Heißluftofen',
              textFr: '180 °C pendant 1 minute en étuve sèche',
              isCorrect: false,
              explanationDe: 'Falsch. Heißluftsterilisation ist veraltet und erfordert 180 °C für mindestens 30 Minuten.',
              explanationFr: 'Faux. L\'air chaud sec nécessite des temps d\'exposition beaucoup plus longs.'
            }
          ]
        }
      ]
    }
  ]
};
