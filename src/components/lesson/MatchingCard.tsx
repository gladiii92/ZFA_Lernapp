'use client';

import React, { useState, useEffect } from 'react';
import { MatchingLesson, MatchingPair } from '@/types/course';
import { Sparkles, Check } from 'lucide-react';
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

  // Shuffled right items for game challenge
  const [shuffledRights, setShuffledRights] = useState<MatchingPair[]>([]);

  useEffect(() => {
    // Shuffle right items once on mount
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
      // Match!
      sounds.playCorrect();
      const updated = [...matchedIds, leftId];
      setMatchedIds(updated);
      setSelectedLeft(null);
      setSelectedRight(null);

      if (updated.length === lesson.pairs.length) {
        onComplete(true);
      }
    } else {
      // Error
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
    <div className="space-y-4 pb-20 animate-pop-in">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Zuordnungsübung / Association</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
          {lesson.instructionDe}
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-indigo-600 mt-0.5">
          {lesson.instructionFr}
        </p>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left column: Deutsch */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            🇩🇪 Begriff
          </span>
          {lesson.pairs.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedLeft === pair.id;
            const isError = errorPair?.left === pair.id;

            return (
              <button
                key={`left-${pair.id}`}
                onClick={() => handleSelectLeft(pair.id)}
                disabled={isMatched || isAnswered}
                className={`w-full min-h-[58px] p-3 text-left rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-between border-2 border-b-4 ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-80 cursor-default'
                    : isError
                    ? 'bg-rose-50 border-rose-500 text-rose-800 animate-shake'
                    : isSelected
                    ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-md scale-102'
                    : 'bg-white border-slate-200 border-b-slate-300 text-slate-800 hover:border-purple-300'
                }`}
              >
                <span>{pair.left}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Right column: Latein / Übersetzung */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            🏛️ Übersetzung / Latein
          </span>
          {shuffledRights.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedRight === pair.id;
            const isError = errorPair?.right === pair.id;

            return (
              <button
                key={`right-${pair.id}`}
                onClick={() => handleSelectRight(pair.id)}
                disabled={isMatched || isAnswered}
                className={`w-full min-h-[58px] p-3 text-left rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-between border-2 border-b-4 ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-80 cursor-default'
                    : isError
                    ? 'bg-rose-50 border-rose-500 text-rose-800 animate-shake'
                    : isSelected
                    ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-md scale-102'
                    : 'bg-white border-slate-200 border-b-slate-300 text-slate-800 hover:border-purple-300'
                }`}
              >
                <span className="font-mono text-xs">{pair.right}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

