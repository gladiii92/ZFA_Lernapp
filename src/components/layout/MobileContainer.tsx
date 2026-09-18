'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function MobileContainer({
  children,
  className,
  header,
  footer,
}: MobileContainerProps) {
  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#020617] flex justify-center text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-200">
      <main
        className={cn(
          'w-full max-w-md min-h-screen min-h-[100dvh] bg-[#0f172a] text-slate-100 flex flex-col relative',
          'shadow-2xl shadow-black/90 sm:border-x sm:border-slate-800/80',
          'overflow-x-hidden overscroll-y-none',
          'pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]',
          'transition-colors duration-200',
          className
        )}
      >
        {header}
        <div className="flex-1 flex flex-col min-h-0 w-full overflow-x-hidden">
          {children}
        </div>
        {footer}
      </main>
    </div>
  );
}
