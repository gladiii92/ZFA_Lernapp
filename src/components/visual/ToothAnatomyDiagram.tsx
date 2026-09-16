'use client';

import React, { useState } from 'react';
import { Info, Sparkles } from 'lucide-react';

interface PartInfo {
  id: string;
  de: string;
  latin: string;
  fr: string;
  color: string;
  descriptionDe: string;
  descriptionFr: string;
}

const toothParts: Record<string, PartInfo> = {
  schmelz: {
    id: 'schmelz',
    de: 'Zahnschmelz',
    latin: 'Enamelum',
    fr: 'Émail dentaire',
    color: '#38bdf8',
    descriptionDe: 'Härteste Substanz im menschlichen Körper (ca. 96 % Mineralien). Schützt die Krone vor Abrieb und Karies.',
    descriptionFr: 'Substance la plus dure du corps humain (~96 % de minéraux). Protège la couronne de l’usure et des caries.',
  },
  dentin: {
    id: 'dentin',
    de: 'Dentin (Zahnbein)',
    latin: 'Dentinum',
    fr: 'Dentine',
    color: '#facc15',
    descriptionDe: 'Hauptmasse des Zahnes. Weicher und elastischer als Schmelz, enthält Dentinkanälchen mit Schmerzfasern.',
    descriptionFr: 'Masse principale de la dent. Plus souple que l’émail, contient de minuscules canalicules sensibles.',
  },
  pulpa: {
    id: 'pulpa',
    de: 'Zahnpulpa (Zahnnerv)',
    latin: 'Pulpa dentis',
    fr: 'Pulpe dentaire',
    color: '#f43f5e',
    descriptionDe: 'Lebendiges Weichgewebe im Zahninneren mit Blutgefäßen, Lymphbahnen und Nerven.',
    descriptionFr: 'Tissu mou vivant au cœur de la dent, contenant nerfs, vaisseaux sanguins et lymphe.',
  },
  zement: {
    id: 'zement',
    de: 'Wurzelzement',
    latin: 'Cementum',
    fr: 'Cément radiculaire',
    color: '#fb923c',
    descriptionDe: 'Dünne Schutzschicht um die Zahnwurzel. Verankert die Haltefasern im Kieferknochen.',
    descriptionFr: 'Fine couche recouvrant la racine dentaire. Ancre les fibres de soutien dans l’os alvéolaire.',
  },
  wurzelhaut: {
    id: 'wurzelhaut',
    de: 'Wurzelhaut (Zahnhalteapparat)',
    latin: 'Desmodontium / Periodontium',
    fr: 'Desmodonte (ligament alvéolo-dentaire)',
    color: '#a855f7',
    descriptionDe: 'Straffe Bindegewebsfasern (Sharpey-Fasern), die den Zahn federnd im Knochen aufhängen.',
    descriptionFr: 'Fibres de collagène reliant élastiquement la dent à l’os alvéolaire pour amortir la mastication.',
  },
  knochen: {
    id: 'knochen',
    de: 'Alveolarknochen (Kieferknochen)',
    latin: 'Os alveolare',
    fr: 'Os alvéolaire',
    color: '#94a3b8',
    descriptionDe: 'Der Teil des Kiefers, der die Zahnfächer (Alveolen) bildet und den Zahn stabil trägt.',
    descriptionFr: 'Partie de la mâchoire qui forme les alvéoles et soutient solidement les dents.',
  },
  gingiva: {
    id: 'gingiva',
    de: 'Zahnfleisch',
    latin: 'Gingiva',
    fr: 'Gencive',
    color: '#ec4899',
    descriptionDe: 'Rosa Schleimhaut, die den Kieferknochen bedeckt und den Zahnhals dicht umschließt.',
    descriptionFr: 'Muqueuse rose recouvrant l’os et entourant hermétiquement le collet de la dent.',
  },
};

