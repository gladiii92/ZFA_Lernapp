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
import { CompletionModal } from '@/components/lesson/CompletionModal';
import { X, ArrowRight } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface ModuleLessonClientProps {
  moduleId: string;
}

export function ModuleLessonClient({ moduleId }: ModuleLessonClientProps) {
  const router = useRouter();
  const { markLessonComplete, markModuleComplete } = useProgress();

  const currentModule = courseData.modules.find((m) => m.id === moduleId);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);
  const [isMatchingCompleted, setIsMatchingCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  if (!currentModule) {
    return (
      <MobileContainer className="p-6 text-center justify-center items-center">
        <h2 className="text-xl font-bold text-slate-800">Modul nicht gefunden</h2>
        <p className="text-xs text-slate-500 mt-1">Module introuvable</p>
        <Link href="/" className="mt-4 inline-block text-emerald-600 font-bold text-sm">
          Zurück zur Startseite / Retour
        </Link>
      </MobileContainer>
    );
  }

  const currentLesson = currentModule.lessons[currentLessonIndex];
  const totalLessons = currentModule.lessons.length;

  const handleNext = () => {
    sounds.playClick();

    // Mark current lesson as complete
    markLessonComplete(moduleId, currentLesson.id, 20);

    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
      setIsQuizAnswered(false);
      setIsMatchingCompleted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all lessons in module!
      markModuleComplete(moduleId, currentModule.xpReward);
      setShowCompletionModal(true);
    }
  };

  const handleRestart = () => {
    setCurrentLessonIndex(0);
    setIsQuizAnswered(false);
    setIsMatchingCompleted(false);
    setShowCompletionModal(false);
  };

  // Determine whether "Weiter" button is ready to click
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
    return true;
  };

  return (
    <MobileContainer className="bg-slate-50 min-h-screen">
      {/* Top Header with Close and Progress */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 flex items-center gap-3">
        <button
          onClick={() => router.push('/')}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Schließen / Fermer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="flex-1">
          <ProgressBar
            current={currentLessonIndex + 1}
            total={totalLessons}
          />
        </div>

        <span className="text-xs font-black text-slate-500 min-w-[36px] text-right">
          {currentLessonIndex + 1}/{totalLessons}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {currentLesson.type === 'theory' && (
          <TheoryCard lesson={currentLesson} />
        )}

        {currentLesson.type === 'vocabulary' && (
          <VocabTable lesson={currentLesson} />
        )}

        {currentLesson.type === 'quiz' && (
          <QuizCard
            lesson={currentLesson}
            isAnswered={isQuizAnswered}
            onAnswerSelected={(isCorrect) => {
              setIsQuizAnswered(true);
            }}
          />
        )}

        {currentLesson.type === 'matching' && (
          <MatchingCard
            lesson={currentLesson}
            isAnswered={isMatchingCompleted}
            onComplete={(isCorrect) => {
              setIsMatchingCompleted(true);
            }}
          />
        )}
      </div>

      {/* Sticky Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!canProceed()}
          onClick={handleNext}
          className="flex items-center justify-center gap-2"
        >
          <span>
            {currentLessonIndex === totalLessons - 1
              ? 'Abschließen / Terminer'
              : 'Weiter / Continuer'}
          </span>
          <ArrowRight className="w-5 h-5 inline stroke-[2.5]" />
        </Button>
      </div>

      {/* Celebration Modal upon completing the module */}
      {showCompletionModal && (
        <CompletionModal
          moduleTitleDe={currentModule.titleDe}
          moduleTitleFr={currentModule.titleFr}
          xpEarned={currentModule.xpReward}
          onFinish={() => router.push('/')}
          onRestart={handleRestart}
        />
      )}
    </MobileContainer>
  );
}

