'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Lock, Star, ChevronRight } from 'lucide-react';
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

  // Determine alignment offset for playful Duolingo serpentine path
  const offsets = ['translate-x-0', 'translate-x-6', '-translate-x-6', 'translate-x-4', '-translate-x-4'];
  const offsetClass = offsets[index % offsets.length];

  return (
    <div className={`flex flex-col items-center relative my-3 transition-transform ${offsetClass}`}>
      {/* Connector Line to Next Node */}
      <div className="w-1.5 h-8 bg-slate-200 -mb-2 rounded-full z-0" />

      {/* Main Node Card / Button */}
      {isUnlocked ? (
        <Link
          href={`/module/${module.id}`}
          className="group relative flex flex-col items-center text-center z-10"
        >
          {/* Circular Button */}
          <div className="relative">
            {/* Outer Ring / Halo */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-150 border-b-6 shadow-md ${
                isCompleted
                  ? 'bg-amber-400 border-amber-600 text-amber-950 hover:bg-amber-300'
                  : 'bg-[#58cc02] border-[#46a302] text-white hover:bg-[#52be02] group-hover:scale-105 active:translate-y-1 active:border-b-2'
              }`}
            >
              <span>{module.badge}</span>

              {/* Status Badge in Corner */}
              {isCompleted ? (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-white shadow-sm">
                  <Star className="w-3 h-3 fill-white" />
                </div>
              )}
            </div>

            {/* Circular Progress Badge */}
            {!isCompleted && progressPercent > 0 && (
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-xs text-[10px] font-black text-slate-700 whitespace-nowrap">
                {progressPercent}%
              </div>
            )}
          </div>

          {/* Module Titles */}
          <div className="mt-2.5 max-w-[220px]">
            <span className="text-xs font-black text-slate-800 group-hover:text-emerald-700 transition-colors block leading-tight">
              {module.titleDe}
            </span>
            <span className="text-[11px] font-semibold text-indigo-600 block leading-tight mt-0.5">
              {module.titleFr}
            </span>
            <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
              {module.lessons.length} Lektionen • +{module.xpReward} XP
            </span>
          </div>
        </Link>
      ) : (
        /* Locked Node */
        <div className="flex flex-col items-center text-center opacity-60 z-10 cursor-not-allowed">
          <div className="w-20 h-20 rounded-full bg-slate-200 border-b-6 border-slate-300 flex items-center justify-center text-slate-400 text-3xl shadow-inner relative">
            <span className="grayscale opacity-50">{module.badge}</span>
            <div className="absolute inset-0 bg-slate-300/30 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-slate-500" />
            </div>
          </div>

          <div className="mt-2.5 max-w-[220px]">
            <span className="text-xs font-bold text-slate-500 block leading-tight">
              {module.titleDe}
            </span>
            <span className="text-[11px] font-medium text-slate-400 block leading-tight mt-0.5">
              {module.titleFr}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
              Gesperrt / Verrouillé
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

