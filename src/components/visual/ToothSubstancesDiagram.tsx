'use client';

import React, { useState } from 'react';
import { Shield, Sparkles, HeartPulse, Anchor } from 'lucide-react';
import { sounds } from '@/lib/sound';

export function ToothSubstancesDiagram({ onSelect }: { onSelect?: (id: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  const substances = [
    {
      id: 'enamel',
      nameDe: 'Zahnschmelz',
      nameFr: 'Émail dentaire',
      latin: 'Enamelum',
      icon: Shield,
      mineral: '96 %',
      mineralPercent: 96,
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      barColor: 'bg-gradient-to-r from-sky-400 to-sky-300',
      descDe: 'Härtestes Gewebe des menschlichen Körpers (reines Hydroxylapatit). Besitzt keine lebenden Zellen und kann sich nach Kariesbefall nicht selbst erneuern.',
      descFr: 'Tissu le plus dur de l’organisme humain (~96 % de matière minérale). Acellulaire, il ne peut pas se régénérer après destruction.',
    },
    {
      id: 'dentin',
      nameDe: 'Dentin (Zahnbein)',
      nameFr: 'Dentine',
      latin: 'Dentinum',
      icon: Sparkles,
      mineral: '70 %',
      mineralPercent: 70,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      barColor: 'bg-gradient-to-r from-amber-400 to-amber-300',
      descDe: 'Elastischer Stoßdämpfer und Hauptmasse des Zahnes. Odontoblasten können zeitlebens Reiz- und Sekundärdentin bilden.',
      descFr: 'Amortisseur élastique et volume principal de la dent. Les odontoblastes peuvent produire de la dentine réactionnelle tout au long de la vie.',
    },
    {
      id: 'cementum',
      nameDe: 'Wurzelzement',
      nameFr: 'Cément radiculaire',
      latin: 'Cementum',
      icon: Anchor,
      mineral: '65 %',
      mineralPercent: 65,
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      barColor: 'bg-gradient-to-r from-orange-500 to-orange-400',
      descDe: 'Bedeckt die Wurzeloberfläche. Ähnelt Knochengewebe und verankert die kollagenen Sharpey-Fasern des Zahnhalteapparates.',
      descFr: 'Recouvre la racine dentaire. Structure proche de l’os, ancre les fibres conjonctives de soutien parodontales.',
    },
    {
      id: 'pulp',
      nameDe: 'Zahnpulpa (Weichgewebe)',
      nameFr: 'Pulpe dentaire (tissu mou)',
      latin: 'Pulpa dentis',
      icon: HeartPulse,
      mineral: '0 %',
      mineralPercent: 0,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      barColor: 'bg-gradient-to-r from-rose-500 to-rose-400',
      descDe: 'Das vitale Zentrum des Zahnes: Nervenfasern, Arterien, Venen und Lymphgefäße versorgen den Zahn mit Nährstoffen und sensorischer Reizleitung.',
      descFr: 'Le cœur vital de la dent : fibres nerveuses, artérioles et capillaires assurant l’alimentation biologique et la sensibilité.',
    },
  ];

  const handleSelect = (idx: number) => {
    sounds.playClick();
    setSelectedIdx(idx === selectedIdx ? null : idx);
    onSelect?.(substances[idx].id);
  };

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-black text-slate-100 text-sm sm:text-base">
            Zahnhartsubstanzen vs. Pulpa
          </h3>
          <p className="text-xs text-sky-400 font-semibold mt-0.5">
            Degré de minéralisation (DE / FR / Latein)
          </p>
        </div>
        <span className="text-[11px] bg-emerald-500/15 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
          Mineralgehalt
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Tippe auf ein Gewebe, um den Mineralisationsgrad und die zahnärztliche Bedeutung zu vergleichen:
      </p>

      {/* Gewebe-Liste mit interaktivem Fortschrittsbalken */}
      <div className="grid grid-cols-1 gap-2.5">
        {substances.map((sub, i) => {
          const Icon = sub.icon;
          const isSelected = selectedIdx === i;

          return (
            <div
              key={sub.id}
              onClick={() => handleSelect(i)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] ${
                isSelected
                  ? 'bg-slate-800/90 border-sky-400 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/40'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${isSelected ? 'bg-sky-500/20 border-sky-500/40 text-sky-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-slate-100 text-sm">
                        {sub.nameDe}
                      </span>
                      <span className="text-[10px] bg-slate-900 border border-slate-700 text-sky-400 px-1.5 py-0.5 rounded font-mono font-bold">
                        {sub.latin}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-sky-400 block mt-0.5">
                      FR: {sub.nameFr}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${sub.badgeColor}`}>
                    {sub.mineral}
                  </span>
                </div>
              </div>

              {/* Mineralisations-Balken */}
              <div className="w-full bg-slate-950 h-2 rounded-full mt-3 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${sub.barColor}`}
                  style={{ width: `${Math.max(sub.mineralPercent, 4)}%` }}
                />
              </div>

              {/* Detailerklärung (bei Auswahl aufgeklappt oder sichtbar) */}
              <div className="mt-2.5 text-xs space-y-1 pt-2 border-t border-slate-700/60">
                <p className="text-slate-200 font-medium leading-relaxed">🇩🇪 {sub.descDe}</p>
                <p className="text-sky-300/90 italic leading-relaxed">🇫🇷 {sub.descFr}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
