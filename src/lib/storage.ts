import { Task, Theme } from '@/types';
import { STORAGE_KEY_TASKS, STORAGE_KEY_THEME } from './constants';

/** localStorageが利用可能かチェック */
function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/** 型ガード: Task型の最低限のバリデーション */
function isValidTask(obj: unknown): obj is Task {
  if (typeof obj !== 'object' || obj === null) return false;
  const t = obj as Record<string, unknown>;
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'string' &&
    typeof t.order === 'number'
  );
}

/** タスク一覧を保存 */
export function saveTasks(tasks: Task[]): void {
  if (!isStorageAvailable()) return;
  try {
    const json = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY_TASKS, json);
  } catch (e) {
    console.warn('Failed to save tasks to localStorage:', e);
  }
}

/** タスク一覧を読み込み */
export function loadTasks(): Task[] {
  if (!isStorageAvailable()) return [];
  try {
    const json = localStorage.getItem(STORAGE_KEY_TASKS);
    if (!json) return [];
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidTask);
  } catch {
    return [];
  }
}

/** テーマを保存 */
export function saveTheme(theme: Theme): void {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  } catch {
    // サイレントに失敗
  }
}

/** テーマを読み込み */
export function loadTheme(): Theme | null {
  if (!isStorageAvailable()) return null;
  const value = localStorage.getItem(STORAGE_KEY_THEME);
  if (value === 'light' || value === 'dark') return value;
  return null;
}
