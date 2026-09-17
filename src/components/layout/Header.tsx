'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Flame, Zap, Volume2, VolumeX, RotateCcw, BookOpen, AlertTriangle } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

export function Header() {
  const { progress, toggleSound, resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  // Barrierefreies Schließen des Modals via ESC-Taste
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowResetConfirm(false);
    }
  }, []);

  useEffect(() => {
    if (showResetConfirm) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showResetConfirm, handleKeyDown]);

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 transition-colors">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Logo / App Title mit Touch-Feedback */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group rounded-2xl p-1 -ml-1 focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
          aria-label="Zurück zur Startseite der ZFA Lernapp"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-base shadow-md shadow-emerald-950/40 group-hover:scale-105 active:scale-95 transition-transform">
            🦷
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-100 text-sm tracking-tight block leading-none group-hover:text-sky-300 transition-colors">
              ZFA Lernapp
            </span>
            <span className="text-[10px] font-semibold text-sky-400 block leading-tight mt-0.5">
              App d&apos;apprentissage
            </span>
          </div>
        </Link>

        {/* Gamification Stats & Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Streak Counter */}
          <div
            className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1.5 rounded-xl text-amber-300 text-xs font-black shadow-xs"
            title="Tages-Serie / Série quotidienne"
            aria-label={`${progress.streakDays} Tage Serie`}
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{progress.streakDays}</span>
          </div>

          {/* XP Counter */}
          <div
            className="flex items-center gap-1 bg-sky-500/10 border border-sky-500/25 px-2.5 py-1.5 rounded-xl text-sky-300 text-xs font-black shadow-xs"
            title="Gesammelte Erfahrungspunkte / Points XP"
            aria-label={`${progress.totalXp} Erfahrungspunkte`}
          >
            <Zap className="w-4 h-4 fill-sky-400 text-sky-400" />
            <span>{progress.totalXp}</span>
          </div>

          {/* Fachwörterbuch Shortcut (Touch-Target min. 44x44px) */}
          <Link
            href="/glossary"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center text-slate-300 hover:text-sky-300 hover:bg-slate-800/80 active:scale-95 transition-all border border-slate-800/80 focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
            title="Fachwörterbuch / Dictionnaire médical"
            aria-label="ZFA-Fachwörterbuch öffnen"
          >
            <BookOpen className="w-4 h-4" />
          </Link>

          {/* Sound Toggle (Touch-Target min. 44x44px) */}
          <button
            type="button"
            onClick={toggleSound}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:bg-slate-800/80 active:scale-95 transition-all border border-slate-800/80 focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
            title={progress.soundEnabled ? 'Ton stumm schalten / Désactiver le son' : 'Ton aktivieren / Activer le son'}
            aria-label={progress.soundEnabled ? 'Ton ausschalten' : 'Ton einschalten'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Reset Progress Trigger */}
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 transition-all border border-slate-800/80 focus-visible:ring-2 focus-visible:ring-rose-400 outline-none"
            title="Fortschritt zurücksetzen / Réinitialiser"
            aria-label="Fortschritt zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barrierefreies Bestätigungsmodal für Reset */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-modal-title"
            aria-describedby="reset-modal-desc"
            className="bg-[#0f172a] rounded-3xl max-w-xs w-full p-5 border border-slate-700/80 shadow-2xl text-slate-100 animate-pop-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 text-rose-400 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 id="reset-modal-title" className="text-base font-bold text-slate-100">
                Fortschritt zurücksetzen?
              </h3>
            </div>

            <p className="text-xs text-sky-400 font-semibold">
              Réinitialiser la progression ?
            </p>

            <p id="reset-modal-desc" className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              Alle Erfahrungspunkte, gemeisterten Module und Tages-Streaks werden auf 0 gesetzt.
            </p>

            <div className="bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] p-2.5 rounded-xl mt-3 leading-snug">
              💡 <strong>Merksatz:</strong> Diese Aktion kann nicht rückgängig gemacht werden.
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 text-xs font-bold py-3 px-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-sky-400 outline-none min-h-[44px]"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="flex-1 text-xs font-bold py-3 px-3 rounded-xl bg-rose-600 text-white hover:bg-rose-500 active:scale-95 transition-all shadow-md shadow-rose-950/40 focus-visible:ring-2 focus-visible:ring-rose-400 outline-none min-h-[44px]"
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
