'use client';

import type { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  variant?: 'ghost' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export function IconButton({
  icon,
  onClick,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  className = '',
}: IconButtonProps) {
  const sizeClasses = size === 'sm' ? 'p-1' : 'p-2';

  const variantClasses =
    variant === 'danger'
      ? 'text-warm-text-secondary hover:text-rose-500 dark:text-warm-text-secondary-dark dark:hover:text-rose-400 hover:bg-rose-500/10'
      : 'text-warm-text-secondary hover:text-warm-text-primary dark:text-warm-text-secondary-dark dark:hover:text-warm-text-primary-dark hover:bg-warm-bg-alt dark:hover:bg-warm-bg-alt-dark';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        rounded-input transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/25
        ${sizeClasses} ${variantClasses} ${className}
      `}
    >
      {icon}
    </button>
  );
}
