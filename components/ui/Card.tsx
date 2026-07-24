import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: 'none' | 'cyan' | 'emerald' | 'danger';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  hoverEffect = true,
  ...props
}) => {
  const glowStyles = {
    none: '',
    cyan: 'glow-cyan',
    emerald: 'glow-emerald',
    danger: 'glow-danger'
  };

  return (
    <div
      className={clsx(
        'glass-panel rounded-2xl p-5 border border-[rgba(91,231,255,0.12)] relative overflow-hidden',
        hoverEffect && 'glass-panel-hover',
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {/* Soft reflective corner highlight */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-radial-glow opacity-50 pointer-events-none rounded-full" />
      {children}
    </div>
  );
};
