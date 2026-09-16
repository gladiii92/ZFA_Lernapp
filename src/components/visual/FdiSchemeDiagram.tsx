'use client';

import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

export function FdiSchemeDiagram() {
  const [mode, setMode] = useState<'permanent' | 'deciduous'>('permanent');
  const [selectedTooth, setSelectedTooth] = useState<string>('11');

  // Generate tooth data
  const getToothDetails = (numStr: string) => {
    const quad = parseInt(numStr[0]);
    const pos = parseInt(numStr[1]);

    const isMilk = quad >= 5;
    let quadNameDe = '';
    let quadNameFr = '';
    switch (quad) {
      case 1:
        quadNameDe = '1. Quadrant (Oberkiefer rechts)';
        quadNameFr = '1er quadrant (maxillaire droit)';
        break;
      case 2:
        quadNameDe = '2. Quadrant (Oberkiefer links)';
        quadNameFr = '2e quadrant (maxillaire gauche)';
        break;
      case 3:
        quadNameDe = '3. Quadrant (Unterkiefer links)';
        quadNameFr = '3e quadrant (mandibulaire gauche)';
        break;
      case 4:
        quadNameDe = '4. Quadrant (Unterkiefer rechts)';
        quadNameFr = '4e quadrant (mandibulaire droit)';
        break;
      case 5:
        quadNameDe = '5. Quadrant (Milchzähne OK rechts)';
        quadNameFr = '5e quadrant (dents de lait maxillaire droit)';
        break;
      case 6:
        quadNameDe = '6. Quadrant (Milchzähne OK links)';
        quadNameFr = '6e quadrant (dents de lait maxillaire gauche)';
        break;
      case 7:
        quadNameDe = '7. Quadrant (Milchzähne UK links)';
        quadNameFr = '7e quadrant (dents de lait mandibulaire gauche)';
        break;
      case 8:
        quadNameDe = '8. Quadrant (Milchzähne UK rechts)';
        quadNameFr = '8e quadrant (dents de lait mandibulaire droit)';
        break;
    }

    const posNamesDe: Record<number, string> = {
      1: 'Mittlerer Schneidezahn',
      2: 'Seitlicher Schneidezahn',
      3: 'Eckzahn',
      4: isMilk ? '1. Milchmolar' : '1. Prämolar',
      5: isMilk ? '2. Milchmolar' : '2. Prämolar',
      6: '1. Molar (6-Jahr-Molar)',
      7: '2. Molar (12-Jahr-Molar)',
      8: '3. Molar (Weisheitszahn)',
    };

    const posNamesFr: Record<number, string> = {
      1: 'Incisive centrale',
      2: 'Incisive latérale',
      3: 'Canine',
      4: isMilk ? '1re molaire temporaire' : '1re prémolaire',
      5: isMilk ? '2e molaire temporaire' : '2e prémolaire',
      6: '1re molaire (dent de 6 ans)',
      7: '2e molaire (dent de 12 ans)',
      8: '3e molaire (dent de sagesse)',
    };

    const latinNames: Record<number, string> = {
      1: 'Dens incisivus medialis',
      2: 'Dens incisivus lateralis',
      3: 'Dens caninus',
      4: isMilk ? 'Dens molaris deciduus primus' : 'Dens praemolaris primus',
      5: isMilk ? 'Dens molaris deciduus secundus' : 'Dens praemolaris secundus',
      6: 'Dens molaris primus',
      7: 'Dens molaris secundus',
      8: 'Dens molaris tertius (serotinus)',
    };

    return {
      code: numStr,
      pronounceDe: `${quad} - ${pos} (sprich: "${numStr[0]}-${numStr[1]}", NIE "${numStr}"!)`,
      pronounceFr: `se prononce "${numStr[0]}-${numStr[1]}", JAMAIS "${numStr}" !`,
      quadNameDe,
      quadNameFr,
      nameDe: posNamesDe[pos] || '',
      nameFr: posNamesFr[pos] || '',
      latin: latinNames[pos] || '',
    };
  };

  const currentTooth = getToothDetails(selectedTooth);

  // Quadrants definition
  const upperRight = mode === 'permanent' ? ['18', '17', '16', '15', '14', '13', '12', '11'] : ['55', '54', '53', '52', '51'];
  const upperLeft = mode === 'permanent' ? ['21', '22', '23', '24', '25', '26', '27', '28'] : ['61', '62', '63', '64', '65'];
  const lowerRight = mode === 'permanent' ? ['48', '47', '46', '45', '44', '43', '42', '41'] : ['85', '84', '83', '82', '81'];
  const lowerLeft = mode === 'permanent' ? ['31', '32', '33', '34', '35', '36', '37', '38'] : ['71', '72', '73', '74', '75'];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
      {/* Title & Switch */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            FDI-Zahnschema / Schéma FDI
          </h3>
          <p className="text-xs text-indigo-700 font-medium">
            2-Ziffern-System (Zahnkreuz)
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
          <button
            onClick={() => {
              setMode('permanent');
              setSelectedTooth('11');
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              mode === 'permanent' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Bleibend (1-4)
          </button>
          <button
            onClick={() => {
              setMode('deciduous');
              setSelectedTooth('51');
            }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              mode === 'deciduous' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Milch (5-8)
          </button>
        </div>
      </div>

      {/* Cross Scheme / Quadrantenkreuz */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
        {/* Orientation Labels */}
        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 px-1">
          <span>Rechts (Patient) / Droit</span>
          <span>OK (Oberkiefer / Maxillaire)</span>
          <span>Links (Patient) / Gauche</span>
        </div>

        {/* Upper Jaw Row */}
        <div className="grid grid-cols-2 gap-1.5 pb-2 border-b-2 border-slate-300">
          {/* Upper Right (Q1 or Q5) */}
          <div className="flex justify-end gap-1 flex-wrap">
            {upperRight.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTooth(t)}
                className={`w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center transition-all ${
                  selectedTooth === t
                    ? 'bg-emerald-600 text-white shadow-sm scale-110'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Upper Left (Q2 or Q6) */}
          <div className="flex justify-start gap-1 flex-wrap">
            {upperLeft.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTooth(t)}
                className={`w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center transition-all ${
                  selectedTooth === t
                    ? 'bg-emerald-600 text-white shadow-sm scale-110'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Lower Jaw Row */}
        <div className="grid grid-cols-2 gap-1.5 pt-2">
          {/* Lower Right (Q4 or Q8) */}
          <div className="flex justify-end gap-1 flex-wrap">
            {lowerRight.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTooth(t)}
                className={`w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center transition-all ${
                  selectedTooth === t
                    ? 'bg-emerald-600 text-white shadow-sm scale-110'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Lower Left (Q3 or Q7) */}
          <div className="flex justify-start gap-1 flex-wrap">
            {lowerLeft.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTooth(t)}
                className={`w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center transition-all ${
                  selectedTooth === t
                    ? 'bg-emerald-600 text-white shadow-sm scale-110'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center text-[10px] font-bold text-slate-400 mt-1">
          <span>UK (Unterkiefer / Mandibule)</span>
        </div>
      </div>

      {/* Tooth Details Card */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs space-y-1.5 animate-pop-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
              {currentTooth.code}
            </span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {currentTooth.nameDe}
              </h4>
              <span className="text-indigo-800 font-semibold block text-xs">
                FR: {currentTooth.nameFr}
              </span>
            </div>
          </div>
          <span className="text-[11px] bg-white/80 text-emerald-800 font-mono px-2 py-0.5 rounded border border-emerald-200 font-semibold">
            {currentTooth.latin}
          </span>
        </div>

        <div className="pt-2 border-t border-emerald-200/60 text-[11px] space-y-1">
          <p className="text-slate-800">
            <strong>Quadrant:</strong> {currentTooth.quadNameDe}
          </p>
          <p className="text-indigo-900 italic">
            <strong>FR:</strong> {currentTooth.quadNameFr}
          </p>
          <div className="bg-amber-100/70 text-amber-900 p-2 rounded-lg mt-1 font-medium border border-amber-200">
            ⚠️ <strong>Aussprache-Regel:</strong> {currentTooth.pronounceDe} <br />
            <span className="italic text-amber-950/80">🇫🇷 Règle : {currentTooth.pronounceFr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
