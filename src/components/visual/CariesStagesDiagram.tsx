'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';

interface CariesStageDetail {
  id: string;
  code: 'D1' | 'D2' | 'D3' | 'D4';
  nameDe: string;
  nameFr: string;
  depthDe: string;
  depthFr: string;
  symptomsDe: string;
  symptomsFr: string;
  therapyDe: string;
  therapyFr: string;
  reversible: boolean;
  color: string;
  lesionSvgDepth: number; // SVG Y-depth for the lesion
}

export const cariesStagesData: CariesStageDetail[] = [
  {
    id: 'd1',
    code: 'D1',
    nameDe: 'D1: Initialkaries (White Spot)',
    nameFr: 'D1 : Carie initiale (tache blanche)',
    depthDe: 'Suboberflächliche Entkalkung der Schmelzoberfläche, noch keine Kavität (Loch).',
    depthFr: 'Déminéralisation sous-surfacique sans cavitation amélaire visible.',
    symptomsDe: 'Kreidiger weißer Fleck auf dem Schmelz (White Spot), meist völlig symptomlos.',
    symptomsFr: 'Tache blanche crayeuse, asymptomatique.',
    therapyDe: 'Vollständig reversibel! Professionelle Zahnreinigung, Biofilm-Entfernung und hochdosiertes Fluorid (Fluorapatit-Bildung).',
    therapyFr: 'Totalement réversible ! Nettoyage prophylactique et fluoration topique intensive (reminéralisation).',
    reversible: true,
    color: '#38bdf8',
    lesionSvgDepth: 45,
  },
  {
    id: 'd2',
    code: 'D2',
    nameDe: 'D2: Schmelzkaries (Caries superficialis)',
    nameFr: 'D2 : Carie amélaire (Caries superficialis)',
    depthDe: 'Schmelzeinbruch mit sichtbarer Kavität, aber noch auf den Zahnschmelz begrenzt.',
    depthFr: 'Effondrement de l’émail avec petite cavité, strictement limitée à l’épaisseur amélaire.',
    symptomsDe: 'Raue Schmelzoberfläche, Speisereste bleiben hängen, gelegentlich leichte Empfindlichkeit.',
    symptomsFr: 'Surface rugueuse, rétention alimentaire, sensibilité occasionnelle.',
    therapyDe: 'Irreversibel. Minimalinvasive Kunststofffüllung (Komposit) oder Kariesinfiltration.',
    therapyFr: 'Irréversible. Restauration micro-invasive par composite adhésif ou infiltration.',
    reversible: false,
    color: '#fbbf24',
    lesionSvgDepth: 80,
  },
  {
    id: 'd3',
    code: 'D3',
    nameDe: 'D3: Dentinkaries (Caries media)',
    nameFr: 'D3 : Carie dentinaire (Caries media)',
    depthDe: 'Infektion hat die Schmelz-Dentin-Grenze überschritten und breitet sich rasch im weicheren Dentin aus.',
    depthFr: 'La lésion franchit la jonction amélo-dentinaire et s’étend rapidement dans la dentine.',
    symptomsDe: 'Schmerzen bei thermischen und chemischen Reizen (süß, sauer, kalt, heiß).',
    symptomsFr: 'Douleurs provoquées par les stimuli thermiques ou chimiques (froid, chaud, sucré, acide).',
    therapyDe: 'Exkavieren des erweichten Dentins, Unterfüllung zum Pulpadämpfung und adhäsive Kompositfüllung.',
    therapyFr: 'Curetage carieux complet, fond de cavité protecteur et obturation directe par composite.',
    reversible: false,
    color: '#f97316',
    lesionSvgDepth: 130,
  },
  {
    id: 'd4',
    code: 'D4',
    nameDe: 'D4: Tiefe Karies (Caries profunda)',
    nameFr: 'D4 : Carie profonde (Caries profunda)',
    depthDe: 'Erreicht die tiefsten Dentinschichten in unmittelbarer Nähe des Zahnnervs (Pulpa).',
    depthFr: 'Atteinte de la dentine profonde au contact immédiat de la chambre pulpaire.',
    symptomsDe: 'Starke Schmerzen, Spontanschmerz auch nachts, Klopfempfindlichkeit (Gefahr einer Pulpitis).',
    symptomsFr: 'Douleurs vives spontanées nocturnes, sensibilité à la percussion (risque aigu de pulpite).',
    therapyDe: 'Indirekte/direkte Überkappung (z. B. mit Calciumhydroxid/MTA) oder Wurzelkanalbehandlung (Endodontie).',
    therapyFr: 'Coiffage pulpaire indirect/direct (MTA) ou dévitalisation (traitement endodontique).',
    reversible: false,
    color: '#ef4444',
    lesionSvgDepth: 180,
  },
];

interface CariesStagesDiagramProps {
  initialStage?: string;
  onSelectStage?: (stageId: string) => void;
}

