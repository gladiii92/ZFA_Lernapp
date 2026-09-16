'use client';

import React from 'react';
import Link from 'next/link';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { Header } from '@/components/layout/Header';
import { ModuleNode } from '@/components/roadmap/ModuleNode';
import { courseData } from '@/data/courseData';
import { useProgress } from '@/context/ProgressContext';
import { BookOpen, Sparkles, Award, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { progress, isLoaded } = useProgress();

  const completedModulesCount = courseData.modules.filter((m) =>
    progress.completedModuleIds.includes(m.id)
  ).length;

  return (
    <MobileContainer>
      <Header />

      {/* Main Scrollable Content */}
      <div className="flex-1 px-4 py-4 space-y-6 pb-12">
        {/* Welcome Hero Card */}
        <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-xs" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-400/20 rounded-full blur-sm" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold mb-3 border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>1. Ausbildungsjahr • 1re année</span>
            </div>

            <h1 className="text-xl font-black leading-tight tracking-tight">
              ZFA Lernstraße
            </h1>
            <p className="text-emerald-100 font-semibold text-xs mt-0.5">
              Parcours d&apos;apprentissage ZFA
            </p>

            <p className="text-xs text-emerald-50/90 mt-2.5 leading-relaxed font-medium">
              Einfache Erklärungen auf Deutsch mit französischer Übersetzung. Lerne spielerisch für Schule und Praxis!
            </p>

            {/* Quick stats mini-row */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold">
              <span>{completedModulesCount} von {courseData.modules.length} Modulen gemeistert</span>
              <span className="text-amber-300">{progress.totalXp} XP</span>
            </div>
          </div>
        </div>

        {/* Roadmap Guide Text */}
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            Lernmodule • Modules d&apos;apprentissage
          </span>
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

        {/* Floating / Bottom Shortcut to Glossary */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <Link
            href="/glossary"
            className="w-full bg-white border-2 border-slate-200 border-b-4 border-b-slate-300 rounded-2xl p-4 flex items-center justify-between group hover:border-emerald-400 active:border-b-2 active:translate-y-0.5 transition-all shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                  ZFA-Fachwörterbuch
                </h3>
                <p className="text-xs text-indigo-700 font-semibold">
                  Dictionnaire médical (DE / FR / Latein)
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </MobileContainer>
  );
}
