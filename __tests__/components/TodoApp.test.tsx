import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoApp } from '@/components/templates/TodoApp';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';
import { ThemeContext, type ThemeContextValue } from '@/contexts/ThemeContext';
import type { TaskState } from '@/types';

// lucide-react のモック
jest.mock('lucide-react', () => ({
  Plus: () => <span data-testid="plus-icon" />,
  Sun: () => <span data-testid="sun-icon">Sun</span>,
  Moon: () => <span data-testid="moon-icon">Moon</span>,
  Trash2: () => <span data-testid="trash-icon" />,
  ClipboardList: () => <span data-testid="clipboard-icon" />,
}));

// @radix-ui/react-checkbox のモック
jest.mock('@radix-ui/react-checkbox', () => ({
  Root: ({ children, ...props }: any) => <button>{children}</button>,
  Indicator: ({ children }: any) => <span>{children}</span>,
}));

function renderTodoApp() {
  const taskState: TaskState = { tasks: [], filter: 'all' };
  const taskCtx: TaskContextValue = {
    state: taskState,
    dispatch: jest.fn(),
    filteredTasks: [],
    activeCount: 0,
    completedCount: 0,
  };
  const themeCtx: ThemeContextValue = { theme: 'light', toggleTheme: jest.fn() };

  return render(
    <ThemeContext.Provider value={themeCtx}>
      <TaskContext.Provider value={taskCtx}>
        <TodoApp />
      </TaskContext.Provider>
    </ThemeContext.Provider>
  );
}

describe('TodoApp', () => {
  it('ページ全体がレンダリングされる', () => {
    renderTodoApp();

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByLabelText('新しいタスクを入力')).toBeInTheDocument();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('メインコンテンツがmain要素内にある', () => {
    renderTodoApp();

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
