import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from '@/components/molecules/TaskItem';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';
import type { Task, TaskState } from '@/types';

// lucide-react のモック
jest.mock('lucide-react', () => ({
  Trash2: () => <span data-testid="trash-icon" />,
  GripVertical: () => <span data-testid="grip-icon" />,
}));

// @radix-ui/react-checkbox のモック
jest.mock('@radix-ui/react-checkbox', () => ({
  Root: ({ children, checked, onCheckedChange, 'aria-label': ariaLabel, ...props }: any) => (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      {children}
    </button>
  ),
  Indicator: ({ children }: any) => <span>{children}</span>,
}));

const createTask = (overrides?: Partial<Task>): Task => ({
  id: 'task-1',
  title: '買い物をする',
  completed: false,
  createdAt: '2026-03-20T00:00:00.000Z',
  order: 0,
  ...overrides,
});

const createMockContext = (overrides?: Partial<TaskContextValue>): TaskContextValue => {
  const state: TaskState = { tasks: [], filter: 'all' };
  return {
    state,
    dispatch: jest.fn(),
    filteredTasks: [],
    activeCount: 0,
    completedCount: 0,
    ...overrides,
  };
};

function renderWithContext(task: Task, mockContext: TaskContextValue, dragControls = false) {
  return render(
    <TaskContext.Provider value={mockContext}>
      <TaskItem task={task} dragControls={dragControls} />
    </TaskContext.Provider>
  );
}

describe('TaskItem', () => {
  it('タスクのタイトルが表示される', () => {
    const ctx = createMockContext();
    const task = createTask();
    renderWithContext(task, ctx);

    expect(screen.getByText('買い物をする')).toBeInTheDocument();
  });

  it('未完了タスクのチェックボックスが未チェック状態', () => {
    const ctx = createMockContext();
    const task = createTask({ completed: false });
    renderWithContext(task, ctx);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('完了タスクのチェックボックスがチェック状態', () => {
    const ctx = createMockContext();
    const task = createTask({ completed: true });
    renderWithContext(task, ctx);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('チェックボックスクリックでTOGGLE_TASKがdispatchされる', async () => {
    const ctx = createMockContext();
    const task = createTask({ id: 'toggle-test' });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.click(screen.getByRole('checkbox'));

    expect(ctx.dispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_TASK',
      payload: { id: 'toggle-test' },
    });
  });

  it('削除ボタンクリックでDELETE_TASKがdispatchされる', async () => {
    const ctx = createMockContext();
    const task = createTask({ id: 'delete-test', title: '削除テスト' });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('削除テストを削除'));

    expect(ctx.dispatch).toHaveBeenCalledWith({
      type: 'DELETE_TASK',
      payload: { id: 'delete-test' },
    });
  });

  it('未完了タスクのチェックボックスに適切なaria-labelが設定されている', () => {
    const ctx = createMockContext();
    const task = createTask({ title: 'テスト', completed: false });
    renderWithContext(task, ctx);

    expect(screen.getByLabelText('テストを完了にする')).toBeInTheDocument();
  });

  it('完了タスクのチェックボックスに適切なaria-labelが設定されている', () => {
    const ctx = createMockContext();
    const task = createTask({ title: 'テスト', completed: true });
    renderWithContext(task, ctx);

    expect(screen.getByLabelText('テストを未完了にする')).toBeInTheDocument();
  });

  it('削除ボタンに適切なaria-labelが設定されている', () => {
    const ctx = createMockContext();
    const task = createTask({ title: 'アクセシビリティ' });
    renderWithContext(task, ctx);

    expect(screen.getByLabelText('アクセシビリティを削除')).toBeInTheDocument();
  });

  // --- dragControls ---
  it('dragControls=trueの場合、ドラッグハンドルが表示される', () => {
    const ctx = createMockContext();
    const task = createTask();
    renderWithContext(task, ctx, true);

    expect(screen.getByLabelText('ドラッグして並び替え')).toBeInTheDocument();
  });

  it('dragControls=falseの場合、ドラッグハンドルが表示されない', () => {
    const ctx = createMockContext();
    const task = createTask();
    renderWithContext(task, ctx, false);

    expect(screen.queryByLabelText('ドラッグして並び替え')).not.toBeInTheDocument();
  });

  // --- ダブルクリック編集 ---
  it('未完了タスクをダブルクリックすると編集モードになる', async () => {
    const ctx = createMockContext();
    const task = createTask({ completed: false });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.dblClick(screen.getByText('買い物をする'));

    expect(screen.getByLabelText('タスクを編集')).toBeInTheDocument();
  });

  it('完了タスクをダブルクリックしても編集モードにならない', async () => {
    const ctx = createMockContext();
    const task = createTask({ completed: true });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.dblClick(screen.getByText('買い物をする'));

    expect(screen.queryByLabelText('タスクを編集')).not.toBeInTheDocument();
  });

  it('編集モードでEnterキーを押すとEDIT_TASKがdispatchされる', async () => {
    const ctx = createMockContext();
    const task = createTask({ id: 'edit-test', title: '元のタイトル', completed: false });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.dblClick(screen.getByText('元のタイトル'));

    const editInput = screen.getByLabelText('タスクを編集');
    await user.clear(editInput);
    await user.type(editInput, '新しいタイトル');
    await user.keyboard('{Enter}');

    expect(ctx.dispatch).toHaveBeenCalledWith({
      type: 'EDIT_TASK',
      payload: { id: 'edit-test', title: '新しいタイトル' },
    });
  });

  it('編集モードでEscapeキーを押すと編集がキャンセルされる', async () => {
    const ctx = createMockContext();
    const task = createTask({ title: '元のタイトル', completed: false });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.dblClick(screen.getByText('元のタイトル'));

    const editInput = screen.getByLabelText('タスクを編集');
    await user.clear(editInput);
    await user.type(editInput, '変更中');
    await user.keyboard('{Escape}');

    // 編集モードが終了してタイトルが元に戻る
    expect(screen.queryByLabelText('タスクを編集')).not.toBeInTheDocument();
    expect(screen.getByText('元のタイトル')).toBeInTheDocument();
  });

  it('編集モードで空文字にしてEnterを押すと編集がリバートされる', async () => {
    const ctx = createMockContext();
    const task = createTask({ title: '元のタイトル', completed: false });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.dblClick(screen.getByText('元のタイトル'));

    const editInput = screen.getByLabelText('タスクを編集');
    await user.clear(editInput);
    await user.keyboard('{Enter}');

    // dispatchは呼ばれない（空文字はリバート）
    expect(ctx.dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'EDIT_TASK' })
    );
    expect(screen.getByText('元のタイトル')).toBeInTheDocument();
  });

  it('編集で同じタイトルのままEnterを押すとdispatchされない', async () => {
    const ctx = createMockContext();
    const task = createTask({ title: '同じタイトル', completed: false });
    renderWithContext(task, ctx);
    const user = userEvent.setup();

    await user.dblClick(screen.getByText('同じタイトル'));
    await user.keyboard('{Enter}');

    expect(ctx.dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'EDIT_TASK' })
    );
  });
});
