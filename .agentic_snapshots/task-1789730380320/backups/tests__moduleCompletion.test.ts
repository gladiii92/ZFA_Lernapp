import { describe, it, expect } from 'vitest';
import { courseData } from '../src/data/courseData';
import { generateStaticParams } from '../src/app/module/[id]/page';

describe('Course Data & Module Completion Logic', () => {
  it('should have valid and unique module IDs', () => {
    expect(courseData.modules.length).toBeGreaterThan(0);
    const moduleIds = courseData.modules.map(m => m.id);
    const uniqueIds = new Set(moduleIds);
    expect(uniqueIds.size).toBe(moduleIds.length);
  });

  it('should have all targetHotspotIds matching an existing hotspot in locate mode', () => {
    courseData.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        if (lesson.type === 'interactive_graphic' && lesson.mode === 'locate') {
          expect(lesson.targetHotspotId, `Module ${mod.id}, Lesson ${lesson.id} is missing targetHotspotId`).toBeDefined();
          expect(lesson.hotspots, `Module ${mod.id}, Lesson ${lesson.id} has no hotspots`).toBeDefined();
          
          const matchingHotspot = lesson.hotspots?.find(h => h.id === lesson.targetHotspotId);
          expect(
            matchingHotspot,
            `Module ${mod.id}, Lesson ${lesson.id}: targetHotspotId '${lesson.targetHotspotId}' does not exist in hotspots list`
          ).toBeDefined();
        }
      });
    });
  });

  it('should validate Module 2 Step 3 (m2-l3) target hotspot resolution', () => {
    const mod2 = courseData.modules.find(m => m.id === 'modul-2' || m.order === 2);
    expect(mod2).toBeDefined();
    expect(mod2!.lessons.length).toBeGreaterThanOrEqual(3);
    
    const step3 = mod2!.lessons[2];
    expect(step3.id).toBe('m2-l3');
    if (step3.type === 'interactive_graphic' && step3.mode === 'locate') {
      const target = step3.hotspots?.find(h => h.id === step3.targetHotspotId);
      expect(target).toBeDefined();
    }
  });

  it('should validate Module 4 Step 3 (m4-l3) target hotspot resolution and content', () => {
    const mod4 = courseData.modules.find(m => m.id === 'modul-4' || m.order === 4);
    expect(mod4).toBeDefined();
    expect(mod4!.lessons.length).toBeGreaterThanOrEqual(3);
    
    const step3 = mod4!.lessons[2];
    expect(step3.id).toBe('m4-l3');
    if (step3.type === 'interactive_graphic' && step3.mode === 'locate') {
      const target = step3.hotspots?.find(h => h.id === step3.targetHotspotId);
      expect(target).toBeDefined();
    }
  });

  it('should ensure hotspot coordinates are within valid normalized bounds [0, 100]', () => {
    courseData.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        if (lesson.hotspots) {
          lesson.hotspots.forEach(hs => {
            expect(hs.x).toBeGreaterThanOrEqual(0);
            expect(hs.x).toBeLessThanOrEqual(100);
            expect(hs.y).toBeGreaterThanOrEqual(0);
            expect(hs.y).toBeLessThanOrEqual(100);
          });
        }
      });
    });
  });

  it('should generate complete and canonical static params for routing', () => {
    const params = generateStaticParams();
    expect(params.length).toBeGreaterThan(0);
    
    const ids = params.map(p => p.id);
    expect(ids).toContain('modul-2');
    expect(ids).toContain('m2');
    expect(ids).toContain('modul-4');
    expect(ids).toContain('m4');
  });
});
