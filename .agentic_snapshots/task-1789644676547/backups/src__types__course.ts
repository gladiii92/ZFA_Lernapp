export type Language = 'de' | 'fr';

export type GraphicKey = 
  | 'tooth-anatomy' 
  | 'tooth-substances' 
  | 'tooth-types' 
  | 'fdi-scheme' 
  | 'hygiene-steps' 
  | 'periodontium'
  | 'caries-stages'
  | 'instruments'
  | 'quadrants';

export type LessonType = 'theory' | 'vocabulary' | 'quiz' | 'matching' | 'interactive-graphic';

export interface GraphicHotspot {
  id: string;
  x: number; // Prozentwert horizontal (0-100)
  y: number; // Prozentwert vertikal (0-100)
  radius?: number; // Prozentwert für Fangradius
  titleDe: string;
  titleFr: string;
  descriptionDe: string;
  descriptionFr: string;
  latin?: string;
  category?: string;
  svgPath?: string; // Optionaler Pfad für Vektor-Highlighting
}

export interface FdiTooth {
  number: number; // z. B. 11, 21, 36, 48
  quadrant: 1 | 2 | 3 | 4;
  position: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  nameDe: string;
  nameFr: string;
  latin: string;
  type: 'incisor' | 'canine' | 'premolar' | 'molar';
  typeDe: string;
  typeFr: string;
  rootsCount?: number;
  eruptionAge?: string;
  descriptionDe?: string;
  descriptionFr?: string;
}

export interface InteractiveGraphicLesson {
  id: string;
  type: 'interactive-graphic';
  titleDe?: string;
  titleFr?: string;
  instructionDe?: string;
  instructionFr?: string;
  graphicKey: GraphicKey;
  mode?: 'explore' | 'locate' | 'identify';
  hotspots: GraphicHotspot[];
  fdiTeeth?: FdiTooth[];
  tipDe?: string;
  tipFr?: string;
}

export interface TheoryLesson {
  id: string;
  type: 'theory';
  titleDe?: string;
  titleFr?: string;
  contentDe: string;
  contentFr: string;
  subContentDe?: string;
  subContentFr?: string;
  imageKey?: GraphicKey;
  hotspots?: GraphicHotspot[];
  keyPoints?: { de: string; fr: string }[];
}

export interface VocabItem {
  de: string;
  latin?: string;
  fr: string;
  noteDe?: string;
  noteFr?: string;
  category?: string;
  audioKey?: string;
}

export interface VocabularyLesson {
  id: string;
  type: 'vocabulary';
  titleDe?: string;
  titleFr?: string;
  instructionDe?: string;
  instructionFr?: string;
  imageKey?: GraphicKey;
  vocab: VocabItem[];
}

export interface QuizOption {
  textDe: string;
  textFr: string;
  isCorrect: boolean;
  explanationDe?: string;
  explanationFr?: string;
}

export interface QuizLesson {
  id: string;
  type: 'quiz';
  questionDe: string;
  questionFr: string;
  imageKey?: GraphicKey;
  hotspots?: GraphicHotspot[];
  targetHotspotId?: string;
  options: QuizOption[];
  tipDe?: string;
  tipFr?: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  category?: string;
  latin?: string;
  hintDe?: string;
  hintFr?: string;
}

export interface MatchingLesson {
  id: string;
  type: 'matching';
  instructionDe: string;
  instructionFr: string;
  imageKey?: GraphicKey;
  pairs: MatchingPair[];
}

export type Lesson = 
  | TheoryLesson 
  | VocabularyLesson 
  | QuizLesson 
  | MatchingLesson 
  | InteractiveGraphicLesson;

export interface CourseModule {
  id: string;
  order: number;
  titleDe: string;
  titleFr: string;
  subtitleDe: string;
  subtitleFr: string;
  descriptionDe: string;
  descriptionFr: string;
  icon?: string;
  color?: string;
  badge?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  titleDe: string;
  titleFr: string;
  descriptionDe: string;
  descriptionFr: string;
  modules: CourseModule[];
}

export interface GlossaryTerm {
  id: string;
  termDe: string;
  termFr: string;
  definitionDe: string;
  definitionFr: string;
  category?: string;
  latin?: string;
  imageKey?: GraphicKey;
}

export interface UserProgress {
  completedLessons: string[];
  currentLanguage: Language;
  quizScores?: Record<string, number>;
  lastModuleId?: string;
  lastLessonId?: string;
}

/**
 * Prüft deterministisch und mathematisch exakt, ob ein gegebener Klickpunkt (x, y in %)
 * innerhalb des Fangradius eines Hotspots liegt.
 */
