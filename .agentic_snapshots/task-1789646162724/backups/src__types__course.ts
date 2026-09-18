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

export type LessonType = 'theory' | 'vocabulary' | 'quiz' | 'matching' | 'interactive-graphic' | 'interactive_graphic';

export interface GraphicHotspot {
  id: string;
  x: number;
  y: number;
  radius?: number;
  titleDe: string;
  titleFr: string;
  descriptionDe: string;
  descriptionFr: string;
  latin?: string;
  category?: string;
  svgPath?: string;
}

export interface FdiTooth {
  number: number;
  quadrant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
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
  type: 'interactive-graphic' | 'interactive_graphic';
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
  badge: string;
  color: string;
  xpReward: number;
  lessons: Lesson[];
}

export interface CourseData {
  modules: CourseModule[];
}
