import React, { useState, useRef, useEffect } from "react";
import {
  useTasksStore,
  useModalStore,
  useEditTaskStore,
} from "../../store/store";
import { categories } from "../../constants/category";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";

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

  const openModal = useModalStore((state) => state.openModal);
  const setTaskToEdit = useEditTaskStore((state) => state.setTaskToEdit);

  const currentCategory = categories.find((cat) => cat.id === task.category);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Обработчик "Edit Task"
  const handleEditTask = () => {
    // Если нужно, чтобы createdAt точно присутствовал:
    setTaskToEdit({
      ...task,
      createdAt: new Date(), // раскомментируйте, если у вас нет этого поля
    });
    openModal();
    setIsMenuOpen(false);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    setIsMenuOpen(false);
  };

  // --- Новая логика для зачеркивания и изменения фона ---
  const cardBackground = task.completed ? "bg-gray-50/10" : "bg-gray-100/30";
  const textDecoration = task.completed ? "line-through" : "";

  return (
    <div
      className={`
        flex items-center gap-6 rounded-2xl min-h-20 mb-4 p-4
        transition-colors duration-300
        ${cardBackground}
      `}
    >
      <div className="flex">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full 
                     checked:bg-green-400/70 checked:border-green-500 
                     focus:outline-none cursor-pointer"
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
          {/* Зачёркиваем, если completed = true */}
          <h1 className={`${textDecoration}`}>{task.title}</h1>
          <p className={`text-sm text-gray-500 ${textDecoration}`}>
            {task.description}
          </p>
        </div>
      </div>

      <div className="relative ml-auto" ref={menuRef}>
        <button
          className="p-2 rounded-full hover:opacity-60 duration-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MoreVertical size={18} />
        </button>
        {isMenuOpen && (
          <div
            className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 
                       rounded-2xl shadow-lg z-10"
          >
            <ul className="py-2">
              <li>
                <button
                  onClick={handleEditTask}
                  className="flex items-center gap-4 w-full text-left px-4 py-3 text-base hover:bg-gray-100/70"
                >
                  <PencilLine className="size-4 opacity-35" /> Edit Task
                </button>
              </li>
              <li>
                <button
                  onClick={handleDeleteTask}
                  className="flex items-center gap-4 w-full text-left px-4 py-2 text-base hover:bg-gray-100/70"
                >
                  <Trash2 className="size-4 opacity-35" /> Delete Task
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export const TaskCard = React.memo(TaskCardComponent);
export default TaskCardComponent;
