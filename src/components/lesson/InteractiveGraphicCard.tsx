'use client';

import React, { useState } from 'react';
import { InteractiveGraphicLesson } from '@/types/course';
import { VisualDiagramResolver } from '../visual/VisualDiagramResolver';
import { Compass, CheckCircle2, Sparkles, AlertCircle, Lightbulb } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface InteractiveGraphicCardProps {
  lesson: InteractiveGraphicLesson;
  onComplete: () => void;
  isCompleted: boolean;
}

export function InteractiveGraphicCard({
  lesson,
  onComplete,
  isCompleted,
}: InteractiveGraphicCardProps) {
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessageDe, setFeedbackMessageDe] = useState<string>('');
  const [feedbackMessageFr, setFeedbackMessageFr] = useState<string>('');

  const handleDiagramSelect = (selectedKey: string) => {
    // Mode: 'locate' (User soll eine bestimmte Struktur finden)
    if (lesson.mode === 'locate') {
      const target = lesson.targetHotspotId;
      // Normalisiere ID-Vergleiche (z.B. 'hs-enamel' vs 'schmelz', 'hs-molar' vs 'molars' / 'molar')
      const isMatch =
        target &&
        (selectedKey === target ||
          target.includes(selectedKey) ||
          selectedKey.includes(target.replace('hs-', '')) ||
          (target === 'hs-enamel' && selectedKey === 'schmelz') ||
          (target === 'hs-molar' && (selectedKey === 'molars' || selectedKey === 'molar')));

      if (isMatch) {
        sounds.playCorrect();
        setFeedbackState('success');
        setFeedbackMessageDe(
          lesson.feedbackSuccessDe || 'Hervorragend! Du hast die gesuchte Struktur präzise identifiziert.'
        );
        setFeedbackMessageFr(
          lesson.feedbackSuccessFr || 'Excellent ! Vous avez identifié la structure recherchée avec succès.'
        );
        onComplete();
      } else {
        sounds.playIncorrect();
        setFeedbackState('error');
        setFeedbackMessageDe(
          lesson.feedbackErrorDe || 'Das ist noch nicht ganz die gesuchte Struktur. Lies den Tipp und versuche es erneut!'
        );
        setFeedbackMessageFr(
          lesson.feedbackErrorFr || 'Ce n’est pas la structure recherchée. Observez bien le schéma et réessayez !'
        );
      }
    } else {
      // Bei 'explore' oder 'sequence': Automatisch als erkundet werten
      if (!isCompleted) {
        onComplete();
      }
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in select-none">
      {/* Kopfbereich: Titel & Typ */}
      <div className="bg-slate-900/95 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Interaktive Grafik • Graphique interactif</span>
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

      {/* Arbeitsauftrag / Didaktische Anweisung */}
      {(lesson.instructionDe || lesson.instructionFr) && (
        <div className="bg-gradient-to-r from-sky-950/70 via-slate-900 to-slate-900 border border-sky-500/30 rounded-2xl p-4 shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400 block">
                Deine Lernaufgabe • Mission
              </span>
              <p className="text-sm font-bold text-slate-100 leading-relaxed">
                {lesson.instructionDe}
              </p>
              {lesson.instructionFr && (
                <p className="text-xs text-sky-300/80 italic font-medium pt-0.5">
                  FR : {lesson.instructionFr}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interaktives Vektor-Diagramm */}
      <div className="w-full">
        <VisualDiagramResolver
          imageKey={lesson.graphicKey}
          onSelect={handleDiagramSelect}
        />
      </div>

      {/* Visuelles Feedback nach Berührung / Lösung */}
      {feedbackState !== 'idle' && (
        <div
          className={`rounded-2xl p-4 border animate-pop-in text-xs space-y-1 ${
            feedbackState === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-100'
          }`}
        >
          <div className="font-extrabold text-sm flex items-center gap-2">
            {feedbackState === 'success' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Richtig gelöst! / Parfait !</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300">Noch einmal probieren / Réessayer</span>
              </>
            )}
          </div>
          {feedbackMessageDe && <p className="font-medium pt-1">🇩🇪 {feedbackMessageDe}</p>}
          {feedbackMessageFr && (
            <p className="italic pt-0.5 text-sky-200/80">🇫🇷 {feedbackMessageFr}</p>
          )}
        </div>
      )}

      {/* Didaktischer Praxistipp */}
      {(lesson.tipDe || lesson.tipFr) && (
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-200/90">
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
  );
}

