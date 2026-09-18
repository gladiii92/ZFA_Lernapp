import { describe, it, expect } from 'vitest';
import { courseData } from '../src/data/courseData';
import { Language, LessonType, GraphicKey } from '../src/types/course';

describe('ZFA Lernapp Data & Architecture Tests', () => {
  it('should validate language and lesson types', () => {
    const langDe: Language = 'de';
    const langFr: Language = 'fr';
    expect(langDe).toBe('de');
    expect(langFr).toBe('fr');

    const types: LessonType[] = [
      'theory',
      'vocabulary',
      'quiz',
      'matching',
      'interactive_graphic',
      'interactive-graphic',
    ];
    expect(types).toHaveLength(6);
  });

  it('should have all 4 core curriculum modules', () => {
    expect(courseData.modules.length).toBeGreaterThanOrEqual(4);

    const moduleIds = courseData.modules.map((m) => m.id);
    expect(moduleIds).toContain('modul-1');
    expect(moduleIds).toContain('modul-2');
    expect(moduleIds).toContain('modul-3');
    expect(moduleIds).toContain('modul-4');
  });

  it('should verify bilingual data across all modules and lessons', () => {
    courseData.modules.forEach((mod) => {
      expect(mod.titleDe).toBeTruthy();
      expect(mod.titleFr).toBeTruthy();
      expect(mod.subtitleDe).toBeTruthy();
      expect(mod.subtitleFr).toBeTruthy();
      expect(mod.lessons.length).toBeGreaterThan(0);

      mod.lessons.forEach((lesson) => {
        expect(lesson.id).toBeTruthy();
        expect(lesson.type).toBeTruthy();

        // Theory lessons
        if (lesson.type === 'theory') {
          expect(lesson.contentDe).toBeTruthy();
          expect(lesson.contentFr).toBeTruthy();
        }

        // Vocabulary lessons
        if (lesson.type === 'vocabulary') {
          expect(lesson.vocab.length).toBeGreaterThan(0);
          lesson.vocab.forEach((v) => {
            expect(v.de).toBeTruthy();
            expect(v.fr).toBeTruthy();
          });
        }

        // Quiz lessons
        if (lesson.type === 'quiz') {
          expect(lesson.questionDe).toBeTruthy();
          expect(lesson.questionFr).toBeTruthy();
          expect(lesson.options.length).toBeGreaterThanOrEqual(2);
          const hasCorrect = lesson.options.some((opt) => opt.isCorrect);
          expect(hasCorrect).toBe(true);
        }

        // Matching lessons
        if (lesson.type === 'matching') {
          expect(lesson.pairs.length).toBeGreaterThanOrEqual(2);
          lesson.pairs.forEach((p) => {
            const hasLeft = Boolean(p.leftDe || p.left);
            const hasRight = Boolean(p.rightDe || p.right);
            expect(hasLeft).toBe(true);
            expect(hasRight).toBe(true);
          });
        }

        // Interactive graphic lessons
        if (lesson.type === 'interactive_graphic' || lesson.type === 'interactive-graphic') {
          expect(lesson.graphicKey).toBeTruthy();
          const validKeys: GraphicKey[] = [
            'tooth-anatomy',
            'tooth-substances',
            'tooth-types',
            'fdi-scheme',
            'hygiene-steps',
            'periodontium',
            'caries-stages',
            'instruments',
            'quadrants',
          ];
          expect(validKeys).toContain(lesson.graphicKey);
        }
      });
    });
  });

  it('should verify XP rewards and badges', () => {
    courseData.modules.forEach((m) => {
      expect(m.xpReward).toBeGreaterThan(0);
      expect(m.badge).toBeTruthy();
    });
  });
});