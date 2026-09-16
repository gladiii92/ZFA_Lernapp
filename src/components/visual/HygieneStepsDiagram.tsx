'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export function HygieneStepsDiagram() {
  const steps = [
    {
      num: '1',
      titleDe: 'Händedesinfektion',
      titleFr: 'Désinfection des mains',
      time: '30 Sekunden',
      icon: Sparkles,
      color: 'bg-sky-500 text-white',
      badge: 'border-sky-200 bg-sky-50 text-sky-800',
      descDe: '3 ml alkoholische Lösung in die trockenen Hände einreiben. Alle Bereiche (Fingerkuppen, Daumen) benetzen.',
      descFr: 'Frotter 3 ml de solution hydroalcoolique sur mains sèches pendant 30s. Englober pouces et bouts des doigts.',
    },
    {
      num: '2',
      titleDe: 'PSA (Schutzkleidung)',
      titleFr: 'EPI (Équipement de protection)',
      time: 'Vor jedem Patienten',
      icon: ShieldCheck,
      color: 'bg-indigo-500 text-white',
      badge: 'border-indigo-200 bg-indigo-50 text-indigo-800',
      descDe: 'Einmalhandschuhe, medizinischer Mund-Nasen-Schutz und Schutzbrille. Schützt vor Spritzern und Aerosolen.',
      descFr: 'Gants jetables, masque chirurgical et lunettes de protection contre les projections et aérosols.',
    },
    {
      num: '3',
      titleDe: 'RDG (Thermodesinfektor)',
      titleFr: 'Laveur-désinfecteur (RDG)',
      time: '90°C Haltezeit',
      icon: CheckCircle2,
      color: 'bg-emerald-500 text-white',
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      descDe: 'Maschinelle Vorreinigung, Desinfektion und Trocknung der Instrumente. Höhere Sicherheit als Handwäsche.',
      descFr: 'Nettoyage et désinfection thermique mécanique des instruments. Plus sûr que le nettoyage manuel.',
    },
    {
      num: '4',
      titleDe: 'Autoklav (Sterilisation)',
      titleFr: 'Autoclave (Stérilisation)',
      time: '134°C / 2 bar / Vakuum',
      icon: Flame,
      color: 'bg-rose-500 text-white',
      badge: 'border-rose-200 bg-rose-50 text-rose-800',
      descDe: 'Klasse-B Dampfsterilisator. Tötet alle lebenden Mikroorganismen und Sporen vollständig ab.',
      descFr: 'Stérilisateur vapeur classe B. Élimine 100 % des micro-organismes vivants et spores.',
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Hygienekette in der Praxis / Chaîne d&apos;hygiène
          </h3>
          <p className="text-xs text-indigo-700 font-medium">
            Standard-Ablauf nach RKI-Richtlinien
          </p>
        </div>
        <span className="text-[11px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
          Infektionsschutz
        </span>
      </div>

      <div className="space-y-2.5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs ${step.color}`}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {step.titleDe}
                    </h4>
                    <span className="text-xs font-semibold text-indigo-700 block">
                      FR: {step.titleFr}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${step.badge}`}>
                  {step.time}
                </span>
              </div>

              <div className="mt-2 text-[11px] space-y-0.5 pt-2 border-t border-slate-200/60">
                <p className="text-slate-800 font-medium">🇩🇪 {step.descDe}</p>
                <p className="text-indigo-900/80 italic">🇫🇷 {step.descFr}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

