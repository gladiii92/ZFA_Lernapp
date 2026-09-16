'use client';

import React from 'react';
import { TheoryLesson } from '@/types/course';
import { VisualDiagramResolver } from '../visual/VisualDiagramResolver';
import { BookOpen, CheckCircle2 } from 'lucide-react';

interface TheoryCardProps {
  lesson: TheoryLesson;
}

export function TheoryCard({ lesson }: TheoryCardProps) {
  return (
    <div className="space-y-4 pb-20 animate-pop-in">
      {/* Title */}
      {(lesson.titleDe || lesson.titleFr) && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Theorie / Théorie</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            {lesson.titleDe}
          </h2>
          {lesson.titleFr && (
            <p className="text-sm font-semibold text-indigo-600 mt-0.5">
              {lesson.titleFr}
            </p>
          )}
        </div>
      )}

      {/* Visual Diagram if available */}
      {lesson.imageKey && (
        <div className="w-full">
          <VisualDiagramResolver imageKey={lesson.imageKey} />
        </div>
      )}

      {/* Main Bilingual Content Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* German Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>🇩🇪 Deutsch (Einfache Sprache)</span>
          </div>
          <p className="text-base font-bold text-slate-800 leading-relaxed">
            {lesson.contentDe}
          </p>
          {lesson.subContentDe && (
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {lesson.subContentDe}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* French Section */}
        <div className="space-y-1 bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100/70">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
            <span>🇫🇷 Français (Traduction)</span>
          </div>
          <p className="text-sm font-semibold text-indigo-950 leading-relaxed">
            {lesson.contentFr}
          </p>
          {lesson.subContentFr && (
            <p className="text-xs text-indigo-800 leading-relaxed pt-1">
              {lesson.subContentFr}
            </p>
          )}
        </div>

        {/* Key Points Checklist */}
        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Wichtigste Punkte / Points Clés
            </h4>
            <div className="space-y-2">
              {lesson.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">
                      {point.de}
                    </span>
                    <span className="text-indigo-700 italic font-medium block">
                      {point.fr}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

