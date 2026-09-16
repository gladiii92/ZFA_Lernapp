'use client';

import React, { useState } from 'react';
import { QuizLesson, QuizOption } from '@/types/course';
import { VisualDiagramResolver } from '../visual/VisualDiagramResolver';
import { HelpCircle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
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
    <div className="space-y-4 pb-20 animate-pop-in">
      {/* Question Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 text-sky-600 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Quiz-Frage / Question de quiz</span>
        </div>
        <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {lesson.questionDe}
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-indigo-600 mt-1">
          {lesson.questionFr}
        </p>
      </div>

      {/* Visual Diagram if attached to question */}
      {lesson.imageKey && (
        <div className="w-full">
          <VisualDiagramResolver imageKey={lesson.imageKey} />
        </div>
      )}

      {/* Options List */}
      <div className="space-y-2.5">
        {lesson.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isShaking = shakingIndex === idx;

          let optionStyle =
            'bg-white border-2 border-slate-200 border-b-4 border-b-slate-300 hover:border-slate-300 text-slate-800';

          if (isSelected) {
            if (option.isCorrect) {
              optionStyle =
                'bg-emerald-50 border-2 border-emerald-500 border-b-4 border-b-emerald-600 text-emerald-900 animate-bounce-short shadow-md';
            } else {
              optionStyle =
                'bg-rose-50 border-2 border-rose-500 border-b-4 border-b-rose-600 text-rose-900 shadow-sm';
            }
          } else if (isAnswered && option.isCorrect) {
            // Zeige die richtige Lösung an, falls falsch geantwortet wurde
            optionStyle =
              'bg-emerald-50/70 border-2 border-dashed border-emerald-400 text-emerald-900';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option, idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-100 flex items-start justify-between gap-3 select-none active:translate-y-0.5 active:border-b-2 ${optionStyle} ${
                isShaking ? 'animate-shake' : ''
              }`}
            >
              <div className="flex-1">
                <span className="text-sm sm:text-base font-extrabold block">
                  {option.textDe}
                </span>
                <span className="text-xs font-semibold text-indigo-700 block mt-0.5">
                  FR: {option.textFr}
                </span>
              </div>

              {/* Status Icons */}
              {isSelected && (
                <div className="flex-shrink-0 mt-0.5">
                  {option.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tip or Feedback explanation */}
      {selectedOption && (
        <div
          className={`rounded-2xl p-4 border animate-pop-in text-xs space-y-1 ${
            selectedOption.isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="font-extrabold text-sm flex items-center gap-1.5">
            {selectedOption.isCorrect ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Richtig! / Correct !</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Nicht ganz... / Pas tout à fait...</span>
              </>
            )}
          </div>

          {selectedOption.explanationDe && (
            <p className="font-medium pt-1">
              🇩🇪 {selectedOption.explanationDe}
            </p>
          )}
          {selectedOption.explanationFr && (
            <p className="italic pt-0.5 text-indigo-950/80">
              🇫🇷 {selectedOption.explanationFr}
            </p>
          )}
        </div>
      )}

      {/* Helpful Hint if available and not answered */}
      {lesson.tipDe && !isAnswered && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2 text-xs">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 block">Tipp: {lesson.tipDe}</span>
            {lesson.tipFr && (
              <span className="italic text-amber-800 block text-[11px] mt-0.5">
                Astuce : {lesson.tipFr}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
