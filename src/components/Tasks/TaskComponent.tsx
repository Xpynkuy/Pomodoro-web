import React from "react";
import TasksList from "./TasksList";
import NewTask from "./NewTask";
import { useTasksStore } from "../../store/store";
import Modal from "../Modal/Modal";
import { Plus } from "lucide-react";
import TaskSearch from "../Search/TaskSearch";

const TaskComponent: React.FC = () => {
  const totalTasks = useTasksStore((state) => state.tasks.length);
  const openModal = useTasksStore((state) => state.openModal);

  return (
    <div className="flex-col rounded-2xl bg-slate-100/20 p-5">
      <div className="flex items-center justify-between mr-6 mb-4">
        <h1>Tasks List ({totalTasks})</h1>
        <TaskSearch />
      </div>

      <div className="h-[600px] overflow-y-scroll ">
        <TasksList />
      </div>

      <hr className="my-4" />

      <div className="flex justify-center">
        <button onClick={openModal} className="flex gap-2">
          <Plus className="bg-green-400 rounded-full text-white" />
        </button>
      </div>
      
      <Modal>
        <NewTask />
      </Modal>
    </div>
  );
};

export default TaskComponent;
