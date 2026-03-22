import { TaskState, TaskAction, Task } from '@/types';
import { MAX_TASKS } from '@/lib/constants';

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK': {
      // タスク上限チェック（500件）
      if (state.tasks.length >= MAX_TASKS) {
        return state;
      }
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        completed: false,
        createdAt: new Date().toISOString(),
        order: state.tasks.length,
      };
      return { ...state, tasks: [newTask, ...state.tasks] };
    }

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, completed: !t.completed }
            : t
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, title: action.payload.title }
            : t
        ),
      };

    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks.map((t, i) => ({ ...t, order: i })),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.completed),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      };

    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
      };

    default:
      return state;
  }
}
