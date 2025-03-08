import React from "react";
import { categories } from "../../constants/category";
import { usePomodoroStore } from "../../store/usePomodoroStore";
import { useTasksStore } from "../../store/useTaskStore";
import { useModalStore } from "../../store/useModalStore";
import { useEditTaskStore } from "../../store/useEditTaskStore";
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
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const tasks = useTasksStore((state) => state.tasks);
  const openModal = useModalStore((state) => state.openModal);
  const setTaskToEdit = useEditTaskStore((state) => state.setTaskToEdit);
  const { pickTask, currentTaskId } = usePomodoroStore();

  const currentCategory = categories.find((cat) => cat.id === task.category);

  const handleCardClick = () => {
    pickTask(task.id);
  };

  const handleEditTask = () => {
    setTaskToEdit({ ...task, createdAt: new Date() });
    openModal();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  const handleCheckboxChange = () => {
    const wasCompleted = task.completed;
    toggleTask(task.id);

    if (!wasCompleted) {
      const yes = window.confirm("Do you want to switch task?");
      if (yes) {
        const uncompleted = tasks.filter(
          (t) => !t.completed && t.id !== task.id
        );
        if (uncompleted.length > 0) {
          pickTask(uncompleted[0].id);
        }
      }
    }
  };

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
