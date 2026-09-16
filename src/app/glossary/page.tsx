'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { courseData } from '@/data/courseData';
import { ArrowLeft, Search, BookOpen, Volume2, Sparkles } from 'lucide-react';
import { VocabItem } from '@/types/course';
import { sounds } from '@/lib/sound';

interface GlossaryEntry extends VocabItem {
  moduleTitleDe: string;
  moduleTitleFr: string;
  category: string;
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract all vocabulary items from courseData
  const allEntries: GlossaryEntry[] = useMemo(() => {
    const list: GlossaryEntry[] = [];

    courseData.modules.forEach((mod) => {
      mod.lessons.forEach((lesson) => {
        if (lesson.type === 'vocabulary') {
          lesson.vocab.forEach((v) => {
            list.push({
              ...v,
              moduleTitleDe: mod.titleDe,
              moduleTitleFr: mod.titleFr,
              category: mod.id,
            });
          });
        }
      });
    });

    return list;
  }, []);

  const categories = [
    { id: 'all', nameDe: 'Alle', nameFr: 'Tous' },
    { id: 'modul-1', nameDe: 'Zahnaufbau', nameFr: 'Structure' },
    { id: 'modul-2', nameDe: 'Hartsubstanzen', nameFr: 'Tissus' },
    { id: 'modul-3', nameDe: 'Zahnarten', nameFr: 'Types' },
    { id: 'modul-4', nameDe: 'FDI-Schema', nameFr: 'Schéma FDI' },
    { id: 'modul-5', nameDe: 'Hygiene', nameFr: 'Hygiène' },
  ];

  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allEntries.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCat) return false;

      if (!q) return true;
      return (
        item.de.toLowerCase().includes(q) ||
        (item.latin && item.latin.toLowerCase().includes(q)) ||
        item.fr.toLowerCase().includes(q) ||
        (item.noteDe && item.noteDe.toLowerCase().includes(q))
      );
    });
  }, [allEntries, searchQuery, selectedCategory]);

  return (
    <MobileContainer className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200/80 flex items-center justify-between">
        <Link
          href="/"
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Roadmap</span>
        </Link>

        <div className="text-center">
          <h1 className="text-sm font-black text-slate-900 leading-tight">
            ZFA Fachwörterbuch
          </h1>
          <span className="text-[10px] font-semibold text-indigo-600 block">
            Dictionnaire médical (DE / Latein / FR)
          </span>
        </div>

        <div className="w-8" />
      </div>

      <div className="p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Begriff suchen / Chercher un mot..."
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.nameDe}
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <div className="text-[11px] font-bold text-slate-400 px-1">
          {filteredEntries.length} Einträge gefunden / entrées trouvées
        </div>

        {/* Glossary List */}
        <div className="space-y-2.5">
          {filteredEntries.map((entry, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-2 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">
                    {entry.de}
                  </h3>
                  {entry.latin && (
                    <span className="inline-block mt-0.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      {entry.latin}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {entry.moduleTitleDe}
                </span>
              </div>

              {/* French translation */}
              <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100/70">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">
                  Französisch / Français
                </span>
                <p className="text-xs sm:text-sm font-bold text-indigo-950">
                  {entry.fr}
                </p>
              </div>

              {/* Practice Notes */}
              {(entry.noteDe || entry.noteFr) && (
                <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
                  {entry.noteDe && <p className="text-slate-700">📌 {entry.noteDe}</p>}
                  {entry.noteFr && <p className="italic text-indigo-900/80">🇫🇷 {entry.noteFr}</p>}
                </div>
              )}
            </div>
          ))}

          {filteredEntries.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">
                Keine passenden Fachbegriffe gefunden.
              </p>
              <p className="text-[11px] text-slate-400">
                Aucun terme médical correspondant.
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
}
