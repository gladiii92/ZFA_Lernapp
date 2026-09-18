'use client';

import React from 'react';
import Link from 'next/link';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ModuleNode } from '@/components/roadmap/ModuleNode';
import { courseData } from '@/data/courseData';
import { useProgress } from '@/context/ProgressContext';
import { BookOpen, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { sounds } from '@/lib/sound';

export default function HomePage() {
  const { progress } = useProgress();

  const completedModulesCount = courseData.modules.filter((m) =>
    progress.completedModuleIds.includes(m.id)
  ).length;

  const totalLessons = courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonsCount = progress.completedLessonIds.length;
  const overallPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <MobileContainer>
      <Header />

      {/* Main Scrollable Content */}
      <div className="flex-1 px-2 min-[360px]:px-2.5 sm:px-4 py-2 min-[360px]:py-2.5 sm:py-4 space-y-3 sm:space-y-4 pb-28 overflow-y-auto overflow-x-hidden w-full max-w-full box-border touch-pan-y">
        {/* Welcome Hero Card im Dark-Slate Design */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5 text-white shadow-xl relative overflow-hidden">
          {/* Subtile Akzent-Beleuchtung */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/15 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sky-500/15 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9.5px] sm:text-xs font-bold mb-2 sm:mb-3 text-emerald-300 max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="truncate">1. Ausbildungsjahr • 1re année</span>
            </div>

            <h1 className="text-sm min-[360px]:text-base sm:text-xl font-black text-slate-100 leading-tight tracking-tight break-words">
              ZFA Lernstraße
            </h1>
            <p className="text-sky-400 font-semibold text-[10px] min-[360px]:text-[10.5px] sm:text-xs mt-0.5 break-words">
              Parcours d&apos;apprentissage ZFA (Bilingue DE / FR)
            </p>

            <p className="text-[10.5px] sm:text-xs text-slate-300 mt-1.5 sm:mt-2.5 leading-relaxed font-normal break-words">
              Einfache zahnmedizinische Erklärungen auf Deutsch mit französischer Übersetzung. Lerne interaktiv mit anatomischen Vektormodellen, Quizzes und Hotspots für Schule und Praxis!
            </p>

            {/* Gesamtkurs-Fortschritt */}
            <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-[10px] min-[360px]:text-[10.5px] sm:text-xs font-bold text-slate-300 gap-2 mb-1.5">
                <span className="truncate">{completedModulesCount} von {courseData.modules.length} Modulen gemeistert</span>
                <span className="text-amber-400 font-black shrink-0">{overallPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/60">
                <div
                  className="bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Teaser für interaktive Grafik-Galerie & Schaubilder */}
        <Link
          href="/gallery"
          onClick={() => sounds.playClick()}
          className="block bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/30 hover:border-sky-400/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-md group active:scale-[0.99] transition-all focus-visible:ring-2 focus-visible:ring-sky-400 outline-none min-h-[44px] w-full touch-pan-y"
          aria-label="Zu den Grafiken und Schaubildern (Galerie)"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                <span className="text-[11px] sm:text-xs font-black text-slate-100 group-hover:text-sky-300 transition-colors truncate">
                  Grafiken &amp; Schaubilder
                </span>
                <span className="text-[9px] sm:text-[10px] bg-sky-500/20 text-sky-300 font-bold px-1.5 py-0.5 rounded-sm shrink-0">
                  Zentraler Bereich • DE / FR
                </span>
              </div>
              <p className="text-[9.5px] sm:text-[11px] text-slate-400 truncate mt-0.5">
                Alle Zusatzmaterialien, anatomischen Vektormodelle &amp; Schaubilder übersichtlich an einem Ort
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </div>
        </Link>

        {/* Roadmap Guide Header */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-1 w-full max-w-full overflow-hidden">
          <div className="h-px bg-slate-800/80 flex-1 min-w-2" />
          <span className="text-[9px] sm:text-[11px] uppercase tracking-wider font-extrabold text-slate-400 bg-slate-900 border border-slate-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs text-center truncate max-w-[85%]">
            Lernmodule • Modules d&apos;apprentissage
          </span>
          <div className="h-px bg-slate-800/80 flex-1 min-w-2" />
        </div>

        {/* Roadmap Serpentine Path */}
        <div className="py-2 flex flex-col items-center w-full max-w-full overflow-hidden touch-pan-y">
          {courseData.modules.map((mod, idx) => {
            const previousModuleId = idx > 0 ? courseData.modules[idx - 1].id : undefined;
            return (
              <ModuleNode
                key={mod.id}
                module={mod}
                previousModuleId={previousModuleId}
                index={idx}
              />
            );
          })}
        </div>

        {/* Fachwörterbuch Shortcut */}
        <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-4 border-t border-slate-800">
          <Link
            href="/glossary"
            onClick={() => sounds.playClick()}
            className="w-full bg-[#0f172a] border border-slate-800 hover:border-sky-500/50 hover:bg-slate-850 active:scale-[0.99] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex items-center justify-between group transition-all shadow-md focus-visible:ring-2 focus-visible:ring-sky-400 outline-none min-h-[44px]"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-slate-100 text-xs sm:text-sm group-hover:text-violet-300 transition-colors truncate">
                  ZFA-Fachwörterbuch
                </h3>
                <p className="text-[10px] sm:text-xs text-sky-400 font-semibold truncate">
                  Dictionnaire médical (DE / FR / Latein)
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0 ml-1.5 sm:ml-2" />
          </Link>
        </div>

        {/* Didaktischer Lerntipp */}
        <div className="bg-slate-900/60 border border-slate-800/70 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center text-slate-400 text-[11px] sm:text-xs leading-relaxed">
          <p className="font-medium">
            💡 <span className="font-bold text-slate-200">Erstmal ganz in Ruhe:</span> Lerne täglich 5 Minuten, um deine Streak zu halten und Fachbegriffe sicher zu beherrschen!
          </p>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </MobileContainer>
  );
}