export function ToothAnatomyDiagram({ initialPart }: { initialPart?: string }) {
  const [selectedPart, setSelectedPart] = useState<string>(initialPart || 'schmelz');

  const current = toothParts[selectedPart] || toothParts.schmelz;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Interaktive Anatomie / Anatomie Interactive
          </span>
        </div>
        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
          Tippe auf ein Feld / Touche une zone
        </span>
      </div>

      {/* SVG Graphic Container */}
      <div className="relative w-full aspect-[4/3] max-h-64 bg-gradient-to-b from-sky-50/60 via-slate-50 to-amber-50/30 rounded-xl flex items-center justify-center p-2 border border-slate-100">
        <svg viewBox="0 0 400 360" className="w-full h-full drop-shadow-sm select-none">
          <defs>
            {/* Bone Texture Pattern */}
            <pattern id="bonePattern" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#cbd5e1" />
              <circle cx="8" cy="8" r="1" fill="#cbd5e1" />
            </pattern>
            {/* Enamel Gradient */}
            <linearGradient id="enamelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            {/* Dentin Gradient */}
            <linearGradient id="dentinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            {/* Pulp Gradient */}
            <linearGradient id="pulpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            {/* Gingiva Gradient */}
            <linearGradient id="gingivaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>

          {/* Alveolar Bone (Background Layer) */}
          <path
            d="M 40 180 Q 70 170 120 185 L 120 340 L 40 340 Z M 280 185 Q 330 170 360 180 L 360 340 L 280 340 Z"
            fill="#e2e8f0"
            stroke={selectedPart === 'knochen' ? '#64748b' : '#cbd5e1'}
            strokeWidth={selectedPart === 'knochen' ? '3' : '1.5'}
            className="cursor-pointer transition-all hover:opacity-90"
            onClick={() => setSelectedPart('knochen')}
          />
          <path
            d="M 40 180 Q 70 170 120 185 L 120 340 L 40 340 Z M 280 185 Q 330 170 360 180 L 360 340 L 280 340 Z"
            fill="url(#bonePattern)"
            className="pointer-events-none"
          />

          {/* Gingiva (Zahnfleisch) */}
          <path
            d="M 40 160 Q 80 145 130 168 Q 140 172 142 180 Q 90 175 40 185 Z"
            fill="url(#gingivaGrad)"
            stroke={selectedPart === 'gingiva' ? '#be185d' : '#ec4899'}
            strokeWidth={selectedPart === 'gingiva' ? '3' : '1'}
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart('gingiva')}
          />
          <path
            d="M 360 160 Q 320 145 270 168 Q 260 172 258 180 Q 310 175 360 185 Z"
            fill="url(#gingivaGrad)"
            stroke={selectedPart === 'gingiva' ? '#be185d' : '#ec4899'}
            strokeWidth={selectedPart === 'gingiva' ? '3' : '1'}
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart('gingiva')}
          />

          {/* Periodontium / Wurzelhaut (Outlining the root) */}
          <path
            d="M 125 180 C 130 240 160 310 180 340 C 185 343 215 343 220 340 C 240 310 270 240 275 180"
            fill="none"
            stroke={selectedPart === 'wurzelhaut' ? '#9333ea' : '#c084fc'}
            strokeWidth={selectedPart === 'wurzelhaut' ? '6' : '3.5'}
            strokeDasharray={selectedPart === 'wurzelhaut' ? 'none' : '4,2'}
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart('wurzelhaut')}
          />

          {/* Cementum / Wurzelzement (Root outer layer) */}
          <path
            d="M 130 175 C 135 235 163 305 183 336 C 187 339 213 339 217 336 C 237 305 265 235 270 175 Z"
            fill={selectedPart === 'zement' ? '#fed7aa' : '#ffedd5'}
            stroke={selectedPart === 'zement' ? '#ea580c' : '#fb923c'}
            strokeWidth={selectedPart === 'zement' ? '3' : '1.5'}
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart('zement')}
          />

          {/* Zahnschmelz / Enamel (Crown outer shell) */}
          <path
            d="M 125 175 C 120 130 125 65 160 35 C 185 15 215 15 240 35 C 275 65 280 130 275 175 Q 200 185 125 175 Z"
            fill="url(#enamelGrad)"
            stroke={selectedPart === 'schmelz' ? '#0284c7' : '#94a3b8'}
            strokeWidth={selectedPart === 'schmelz' ? '3.5' : '1.5'}
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart('schmelz')}
          />

          {/* Dentin (Inner core) */}
          <path
            d="M 136 168 C 133 125 137 72 165 48 C 185 32 215 32 235 48 C 263 72 267 125 264 168 C 260 220 235 295 200 325 C 165 295 140 220 136 168 Z"
            fill="url(#dentinGrad)"
            stroke={selectedPart === 'dentin' ? '#ca8a04' : '#eab308'}
            strokeWidth={selectedPart === 'dentin' ? '3' : '1.5'}
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart('dentin')}
          />

          {/* Pulp Chamber & Root Canal (Pulpa) */}
          <path
            d="M 175 120 C 170 100 178 80 190 75 C 195 72 205 72 210 75 C 222 80 230 100 225 120 C 223 145 210 170 205 200 L 204 315 C 204 318 196 318 196 315 L 195 200 C 190 170 177 145 175 120 Z"
            fill="url(#pulpGrad)"
            stroke={selectedPart === 'pulpa' ? '#9f1239' : '#f43f5e'}
            strokeWidth={selectedPart === 'pulpa' ? '3' : '1.5'}
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart('pulpa')}
          />

          {/* Nerve & Vessel Fibers (Detail inside pulp) */}
          <path
            d="M 197 90 Q 203 140 198 220 Q 201 270 200 310"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
            className="pointer-events-none"
          />
          <path
            d="M 203 95 Q 197 150 202 230"
            stroke="#fed7aa"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
            className="pointer-events-none"
          />

          {/* Anatomy Zone Labels (Krone / Hals / Wurzel) on the Left */}
          <g className="text-xs font-bold fill-slate-500 select-none">
            {/* Krone */}
            <line x1="20" y1="35" x2="110" y2="35" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="160" x2="110" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="35" x2="20" y2="160" stroke="#64748b" strokeWidth="2" />
            <text x="26" y="100" fill="#334155" fontSize="11" fontWeight="700">Krone (Couronne)</text>

            {/* Hals */}
            <line x1="20" y1="180" x2="110" y2="180" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="160" x2="20" y2="180" stroke="#f59e0b" strokeWidth="2" />
            <text x="26" y="174" fill="#b45309" fontSize="10" fontWeight="700">Hals (Collet)</text>

            {/* Wurzel */}
            <line x1="20" y1="340" x2="170" y2="340" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="180" x2="20" y2="340" stroke="#64748b" strokeWidth="2" />
            <text x="26" y="260" fill="#334155" fontSize="11" fontWeight="700">Wurzel (Racine)</text>
          </g>
        </svg>
      </div>

      {/* Part Selection Pills */}
      <div className="flex flex-wrap gap-1.5 my-3">
        {Object.values(toothParts).map((part) => {
          const isSelected = selectedPart === part.id;
          return (
            <button
              key={part.id}
              onClick={() => setSelectedPart(part.id)}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: part.color }}
              />
              <span>{part.de}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Card for Selected Anatomical Part */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 animate-pop-in">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm">{current.de}</h4>
              <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
                {current.latin}
              </span>
            </div>
            <p className="text-xs font-semibold text-indigo-700 mt-0.5">
              FR: {current.fr}
            </p>
          </div>
          <span
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0 mt-0.5"
            style={{ backgroundColor: current.color }}
          />
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-200 text-xs space-y-1">
          <p className="text-slate-800 leading-relaxed font-medium">
            🇩🇪 {current.descriptionDe}
          </p>
          <p className="text-indigo-950/80 leading-relaxed italic">
            🇫🇷 {current.descriptionFr}
          </p>
        </div>
      </div>
    </div>
  );
}

