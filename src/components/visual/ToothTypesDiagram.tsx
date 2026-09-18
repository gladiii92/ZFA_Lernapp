'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';

interface ToothTypeInfo {
  id: string;
  nameDe: string;
  nameFr: string;
  latin: string;
  countAdult: number;
  countChild: number;
  shapeDe: string;
  shapeFr: string;
  functionDe: string;
  functionFr: string;
  roots: string;
  rootsFr: string;
}

const toothTypes: ToothTypeInfo[] = [
  {
    id: 'incisors',
    nameDe: 'Schneidezähne',
    nameFr: 'Incisives',
    latin: 'Dentes incisivi',
    countAdult: 8,
    countChild: 8,
    shapeDe: 'Meißelförmige Krone mit scharfer horizontaler Schneidekante (Incisalkante).',
    shapeFr: 'Couronne en forme de biseau avec tranchant incisif horizontal.',
    functionDe: 'Abbeißen und Zerschneiden von Nahrungsmitteln.',
    functionFr: 'Sectionner et trancher les aliments.',
    roots: '1 gerade Wurzel',
    rootsFr: '1 racine rectiligne',
  },
  {
    id: 'canines',
    nameDe: 'Eckzähne',
    nameFr: 'Canines',
    latin: 'Dentes canini',
    countAdult: 4,
    countChild: 4,
    shapeDe: 'Konische, kräftige Krone mit prominenter Höckerspitze und längster Wurzel im menschlichen Gebiss.',
    shapeFr: 'Couronne conique robuste avec pointe cuspidienne acérée et racine la plus longue de l’arcade.',
    functionDe: 'Festhalten und Abreißen von faseriger Nahrung, Führungsfunktion bei Kieferbewegungen (Eckzahnführung).',
    functionFr: 'Préhension, déchirement des aliments et guidage de l’occlusion (protection canine).',
    roots: '1 sehr kräftige, lange Wurzel',
    rootsFr: '1 racine très longue et robuste',
  },
  {
    id: 'premolars',
    nameDe: 'Backenzähne (Prämolaren)',
    nameFr: 'Prémolaires',
    latin: 'Dentes praemolares',
    countAdult: 8,
    countChild: 0, // Keine Prämolaren im Milchgebiss!
    shapeDe: 'Zweihöckrige Kaufläche (bicuspid). Fehlen im Milchgebiss (dort stehen Milchmolaren)!',
    shapeFr: 'Surface occlusale à 2 cuspides. Totalement absentes de la denture temporaire !',
    functionDe: 'Vorzerkleinerung und Zerdrücken der Nahrung.',
    functionFr: 'Écrasement et fragmentation initiale des aliments.',
    roots: '1 bis 2 Wurzeln (1. Prämolar oben oft 2-wurzelig)',
    rootsFr: '1 à 2 racines (souvent 2 pour la 1re prémolaire maxillaire)',
  },
  {
    id: 'molars',
    nameDe: 'Mahlzähne (Molaren)',
    nameFr: 'Molaires',
    latin: 'Dentes molares',
    countAdult: 12, // inkl. 4 Weisheitszähne
    countChild: 8,
    shapeDe: 'Große Kaufläche mit 4 bis 5 ausgeprägten Höckern und Fissuren zur Zerkleinerung.',
    shapeFr: 'Large table occlusale à 4-5 cuspides et réseau de sillons pour le broyage fin.',
    functionDe: 'Feines Zermahlen des Bisses zu einem schluckfähigen Speisebrei.',
    functionFr: 'Broyage fin de la nourriture en bol alimentaire homogène.',
    roots: 'Oberkiefer: 3 Wurzeln • Unterkiefer: 2 Wurzeln',
    rootsFr: 'Maxillaire : 3 racines • Mandibule : 2 racines',
  },
];

