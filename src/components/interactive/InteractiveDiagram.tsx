'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GraphicHotspot } from '@/types/course';

export interface InteractiveDiagramProps {
  imageSrc?: string;
  imageKey?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  hotspots?: GraphicHotspot[];
  initialLanguage?: 'de' | 'fr';
  className?: string;
  onHotspotSelect?: (hotspot: GraphicHotspot | null) => void;
}

// Zentrale Zuordnung für anatomische SVG-Grafiken
const IMAGE_KEY_MAP: Record<string, string> = {
  'tooth-anatomy': '/images/tooth-anatomy.svg',
  'periodontium': '/images/periodontium.svg',
  'tooth-substances': '/images/tooth-anatomy.svg',
  'tooth-types': '/images/tooth-types.svg',
  'fdi-scheme': '/images/fdi-scheme.svg',
  'hygiene-steps': '/images/tooth-anatomy.svg',
};

export function InteractiveDiagram({
  imageSrc,
  imageKey,
  alt,
  title,
  subtitle,
  hotspots = [],
  initialLanguage = 'de',
  className = '',
  onHotspotSelect,
}: InteractiveDiagramProps) {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [visitedHotspots, setVisitedHotspots] = useState<Set<string>>(new Set());
  const [language, setLanguage] = useState<'de' | 'fr'>(initialLanguage);
  const [imageError, setImageError] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const resolvedSrc = imageSrc || (imageKey ? IMAGE_KEY_MAP[imageKey] || `/images/${imageKey}.svg` : '/images/tooth-anatomy.svg');
  const selectedHotspot = hotspots.find((h) => h.id === selectedHotspotId) || null;
  const selectedIndex = selectedHotspot ? hotspots.findIndex((h) => h.id === selectedHotspot.id) : -1;
  const progressPercent = hotspots.length > 0 ? Math.round((visitedHotspots.size / hotspots.length) * 100) : 0;

  const handleHotspotClick = useCallback((hotspot: GraphicHotspot) => {
    if (selectedHotspotId === hotspot.id) {
      setSelectedHotspotId(null);
      onHotspotSelect?.(null);
    } else {
      setSelectedHotspotId(hotspot.id);
      setVisitedHotspots((prev) => new Set(prev).add(hotspot.id));
      onHotspotSelect?.(hotspot);
    }
  }, [selectedHotspotId, onHotspotSelect]);

  const handleClose = useCallback(() => {
    setSelectedHotspotId(null);
    onHotspotSelect?.(null);
  }, [onHotspotSelect]);

  const handlePrev = useCallback(() => {
    if (hotspots.length === 0) return;
    const currentIndex = hotspots.findIndex((h) => h.id === selectedHotspotId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : hotspots.length - 1;
    const prevHotspot = hotspots[prevIndex];
    setSelectedHotspotId(prevHotspot.id);
    setVisitedHotspots((prev) => new Set(prev).add(prevHotspot.id));
    onHotspotSelect?.(prevHotspot);
  }, [hotspots, selectedHotspotId, onHotspotSelect]);

  const handleNext = useCallback(() => {
    if (hotspots.length === 0) return;
    const currentIndex = hotspots.findIndex((h) => h.id === selectedHotspotId);
    const nextIndex = currentIndex < hotspots.length - 1 ? currentIndex + 1 : 0;
    const nextHotspot = hotspots[nextIndex];
    setSelectedHotspotId(nextHotspot.id);
    setVisitedHotspots((prev) => new Set(prev).add(nextHotspot.id));
    onHotspotSelect?.(nextHotspot);
  }, [hotspots, selectedHotspotId, onHotspotSelect]);

  const handleNextOrClose = useCallback(() => {
    if (hotspots.length === 0) return;
    const currentIndex = hotspots.findIndex((h) => h.id === selectedHotspotId);
    if (currentIndex >= 0 && currentIndex < hotspots.length - 1) {
      handleNext();
    } else {
      handleClose();
    }
  }, [hotspots, selectedHotspotId, handleNext, handleClose]);

  // Tastaturnavigation für barrierefreie Bedienung (ESC, Pfeiltasten)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' && selectedHotspotId) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && selectedHotspotId) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedHotspotId, handleClose, handleNext, handlePrev]);

  // Sanfter Fokus auf das Bottom-Sheet bei Auswahl
  useEffect(() => {
    if (selectedHotspotId && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [selectedHotspotId]);

  return (
    <div className={`w-full max-w-full bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xl relative overflow-hidden ${className}`}>
      {/* Kopfbereich: Didaktik, Status & Sprachschalter */}
      <div className="flex flex-col gap-3 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {language === 'de' ? 'Interaktives Schaubild' : 'Schéma interactif'}
            </span>
            {hotspots.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
                {visitedHotspots.size} / {hotspots.length} {language === 'de' ? 'erkundet' : 'explorés'}
              </span>
            )}
          </div>

          {/* Sprachumschalter mit min 44px Touch-Target */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/60">
            <button
              type="button"
              onClick={() => setLanguage('de')}
              className={`min-h-[44px] min-w-[44px] px-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                language === 'de'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Deutsche Sprache auswählen"
            >
              <span>🇩🇪</span>
              <span>DE</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`min-h-[44px] min-w-[44px] px-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                language === 'fr'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Passer en français"
            >
              <span>🇫🇷</span>
              <span>FR</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
            {title || (language === 'de' ? 'Anatomische Strukturen zum Mitmachen' : 'Structures anatomiques interactives')}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {subtitle || (language === 'de'
              ? 'Tippe auf die Markierungen auf der Grafik oder die Leiste darunter für Detailerklärungen.'
              : 'Touchez les repères pour afficher les explications détaillées.')}
          </p>
        </div>

        {/* Fortschrittsbalken */}
        {hotspots.length > 0 && (
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Grafik-Container: Angepasst an eckige 800x700 SVGs ohne seitliches Scrollen */}
      <div className="relative w-full aspect-[8/7] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/90 select-none touch-manipulation flex items-center justify-center">
        {imageError ? (
          <div className="p-6 text-center text-slate-400">
            <span className="text-3xl block mb-2">🦷</span>
            <p className="text-xs font-medium">
              {language === 'de' ? 'Grafik konnte nicht geladen werden' : 'Impossible de charger le schéma'}
            </p>
          </div>
        ) : (
          <img
            src={resolvedSrc}
            alt={alt || title || (language === 'de' ? 'Anatomische Vektorgrafik' : 'Schéma anatomique')}
            className="w-full h-full object-contain pointer-events-none"
            onError={() => setImageError(true)}
          />
        )}

        {/* Hotspot-Markierungen mit daumenfreundlichen >= 44x44px Touch-Targets */}
        {hotspots.map((hotspot, idx) => {
          const isSelected = selectedHotspotId === hotspot.id;
          const isVisited = visitedHotspots.has(hotspot.id);
          return (
            <button
              key={hotspot.id}
              type="button"
              onClick={() => handleHotspotClick(hotspot)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-full transition-transform active:scale-90"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={`${language === 'de' ? hotspot.titleDe : hotspot.titleFr}${hotspot.latin ? ` (${hotspot.latin})` : ''}`}
              aria-expanded={isSelected}
            >
              {/* Puls-Ring */}
              <span
                className={`absolute w-8 h-8 rounded-full transition-all ${
                  isSelected
                    ? 'bg-sky-400/40 animate-ping'
                    : isVisited
                    ? 'bg-emerald-400/20'
                    : 'bg-sky-400/30 animate-hotspot-pulse'
                }`}
              />
              {/* Optischer Pin-Kreis mit Nummer */}
              <span
                className={`relative w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                  isSelected
                    ? 'bg-sky-400 text-slate-950 ring-4 ring-sky-400/40 scale-110'
                    : isVisited
                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400/60'
                    : 'bg-slate-900/95 text-sky-400 border-2 border-sky-400 hover:bg-sky-400 hover:text-slate-950'
                }`}
              >
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Daumenfreundliche Schnellauswahl-Chip-Leiste direkt unter der Grafik */}
      {hotspots.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-0.5 mb-1.5">
            <span>{language === 'de' ? 'Schnellauswahl nach Nummer:' : 'Sélection rapide:'}</span>
            <span className="text-[11px] text-slate-500">{visitedHotspots.size}/{hotspots.length}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5">
            {hotspots.map((hotspot, idx) => {
              const isSelected = selectedHotspotId === hotspot.id;
              const isVisited = visitedHotspots.has(hotspot.id);
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => handleHotspotClick(hotspot)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-2 border transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-md shadow-sky-500/20'
                      : isVisited
                      ? 'bg-slate-800/90 text-emerald-300 border-emerald-500/40 hover:bg-slate-800'
                      : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isSelected
                        ? 'bg-slate-950 text-sky-400'
                        : isVisited
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="truncate max-w-[140px]">
                    {language === 'de' ? hotspot.titleDe : hotspot.titleFr}
                  </span>
                  {isVisited && !isSelected && (
                    <span className="text-emerald-400 text-xs font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Unten einfahrendes Bottom-Sheet für Detailerklärungen */}
      {selectedHotspot && (
        <>
          {/* Backdrop-Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 transition-opacity animate-fade-in"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Bottom-Sheet Container */}
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bottomSheetTitle"
            className="fixed inset-x-0 bottom-0 z-50 max-w-md mx-auto bg-slate-900/98 backdrop-blur-xl border-t border-x border-slate-700/80 rounded-t-3xl shadow-2xl p-4 sm:p-5 animate-bottom-sheet max-h-[85vh] overflow-y-auto pb-safe focus:outline-none"
            tabIndex={-1}
          >
            {/* Visuelle Griffleiste (Pull-Handle) */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3.5" />

            {/* Header: Indikator, Latein-Pill & Schließen-Button */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  {language === 'de'
                    ? `Struktur ${selectedIndex + 1} von ${hotspots.length}`
                    : `Repère ${selectedIndex + 1} sur ${hotspots.length}`}
                </span>
                {selectedHotspot.latin && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/30 font-mono">
                    ✨ {selectedHotspot.latin}
                  </span>
                )}
              </div>

              {/* Schließen-Button mit min 44x44px Touch-Target */}
              <button
                type="button"
                onClick={handleClose}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label={language === 'de' ? 'Erklärung schließen' : "Fermer l'explication"}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Haupttitel & zweisprachige Fachübersetzung */}
            <div className="mb-3.5">
              <h4 id="bottomSheetTitle" className="text-xl font-bold text-slate-100 leading-tight">
                {language === 'de' ? selectedHotspot.titleDe : selectedHotspot.titleFr}
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {language === 'de'
                  ? `Französisch: ${selectedHotspot.titleFr}`
                  : `Allemand: ${selectedHotspot.titleDe}`}
              </p>
            </div>

            {/* Detailerklärung */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3.5 sm:p-4 mb-3.5">
              <p className="text-sm text-slate-200 leading-relaxed selectable-text">
                {language === 'de' ? selectedHotspot.descriptionDe : selectedHotspot.descriptionFr}
              </p>
            </div>

            {/* Didaktischer ZFA-Praxistipp / Merksatz */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3 mb-4 flex items-start gap-2.5">
              <span className="text-lg leading-none mt-0.5" aria-hidden="true">💡</span>
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300 font-semibold block mb-0.5">
                  {language === 'de' ? 'ZFA-Praxistipp (Erstmal ganz in Ruhe einprägen):' : 'Conseil pratique assistante dentaire:'}
                </strong>
                {language === 'de'
                  ? 'Diese anatomische Struktur ist sowohl für die Behandlungsassistenz als auch für die fehlerfreie zahnärztliche Befundung und Dokumentation essenziell.'
                  : "Cette structure anatomique est essentielle pour l'assistance au fauteuil et la documentation clinique."}
              </div>
            </div>

            {/* Daumenfreundliche Navigation am unteren Rand (min 48px Touch-Targets) */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 min-h-[48px] px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 active:scale-95 transition-all text-sm font-semibold flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label={language === 'de' ? 'Vorherigen Hotspot anzeigen' : 'Repère précédent'}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{language === 'de' ? 'Zurück' : 'Précédent'}</span>
              </button>

              <button
                type="button"
                onClick={handleNextOrClose}
                className="flex-1 min-h-[48px] px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 active:scale-95 transition-all text-sm font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-sky-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label={
                  selectedIndex < hotspots.length - 1
                    ? (language === 'de' ? 'Nächsten Hotspot anzeigen' : 'Repère suivant')
                    : (language === 'de' ? 'Abschließen' : 'Terminer')
                }
              >
                <span>
                  {selectedIndex < hotspots.length - 1
                    ? (language === 'de' ? 'Weiter' : 'Suivant')
                    : (language === 'de' ? 'Verstanden ✓' : 'Compris ✓')}
                </span>
                {selectedIndex < hotspots.length - 1 && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
