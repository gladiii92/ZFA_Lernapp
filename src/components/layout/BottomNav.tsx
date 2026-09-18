'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, BookOpen, Compass } from 'lucide-react';
import { sounds } from '@/lib/sound';

export function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isGlossary = pathname === '/glossary';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto bg-[#0f172a]/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl px-6 py-2 flex items-center justify-around pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] select-none"
      aria-label="Hauptnavigation"
    >
      {/* 1. Lernstraße (Roadmap) */}
      <Link
        href="/"
        onClick={() => sounds.playClick()}
        className={`flex flex-col items-center justify-center min-h-[44px] min-w-[64px] rounded-xl transition-all active:scale-90 ${
          isHome ? 'text-sky-400 font-extrabold' : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-current={isHome ? 'page' : undefined}
      >
        <Map className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Roadmap</span>
      </Link>

      {/* 2. Interaktive Grafiken Shortcut */}
      <Link
        href="/module/modul-1"
        onClick={() => sounds.playClick()}
        className="flex flex-col items-center justify-center min-h-[44px] min-w-[64px] rounded-xl text-slate-400 hover:text-emerald-400 transition-all active:scale-90"
      >
        <Compass className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Grafiken</span>
      </Link>

      {/* 3. Fachwörterbuch */}
      <Link
        href="/glossary"
        onClick={() => sounds.playClick()}
        className={`flex flex-col items-center justify-center min-h-[44px] min-w-[64px] rounded-xl transition-all active:scale-90 ${
          isGlossary ? 'text-violet-400 font-extrabold' : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-current={isGlossary ? 'page' : undefined}
      >
        <BookOpen className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Glossar</span>
      </Link>
    </nav>
  );
}

