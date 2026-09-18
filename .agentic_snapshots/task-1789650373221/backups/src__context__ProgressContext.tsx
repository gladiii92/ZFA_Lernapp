'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress, LanguageMode } from '@/types/course';
import { sounds } from '@/lib/sound';

interface ProgressContextType {
  progress: UserProgress;
  markLessonComplete: (moduleId: string, lessonId: string, xp: number) => void;
  markModuleComplete: (moduleId: string, bonusXp: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isModuleCompleted: (moduleId: string) => boolean;
  isModuleUnlocked: (moduleId: string, previousModuleId?: string) => boolean;
  getModuleProgressPercent: (lessonIds: string[]) => number;
  toggleSound: () => void;
  setLanguageMode: (mode: LanguageMode) => void;
  resetProgress: () => void;
  isLoaded: boolean;
}

const STORAGE_KEY = 'zfa_lernapp_progress_v1';

const defaultProgress: UserProgress = {
  completedLessonIds: [],
  completedModuleIds: [],
  totalXp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  soundEnabled: true,
  moduleScores: {},
  currentLanguage: 'de',
  languageMode: 'bilingual',
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lade Fortschritt aus LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: UserProgress = JSON.parse(saved);
        
        // Streak-Berechnung
        const today = new Date().toISOString().split('T')[0];
        let streak = parsed.streakDays || 1;
        if (parsed.lastActiveDate) {
          const last = new Date(parsed.lastActiveDate);
          const now = new Date(today);
          const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            streak += 1;
          } else if (diffDays > 1) {
            streak = 1; // Streak verloren
          }
        }

        const updated = {
          ...parsed,
          streakDays: streak,
          lastActiveDate: today,
        };
        setProgress(updated);
        sounds.enabled = updated.soundEnabled ?? true;
      }
    } catch (e) {
      console.error('Fehler beim Laden des Fortschritts:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Speichere Änderungen
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    sounds.enabled = newProgress.soundEnabled;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error('Fehler beim Speichern:', e);
    }
  };

  const markLessonComplete = (moduleId: string, lessonId: string, xp: number) => {
    if (progress.completedLessonIds.includes(lessonId)) return;

    const newCompleted = [...progress.completedLessonIds, lessonId];
    const newProgress: UserProgress = {
      ...progress,
      completedLessonIds: newCompleted,
      totalXp: progress.totalXp + xp,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
    saveProgress(newProgress);
  };

  const markModuleComplete = (moduleId: string, bonusXp: number) => {
    const alreadyCompleted = progress.completedModuleIds.includes(moduleId);
    const newModules = alreadyCompleted
      ? progress.completedModuleIds
      : [...progress.completedModuleIds, moduleId];

    const newProgress: UserProgress = {
      ...progress,
      completedModuleIds: newModules,
      totalXp: progress.totalXp + (alreadyCompleted ? 0 : bonusXp),
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
    saveProgress(newProgress);
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessonIds.includes(lessonId);
  };

  const isModuleCompleted = (moduleId: string) => {
    return progress.completedModuleIds.includes(moduleId);
  };

  const isModuleUnlocked = (moduleId: string, previousModuleId?: string) => {
    // Erstes Modul ist immer freigeschaltet
    if (!previousModuleId) return true;
    return progress.completedModuleIds.includes(previousModuleId);
  };

  const getModuleProgressPercent = (lessonIds: string[]) => {
    if (lessonIds.length === 0) return 0;
    const completedCount = lessonIds.filter((id) => progress.completedLessonIds.includes(id)).length;
    return Math.round((completedCount / lessonIds.length) * 100);
  };

  const setLanguageMode = (mode: LanguageMode) => {
    const updated: UserProgress = {
      ...progress,
      languageMode: mode,
    };
    saveProgress(updated);
    sounds.playClick();
  };

  const toggleSound = () => {
    const newEnabled = !progress.soundEnabled;
    const updated = { ...progress, soundEnabled: newEnabled };
    sounds.enabled = newEnabled;
    saveProgress(updated);
    if (newEnabled) {
      sounds.playClick();
    }
  };

  const resetProgress = () => {
    const resetData: UserProgress = {
      ...defaultProgress,
      soundEnabled: progress.soundEnabled,
    };
    saveProgress(resetData);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        markModuleComplete,
        isLessonCompleted,
        isModuleCompleted,
        isModuleUnlocked,
        getModuleProgressPercent,
        toggleSound,
        setLanguageMode,
        resetProgress,
        isLoaded,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

