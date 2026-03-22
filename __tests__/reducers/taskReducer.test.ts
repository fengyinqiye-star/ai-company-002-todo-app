import { taskReducer } from '@/reducers/taskReducer';
import type { TaskState, Task } from '@/types';

// crypto.randomUUID のモック
const mockUUID = 'test-uuid-1234-5678-9012';
Object.defineProperty(globalThis, 'crypto', {
  value: { randomUUID: jest.fn(() => mockUUID) },
  writable: true,
});

describe('taskReducer', () => {
  const initialState: TaskState = {
    tasks: [],
    filter: 'all',
  };

  const sampleTask: Task = {
    id: 'task-1',
    title: 'テストタスク',
    completed: false,
    createdAt: '2026-03-20T00:00:00.000Z',
    order: 0,
  };

  const stateWithTasks: TaskState = {
    tasks: [
      sampleTask,
      { id: 'task-2', title: '完了タスク', completed: true, createdAt: '2026-03-20T01:00:00.000Z', order: 1 },
      { id: 'task-3', title: '未完了タスク2', completed: false, createdAt: '2026-03-20T02:00:00.000Z', order: 2 },
    ],
    filter: 'all',
  };

  // --- ADD_TASK ---
  describe('ADD_TASK', () => {
    it('空の配列に新しいタスクを追加できる', () => {
      const result = taskReducer(initialState, {
        type: 'ADD_TASK',
        payload: { title: '新しいタスク' },
      });

      expect(result.tasks).toHaveLength(1);
      expect(result.tasks[0].title).toBe('新しいタスク');
      expect(result.tasks[0].completed).toBe(false);
      expect(result.tasks[0].id).toBe(mockUUID);
    });

    it('新しいタスクは配列の先頭に追加される', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'ADD_TASK',
        payload: { title: '最新タスク' },
      });

      expect(result.tasks).toHaveLength(4);
      expect(result.tasks[0].title).toBe('最新タスク');
    });

    it('orderはtasks.lengthと等しい値が設定される', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'ADD_TASK',
        payload: { title: '追加タスク' },
      });

      expect(result.tasks[0].order).toBe(3);
    });

    it('createdAtがISO文字列で設定される', () => {
      const result = taskReducer(initialState, {
        type: 'ADD_TASK',
        payload: { title: '日時テスト' },
      });

      expect(() => new Date(result.tasks[0].createdAt)).not.toThrow();
    });
  });

  // --- TOGGLE_TASK ---
  describe('TOGGLE_TASK', () => {
    it('未完了タスクを完了にできる', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'TOGGLE_TASK',
        payload: { id: 'task-1' },
      });

      expect(result.tasks.find(t => t.id === 'task-1')?.completed).toBe(true);
    });

    it('完了タスクを未完了にできる', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'TOGGLE_TASK',
        payload: { id: 'task-2' },
      });

      expect(result.tasks.find(t => t.id === 'task-2')?.completed).toBe(false);
    });

    it('他のタスクに影響しない', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'TOGGLE_TASK',
        payload: { id: 'task-1' },
      });

      expect(result.tasks.find(t => t.id === 'task-2')?.completed).toBe(true);
      expect(result.tasks.find(t => t.id === 'task-3')?.completed).toBe(false);
    });

    it('存在しないIDの場合は状態が変わらない', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'TOGGLE_TASK',
        payload: { id: 'nonexistent' },
      });

      expect(result.tasks).toEqual(stateWithTasks.tasks);
    });
  });

  // --- DELETE_TASK ---
  describe('DELETE_TASK', () => {
    it('指定IDのタスクを削除できる', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'DELETE_TASK',
        payload: { id: 'task-1' },
      });

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks.find(t => t.id === 'task-1')).toBeUndefined();
    });

    it('存在しないIDの場合はタスク数が変わらない', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'DELETE_TASK',
        payload: { id: 'nonexistent' },
      });

      expect(result.tasks).toHaveLength(3);
    });
  });

  // --- EDIT_TASK ---
  describe('EDIT_TASK', () => {
    it('タスクのタイトルを変更できる', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'EDIT_TASK',
        payload: { id: 'task-1', title: '変更後タイトル' },
      });

      expect(result.tasks.find(t => t.id === 'task-1')?.title).toBe('変更後タイトル');
    });

    it('他のタスクのタイトルは変わらない', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'EDIT_TASK',
        payload: { id: 'task-1', title: '変更後' },
      });

      expect(result.tasks.find(t => t.id === 'task-2')?.title).toBe('完了タスク');
    });
  });

  // --- REORDER_TASKS ---
  describe('REORDER_TASKS', () => {
    it('タスクの順序を更新できる', () => {
      const reordered = [...stateWithTasks.tasks].reverse();
      const result = taskReducer(stateWithTasks, {
        type: 'REORDER_TASKS',
        payload: { tasks: reordered },
      });

      expect(result.tasks[0].order).toBe(0);
      expect(result.tasks[1].order).toBe(1);
      expect(result.tasks[2].order).toBe(2);
    });
  });

  // --- CLEAR_COMPLETED ---
  describe('CLEAR_COMPLETED', () => {
    it('完了タスクをすべて削除できる', () => {
      const result = taskReducer(stateWithTasks, { type: 'CLEAR_COMPLETED' });

      expect(result.tasks).toHaveLength(2);
      expect(result.tasks.every(t => !t.completed)).toBe(true);
    });

    it('未完了タスクのみの場合は変化なし', () => {
      const activeOnly: TaskState = {
        tasks: stateWithTasks.tasks.filter(t => !t.completed),
        filter: 'all',
      };
      const result = taskReducer(activeOnly, { type: 'CLEAR_COMPLETED' });

      expect(result.tasks).toHaveLength(2);
    });

    it('全タスクが完了の場合、空配列になる', () => {
      const allCompleted: TaskState = {
        tasks: stateWithTasks.tasks.map(t => ({ ...t, completed: true })),
        filter: 'all',
      };
      const result = taskReducer(allCompleted, { type: 'CLEAR_COMPLETED' });

      expect(result.tasks).toHaveLength(0);
    });
  });

  // --- SET_FILTER ---
  describe('SET_FILTER', () => {
    it.each(['all', 'active', 'completed'] as const)('フィルタを"%s"に設定できる', (filter) => {
      const result = taskReducer(initialState, {
        type: 'SET_FILTER',
        payload: { filter },
      });

      expect(result.filter).toBe(filter);
    });

    it('タスク配列には影響しない', () => {
      const result = taskReducer(stateWithTasks, {
        type: 'SET_FILTER',
        payload: { filter: 'completed' },
      });

      expect(result.tasks).toEqual(stateWithTasks.tasks);
    });
  });

  // --- LOAD_TASKS ---
  describe('LOAD_TASKS', () => {
    it('タスク一覧をロードできる', () => {
      const tasks: Task[] = [sampleTask];
      const result = taskReducer(initialState, {
        type: 'LOAD_TASKS',
        payload: { tasks },
      });

      expect(result.tasks).toEqual(tasks);
    });

    it('既存タスクを上書きする', () => {
      const newTasks: Task[] = [{ ...sampleTask, id: 'new-1', title: '新規' }];
      const result = taskReducer(stateWithTasks, {
        type: 'LOAD_TASKS',
        payload: { tasks: newTasks },
      });

      expect(result.tasks).toHaveLength(1);
      expect(result.tasks[0].title).toBe('新規');
    });
  });

  // --- default ---
  describe('unknown action', () => {
    it('不明なアクションの場合は状態を変えない', () => {
      const result = taskReducer(stateWithTasks, { type: 'UNKNOWN' } as any);
      expect(result).toEqual(stateWithTasks);
    });
  });
});
