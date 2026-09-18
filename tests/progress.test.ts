import { describe, it, expect } from 'vitest';
import {
  normalizeModuleId,
  calculateProgressPercent,
  calculateStreak,
} from '@/context/ProgressContext';

describe('normalizeModuleId', () => {
  it('normalisiert verschiedene Modul-ID-Präfixe einheitlich zu modul-X', () => {
    expect(normalizeModuleId('m1')).toBe('modul-1');
    expect(normalizeModuleId('M1')).toBe('modul-1');
    expect(normalizeModuleId('modul-1')).toBe('modul-1');
    expect(normalizeModuleId('module-1')).toBe('modul-1');
    expect(normalizeModuleId('module1')).toBe('modul-1');
    expect(normalizeModuleId('1')).toBe('modul-1');
    expect(normalizeModuleId('m2')).toBe('modul-2');
    expect(normalizeModuleId('modul-10')).toBe('modul-10');
  });

  it('behandelt Edge-Cases wie leere Strings, null und undefined robust', () => {
    expect(normalizeModuleId('')).toBe('');
    expect(normalizeModuleId(null)).toBe('');
    expect(normalizeModuleId(undefined)).toBe('');
    expect(normalizeModuleId('custom-id')).toBe('custom-id');
  });
});

describe('calculateProgressPercent', () => {
  it('gibt 0 zurück bei leeren oder ungültigen Lektionslisten (Division durch 0 Schutz)', () => {
    expect(calculateProgressPercent([], [])).toBe(0);
    expect(calculateProgressPercent(null, [])).toBe(0);
    expect(calculateProgressPercent(undefined, ['l1'])).toBe(0);
    expect(calculateProgressPercent([], ['l1'])).toBe(0);
  });

  it('berechnet Prozentsätze mathematisch präzise und rundet kaufmännisch', () => {
    const lessons = ['l1', 'l2', 'l3'];
    expect(calculateProgressPercent(lessons, [])).toBe(0);
    expect(calculateProgressPercent(lessons, ['l1'])).toBe(33);
    expect(calculateProgressPercent(lessons, ['l1', 'l2'])).toBe(67);
    expect(calculateProgressPercent(lessons, ['l1', 'l2', 'l3'])).toBe(100);
  });

  it('beachtet 50% exakt bei 2 Lektionen', () => {
    const lessons = ['l1', 'l2'];
    expect(calculateProgressPercent(lessons, ['l1'])).toBe(50);
    expect(calculateProgressPercent(lessons, ['l1', 'l2'])).toBe(100);
  });

  it('begrenzt den Fortschritt strikt auf maximal 100%', () => {
    const lessons = ['l1'];
    expect(calculateProgressPercent(lessons, ['l1', 'l2', 'l3'])).toBe(100);
  });
});

describe('calculateStreak', () => {
  it('erhöht den Streak um 1 bei genau einem Tag Differenz', () => {
    const result = calculateStreak('2026-03-01', 3, '2026-03-02');
    expect(result.streakDays).toBe(4);
    expect(result.lastActiveDate).toBe('2026-03-02');
  });

  it('behält den Streak am selben Tag unverändert bei', () => {
    const result = calculateStreak('2026-03-01', 3, '2026-03-01');
    expect(result.streakDays).toBe(3);
    expect(result.lastActiveDate).toBe('2026-03-01');
  });

  it('setzt den Streak auf 1 zurück wenn mehr als ein Tag vergangen ist', () => {
    const result = calculateStreak('2026-03-01', 5, '2026-03-05');
    expect(result.streakDays).toBe(1);
    expect(result.lastActiveDate).toBe('2026-03-05');
  });

  it('behandelt fehlende oder ungültige Initialdaten robust', () => {
    const result = calculateStreak(null, 1, '2026-03-01');
    expect(result.streakDays).toBe(1);
    expect(result.lastActiveDate).toBe('2026-03-01');
  });
});
