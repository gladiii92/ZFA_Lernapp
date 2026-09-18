'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { courseData } from '@/data/courseData';
import { useProgress } from '@/context/ProgressContext';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { TheoryCard } from '@/components/lesson/TheoryCard';
import { VocabTable } from '@/components/lesson/VocabTable';
import { QuizCard } from '@/components/lesson/QuizCard';
import { MatchingCard } from '@/components/lesson/MatchingCard';
import { InteractiveGraphicCard } from '@/components/lesson/InteractiveGraphicCard';
import { CompletionModal } from '@/components/lesson/CompletionModal';
import { X, ArrowRight } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface ModuleLessonClientProps {
  moduleId: string;
}

export function ModuleLessonClient({ moduleId }: ModuleLessonClientProps) {
  const router = useRouter();
  const { markLessonComplete, markModuleComplete } = useProgress();

  const currentModule = courseData.modules.find(
    (m) =>
      m.id === moduleId ||
      (typeof m.order === 'number' && (`m${m.order}` === moduleId || `modul-${m.order}` === moduleId || `module-${m.order}` === moduleId)) ||
      (m.id.startsWith('modul-') && m.id.replace('modul-', 'm') === moduleId) ||
      (m.id.startsWith('m') && m.id.replace(/^m/, 'modul-') === moduleId)
  );

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [isMatchingCompleted, setIsMatchingCompleted] = useState(false);
  const [isGraphicCompleted, setIsGraphicCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  if (!currentModule) {
    return (
      <MobileContainer className="p-6 text-center justify-center items-center bg-[#0f172a]">
        <h2 className="text-xl font-bold text-slate-100">Modul nicht gefunden</h2>
        <p className="text-xs text-slate-400 mt-1">Module introuvable</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-xl bg-sky-500/20 text-sky-400 font-bold text-sm border border-sky-500/30 hover:bg-sky-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          ← Zurück zur Startseite / Retour
        </Link>
      </MobileContainer>
    );
  }

  const currentLesson = currentModule.lessons[currentLessonIndex];
  const totalLessons = currentModule.lessons.length;

  const handleNext = () => {
    sounds.playClick();

    // Aktuelle Lektion als abgeschlossen markieren
    markLessonComplete(currentModule.id, currentLesson.id, 20);

    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
      setIsQuizAnswered(false);
      setIsMatchingCompleted(false);
      setIsGraphicCompleted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Gesamtes Modul gemeistert
      markModuleComplete(currentModule.id, currentModule.xpReward);
      setShowCompletionModal(true);
    }
  };

  const handleRestart = () => {
    setCurrentLessonIndex(0);
    setIsQuizAnswered(false);
    setIsMatchingCompleted(false);
    setIsGraphicCompleted(false);
    setShowCompletionModal(false);
  };

  // Prüfung, ob der Fortschritts-Button aktiv geschaltet werden darf
  const canProceed = () => {
    if (currentLesson.type === 'theory' || currentLesson.type === 'vocabulary') {
      return true;
    }
    if (currentLesson.type === 'quiz') {
      return isQuizAnswered;
    }
    if (currentLesson.type === 'matching') {
      return isMatchingCompleted;
    }
    if (currentLesson.type === 'interactive_graphic' || currentLesson.type === 'interactive-graphic') {
      // Entweder durch Interaktion gelöst oder bei reinem Erkunden freigegeben
      return currentLesson.mode === 'explore' || isGraphicCompleted;
    }
    return true;
  };

  return (
    <MobileContainer className="bg-[#0f172a]">
      {/* Sticky App-Header mit Barrierefreiheit und Fortschrittsbalken */}
      <header className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md px-4 py-3 border-b border-slate-800/90 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          title="Schließen / Fermer"
          aria-label="Lektion beenden und zur Übersicht zurückkehren"
        >
          <X className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
        </button>

        <div className="flex-1">
          <ProgressBar
            current={currentLessonIndex + 1}
            total={totalLessons}
          />
        </div>

        <span className="text-xs font-bold text-slate-400 min-w-[40px] text-right font-mono">
          {currentLessonIndex + 1}/{totalLessons}
        </span>
      </header>

      {/* Haupt-Lernbereich mit sicherer Polsterung nach unten */}
      <div className="flex-1 px-4 py-4 pb-32">
        {/* Modul-Orientierungsbanner */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-900/80 border border-slate-800/90 px-3 py-2">
          <div className="flex items-center gap-2 truncate">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-300 truncate">
              {currentModule.titleDe}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 shrink-0">
            Modul {currentModule.order ?? currentModule.id}
          </span>
        </div>

        {/* Dynamische Darstellung je nach Lektionstyp */}
        {currentLesson.type === 'theory' && (
          <TheoryCard lesson={currentLesson} />
        )}

        {currentLesson.type === 'vocabulary' && (
          <VocabTable lesson={currentLesson} />
        )}

        {(currentLesson.type === 'interactive_graphic' || currentLesson.type === 'interactive-graphic') && (
          <InteractiveGraphicCard
            lesson={currentLesson}
            onComplete={() => setIsGraphicCompleted(true)}
            isCompleted={isGraphicCompleted}
          />
        )}

        {currentLesson.type === 'quiz' && (
          <QuizCard
            lesson={currentLesson}
            isAnswered={isQuizAnswered}
            onAnswerSelected={() => {
              setIsQuizAnswered(true);
            }}
          />
        )}

        {currentLesson.type === 'matching' && (
          <MatchingCard
            lesson={currentLesson}
            isAnswered={isMatchingCompleted}
            onComplete={() => {
              setIsMatchingCompleted(true);
            }}
          />
        )}
      </div>

      {/* Sticky Bottom-Bar mit min. 48px CTA-Button und iOS/Android Safe Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto p-4 bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-800/90 shadow-2xl pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!canProceed()}
          onClick={handleNext}
          className="min-h-[48px] text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span>{currentLessonIndex < totalLessons - 1 ? 'Weiter' : 'Modul abschließen'}</span>
          <ArrowRight className="w-5 h-5 ml-1" aria-hidden="true" />
        </Button>
      </footer>

      {/* Abschluss-Modal */}
      {showCompletionModal && (
        <CompletionModal
          moduleTitleDe={currentModule.titleDe}
          moduleTitleFr={currentModule.titleFr}
          xpEarned={currentModule.xpReward}
          onRestart={handleRestart}
          onFinish={() => router.push('/')}
        />
      )}
    </MobileContainer>
  );
}
