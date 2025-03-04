import React from "react";
import TasksList from "./TasksList";
import TaskSearch from "../Search/TaskSearch";
import { useModalStore, useEditTaskStore } from "../../store/store";
import { Plus } from "lucide-react";

const TasksLayout: React.FC = () => {
  const openModal = useModalStore((state) => state.openModal);
  const setTaskToEdit = useEditTaskStore((state) => state.setTaskToEdit);

  const handleAddTask = () => {
    // Сбрасываем taskToEdit => форма будет пустой
    setTaskToEdit(null);
    // Открываем модалку
    openModal();
  };

  return (
    <div className="flex-col rounded-2xl bg-slate-100/20 p-5">
      <div className="flex items-center justify-between mr-6 mb-4">
        <h1>Tasks List</h1>
        <TaskSearch />
      </div>

      <div className="h-[600px] overflow-y-scroll">
        <TasksList />
      </div>

      <hr className="my-4" />

      <div className="flex justify-center">
        <button onClick={handleAddTask} className="flex gap-2">
          <Plus className="bg-green-400 rounded-full text-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

export default TasksLayout;
