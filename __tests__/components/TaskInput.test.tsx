import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskInput } from '@/components/molecules/TaskInput';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';
import type { TaskState } from '@/types';

// lucide-react のモック
jest.mock('lucide-react', () => ({
  Plus: () => <span data-testid="plus-icon" />,
}));

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

function renderWithContext(mockContext: TaskContextValue) {
  return render(
    <TaskContext.Provider value={mockContext}>
      <TaskInput />
    </TaskContext.Provider>
  );
}

describe('TaskInput', () => {
  it('入力フィールドとボタンが表示される', () => {
    const ctx = createMockContext();
    renderWithContext(ctx);

    expect(screen.getByLabelText('新しいタスクを入力')).toBeInTheDocument();
    expect(screen.getByLabelText('タスクを追加')).toBeInTheDocument();
  });

  it('空文字の場合、追加ボタンがdisabledになる', () => {
    const ctx = createMockContext();
    renderWithContext(ctx);

    expect(screen.getByLabelText('タスクを追加')).toBeDisabled();
  });

  it('テキスト入力後、追加ボタンがenabledになる', async () => {
    const ctx = createMockContext();
    renderWithContext(ctx);
    const user = userEvent.setup();

    const input = screen.getByLabelText('新しいタスクを入力');
    await user.type(input, 'テスト');

    expect(screen.getByLabelText('タスクを追加')).not.toBeDisabled();
  });

  it('追加ボタンクリックでdispatchが呼ばれる', async () => {
    const ctx = createMockContext();
    renderWithContext(ctx);
    const user = userEvent.setup();

    const input = screen.getByLabelText('新しいタスクを入力');
    await user.type(input, 'テスト');
    await user.click(screen.getByLabelText('タスクを追加'));

    expect(ctx.dispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: { title: 'テスト' },
    });
  });

  it('Enterキーでタスクを追加できる', async () => {
    const ctx = createMockContext();
    renderWithContext(ctx);
    const user = userEvent.setup();

    const input = screen.getByLabelText('新しいタスクを入力');
    await user.type(input, 'Enterで追加');
    await user.keyboard('{Enter}');

    expect(ctx.dispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: { title: 'Enterで追加' },
    });
  });

  it('追加後に入力フィールドがクリアされる', async () => {
    const ctx = createMockContext();
    renderWithContext(ctx);
    const user = userEvent.setup();

    const input = screen.getByLabelText('新しいタスクを入力') as HTMLInputElement;
    await user.type(input, 'クリアテスト');
    await user.click(screen.getByLabelText('タスクを追加'));

    expect(input.value).toBe('');
  });

  it('空白のみの入力ではdispatchが呼ばれない', async () => {
    const ctx = createMockContext();
    renderWithContext(ctx);
    const user = userEvent.setup();

    const input = screen.getByLabelText('新しいタスクを入力');
    await user.type(input, '   ');
    // ボタンはdisabledのため、直接Enterで試す
    await user.keyboard('{Enter}');

    expect(ctx.dispatch).not.toHaveBeenCalled();
  });

  it('前後の空白がトリムされる', async () => {
    const ctx = createMockContext();
    renderWithContext(ctx);
    const user = userEvent.setup();

    const input = screen.getByLabelText('新しいタスクを入力');
    await user.type(input, '  トリムテスト  ');
    await user.keyboard('{Enter}');

    expect(ctx.dispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: { title: 'トリムテスト' },
    });
  });

  it('プレースホルダーが表示される', () => {
    const ctx = createMockContext();
    renderWithContext(ctx);

    expect(screen.getByPlaceholderText('タスクを入力...')).toBeInTheDocument();
  });
});
