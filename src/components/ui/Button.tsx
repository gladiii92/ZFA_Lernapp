'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { sounds } from '@/lib/sound';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'white' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  onClick,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    sounds.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-extrabold rounded-2xl transition-all select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 min-h-[38px]',
    md: 'text-sm sm:text-base px-5 py-3 min-h-[48px]',
    lg: 'text-base sm:text-lg px-6 py-3.5 min-h-[54px]',
  };

  const variantStyles = {
    primary:
      'bg-[#58cc02] text-white border-b-4 border-[#46a302] hover:bg-[#52be02] active:border-b-0 active:translate-y-1 shadow-sm',
    secondary:
      'bg-sky-500 text-white border-b-4 border-sky-700 hover:bg-sky-600 active:border-b-0 active:translate-y-1 shadow-sm',
    danger:
      'bg-rose-500 text-white border-b-4 border-rose-700 hover:bg-rose-600 active:border-b-0 active:translate-y-1 shadow-sm',
    white:
      'bg-white text-slate-700 border-2 border-slate-200 border-b-4 border-b-slate-300 hover:bg-slate-50 active:border-b-2 active:translate-y-0.5 shadow-xs',
    outline:
      'bg-transparent text-slate-700 border-2 border-slate-300 hover:bg-slate-100',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100/80 active:bg-slate-200',
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

