/**
 * Reine Hilfsfunktionen für Modul-ID-Normalisierung und Fortschrittsberechnungen.
 * Diese Datei ist frei von React/Client-Abhängigkeiten und kann sowohl im
 * Server- als auch im Client-Kontext importiert werden.
 */
import { courseData } from '@/data/courseData';

/**
 * Normalisiert Modul-IDs deterministisch auf das kanonische Format 'modul-X'.
 * Unterstützte Eingabeformate: 'm1', 'module-1', 'module1', 'modul-1', '1', '10'
 * Edge-Cases: null, undefined und leere Strings werden als '' zurückgegeben.
 */
export function normalizeModuleId(id: string): string {
  if (!id || typeof id !== 'string') return '';
  const trimmed = id.trim().toLowerCase();
  if (trimmed.startsWith('module-')) return trimmed.replace('module-', 'modul-');
  if (trimmed.startsWith('module')) return trimmed.replace('module', 'modul-');
  if (/^m\d+/.test(trimmed)) return trimmed.replace(/^m/, 'modul-');
  if (/^\d+$/.test(trimmed)) return `modul-${trimmed}`;
  return trimmed;
}

/**
 * Berechnet den Lektionsfortschritt mathematisch exakt auf [0, 100]%.
 * Schützt vor Division durch 0 und NaN.
 */
export function calculateProgressPercent(lessonIds: string[], completedLessonIds: string[]): number {
  if (!Array.isArray(lessonIds) || lessonIds.length === 0) return 0;
  if (!Array.isArray(completedLessonIds) || completedLessonIds.length === 0) return 0;

  const completedCount = lessonIds.filter((id) => completedLessonIds.includes(id)).length;
  const percent = Math.round((completedCount / lessonIds.length) * 100);
  if (isNaN(percent) || !isFinite(percent)) return 0;
  return Math.min(100, Math.max(0, percent));
}

/**
 * Deterministische Berechnung des Login-Streaks anhand von Datumsdifferenzen.
 */
export function calculateStreak(
  lastActiveDate: string | undefined,
  today: string,
  currentStreak: number
): number {
  const baseStreak =
    typeof currentStreak === 'number' && !isNaN(currentStreak) && currentStreak > 0
      ? currentStreak
      : 1;
  if (!lastActiveDate) return baseStreak;

  try {
    const last = new Date(lastActiveDate);
    const now = new Date(today);
    if (isNaN(last.getTime()) || isNaN(now.getTime())) return baseStreak;

    const diffMs = now.getTime() - last.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return baseStreak + 1;
    } else if (diffDays > 1) {
      return 1; // Streak zurückgesetzt
    }
    return baseStreak;
  } catch {
    return baseStreak;
  }
}

/**
 * Prüft Modulabschluss idempotent und präfix-unabhängig.
 */
export function checkIsModuleCompleted(moduleId: string, completedModuleIds: string[]): boolean {
  if (!moduleId || !Array.isArray(completedModuleIds)) return false;
  const targetNormalized = normalizeModuleId(moduleId);
  return completedModuleIds.some((id) => normalizeModuleId(id) === targetNormalized);
}

/**
 * Prüft Modulfreischaltung anhand des Vorgänger-Moduls.
 */
export function checkIsModuleUnlocked(
  moduleId: string,
  completedModuleIds: string[],
  previousModuleId?: string
): boolean {
  if (!moduleId) return false;
  const normalized = normalizeModuleId(moduleId);
  if (normalized === 'modul-1') return true;

  if (previousModuleId) {
    return checkIsModuleCompleted(previousModuleId, completedModuleIds);
  }

  const currentIndex = courseData.modules.findIndex(
    (m) => normalizeModuleId(m.id) === normalized
  );
  if (currentIndex <= 0) return true;

  const prevModule = courseData.modules[currentIndex - 1];
  return checkIsModuleCompleted(prevModule.id, completedModuleIds);
}
