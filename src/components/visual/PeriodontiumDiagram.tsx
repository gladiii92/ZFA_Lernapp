'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';

interface PeriodontiumTissueInfo {
  id: string;
  nameDe: string;
  nameFr: string;
  latin: string;
  color: string;
  functionDe: string;
  functionFr: string;
  clinicalNoteDe: string;
  clinicalNoteFr: string;
}

export const periodontiumTissues: Record<string, PeriodontiumTissueInfo> = {
  gingiva: {
    id: 'gingiva',
    nameDe: 'Zahnfleisch (Gingiva)',
    nameFr: 'Gencive (Gingiva)',
    latin: 'Gingiva propria',
    color: '#ec4899',
    functionDe: 'Dichtet den Zahnhals gegen die Mundhöhle ab und schützt tiefere Gewebe vor mikrobieller Invasion.',
    functionFr: 'Assure l’étanchéité biologique au collet et protège les tissus sous-jacents de l’invasion bactérienne.',
    clinicalNoteDe: 'Eine gesunde Gingiva ist blassrosa, gestippelt (wie eine Orangenhaut) und blutet nicht beim Sondieren.',
    clinicalNoteFr: 'Une gencive saine est rose pâle, piquetée en peau d’orange et ne saigne pas au sondage.',
  },
  desmodont: {
    id: 'desmodont',
    nameDe: 'Wurzelhaut (Desmodont / Periodontium)',
    nameFr: 'Desmodonte (Ligament parodontal)',
    latin: 'Desmodontium / Periodontium',
    color: '#a855f7',
    functionDe: 'Kollagene Sharpey-Fasern hängen den Zahn federnd im Alveolarknochen auf und wirken als hydraulischer Stoßdämpfer.',
    functionFr: 'Les fibres de Sharpey suspendent la dent élastiquement dans l’alvéole et amortissent les chocs occlusaux.',
    clinicalNoteDe: 'Enthält sensible Tastkörperchen (Mechanorezeptoren), die Kaukraft und Beißstärke feinfühlig steuern.',
    clinicalNoteFr: 'Riche en mécanorécepteurs proprioceptifs qui régulent précisément les forces masticatoires.',
  },
  cementum: {
    id: 'cementum',
    nameDe: 'Wurzelzement (Cementum)',
    nameFr: 'Cément radiculaire (Cementum)',
    latin: 'Cementum',
    color: '#f97316',
    functionDe: 'Dünne Hüllschicht um das Wurzeldentin, in der die Haltefasern (Sharpey-Fasern) mikroskopisch verankert sind.',
    functionFr: 'Fine couche minéralisée recouvrant la dentine radiculaire, dans laquelle s’insèrent les fibres ligamentaires.',
    clinicalNoteDe: 'Besitzt keine Nerven und Blutgefäße; wird durch das Desmodont ernährt.',
    clinicalNoteFr: 'Tissu avasculaire et non innervé, nourri par imbibition depuis le desmodonte.',
  },
  alveolar_bone: {
    id: 'alveolar_bone',
    nameDe: 'Alveolarknochen (Os alveolare)',
    nameFr: 'Os alvéolaire (Os alveolare)',
    latin: 'Os alveolare / Processus alveolaris',
    color: '#38bdf8',
    functionDe: 'Teil des Kieferknochens, der die Zahnfächer (Alveolen) bildet und das knöcherne Fundament darstellt.',
    functionFr: 'Partie de l’os maxillaire formant les alvéoles et assurant le socle osseux mécanique de maintien.',
    clinicalNoteDe: 'Baut sich bei Parodontitis durch bakterielle Entzündung irreversibel ab (Knochentaschenbildung).',
    clinicalNoteFr: 'Subit une résorption irréversible lors des parodontites infectieuses (poches osseuses).',
  },
};

interface PeriodontiumDiagramProps {
  initialTissue?: string;
  onSelect?: (id: string) => void;
}

