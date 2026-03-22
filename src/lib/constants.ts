/** localStorage キー: タスクデータ */
export const STORAGE_KEY_TASKS = 'todo-app-tasks';

/** localStorage キー: テーマ設定 */
export const STORAGE_KEY_THEME = 'todo-app-theme';

/** タスクタイトルの最大文字数 */
export const MAX_TITLE_LENGTH = 200;

/** タスクの最大件数 */
export const MAX_TASKS = 500;

/** フィルタのラベル定義 */
export const FILTER_LABELS = {
  all: 'すべて',
  active: '未完了',
  completed: '完了',
} as const;

/** 空状態メッセージ */
export const EMPTY_MESSAGES = {
  all: 'タスクを追加してみましょう',
  active: '未完了のタスクはありません',
  completed: '完了したタスクはありません',
} as const;
