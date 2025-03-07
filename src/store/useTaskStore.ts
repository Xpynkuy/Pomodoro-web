import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ITasks } from "../types/types";

interface ITasksStore {
  tasks: ITasks[];
  addTask: (title: string, category: string, description: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  updateTask: (id: number, updates: Partial<ITasks>) => void;
}

export const useTasksStore = create<ITasksStore>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: (title, category, description) =>
        set((state) => {
          const newTask: ITasks = {
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date(),
            category,
            description,
          };
          return { tasks: [...state.tasks, newTask] };
        }),

      deleteTask: (id) =>
        set((state) => {
          const newTasks = state.tasks.filter((task) => task.id !== id);
          return { tasks: newTasks };
        }),

      toggleTask: (id) =>
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          );
          return { tasks: newTasks };
        }),

      updateTask: (id, updates) =>
        set((state) => {
          const newTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          );
          return { tasks: newTasks };
        }),
    }),
    { name: "tasks-storage" }
  )
);
