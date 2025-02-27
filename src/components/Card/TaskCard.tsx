import React from "react";
import { useTasksStore } from "../../store/store";
import { categories } from "../../constants/category";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
    category: string;
    description: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);

  const currentCategory = categories.find((cat) => cat.id === task.category);

  return (
    <div className="flex items-center gap-6 rounded-2xl bg-gray-200/30 min-h-20 mb-4 p-4">
      <div className="flex">
        <input
          type="checkbox"
          onChange={() => toggleTask(task.id)}
          className=" w-4 h-4 text-green-400"
        />
      </div>

      <div className="flex gap-6">
        {currentCategory && (
          <div className="flex items-center gap-2">
            <img
              src={currentCategory.icon}
              alt={currentCategory.label}
              className="w-6 h-6"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h1>{task.title}</h1>

          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
      </div>

      <button className="ml-auto" onClick={() => deleteTask(task.id)}>
        Delete Task
      </button>
    </div>
  );
};

export default TaskCard;
