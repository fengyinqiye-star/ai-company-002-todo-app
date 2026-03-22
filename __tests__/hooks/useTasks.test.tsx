import React from 'react';
import { renderHook } from '@testing-library/react';
import { useTasks } from '@/hooks/useTasks';
import { TaskContext, type TaskContextValue } from '@/contexts/TaskContext';
import type { TaskState } from '@/types';

describe('useTasks', () => {
  it('TaskProvider外で使用するとエラーをthrowする', () => {
    // console.errorを抑制
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTasks());
    }).toThrow('useTasks must be used within a TaskProvider');

    spy.mockRestore();
  });

  it('TaskProvider内で使用するとコンテキスト値を返す', () => {
    const state: TaskState = { tasks: [], filter: 'all' };
    const mockValue: TaskContextValue = {
      state,
      dispatch: jest.fn(),
      filteredTasks: [],
      activeCount: 0,
      completedCount: 0,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TaskContext.Provider value={mockValue}>{children}</TaskContext.Provider>
    );

    const { result } = renderHook(() => useTasks(), { wrapper });

    expect(result.current.state).toEqual(state);
    expect(result.current.activeCount).toBe(0);
  });
});
