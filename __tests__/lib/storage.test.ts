import { saveTasks, loadTasks, saveTheme, loadTheme } from '@/lib/storage';
import { STORAGE_KEY_TASKS, STORAGE_KEY_THEME } from '@/lib/constants';
import type { Task, Theme } from '@/types';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  const validTask: Task = {
    id: 'task-1',
    title: 'テストタスク',
    completed: false,
    createdAt: '2026-03-20T00:00:00.000Z',
    order: 0,
  };

  // --- saveTasks / loadTasks ---
  describe('saveTasks / loadTasks', () => {
    it('タスクを保存して読み込める', () => {
      const tasks = [validTask];
      saveTasks(tasks);
      const loaded = loadTasks();
      expect(loaded).toEqual(tasks);
    });

    it('空配列を保存して読み込める', () => {
      saveTasks([]);
      const loaded = loadTasks();
      expect(loaded).toEqual([]);
    });

    it('複数タスクを保存して読み込める', () => {
      const tasks: Task[] = [
        validTask,
        { ...validTask, id: 'task-2', title: '2つ目', order: 1 },
      ];
      saveTasks(tasks);
      const loaded = loadTasks();
      expect(loaded).toHaveLength(2);
    });

    it('localStorageにデータがない場合は空配列を返す', () => {
      const loaded = loadTasks();
      expect(loaded).toEqual([]);
    });

    it('不正なJSONの場合は空配列を返す', () => {
      localStorage.setItem(STORAGE_KEY_TASKS, 'not-json{{{');
      const loaded = loadTasks();
      expect(loaded).toEqual([]);
    });

    it('配列でないデータの場合は空配列を返す', () => {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify({ not: 'array' }));
      const loaded = loadTasks();
      expect(loaded).toEqual([]);
    });

    it('不正なTask構造のデータはフィルタされる', () => {
      const data = [
        validTask,
        { id: 'bad', title: 123 }, // titleがstringでない
        { id: 'bad2' }, // フィールド不足
        null,
      ];
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(data));
      const loaded = loadTasks();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].id).toBe('task-1');
    });

    it('localStorageが利用不可の場合、saveTasksはサイレントに失敗する', () => {
      const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });
      // localStorage利用可能チェック自体が失敗するため、保存されないだけ
      expect(() => saveTasks([validTask])).not.toThrow();
      spy.mockRestore();
    });

    it('localStorageが利用不可の場合、loadTasksは空配列を返す', () => {
      const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });
      const loaded = loadTasks();
      expect(loaded).toEqual([]);
      spy.mockRestore();
    });
  });

  // --- saveTheme / loadTheme ---
  describe('saveTheme / loadTheme', () => {
    it('lightテーマを保存して読み込める', () => {
      saveTheme('light');
      expect(loadTheme()).toBe('light');
    });

    it('darkテーマを保存して読み込める', () => {
      saveTheme('dark');
      expect(loadTheme()).toBe('dark');
    });

    it('テーマが保存されていない場合はnullを返す', () => {
      expect(loadTheme()).toBeNull();
    });

    it('不正な値が保存されている場合はnullを返す', () => {
      localStorage.setItem(STORAGE_KEY_THEME, 'invalid');
      expect(loadTheme()).toBeNull();
    });
  });
});
