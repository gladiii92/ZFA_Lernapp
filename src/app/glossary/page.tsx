'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { BottomNav } from '@/components/layout/BottomNav';
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

  // Alle Vokabeln dynamisch aus courseData aggregieren
  const allEntries: GlossaryEntry[] = useMemo(() => {
    const list: GlossaryEntry[] = [];

    courseData.modules.forEach((mod) => {
      mod.lessons.forEach((lesson) => {
        if (lesson.type === 'vocabulary' && lesson.vocab) {
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

  // Kategorien dynamisch aus den Modulen generieren
  const categories = useMemo(() => {
    return [
      { id: 'all', nameDe: 'Alle', nameFr: 'Tous' },
      ...courseData.modules.map((mod) => ({
        id: mod.id,
        nameDe: mod.titleDe.split('&')[0].split(':')[0].trim(),
        nameFr: mod.titleFr.split('&')[0].split(':')[0].trim(),
      })),
    ];
  }, []);

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
        (item.noteDe && item.noteDe.toLowerCase().includes(q)) ||
        (item.noteFr && item.noteFr.toLowerCase().includes(q))
      );
    });
  }, [allEntries, searchQuery, selectedCategory]);

  return (
    <MobileContainer className="bg-[#0f172a] min-h-screen pb-safe pb-24 touch-manipulation">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => sounds.playClick()}
          className="p-2 -ml-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-bold active:scale-95"
          aria-label="Zurück zur Startseite"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Roadmap</span>
        </Link>

        <div className="text-center">
          <h1 className="text-sm font-black text-slate-100 leading-tight">
            ZFA Fachwörterbuch
          </h1>
          <span className="text-[10px] font-semibold text-sky-400 block">
            Dictionnaire médical (DE / Latein / FR)
          </span>
        </div>

        <div className="w-8" />
      </div>

      <div className="p-4 space-y-3.5">
        {/* Suchfeld */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Begriff suchen • Chercher un terme..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-10 pr-10 py-3 text-base sm:text-sm font-medium text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 shadow-md transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Suche leeren"
            >
              ✕
            </button>
          )}
        </div>

        {/* Kategoriefilter-Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar px-1 -mx-1 snap-x touch-pan-x">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`min-h-[44px] text-xs px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border active:scale-95 flex items-center justify-center ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20 font-black'
                    : 'bg-slate-900 text-slate-300 border-slate-700/70 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat.nameDe}
              </button>
            );
          })}
        </div>

        {/* Zähler & Status */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-1">
          <span>{filteredEntries.length} Einträge gefunden</span>
          <span className="text-sky-400 font-mono">{allEntries.length} Gesamt</span>
        </div>

        {/* Glossar-Kartenliste */}
        <div className="space-y-2.5">
          {filteredEntries.map((entry, idx) => (
            <div
              key={idx}
              className="bg-slate-900/95 rounded-2xl p-4 border border-slate-800 shadow-md space-y-2.5 hover:border-slate-700 transition-all animate-fade-in"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-slate-100 text-base leading-snug">
                    {entry.de}
                  </h3>
                  {entry.latin && (
                    <span className="inline-block mt-0.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                      {entry.latin}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 border border-slate-700/60 px-2 py-0.5 rounded-md shrink-0">
                  {entry.moduleTitleDe.split(' ')[0]}
                </span>
              </div>

              {/* Französische Übersetzung */}
              <div className="bg-sky-500/10 p-3 rounded-xl border border-sky-500/20">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                  Französisch • Français
                </span>
                <p className="text-sm font-extrabold text-sky-100">
                  {entry.fr}
                </p>
              </div>

              {/* Praxisnotizen */}
              {(entry.noteDe || entry.noteFr) && (
                <div className="text-[11px] text-slate-400 space-y-0.5 pt-1.5 border-t border-slate-800">
                  {entry.noteDe && <p className="text-slate-300">📌 {entry.noteDe}</p>}
                  {entry.noteFr && <p className="italic text-sky-400/80">🇫🇷 {entry.noteFr}</p>}
                </div>
              )}
            </div>
          ))}

          {filteredEntries.length === 0 && (
            <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-bold text-slate-300">
                Keine passenden Fachbegriffe gefunden.
              </p>
              <p className="text-xs text-slate-500">
                Aucun terme médical correspondant à votre recherche.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </MobileContainer>
  );
}

