import React from "react";
import { useCurrentTaskStore } from "../../store/usePomodoroStore";
import { useTaskCardHandlers } from "../../hooks/useTaskCardHandlers";
import { categories } from "../../constants/category";
import Checkbox from "../UI/checkbox/Checkbox";
import DropDownMenu from "../UI/menu/DropDownMenu";

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
  const { currentTaskId } = useCurrentTaskStore();
  const { handleCardClick, handleEditTask, handleDeleteTask, handleCheckboxChange } = useTaskCardHandlers(task);

  const currentCategory = categories.find((cat) => cat.id === task.category);

  const cardBackground = task.completed ? "bg-gray-50/10" : "bg-gray-100/30";
  const textDecoration = task.completed ? "line-through" : "";
  const isSelected = currentTaskId === task.id;
  const selectedClass = isSelected ? "shadow-lg" : "";

  return (
    <div
      className={`
        flex items-center gap-6 rounded-2xl min-h-20 mb-4 p-4
        transition-colors duration-300 cursor-pointer
        ${cardBackground} ${selectedClass}
      `}
      onClick={handleCardClick}
    >
      <Checkbox checked={task.completed} onChange={handleCheckboxChange} />

      <div className="flex gap-6">
        {currentCategory && (
          <div className="flex items-center gap-2">
            <img
              src={currentCategory.icon}
              alt={currentCategory.label}
              className="w-10 h-10 rounded-lg bg-gray-400/20 p-1"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h1 className={`${textDecoration}`}>{task.title}</h1>
          <p className={`text-sm text-gray-500 ${textDecoration}`}>
            {task.description}
          </p>
        </div>
      </div>

      <DropDownMenu onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export const TaskCard = React.memo(TaskCardComponent);
export default TaskCardComponent;
