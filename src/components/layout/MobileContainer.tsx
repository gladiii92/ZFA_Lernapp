'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <main
      className={cn(
        'w-full max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col relative shadow-2xl shadow-slate-300/50 sm:border-x sm:border-slate-200/80',
        className
      )}
    >
      {children}
    </main>
  );
}

