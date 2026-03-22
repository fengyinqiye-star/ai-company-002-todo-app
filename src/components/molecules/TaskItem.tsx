'use client';

import { memo, useCallback, useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Trash2, GripVertical } from 'lucide-react';
import { Checkbox } from '@/components/atoms/Checkbox';
import { IconButton } from '@/components/atoms/IconButton';
import { useTasks } from '@/hooks/useTasks';
import {
  taskItemVariants,
  taskItemTransition,
  strikethroughVariants,
} from '@/animations/variants';
import { MAX_TITLE_LENGTH } from '@/lib/constants';
import type { Task } from '@/types';

interface TaskItemProps {
  task: Task;
  dragControls?: boolean;
}

export const TaskItem = memo(function TaskItem({ task, dragControls = false }: TaskItemProps) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_TASK', payload: { id: task.id } });
  }, [dispatch, task.id]);

  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE_TASK', payload: { id: task.id } });
  }, [dispatch, task.id]);

  const handleDoubleClick = useCallback(() => {
    if (task.completed) return;
    setEditValue(task.title);
    setIsEditing(true);
  }, [task.completed, task.title]);

  const handleEditSubmit = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed.length === 0) {
      setEditValue(task.title);
      setIsEditing(false);
      return;
    }
    const title = trimmed.slice(0, MAX_TITLE_LENGTH);
    if (title !== task.title) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, title } });
    }
    setIsEditing(false);
  }, [editValue, task.id, task.title, dispatch]);

  const handleEditCancel = useCallback(() => {
    setEditValue(task.title);
    setIsEditing(false);
  }, [task.title]);

  const handleEditKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleEditSubmit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleEditCancel();
      }
    },
    [handleEditSubmit, handleEditCancel]
  );

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  return (
    <motion.div
      layout
      variants={taskItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={taskItemTransition}
      className="group"
      role="listitem"
    >
      <div
        className={`
          flex items-center gap-3 px-5 py-4
          bg-warm-surface dark:bg-warm-surface-dark
          rounded-card shadow-card dark:shadow-card-dark
          hover:shadow-card-hover dark:hover:shadow-card-hover-dark
          border border-warm-border/50 dark:border-warm-border-dark/50
          transition-all duration-250
        `}
      >
        {dragControls && (
          <div
            className="
              cursor-grab active:cursor-grabbing
              text-warm-border dark:text-warm-border-dark
              hover:text-warm-text-secondary
              touch-none
            "
            aria-label="ドラッグして並び替え"
          >
            <GripVertical size={18} strokeWidth={1.5} />
          </div>
        )}

        <Checkbox
          checked={task.completed}
          onChange={handleToggle}
          ariaLabel={`${task.title}を${task.completed ? '未完了にする' : '完了にする'}`}
        />

        <div className="flex-1 min-w-0 relative">
          {isEditing ? (
            <input
              ref={editInputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleEditKeyDown}
              onBlur={handleEditSubmit}
              maxLength={MAX_TITLE_LENGTH}
              aria-label="タスクを編集"
              className="
                w-full bg-transparent
                text-task-title text-warm-text-primary dark:text-warm-text-primary-dark
                border-b-2 border-indigo-500 dark:border-indigo-400
                outline-none py-0
              "
            />
          ) : (
            <span
              onDoubleClick={handleDoubleClick}
              className={`
                text-task-title block truncate transition-colors duration-200
                ${!task.completed ? 'cursor-text' : ''}
                ${task.completed
                  ? 'text-warm-text-secondary dark:text-warm-text-secondary-dark'
                  : 'text-warm-text-primary dark:text-warm-text-primary-dark'
                }
              `}
              title={task.completed ? undefined : 'ダブルクリックで編集'}
            >
              {task.title}
            </span>
          )}
          {!isEditing && (
            <motion.div
              variants={strikethroughVariants}
              initial={false}
              animate={task.completed ? 'checked' : 'unchecked'}
              className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-warm-text-secondary dark:bg-warm-text-secondary-dark"
              style={{ originX: 0 }}
            />
          )}
        </div>

        <IconButton
          icon={<Trash2 size={18} strokeWidth={1.5} />}
          onClick={handleDelete}
          ariaLabel={`${task.title}を削除`}
          variant="danger"
          size="sm"
          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150"
        />
      </div>
    </motion.div>
  );
});
