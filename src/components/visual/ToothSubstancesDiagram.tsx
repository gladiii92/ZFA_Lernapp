'use client';

import React from 'react';
import { Shield, Sparkles, HeartPulse, Anchor } from 'lucide-react';

export function ToothSubstancesDiagram() {
  const substances = [
    {
      nameDe: 'Zahnschmelz',
      nameFr: 'Émail dentaire',
      latin: 'Enamelum',
      icon: Shield,
      mineral: '96 %',
      mineralPercent: 96,
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      barColor: 'bg-sky-500',
      descDe: 'Härtestes Gewebe des Körpers. Kann sich nach Zerstörung NICHT mehr selbst erneuern (keine lebenden Zellen).',
      descFr: 'Tissu le plus dur du corps humain. Ne peut PAS se régénérer après destruction (acellulaire).',
    },
    {
      nameDe: 'Dentin (Zahnbein)',
      nameFr: 'Dentine',
      latin: 'Dentinum',
      icon: Sparkles,
      mineral: '70 %',
      mineralPercent: 70,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      barColor: 'bg-amber-500',
      descDe: 'Elastischer Stoßdämpfer unter dem Schmelz. Kann zeitlebens Sekundärdentin bilden.',
      descFr: 'Amortisseur élastique sous l’émail. Peut fabriquer de la dentine secondaire tout au long de la vie.',
    },
    {
      nameDe: 'Wurzelzement',
      nameFr: 'Cément radiculaire',
      latin: 'Cementum',
      icon: Anchor,
      mineral: '65 %',
      mineralPercent: 65,
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      barColor: 'bg-orange-500',
      descDe: 'Bedeckt die Wurzel. Ähnelt Knochengewebe und verankert die Haltefasern des Zahnes.',
      descFr: 'Recouvre la racine. Structure semblable à l’os, ancre les fibres parodontales.',
    },
    {
      nameDe: 'Zahnpulpa (Weichgewebe)',
      nameFr: 'Pulpe (tissu mou)',
      latin: 'Pulpa dentis',
      icon: HeartPulse,
      mineral: '0 %',
      mineralPercent: 0,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      barColor: 'bg-rose-500',
      descDe: 'Das "Herz" des Zahnes: Nerven, Blut- und Lymphgefäße versorgen den Zahn mit Nährstoffen.',
      descFr: 'Le "cœur" vivant de la dent : nerfs, vaisseaux sanguins et lymphatiques pour la nutrition.',
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Zahnhartsubstanzen vs. Weichgewebe
          </h3>
          <p className="text-xs text-indigo-700 font-medium">
            Tissus durs vs. Tissu mou de la dent
          </p>
        </div>
        <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
          ZFA Basiswissen
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {substances.map((sub, i) => {
          const Icon = sub.icon;
          return (
            <div
              key={i}
              className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white shadow-xs border border-slate-200">
                    <Icon className="w-4 h-4 text-slate-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">
                        {sub.nameDe}
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono font-semibold">
                        {sub.latin}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-indigo-700 block">
                      FR: {sub.nameFr}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sub.badgeColor}`}>
                    {sub.mineral} Mineral
                  </span>
                </div>
              </div>

              {/* Progress Mineral Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${sub.barColor}`}
                  style={{ width: `${Math.max(sub.mineralPercent, 4)}%` }}
                />
              </div>

              <div className="mt-2 text-[11px] space-y-0.5 pt-1.5 border-t border-slate-200/60">
                <p className="text-slate-800 font-medium">🇩🇪 {sub.descDe}</p>
                <p className="text-indigo-900/80 italic">🇫🇷 {sub.descFr}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

