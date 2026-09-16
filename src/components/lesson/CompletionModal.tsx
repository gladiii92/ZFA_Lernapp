'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Zap, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
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
    // Play fanfare
    sounds.playFanfare();

    // Fire celebratory confetti cannons!
    try {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'],
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-pop-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-4 border-emerald-400 shadow-2xl relative overflow-hidden">
        {/* Glow behind trophy */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-100 rounded-full blur-2xl -z-10 opacity-70" />

        {/* Big Trophy Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 border-4 border-amber-500 shadow-lg flex items-center justify-center text-4xl mb-4 animate-bounce-short">
          🏆
        </div>

        <h2 className="text-xl font-black text-slate-900 leading-tight">
          Modul gemeistert!
        </h2>
        <p className="text-sm font-bold text-indigo-700 mt-0.5">
          Module terminé avec succès !
        </p>

        <p className="text-xs text-slate-500 mt-2 font-medium">
          {moduleTitleDe} • <span className="italic">{moduleTitleFr}</span>
        </p>

        {/* Stats card */}
        <div className="my-5 grid grid-cols-2 gap-2.5">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 flex flex-col items-center">
            <Zap className="w-6 h-6 text-sky-500 fill-sky-400 mb-1" />
            <span className="text-xl font-black text-sky-900">+{xpEarned}</span>
            <span className="text-[10px] uppercase font-bold text-sky-600">XP erhalten</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex flex-col items-center">
            <CheckCircle className="w-6 h-6 text-emerald-500 mb-1" />
            <span className="text-xl font-black text-emerald-900">100 %</span>
            <span className="text-[10px] uppercase font-bold text-emerald-600">Geschafft</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onFinish}
            className="text-base"
          >
            <span>Zur Roadmap / Continuer</span>
            <ArrowRight className="w-5 h-5 ml-1.5 inline" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onRestart}
            className="text-xs text-slate-500"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1 inline" />
            Modul wiederholen / Répéter
          </Button>
        </div>
      </div>
    </div>
  );
}
