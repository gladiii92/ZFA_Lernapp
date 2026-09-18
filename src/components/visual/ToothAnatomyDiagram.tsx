'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';

interface PartInfo {
  id: string;
  de: string;
  latin: string;
  fr: string;
  color: string;
  descriptionDe: string;
  descriptionFr: string;
}

export const toothParts: Record<string, PartInfo> = {
  schmelz: {
    id: 'schmelz',
    de: 'Zahnschmelz',
    latin: 'Enamelum',
    fr: 'Émail dentaire',
    color: '#38bdf8',
    descriptionDe: 'Härteste Substanz im menschlichen Körper (ca. 96 % Hydroxylapatit). Bildet den Schutzpanzer der Krone und kann nicht nachwachsen.',
    descriptionFr: 'Substance la plus dure du corps humain (~96 % de minéraux). Forme le bouclier de la couronne et ne se régénère pas.',
  },
  dentin: {
    id: 'dentin',
    de: 'Dentin (Zahnbein)',
    latin: 'Dentinum',
    fr: 'Dentine',
    color: '#facc15',
    descriptionDe: 'Hauptmasse des Zahnes (ca. 70 % mineralisiert). Elastischer als Schmelz, enthält mikroskopische Dentinkanälchen mit Nervenfasern.',
    descriptionFr: 'Masse principale de la dent (~70 % minéralisée). Plus élastique que l’émail, traversée de canalicules sensibles.',
  },
  pulpa: {
    id: 'pulpa',
    de: 'Zahnpulpa (Mark)',
    latin: 'Pulpa dentis',
    fr: 'Pulpe dentaire',
    color: '#f43f5e',
    descriptionDe: 'Lebendiges Weichgewebe im Zahninneren mit Blutgefäßen, Lymphbahnen und Nerven zur Ernährung und sensorischen Warnung.',
    descriptionFr: 'Tissu conjonctif vivant au cœur de la dent, vascularisé et innervé, assurant la vitalité et la sensibilité.',
  },
  zement: {
    id: 'zement',
    de: 'Wurzelzement',
    latin: 'Cementum',
    fr: 'Cément radiculaire',
    color: '#fb923c',
    descriptionDe: 'Dünne Hüllschicht um die Zahnwurzel. Verankert die kollagenen Sharpey-Fasern des Zahnhalteapparats fest im Dentin.',
    descriptionFr: 'Fine couche protectrice recouvrant la racine. Ancre solidement les fibres de soutien parodontales dans la dentine.',
  },
  wurzelhaut: {
    id: 'wurzelhaut',
    de: 'Wurzelhaut (Desmodont)',
    latin: 'Desmodontium',
    fr: 'Desmodonte (ligament parodontal)',
    color: '#a855f7',
    descriptionDe: 'Kollagenes Fasernetzwerk, das den Zahn federnd in der knöchernen Alveole aufhängt und Kaudrücke hydraulisch dämpft.',
    descriptionFr: 'Réseau de fibres de collagène suspendant la dent dans l’alvéole et amortissant les forces occlusales.',
  },
  knochen: {
    id: 'knochen',
    de: 'Alveolarknochen',
    latin: 'Os alveolare',
    fr: 'Os alvéolaire',
    color: '#94a3b8',
    descriptionDe: 'Der Knochenkamm des Kiefers, der die Zahnfächer (Alveolen) bildet und den Zahn stabil verankert.',
    descriptionFr: 'Partie de l’os maxillaire formant la loge osseuse accueillant et soutenant la racine dentaire.',
  },
  gingiva: {
    id: 'gingiva',
    de: 'Zahnfleisch (Gingiva)',
    latin: 'Gingiva',
    fr: 'Gencive',
    color: '#ec4899',
    descriptionDe: 'Kollagenreiches Zahnfleisch, das den Alveolarknochen überzieht und den Zahnhals schützend gegen Bakterien abdichtet.',
    descriptionFr: 'Muqueuse masticatoire recouvrant l’os alvéolaire et formant le joint biologique protecteur au collet dentaire.',
  },
};

interface ToothAnatomyDiagramProps {
  initialPart?: string;
  onPartSelect?: (partId: string) => void;
  targetPart?: string;
}

