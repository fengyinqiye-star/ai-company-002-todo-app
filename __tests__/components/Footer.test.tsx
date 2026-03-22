import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from '@/components/organisms/Footer';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';
import type { Task, TaskState } from '@/types';

const createTask = (id: string, completed: boolean): Task => ({
  id,
  title: `タスク${id}`,
  completed,
  createdAt: '2026-03-20T00:00:00.000Z',
  order: 0,
});

const createMockContext = (
  tasks: Task[],
  overrides?: Partial<TaskContextValue>
): TaskContextValue => {
  const state: TaskState = { tasks, filter: 'all' };
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  return {
    state,
    dispatch: jest.fn(),
    filteredTasks: tasks,
    activeCount,
    completedCount,
    ...overrides,
  };
};

function renderWithContext(ctx: TaskContextValue) {
  return render(
    <TaskContext.Provider value={ctx}>
      <Footer />
    </TaskContext.Provider>
  );
}

describe('Footer', () => {
  it('タスクが0件の場合はフッターを表示しない', () => {
    const ctx = createMockContext([]);
    const { container } = renderWithContext(ctx);

    expect(container.querySelector('footer')).toBeNull();
  });

  it('残タスク数が正しく表示される', () => {
    const tasks = [
      createTask('1', false),
      createTask('2', false),
      createTask('3', true),
    ];
    const ctx = createMockContext(tasks);
    renderWithContext(ctx);

    expect(screen.getByText('残り 2 件')).toBeInTheDocument();
  });

  it('全タスク完了時に「すべて完了!」と表示される', () => {
    const tasks = [
      createTask('1', true),
      createTask('2', true),
    ];
    const ctx = createMockContext(tasks);
    renderWithContext(ctx);

    expect(screen.getByText('すべて完了!')).toBeInTheDocument();
  });

  it('完了タスクがある場合「完了をすべて削除」ボタンが表示される', () => {
    const tasks = [
      createTask('1', false),
      createTask('2', true),
    ];
    const ctx = createMockContext(tasks);
    renderWithContext(ctx);

    expect(screen.getByLabelText('完了したタスクをすべて削除')).toBeInTheDocument();
  });

  it('完了タスクがない場合「完了をすべて削除」ボタンは表示されない', () => {
    const tasks = [
      createTask('1', false),
      createTask('2', false),
    ];
    const ctx = createMockContext(tasks);
    renderWithContext(ctx);

    expect(screen.queryByLabelText('完了したタスクをすべて削除')).toBeNull();
  });

  it('「完了をすべて削除」クリックでCLEAR_COMPLETEDがdispatchされる', async () => {
    const tasks = [
      createTask('1', false),
      createTask('2', true),
    ];
    const ctx = createMockContext(tasks);
    renderWithContext(ctx);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('完了したタスクをすべて削除'));

    expect(ctx.dispatch).toHaveBeenCalledWith({ type: 'CLEAR_COMPLETED' });
  });

  it('残り1件の場合「残り 1 件」と表示される', () => {
    const tasks = [
      createTask('1', false),
      createTask('2', true),
    ];
    const ctx = createMockContext(tasks);
    renderWithContext(ctx);

    expect(screen.getByText('残り 1 件')).toBeInTheDocument();
  });
});
