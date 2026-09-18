'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';

export function FdiSchemeDiagram({ onSelect }: { onSelect?: (id: string) => void }) {
  const [mode, setMode] = useState<'permanent' | 'deciduous'>('permanent');
  const [selectedTooth, setSelectedTooth] = useState<string>('11');

  const getToothDetails = (numStr: string) => {
    const quad = parseInt(numStr[0]);
    const pos = parseInt(numStr[1]);

    const isMilk = quad >= 5;
    let quadNameDe = '';
    let quadNameFr = '';
    let quadColor = 'text-sky-400';
    let quadBg = 'bg-sky-500/15 border-sky-500/30';

    switch (quad) {
      case 1:
        quadNameDe = '1. Quadrant (Oberkiefer rechts / vom Patienten aus)';
        quadNameFr = '1er quadrant (maxillaire supérieur droit)';
        quadColor = 'text-sky-400';
        quadBg = 'bg-sky-500/15 border-sky-500/30';
        break;
      case 2:
        quadNameDe = '2. Quadrant (Oberkiefer links / vom Patienten aus)';
        quadNameFr = '2e quadrant (maxillaire supérieur gauche)';
        quadColor = 'text-violet-400';
        quadBg = 'bg-violet-500/15 border-violet-500/30';
        break;
      case 3:
        quadNameDe = '3. Quadrant (Unterkiefer links / vom Patienten aus)';
        quadNameFr = '3e quadrant (mandibulaire inférieur gauche)';
        quadColor = 'text-emerald-400';
        quadBg = 'bg-emerald-500/15 border-emerald-500/30';
        break;
      case 4:
        quadNameDe = '4. Quadrant (Unterkiefer rechts / vom Patienten aus)';
        quadNameFr = '4e quadrant (mandibulaire inférieur droit)';
        quadColor = 'text-amber-400';
        quadBg = 'bg-amber-500/15 border-amber-500/30';
        break;
      case 5:
        quadNameDe = '5. Quadrant (Milchgebiss OK rechts)';
        quadNameFr = '5e quadrant (dents temporaires maxillaire droit)';
        quadColor = 'text-sky-400';
        quadBg = 'bg-sky-500/15 border-sky-500/30';
        break;
      case 6:
        quadNameDe = '6. Quadrant (Milchgebiss OK links)';
        quadNameFr = '6e quadrant (dents temporaires maxillaire gauche)';
        quadColor = 'text-violet-400';
        quadBg = 'bg-violet-500/15 border-violet-500/30';
        break;
      case 7:
        quadNameDe = '7. Quadrant (Milchgebiss UK links)';
        quadNameFr = '7e quadrant (dents temporaires mandibulaire gauche)';
        quadColor = 'text-emerald-400';
        quadBg = 'bg-emerald-500/15 border-emerald-500/30';
        break;
      case 8:
        quadNameDe = '8. Quadrant (Milchgebiss UK rechts)';
        quadNameFr = '8e quadrant (dents temporaires mandibulaire droit)';
        quadColor = 'text-amber-400';
        quadBg = 'bg-amber-500/15 border-amber-500/30';
        break;
    }

    const posNamesDe: Record<number, string> = {
      1: 'Mittlerer Schneidezahn (1er)',
      2: 'Seitlicher Schneidezahn (2er)',
      3: 'Eckzahn (3er)',
      4: isMilk ? '1. Milchmolar' : '1. Prämolar (4er)',
      5: isMilk ? '2. Milchmolar' : '2. Prämolar (5er)',
      6: '1. Molar (6-Jahr-Molar / 6er)',
      7: '2. Molar (12-Jahr-Molar / 7er)',
      8: '3. Molar (Weisheitszahn / 8er)',
    };

    const posNamesFr: Record<number, string> = {
      1: 'Incisive centrale',
      2: 'Incisive latérale',
      3: 'Canine',
      4: isMilk ? '1re molaire temporaire' : '1re prémolaire',
      5: isMilk ? '2e molaire temporaire' : '2e prémolaire',
      6: '1re molaire permanente (dent de 6 ans)',
      7: '2e molaire permanente (dent de 12 ans)',
      8: '3e molaire (dent de sagesse)',
    };

    const latinNames: Record<number, string> = {
      1: 'Dens incisivus primus / centralis',
      2: 'Dens incisivus secundus / lateralis',
      3: 'Dens caninus',
      4: isMilk ? 'Dens molaris deciduus primus' : 'Dens praemolaris primus',
      5: isMilk ? 'Dens molaris deciduus secundus' : 'Dens praemolaris secundus',
      6: 'Dens molaris primus',
      7: 'Dens molaris secundus',
      8: 'Dens molaris tertius (serotinus)',
    };

    return {
      code: numStr,
      quad,
      pos,
      quadColor,
      quadBg,
      quadNameDe,
      quadNameFr,
      nameDe: posNamesDe[pos] || '',
      nameFr: posNamesFr[pos] || '',
      latin: latinNames[pos] || '',
    };
  };

  const handleSelectTooth = (tooth: string) => {
    sounds.playClick();
    setSelectedTooth(tooth);
    onSelect?.(tooth);
  };

  const currentTooth = getToothDetails(selectedTooth);

  const upperRight = mode === 'permanent' ? ['18', '17', '16', '15', '14', '13', '12', '11'] : ['55', '54', '53', '52', '51'];
  const upperLeft = mode === 'permanent' ? ['21', '22', '23', '24', '25', '26', '27', '28'] : ['61', '62', '63', '64', '65'];
  const lowerRight = mode === 'permanent' ? ['48', '47', '46', '45', '44', '43', '42', '41'] : ['85', '84', '83', '82', '81'];
  const lowerLeft = mode === 'permanent' ? ['31', '32', '33', '34', '35', '36', '37', '38'] : ['71', '72', '73', '74', '75'];

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl select-none space-y-3.5">
      {/* Header & Umschalter */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h3 className="font-black text-slate-100 text-sm sm:text-base">
            FDI-Zahnschema / Schéma FDI
          </h3>
          <p className="text-xs text-sky-400 font-semibold mt-0.5">
            2-Ziffern-System • 4 Quadranten
          </p>
        </div>

        {/* Gebiss-Umschalter */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setMode('permanent');
              setSelectedTooth('11');
            }}
            className={`min-h-[36px] px-3 py-1 rounded-lg transition-all ${
              mode === 'permanent'
                ? 'bg-sky-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bleibend (1–4)
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setMode('deciduous');
              setSelectedTooth('51');
            }}
            className={`min-h-[36px] px-3 py-1 rounded-lg transition-all ${
              mode === 'deciduous'
                ? 'bg-sky-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Milch (5–8)
          </button>
        </div>
      </div>

      {/* Visuelles Quadrantenkreuz */}
      <div className="bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-800 relative">
        {/* Orientierungs-Hinweise (Perspektive des Patienten!) */}
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-2 px-1">
          <span className="text-amber-400/90 font-mono">Rechts (Patient)</span>
          <span className="uppercase tracking-wider text-slate-300 font-extrabold">Oberkiefer (Maxillaire)</span>
          <span className="text-sky-400/90 font-mono">Links (Patient)</span>
        </div>

        {/* Oberkiefer Quadranten (Q1 / Q2 bzw. Q5 / Q6) */}
        <div className="grid grid-cols-2 gap-2 pb-2.5 border-b-2 border-slate-700/80">
          {/* Oben rechts (Q1 bzw. Q5) */}
          <div className="flex justify-end gap-1 flex-wrap">
            {upperRight.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleSelectTooth(t)}
                className={`min-w-[34px] min-h-[38px] px-1 text-xs font-black rounded-lg flex items-center justify-center transition-all active:scale-90 border ${
                  selectedTooth === t
                    ? 'bg-sky-500 text-slate-950 border-sky-300 shadow-md shadow-sky-500/30 scale-105 ring-2 ring-sky-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700/70 hover:border-sky-500 hover:text-white'
                }`}
                aria-label={`Zahn ${t}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Oben links (Q2 bzw. Q6) */}
          <div className="flex justify-start gap-1 flex-wrap">
            {upperLeft.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleSelectTooth(t)}
                className={`min-w-[34px] min-h-[38px] px-1 text-xs font-black rounded-lg flex items-center justify-center transition-all active:scale-90 border ${
                  selectedTooth === t
                    ? 'bg-violet-500 text-slate-950 border-violet-300 shadow-md shadow-violet-500/30 scale-105 ring-2 ring-violet-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700/70 hover:border-violet-500 hover:text-white'
                }`}
                aria-label={`Zahn ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Unterkiefer Quadranten (Q4 / Q3 bzw. Q8 / Q7) */}
        <div className="grid grid-cols-2 gap-2 pt-2.5">
          {/* Unten rechts (Q4 bzw. Q8) */}
          <div className="flex justify-end gap-1 flex-wrap">
            {lowerRight.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleSelectTooth(t)}
                className={`min-w-[34px] min-h-[38px] px-1 text-xs font-black rounded-lg flex items-center justify-center transition-all active:scale-90 border ${
                  selectedTooth === t
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/30 scale-105 ring-2 ring-amber-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700/70 hover:border-amber-500 hover:text-white'
                }`}
                aria-label={`Zahn ${t}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Unten links (Q3 bzw. Q7) */}
          <div className="flex justify-start gap-1 flex-wrap">
            {lowerLeft.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleSelectTooth(t)}
                className={`min-w-[34px] min-h-[38px] px-1 text-xs font-black rounded-lg flex items-center justify-center transition-all active:scale-90 border ${
                  selectedTooth === t
                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md shadow-emerald-500/30 scale-105 ring-2 ring-emerald-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700/70 hover:border-emerald-500 hover:text-white'
                }`}
                aria-label={`Zahn ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Unterkiefer Beschriftung unten */}
        <div className="text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-2">
          Unterkiefer (Mandibule)
        </div>
      </div>

      {/* Ausgewählter Zahn Detailkarte */}
      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 text-xs space-y-2.5 animate-fade-in">
        <div className="flex items-start justify-between gap-3 border-b border-slate-700/60 pb-2.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl font-black text-white font-mono bg-slate-900 border border-slate-700 px-2.5 py-0.5 rounded-xl">
                {currentTooth.code}
              </span>
              <div>
                <h4 className="font-extrabold text-slate-100 text-sm sm:text-base leading-tight">
                  {currentTooth.nameDe}
                </h4>
                <span className="text-[11px] font-mono text-sky-400 block mt-0.5 font-bold">
                  {currentTooth.latin}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-sky-400 mt-1 block">
              FR: {currentTooth.nameFr}
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${currentTooth.quadBg} ${currentTooth.quadColor}`}>
              Quadrant {currentTooth.quad}
            </span>
          </div>
        </div>

        {/* Quadrant Detailbeschreibung */}
        <div className="space-y-1 text-xs">
          <p className="text-slate-300">
            📍 <strong>Lage:</strong> {currentTooth.quadNameDe}
          </p>
          <p className="text-sky-300/80 italic text-[11px]">
            FR : {currentTooth.quadNameFr}
          </p>
        </div>

        {/* Wichtiger Aussprache-Merksatz */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-200">
          🗣️ <strong>Aussprache-Regel:</strong> Ziffern immer einzeln sprechen: <strong>"{currentTooth.code[0]}-{currentTooth.code[1]}"</strong> (sprich z. B. "{currentTooth.code === '11' ? 'Eins-Eins' : `${currentTooth.code[0]}-${currentTooth.code[1]}`}"), niemals als Zehnerzahl!
          <div className="text-amber-300/80 italic mt-0.5 text-[10px]">
            FR : Prononcez les chiffres séparément : "{currentTooth.code[0]}-{currentTooth.code[1]}", jamais comme un nombre !
          </div>
        </div>
      </div>
    </div>
  );
}
