'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';

interface DentalInstrument {
  id: string;
  nameDe: string;
  nameFr: string;
  latin: string;
  categoryDe: string;
  categoryFr: string;
  usageDe: string;
  usageFr: string;
  clinicalTipDe: string;
  clinicalTipFr: string;
  color: string;
}

export const dentalInstrumentsList: DentalInstrument[] = [
  {
    id: 'mirror',
    nameDe: 'Mundspiegel',
    nameFr: 'Miroir buccal',
    latin: 'Speculum dentale',
    categoryDe: 'Diagnostik (Grundbesteck)',
    categoryFr: 'Diagnostic (Set d’examen)',
    usageDe: 'Ermöglicht indirekte Sicht auf unzugängliche Zahnflächen, leitet das Behandlungslicht optimal um und hält Wange sowie Zunge schonend ab.',
    usageFr: 'Permet la vision indirecte des faces postérieures, réfléchit la lumière du scialytique et rétracte délicatement la langue et les joues.',
    clinicalTipDe: 'Planer Spiegel liefert ein unverzerrtes Bild; Hohlspiegel vergrößert leicht. Vor dem Einbringen im Mund kurz anwärmen, um Beschlagen zu verhindern.',
    clinicalTipFr: 'Le miroir plan offre une image fidèle sans distorsion. Le réchauffer légèrement sur la muqueuse pour éviter la buée.',
    color: '#38bdf8',
  },
  {
    id: 'probe',
    nameDe: 'Häkchensonde (Zahnärztliche Sonde)',
    nameFr: 'Sonde exploratrice',
    latin: 'Exploratorium dentale',
    categoryDe: 'Diagnostik (Grundbesteck)',
    categoryFr: 'Diagnostic (Set d’examen)',
    usageDe: 'Feines Tastinstrument zur Prüfung der Schmelzhärte, Aufspüren von Karies (Hängenbleiben in der Kavität) und Beurteilung von Füllungsrändern.',
    usageFr: 'Instrument tactile fin pour tester la dureté de l’émail, déceler les lésions carieuses et vérifier l’adaptation marginale des obturations.',
    clinicalTipDe: 'Nur mit sanftem Druck tasten, um beginnende Schmelzdemineralisationen (D1) nicht iatrogen einzubrechen!',
    clinicalTipFr: 'Sonder avec une pression très modérée pour ne pas effondrer une déminéralisation initiale réversible.',
    color: '#34d399',
  },
  {
    id: 'tweezers',
    nameDe: 'Zahnärztliche Pinzette (geknickt)',
    nameFr: 'Précelles dentaires (angulées)',
    latin: 'Volsella dentale',
    categoryDe: 'Diagnostik (Grundbesteck)',
    categoryFr: 'Diagnostic (Set d’examen)',
    usageDe: 'Besitzt geriefte, abgewinkelte Branchen zum sicheren, sterilen Greifen und Einbringen von Watterollen, Schaumstoffpellets und Kleinteilen.',
    usageFr: 'Branches coudées et striées assurant la préhension stérile et atraumatique des rouleaux de coton, boulettes et matrices.',
    clinicalTipDe: 'Wird am Schaft mit der Federung gehalten. Niemals unsteril mit den Fingern berühren.',
    clinicalTipFr: 'Manipuler au niveau de la zone de préhension médiane striée pour garantir la stérilité de l’extrémité.',
    color: '#facc15',
  },
  {
    id: 'heidemann',
    nameDe: 'Heidemann-Spatel',
    nameFr: 'Spatule de Heidemann',
    latin: 'Spathula dentalis',
    categoryDe: 'Konservierend (Füllung)',
    categoryFr: 'Odontologie conservatrice',
    usageDe: 'Flaches, biegsames Metallinstrument zum Einbringen, Adaptieren und Glätten von plastischem Füllungsmaterial (Komposit, Zement) und Matrizenbändern.',
    usageFr: 'Instrument métallique plat et souple servant à insérer, condenser et sculpter les composites ou adapter les matrices interdentaires.',
    clinicalTipDe: 'Vor dem Modellieren mit etwas Modellierflüssigkeit oder Alkohol benetzen, damit das Komposit nicht am Spatel klebt.',
    clinicalTipFr: 'Humecter légèrement la spatule avec de la résine de modelage pour éviter que le composite n’adhère à la lame.',
    color: '#a855f7',
  },
  {
    id: 'condenser',
    nameDe: 'Kugelstopfer (Kugel-Modellierer)',
    nameFr: 'Fouloir à boule',
    latin: 'Condensatorium sphericum',
    categoryDe: 'Konservierend (Füllung)',
    categoryFr: 'Odontologie conservatrice',
    usageDe: 'Kugelförmiges Arbeitsende zum blasenfreien Verdichten von Füllungswerkstoffen und Ausformen der natürlichen Fissuren und Höckerabläufe.',
    usageFr: 'Extrémité sphérique dédiée au tassement homogène sans bulles des résines et au modelage de l’anatomie occlusale.',
    clinicalTipDe: 'Ermöglicht das sanfte Anmodellieren an die Schmelzkavitätenränder ohne scharfe Kanten.',
    clinicalTipFr: 'Permet d’ajuster parfaitement le matériau au joint émail-résine sans créer d’aspérités traumatisantes.',
    color: '#f43f5e',
  },
];

