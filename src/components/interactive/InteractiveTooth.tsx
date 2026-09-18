'use client';

import React, { useState, useId, useMemo } from 'react';
// Block-Design init (Eckig-Schema)

export type ToothSurfaceId = 'okklusal' | 'mesial' | 'distal' | 'vestibulaer' | 'oral';

export interface ToothSurfaceInfo {
  id: ToothSurfaceId;
  aliases: string[];
  name: string;
  abbreviation: string;
  latinName: string;
  germanName: string;
  direction: string;
  mnemonic: string;
  practiceNote: string;
  color: {
    idleFill: string;
    hoverFill: string;
    activeFill: string;
    border: string;
    activeBorder: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
}

export interface InteractiveToothProps {
  initialSurface?: string;
  selectedSurface?: string | null;
  onSurfaceSelect?: (surface: ToothSurfaceInfo) => void;
  onSelect?: (surfaceId: string) => void;
  onChange?: (surfaceId: string) => void;
  toothNumber?: string | number;
  className?: string;
  showDetails?: boolean;
  interactive?: boolean;
  defaultArch?: 'ok' | 'uk';
}

export const TOOTH_SURFACES: Record<ToothSurfaceId, ToothSurfaceInfo> = {
  okklusal: {
    id: 'okklusal',
    aliases: ['okklusal', 'occlusal', 'inzisal', 'incisal', 'o', 'i'],
    name: 'Okklusal (Kaufläche)',
    abbreviation: 'O',
    latinName: 'Facies occlusalis (bzw. incisalis)',
    germanName: 'Kaufläche bei Seitenzähnen (Schneidekante bei Frontzähnen)',
    direction: 'Zentrum / nach oben zur Zahnkrone',
    mnemonic: 'Okklusion = Kontakt der Zähne beim Zusammenbeißen. Liegt immer im Zentrum des Zahns.',
    practiceNote: 'Häufigste Prädilektionsstelle für Karies in Fissuren. Typischer Kernbestandteil von Füllungen (z. B. O-Füllung oder MOD-Füllung).',
    color: {
      idleFill: '#1e293b',
      hoverFill: '#334155',
      activeFill: '#0369a1',
      border: '#38bdf8',
      activeBorder: '#7dd3fc',
      badgeBg: 'bg-sky-500/20',
      badgeText: 'text-sky-300',
      accent: '#38bdf8',
    },
  },
  vestibulaer: {
    id: 'vestibulaer',
    aliases: ['vestibulaer', 'vestibular', 'bukkal', 'buccal', 'labial', 'v', 'b'],
    name: 'Vestibulär (Außenfläche)',
    abbreviation: 'V',
    latinName: 'Facies vestibularis (buccalis / labialis)',
    germanName: 'Zum Mundvorhof hin (Außenseite zu Wange oder Lippen)',
    direction: 'Außen (oben im Schema, zur Wange / Lippe)',
    mnemonic: 'Vestibulum = Mundvorhof. Bukkal = Wange (Bucca), Labial = Lippe (Labium).',
    practiceNote: 'Besonders anfällig für Zahnhalskaries und Putzdefekte. Sichtbare Zone für ästhetische Füllungen und Verblendungen.',
    color: {
      idleFill: '#1e293b',
      hoverFill: '#334155',
      activeFill: '#6d28d9',
      border: '#a78bfa',
      activeBorder: '#c4b5fd',
      badgeBg: 'bg-violet-500/20',
      badgeText: 'text-violet-300',
      accent: '#a78bfa',
    },
  },
  oral: {
    id: 'oral',
    aliases: ['oral', 'lingual', 'palatinal', 'l', 'p'],
    name: 'Oral (Innenfläche: Palatinal / Lingual)',
    abbreviation: 'Oral',
    latinName: 'Facies oralis (palatinalis / lingualis)',
    germanName: 'Zur Mundhöhle hin (Gaumenseite im OK, Zungenseite im UK)',
    direction: 'Innen (unten im Schema, zum Gaumen oder zur Zunge)',
    mnemonic: 'Palatum = Gaumen (nur im Oberkiefer!). Lingua = Zunge (nur im Unterkiefer!).',
    practiceNote: 'Am lingualen Zahnhals der UK-Frontzähne bildet sich durch die Unterzungenspeicheldrüsen besonders rasch Zahnstein.',
    color: {
      idleFill: '#1e293b',
      hoverFill: '#334155',
      activeFill: '#047857',
      border: '#34d399',
      activeBorder: '#6ee7b7',
      badgeBg: 'bg-emerald-500/20',
      badgeText: 'text-emerald-300',
      accent: '#34d399',
    },
  },
  mesial: {
    id: 'mesial',
    aliases: ['mesial', 'm'],
    name: 'Mesial (zur Kiefermitte)',
    abbreviation: 'M',
    latinName: 'Facies mesialis',
    germanName: 'Dem Zahnbogen folgend zur Gesichtsmitte (Mittellinie) hin',
    direction: 'Links (dem Zahnbogen nach vorne folgend)',
    mnemonic: 'M = Mitte! Immer die vordere Kontaktfläche zum mesialen Nachbarzahn.',
    practiceNote: 'Klassische Approximalkaries entsteht bevorzugt unterhalb des mesialen Kontaktpunkts. Wichtig für Zahnseide-Aufklärung.',
    color: {
      idleFill: '#1e293b',
      hoverFill: '#334155',
      activeFill: '#b45309',
      border: '#fbbf24',
      activeBorder: '#fde68a',
      badgeBg: 'bg-amber-500/20',
      badgeText: 'text-amber-300',
      accent: '#fbbf24',
    },
  },
  distal: {
    id: 'distal',
    aliases: ['distal', 'd'],
    name: 'Distal (vom Kieferzentrum weg)',
    abbreviation: 'D',
    latinName: 'Facies distalis',
    germanName: 'Dem Zahnbogen folgend von der Kiefermitte nach hinten weg',
    direction: 'Rechts (dem Zahnbogen nach hinten folgend)',
    mnemonic: 'Distal = Distanz zur Mitte! Immer die hintere Kontaktfläche zum Nachbarzahn.',
    practiceNote: 'Schwierig einzusehen und zu reinigen; erfordert bei der Füllungslegung sorgfältiges Anlegen von Teilmatrizen.',
    color: {
      idleFill: '#1e293b',
      hoverFill: '#334155',
      activeFill: '#be123c',
      border: '#fb7185',
      activeBorder: '#fecdd3',
      badgeBg: 'bg-rose-500/20',
      badgeText: 'text-rose-300',
      accent: '#fb7185',
    },
  },
};

function normalizeSurfaceId(input?: string | null): ToothSurfaceId {
  if (!input) return 'okklusal';
  const clean = input.trim().toLowerCase();
  for (const [key, info] of Object.entries(TOOTH_SURFACES)) {
    if (info.aliases.includes(clean) || key === clean) {
      return key as ToothSurfaceId;
    }
  }
  return 'okklusal';
}

export function InteractiveTooth({
  initialSurface = 'okklusal',
  selectedSurface: controlledSelectedSurface,
  onSurfaceSelect,
  onSelect,
  onChange,
  toothNumber = '16',
  className = '',
  showDetails = true,
  interactive = true,
  defaultArch = 'ok',
}: InteractiveToothProps) {
  const [uncontrolledSurface, setUncontrolledSurface] = useState<ToothSurfaceId>(() => normalizeSurfaceId(initialSurface));
  const [hoveredSurface, setHoveredSurface] = useState<ToothSurfaceId | null>(null);
  const [arch, setArch] = useState<'ok' | 'uk'>(defaultArch);
  const componentId = useId();

  const isControlled = controlledSelectedSurface !== undefined && controlledSelectedSurface !== null;
  const activeSurfaceId = isControlled ? normalizeSurfaceId(controlledSelectedSurface) : uncontrolledSurface;
  const activeInfo = TOOTH_SURFACES[activeSurfaceId] || TOOTH_SURFACES.okklusal;

  const handleSelect = (surfaceId: ToothSurfaceId) => {
    if (!interactive) return;
    if (!isControlled) {
      setUncontrolledSurface(surfaceId);
    }
    const info = TOOTH_SURFACES[surfaceId];
    if (onSurfaceSelect) onSurfaceSelect(info);
    if (onSelect) onSelect(surfaceId);
    if (onChange) onChange(surfaceId);
  };

  const oralTerm = useMemo(() => {
    return arch === 'ok'
      ? { label: 'Palatinal (P)', full: 'Palatinal (zum Gaumen / OK)', short: 'P' }
      : { label: 'Lingual (L)', full: 'Lingual (zur Zunge / UK)', short: 'L' };
  }, [arch]);

  // Geometrie für das eckige Kästchenschema (viewBox 0 0 320 320)
  // Außenquadrat: 40..280 (Breite: 240, Höhe: 240)
  // Innenquadrat (Okklusal): 110..210 (Breite: 100, Höhe: 100)
  const polygons = {
    vestibulaer: '40,40 280,40 210,110 110,110',
    oral: '110,210 210,210 280,280 40,280',
    mesial: '40,40 110,110 110,210 40,280',
    distal: '280,40 280,280 210,210 210,110',
  };

  const getBlockStyle = (id: ToothSurfaceId) => {
    const isSelected = activeSurfaceId === id;
    const isHovered = hoveredSurface === id;
    const conf = TOOTH_SURFACES[id];

    let fill = conf.color.idleFill;
    let stroke = '#334155';
    let strokeWidth = 2;

    if (isSelected) {
      fill = conf.color.activeFill;
      stroke = conf.color.border;
      strokeWidth = 3.5;
    } else if (isHovered && interactive) {
      fill = conf.color.hoverFill;
      stroke = conf.color.border;
      strokeWidth = 2.5;
    }

    return {
      fill,
      stroke,
      strokeWidth,
      cursor: interactive ? 'pointer' : 'default',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div
      className={`w-full max-w-full box-border overflow-x-hidden max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-4 sm:p-3.5 sm:p-6 shadow-2xl backdrop-blur-sm text-slate-100 ${className}`}
      aria-label="Interaktives eckiges Zahnflächen-Diagramm"
    >
      {/* Kopfzeile & didaktischer Kiefer-Umschalter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
              Zahn #{toothNumber}
            </span>
            <span className="text-xs font-medium text-slate-400">Eckiges 5-Flächen-Schema (Informationsmaterial)</span>
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-white mt-1">Anatomische Zahnflächen</h3>
        </div>

        {/* OK / UK Umschalter */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 px-2 font-medium hidden sm:inline">Kiefer:</span>
          <button
            type="button"
            onClick={() => setArch('ok')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${arch === 'ok' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            aria-pressed={arch === 'ok'}
          >
            Oberkiefer (Palatinal)
          </button>
          <button
            type="button"
            onClick={() => setArch('uk')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${arch === 'uk' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            aria-pressed={arch === 'uk'}
          >
            Unterkiefer (Lingual)
          </button>
        </div>
      </div>

      {/* Didaktischer Hinweis */}
      <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sky-400 font-bold text-[11px] sm:text-xs md:text-sm">💡</span>
          <span>
            Klicke auf die <strong>eckigen Flächen</strong> des Zahnschemas oder nutze die Tasten unten zur Auswahl.
          </span>
        </div>
        <span className="text-slate-500 text-[11px] hidden md:inline">Vorlage: Informationsmaterial.pdf</span>
      </div>

      {/* Diagramm-Bereich */}
      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-full max-w-full box-border overflow-x-hidden max-w-[340px] aspect-square flex items-center justify-center p-2">
          {/* Orientierungs-Badges außen */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-violet-400 bg-violet-950/40 border border-violet-800/50 px-2.5 py-0.5 rounded-full shadow">
            ▲ Vestibulär (Wange / Lippe)
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-0.5 rounded-full shadow">
            ▼ {oralTerm.full}
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded-full shadow -rotate-90 origin-center">
            ◄ Mesial (Mitte)
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-rose-400 bg-rose-950/40 border border-rose-800/50 px-2 py-0.5 rounded-full shadow rotate-90 origin-center">
            Distal (hinten) ►
          </div>

          {/* Eckiges SVG-Zahnschema */}
          <svg
            viewBox="0 0 320 320"
            className="max-w-full h-auto touch-manipulation w-full box-border overflow-x-hidden max-w-[280px] max-h-[280px] drop-shadow-xl select-none"
            role="region"
            aria-label="Eckiges 5-Flächen-Zahndiagramm"
          >
            <defs>
              <filter id={`glow-${componentId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* 1. Oben: Vestibulär (Trapez) */}
            <polygon
              points={polygons.vestibulaer}
              style={getBlockStyle('vestibulaer')}
              tabIndex={interactive ? 0 : -1}
              role="button"
              aria-label="Zahnfläche Vestibulär (Außen)"
              aria-pressed={activeSurfaceId === 'vestibulaer'}
              onClick={() => handleSelect('vestibulaer')}
              onMouseEnter={() => setHoveredSurface('vestibulaer')}
              onMouseLeave={() => setHoveredSurface(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect('vestibulaer');
                }
              }}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            />
            <text
              x="160"
              y="70"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f8fafc"
              className="font-bold text-xs sm:text-base pointer-events-none drop-shadow"
            >
              V
            </text>
            <text
              x="160"
              y="88"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#cbd5e1"
              className="font-medium text-[11px] pointer-events-none"
            >
              Vestibulär
            </text>

            {/* 2. Unten: Oral / Lingual / Palatinal (Trapez) */}
            <polygon
              points={polygons.oral}
              style={getBlockStyle('oral')}
              tabIndex={interactive ? 0 : -1}
              role="button"
              aria-label={`Zahnfläche ${oralTerm.full}`}
              aria-pressed={activeSurfaceId === 'oral'}
              onClick={() => handleSelect('oral')}
              onMouseEnter={() => setHoveredSurface('oral')}
              onMouseLeave={() => setHoveredSurface(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect('oral');
                }
              }}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            />
            <text
              x="160"
              y="238"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f8fafc"
              className="font-bold text-xs sm:text-base pointer-events-none drop-shadow"
            >
              {oralTerm.short}
            </text>
            <text
              x="160"
              y="256"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#cbd5e1"
              className="font-medium text-[11px] pointer-events-none"
            >
              {arch === 'ok' ? 'Palatinal' : 'Lingual'}
            </text>

            {/* 3. Links: Mesial (Trapez) */}
            <polygon
              points={polygons.mesial}
              style={getBlockStyle('mesial')}
              tabIndex={interactive ? 0 : -1}
              role="button"
              aria-label="Zahnfläche Mesial (zur Mitte)"
              aria-pressed={activeSurfaceId === 'mesial'}
              onClick={() => handleSelect('mesial')}
              onMouseEnter={() => setHoveredSurface('mesial')}
              onMouseLeave={() => setHoveredSurface(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect('mesial');
                }
              }}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            />
            <text
              x="75"
              y="152"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f8fafc"
              className="font-bold text-xs sm:text-base pointer-events-none drop-shadow"
            >
              M
            </text>
            <text
              x="75"
              y="170"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#cbd5e1"
              className="font-medium text-[11px] pointer-events-none"
            >
              Mesial
            </text>

            {/* 4. Rechts: Distal (Trapez) */}
            <polygon
              points={polygons.distal}
              style={getBlockStyle('distal')}
              tabIndex={interactive ? 0 : -1}
              role="button"
              aria-label="Zahnfläche Distal (nach hinten)"
              aria-pressed={activeSurfaceId === 'distal'}
              onClick={() => handleSelect('distal')}
              onMouseEnter={() => setHoveredSurface('distal')}
              onMouseLeave={() => setHoveredSurface(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect('distal');
                }
              }}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            />
            <text
              x="245"
              y="152"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f8fafc"
              className="font-bold text-xs sm:text-base pointer-events-none drop-shadow"
            >
              D
            </text>
            <text
              x="245"
              y="170"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#cbd5e1"
              className="font-medium text-[11px] pointer-events-none"
            >
              Distal
            </text>

            {/* 5. Zentrum: Okklusal (Quadrat) */}
            <rect
              x="110"
              y="110"
              width="100"
              height="100"
              rx="4"
              style={getBlockStyle('okklusal')}
              tabIndex={interactive ? 0 : -1}
              role="button"
              aria-label="Zahnfläche Okklusal (Kaufläche)"
              aria-pressed={activeSurfaceId === 'okklusal'}
              onClick={() => handleSelect('okklusal')}
              onMouseEnter={() => setHoveredSurface('okklusal')}
              onMouseLeave={() => setHoveredSurface(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect('okklusal');
                }
              }}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            />
            <text
              x="160"
              y="150"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f8fafc"
              className="font-bold text-base sm:text-xl pointer-events-none drop-shadow"
            >
              O
            </text>
            <text
              x="160"
              y="172"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#cbd5e1"
              className="font-semibold text-xs pointer-events-none"
            >
              Okklusal
            </text>

            {/* Trenn- und Rahmenlinien für gestochen scharfen Block-Look */}
            <rect x="40" y="40" width="240" height="240" fill="none" stroke="#475569" strokeWidth="2.5" className="pointer-events-none" />
            <line x1="40" y1="40" x2="110" y2="110" stroke="#475569" strokeWidth="2" className="pointer-events-none" />
            <line x1="280" y1="40" x2="210" y2="110" stroke="#475569" strokeWidth="2" className="pointer-events-none" />
            <line x1="40" y1="280" x2="110" y2="210" stroke="#475569" strokeWidth="2" className="pointer-events-none" />
            <line x1="280" y1="280" x2="210" y2="210" stroke="#475569" strokeWidth="2" className="pointer-events-none" />
          </svg>
        </div>
      </div>

      {/* Schnellauswahl-Leiste (Barrierefreie Buttons) */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center justify-between">
          <span>Fläche direkt anwählen:</span>
          <span className="text-[11px] text-slate-500 font-normal">Kürzel in der Patientenkartei</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {(['okklusal', 'vestibulaer', 'mesial', 'distal', 'oral'] as ToothSurfaceId[]).map((id) => {
            const item = TOOTH_SURFACES[id];
            const isSelected = activeSurfaceId === id;
            const label = id === 'oral' ? oralTerm.label : item.name.split(' ')[0];
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelect(id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 flex flex-col items-center justify-center gap-0.5 ${
                  isSelected
                    ? 'bg-slate-800 border-sky-400 text-white shadow-lg ring-1 ring-sky-400/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
                aria-pressed={isSelected}
              >
                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-sky-400">{id === 'oral' ? oralTerm.short : item.abbreviation}</span>
                <span className="truncate w-full max-w-full box-border overflow-x-hidden text-center text-[11px]">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Didaktische Wissenskarte für die ausgewählte Fläche */}
      {showDetails && (
        <div className="mt-5 p-2.5 sm:p-4 sm:p-3 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 transition-all duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800/70">
            <div className="flex items-center gap-2.5">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${activeInfo.color.badgeBg} ${activeInfo.color.badgeText} border border-current/20`}>
                Kürzel: {activeSurfaceId === 'oral' ? oralTerm.short : activeInfo.abbreviation}
              </span>
              <h4 className="text-xs sm:text-base font-bold text-white">
                {activeSurfaceId === 'oral' ? oralTerm.full : activeInfo.name}
              </h4>
            </div>
            <span className="text-xs text-slate-400 italic font-serif">{activeInfo.latinName}</span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-[11px] sm:text-xs md:text-sm">
            <div>
              <span className="text-slate-400 font-semibold">Bedeutung: </span>
              <span className="text-slate-200">{activeInfo.germanName}</span>
            </div>

            <div>
              <span className="text-slate-400 font-semibold">Lage im Mundraum: </span>
              <span className="text-slate-300">{activeInfo.direction}</span>
            </div>

            {/* Didaktische Eselsbrücke */}
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-xs flex items-start gap-2">
              <span className="text-emerald-400 text-xs sm:text-base leading-none">💡</span>
              <div>
                <strong className="text-emerald-300">ZFA-Prüfungs-Eselsbrücke: </strong>
                <span>{activeInfo.mnemonic}</span>
              </div>
            </div>

            {/* Praxisrelevanz & Füllungsdokumentation */}
            <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-800/40 text-sky-200 text-xs flex items-start gap-2">
              <span className="text-sky-400 text-xs sm:text-base leading-none">🩺</span>
              <div>
                <strong className="text-sky-300">Praxiswissen & Dokumentation: </strong>
                <span>{activeInfo.practiceNote}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveTooth;
