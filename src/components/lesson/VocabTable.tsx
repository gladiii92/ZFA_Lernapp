'use client';

import React, { useState } from 'react';
import { VocabularyLesson, VocabItem } from '@/types/course';
import { Languages, Layers, Eye, EyeOff } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface VocabTableProps {
  lesson: VocabularyLesson;
}

export function VocabTable({ lesson }: VocabTableProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [hiddenTranslations, setHiddenTranslations] = useState<Record<number, boolean>>({});

  const toggleHide = (idx: number) => {
    sounds.playClick();
    setHiddenTranslations((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="space-y-4 pb-20 animate-pop-in">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Languages className="w-4 h-4" />
            <span>Vokabeltraining / Vocabulaire</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            {lesson.titleDe || 'Wichtige Fachbegriffe'}
          </h2>
          {lesson.titleFr && (
            <p className="text-sm font-semibold text-indigo-600 mt-0.5">
              {lesson.titleFr}
            </p>
          )}
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400'
            }`}
            title="Tabelle / Tableau"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {lesson.instructionDe && (
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs">
          <p className="font-bold text-amber-900">💡 {lesson.instructionDe}</p>
          {lesson.instructionFr && (
            <p className="italic text-amber-800/90 mt-0.5">🇫🇷 {lesson.instructionFr}</p>
          )}
        </div>
      )}

      {/* Table View */}
      <div className="space-y-2.5">
        {lesson.vocab.map((item, idx) => {
          const isHidden = hiddenTranslations[idx];
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all"
            >
              {/* Top Row: German & Latin */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {item.de}
                  </h3>
                  {item.latin && (
                    <span className="inline-block mt-0.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      {item.latin}
                    </span>
                  )}
                </div>

                {/* Hide / Reveal Button */}
                <button
                  onClick={() => toggleHide(idx)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
                  title="Übersetzung verdecken / anzeigen"
                >
                  {isHidden ? <EyeOff className="w-4 h-4 text-amber-600" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* French Translation Box */}
              <div className="mt-2.5 pt-2 border-t border-slate-100">
                {isHidden ? (
                  <button
                    onClick={() => toggleHide(idx)}
                    className="w-full text-center py-2 bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-dashed border-slate-200"
                  >
                    Antwort aufdecken / Révéler la réponse
                  </button>
                ) : (
                  <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100/80">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">
                      Französisch / Français
                    </span>
                    <p className="text-sm font-bold text-indigo-950">
                      {item.fr}
                    </p>
                  </div>
                )}
              </div>

              {/* Practical Notes */}
              {(item.noteDe || item.noteFr) && !isHidden && (
                <div className="mt-2 text-[11px] text-slate-500 space-y-0.5 px-1">
                  {item.noteDe && <p className="text-slate-600">📌 {item.noteDe}</p>}
                  {item.noteFr && <p className="italic text-indigo-900/70">🇫🇷 {item.noteFr}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