export function CariesStagesDiagram({
  initialStage = 'd1',
  onSelectStage,
}: CariesStagesDiagramProps) {
  const [selectedId, setSelectedId] = useState<string>(initialStage);

  const handleSelect = (id: string) => {
    sounds.playClick();
    setSelectedId(id);
    onSelectStage?.(id);
  };

  const current = cariesStagesData.find((s) => s.id === selectedId) || cariesStagesData[0];

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-black text-slate-100 text-sm sm:text-base">
            Kariesstadien D1 bis D4
          </h3>
          <p className="text-xs text-sky-400 font-semibold mt-0.5">
            Stades carieux • Progression &amp; Thérapie
          </p>
        </div>
        <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${current.reversible ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border-rose-500/30'}`}>
          {current.reversible ? '✓ Reversibel' : '✗ Irreversibel'}
        </span>
      </div>

      {/* Interaktive Karies-Visualisierung (Querschnitt mit Kariesläsion) */}
      <div className="relative w-full aspect-[4/3] max-h-64 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 rounded-2xl flex items-center justify-center p-2 border border-slate-800 shadow-inner overflow-hidden">
        <svg viewBox="0 0 340 280" className="w-full h-full select-none drop-shadow-md">
          <defs>
            <linearGradient id="cEnamelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="cDentinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            <linearGradient id="cPulpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Zahnkrone & Wurzelumriss */}
          {/* Zahnschmelz-Krone */}
          <path
            d="M 60 160 C 50 110 60 30 170 30 C 280 30 290 110 280 160 Z"
            fill="url(#cEnamelGrad)"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Dentinkern */}
          <path
            d="M 80 160 C 75 120 85 60 170 60 C 255 60 265 120 260 160 L 250 260 C 220 275 190 275 170 275 C 150 275 120 275 90 260 Z"
            fill="url(#cDentinGrad)"
            stroke="#eab308"
            strokeWidth="2"
          />

          {/* Zahnpulpa (Nerv) */}
          <path
            d="M 145 150 C 140 120 150 100 170 100 C 190 100 200 120 195 150 L 190 260 L 150 260 Z"
            fill="url(#cPulpGrad)"
            stroke="#f43f5e"
            strokeWidth="2"
          />

          {/* Karies-Läsion (verändert Tiefe & Farbe je nach Stadium) */}
          {/* D1: Schmelz-Flecken oben */}
          {current.id === 'd1' && (
            <path
              d="M 155 30 Q 170 45 185 30 Z"
              fill="#38bdf8"
              stroke="#0284c7"
              strokeWidth="2"
              className="animate-pulse"
            />
          )}

          {/* D2: Kavität im Schmelz */}
          {current.id === 'd2' && (
            <path
              d="M 150 30 Q 170 68 190 30 Z"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2.5"
            />
          )}

          {/* D3: Dentinkaries */}
          {current.id === 'd3' && (
            <path
              d="M 140 30 Q 170 115 200 30 Z"
              fill="#f97316"
              stroke="#c2410c"
              strokeWidth="3"
            />
          )}

          {/* D4: Caries profunda (reicht an die Pulpa heran!) */}
          {current.id === 'd4' && (
            <g>
              <path
                d="M 130 30 Q 170 148 210 30 Z"
                fill="#ef4444"
                stroke="#b91c1c"
                strokeWidth="3.5"
                className="animate-pulse"
              />
              {/* Entzündungs-Strahlen an der Pulpa */}
              <circle cx="170" cy="148" r="8" fill="#ef4444" opacity="0.6" className="animate-ping" />
            </g>
          )}

          {/* Skalen-Hilfslinien für D1-D4 */}
          <line x1="285" y1="42" x2="315" y2="42" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="320" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold">D1</text>

          <line x1="285" y1="65" x2="315" y2="65" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="320" y="68" fill="#fbbf24" fontSize="10" fontWeight="bold">D2</text>

          <line x1="285" y1="115" x2="315" y2="115" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="320" y="118" fill="#f97316" fontSize="10" fontWeight="bold">D3</text>

          <line x1="285" y1="148" x2="315" y2="148" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="320" y="151" fill="#ef4444" fontSize="10" fontWeight="bold">D4</text>
        </svg>
      </div>

      {/* 4 Stadien Stepper Buttons (min 44px) */}
      <div className="grid grid-cols-4 gap-2">
        {cariesStagesData.map((s) => {
          const isSelected = selectedId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s.id)}
              className={`min-h-[50px] p-2 rounded-2xl flex flex-col items-center justify-center transition-all border active:scale-95 ${
                isSelected
                  ? 'bg-slate-800 border-sky-400 shadow-md ring-2 ring-sky-400/40 text-white font-black'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs font-black">{s.code}</span>
            </button>
          );
        })}
      </div>

      {/* Detaillierte Kariesbeschreibung */}
      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 text-xs space-y-3 animate-fade-in">
        <div className="border-b border-slate-700/60 pb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-extrabold text-slate-100 text-base">{current.nameDe}</h4>
          </div>
          <p className="text-xs font-bold text-sky-400 mt-0.5">
            FR: {current.nameFr}
          </p>
        </div>

        {/* Tiefe & Befall */}
        <div className="space-y-1">
          <p className="text-slate-200 font-medium">
            📏 <strong>Tiefe:</strong> {current.depthDe}
          </p>
          <p className="text-sky-300/80 italic text-[11px]">
            FR : {current.depthFr}
          </p>
        </div>

        {/* Symptome */}
        <div className="space-y-1 pt-1 border-t border-slate-700/60">
          <p className="text-slate-200 font-medium">
            ⚡ <strong>Symptome:</strong> {current.symptomsDe}
          </p>
          <p className="text-sky-300/80 italic text-[11px]">
            FR : {current.symptomsFr}
          </p>
        </div>

        {/* ZFA Behandlungsmaßnahme */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-1">
          <span className="font-bold text-amber-300 block">🩺 Zahnärztliche Therapie:</span>
          <p className="text-slate-200">{current.therapyDe}</p>
          <p className="text-sky-300/80 italic text-[11px]">FR : {current.therapyFr}</p>
        </div>
      </div>
    </div>
  );
}

