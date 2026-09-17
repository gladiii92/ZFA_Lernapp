import React from 'react';
import { notFound } from 'next/navigation';
import { courseData } from '@/data/courseData';
import { ModuleLessonClient } from '@/components/lesson/ModuleLessonClient';

export function generateStaticParams() {
  const idSet = new Set<string>();
  
  // Statische Fallback-Liste, um Next.js Link-Checks (z.B. '/module/m1') beim Export abzusichern
  const baseIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  baseIds.forEach(num => {
    idSet.add(`m${num}`);
    idSet.add(`modul-${num}`);
    idSet.add(`module-${num}`);
  });

  courseData.modules.forEach((mod) => {
    if (mod.id) {
      idSet.add(mod.id);
      if (mod.id.startsWith('modul-')) {
        idSet.add(mod.id.replace('modul-', 'm'));
        idSet.add(mod.id.replace('modul-', 'module-'));
      } else if (mod.id.startsWith('m')) {
        idSet.add(mod.id.replace(/^m/, 'modul-'));
        idSet.add(mod.id.replace(/^m/, 'module-'));
      }
    }
    if (typeof mod.order === 'number') {
      idSet.add(`m${mod.order}`);
      idSet.add(`modul-${mod.order}`);
      idSet.add(`module-${mod.order}`);
    }
  });
  
  return Array.from(idSet).map((id) => ({
    id,
  }));
}

export default function ModulePage({ params }: { params: { id: string } }) {
  const currentModule = courseData.modules.find(
    (mod) =>
      mod.id === params.id ||
      (typeof mod.order === 'number' && (`m${mod.order}` === params.id || `modul-${mod.order}` === params.id || `module-${mod.order}` === params.id)) ||
      (mod.id.startsWith('modul-') && mod.id.replace('modul-', 'm') === params.id) ||
      (mod.id.startsWith('m') && mod.id.replace(/^m/, 'modul-') === params.id)
  );

  if (!currentModule) {
    notFound();
  }

  return <ModuleLessonClient key={currentModule.id} moduleId={currentModule.id} />;
}
