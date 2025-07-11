import { create } from 'zustand';
import { TasksState } from '@/types';

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const tasks = await response.json();
        set({ tasks, loading: false });
      } else {
        set({ loading: false });
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      set({ loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id ? updatedTask : task
          ),
        }));
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== id),
        }));
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t._id === id);
    if (task) {
      await get().updateTask(id, { completed: !task.completed });
    }
  },
}));
