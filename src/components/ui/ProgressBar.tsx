'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabels?: boolean;
  className?: string;
  barColor?: string;
}

export function ProgressBar({
  current,
  total,
  showLabels = false,
  className,
  barColor = 'bg-[#58cc02]',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0;

  return (
    <div className={cn('w-full flex flex-col gap-1', className)}>
      {showLabels && (
        <div className="flex justify-between text-xs font-bold text-slate-500 px-1">
          <span>Fortschritt / Progrès</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="h-3.5 sm:h-4 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 relative shadow-inner">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 relative overflow-hidden',
            barColor
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Top highlight shine */}
          <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/30 rounded-t-full" />
        </div>
      </div>
    </div>
  );
}

