'use client';

import React, { useState } from 'react';
import { QuizLesson, QuizOption } from '@/types/course';
import { VisualDiagramResolver } from '../visual/VisualDiagramResolver';
import { HelpCircle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface QuizCardProps {
  lesson: QuizLesson;
  onAnswerSelected: (isCorrect: boolean) => void;
  isAnswered: boolean;
}

export function QuizCard({ lesson, onAnswerSelected, isAnswered }: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [shakingIndex, setShakingIndex] = useState<number | null>(null);

  const handleSelectOption = (option: QuizOption, index: number) => {
    if (isAnswered) return;

    setSelectedIndex(index);

    if (option.isCorrect) {
      sounds.playCorrect();
      onAnswerSelected(true);
    } else {
      sounds.playIncorrect();
      setShakingIndex(index);
      setTimeout(() => setShakingIndex(null), 500);
      onAnswerSelected(false);
    }
  };

  const selectedOption = selectedIndex !== null ? lesson.options[selectedIndex] : null;

  return (
    <div className="space-y-4 pb-4 animate-fade-in select-none">
      {/* Frage Header */}
      <div className="bg-slate-900/95 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Quiz-Frage • Question de quiz</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-slate-100 leading-snug">
          {lesson.questionDe}
        </h2>
        {lesson.questionFr && (
          <p className="text-xs sm:text-sm font-semibold text-sky-400 mt-1">
            {lesson.questionFr}
          </p>
        )}
      </div>

      {/* Visuelles Diagramm (falls an Frage gekoppelt) */}
      {lesson.imageKey && (
        <div className="w-full">
          <VisualDiagramResolver imageKey={lesson.imageKey} />
        </div>
      )}

      {/* Antwortmöglichkeiten */}
      <div className="space-y-2.5">
        {lesson.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isShaking = shakingIndex === idx;

          let optionStyle =
            'bg-slate-900/90 border border-slate-700/80 border-b-[5px] border-b-slate-800 text-slate-100 hover:border-slate-600 hover:bg-slate-850';

          if (isSelected) {
            if (option.isCorrect) {
              optionStyle =
                'bg-emerald-500/20 border-emerald-400 border-b-[5px] border-b-emerald-600 text-emerald-100 shadow-lg shadow-emerald-500/20';
            } else {
              optionStyle =
                'bg-rose-500/20 border-rose-400 border-b-[5px] border-b-rose-600 text-rose-100 shadow-md';
            }
          } else if (isAnswered && option.isCorrect) {
            optionStyle =
              'bg-emerald-500/15 border border-emerald-400/60 border-dashed text-emerald-200';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectOption(option, idx)}
              disabled={isAnswered}
              className={`w-full min-h-[58px] text-left p-4 rounded-2xl transition-all duration-100 flex items-start justify-between gap-3 select-none active:translate-y-1 active:border-b-2 ${optionStyle} ${
                isShaking ? 'animate-shake' : ''
              }`}
            >
              <div className="flex-1">
                <span className="text-sm sm:text-base font-extrabold block leading-snug">
                  {option.textDe}
                </span>
                <span className="text-xs font-semibold text-sky-400/90 block mt-1">
                  FR: {option.textFr}
                </span>
              </div>

              {/* Status Icon */}
              {isSelected && (
                <div className="shrink-0 mt-0.5">
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Erklärung nach Beantwortung */}
      {selectedOption && (
        <div
          className={`rounded-2xl p-4 border animate-pop-in text-xs space-y-1.5 ${
            selectedOption.isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-100'
          }`}
        >
          <div className="font-extrabold text-sm flex items-center gap-2">
            {selectedOption.isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Richtig gelöst! / Correct !</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300">Nicht ganz... / Pas tout à fait...</span>
              </>
            )}
          </div>

          {selectedOption.explanationDe && (
            <p className="font-medium pt-0.5 leading-relaxed">
              🇩🇪 {selectedOption.explanationDe}
            </p>
          )}
          {selectedOption.explanationFr && (
            <p className="italic text-sky-300/80 leading-relaxed text-[11px]">
              🇫🇷 {selectedOption.explanationFr}
            </p>
          )}
        </div>
      )}

      {/* Praxistipp vor Beantwortung */}
      {lesson.tipDe && !isAnswered && (
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 flex items-start gap-2 text-xs text-amber-200/90">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-200 block">Tipp: {lesson.tipDe}</span>
            {lesson.tipFr && (
              <span className="italic text-amber-300/80 block text-[11px] mt-0.5">
                Astuce : {lesson.tipFr}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
