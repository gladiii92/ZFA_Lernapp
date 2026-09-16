export type LessonType = 'theory' | 'vocabulary' | 'quiz' | 'matching';

export interface TheoryLesson {
  id: string;
  type: 'theory';
  titleDe?: string;
  titleFr?: string;
  contentDe: string;
  contentFr: string;
  subContentDe?: string;
  subContentFr?: string;
  imageKey?: 'tooth-anatomy' | 'tooth-substances' | 'tooth-types' | 'fdi-scheme' | 'hygiene-steps';
  keyPoints?: { de: string; fr: string }[];
}

export interface VocabItem {
  de: string;
  latin?: string;
  fr: string;
  noteDe?: string;
  noteFr?: string;
}

export interface VocabularyLesson {
  id: string;
  type: 'vocabulary';
  titleDe?: string;
  titleFr?: string;
  instructionDe?: string;
  instructionFr?: string;
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
  imageKey?: 'tooth-anatomy' | 'tooth-substances' | 'tooth-types' | 'fdi-scheme' | 'hygiene-steps';
  options: QuizOption[];
  tipDe?: string;
  tipFr?: string;
}

export interface MatchingPair {
  id: string;
  left: string; // z. B. Deutsch
  right: string; // z. B. Latein oder Französisch
  category?: string;
}

export interface MatchingLesson {
  id: string;
  type: 'matching';
  instructionDe: string;
  instructionFr: string;
  pairs: MatchingPair[];
}

export type Lesson = TheoryLesson | VocabularyLesson | QuizLesson | MatchingLesson;

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
  color: 'emerald' | 'blue' | 'purple' | 'amber' | 'teal';
  xpReward: number;
  lessons: Lesson[];
}

export interface CourseData {
  modules: CourseModule[];
}

export interface UserProgress {
  completedLessonIds: string[];
  completedModuleIds: string[];
  totalXp: number;
  streakDays: number;
  lastActiveDate?: string;
  soundEnabled: boolean;
}

