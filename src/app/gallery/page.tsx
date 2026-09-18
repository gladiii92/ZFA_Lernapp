'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import {
  ArrowLeft,
  Compass,
  Search,
  Sparkles,
  Layers,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Eye,
  Flame,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

type FilterCategory = 'all' | 'surfaces' | 'anatomy' | 'periodontium' | 'fdi' | 'caries';
type LanguageFilter = 'both' | 'de' | 'fr';

interface ToothSurfaceInfo {
  id: string;
  nameDe: string;
  nameFr: string;
  abbr: string;
  descDe: string;
  descFr: string;
  mnemonic: string;
}

const SURFACES_DATA: Record<string, ToothSurfaceInfo> = {
  occlusal: {
    id: 'occlusal',
    nameDe: 'Okklusal (Kaufläche)',
    nameFr: 'Occlusale (face triturante)',
    abbr: 'O',
    descDe: 'Die Kaufläche der Seitenzähne (Molaren und Prämolaren). Bei Frontzähnen spricht man von der Inzisalkante (I).',
    descFr: 'La surface masticatrice des molaires et prémolaires. Pour les dents antérieures, on parle de bord incisif (I).',
    mnemonic: 'O = Oben auf der Kaufläche / Occlusion (Zusammenbiss)',
  },
  mesial: {
    id: 'mesial',
    nameDe: 'Mesial (Zur Kiefermitte)',
    nameFr: 'Mésiale (vers la ligne médiane)',
    abbr: 'M',
    descDe: 'Die zum Zahnbogenmittelpunkt (Zahnbogenmitte) hin gerichtete Approximalfläche des Zahns.',
    descFr: 'La face proximale orientée vers la ligne médiane de l\'arcade dentaire.',
    mnemonic: 'M = Mitte (immer zur Mitte des Gesichts gerichtet)',
  },
  distal: {
    id: 'distal',
    nameDe: 'Distal (Zum Kieferende)',
    nameFr: 'Distale (éloignée de la ligne médiane)',
    abbr: 'D',
    descDe: 'Die vom Zahnbogenmittelpunkt abgewandte Approximalfläche, Richtung Kieferwinkel.',
    descFr: 'La face proximale tournée vers le fond de la cavité buccale, à l\'opposé de la ligne médiane.',
    mnemonic: 'D = Distanz (weit weg von der Kiefermitte)',
  },
  vestibular: {
    id: 'vestibular',
    nameDe: 'Vestibulär / Bukkal / Labial',
    nameFr: 'Vestibulaire / Buccale / Labiale',
    abbr: 'B / V',
    descDe: 'Zum Mundvorhof (Vestibulum) gerichtet. Bei Frontzähnen: labial (zu den Lippen). Bei Seitenzähnen: bukkal (zur Wange/Backe).',
    descFr: 'Tournée vers le vestibule buccal. Dents antérieures: labiale (lèvres). Dents postérieures: buccale (joue).',
    mnemonic: 'B = Backe / V = Vorhof des Mundes',
  },
  oral: {
    id: 'oral',
    nameDe: 'Oral / Lingual / Palatinal',
    nameFr: 'Orale / Linguale / Palatine',
    abbr: 'L / P',
    descDe: 'Zur Mundhöhle hin gerichtet. Im Unterkiefer: lingual (zur Zunge). Im Oberkiefer: palatinal (zum harten Gaumen).',
    descFr: 'Tournée vers l\'intérieur de la bouche. Maxillaire (haut): palatine (palais). Mandibule (bas): linguale (langue).',
    mnemonic: 'L = Lingua (Zunge im UK) / P = Palatum (Gaumen im OK)',
  },
};

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('both');

  // Interaktive Zustände für Grafiken
  const [selectedSurface, setSelectedSurface] = useState<string>('occlusal');
  const [isUpperJaw, setIsUpperJaw] = useState<boolean>(false); // false = Unterkiefer (Lingual), true = Oberkiefer (Palatinal)
  const [selectedAnatomyLayer, setSelectedAnatomyLayer] = useState<string>('enamel');
  const [selectedParoPart, setSelectedParoPart] = useState<string>('desmodont');
  const [selectedFdiQuadrant, setSelectedFdiQuadrant] = useState<number>(1);
  const [selectedCariesStage, setSelectedCariesStage] = useState<number>(1);

  const activeSurfaceInfo = SURFACES_DATA[selectedSurface] || SURFACES_DATA.occlusal;

  // Filter-Logik für Suche
  const matchesSearch = (terms: string[]) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return terms.some((t) => t.toLowerCase().includes(q));
  };

  return (
    <MobileContainer>
      <Header />

      <main className="flex-1 px-2.5 sm:px-4 py-2.5 sm:py-4 space-y-3.5 sm:space-y-5 pb-28 overflow-y-auto overflow-x-hidden w-full max-w-full text-slate-100 box-border">
        {/* Navigations-Rücksprung & Titel */}
        <div className="flex items-center justify-between gap-2 w-full max-w-full min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700/60 focus-visible:ring-2 focus-visible:ring-sky-400 outline-none min-h-[44px] shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Zurück<span className="hidden xs:inline sm:inline"> zur Startseite</span></span>
          </Link>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] bg-sky-500/10 border border-sky-500/30 text-sky-300 px-2 sm:px-2.5 py-1 rounded-full font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">8 Schaubilder</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-sky-500/15 border border-sky-500/30 px-2 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-xs font-bold mb-2 sm:mb-2.5 text-sky-300 max-w-full">
              <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">Zentrale Grafik-Galerie • Galerie d&apos;illustrations</span>
            </div>

            <h1 className="text-base sm:text-xl font-black text-slate-100 tracking-tight leading-tight break-words">
              Anatomische Schaubilder &amp; Vektormodelle
            </h1>
            <p className="text-[10.5px] sm:text-xs text-sky-400 font-semibold mt-0.5 break-words">
              Toutes les illustrations anatomiques avec explications bilingues (DE / FR)
            </p>

            <p className="text-[11px] sm:text-xs text-slate-300 mt-2 sm:mt-2.5 leading-relaxed font-normal break-words">
              Alle Grafiken der Lernstraße an einem zentralen Ort zusammengefasst. Nutze die interaktiven Hotspots, Eselsbrücken und Umschalter für deine optimale Prüfungsvorbereitung!
            </p>
          </div>
        </div>

        {/* Suchfeld & Sprachfilter */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-3.5 shadow-md space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Grafik oder Begriff suchen (z. B. Okklusal, Émail, D3, Parodont)..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
            />
          </div>

          {/* Sprachanzeige-Filter */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400">Sprache / Langue:</span>
            <div className="inline-flex p-0.5 bg-slate-900 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setLanguageFilter('both')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageFilter === 'both'
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                DE &amp; FR
              </button>
              <button
                type="button"
                onClick={() => setLanguageFilter('de')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageFilter === 'de'
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Nur DE 🇩🇪
              </button>
              <button
                type="button"
                onClick={() => setLanguageFilter('fr')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageFilter === 'fr'
                    ? 'bg-sky-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                FR 🇫🇷
              </button>
            </div>
          </div>
        </div>

        {/* Themen-Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              categoryFilter === 'all'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            Alle (8)
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('surfaces')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              categoryFilter === 'surfaces'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            Zahnflächen (Eckig)
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('anatomy')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              categoryFilter === 'anatomy'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            Zahnaufbau
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('periodontium')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              categoryFilter === 'periodontium'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            Parodontium
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('fdi')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              categoryFilter === 'fdi'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            FDI-Schema
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('caries')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              categoryFilter === 'caries'
                ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sm'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            Karies D1–D4
          </button>
        </div>

        {/* =========================================================================
            GRAFIK 1: ECKIGES ZAHNFLÄCHEN-KÄSTCHENSCHEMA (Informationsmaterial.pdf)
           ========================================================================= */}
        {(categoryFilter === 'all' || categoryFilter === 'surfaces') &&
          matchesSearch([
            'Zahnflächen',
            'Kästchenschema',
            'Okklusal',
            'Mesial',
            'Distal',
            'Bukkal',
            'Vestibulär',
            'Oral',
            'Lingual',
            'Palatinal',
            'occlusale',
            'mésiale',
            'distale',
            'vestibulaire',
            'linguale',
          ]) && (
            <section className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Schaubild 1 • Schéma 1
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      Eckig (Informationsmaterial.pdf)
                    </span>
                  </div>
                  <h2 className="text-base font-black text-slate-100 mt-1">
                    Eckiges Zahnflächen-Kästchenschema
                  </h2>
                  <p className="text-xs text-sky-400 font-semibold">
                    Schéma des 5 faces dentaires (Informationsmaterial)
                  </p>
                </div>

                {/* Kiefer-Umschalter OK/UK */}
                <button
                  type="button"
                  onClick={() => setIsUpperJaw(!isUpperJaw)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700 transition-all text-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <RotateCcw className="w-3 h-3 text-sky-400" />
                  <span>{isUpperJaw ? 'OK: Palatinal (Gaumen)' : 'UK: Lingual (Zunge)'}</span>
                </button>
              </div>

              {/* Interaktive SVG-Fläche (Eckiges Kästchenschema) */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 240 240"
                  className="w-56 h-56 max-w-full drop-shadow-xl select-none"
                  role="img"
                  aria-label="Eckiges Kästchenschema der 5 Zahnflächen"
                >
                  {/* Hintergrundkontur */}
                  <rect x="15" y="15" width="210" height="210" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="2" />

                  {/* Oben: Vestibulär / Bukkal (B) */}
                  <polygon
                    points="30,30 210,30 170,70 70,70"
                    fill={selectedSurface === 'vestibular' ? '#38bdf8' : '#1e293b'}
                    stroke="#020617"
                    strokeWidth="3"
                    className="cursor-pointer transition-colors duration-200 hover:fill-sky-400/80"
                    onClick={() => setSelectedSurface('vestibular')}
                  />
                  <text
                    x="120"
                    y="54"
                    textAnchor="middle"
                    fill={selectedSurface === 'vestibular' ? '#020617' : '#94a3b8'}
                    className="font-black text-xs pointer-events-none tracking-wider"
                  >
                    BUKKAL (B)
                  </text>

                  {/* Links: Mesial (M) */}
                  <polygon
                    points="30,30 70,70 70,170 30,210"
                    fill={selectedSurface === 'mesial' ? '#34d399' : '#1e293b'}
                    stroke="#020617"
                    strokeWidth="3"
                    className="cursor-pointer transition-colors duration-200 hover:fill-emerald-400/80"
                    onClick={() => setSelectedSurface('mesial')}
                  />
                  <text
                    x="50"
                    y="125"
                    textAnchor="middle"
                    fill={selectedSurface === 'mesial' ? '#020617' : '#94a3b8'}
                    className="font-black text-xs pointer-events-none tracking-wider"
                  >
                    M
                  </text>

                  {/* Mitte: Okklusal (O) */}
                  <rect
                    x="70"
                    y="70"
                    width="100"
                    height="100"
                    fill={selectedSurface === 'occlusal' ? '#f59e0b' : '#334155'}
                    stroke="#020617"
                    strokeWidth="3"
                    className="cursor-pointer transition-colors duration-200 hover:fill-amber-400/80"
                    onClick={() => setSelectedSurface('occlusal')}
                  />
                  <text
                    x="120"
                    y="118"
                    textAnchor="middle"
                    fill={selectedSurface === 'occlusal' ? '#020617' : '#f8fafc'}
                    className="font-black text-sm pointer-events-none tracking-widest"
                  >
                    OKKLUSAL
                  </text>
                  <text
                    x="120"
                    y="134"
                    textAnchor="middle"
                    fill={selectedSurface === 'occlusal' ? '#020617' : '#cbd5e1'}
                    className="font-extrabold text-[10px] pointer-events-none"
                  >
                    (O)
                  </text>

                  {/* Rechts: Distal (D) */}
                  <polygon
                    points="210,30 170,70 170,170 210,210"
                    fill={selectedSurface === 'distal' ? '#a78bfa' : '#1e293b'}
                    stroke="#020617"
                    strokeWidth="3"
                    className="cursor-pointer transition-colors duration-200 hover:fill-violet-400/80"
                    onClick={() => setSelectedSurface('distal')}
                  />
                  <text
                    x="190"
                    y="125"
                    textAnchor="middle"
                    fill={selectedSurface === 'distal' ? '#020617' : '#94a3b8'}
                    className="font-black text-xs pointer-events-none tracking-wider"
                  >
                    D
                  </text>

                  {/* Unten: Oral / Lingual (L) bzw. Palatinal (P) */}
                  <polygon
                    points="30,210 70,170 170,170 210,210"
                    fill={selectedSurface === 'oral' ? '#fb7185' : '#1e293b'}
                    stroke="#020617"
                    strokeWidth="3"
                    className="cursor-pointer transition-colors duration-200 hover:fill-rose-400/80"
                    onClick={() => setSelectedSurface('oral')}
                  />
                  <text
                    x="120"
                    y="194"
                    textAnchor="middle"
                    fill={selectedSurface === 'oral' ? '#020617' : '#94a3b8'}
                    className="font-black text-xs pointer-events-none tracking-wider"
                  >
                    {isUpperJaw ? 'PALATINAL (P)' : 'LINGUAL (L)'}
                  </text>
                </svg>

                <p className="text-[11px] text-slate-400 mt-2 font-medium">
                  Tippe auf eine Fläche im Kästchenschema für die zweisprachige Erklärung!
                </p>
              </div>

              {/* Schnellauswahl-Buttons */}
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'vestibular', label: 'B (Bukkal)' },
                  { id: 'mesial', label: 'M (Mesial)' },
                  { id: 'occlusal', label: 'O (Okklusal)' },
                  { id: 'distal', label: 'D (Distal)' },
                  { id: 'oral', label: isUpperJaw ? 'P (Palatinal)' : 'L (Lingual)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedSurface(item.id)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all truncate ${
                      selectedSurface === item.id
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Zweisprachige Detail-Karte */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-400 tracking-wide">
                    Fläche: {activeSurfaceInfo.abbr}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                    Kästchenschema
                  </span>
                </div>

                {(languageFilter === 'both' || languageFilter === 'de') && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span>🇩🇪 Deutsch:</span>
                      <span className="text-slate-100 font-extrabold">{activeSurfaceInfo.nameDe}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {activeSurfaceInfo.descDe}
                    </p>
                  </div>
                )}

                {(languageFilter === 'both' || languageFilter === 'fr') && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <h3 className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                      <span>🇫🇷 Français:</span>
                      <span className="text-sky-200 font-extrabold">{activeSurfaceInfo.nameFr}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {activeSurfaceInfo.descFr}
                    </p>
                  </div>
                )}

                {/* Didaktische Eselsbrücke */}
                <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-2.5 text-xs text-amber-200">
                  <span className="font-bold">💡 ZFA-Eselsbrücke: </span>
                  <span>{activeSurfaceInfo.mnemonic}</span>
                </div>
              </div>
            </section>
          )}

        {/* =========================================================================
            GRAFIK 2: ANATOMISCHER ZAHNAUFBAU (Krone, Hals, Wurzel & Schichten)
           ========================================================================= */}
        {(categoryFilter === 'all' || categoryFilter === 'anatomy') &&
          matchesSearch([
            'Zahnaufbau',
            'Schmelz',
            'Dentin',
            'Pulpa',
            'Wurzelkanal',
            'Zement',
            'Apex',
            'émail',
            'dentine',
            'pulpe',
            'cément',
          ]) && (
            <section className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Schaubild 2 • Schéma 2
                </span>
                <h2 className="text-base font-black text-slate-100 mt-1">
                  Anatomischer Zahnaufbau &amp; Schichten
                </h2>
                <p className="text-xs text-sky-400 font-semibold">
                  Anatomie de la dent: couronne, collet, racine et tissus dentaires
                </p>
              </div>

              {/* Anatomisches SVG-Schnittbild */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center justify-center">
                <svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-2xl">
  <defs>
    <linearGradient id="enamelGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#e2e8f0" />
    </linearGradient>
  </defs>
  <rect x="20" y="300" width="360" height="280" fill={selectedAnatomyLayer === 'bone' ? '#fde047' : '#e2e8f0'} onClick={() => setSelectedAnatomyLayer('bone')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" rx="8" />
  <rect x="20" y="250" width="100" height="50" fill={selectedAnatomyLayer === 'gingiva' ? '#fb7185' : '#fca5a5'} onClick={() => setSelectedAnatomyLayer('gingiva')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="280" y="250" width="100" height="50" fill={selectedAnatomyLayer === 'gingiva' ? '#fb7185' : '#fca5a5'} onClick={() => setSelectedAnatomyLayer('gingiva')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="110" y="290" width="180" height="280" fill={selectedAnatomyLayer === 'desmodont' ? '#a3e635' : '#bef264'} onClick={() => setSelectedAnatomyLayer('desmodont')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="120" y="290" width="160" height="270" fill={selectedAnatomyLayer === 'cementum' ? '#f59e0b' : '#fcd34d'} onClick={() => setSelectedAnatomyLayer('cementum')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" />
  <rect x="130" y="100" width="140" height="450" fill="#fef08a" stroke={selectedAnatomyLayer === 'dentin' ? '#ca8a04' : 'transparent'} strokeWidth="4" onClick={() => setSelectedAnatomyLayer('dentin')} className="cursor-pointer transition-all duration-300 hover:brightness-95" />
  <rect x="170" y="130" width="60" height="400" fill={selectedAnatomyLayer === 'pulp' ? '#ef4444' : '#f87171'} onClick={() => setSelectedAnatomyLayer('pulp')} className="cursor-pointer transition-colors duration-300 hover:brightness-95" rx="20" />
  <rect x="130" y="20" width="140" height="80" fill="url(#enamelGrad)" stroke={selectedAnatomyLayer === 'enamel' ? '#38bdf8' : '#cbd5e1'} strokeWidth="4" onClick={() => setSelectedAnatomyLayer('enamel')} className="cursor-pointer transition-all duration-300 hover:brightness-95" rx="8" />
</svg>

                {/* Layer Selector Chips */}
                <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                  {[
                    { id: 'enamel', label: '1. Schmelz (Émail)', color: 'border-sky-400 text-sky-300' },
                    { id: 'dentin', label: '2. Dentin (Dentine)', color: 'border-amber-400 text-amber-300' },
                    { id: 'pulp', label: '3. Pulpa (Pulpe)', color: 'border-rose-400 text-rose-300' },
                    { id: 'root', label: '4. Wurzel & Apex', color: 'border-emerald-400 text-emerald-300' },
                  ].map((layer) => (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setSelectedAnatomyLayer(layer.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                        selectedAnatomyLayer === layer.id
                          ? 'bg-slate-800 shadow-md ' + layer.color
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {layer.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail-Erklärung zur ausgewählten Schicht */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                {selectedAnatomyLayer === 'enamel' && (
                  <>
                    <h3 className="text-xs font-black text-sky-300">
                      Zahnschmelz (Enamelum / Émail dentaire)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Die härteste Substanz des menschlichen Körpers (ca. 96 % anorganisch, Hydroxylapatit). Bildet die schützende Außenhülle der Zahnkrone und enthält weder Nerven noch Blutgefäße.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
                      <strong className="text-sky-300">FR:</strong> La substance la plus dure du corps humain (96 % de matière minérale). Recouvre la couronne anatomique et protège contre les agressions mécaniques et acides.
                    </p>
                  </>
                )}

                {selectedAnatomyLayer === 'dentin' && (
                  <>
                    <h3 className="text-xs font-black text-amber-300">
                      Dentin / Zahnbein (Dentina / Dentine)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Bildet die Hauptmasse des Zahns. Ist elastischer als der Schmelz und von mikroskopischen Dentinkanälchen (Tubuli) durchzogen, die Reize wie Kälte und Wärme an die Pulpa leiten.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
                      <strong className="text-amber-300">FR:</strong> Constitue la majeure partie de la dent. Traversée par les tubules dentinaires responsables de la transmission de la sensibilité thermique.
                    </p>
                  </>
                )}

                {selectedAnatomyLayer === 'pulp' && (
                  <>
                    <h3 className="text-xs font-black text-rose-300">
                      Zahnpulpa / Zahnmark (Pulpa dentis / Pulpe dentaire)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Das gefäß- und nervenreiche Weichgewebe im Inneren des Zahns. Ernährt das Dentin und reagiert bei Entzündung (Pulpitis) mit starken Zahnschmerzen.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
                      <strong className="text-rose-300">FR:</strong> Tissu conjonctif lâche riche en vaisseaux et terminaisons nerveuses au centre de la dent, responsable de la vitalité dentaire.
                    </p>
                  </>
                )}

                {selectedAnatomyLayer === 'root' && (
                  <>
                    <h3 className="text-xs font-black text-emerald-300">
                      Zahnwurzel &amp; Apex (Radix dentis &amp; Foramen apicale)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Verankert den Zahn im Alveolarknochen. An der Wurzelspitze (Apex) treten durch das Foramen apicale Blutgefäße und Nervenstränge in den Wurzelkanal ein.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
                      <strong className="text-emerald-300">FR:</strong> Ancre la dent dans l&apos;os alvéolaire. À l&apos;apex dentaire, le foramen apical laisse passer les vaisseaux et le nerf dentaire.
                    </p>
                  </>
                )}
              </div>
            </section>
          )}

        {/* =========================================================================
            GRAFIK 3: PARODONTIUM (Zahnhalteapparat mit den 4 Strukturen)
           ========================================================================= */}
        {(categoryFilter === 'all' || categoryFilter === 'periodontium') &&
          matchesSearch([
            'Parodontium',
            'Zahnhalteapparat',
            'Gingiva',
            'Desmodont',
            'Wurzelhaut',
            'Sharpey',
            'Alveolarknochen',
            'Zement',
            'parodonte',
            'gencive',
          ]) && (
            <section className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Schaubild 3 • Schéma 3
                </span>
                <h2 className="text-base font-black text-slate-100 mt-1">
                  Parodontium (Zahnhalteapparat)
                </h2>
                <p className="text-xs text-sky-400 font-semibold">
                  Le parodonte: les 4 tissus de soutien et de suspension de la dent
                </p>
              </div>

              {/* Parodont-Struktur Schema */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center">
                <svg
                  viewBox="0 0 240 200"
                  className="w-56 h-48 max-w-full drop-shadow-xl select-none"
                  role="img"
                  aria-label="Die 4 Komponenten des Parodontiums"
                >
                  {/* Knochenbasis */}
                  <rect x="20" y="80" width="80" height="110" rx="6" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                  <text x="60" y="140" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold">
                    Alveolarknochen
                  </text>

                  {/* Gingiva (Zahnfleisch) */}
                  <path d="M20 80 Q60 50 100 70 L100 85 L20 85 Z" fill="#fb7185" />
                  <text x="55" y="68" textAnchor="middle" fill="#ffffff" className="text-[9px] font-black">
                    Gingiva
                  </text>

                  {/* Desmodont (Wurzelhaut / Sharpey-Fasern) */}
                  <rect x="100" y="70" width="25" height="120" fill="#38bdf8" opacity="0.8" />
                  {/* Fasern */}
                  <line x1="100" y1="85" x2="125" y2="85" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="100" y1="105" x2="125" y2="105" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="100" y1="125" x2="125" y2="125" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="100" y1="145" x2="125" y2="145" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="100" y1="165" x2="125" y2="165" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Wurzelzement & Wurzel */}
                  <rect x="125" y="70" width="15" height="120" fill="#34d399" />
                  <rect x="140" y="40" width="80" height="150" rx="8" fill="#fef08a" stroke="#1e293b" strokeWidth="2" />
                  <text x="180" y="110" textAnchor="middle" fill="#854d0e" className="text-[11px] font-extrabold">
                    Zahnwurzel
                  </text>
                </svg>

                {/* Die 4 Säulen des Zahnhalteapparats als Kacheln */}
                <div className="grid grid-cols-2 gap-2 w-full mt-3">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-rose-300">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span>1. Gingiva</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Zahnfleisch (epitheliale Manschette / Gencive)</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-sky-300">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span>2. Desmodont</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Wurzelhaut mit Sharpey-Fasern (Ligament)</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>3. Wurzelzement</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Cementum (überzieht die Wurzel / Cément)</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>4. Alveolarknochen</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">Knöchernes Zahnfach (Os alveolare / Os alvéolaire)</p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/25 rounded-2xl p-3.5 text-xs text-violet-200">
                <p className="font-semibold">
                  💡 <strong className="text-violet-100">Funktion des Parodontiums:</strong> Es dient als elastischer Stoßdämpfer beim Kauen! Die kollagenen Sharpey-Fasern federn extrem hohe Kaukontaktkräfte ab und transformieren Druckbelastung in Zugspannung am Knochen.
                </p>
              </div>
            </section>
          )}

        {/* =========================================================================
            GRAFIK 4: FDI-ZAHNSCHEMA & QUADRANTENSYSTEM (ISO 3950)
           ========================================================================= */}
        {(categoryFilter === 'all' || categoryFilter === 'fdi') &&
          matchesSearch([
            'FDI',
            'Schema',
            'Quadrant',
            'ISO 3950',
            'Zahnbezeichnung',
            'Schneidezahn',
            'Molar',
            'système dentaire',
          ]) && (
            <section className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Schaubild 4 • Schéma 4
                </span>
                <h2 className="text-base font-black text-slate-100 mt-1">
                  FDI-Zahnschema &amp; Quadranten (ISO 3950)
                </h2>
                <p className="text-xs text-sky-400 font-semibold">
                  Système de numérotation dentaire FDI à deux chiffres
                </p>
              </div>

              {/* Quadranten-Kreuz */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80">
                <div className="text-center mb-2">
                  <span className="text-[11px] font-bold text-slate-400">
                    Blick aus Sicht des Patienten (Rechts ist links im Schema!)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Quadrant 1 */}
                  <button
                    type="button"
                    onClick={() => setSelectedFdiQuadrant(1)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedFdiQuadrant === 1
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black text-xs">
                      <span>Quadrant 1 (OK rechts)</span>
                      <span className="text-[10px] bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded-sm">Q1</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Zähne 18 bis 11</p>
                    <p className="text-[10px] text-sky-400 mt-0.5">Maxillaire droit</p>
                  </button>

                  {/* Quadrant 2 */}
                  <button
                    type="button"
                    onClick={() => setSelectedFdiQuadrant(2)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedFdiQuadrant === 2
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black text-xs">
                      <span>Quadrant 2 (OK links)</span>
                      <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded-sm">Q2</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Zähne 21 bis 28</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">Maxillaire gauche</p>
                  </button>

                  {/* Quadrant 4 */}
                  <button
                    type="button"
                    onClick={() => setSelectedFdiQuadrant(4)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedFdiQuadrant === 4
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black text-xs">
                      <span>Quadrant 4 (UK rechts)</span>
                      <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded-sm">Q4</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Zähne 48 bis 41</p>
                    <p className="text-[10px] text-amber-400 mt-0.5">Mandibule droite</p>
                  </button>

                  {/* Quadrant 3 */}
                  <button
                    type="button"
                    onClick={() => setSelectedFdiQuadrant(3)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedFdiQuadrant === 3
                        ? 'bg-violet-500/20 border-violet-400 text-violet-200 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black text-xs">
                      <span>Quadrant 3 (UK links)</span>
                      <span className="text-[10px] bg-violet-500/30 text-violet-300 px-1.5 py-0.5 rounded-sm">Q3</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Zähne 31 bis 38</p>
                    <p className="text-[10px] text-violet-400 mt-0.5">Mandibule gauche</p>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                <h3 className="font-bold text-slate-200">
                  🔢 Aufbau der 2-Ziffern-Bezeichnung (z. B. Zahn 16):
                </h3>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>
                    <strong className="text-sky-400">1. Ziffer (Quadrant):</strong> Im Uhrzeigersinn (1 = OK rechts, 2 = OK links, 3 = UK links, 4 = UK rechts). Beim Milchgebiss: Quadranten 5, 6, 7 und 8.
                  </li>
                  <li>
                    <strong className="text-sky-400">2. Ziffer (Zahnposition):</strong> Von der Mitte nach distal gezählt (1 = mittlerer Schneidezahn, 3 = Eckzahn, 6 = erster Molar, 8 = Weisheitszahn).
                  </li>
                </ul>
              </div>
            </section>
          )}

        {/* =========================================================================
            GRAFIKEN 5–8: KARIESSTADIEN D1 BIS D4 (Vollständige Kariesprogression)
           ========================================================================= */}
        {(categoryFilter === 'all' || categoryFilter === 'caries') &&
          matchesSearch([
            'Karies',
            'D1',
            'D2',
            'D3',
            'D4',
            'Schmelzkaries',
            'Dentinkaries',
            'Pulpitis',
            'Caries',
            'carie',
            'obturation',
          ]) && (
            <section className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Schaubilder 5–8 • Schémas 5 à 8
                </span>
                <h2 className="text-base font-black text-slate-100 mt-1">
                  Kariesstadien D1 bis D4 (Pathologie &amp; Therapie)
                </h2>
                <p className="text-xs text-sky-400 font-semibold">
                  Les 4 stades carieux: de la déminéralisation à l&apos;atteinte pulpaire
                </p>
              </div>

              {/* 4-Stufen Fortschritts-Wähler */}
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { stage: 1, label: 'D1: Initial', sub: 'Schmelz' },
                  { stage: 2, label: 'D2: Schmelz', sub: 'Superficialis' },
                  { stage: 3, label: 'D3: Dentin', sub: 'Media' },
                  { stage: 4, label: 'D4: Profunda', sub: 'Penetrans' },
                ].map((item) => (
                  <button
                    key={item.stage}
                    type="button"
                    onClick={() => setSelectedCariesStage(item.stage)}
                    className={`py-2 px-1 rounded-xl text-center border transition-all ${
                      selectedCariesStage === item.stage
                        ? 'bg-rose-500 text-slate-950 border-rose-400 font-black shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 font-bold'
                    }`}
                  >
                    <div className="text-[11px] truncate">{item.label}</div>
                    <div className="text-[9px] opacity-80 truncate">{item.sub}</div>
                  </button>
                ))}
              </div>

              {/* Kariesquerschnitt Vektorgrafik */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center">
                <svg
                  viewBox="0 0 240 220"
                  className="w-56 h-52 max-w-full drop-shadow-xl select-none"
                  role="img"
                  aria-label={`Kariesstadium D${selectedCariesStage}`}
                >
                  {/* Schmelzkappe */}
                  <path d="M50 100 C40 40 70 20 120 20 C170 20 200 40 190 100 L175 110 L65 110 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
                  {/* Dentinkern */}
                  <path d="M65 105 C60 60 80 40 120 40 C160 40 180 60 175 105 L160 170 L80 170 Z" fill="#fef08a" stroke="#0f172a" strokeWidth="2" />
                  {/* Pulpenkavum */}
                  <path d="M95 85 C95 70 105 65 120 65 C135 65 145 70 145 85 L135 170 L105 170 Z" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.5" />

                  {/* Kariesläsion je nach Stadium */}
                  {selectedCariesStage === 1 && (
                    <path d="M110 20 L130 20 L120 32 Z" fill="#78716c" stroke="#44403c" strokeWidth="1.5" />
                  )}
                  {selectedCariesStage === 2 && (
                    <path d="M105 20 L135 20 L125 55 L115 55 Z" fill="#78716c" stroke="#44403c" strokeWidth="1.5" />
                  )}
                  {selectedCariesStage === 3 && (
                    <path d="M100 20 L140 20 L130 75 L110 75 Z" fill="#451a03" stroke="#1c1917" strokeWidth="1.5" />
                  )}
                  {selectedCariesStage === 4 && (
                    <>
                      <path d="M95 20 L145 20 L135 100 L105 100 Z" fill="#1c1917" stroke="#0c0a09" strokeWidth="1.5" />
                      {/* Entzündungsherd an Pulpa */}
                      <circle cx="120" cy="110" r="8" fill="#dc2626" className="animate-pulse" />
                    </>
                  )}
                </svg>

                <span className="text-[11px] font-extrabold text-slate-300 mt-2">
                  {selectedCariesStage === 1 && 'D1: Initialkaries / White Spot (Schmelz-Demineralisation ohne Kavität, reversibel)'}
                  {selectedCariesStage === 2 && 'D2: Schmelzkaries / Caries superficialis (Kavität auf Schmelz begrenzt)'}
                  {selectedCariesStage === 3 && 'D3: Dentinkaries / Caries media (Schmelz-Dentin-Grenze überschritten)'}
                  {selectedCariesStage === 4 && 'D4: Caries profunda & penetrans (pulpanahe Läsion / Eröffnung des Pulpenkavums)'}
                </span>
              </div>

              {/* Zweisprachige Detail-Informationen zum gewählten Stadium */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                {selectedCariesStage === 1 && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-emerald-300">
                        D1: Initialkaries (Caries initialis / White Spot)
                      </h3>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                        Reversibel!
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Beginnende Entkalkung (Demineralisation) des Schmelzes durch Bakteriensäuren ohne Oberflächeneinbruch (keine Kavität). Sichtbar als weißer Kreidefleck (&quot;White Spot&quot;). Symptomlos. Durch hochdosierte Fluoridierung und Mundhygiene vollständig remineralisierbar!
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                      <strong className="text-sky-300">FR:</strong> Carie initiale / Tache blanche (Caries initialis / White spot). Déminéralisation sous-surfacique sans cavitation. Entièrement réversible grâce à la fluoration topique et l&apos;hygiène bucco-dentaire.
                    </p>
                  </>
                )}

                {selectedCariesStage === 2 && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-amber-300">
                        D2: Schmelzkaries (Caries superficialis / Oberflächenkaries)
                      </h3>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                        Kavität im Schmelz
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Schmelzeinbruch mit sichtbarer Kavität, aber noch auf den Zahnschmelz begrenzt. Die Schmelz-Dentin-Grenze ist noch nicht überschritten. Therapie: Minimalinvasive Füllungstherapie oder Kariesinfiltration (Icon).
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                      <strong className="text-sky-300">FR:</strong> Carie amélaire (Caries superficialis). Perte de substance et cavitation limitée à l&apos;épaisseur de l&apos;émail. Traitement : Restauration micro-invasive ou infiltration.
                    </p>
                  </>
                )}

                {selectedCariesStage === 3 && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-amber-400">
                        D3: Dentinkaries (Caries media / Mittlere Karies)
                      </h3>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                        Füllungstherapie
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Der Kariesprozess hat die Schmelz-Dentin-Grenze überschritten. Im weicheren Dentin breitet sich die Karies rasch entlang der Dentintubuli aus. Symptome: Überempfindlichkeit bei Kälte, Wärme oder süßen Speisen. Therapie: Exkavation der erweichten Karies und Kompositfüllung.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                      <strong className="text-sky-300">FR:</strong> Carie dentinaire moyenne (Caries media). Progression le long des tubulis dentinaires avec ramollissement. Douleurs provoquées (froid, chaud, sucré). Traitement : Curetage et obturation composite.
                    </p>
                  </>
                )}

                {selectedCariesStage === 4 && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-rose-500">
                        D4: Tiefe Dentinkaries &amp; Penetrierende Karies (Caries profunda / Caries penetrans)
                      </h3>
                      <span className="text-[10px] bg-rose-600/30 text-rose-300 font-bold px-2 py-0.5 rounded-full">
                        Überkappung / Endodontie
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-100">DE:</strong> Ausgedehnte Karies im tiefen, pulpenahen Dentin (über 2/3 der Dentindicke) oder mit Eröffnung der Pulpenhöhle (Caries penetrans). Gefahr einer irreversiblen Pulpitis oder Pulpanekrose. Therapie: Indirekte/direkte Überkappung (Pulpenschutz mit Calciumhydroxid/MTA) oder Wurzelkanalbehandlung (Endodontie).
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                      <strong className="text-sky-300">FR:</strong> Carie profonde (Caries profunda / Caries penetrans). Atteinte juxta-pulpaire ou ouverture de la cavité pulpaire. Risque de pulpite irréversible ou nécrose. Traitement : Coiffage pulpaire ou dévitalisation (endodontie).
                    </p>
                  </>
                )}
              </div>
            </section>
          )}
      </main>

      <BottomNav />
    </MobileContainer>
  );
}
