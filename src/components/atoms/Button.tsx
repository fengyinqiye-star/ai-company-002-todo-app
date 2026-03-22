'use client';

import type { ReactNode } from 'react';
import type { ButtonVariant, ButtonSize } from '@/types';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
    dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:active:bg-indigo-600
    text-white rounded-input shadow-sm
    font-body font-medium text-button
  `,
  ghost: `
    text-warm-text-secondary hover:text-warm-text-primary
    dark:text-warm-text-secondary-dark dark:hover:text-warm-text-primary-dark
    hover:bg-warm-bg-alt dark:hover:bg-warm-bg-alt-dark
    rounded-input
    font-body font-medium text-button
  `,
  danger: `
    text-rose-500 hover:text-white hover:bg-rose-500
    dark:text-rose-400 dark:hover:text-white dark:hover:bg-rose-500
    rounded-input
    font-body font-medium text-button
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-5 py-2.5',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  ariaLabel,
  className = '',
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