export function PeriodontiumDiagram({
  initialTissue = 'gingiva',
  onSelect,
}: PeriodontiumDiagramProps) {
  const [selectedId, setSelectedId] = useState<string>(initialTissue);

  const handleSelect = (id: string) => {
    sounds.playClick();
    setSelectedId(id);
    onSelect?.(id);
  };

  const current = periodontiumTissues[selectedId] || periodontiumTissues.gingiva;

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Parodontium • 4 Haltegewebe
          </span>
        </div>
        <span className="text-[11px] bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/60 font-medium">
          Zahnhalteapparat
        </span>
      </div>

      {/* SVG Detail-Ansicht des Parodontiums */}
      <div className="relative w-full aspect-[4/3] max-h-72 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 rounded-2xl flex items-center justify-center p-2 border border-slate-800 shadow-inner overflow-hidden">
        <svg viewBox="0 0 400 320" className="w-full h-full drop-shadow-md select-none">
          <defs>
            <linearGradient id="pGingivaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>

            <pattern id="bonePatternPerio" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#64748b" />
              <circle cx="7" cy="7" r="1.2" fill="#64748b" />
            </pattern>
          </defs>

          {/* Hintergrund Alveolarknochen (Os alveolare) links & rechts */}
          <path
            d="M 30 140 Q 60 120 110 135 L 110 300 L 30 300 Z"
            fill={selectedId === 'alveolar_bone' ? '#0284c7' : '#1e293b'}
            stroke={selectedId === 'alveolar_bone' ? '#38bdf8' : '#334155'}
            strokeWidth={selectedId === 'alveolar_bone' ? '3.5' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('alveolar_bone')}
          />
          <path
            d="M 370 140 Q 340 120 290 135 L 290 300 L 370 300 Z"
            fill={selectedId === 'alveolar_bone' ? '#0284c7' : '#1e293b'}
            stroke={selectedId === 'alveolar_bone' ? '#38bdf8' : '#334155'}
            strokeWidth={selectedId === 'alveolar_bone' ? '3.5' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-110"
            onClick={() => handleSelect('alveolar_bone')}
          />
          <path
            d="M 30 140 Q 60 120 110 135 L 110 300 L 30 300 Z M 370 140 Q 340 120 290 135 L 290 300 L 370 300 Z"
            fill="url(#bonePatternPerio)"
            className="pointer-events-none opacity-40"
          />

          {/* Gingiva (Zahnfleisch) */}
          <path
            d="M 30 110 Q 70 85 125 110 Q 133 115 133 125 Q 85 125 30 140 Z"
            fill="url(#pGingivaGrad)"
            stroke={selectedId === 'gingiva' ? '#fbcfe8' : '#db2777'}
            strokeWidth={selectedId === 'gingiva' ? '3.5' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-115"
            onClick={() => handleSelect('gingiva')}
          />
          <path
            d="M 370 110 Q 330 85 275 110 Q 267 115 267 125 Q 315 125 370 140 Z"
            fill="url(#pGingivaGrad)"
            stroke={selectedId === 'gingiva' ? '#fbcfe8' : '#db2777'}
            strokeWidth={selectedId === 'gingiva' ? '3.5' : '1.5'}
            className="cursor-pointer transition-all hover:brightness-115"
            onClick={() => handleSelect('gingiva')}
          />

          {/* Zentraler Zahnkörper (Dentin & Schmelz im Hintergrund zur Orientierung) */}
          {/* Krone oben */}
          <path
            d="M 125 110 C 120 60 140 20 200 20 C 260 20 280 60 275 110 Z"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Wurzelkörper (Dentin) */}
          <path
            d="M 130 110 C 135 180 165 260 195 295 C 205 295 235 260 270 110 Z"
            fill="#475569"
            stroke="#64748b"
            strokeWidth="1.5"
          />

          {/* Wurzelzement (Cementum) Schicht auf der Wurzel */}
          <path
            d="M 128 115 C 133 182 163 262 193 297 L 197 297 C 227 262 257 182 262 115 L 270 110 C 265 185 235 270 205 302 L 185 302 C 155 270 125 185 120 110 Z"
            fill={selectedId === 'cementum' ? '#fdba74' : '#ea580c'}
            stroke={selectedId === 'cementum' ? '#ffedd5' : '#c2410c'}
            strokeWidth={selectedId === 'cementum' ? '3' : '1'}
            className="cursor-pointer transition-all hover:brightness-125"
            onClick={() => handleSelect('cementum')}
          />

          {/* Wurzelhaut / Desmodont (Spaltraum mit federnden Sharpey-Fasern) */}
          <g
            className="cursor-pointer"
            onClick={() => handleSelect('desmodont')}
          >
            {/* Linker Parodontalspalt */}
            <path
              d="M 112 135 C 122 195 152 268 185 302"
              fill="none"
              stroke={selectedId === 'desmodont' ? '#e9d5ff' : '#a855f7'}
              strokeWidth={selectedId === 'desmodont' ? '7' : '4'}
              strokeDasharray="4,3"
              className="transition-all"
            />
            {/* Rechter Parodontalspalt */}
            <path
              d="M 288 135 C 278 195 248 268 215 302"
              fill="none"
              stroke={selectedId === 'desmodont' ? '#e9d5ff' : '#a855f7'}
              strokeWidth={selectedId === 'desmodont' ? '7' : '4'}
              strokeDasharray="4,3"
              className="transition-all"
            />

            {/* Querverlaufende Sharpey-Fasern (Zeichnung) */}
            <line x1="114" y1="150" x2="128" y2="153" stroke="#d8b4fe" strokeWidth="2" />
            <line x1="117" y1="175" x2="132" y2="178" stroke="#d8b4fe" strokeWidth="2" />
            <line x1="123" y1="205" x2="140" y2="208" stroke="#d8b4fe" strokeWidth="2" />
            <line x1="135" y1="235" x2="152" y2="238" stroke="#d8b4fe" strokeWidth="2" />

            <line x1="286" y1="150" x2="272" y2="153" stroke="#d8b4fe" strokeWidth="2" />
            <line x1="283" y1="175" x2="268" y2="178" stroke="#d8b4fe" strokeWidth="2" />
            <line x1="277" y1="205" x2="260" y2="208" stroke="#d8b4fe" strokeWidth="2" />
            <line x1="265" y1="235" x2="248" y2="238" stroke="#d8b4fe" strokeWidth="2" />
          </g>

          {/* Interaktive Pins mit Labels */}
          {/* Gingiva Pin */}
          <circle cx="85" cy="115" r="9" fill="#db2777" stroke="#fff" strokeWidth="2" />
          <text x="85" y="119" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>

          {/* Knochen Pin */}
          <circle cx="65" cy="200" r="9" fill="#0284c7" stroke="#fff" strokeWidth="2" />
          <text x="65" y="204" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>

          {/* Desmodont Pin */}
          <circle cx="315" cy="180" r="9" fill="#a855f7" stroke="#fff" strokeWidth="2" />
          <text x="315" y="184" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>

          {/* Zement Pin */}
          <circle cx="270" cy="120" r="9" fill="#ea580c" stroke="#fff" strokeWidth="2" />
          <text x="270" y="124" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">4</text>
        </svg>
      </div>

      {/* 4 Gewebe Auswahlchips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {Object.values(periodontiumTissues).map((tissue, idx) => {
          const isSelected = selectedId === tissue.id;
          return (
            <button
              key={tissue.id}
              type="button"
              onClick={() => handleSelect(tissue.id)}
              className={`min-h-[46px] p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border active:scale-95 ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full text-[10px] text-slate-950 font-black flex items-center justify-center shrink-0"
                style={{ backgroundColor: tissue.color }}
              >
                {idx + 1}
              </span>
              <span className="truncate">{tissue.nameDe.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Zweisprachige Detailerklärung & klinische Praxisrelevanz */}
      <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 animate-fade-in mt-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-extrabold text-slate-100 text-base">{current.nameDe}</h4>
              <span className="text-xs bg-slate-900 border border-slate-700 text-emerald-400 px-2.5 py-0.5 rounded-full font-mono font-bold">
                {current.latin}
              </span>
            </div>
            <p className="text-xs font-bold text-emerald-400 mt-0.5">
              FR: {current.nameFr}
            </p>
          </div>
          <span
            className="w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm flex-shrink-0 mt-1"
            style={{ backgroundColor: current.color }}
          />
        </div>

        {/* Funktion */}
        <div className="space-y-1.5 pt-2 border-t border-slate-700/60 text-xs">
          <p className="text-slate-200 leading-relaxed font-medium">
            🇩🇪 <strong>Funktion:</strong> {current.functionDe}
          </p>
          <p className="text-emerald-300/90 leading-relaxed italic">
            🇫🇷 <strong>Rôle :</strong> {current.functionFr}
          </p>
        </div>

        {/* Praxisrelevanz / Merksatz */}
        <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs">
          <span className="font-bold text-amber-300 block mb-0.5">💡 ZFA-Praxishinweis:</span>
          <p className="text-amber-200/90 leading-relaxed">
            {current.clinicalNoteDe}
          </p>
          <p className="text-amber-300/75 italic mt-1 text-[11px]">
            FR: {current.clinicalNoteFr}
          </p>
        </div>
      </div>
    </div>
  );
}

