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
  initialSurface,
  selectedSurface,
  onSurfaceSelect,
  onSelect,
  onChange,
  toothNumber = '16',
  className = '',
  showDetails = true,
  interactive = true,
  defaultArch = 'ok',
}: InteractiveToothProps) {
  const [internalSelected, setInternalSelected] = useState<ToothSurfaceId | null>(() => {
    if (!initialSurface) return null;
    const lower = initialSurface.toLowerCase().trim();
    for (const key of Object.keys(TOOTH_SURFACES) as ToothSurfaceId[]) {
      if (key === lower || TOOTH_SURFACES[key].aliases.includes(lower)) {
        return key;
      }
    }
    return null;
  });

  const [hoveredSurfaceId, setHoveredSurfaceId] = useState<ToothSurfaceId | null>(null);

  const isControlled = selectedSurface !== undefined;

  const currentSurfaceId = useMemo<ToothSurfaceId | null>(() => {
    const raw = isControlled ? selectedSurface : internalSelected;
    if (!raw) return null;
    const lower = raw.toLowerCase().trim();
    for (const key of Object.keys(TOOTH_SURFACES) as ToothSurfaceId[]) {
      if (key === lower || TOOTH_SURFACES[key].aliases.includes(lower)) {
        return key;
      }
    }
    return null;
  }, [isControlled, selectedSurface, internalSelected]);

  const currentSurfaceInfo = useMemo<ToothSurfaceInfo | null>(() => {
    return currentSurfaceId ? TOOTH_SURFACES[currentSurfaceId] : null;
  }, [currentSurfaceId]);

  const handleSelect = (surfaceId: ToothSurfaceId) => {
    if (!interactive) return;
    const nextSurface = currentSurfaceId === surfaceId ? null : surfaceId;
    if (!isControlled) {
      setInternalSelected(nextSurface);
    }
    if (nextSurface) {
      const info = TOOTH_SURFACES[nextSurface];
      onSurfaceSelect?.(info);
      onSelect?.(nextSurface);
      onChange?.(nextSurface);
    } else {
      onSelect?.('');
      onChange?.('');
    }
  };

  const getSurfaceVisualState = (id: ToothSurfaceId) => {
    const isSelected = currentSurfaceId === id;
    const isHovered = hoveredSurfaceId === id;
    const color = TOOTH_SURFACES[id].color;

    return {
      fill: isSelected ? color.activeFill : isHovered ? color.hoverFill : color.idleFill,
      stroke: isSelected ? color.activeBorder : isHovered ? color.border : '#334155',
      strokeWidth: isSelected ? 3 : 1.5,
      isSelected,
      isHovered,
    };
  };

  const okklusalState = getSurfaceVisualState('okklusal');
  const vestibulaerState = getSurfaceVisualState('vestibulaer');
  const oralState = getSurfaceVisualState('oral');
  const mesialState = getSurfaceVisualState('mesial');
  const distalState = getSurfaceVisualState('distal');

  const oralLabel = defaultArch === 'uk' ? 'L' : 'P';
  const oralSubtext = defaultArch === 'uk' ? 'Lingual' : 'Palatinal';

  return (
    <div
      className={`interactive-tooth-container flex flex-col items-center w-full max-w-full min-w-0 select-none touch-manipulation ${className}`}
    >
      {/* Zahnschema-Kopfzeile */}
      <div className="flex items-center justify-between w-full max-w-xs px-2 mb-2">
        <span className="text-xs font-semibold text-slate-300 tracking-wide">
          {toothNumber ? `Zahn ${toothNumber}` : 'Zahnschema'}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
          {defaultArch === 'uk' ? 'Unterkiefer (UK)' : 'Oberkiefer (OK)'}
        </span>
      </div>

      {/* Orientierungshilfe Oben: Vestibulär */}
      <div className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1 mb-1">
        <span className="text-violet-400">▲</span>
        <span>Vestibulär (Wange / Lippe)</span>
      </div>

      {/* SVG Zahnschema Container mit Orientierung Links & Rechts */}
      <div className="relative w-full max-w-[280px] flex items-center justify-center my-1">
        {/* Links: Mesial */}
        <div className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 text-[10px] sm:text-[11px] font-medium text-amber-400/90 -rotate-90 origin-center pointer-events-none whitespace-nowrap">
          ◄ Mesial (Mitte)
        </div>

        {/* Responsive Scalable SVG */}
        <div className="w-full aspect-square max-w-[240px] xs:max-w-[260px] sm:max-w-[280px] p-1">
          <svg
            viewBox="0 0 280 280"
            className="w-full h-full block overflow-visible drop-shadow-md focus-visible:outline-none"
            role="img"
            aria-label={`Interaktives Zahnschema für Zahn ${toothNumber || ''}. Wählen Sie eine Zahnfläche.`}
          >
            {/* Äußerer Kontur-Rahmen des Zahns */}
            <rect
              x="35"
              y="35"
              width="210"
              height="210"
              rx="16"
              ry="16"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="2"
            />

            {/* Diagonale Trennlinien zwischen den Flächen */}
            <line x1="35" y1="35" x2="85" y2="85" stroke="#1e293b" strokeWidth="2" />
            <line x1="245" y1="35" x2="195" y2="85" stroke="#1e293b" strokeWidth="2" />
            <line x1="85" y1="195" x2="35" y2="245" stroke="#1e293b" strokeWidth="2" />
            <line x1="195" y1="195" x2="245" y2="245" stroke="#1e293b" strokeWidth="2" />

            {/* 1. Vestibulär (Oben) */}
            <polygon
              points="35,35 245,35 195,85 85,85"
              fill={vestibulaerState.fill}
              stroke={vestibulaerState.stroke}
              strokeWidth={vestibulaerState.strokeWidth}
              strokeLinejoin="round"
              className={`transition-colors duration-150 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleSelect('vestibulaer')}
              onMouseEnter={() => interactive && setHoveredSurfaceId('vestibulaer')}
              onMouseLeave={() => interactive && setHoveredSurfaceId(null)}
              tabIndex={interactive ? 0 : -1}
              role={interactive ? 'button' : undefined}
              aria-label={`Vestibulär (Außenfläche)${vestibulaerState.isSelected ? ' ausgewählt' : ''}`}
              onKeyDown={(e) => {
                if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSelect('vestibulaer');
                }
              }}
            />
            <text
              x="140"
              y="58"
              textAnchor="middle"
              dominantBaseline="central"
              fill={vestibulaerState.isSelected ? '#ffffff' : '#e2e8f0'}
              fontSize="14"
              fontWeight="700"
              pointerEvents="none"
            >
              V
            </text>

            {/* 2. Mesial (Links) */}
            <polygon
              points="35,35 85,85 85,195 35,245"
              fill={mesialState.fill}
              stroke={mesialState.stroke}
              strokeWidth={mesialState.strokeWidth}
              strokeLinejoin="round"
              className={`transition-colors duration-150 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleSelect('mesial')}
              onMouseEnter={() => interactive && setHoveredSurfaceId('mesial')}
              onMouseLeave={() => interactive && setHoveredSurfaceId(null)}
              tabIndex={interactive ? 0 : -1}
              role={interactive ? 'button' : undefined}
              aria-label={`Mesial (zur Kiefermitte)${mesialState.isSelected ? ' ausgewählt' : ''}`}
              onKeyDown={(e) => {
                if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSelect('mesial');
                }
              }}
            />
            <text
              x="58"
              y="140"
              textAnchor="middle"
              dominantBaseline="central"
              fill={mesialState.isSelected ? '#ffffff' : '#e2e8f0'}
              fontSize="14"
              fontWeight="700"
              pointerEvents="none"
            >
              M
            </text>

            {/* 3. Distal (Rechts) */}
            <polygon
              points="245,35 195,85 195,195 245,245"
              fill={distalState.fill}
              stroke={distalState.stroke}
              strokeWidth={distalState.strokeWidth}
              strokeLinejoin="round"
              className={`transition-colors duration-150 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleSelect('distal')}
              onMouseEnter={() => interactive && setHoveredSurfaceId('distal')}
              onMouseLeave={() => interactive && setHoveredSurfaceId(null)}
              tabIndex={interactive ? 0 : -1}
              role={interactive ? 'button' : undefined}
              aria-label={`Distal (vom Kieferzentrum weg)${distalState.isSelected ? ' ausgewählt' : ''}`}
              onKeyDown={(e) => {
                if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSelect('distal');
                }
              }}
            />
            <text
              x="222"
              y="140"
              textAnchor="middle"
              dominantBaseline="central"
              fill={distalState.isSelected ? '#ffffff' : '#e2e8f0'}
              fontSize="14"
              fontWeight="700"
              pointerEvents="none"
            >
              D
            </text>

            {/* 4. Oral (Unten) */}
            <polygon
              points="85,195 195,195 245,245 35,245"
              fill={oralState.fill}
              stroke={oralState.stroke}
              strokeWidth={oralState.strokeWidth}
              strokeLinejoin="round"
              className={`transition-colors duration-150 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleSelect('oral')}
              onMouseEnter={() => interactive && setHoveredSurfaceId('oral')}
              onMouseLeave={() => interactive && setHoveredSurfaceId(null)}
              tabIndex={interactive ? 0 : -1}
              role={interactive ? 'button' : undefined}
              aria-label={`Oral (${oralSubtext})${oralState.isSelected ? ' ausgewählt' : ''}`}
              onKeyDown={(e) => {
                if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSelect('oral');
                }
              }}
            />
            <text
              x="140"
              y="222"
              textAnchor="middle"
              dominantBaseline="central"
              fill={oralState.isSelected ? '#ffffff' : '#e2e8f0'}
              fontSize="14"
              fontWeight="700"
              pointerEvents="none"
            >
              {oralLabel}
            </text>

            {/* 5. Okklusal (Zentrum) */}
            <rect
              x="85"
              y="85"
              width="110"
              height="110"
              rx="8"
              fill={okklusalState.fill}
              stroke={okklusalState.stroke}
              strokeWidth={okklusalState.strokeWidth}
              className={`transition-colors duration-150 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleSelect('okklusal')}
              onMouseEnter={() => interactive && setHoveredSurfaceId('okklusal')}
              onMouseLeave={() => interactive && setHoveredSurfaceId(null)}
              tabIndex={interactive ? 0 : -1}
              role={interactive ? 'button' : undefined}
              aria-label={`Okklusal (Kaufläche)${okklusalState.isSelected ? ' ausgewählt' : ''}`}
              onKeyDown={(e) => {
                if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSelect('okklusal');
                }
              }}
            />
            <text
              x="140"
              y="134"
              textAnchor="middle"
              dominantBaseline="central"
              fill={okklusalState.isSelected ? '#ffffff' : '#e2e8f0'}
              fontSize="20"
              fontWeight="800"
              pointerEvents="none"
            >
              O
            </text>
            <text
              x="140"
              y="156"
              textAnchor="middle"
              dominantBaseline="central"
              fill={okklusalState.isSelected ? '#e0f2fe' : '#94a3b8'}
              fontSize="11"
              fontWeight="500"
              pointerEvents="none"
            >
              Kaufläche
            </text>
          </svg>
        </div>

        {/* Rechts: Distal */}
        <div className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 text-[10px] sm:text-[11px] font-medium text-rose-400/90 rotate-90 origin-center pointer-events-none whitespace-nowrap">
          Distal (nach hinten) ►
        </div>
      </div>

      {/* Orientierungshilfe Unten: Oral */}
      <div className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1 mt-1">
        <span className="text-emerald-400">▼</span>
        <span>Oral ({oralSubtext})</span>
      </div>

      {/* Mobiloptimierte Touch-Gesten: Barrierefreie Daumen-Direktauswahl (min. 44x44px Touch Targets) */}
      {interactive && (
        <div className="surface-quick-selector mt-4 w-full max-w-sm px-1">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2 text-center">
            Flächen-Schnellauswahl:
          </p>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {(['vestibulaer', 'mesial', 'okklusal', 'distal', 'oral'] as ToothSurfaceId[]).map((id) => {
              const info = TOOTH_SURFACES[id];
              const isSelected = currentSurfaceId === id;
              const abbrev = id === 'oral' ? oralLabel : info.abbreviation;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelect(id)}
                  className={`min-h-[44px] min-w-[44px] px-1 py-1.5 rounded-lg text-xs font-medium flex flex-col items-center justify-center transition-all border ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-md shadow-sky-500/10 scale-105'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-slate-100 active:scale-95'
                  } focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none`}
                  aria-pressed={isSelected}
                  aria-label={`${info.name} auswählen`}
                >
                  <span className="font-bold text-sm leading-none">{abbrev}</span>
                  <span className="text-[9px] min-[360px]:text-[10px] text-slate-400 truncate max-w-[50px] leading-tight mt-0.5">
                    {info.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailansicht (Desktop / Tablet & Eingebetteter Modus) */}
      {showDetails && currentSurfaceInfo && (
        <div className="tooth-details-card mt-5 w-full max-w-md p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg text-left transition-all">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold ${currentSurfaceInfo.color.badgeBg} ${currentSurfaceInfo.color.badgeText} border border-current/20`}
                >
                  {currentSurfaceId === 'oral' ? oralLabel : currentSurfaceInfo.abbreviation}
                </span>
                <h3 className="text-base font-semibold text-slate-100">
                  {currentSurfaceInfo.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400 italic mt-0.5">
                {currentSurfaceInfo.latinName}
              </p>
            </div>
            {interactive && (
              <button
                type="button"
                onClick={() => {
                  if (!isControlled) setInternalSelected(null);
                  onSelect?.('');
                  onChange?.('');
                }}
                className="text-xs text-slate-400 hover:text-slate-200 min-h-[44px] px-2 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Auswahl aufheben"
              >
                Zurücksetzen
              </button>
            )}
          </div>

          <div className="mb-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
            <span className="font-semibold text-slate-200">🧭 Lage im Zahnbogen: </span>
            {currentSurfaceInfo.germanName} ({currentSurfaceInfo.direction})
          </div>

          <div className="mb-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
              <span>💡</span>
              <span>Merkhilfe für die Praxis:</span>
            </div>
            <p className="leading-relaxed">{currentSurfaceInfo.mnemonic}</p>
          </div>

          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30 text-xs text-violet-200/90">
            <div className="font-semibold text-violet-300 flex items-center gap-1.5 mb-1">
              <span>🩺</span>
              <span>Klinische Relevanz:</span>
            </div>
            <p className="leading-relaxed">{currentSurfaceInfo.practiceNote}</p>
          </div>
        </div>
      )}

      {/* Sticky Aktions-Bar am unteren Bildschirmrand für Smartphones (<640px) */}
      {showDetails && currentSurfaceInfo && (
        <div className="mobile-sticky-action-bar block sm:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 pb-safe shadow-2xl">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold ${currentSurfaceInfo.color.badgeBg} ${currentSurfaceInfo.color.badgeText} border border-current/20`}
              >
                {currentSurfaceId === 'oral' ? oralLabel : currentSurfaceInfo.abbreviation}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-100 truncate">
                  {currentSurfaceInfo.name}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentSurfaceInfo.direction}
                </p>
              </div>
            </div>
            {interactive && (
              <button
                type="button"
                onClick={() => {
                  if (!isControlled) setInternalSelected(null);
                  onSelect?.('');
                  onChange?.('');
                }}
                className="min-h-[44px] px-3.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 active:bg-slate-700 transition-colors shrink-0"
                aria-label="Auswahl aufheben"
              >
                ✕ Zurücksetzen
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default InteractiveTooth;
