import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskList } from '@/components/organisms/TaskList';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';
import type { Task, TaskState } from '@/types';

// lucide-react のモック
jest.mock('lucide-react', () => ({
  ClipboardList: () => <span data-testid="clipboard-icon" />,
  Trash2: () => <span data-testid="trash-icon" />,
  GripVertical: () => <span data-testid="grip-icon" />,
}));

// @radix-ui/react-checkbox のモック
jest.mock('@radix-ui/react-checkbox', () => ({
  Root: ({ children, checked, onCheckedChange, 'aria-label': ariaLabel, ...props }: any) => (
    <button role="checkbox" aria-checked={checked} aria-label={ariaLabel} onClick={() => onCheckedChange(!checked)}>
      {children}
    </button>
  ),
  Indicator: ({ children }: any) => <span>{children}</span>,
}));

const createTask = (id: string, title: string, completed = false): Task => ({
  id,
  title,
  completed,
  createdAt: '2026-03-20T00:00:00.000Z',
  order: 0,
});

const createMockContext = (
  tasks: Task[],
  filteredTasks: Task[],
  filter: 'all' | 'active' | 'completed' = 'all'
): TaskContextValue => {
  const state: TaskState = { tasks, filter };
  return {
    state,
    dispatch: jest.fn(),
    filteredTasks,
    activeCount: tasks.filter(t => !t.completed).length,
    completedCount: tasks.filter(t => t.completed).length,
  };
};

function renderWithContext(ctx: TaskContextValue) {
  return render(
    <TaskContext.Provider value={ctx}>
      <TaskList />
    </TaskContext.Provider>
  );
}

describe('TaskList', () => {
  it('タスクがない場合、空状態メッセージが表示される', () => {
    const ctx = createMockContext([], [], 'all');
    renderWithContext(ctx);

    expect(screen.getByText('タスクを追加してみましょう')).toBeInTheDocument();
  });

  it('フィルタがactiveでタスクがない場合、未完了メッセージが表示される', () => {
    const ctx = createMockContext([], [], 'active');
    renderWithContext(ctx);

    expect(screen.getByText('未完了のタスクはありません')).toBeInTheDocument();
  });

  it('フィルタがcompletedでタスクがない場合、完了メッセージが表示される', () => {
    const ctx = createMockContext([], [], 'completed');
    renderWithContext(ctx);

    expect(screen.getByText('完了したタスクはありません')).toBeInTheDocument();
  });

  it('タスクがある場合、タスク一覧が表示される', () => {
    const tasks = [createTask('1', 'タスクA'), createTask('2', 'タスクB')];
    const ctx = createMockContext(tasks, tasks);
    renderWithContext(ctx);

    expect(screen.getByText('タスクA')).toBeInTheDocument();
    expect(screen.getByText('タスクB')).toBeInTheDocument();
  });

  it('タスク一覧にlistロールが設定されている', () => {
    const ctx = createMockContext([], []);
    renderWithContext(ctx);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('フィルタがactiveでタスクがある場合、ドラッグなしでタスク一覧が表示される', () => {
    const tasks = [createTask('1', 'アクティブタスク')];
    const ctx = createMockContext(tasks, tasks, 'active');
    renderWithContext(ctx);

    expect(screen.getByText('アクティブタスク')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('フィルタがcompletedでタスクがある場合、ドラッグなしでタスク一覧が表示される', () => {
    const tasks = [createTask('1', '完了済みタスク', true)];
    const ctx = createMockContext(tasks, tasks, 'completed');
    renderWithContext(ctx);

    expect(screen.getByText('完了済みタスク')).toBeInTheDocument();
  });
});
