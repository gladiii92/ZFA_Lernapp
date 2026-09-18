'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Zap, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { sounds } from '@/lib/sound';

interface CompletionModalProps {
  moduleTitleDe: string;
  moduleTitleFr: string;
  xpEarned: number;
  onFinish: () => void;
  onRestart: () => void;
}

export function CompletionModal({
  moduleTitleDe,
  moduleTitleFr,
  xpEarned,
  onFinish,
  onRestart,
}: CompletionModalProps) {
  useEffect(() => {
    sounds.playFanfare();

    try {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#10b981', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#10b981', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch (e) {
      console.error('Confetti error:', e);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#0f172a] rounded-3xl max-w-sm w-full p-6 text-center border border-slate-700/80 shadow-2xl relative overflow-hidden text-slate-100 animate-pop-in">
        {/* Glow-Effekte */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl -z-10 pointer-events-none" />

        {/* Trophäen-Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 border-4 border-amber-600 shadow-xl shadow-amber-950/40 flex items-center justify-center text-4xl mb-4 animate-bounce-short">
          🏆
        </div>

        <h2 className="text-xl font-black text-slate-100 leading-tight">
          Modul gemeistert!
        </h2>
        <p className="text-sm font-bold text-sky-400 mt-0.5">
          Module terminé avec succès !
        </p>

        <p className="text-xs text-slate-400 mt-2 font-medium">
          {moduleTitleDe} • <span className="italic">{moduleTitleFr}</span>
        </p>

        {/* Belohnungs-Karten */}
        <div className="my-5 grid grid-cols-2 gap-2.5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex flex-col items-center">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400 mb-1" />
            <span className="text-xl font-black text-amber-300">+{xpEarned}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">XP erhalten</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex flex-col items-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-xl font-black text-emerald-300">100 %</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Geschafft</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onFinish}
            className="min-h-[48px] text-base"
          >
            <span>Zur Roadmap • Continuer</span>
            <ArrowRight className="w-5 h-5 ml-1.5 inline" />
          </Button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full min-h-[44px] py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Modul wiederholen • Répéter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
