'use client';

import React, { useState, useEffect } from 'react';
import { MatchingLesson, MatchingPair } from '@/types/course';
import { Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface MatchingCardProps {
  lesson: MatchingLesson;
  onComplete: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export function MatchingCard({ lesson, onComplete, isAnswered }: MatchingCardProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errorPair, setErrorPair] = useState<{ left: string; right: string } | null>(null);

  // Gemischte rechte Liste für die Zuordnung
  const [shuffledRights, setShuffledRights] = useState<MatchingPair[]>([]);

  useEffect(() => {
    const shuffled = [...lesson.pairs].sort(() => Math.random() - 0.5);
    setShuffledRights(shuffled);
  }, [lesson.pairs]);

  const handleSelectLeft = (pairId: string) => {
    if (matchedIds.includes(pairId) || isAnswered) return;
    sounds.playClick();
    setSelectedLeft(pairId);
    setErrorPair(null);

    if (selectedRight) {
      checkMatch(pairId, selectedRight);
    }
  };

  const handleSelectRight = (pairId: string) => {
    if (matchedIds.includes(pairId) || isAnswered) return;
    sounds.playClick();
    setSelectedRight(pairId);
    setErrorPair(null);

    if (selectedLeft) {
      checkMatch(selectedLeft, pairId);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      sounds.playCorrect();
      const updated = [...matchedIds, leftId];
      setMatchedIds(updated);
      setSelectedLeft(null);
      setSelectedRight(null);

      if (updated.length === lesson.pairs.length) {
        onComplete(true);
      }
    } else {
      sounds.playIncorrect();
      setErrorPair({ left: leftId, right: rightId });
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setErrorPair(null);
      }, 500);
    }
  };

  return (
    <div className="space-y-4 pb-4 animate-fade-in select-none">
      {/* Header */}
      <div className="bg-slate-900/95 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Zuordnungsübung • Association</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-slate-100 leading-snug">
          {lesson.instructionDe}
        </h2>
        {lesson.instructionFr && (
          <p className="text-xs sm:text-sm font-semibold text-sky-400 mt-1">
            {lesson.instructionFr}
          </p>
        )}
      </div>

      {/* Fortschrittsanzeige der Zuordnung */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Gefundene Paare:</span>
        <span className="font-bold text-emerald-400 font-mono">
          {matchedIds.length} / {lesson.pairs.length}
        </span>
      </div>

      {/* 2-Spalten-Raster für Zuordnung (auf Mobile optimal gestylt) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Linke Spalte: Begriff (Deutsch + Französisch) */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 block">
            🇩🇪 Begriff / Terme
          </span>
          {lesson.pairs.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedLeft === pair.id;
            const isError = errorPair?.left === pair.id;

            const labelDe = pair.leftDe || pair.left || '';
            const labelFr = pair.leftFr || '';

            return (
              <button
                key={`left-${pair.id}`}
                type="button"
                onClick={() => handleSelectLeft(pair.id)}
                disabled={isMatched || isAnswered}
                className={`w-full min-h-[64px] p-3 text-left rounded-2xl font-bold text-xs transition-all flex items-center justify-between gap-2 border border-b-[4px] active:scale-[0.98] ${
                  isMatched
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200 opacity-80 cursor-default'
                    : isError
                    ? 'bg-rose-500/20 border-rose-400 border-b-rose-600 text-rose-100 animate-shake'
                    : isSelected
                    ? 'bg-violet-500/25 border-violet-400 border-b-violet-600 text-white shadow-md ring-2 ring-violet-400/40'
                    : 'bg-slate-900/90 border-slate-700/80 border-b-slate-800 text-slate-100 hover:border-slate-600 hover:bg-slate-850'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <span className="block leading-snug truncate">{labelDe}</span>
                  {labelFr && (
                    <span className="block text-[10px] font-semibold text-sky-400/90 truncate mt-0.5">
                      {labelFr}
                    </span>
                  )}
                </div>
                {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Rechte Spalte: Erklärung / Bedeutung */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 block">
            🎯 Bedeutung / Rôle
          </span>
          {shuffledRights.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedRight === pair.id;
            const isError = errorPair?.right === pair.id;

            const labelDe = pair.rightDe || pair.right || '';
            const labelFr = pair.rightFr || '';

            return (
              <button
                key={`right-${pair.id}`}
                type="button"
                onClick={() => handleSelectRight(pair.id)}
                disabled={isMatched || isAnswered}
                className={`w-full min-h-[64px] p-3 text-left rounded-2xl font-semibold text-xs transition-all flex items-center justify-between gap-2 border border-b-[4px] active:scale-[0.98] ${
                  isMatched
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200 opacity-80 cursor-default'
                    : isError
                    ? 'bg-rose-500/20 border-rose-400 border-b-rose-600 text-rose-100 animate-shake'
                    : isSelected
                    ? 'bg-violet-500/25 border-violet-400 border-b-violet-600 text-white shadow-md ring-2 ring-violet-400/40'
                    : 'bg-slate-900/90 border-slate-700/80 border-b-slate-800 text-slate-200 hover:border-slate-600 hover:bg-slate-850'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <span className="block leading-snug line-clamp-2">{labelDe}</span>
                  {labelFr && (
                    <span className="block text-[10px] italic text-sky-400/90 truncate mt-0.5">
                      {labelFr}
                    </span>
                  )}
                </div>
                {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Erfolgsmeldung, wenn alle Paare gefunden sind */}
      {matchedIds.length === lesson.pairs.length && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs space-y-1 animate-pop-in">
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Alle Paare erfolgreich zugeordnet!</span>
          </div>
          <p className="text-emerald-200/90">
            Toutes les correspondances ont été trouvées avec succès ! Tippe unten auf Weiter.
          </p>
        </div>
      )}
    </div>
  );
}
