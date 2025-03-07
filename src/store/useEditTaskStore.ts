import { create } from "zustand";
import { ITasks } from "../types/types";

interface IEditTaskStore {
    taskToEdit: ITasks | null;
    setTaskToEdit: (task: ITasks | null) => void;
  }
  
  export const useEditTaskStore = create<IEditTaskStore>((set) => ({
    taskToEdit: null,
    setTaskToEdit: (task) => set({ taskToEdit: task }),
  }));