export function isHotspotHit(
  hotspot: GraphicHotspot,
  x: number,
  y: number,
  customRadius?: number
): boolean {
  if (
    !hotspot ||
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    Number.isNaN(x) ||
    Number.isNaN(y) ||
    !Number.isFinite(x) ||
    !Number.isFinite(y)
  ) {
    return false;
  }

  const effectiveRadius = customRadius !== undefined ? customRadius : (hotspot.radius ?? 5);
  if (typeof effectiveRadius !== 'number' || Number.isNaN(effectiveRadius) || effectiveRadius <= 0) {
    return false;
  }

  const dx = x - hotspot.x;
  const dy = y - hotspot.y;
  const distanceSquared = dx * dx + dy * dy;
  return distanceSquared <= effectiveRadius * effectiveRadius;
}

/**
 * Findet den nächstgelegenen Hotspot zu Koordinaten (x, y). O(n), deterministisch.
 */
export function findNearestHotspot(
  hotspots: GraphicHotspot[],
  x: number,
  y: number,
  maxRadius?: number
): { hotspot: GraphicHotspot; distance: number } | null {
  if (!Array.isArray(hotspots) || hotspots.length === 0) {
    return null;
  }
  if (
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    Number.isNaN(x) ||
    Number.isNaN(y) ||
    !Number.isFinite(x) ||
    !Number.isFinite(y)
  ) {
    return null;
  }

  let closest: { hotspot: GraphicHotspot; distance: number } | null = null;

  for (let i = 0; i < hotspots.length; i++) {
    const h = hotspots[i];
    if (!h || typeof h.x !== 'number' || typeof h.y !== 'number') continue;
    const dx = x - h.x;
    const dy = y - h.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (maxRadius !== undefined && dist > maxRadius) {
      continue;
    }

    if (closest === null || dist < closest.distance) {
      closest = { hotspot: h, distance: dist };
    }
  }

  return closest;
}

/**
 * Parst und validiert eine FDI-Zahnnummer (z. B. 11-18, 21-28, 31-38, 41-48).
 */
export function parseFdiTooth(toothNumber: number): {
  quadrant: 1 | 2 | 3 | 4;
  position: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  type: 'incisor' | 'canine' | 'premolar' | 'molar';
} | null {
  if (
    typeof toothNumber !== 'number' ||
    Number.isNaN(toothNumber) ||
    !Number.isInteger(toothNumber)
  ) {
    return null;
  }

  const quadrant = Math.floor(toothNumber / 10);
  const position = toothNumber % 10;

  if (quadrant < 1 || quadrant > 4 || position < 1 || position > 8) {
    return null;
  }

  let type: 'incisor' | 'canine' | 'premolar' | 'molar';
  if (position <= 2) {
    type = 'incisor';
  } else if (position === 3) {
    type = 'canine';
  } else if (position <= 5) {
    type = 'premolar';
  } else {
    type = 'molar';
  }

  return {
    quadrant: quadrant as 1 | 2 | 3 | 4,
    position: position as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    type,
  };
}

/**
 * Berechnet den Lernfortschritt in Prozent (0-100) mit striktem Schutz vor Division durch 0.
 */
export function calculateProgress(completedCount: number, totalCount: number): number {
  if (
    typeof completedCount !== 'number' ||
    typeof totalCount !== 'number' ||
    Number.isNaN(completedCount) ||
    Number.isNaN(totalCount) ||
    !Number.isFinite(completedCount) ||
    !Number.isFinite(totalCount) ||
    totalCount <= 0 ||
    completedCount <= 0
  ) {
    return 0;
  }

  if (completedCount >= totalCount) {
    return 100;
  }

  return Math.min(100, Math.max(0, Math.round((completedCount / totalCount) * 100)));
}

export function isInteractiveGraphicLesson(lesson: Lesson): lesson is InteractiveGraphicLesson {
  return lesson?.type === 'interactive-graphic';
}

export function isTheoryLesson(lesson: Lesson): lesson is TheoryLesson {
  return lesson?.type === 'theory';
}

export function isVocabularyLesson(lesson: Lesson): lesson is VocabularyLesson {
  return lesson?.type === 'vocabulary';
}

export function isQuizLesson(lesson: Lesson): lesson is QuizLesson {
  return lesson?.type === 'quiz';
}

export function isMatchingLesson(lesson: Lesson): lesson is MatchingLesson {
  return lesson?.type === 'matching';
}

export function getLocalizedField<T extends Record<string, any>>(
  item: T,
  fieldName: string,
  lang: Language
): string {
  if (!item) return '';
  const suffix = lang === 'fr' ? 'Fr' : 'De';
  const fallbackSuffix = lang === 'fr' ? 'De' : 'Fr';
  const primaryKey = `${fieldName}${suffix}`;
  const fallbackKey = `${fieldName}${fallbackSuffix}`;
  return item[primaryKey] || item[fallbackKey] || '';
}
