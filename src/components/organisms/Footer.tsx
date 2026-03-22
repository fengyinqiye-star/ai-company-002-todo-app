'use client';

import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { useTasks } from '@/hooks/useTasks';

export function Footer() {
  const { state, activeCount, completedCount, dispatch } = useTasks();

  // タスクが1件もなければフッターを表示しない
  if (state.tasks.length === 0) return null;

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <footer className="flex items-center justify-between mt-6 px-1">
      <Badge
        count={activeCount}
        label={`残り ${activeCount} 件`}
      />
      {completedCount > 0 && (
        <Button
          onClick={handleClearCompleted}
          variant="ghost"
          size="sm"
          ariaLabel="完了したタスクをすべて削除"
        >
          完了をすべて削除
        </Button>
      )}
    </footer>
  );
}
