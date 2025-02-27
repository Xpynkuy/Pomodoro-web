import { create } from "zustand";
import { ITasks } from "../types/types";

interface ITasksStore {
  tasks: ITasks[];
  isModalOpen: boolean;
  searchQuery: string;
  filteredTasks: ITasks[];
  addTask: (title: string, category: string, description: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  openModal: () => void;
  closeModal: () => void;
  setSearchQuery: (query: string) => void;
}

export const useTasksStore = create<ITasksStore>((set, get) => ({
  tasks: [],
  searchQuery: "",
  isModalOpen: false,

  addTask: (title, category, description) =>
    set((state) => {
      const newTasks = [
        ...state.tasks,
        { id: Date.now(), title, completed: false, createdAt: new Date(), category, description },
      ];
      return { tasks: newTasks, filteredTasks: filterTasks(newTasks, state.searchQuery) };
    }),

  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      return { tasks: newTasks, filteredTasks: filterTasks(newTasks, state.searchQuery) };
    }),

  toggleTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return { tasks: newTasks, filteredTasks: filterTasks(newTasks, state.searchQuery) };
    }),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setSearchQuery: (query) =>
    set((state) => ({
      searchQuery: query,
      filteredTasks: filterTasks(state.tasks, query),
    })),

  filteredTasks: [],
}));

// Функция фильтрации задач
const filterTasks = (tasks: ITasks[], query: string) => {
  if (!query.trim()) return tasks;
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );
};
