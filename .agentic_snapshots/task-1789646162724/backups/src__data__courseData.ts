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
      descriptionFr: `Apprenez l'anatomie de la dent, ses couches tissulaires et l'appareil de soutien parodontal.`,
      badge: '🦷',
      color: 'emerald',
      xpReward: 120,
      lessons: [
        {
          id: 'm1-l1',
          type: 'theory',
          titleDe: 'Die drei Hauptabschnitte & Zahnhartsubstanzen',
          titleFr: 'Les trois parties principales & tissus dentaires',
          contentDe: 'Ein menschlicher Zahn gliedert sich in drei Hauptzonen: Krone, Hals und Wurzel.',
          contentFr: 'Une dent humaine comprend trois zones principales : couronne, collet et racine.',
          imageKey: 'tooth-anatomy',
          hotspots: [
            {
              id: 'hs-enamel',
              x: 50,
              y: 18,
              titleDe: 'Zahnschmelz',
              titleFr: 'Émail dentaire',
              latin: 'Enamelum',
              descriptionDe: 'Härteste Substanz des Körpers (ca. 96 % anorganisch).',
              descriptionFr: `Substance la plus dure de l'organisme (env. 96 % inorganique).`
            }
          ],
          keyPoints: [
            { de: 'Zahnkrone (Corona dentis): Im Mund sichtbar', fr: 'Couronne (Corona dentis) : partie visible' },
            { de: 'Zahnwurzel (Radix dentis): Verankerung', fr: 'Racine (Radix dentis) : ancrage osseux' }
          ]
        },
        {
          id: 'm1-l2',
          type: 'interactive_graphic',
          titleDe: 'Interaktive Anatomie: Zahnschmelz',
          titleFr: 'Anatomie interactive : Émail',
          instructionDe: 'Finde und markiere den Zahnschmelz.',
          instructionFr: `Trouvez et marquez l'émail dentaire.`,
          graphicKey: 'tooth-anatomy',
          mode: 'locate',
          hotspots: [
            {
              id: 'hs-enamel',
              x: 50,
              y: 18,
              radius: 15,
              titleDe: 'Zahnschmelz',
              titleFr: 'Émail dentaire',
              descriptionDe: 'Schutzschicht der Zahnkrone.',
              descriptionFr: 'Couche protectrice de la couronne.'
            }
          ]
        },
        {
          id: 'm1-l3',
          type: 'quiz',
          questionDe: 'Welche Zahnhartsubstanz ist die härteste im menschlichen Körper?',
          questionFr: 'Quel tissu dentaire est le plus dur du corps humain ?',
          options: [
            {
              textDe: 'Zahnschmelz',
              textFr: 'Émail dentaire',
              isCorrect: true,
              explanationDe: 'Korrekt! Zahnschmelz besteht zu 96% aus Hydroxylapatit.',
              explanationFr: `Correct ! L'émail est composé à 96 % d'hydroxyapatite.`
            },
            {
              textDe: 'Zahnbein (Dentin)',
              textFr: 'Dentine',
              isCorrect: false,
              explanationDe: 'Falsch. Dentin ist weicher als Schmelz.',
              explanationFr: `Faux. La dentine est plus molle que l'émail.`
            }
          ]
        }
      ]
    }
  ]
};
