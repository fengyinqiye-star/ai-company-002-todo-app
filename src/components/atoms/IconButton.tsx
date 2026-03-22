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
      ? 'text-warmGray-400 hover:text-danger-500 dark:text-warmGray-500 dark:hover:text-danger-400 hover:bg-danger-500/10'
      : 'text-warmGray-500 hover:text-warmGray-700 dark:text-warmGray-400 dark:hover:text-warmGray-200 hover:bg-warmGray-100 dark:hover:bg-warmGray-700';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        rounded-input transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/20
        ${sizeClasses} ${variantClasses} ${className}
      `}
    >
      {icon}
    </button>
  );
}
