'use client';

import { forwardRef, type KeyboardEvent } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
  ariaLabel: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      value,
      onChange,
      onSubmit,
      placeholder = '',
      maxLength = 200,
      autoFocus = false,
      ariaLabel,
    },
    ref
  ) {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        e.preventDefault();
        onSubmit();
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        className="
          w-full bg-warm-surface dark:bg-warm-surface-dark
          border border-warm-border dark:border-warm-border-dark
          rounded-input px-4 py-3
          text-warm-text-primary dark:text-warm-text-primary-dark
          text-task-title font-body
          placeholder:text-warm-text-secondary dark:placeholder:text-warm-text-secondary-dark
          shadow-input
          focus:outline-none focus:ring-2 focus:ring-indigo-500/20
          focus:border-indigo-400 dark:focus:border-indigo-400
          transition-all duration-200
        "
      />
    );
  }
);
