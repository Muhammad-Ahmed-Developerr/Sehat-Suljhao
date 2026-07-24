import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#07121E] font-bold shadow-[0_4px_20px_rgba(0,212,255,0.3)] hover:shadow-[0_6px_25px_rgba(0,212,255,0.5)] hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-[#0E1C2F] text-[#FFFFFF] border border-[#00D4FF]/30 hover:border-[#00D4FF] hover:bg-[#152742] active:scale-[0.98]',
    danger:
      'bg-gradient-to-r from-[#FF4D4F] to-[#D93638] text-white font-bold shadow-[0_4px_20px_rgba(255,77,79,0.3)] hover:brightness-110 active:scale-[0.98]',
    ghost: 'text-[#9FB3C8] hover:text-[#FFFFFF] hover:bg-white/5 active:scale-[0.98]',
    glass:
      'bg-white/5 backdrop-blur-md text-[#FFFFFF] border border-white/10 hover:border-[#00D4FF]/40 hover:bg-white/10 active:scale-[0.98]'
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm font-medium px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base font-semibold px-6 py-3.5 rounded-2xl gap-2.5'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        'inline-flex items-center justify-center transition-all cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
