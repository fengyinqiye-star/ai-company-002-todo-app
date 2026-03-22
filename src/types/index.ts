/** タスクのフィルタ種別 */
export type FilterType = 'all' | 'active' | 'completed';

/** テーマ種別 */
export type Theme = 'light' | 'dark';

/** タスクエンティティ */
export interface Task {
  /** 一意識別子（UUID v4） */
  id: string;
  /** タスクタイトル（1~200文字） */
  title: string;
  /** 完了状態 */
  completed: boolean;
  /** 作成日時（ISO 8601） */
  createdAt: string;
  /** 表示順序（0始まり、昇順） */
  order: number;
}

/** タスク管理の状態 */
export interface TaskState {
  tasks: Task[];
  filter: FilterType;
}

/** タスク操作アクション */
export type TaskAction =
  | { type: 'ADD_TASK'; payload: { title: string } }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'EDIT_TASK'; payload: { id: string; title: string } }
  | { type: 'REORDER_TASKS'; payload: { tasks: Task[] } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: { filter: FilterType } }
  | { type: 'LOAD_TASKS'; payload: { tasks: Task[] } };

/** Buttonコンポーネントのvariant */
export type ButtonVariant = 'primary' | 'ghost' | 'danger';

/** Buttonコンポーネントのサイズ */
export type ButtonSize = 'sm' | 'md';
