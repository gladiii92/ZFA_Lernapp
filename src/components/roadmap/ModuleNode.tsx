'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Lock, Star, Sparkles, BookOpen } from 'lucide-react';
import { CourseModule } from '@/types/course';
import { useProgress } from '@/context/ProgressContext';

interface ModuleNodeProps {
  module: CourseModule;
  previousModuleId?: string;
  index: number;
}

export function ModuleNode({ module, previousModuleId, index }: ModuleNodeProps) {
  const { isModuleCompleted, isModuleUnlocked, getModuleProgressPercent } = useProgress();

  const isCompleted = isModuleCompleted(module.id);
  const isUnlocked = isModuleUnlocked(module.id, previousModuleId);
  const progressPercent = getModuleProgressPercent(module.lessons.map((l) => l.id));

  // Kalibrierte, daumenfreundliche Duolingo-Pfade ohne horizontalen Überlauf
  const offsets = ['translate-x-0', 'translate-x-5', '-translate-x-5', 'translate-x-4', '-translate-x-4'];
  const offsetClass = offsets[index % offsets.length];

  return (
    <div className={`flex flex-col items-center relative my-2 transition-transform ${offsetClass}`}>
      {/* Vertikaler Pfad-Verbinder mit Farbstatus */}
      {index > 0 && (
        <div
          className={`w-1.5 h-6 rounded-full mb-1 transition-all duration-300 ${
            isCompleted
              ? 'bg-gradient-to-b from-amber-400/80 to-emerald-400/80 shadow-xs shadow-emerald-500/20'
              : isUnlocked
              ? 'bg-gradient-to-b from-sky-400/60 to-emerald-400/60'
              : 'bg-slate-800'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Freigeschalteter interaktiver Knoten */}
      {isUnlocked ? (
        <Link
          href={`/module/${module.id}`}
          className="group relative flex flex-col items-center text-center z-10 focus-visible:ring-2 focus-visible:ring-sky-400 rounded-3xl outline-none p-1 transition-all active:scale-[0.98]"
          aria-label={`${module.titleDe} (${module.titleFr}) - ${isCompleted ? 'Abgeschlossen' : `${progressPercent}% abgeschlossen`}`}
        >
          {/* Taktiler 3D-Knoten-Button im Squircle-Design */}
          <div className="relative">
            <div
              className={`w-20 h-20 min-w-[80px] min-h-[80px] rounded-[24px] flex items-center justify-center text-3xl select-none transition-all duration-150 border-b-[6px] shadow-lg ${
                isCompleted
                  ? 'bg-gradient-to-b from-amber-400 to-amber-500 border-amber-600 text-amber-950 shadow-amber-950/40 hover:brightness-105 active:translate-y-1 active:border-b-2'
                  : progressPercent > 0
                  ? 'bg-gradient-to-b from-sky-500 to-sky-600 border-sky-700 text-white shadow-sky-950/40 ring-4 ring-sky-400/30 ring-offset-2 ring-offset-slate-950 hover:brightness-105 active:translate-y-1 active:border-b-2'
                  : 'bg-gradient-to-b from-emerald-500 to-emerald-600 border-emerald-700 text-white shadow-emerald-950/40 hover:brightness-105 active:translate-y-1 active:border-b-2'
              }`}
            >
              <span>{module.badge}</span>

              {/* Status-Icon im Eck-Badge */}
              {isCompleted ? (
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-white shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : progressPercent > 0 ? (
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-sky-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              )}
            </div>

            {/* Prozent-Fortschritts-Pill */}
            {!isCompleted && progressPercent > 0 && (
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900 px-2.5 py-0.5 rounded-full border border-sky-400/50 shadow-md text-[10px] font-black text-sky-300 whitespace-nowrap">
                {progressPercent}%
              </div>
            )}
          </div>

          {/* Kompakte zweisprachige Modulkarte */}
          <div className="mt-2.5 w-full max-w-[220px] bg-[#0f172a] border border-slate-800 group-hover:border-slate-700 group-hover:bg-slate-850 rounded-2xl p-3 shadow-md transition-all">
            <span className="text-xs font-black text-slate-100 group-hover:text-sky-300 transition-colors block leading-snug">
              {module.titleDe}
            </span>
            <span className="text-[11px] font-semibold text-sky-400/90 block leading-tight mt-0.5">
              {module.titleFr}
            </span>
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-slate-400" />
                {module.lessons.length} Lektionen
              </span>
              <span className="text-amber-400 font-bold">+{module.xpReward} XP</span>
            </div>
            {/* Feine Fortschrittsleiste */}
            {!isCompleted && progressPercent > 0 && (
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-700/50">
                <div
                  className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
          </div>
        </Link>
      ) : (
        /* Gesperrter Knoten */
        <div
          className="flex flex-col items-center text-center opacity-65 z-10 select-none cursor-not-allowed p-1"
          aria-label={`${module.titleDe} (Gesperrt)`}
        >
          <div className="w-20 h-20 min-w-[80px] min-h-[80px] rounded-[24px] bg-slate-800/90 border-b-[6px] border-slate-900 flex items-center justify-center text-slate-500 text-3xl shadow-inner relative">
            <span className="grayscale opacity-40">{module.badge}</span>
            <div className="absolute inset-0 bg-slate-950/40 rounded-[24px] flex items-center justify-center">
              <Lock className="w-7 h-7 text-slate-400" />
            </div>
          </div>

          <div className="mt-2.5 w-full max-w-[220px] bg-slate-900/60 border border-slate-800/60 rounded-2xl p-3 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block leading-snug">
              {module.titleDe}
            </span>
            <span className="text-[11px] font-medium text-slate-500 block leading-tight mt-0.5">
              {module.titleFr}
            </span>
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-500 mt-2 pt-2 border-t border-slate-800/40">
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Gesperrt • Verrouillé</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
