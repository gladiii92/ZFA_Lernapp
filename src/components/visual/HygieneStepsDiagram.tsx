'use client';

import React, { useState } from 'react';
import { Trash2, WashingMachine, Eye, PackageCheck, Flame, FileCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface HygieneStep {
  stepNumber: number;
  titleDe: string;
  titleFr: string;
  paramDe: string;
  paramFr: string;
  descDe: string;
  descFr: string;
  clinicalTipDe: string;
  clinicalTipFr: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const rkiSteps: HygieneStep[] = [
  {
    stepNumber: 1,
    titleDe: '1. Vorbereitung & Entsorgung',
    titleFr: '1. Pré-désinfection & tri',
    paramDe: 'Direkt am Behandlungsstuhl',
    paramFr: 'Au fauteuil immédiat',
    descDe: 'Sofortige Trockenentsorgung von Einmalartikeln (Kanülen, Watterollen). Grobe Verschmutzungen abwischen und Instrumente trocken in geschlossene Transportboxen legen.',
    descFr: 'Élimination immédiate des consommables à usage unique. Dépôt sécurisé des instruments en bac étanche fermé sans trempage humide.',
    clinicalTipDe: 'Nassentsorgung ist wegen Aerosol- und Korrosionsgefahr veraltet. Trockenentsorgung schützt das ZFA-Personal vor Stichverletzungen.',
    clinicalTipFr: 'Le transport à sec est recommandé par le RKI pour prévenir les blessures par piqûre et la corrosion des aciers.',
    icon: Trash2,
    color: '#38bdf8',
  },
  {
    stepNumber: 2,
    titleDe: '2. Reinigung & Desinfektion (RDG)',
    titleFr: '2. Nettoyage & thermo-désinfection (LDE)',
    paramDe: '90 °C Haltezeit (A0 ≥ 3000)',
    paramFr: '90 °C (Valeur A0 ≥ 3000)',
    descDe: 'Maschinelle Aufbereitung im Reinigungs- und Desinfektionsgerät (Thermodesinfektor). Validierter Prozess zur sicheren Beseitigung von Blut und Speichel.',
    descFr: 'Lavage et thermo-désinfection automatisée validée dans le laveur-désinfecteur. Élimination garantie du biofilm et des agents pathogènes.',
    clinicalTipDe: 'Maschinelle Aufbereitung ist immer der manuellen Reinigung vorzuziehen, da sie validierbar, standardisiert und reproduzierbar ist.',
    clinicalTipFr: 'Le traitement automatisé est la norme de référence car entièrement traçable et reproductible.',
    icon: WashingMachine,
    color: '#34d399',
  },
  {
    stepNumber: 3,
    titleDe: '3. Sichtprüfung & Instrumentenpflege',
    titleFr: '3. Contrôle visuel & lubrification',
    paramDe: 'Lupenleuchte & Spezialöl',
    paramFr: 'Loupe éclairante & huile',
    descDe: 'Visuelle Inspektion auf Sauberkeit, Restbeläge und Korrosion unter der Lupenleuchte. Ölung von Gelenken und rotierenden Turbinen/Winkelstücken mit Pflegeöl.',
    descFr: 'Contrôle minutieux de la propreté et absence de corrosion sous loupe. Lubrification des instruments rotatifs et articulations.',
    clinicalTipDe: 'Instrumente mit Flugrost oder Beschädigungen müssen sofort aussortiert werden, um Lochfraß an anderen Instrumenten zu vermeiden.',
    clinicalTipFr: 'Tout instrument piqué de rouille doit être écarté pour éviter la contamination des autres dispositifs.',
    icon: Eye,
    color: '#facc15',
  },
  {
    stepNumber: 4,
    titleDe: '4. Verpackung & Siegelung',
    titleFr: '4. Conditionnement & thermoscellage',
    paramDe: 'Siegelnaht ≥ 8 mm',
    paramFr: 'Soudure étanche ≥ 8 mm',
    descDe: 'Einschweißen der gereinigten Instrumente in Sterilisations-Klarsichtbeutel (Papier-Folien-Kombination). Validiertes Folienschweißgerät mit Mindestsiegelnahtbreite von 8 mm.',
    descFr: 'Mise sous sachet pelable conforme avec soudure thermique hermétique d’au moins 8 mm de largeur.',
    clinicalTipDe: 'Folie nicht überfüllen und Behandlungsdatum sowie Chargennummer mit sterilisationsfestem Stift auf die Folienseite schreiben.',
    clinicalTipFr: 'Ne pas surcharger le sachet ; inscrire date et lot au marqueur stérile uniquement sur la face plastique.',
    icon: PackageCheck,
    color: '#a855f7',
  },
  {
    stepNumber: 5,
    titleDe: '5. Dampfsterilisation (Autoklav)',
    titleFr: '5. Stérilisation vapeur (Autoclave B)',
    paramDe: '134 °C • 3 Min • 2,1 bar',
    paramFr: '134 °C • 3 min • 2,1 bars',
    descDe: 'Fraktioniertes Vorvakuumverfahren im Klasse-B-Autoklaven. Gesättigter Wasserdampf durchdringt auch engste Hohlkörper (z. B. Übertragungsinstrumente) und tötet Sporen ab.',
    descFr: 'Stérilisation à la vapeur d’eau saturée sous vide fractionné (classe B). Pénétration garantie au cœur des corps creux et turbines.',
    clinicalTipDe: 'Klasse-B-Autoklaven sind für alle Medizinprodukte der Einstufung "Kritisch B" (chirurgisch invasiv mit Hohlkörpern) gesetzlich vorgeschrieben.',
    clinicalTipFr: 'Les autoclaves de classe B sont obligatoires pour tous les dispositifs invasifs critiques franchissant la muqueuse.',
    icon: Flame,
    color: '#f43f5e',
  },
  {
    stepNumber: 6,
    titleDe: '6. Freigabe & Dokumentation',
    titleFr: '6. Libération de charge & traçabilité',
    paramDe: 'Digitale Archivierung & Barcode',
    paramFr: 'Archivage numérique & code-barres',
    descDe: 'Überprüfung der Prozessindikatoren (z. B. Helix-Test, Bowie-Dick-Test). Digitale Chargenfreigabe durch die ZFA und barcode-gestützte Dokumentation am Patienten.',
    descFr: 'Validation finale des paramètres physico-chimiques (test Helix). Signature de la libération de charge et traçabilité informatique.',
    clinicalTipDe: 'Sterilgut muss trocken und staubgeschützt in geschlossenen Schränken gelagert werden (Standard-Lagerdauer: bis zu 6 Monate einfach verpackt).',
    clinicalTipFr: 'Les sachets stériles doivent être stockés à l’abri de la lumière et de l’humidité dans des tiroirs fermés.',
    icon: FileCheck,
    color: '#06b6d4',
  },
];

export function HygieneStepsDiagram({ onSelect }: { onSelect?: (id: string) => void }) {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  const handleStepClick = (idx: number) => {
    sounds.playClick();
    setCurrentStepIdx(idx);
    onSelect?.(`step-${idx + 1}`);
  };

  const handleNext = () => {
    if (currentStepIdx < rkiSteps.length - 1) {
      sounds.playClick();
      setCurrentStepIdx((prev) => {
        const next = prev + 1;
        onSelect?.(`step-${next + 1}`);
        return next;
      });
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      sounds.playClick();
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const current = rkiSteps[currentStepIdx];
  const Icon = current.icon;

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div>
          <h3 className="font-black text-slate-100 text-sm sm:text-base">
            RKI-Hygienekette in 6 Schritten
          </h3>
          <p className="text-xs text-sky-400 font-semibold mt-0.5">
            Chaîne de retraitement des dispositifs médicaux
          </p>
        </div>
        <span className="text-[11px] bg-emerald-500/15 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
          RKI-Standard
        </span>
      </div>

      {/* Stepper-Leiste (1 bis 6) */}
      <div className="flex items-center justify-between gap-1 px-1">
        {rkiSteps.map((step, idx) => {
          const isSelected = currentStepIdx === idx;
          const isPassed = currentStepIdx > idx;

          return (
            <React.Fragment key={step.stepNumber}>
              <button
                type="button"
                onClick={() => handleStepClick(idx)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-xs flex items-center justify-center transition-all active:scale-90 border ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/30 scale-105 ring-2 ring-sky-400/50'
                    : isPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:bg-slate-700 hover:text-white'
                }`}
                aria-label={`Schritt ${step.stepNumber}: ${step.titleDe}`}
              >
                {step.stepNumber}
              </button>
              {idx < rkiSteps.length - 1 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${
                    isPassed ? 'bg-emerald-500/50' : 'bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detaillierte Schritt-Karte */}
      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 text-xs space-y-3 animate-fade-in">
        <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-2.5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-md shrink-0"
              style={{ backgroundColor: current.color }}
            >
              <Icon className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-100 text-sm sm:text-base leading-tight">
                {current.titleDe}
              </h4>
              <p className="text-xs font-bold text-sky-400 mt-0.5">
                FR: {current.titleFr}
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-slate-900 border-slate-700 text-amber-300 shrink-0">
            {current.paramDe}
          </span>
        </div>

        {/* Beschreibung */}
        <div className="space-y-1 text-xs">
          <p className="text-slate-200 font-medium leading-relaxed">
            🇩🇪 {current.descDe}
          </p>
          <p className="text-sky-300/80 italic text-[11px] leading-relaxed">
            🇫🇷 {current.descFr}
          </p>
        </div>

        {/* Praxisrelevanz / Merksatz */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-1">
          <span className="font-bold text-amber-300 block">💡 Wichtige Prüfungsregel:</span>
          <p className="text-amber-200/90 leading-relaxed">{current.clinicalTipDe}</p>
          <p className="text-amber-300/75 italic text-[11px] leading-relaxed">FR : {current.clinicalTipFr}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-700/60 gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold flex items-center gap-1.5 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Vorheriger Schritt</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStepIdx === rkiSteps.length - 1}
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 disabled:opacity-40 disabled:pointer-events-none text-xs flex items-center gap-1.5 active:scale-95 shadow-md shadow-sky-500/20"
          >
            <span>Nächster Schritt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
