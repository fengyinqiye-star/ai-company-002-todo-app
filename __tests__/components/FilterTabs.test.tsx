import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterTabs } from '@/components/molecules/FilterTabs';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';
import type { TaskState, FilterType } from '@/types';

const createMockContext = (filter: FilterType = 'all', overrides?: Partial<TaskContextValue>): TaskContextValue => {
  const state: TaskState = { tasks: [], filter };
  return {
    state,
    dispatch: jest.fn(),
    filteredTasks: [],
    activeCount: 0,
    completedCount: 0,
    ...overrides,
  };
};

function renderWithContext(ctx: TaskContextValue) {
  return render(
    <TaskContext.Provider value={ctx}>
      <FilterTabs />
    </TaskContext.Provider>
  );
}

describe('FilterTabs', () => {
  it('3つのフィルタタブが表示される', () => {
    const ctx = createMockContext();
    renderWithContext(ctx);

    expect(screen.getByText('すべて')).toBeInTheDocument();
    expect(screen.getByText('未完了')).toBeInTheDocument();
    expect(screen.getByText('完了')).toBeInTheDocument();
  });

  it('tablistロールが設定されている', () => {
    const ctx = createMockContext();
    renderWithContext(ctx);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('各タブにtabロールが設定されている', () => {
    const ctx = createMockContext();
    renderWithContext(ctx);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('現在のフィルタのタブがaria-selected=trueになる', () => {
    const ctx = createMockContext('active');
    renderWithContext(ctx);

    const tabs = screen.getAllByRole('tab');
    // 「すべて」はfalse、「未完了」はtrue、「完了」はfalse
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it.each([
    ['すべて', 'all'],
    ['未完了', 'active'],
    ['完了', 'completed'],
  ] as const)('"%s"タブクリックでSET_FILTERがdispatchされる', async (label, filterValue) => {
    const ctx = createMockContext();
    renderWithContext(ctx);
    const user = userEvent.setup();

    await user.click(screen.getByText(label));

    expect(ctx.dispatch).toHaveBeenCalledWith({
      type: 'SET_FILTER',
      payload: { filter: filterValue },
    });
  });

  it('completedフィルタ時に「完了」タブがselectedになる', () => {
    const ctx = createMockContext('completed');
    renderWithContext(ctx);

    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });
});