export function ToothTypesDiagram({ onSelect }: { onSelect?: (id: string) => void }) {
  const [selectedType, setSelectedType] = useState<string>('incisors');

  const handleSelect = (id: string) => {
    sounds.playClick();
    setSelectedType(id);
    onSelect?.(id);
  };

  const active = toothTypes.find((t) => t.id === selectedType) || toothTypes[0];

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-black text-slate-100 text-sm sm:text-base">
            Die 4 Zahnarten / Les 4 Types de Dents
          </h3>
          <p className="text-xs text-sky-400 font-semibold mt-0.5">
            Form, Funktion & Wurzelanzahl
          </p>
        </div>
        <span className="text-[11px] bg-sky-500/15 text-sky-300 font-bold px-2.5 py-1 rounded-full border border-sky-500/30">
          32 Zähne (Erw.)
        </span>
      </div>

      {/* 4 Zahnarten Touch-Kacheln (min. 54px hoch) */}
      <div className="grid grid-cols-4 gap-2">
        {toothTypes.map((t) => {
          const isSelected = selectedType === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleSelect(t.id)}
              className={`min-h-[76px] p-2 rounded-2xl flex flex-col items-center justify-center transition-all border text-center active:scale-95 ${
                isSelected
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20 ring-2 ring-sky-400/40'
                  : 'bg-slate-800/70 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {/* Zahn SVG Silhouette */}
              <div className="w-7 h-8 mb-1 flex items-center justify-center">
                {t.id === 'incisors' && (
                  <svg viewBox="0 0 24 32" className="w-5 h-7 fill-current">
                    <path d="M7 2 h10 c1 0 2 2 2 6 c0 4 -2 9 -4 14 l-3 9 l-3 -9 c-2 -5 -4 -10 -4 -14 c0 -4 1 -6 2 -6 Z" />
                  </svg>
                )}
                {t.id === 'canines' && (
                  <svg viewBox="0 0 24 32" className="w-5 h-7 fill-current">
                    <path d="M12 1 l6 7 c1 3 0 7 -2 12 l-4 11 l-4 -11 c-2 -5 -3 -9 -2 -12 Z" />
                  </svg>
                )}
                {t.id === 'premolars' && (
                  <svg viewBox="0 0 26 32" className="w-5 h-7 fill-current">
                    <path d="M5 4 c3 -2 5 0 8 -2 c3 2 5 0 8 2 c2 5 0 10 -3 15 l-2 12 l-3 -7 l-3 7 l-2 -12 c-3 -5 -5 -10 -3 -15 Z" />
                  </svg>
                )}
                {t.id === 'molars' && (
                  <svg viewBox="0 0 28 32" className="w-6 h-7 fill-current">
                    <path d="M4 4 c3 -3 6 0 10 -2 c4 2 7 -1 10 2 c3 5 1 11 -2 16 l-2 11 l-3 -6 l-3 6 l-3 -6 l-2 11 c-3 -5 -5 -11 -2 -16 Z" />
                  </svg>
                )}
              </div>
              <span className="text-[10px] font-extrabold leading-tight">
                {t.id === 'incisors' && 'Schneidezahn'}
                {t.id === 'canines' && 'Eckzahn'}
                {t.id === 'premolars' && 'Prämolar'}
                {t.id === 'molars' && 'Molar'}
              </span>
              <span className={`text-[9px] font-bold mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                {t.countAdult}x
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailkarte für ausgewählten Zahntyp */}
      <div className="bg-slate-800/70 rounded-2xl p-4 border border-slate-700/60 text-xs space-y-3 animate-fade-in">
        <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-2.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-slate-100 text-base">{active.nameDe}</span>
              <span className="font-mono text-xs bg-slate-900 border border-slate-700 text-sky-400 px-2 py-0.5 rounded-full font-bold">
                {active.latin}
              </span>
            </div>
            <span className="text-xs font-bold text-sky-400 mt-0.5 block">
              FR: {active.nameFr}
            </span>
          </div>

          <div className="text-right text-[11px] shrink-0">
            <span className="font-bold text-slate-300">Wurzeln:</span>
            <div className="text-amber-400 font-bold">{active.roots}</div>
          </div>
        </div>

        {/* Vergleich Bleibendes Gebiss vs. Milchgebiss */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Bleibend (Erw.)</span>
            <span className="text-base font-black text-emerald-400">{active.countAdult} Zähne</span>
            <span className="text-[10px] text-slate-500 block">Denture permanente</span>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Milchgebiss</span>
            <span className={`text-base font-black ${active.countChild === 0 ? 'text-rose-400' : 'text-sky-400'}`}>
              {active.countChild === 0 ? '0 (Fehlen!)' : `${active.countChild} Zähne`}
            </span>
            <span className="text-[10px] text-slate-500 block">Dents de lait</span>
          </div>
        </div>

        {/* Merksatz für Prämolaren */}
        {active.id === 'premolars' && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200">
            ⚠️ <strong>Prüfungsfalle:</strong> Im Milchgebiss gibt es <strong>KEINE Prämolaren</strong>! Auf die Milcheckzähne folgen direkt die Milchmolaren.
          </div>
        )}

        {/* Form & Funktion zweisprachig */}
        <div className="space-y-2 pt-1 border-t border-slate-700/60 text-xs">
          <div>
            <strong className="text-slate-100">Form:</strong>{' '}
            <span className="text-slate-200">{active.shapeDe}</span>
            <div className="text-sky-300/80 italic text-[11px] mt-0.5">🇫🇷 {active.shapeFr}</div>
          </div>
          <div>
            <strong className="text-slate-100">Funktion:</strong>{' '}
            <span className="text-slate-200">{active.functionDe}</span>
            <div className="text-sky-300/80 italic text-[11px] mt-0.5">🇫🇷 {active.functionFr}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
