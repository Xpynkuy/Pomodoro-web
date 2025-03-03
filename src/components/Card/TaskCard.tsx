// TaskCard.tsx
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

const TaskCardComponent: React.FC<TaskCardProps> = ({ task }) => {
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);

  const currentCategory = categories.find((cat) => cat.id === task.category);

  return (
    <div className="flex items-center gap-6 rounded-2xl bg-gray-200/30 min-h-20 mb-4 p-4">
      <div className="flex">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-green-400 checked:border-green-500 focus:outline-none cursor-pointer"
        />
      </div>

      <div className="flex gap-6">
        {currentCategory && (
          <div className="flex items-center gap-2">
            <img
              src={currentCategory.icon}
              alt={currentCategory.label}
              className="w-10 h-10 rounded-lg bg-gray-400/30 p-1"
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

export const TaskCard = React.memo(TaskCardComponent);
export default TaskCard;
