'use client';

import React from 'react';
import Link from 'next/link';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { Header } from '@/components/layout/Header';
import { ModuleNode } from '@/components/roadmap/ModuleNode';
import { courseData } from '@/data/courseData';
import { useProgress } from '@/context/ProgressContext';
import { BookOpen, Sparkles, ArrowRight, Compass } from 'lucide-react';

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
      <div className="flex-1 px-4 py-4 space-y-5 pb-12 overflow-y-auto">
        {/* Welcome Hero Card im Dark-Slate Design */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
          {/* Subtile Akzent-Beleuchtung */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/15 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sky-500/15 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold mb-3 text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>1. Ausbildungsjahr • 1re année</span>
            </div>

            <h1 className="text-xl font-black text-slate-100 leading-tight tracking-tight">
              ZFA Lernstraße
            </h1>
            <p className="text-sky-400 font-semibold text-xs mt-0.5">
              Parcours d&apos;apprentissage ZFA
            </p>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-normal">
              Einfache zahnmedizinische Erklärungen auf Deutsch mit französischer Übersetzung. Lerne interaktiv mit anatomischen Vektormodellen und Hotspots für Schule und Praxis!
            </p>

            {/* Gesamtkurs-Fortschritt */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>{completedModulesCount} von {courseData.modules.length} Modulen gemeistert</span>
                <span className="text-amber-400 font-black">{overallPercent}%</span>
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

        {/* Teaser für interaktive Vektorgrafiken */}
        <Link
          href="/module/m1"
          className="block bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/30 hover:border-sky-400/60 rounded-2xl p-3.5 shadow-md group active:scale-[0.99] transition-all focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-100 group-hover:text-sky-300 transition-colors">
                  Interaktive Vektorgrafiken
                </span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-1.5 py-0.5 rounded-sm">
                  Neu
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                Zahnaufbau, Parodontium &amp; Zahnschema interaktiv erkunden
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </Link>

        {/* Roadmap Guide Header */}
        <div className="flex items-center justify-center gap-2 py-1">
          <div className="h-px bg-slate-800/80 flex-1" />
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full shadow-xs">
            Lernmodule • Modules d&apos;apprentissage
          </span>
          <div className="h-px bg-slate-800/80 flex-1" />
        </div>

        {/* Roadmap Serpentine Path */}
        <div className="py-2 flex flex-col items-center">
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
        <div className="mt-4 pt-4 border-t border-slate-800">
          <Link
            href="/glossary"
            className="w-full bg-[#0f172a] border border-slate-800 hover:border-sky-500/50 hover:bg-slate-850 active:scale-[0.99] rounded-2xl p-4 flex items-center justify-between group transition-all shadow-md focus-visible:ring-2 focus-visible:ring-sky-400 outline-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-100 text-sm group-hover:text-violet-300 transition-colors">
                  ZFA-Fachwörterbuch
                </h3>
                <p className="text-xs text-sky-400 font-semibold">
                  Dictionnaire médical (DE / FR / Latein)
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Didaktischer Lerntipp */}
        <div className="bg-slate-900/60 border border-slate-800/70 rounded-2xl p-3 text-center text-slate-400 text-xs">
          <p className="font-medium">
            💡 <span className="font-bold text-slate-200">Erstmal ganz in Ruhe:</span> Lerne täglich 5 Minuten, um deine Streak zu halten und Fachbegriffe sicher zu beherrschen!
          </p>
        </div>
      </div>
    </MobileContainer>
  );
}
