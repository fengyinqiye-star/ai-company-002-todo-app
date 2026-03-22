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
          w-full bg-white dark:bg-warmGray-800
          border border-warmGray-200 dark:border-warmGray-700
          rounded-input px-4 py-3
          text-warmGray-900 dark:text-warmGray-50
          text-task-title
          placeholder:text-warmGray-400 dark:placeholder:text-warmGray-500
          focus:outline-none focus:ring-2 focus:ring-accent-500/20
          focus:border-accent-500 dark:focus:border-accent-400
          transition-all duration-200
        "
      />
    );
  }
);
