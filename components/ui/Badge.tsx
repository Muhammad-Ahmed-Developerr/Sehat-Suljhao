import React from 'react';
import { clsx } from 'clsx';
import { ParameterStatus, SeverityLevel } from '@/types/medical';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'normal' | 'high' | 'low' | 'critical' | 'cyan' | 'purple' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className,
  icon
}) => {
  const variantStyles = {
    normal: 'bg-[rgba(0,230,118,0.12)] text-[#00E676] border-[rgba(0,230,118,0.3)]',
    high: 'bg-[rgba(255,193,7,0.12)] text-[#FFC107] border-[rgba(255,193,7,0.3)]',
    low: 'bg-[rgba(91,231,255,0.12)] text-[#5BE7FF] border-[rgba(91,231,255,0.3)]',
    critical: 'bg-[rgba(255,77,79,0.15)] text-[#FF4D4F] border-[rgba(255,77,79,0.35)]',
    cyan: 'bg-[rgba(0,212,255,0.12)] text-[#00D4FF] border-[rgba(0,212,255,0.3)]',
    purple: 'bg-[rgba(168,85,247,0.12)] text-[#C084FC] border-[rgba(168,85,247,0.3)]',
    neutral: 'bg-[rgba(159,179,200,0.12)] text-[#9FB3C8] border-[rgba(159,179,200,0.25)]'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-lg gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 rounded-xl gap-2'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center border whitespace-nowrap tracking-wide transition-all',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export const statusToBadgeVariant = (status: ParameterStatus | SeverityLevel | string): BadgeProps['variant'] => {
  switch (status.toLowerCase()) {
    case 'normal':
    case 'low': // low severity
      return 'normal';
    case 'high':
    case 'moderate':
      return 'high';
    case 'critical':
      return 'critical';
    case 'analyzing':
      return 'purple';
    default:
      return 'cyan';
  }
};