export function ToothAnatomyDiagram({
  initialPart,
  onPartSelect,
  targetPart,
}: ToothAnatomyDiagramProps) {
  const [selectedPart, setSelectedPart] = useState<string>(initialPart || 'schmelz');

  const handleSelect = (partId: string) => {
    sounds.playClick();
    setSelectedPart(partId);
    onPartSelect?.(partId);
  };

  const current = toothParts[selectedPart] || toothParts.schmelz;

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none">
      {/* Header mit Badge */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Zahnquerschnitt • Anatomie
          </span>
        </div>
        <span className="text-[11px] bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/60 font-medium">
          Tippe auf ein Gewebe
        </span>
      </div>

      {/* SVG Vektor-Container im Dark-Design */}
      <div className="relative w-full aspect-[4/3] max-h-72 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 rounded-2xl flex items-center justify-center p-2 border border-slate-800 shadow-inner overflow-hidden">
        <svg viewBox="0 0 400 360" className="w-full h-full drop-shadow-md select-none">
          <defs>
            <pattern id="bonePatternDark" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#475569" />
              <circle cx="8" cy="8" r="1.2" fill="#475569" />
            </pattern>

            <linearGradient id="enamelGradDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>

            <linearGradient id="dentinGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <linearGradient id="pulpGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>

            <linearGradient id="gingivaGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>

          {/* Alveolar Bone (Alveolarknochen) */}
          <path
            d="M 40 180 Q 70 170 120 185 L 120 340 L 40 340 Z M 280 185 Q 330 170 360 180 L 360 340 L 280 340 Z"
            fill={selectedPart === 'knochen' ? '#334155' : '#1e293b'}
            stroke={selectedPart === 'knochen' ? '#94a3b8' : '#334155'}
            strokeWidth={selectedPart === 'knochen' ? '3' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('knochen')}
          />
          <path
            d="M 40 180 Q 70 170 120 185 L 120 340 L 40 340 Z M 280 185 Q 330 170 360 180 L 360 340 L 280 340 Z"
            fill="url(#bonePatternDark)"
            className="pointer-events-none opacity-60"
          />

          {/* Gingiva (Zahnfleisch) */}
          <path
            d="M 40 160 Q 80 145 130 168 Q 140 172 142 180 Q 90 175 40 185 Z"
            fill="url(#gingivaGradDark)"
            stroke={selectedPart === 'gingiva' ? '#f472b6' : '#db2777'}
            strokeWidth={selectedPart === 'gingiva' ? '3.5' : '1'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('gingiva')}
          />
          <path
            d="M 360 160 Q 320 145 270 168 Q 260 172 258 180 Q 310 175 360 185 Z"
            fill="url(#gingivaGradDark)"
            stroke={selectedPart === 'gingiva' ? '#f472b6' : '#db2777'}
            strokeWidth={selectedPart === 'gingiva' ? '3.5' : '1'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('gingiva')}
          />

          {/* Wurzelhaut / Desmodont (Sharpey-Fasern) */}
          <path
            d="M 125 180 C 130 240 160 310 180 340 C 185 343 215 343 220 340 C 240 310 270 240 275 180"
            fill="none"
            stroke={selectedPart === 'wurzelhaut' ? '#c084fc' : '#a855f7'}
            strokeWidth={selectedPart === 'wurzelhaut' ? '6' : '3.5'}
            strokeDasharray={selectedPart === 'wurzelhaut' ? 'none' : '4,2'}
            className="cursor-pointer transition-all hover:brightness-125"
            onClick={() => handleSelect('wurzelhaut')}
          />

          {/* Wurzelzement (Cementum) */}
          <path
            d="M 130 175 C 135 235 163 305 183 336 C 187 339 213 339 217 336 C 237 305 265 235 270 175 Z"
            fill={selectedPart === 'zement' ? '#fdba74' : '#f97316'}
            stroke={selectedPart === 'zement' ? '#fff7ed' : '#ea580c'}
            strokeWidth={selectedPart === 'zement' ? '3' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('zement')}
          />

          {/* Zahnschmelz / Enamelum (Krone) */}
          <path
            d="M 125 175 C 120 130 125 65 160 35 C 185 15 215 15 240 35 C 275 65 280 130 275 175 Q 200 185 125 175 Z"
            fill="url(#enamelGradDark)"
            stroke={selectedPart === 'schmelz' ? '#38bdf8' : '#0284c7'}
            strokeWidth={selectedPart === 'schmelz' ? '4' : '2'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('schmelz')}
          />

          {/* Dentin / Zahnbein */}
          <path
            d="M 136 168 C 133 125 137 72 165 48 C 185 32 215 32 235 48 C 263 72 267 125 264 168 C 260 220 235 295 200 325 C 165 295 140 220 136 168 Z"
            fill="url(#dentinGradDark)"
            stroke={selectedPart === 'dentin' ? '#fde047' : '#ca8a04'}
            strokeWidth={selectedPart === 'dentin' ? '3.5' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('dentin')}
          />

          {/* Pulpa / Zahnnerv */}
          <path
            d="M 175 120 C 170 100 178 80 190 75 C 195 72 205 72 210 75 C 222 80 230 100 225 120 C 223 145 210 170 205 200 L 204 315 C 204 318 196 318 196 315 L 195 200 C 190 170 177 145 175 120 Z"
            fill="url(#pulpGradDark)"
            stroke={selectedPart === 'pulpa' ? '#ffe4e6' : '#be123c'}
            strokeWidth={selectedPart === 'pulpa' ? '3' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('pulpa')}
          />

          {/* Nerven- und Gefäßstränge in der Pulpa */}
          <path
            d="M 197 90 Q 203 140 198 220 Q 201 270 200 310"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
            className="pointer-events-none"
          />
          <path
            d="M 203 95 Q 197 150 202 230"
            stroke="#fde047"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
            className="pointer-events-none"
          />

          {/* Beschriftungslinien links (Krone, Hals, Wurzel) */}
          <g className="text-xs font-bold fill-slate-400 select-none">
            {/* Krone */}
            <line x1="20" y1="35" x2="110" y2="35" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="160" x2="110" y2="160" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="35" x2="20" y2="160" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="26" y="95" fill="#e2e8f0" fontSize="10" fontWeight="800">Krone (Couronne)</text>

            {/* Hals */}
            <line x1="20" y1="180" x2="110" y2="180" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="160" x2="20" y2="180" stroke="#fbbf24" strokeWidth="2.5" />
            <text x="26" y="173" fill="#fcd34d" fontSize="10" fontWeight="800">Hals (Collet)</text>

            {/* Wurzel */}
            <line x1="20" y1="340" x2="170" y2="340" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="180" x2="20" y2="340" stroke="#34d399" strokeWidth="2.5" />
            <text x="26" y="260" fill="#a7f3d0" fontSize="10" fontWeight="800">Wurzel (Racine)</text>
          </g>
        </svg>
      </div>

      {/* Horizontale Auswahl-Chips (min. 44px Touch-Target) */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2.5 my-1">
        {Object.values(toothParts).map((part) => {
          const isSelected = selectedPart === part.id;
          return (
            <button
              key={part.id}
              type="button"
              onClick={() => handleSelect(part.id)}
              className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 border active:scale-95 ${
                isSelected
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/70 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: part.color }}
              />
              <span>{part.de}</span>
            </button>
          );
        })}
      </div>

      {/* Zweisprachiges Detailkärtchen mit Latein */}
      <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 animate-fade-in mt-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-extrabold text-slate-100 text-base">{current.de}</h4>
              <span className="text-xs bg-slate-900 border border-slate-700 text-sky-400 px-2.5 py-0.5 rounded-full font-mono font-bold">
                {current.latin}
              </span>
            </div>
            <p className="text-xs font-bold text-sky-400 mt-0.5">
              FR: {current.fr}
            </p>
          </div>
          <span
            className="w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm flex-shrink-0 mt-1"
            style={{ backgroundColor: current.color }}
          />
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-700/60 text-xs">
          <p className="text-slate-200 leading-relaxed font-medium">
            🇩🇪 {current.descriptionDe}
          </p>
          <p className="text-sky-300/90 leading-relaxed italic">
            🇫🇷 {current.descriptionFr}
          </p>
        </div>
      </div>
    </div>
  );
}
