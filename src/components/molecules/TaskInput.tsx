'use client';

import { useState, useRef, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { TextInput } from '@/components/atoms/TextInput';
import { Button } from '@/components/atoms/Button';
import { useTasks } from '@/hooks/useTasks';
import { MAX_TITLE_LENGTH } from '@/lib/constants';

export function TaskInput() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTasks();

  const handleSubmit = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) return;

    const title = trimmed.slice(0, MAX_TITLE_LENGTH);
    dispatch({ type: 'ADD_TASK', payload: { title } });
    setInputValue('');
    inputRef.current?.focus();
  }, [inputValue, dispatch]);

  return (
    <div className="flex gap-3">
      <TextInput
        ref={inputRef}
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        placeholder="タスクを入力..."
        maxLength={MAX_TITLE_LENGTH}
        autoFocus
        ariaLabel="新しいタスクを入力"
      />
      <Button
        onClick={handleSubmit}
        disabled={inputValue.trim().length === 0}
        ariaLabel="タスクを追加"
        className="flex items-center gap-1.5 whitespace-nowrap"
      >
        <Plus size={18} strokeWidth={2} />
        <span className="hidden sm:inline">追加</span>
      </Button>
    </div>
  );
}
