'use client';

import React, { useState } from 'react';
import { VocabularyLesson } from '@/types/course';
import { Languages, Eye, EyeOff, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface VocabTableProps {
  lesson: VocabularyLesson;
}

export function VocabTable({ lesson }: VocabTableProps) {
  const [hiddenTranslations, setHiddenTranslations] = useState<Record<number, boolean>>({});

  const toggleHide = (idx: number) => {
    sounds.playClick();
    setHiddenTranslations((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleAll = () => {
    sounds.playClick();
    const anyHidden = Object.values(hiddenTranslations).some(Boolean);
    if (anyHidden) {
      setHiddenTranslations({});
    } else {
      const all: Record<number, boolean> = {};
      lesson.vocab.forEach((_, idx) => {
        all[idx] = true;
      });
      setHiddenTranslations(all);
    }
  };

  return (
    <div className="space-y-4 pb-4 animate-fade-in select-none">
      {/* Header */}
      <div className="bg-slate-900/95 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Languages className="w-4 h-4" />
            <span>Fachwortschatz • Vocabulaire</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 leading-tight">
            {lesson.titleDe || 'Wichtige Fachbegriffe'}
          </h2>
          {lesson.titleFr && (
            <p className="text-xs sm:text-sm font-semibold text-sky-400 mt-0.5">
              {lesson.titleFr}
            </p>
          )}
        </div>

        {/* Abfragemodus / Verdeckungs-Schalter */}
        <button
          type="button"
          onClick={toggleAll}
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white active:scale-95 transition-all flex items-center justify-center shrink-0"
          title="Alle Übersetzungen verdecken / abfragen"
          aria-label="Selbsttest-Modus umschalten"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* Didaktischer Hinweis */}
      {lesson.instructionDe && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-300">
          <p className="font-bold text-slate-200">💡 {lesson.instructionDe}</p>
          {lesson.instructionFr && (
            <p className="italic text-sky-400/90 mt-0.5 text-[11px]">🇫🇷 {lesson.instructionFr}</p>
          )}
        </div>
      )}

      {/* Vokabelkarten-Liste */}
      <div className="space-y-2.5">
        {lesson.vocab.map((item, idx) => {
          const isHidden = hiddenTranslations[idx];

          return (
            <div
              key={idx}
              className="bg-slate-900/95 rounded-2xl p-4 border border-slate-800/90 shadow-md space-y-2.5 hover:border-slate-700 transition-all"
            >
              {/* Oberste Zeile: Deutsch & Latein */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-100 leading-snug">
                    {item.de}
                  </h3>
                  {item.latin && (
                    <span className="inline-block text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/25">
                      {item.latin}
                    </span>
                  )}
                </div>

                {/* Auge-Icon (Min. 44x44px Touch-Target) */}
                <button
                  type="button"
                  onClick={() => toggleHide(idx)}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-all shrink-0 active:scale-90"
                  title="Übersetzung verdecken / anzeigen"
                  aria-label="Französische Übersetzung ein-/ausblenden"
                >
                  {isHidden ? (
                    <EyeOff className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-sky-400" />
                  )}
                </button>
              </div>

              {/* Französischer Übersetzungsbereich */}
              <div className="pt-2 border-t border-slate-800">
                {isHidden ? (
                  <button
                    type="button"
                    onClick={() => toggleHide(idx)}
                    className="w-full text-center py-2.5 min-h-[44px] bg-slate-950/80 text-slate-400 hover:text-sky-300 rounded-xl text-xs font-bold transition-all border border-dashed border-slate-700/80 active:scale-[0.99]"
                  >
                    Antwort aufdecken / Révéler la réponse
                  </button>
                ) : (
                  <div className="bg-sky-500/10 p-3 rounded-xl border border-sky-500/20">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                      Französisch • Français
                    </span>
                    <p className="text-sm font-extrabold text-sky-100">
                      {item.fr}
                    </p>
                  </div>
                )}
              </div>

              {/* Praxishinweise */}
              {(item.noteDe || item.noteFr) && !isHidden && (
                <div className="text-[11px] text-slate-400 space-y-0.5 pt-1 px-0.5 border-t border-slate-800/60">
                  {item.noteDe && <p className="text-slate-300">📌 {item.noteDe}</p>}
                  {item.noteFr && <p className="italic text-sky-400/80">🇫🇷 {item.noteFr}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