interface DentalInstrumentsDiagramProps {
  initialInstrument?: string;
  onSelectInstrument?: (id: string) => void;
}

export function DentalInstrumentsDiagram({
  initialInstrument = 'mirror',
  onSelectInstrument,
}: DentalInstrumentsDiagramProps) {
  const [selectedId, setSelectedId] = useState<string>(initialInstrument);

  const handleSelect = (id: string) => {
    sounds.playClick();
    setSelectedId(id);
    onSelectInstrument?.(id);
  };

  const current = dentalInstrumentsList.find((ins) => ins.id === selectedId) || dentalInstrumentsList[0];

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none space-y-3.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2.5 border-b border-slate-800 gap-2">
        <div className="min-w-0">
          <h3 className="font-black text-slate-100 text-sm sm:text-base break-words">
            Zahnärztliches Instrumentarium
          </h3>
          <p className="text-xs text-sky-400 font-semibold mt-0.5">
            Grundbesteck &amp; Füllungsinstrumente
          </p>
        </div>
        <span className="text-[11px] bg-sky-500/15 text-sky-300 font-bold px-2.5 py-1 rounded-full border border-sky-500/30 shrink-0">
          ZFA Praxis
        </span>
      </div>

      {/* SVG Darstellung des ausgewählten Instruments */}
      <div className="relative w-full aspect-[4/3] max-h-56 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 rounded-2xl flex items-center justify-center p-3 border border-slate-800 shadow-inner overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full select-none drop-shadow-lg">
          <defs>
            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="35%" stopColor="#94a3b8" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient id="mirrorGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* 1. Mundspiegel */}
          {current.id === 'mirror' && (
            <g>
              {/* Griff & Schaft */}
              <rect x="180" y="94" width="180" height="12" rx="4" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
              <line x1="220" y1="94" x2="220" y2="106" stroke="#334155" strokeWidth="2" strokeDasharray="2,2" />
              <line x1="260" y1="94" x2="260" y2="106" stroke="#334155" strokeWidth="2" strokeDasharray="2,2" />
              {/* Abgewinkelter Hals */}
              <path d="M 180 100 L 130 90 L 105 75" fill="none" stroke="url(#metalGrad)" strokeWidth="8" strokeLinecap="round" />
              {/* Spiegel-Fassung & Glas */}
              <circle cx="85" cy="65" r="32" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="2" />
              <circle cx="85" cy="65" r="26" fill="url(#mirrorGlassGrad)" stroke="#bae6fd" strokeWidth="1.5" />
              {/* Reflexions-Glanzlinie */}
              <path d="M 68 55 Q 85 45 102 55" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
            </g>
          )}

          {/* 2. Häkchensonde */}
          {current.id === 'probe' && (
            <g>
              {/* Griff */}
              <rect x="170" y="94" width="190" height="12" rx="4" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
              {/* Abgewinkelter Schaft */}
              <path d="M 170 100 L 110 100 L 80 85" fill="none" stroke="url(#metalGrad)" strokeWidth="6" strokeLinecap="round" />
              {/* Spitze Häkchensonde */}
              <path d="M 80 85 Q 60 70 50 85 Q 45 95 48 102" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
              {/* Glanzpunkt an der feinen Spitze */}
              <circle cx="48" cy="102" r="2.5" fill="#34d399" className="animate-ping" />
            </g>
          )}

          {/* 3. Zahnärztliche Pinzette */}
          {current.id === 'tweezers' && (
            <g>
              {/* Oberer Schenkel */}
              <path d="M 360 85 L 140 85 L 75 115 L 55 130" fill="none" stroke="url(#metalGrad)" strokeWidth="6" strokeLinecap="round" />
              {/* Unterer Schenkel */}
              <path d="M 360 115 L 140 115 L 75 125 L 55 132" fill="none" stroke="url(#metalGrad)" strokeWidth="6" strokeLinecap="round" />
              {/* Federung hinten */}
              <path d="M 358 85 C 380 90 380 110 358 115" fill="none" stroke="url(#metalGrad)" strokeWidth="7" strokeLinecap="round" />
              {/* Riefung für Fingerhalt */}
              <line x1="220" y1="80" x2="220" y2="120" stroke="#facc15" strokeWidth="2" strokeDasharray="3,3" />
            </g>
          )}

          {/* 4. Heidemann-Spatel */}
          {current.id === 'heidemann' && (
            <g>
              {/* Griff */}
              <rect x="130" y="94" width="140" height="12" rx="4" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
              {/* Linkes Spatel-Blatt */}
              <path d="M 130 100 L 80 100 L 40 85" fill="none" stroke="url(#metalGrad)" strokeWidth="5" strokeLinecap="round" />
              <polygon points="40,80 15,70 18,92 42,90" fill="#a855f7" stroke="#e2e8f0" strokeWidth="1.5" />
              {/* Rechtes Spatel-Blatt */}
              <path d="M 270 100 L 320 100 L 360 115" fill="none" stroke="url(#metalGrad)" strokeWidth="5" strokeLinecap="round" />
              <polygon points="360,110 385,120 382,100 358,105" fill="#a855f7" stroke="#e2e8f0" strokeWidth="1.5" />
            </g>
          )}

          {/* 5. Kugelstopfer */}
          {current.id === 'condenser' && (
            <g>
              {/* Griff */}
              <rect x="130" y="94" width="140" height="12" rx="4" fill="url(#metalGrad)" stroke="#475569" strokeWidth="1" />
              {/* Linker Schaft & Kugel */}
              <path d="M 130 100 L 80 95 L 45 80" fill="none" stroke="url(#metalGrad)" strokeWidth="5" strokeLinecap="round" />
              <circle cx="45" cy="80" r="10" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="2" />
              {/* Rechter Schaft & kleinere Kugel */}
              <path d="M 270 100 L 320 105 L 355 120" fill="none" stroke="url(#metalGrad)" strokeWidth="5" strokeLinecap="round" />
              <circle cx="355" cy="120" r="7" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>

      {/* 5 Instrumente Auswahlleiste (min. 44px Touch Targets) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {dentalInstrumentsList.map((ins) => {
          const isSelected = selectedId === ins.id;
          return (
            <button
              key={ins.id}
              type="button"
              onClick={() => handleSelect(ins.id)}
              className={`min-h-[46px] px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 border active:scale-95 ${
                isSelected
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: ins.color }}
              />
              <span>{ins.nameDe.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Detaillierte Instrumentenkarte */}
      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 text-xs space-y-3 animate-fade-in">
        <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-2.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-extrabold text-slate-100 text-base">{current.nameDe}</h4>
              <span className="text-xs bg-slate-900 border border-slate-700 text-sky-400 px-2 py-0.5 rounded-full font-mono font-bold">
                {current.latin}
              </span>
            </div>
            <p className="text-xs font-bold text-sky-400 mt-0.5">
              FR: {current.nameFr}
            </p>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-slate-900 border-slate-700 text-slate-300 shrink-0">
            {current.categoryDe}
          </span>
        </div>

        {/* Verwendungszweck */}
        <div className="space-y-1">
          <p className="text-slate-200 font-medium leading-relaxed">
            🛠️ <strong>Funktion:</strong> {current.usageDe}
          </p>
          <p className="text-sky-300/80 italic text-[11px] leading-relaxed">
            FR : {current.usageFr}
          </p>
        </div>

        {/* Praxistipp für die Stuhlassistenz */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-1">
          <span className="font-bold text-amber-300 block">💡 ZFA-Praxishinweis:</span>
          <p className="text-amber-200/90 leading-relaxed">{current.clinicalTipDe}</p>
          <p className="text-amber-300/75 italic text-[11px] leading-relaxed">FR : {current.clinicalTipFr}</p>
        </div>
      </div>
    </div>
  );
}

