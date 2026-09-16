'use client';

import React, { useState } from 'react';

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
}

const toothTypes: ToothTypeInfo[] = [
  {
    id: 'incisors',
    nameDe: 'Schneidezähne',
    nameFr: 'Incisives',
    latin: 'Dentes incisivi',
    countAdult: 8,
    countChild: 8,
    shapeDe: 'Meißelförmige Krone mit scharfer Schneidekante.',
    shapeFr: 'Couronne en forme de biseau avec bord tranchant.',
    functionDe: 'Abbeißen von Speisen.',
    functionFr: 'Couper et trancher les aliments.',
    roots: '1 Wurzel / 1 racine',
  },
  {
    id: 'canines',
    nameDe: 'Eckzähne',
    nameFr: 'Canines',
    latin: 'Dentes canini',
    countAdult: 4,
    countChild: 4,
    shapeDe: 'Konische, spitze Krone, längste Wurzel im Gebiss ("Augenzahn").',
    shapeFr: 'Couronne pointue et conique, racine la plus longue.',
    functionDe: 'Festhalten und Abreißen von Nahrung.',
    functionFr: 'Déchirer et retenir les aliments.',
    roots: '1 kräftige Wurzel / 1 racine puissante',
  },
  {
    id: 'premolars',
    nameDe: 'Backenzähne (Prämolaren)',
    nameFr: 'Prémolaires',
    latin: 'Dentes praemolares',
    countAdult: 8,
    countChild: 0, // Keine Prämolaren im Milchgebiss!
    shapeDe: 'Zweihöckrige Kaufläche (bicuspid). Fehlen im Milchgebiss!',
    shapeFr: 'Surface occlusale à 2 cuspides. Absentes dans la dentition de lait !',
    functionDe: 'Grobes Zerkleinern der Nahrung.',
    functionFr: 'Écrasement et pré-broyage des aliments.',
    roots: '1 bis 2 Wurzeln / 1 à 2 racines',
  },
  {
    id: 'molars',
    nameDe: 'Mahlzähne (Molaren)',
    nameFr: 'Molaires',
    latin: 'Dentes molares',
    countAdult: 12, // inkl. 4 Weisheitszähne
    countChild: 8,
    shapeDe: 'Große Kaufläche mit 4-5 Höckern und Fissuren.',
    shapeFr: 'Large surface de mastication avec 4 à 5 cuspides.',
    functionDe: 'Feines Mahlen und Zermahlen des Speisebreis.',
    functionFr: 'Broyage fin de la nourriture.',
    roots: 'Oberkiefer: 3 Wurzeln, Unterkiefer: 2 Wurzeln',
  },
];

export function ToothTypesDiagram() {
  const [selectedType, setSelectedType] = useState<string>('incisors');
  const active = toothTypes.find((t) => t.id === selectedType) || toothTypes[0];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Die 4 Zahnarten / Les 4 Types de Dents
          </h3>
          <p className="text-xs text-indigo-700 font-medium">
            Form, Funktion & Wurzelanzahl
          </p>
        </div>
        <span className="text-[11px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded-full border border-sky-200">
          32 Zähne (Erw.)
        </span>
      </div>

      {/* Tooth Icons Visual Row */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {toothTypes.map((t) => {
          const isSelected = selectedType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all border text-center ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {/* Tooth SVG Silhouette */}
              <div className="w-8 h-10 mb-1 flex items-center justify-center">
                {t.id === 'incisors' && (
                  <svg viewBox="0 0 24 32" className="w-6 h-8 fill-current">
                    <path d="M7 2 h10 c1 0 2 2 2 6 c0 4 -2 9 -4 14 l-3 9 l-3 -9 c-2 -5 -4 -10 -4 -14 c0 -4 1 -6 2 -6 Z" />
                  </svg>
                )}
                {t.id === 'canines' && (
                  <svg viewBox="0 0 24 32" className="w-6 h-8 fill-current">
                    <path d="M12 1 l6 7 c1 3 0 7 -2 12 l-4 11 l-4 -11 c-2 -5 -3 -9 -2 -12 Z" />
                  </svg>
                )}
                {t.id === 'premolars' && (
                  <svg viewBox="0 0 26 32" className="w-6 h-8 fill-current">
                    <path d="M5 4 c3 -2 5 0 8 -2 c3 2 5 0 8 2 c2 5 0 10 -3 15 l-2 12 l-3 -7 l-3 7 l-2 -12 c-3 -5 -5 -10 -3 -15 Z" />
                  </svg>
                )}
                {t.id === 'molars' && (
                  <svg viewBox="0 0 28 32" className="w-7 h-8 fill-current">
                    <path d="M4 4 c3 -3 6 0 10 -2 c4 2 7 -1 10 2 c3 5 1 11 -2 16 l-2 11 l-3 -6 l-3 6 l-3 -6 l-2 11 c-3 -5 -5 -11 -2 -16 Z" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] font-bold leading-tight">
                {t.id === 'incisors' && 'Schneidezahn'}
                {t.id === 'canines' && 'Eckzahn'}
                {t.id === 'premolars' && 'Prämolar'}
                {t.id === 'molars' && 'Molar'}
              </span>
              <span className={`text-[9px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                {t.countAdult}x
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Type Details */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-2.5 animate-pop-in">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{active.nameDe}</span>
              <span className="font-mono text-[11px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                {active.latin}
              </span>
            </div>
            <span className="text-indigo-700 font-semibold block text-xs">
              FR: {active.nameFr}
            </span>
          </div>
          <div className="text-right text-[11px]">
            <span className="font-bold text-slate-800">Wurzeln:</span>
            <div className="text-slate-600">{active.roots}</div>
          </div>
        </div>

        {/* Counts Comparison */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-white p-2 rounded-lg border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Bleibendes Gebiss</span>
            <span className="text-base font-extrabold text-emerald-600">{active.countAdult} Zähne</span>
            <span className="text-[10px] text-slate-400 block">Dentition définitive</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Milchgebiss</span>
            <span className="text-base font-extrabold text-indigo-600">
              {active.countChild === 0 ? '0 (Keine!)' : `${active.countChild} Zähne`}
            </span>
            <span className="text-[10px] text-slate-400 block">Dents de lait</span>
          </div>
        </div>

        {/* Shape & Function */}
        <div className="space-y-1.5 pt-1">
          <div>
            <strong className="text-slate-800">Form:</strong>{' '}
            <span className="text-slate-700">{active.shapeDe}</span>
            <div className="text-indigo-900/80 italic text-[11px]">{active.shapeFr}</div>
          </div>
          <div>
            <strong className="text-slate-800">Funktion:</strong>{' '}
            <span className="text-slate-700">{active.functionDe}</span>
            <div className="text-indigo-900/80 italic text-[11px]">{active.functionFr}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
