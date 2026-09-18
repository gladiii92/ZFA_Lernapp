'use client';

import React from 'react';
import { TheoryLesson } from '@/types/course';
import { VisualDiagramResolver } from '../visual/VisualDiagramResolver';
import { BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';

interface TheoryCardProps {
  lesson: TheoryLesson;
}

export function TheoryCard({ lesson }: TheoryCardProps) {
  return (
    <div className="space-y-4 pb-4 animate-fade-in select-none">
      {/* Titel-Kopfzeile */}
      {(lesson.titleDe || lesson.titleFr) && (
        <div className="bg-slate-900/95 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Theorie • Théorie</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 leading-snug">
            {lesson.titleDe}
          </h2>
          {lesson.titleFr && (
            <p className="text-xs sm:text-sm font-semibold text-sky-400 mt-1">
              {lesson.titleFr}
            </p>
          )}
        </div>
      )}

      {/* Visuelles Diagramm (falls vorhanden) */}
      {lesson.imageKey && (
        <div className="w-full">
          <VisualDiagramResolver imageKey={lesson.imageKey} />
        </div>
      )}

      {/* Haupt-Inhaltskarte zweisprachig */}
      <div className="bg-slate-900/95 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-4">
        {/* Deutscher Text (Groß, leserlich, A2/B1) */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            <span>🇩🇪 Einfache Sprache</span>
          </div>
          <p className="text-base font-bold text-slate-100 leading-relaxed selectable-text">
            {lesson.contentDe}
          </p>
          {lesson.subContentDe && (
            <p className="text-xs text-slate-300 leading-relaxed pt-1 selectable-text">
              {lesson.subContentDe}
            </p>
          )}
        </div>

        {/* Französischer Text (Abgesetzt in Sky/Indigo) */}
        <div className="space-y-1.5 bg-gradient-to-r from-sky-950/40 via-slate-800/80 to-slate-800/80 p-3.5 sm:p-4 rounded-2xl border border-sky-500/25">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-sky-400 uppercase tracking-wider">
            <span>🇫🇷 Traduction en français</span>
          </div>
          <p className="text-sm font-semibold text-sky-100 leading-relaxed selectable-text">
            {lesson.contentFr}
          </p>
          {lesson.subContentFr && (
            <p className="text-xs text-sky-300/80 italic leading-relaxed pt-1 selectable-text">
              {lesson.subContentFr}
            </p>
          )}
        </div>

        {/* Wichtigste Punkte / Checkliste */}
        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
              Wichtigste Punkte • Points Clés
            </h4>
            <div className="space-y-2">
              {lesson.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-200 block">
                      {point.de}
                    </span>
                    <span className="text-sky-300/90 italic font-medium block text-[11px]">
                      FR: {point.fr}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Didaktischer Praxistipp */}
        {(lesson.tipDe || lesson.tipFr) && (
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-200/90">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              {lesson.tipDe && (
                <p className="font-semibold text-amber-200">
                  <strong>Tipp:</strong> {lesson.tipDe}
                </p>
              )}
              {lesson.tipFr && (
                <p className="italic text-amber-300/80 text-[11px]">
                  FR : {lesson.tipFr}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
