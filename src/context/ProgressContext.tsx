'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress, LanguageMode } from '@/types/course';
// Sound fallback
const sounds = {
  enabled: true,
  playClick: () => {},
  playSuccess: () => {},
  playComplete: () => {},
};

/**
 * Normalisiert Modul-IDs deterministisch auf das Format 'modul-X'.
 */
export function normalizeModuleId(id?: string | null): string {
  if (!id || typeof id !== 'string') return '';
  const trimmed = id.trim().toLowerCase();
  const match = trimmed.match(/\d+/);
  if (match) {
    return `modul-${match[0]}`;
  }
  return trimmed;
}

/**
 * Berechnet den Fortschritt in Prozent [0 - 100] mit mathematischer Rundung und Division-durch-0-Schutz.
 */
export function calculateProgressPercent(
  lessonIds?: string[] | null,
  completedLessonIds?: string[] | null
): number {
  if (!lessonIds || !Array.isArray(lessonIds) || lessonIds.length === 0) {
    return 0;
  }
  const completed = Array.isArray(completedLessonIds) ? completedLessonIds : [];
  const completedCount = lessonIds.filter((id) => completed.includes(id)).length;
  const percent = Math.round((completedCount / lessonIds.length) * 100);
  return Math.min(100, Math.max(0, isNaN(percent) ? 0 : percent));
}

/**
 * Berechnet die Streak-Tage deterministisch basierend auf dem letzten Aktivitätsdatum.
 */
export function calculateStreak(
  lastActiveDate?: string | null,
  currentStreak: number = 1,
  todayStr?: string
): { streakDays: number; lastActiveDate: string } {
  const safeCurrentStreak =
    typeof currentStreak === 'number' && !isNaN(currentStreak) && currentStreak > 0
      ? currentStreak
      : 1;
  const today = todayStr || new Date().toISOString().split('T')[0];

  if (!lastActiveDate || typeof lastActiveDate !== 'string') {
    return { streakDays: safeCurrentStreak, lastActiveDate: today };
  }

  const lastDate = new Date(lastActiveDate);
  const nowDate = new Date(today);

  if (isNaN(lastDate.getTime()) || isNaN(nowDate.getTime())) {
    return { streakDays: safeCurrentStreak, lastActiveDate: today };
  }

  const diffTime = nowDate.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { streakDays: safeCurrentStreak, lastActiveDate: today };
  } else if (diffDays === 1) {
    return { streakDays: safeCurrentStreak + 1, lastActiveDate: today };
  } else if (diffDays > 1) {
    return { streakDays: 1, lastActiveDate: today };
  }

  return { streakDays: safeCurrentStreak, lastActiveDate: today };
}

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

    const safeXp = typeof xp === 'number' && !isNaN(xp) ? xp : 0;
    const newCompleted = [...progress.completedLessonIds, lessonId];
    const newProgress: UserProgress = {
      ...progress,
      completedLessonIds: newCompleted,
      totalXp: progress.totalXp + safeXp,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
    saveProgress(newProgress);
  };

  const markModuleComplete = (moduleId: string, bonusXp: number) => {
    const norm = normalizeModuleId(moduleId);
    const alreadyCompleted = progress.completedModuleIds.some((id) => normalizeModuleId(id) === norm);
    const newModules = alreadyCompleted
      ? progress.completedModuleIds
      : [...progress.completedModuleIds, moduleId];

    const safeBonus = typeof bonusXp === 'number' && !isNaN(bonusXp) ? bonusXp : 0;
    const newProgress: UserProgress = {
      ...progress,
      completedModuleIds: newModules,
      totalXp: progress.totalXp + (alreadyCompleted ? 0 : safeBonus),
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
    saveProgress(newProgress);
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessonIds.includes(lessonId);
  };

  const isModuleCompleted = (moduleId: string) => {
    const norm = normalizeModuleId(moduleId);
    return progress.completedModuleIds.some((id) => normalizeModuleId(id) === norm);
  };

  const isModuleUnlocked = (moduleId: string, previousModuleId?: string) => {
    // Erstes Modul ist immer freigeschaltet
    if (!previousModuleId) return true;
    const normPrev = normalizeModuleId(previousModuleId);
    return progress.completedModuleIds.some((id) => normalizeModuleId(id) === normPrev);
  };

  const getModuleProgressPercent = (lessonIds: string[]) => {
    return calculateProgressPercent(lessonIds, progress.completedLessonIds);
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

