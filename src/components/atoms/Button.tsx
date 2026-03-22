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
    bg-accent-500 hover:bg-accent-600 active:bg-accent-700
    dark:bg-accent-400 dark:hover:bg-accent-500 dark:active:bg-accent-600
    text-white rounded-input
    font-medium text-button
  `,
  ghost: `
    text-warmGray-500 hover:text-warmGray-700
    dark:text-warmGray-400 dark:hover:text-warmGray-200
    hover:bg-warmGray-100 dark:hover:bg-warmGray-700
    rounded-input
    font-medium text-button
  `,
  danger: `
    text-danger-500 hover:text-white hover:bg-danger-500
    dark:text-danger-400 dark:hover:text-white dark:hover:bg-danger-500
    rounded-input
    font-medium text-button
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-3',
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
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
