'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Zap, Volume2, VolumeX, RotateCcw, BookOpen, Check } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

export function Header() {
  const { progress, toggleSound, resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5">
      <div className="flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-base shadow-sm group-hover:scale-105 transition-transform">
            🦷
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-sm tracking-tight block leading-none">
              ZFA Lernapp
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 block leading-tight">
              App d&apos;apprentissage
            </span>
          </div>
        </Link>

        {/* Gamification Stats & Controls */}
        <div className="flex items-center gap-2">
          {/* Streak */}
          <div
            className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-xl text-amber-600 text-xs font-black shadow-2xs"
            title="Tages-Serie / Série quotidienne"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{progress.streakDays}</span>
          </div>

          {/* XP */}
          <div
            className="flex items-center gap-1 bg-sky-50 border border-sky-200/80 px-2 py-1 rounded-xl text-sky-600 text-xs font-black shadow-2xs"
            title="Gesammelte Erfahrungspunkte / Points XP"
          >
            <Zap className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
            <span>{progress.totalXp}</span>
          </div>

          {/* Glossary link */}
          <Link
            href="/glossary"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Fachwörterbuch / Dictionnaire médical"
          >
            <BookOpen className="w-4 h-4" />
          </Link>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title={progress.soundEnabled ? 'Ton stumm schalten / Désactiver le son' : 'Ton aktivieren / Activer le son'}
            aria-label="Ton an/aus"
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Reset Progress Trigger */}
          <button
            onClick={() => setShowResetConfirm(true)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Fortschritt zurücksetzen / Réinitialiser le progrès"
            aria-label="Fortschritt zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 border border-slate-200 shadow-2xl animate-pop-in">
            <h3 className="text-base font-bold text-slate-900">
              Fortschritt zurücksetzen?
            </h3>
            <p className="text-xs text-indigo-700 font-medium mt-0.5">
              Réinitialiser la progression ?
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Alle Punkte, abgeschlossenen Lektionen und Streaks werden auf 0 gesetzt.
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Abbrechen
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 text-xs font-bold py-2.5 px-3 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
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
