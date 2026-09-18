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

export type LessonType = 
  | 'theory' 
  | 'vocabulary' 
  | 'quiz' 
  | 'matching' 
  | 'interactive-graphic' 
  | 'interactive_graphic';

export type GraphicInteractionMode = 'explore' | 'locate' | 'identify' | 'label' | 'sequence';

export type ToothType = 'incisor' | 'canine' | 'premolar' | 'molar';

export type FdiQuadrant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type CariesStageLevel = 'initial' | 'enamel' | 'dentin' | 'profunda';

export type InstrumentCategory = 'diagnostic' | 'conservative' | 'surgical' | 'hygiene' | 'periodontal';

export type PeriodontiumTissue = 'gingiva' | 'cementum' | 'desmodont' | 'alveolar_bone';

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
  color?: string;
  highlightColor?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  detailsDe?: string[];
  detailsFr?: string[];
}

export interface FdiTooth {
  number: number;
  quadrant: FdiQuadrant;
  position: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  nameDe: string;
  nameFr: string;
  latin: string;
  type: ToothType;
  typeDe: string;
  typeFr: string;
  rootsCount?: number;
  eruptionAge?: string;
  descriptionDe?: string;
  descriptionFr?: string;
  fdiNotation?: string;
  isMilkTooth?: boolean;
}

export interface GraphicSequenceStep {
  stepNumber: number;
  hotspotId?: string;
  titleDe: string;
  titleFr: string;
  descriptionDe: string;
  descriptionFr: string;
}

export interface GraphicLabelTarget {
  hotspotId: string;
  labelDe: string;
  labelFr: string;
  correctPosition?: { x: number; y: number };
}

export interface GraphicIdentifyQuestion {
  targetHotspotId: string;
  questionDe: string;
  questionFr: string;
  optionsDe: string[];
  optionsFr: string[];
  correctAnswerDe: string;
  correctAnswerFr: string;
  explanationDe?: string;
  explanationFr?: string;
}

export interface CariesStageInfo {
  level: CariesStageLevel;
  nameDe: string;
  nameFr: string;
  depthDe: string;
  depthFr: string;
  symptomsDe: string;
  symptomsFr: string;
  therapyDe: string;
  therapyFr: string;
  reversible: boolean;
}

export interface DentalInstrumentItem {
  id: string;
  nameDe: string;
  nameFr: string;
  latin?: string;
  category: InstrumentCategory;
  usageDe: string;
  usageFr: string;
}

export interface PeriodontiumStructureInfo {
  tissue: PeriodontiumTissue;
  nameDe: string;
  nameFr: string;
  latin: string;
  functionDe: string;
  functionFr: string;
}

export interface GraphicLayer {
  id: string;
  nameDe: string;
  nameFr: string;
  visible?: boolean;
  opacity?: number;
  zIndex?: number;
}

export interface InteractiveGraphicLesson {
  id: string;
  type: 'interactive-graphic' | 'interactive_graphic';
  titleDe?: string;
  titleFr?: string;
  instructionDe?: string;
  instructionFr?: string;
  graphicKey: GraphicKey;
  mode?: GraphicInteractionMode;
  targetHotspotId?: string;
  hotspots: GraphicHotspot[];
  fdiTeeth?: FdiTooth[];
  sequenceSteps?: GraphicSequenceStep[];
  labels?: GraphicLabelTarget[];
  identifyQuestions?: GraphicIdentifyQuestion[];
  cariesStages?: CariesStageInfo[];
  instruments?: DentalInstrumentItem[];
  periodontiumStructures?: PeriodontiumStructureInfo[];
  layers?: GraphicLayer[];
  tipDe?: string;
  tipFr?: string;
  feedbackSuccessDe?: string;
  feedbackSuccessFr?: string;
  feedbackErrorDe?: string;
  feedbackErrorFr?: string;
}

export interface KeyPoint {
  de: string;
  fr: string;
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
  keyPoints?: KeyPoint[];
  tipDe?: string;
  tipFr?: string;
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
  tipDe?: string;
  tipFr?: string;
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
  titleDe?: string;
  titleFr?: string;
  questionDe: string;
  questionFr: string;
  imageKey?: GraphicKey;
  hotspots?: GraphicHotspot[];
  targetHotspotId?: string;
  options: QuizOption[];
  tipDe?: string;
  tipFr?: string;
}

export type LanguageMode = 'bilingual' | 'de' | 'fr';

export interface MatchingPair {
  id: string;
  left?: string;
  right?: string;
  leftDe?: string;
  leftFr?: string;
  rightDe?: string;
  rightFr?: string;
  category?: string;
  latin?: string;
  hintDe?: string;
  hintFr?: string;
}

export interface MatchingLesson {
  id: string;
  type: 'matching';
  titleDe?: string;
  titleFr?: string;
  instructionDe: string;
  instructionFr: string;
  imageKey?: GraphicKey;
  pairs: MatchingPair[];
  tipDe?: string;
  tipFr?: string;
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

export interface UserProgress {
  completedModuleIds: string[];
  soundEnabled: boolean;
  completedLessonIds: string[];
  moduleScores: Record<string, number>;
  totalXp: number;
  streakDays: number;
  lastActiveDate?: string;
  currentLanguage: Language;
  languageMode?: LanguageMode;
}

