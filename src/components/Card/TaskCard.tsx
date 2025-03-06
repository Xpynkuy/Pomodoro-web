import React, { useState, useRef, useEffect } from "react";
import {
  useTasksStore,
  useModalStore,
  useEditTaskStore,
} from "../../store/store";
import { usePomodoroStore } from "../../store/pomodoroStore";
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
  // Стор задач
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const tasks = useTasksStore((state) => state.tasks);

  // Стор модалки
  const openModal = useModalStore((state) => state.openModal);
  const setTaskToEdit = useEditTaskStore((state) => state.setTaskToEdit);

  // Помодоро-стор
  const { pickTask, currentTaskId } = usePomodoroStore();

  const currentCategory = categories.find((cat) => cat.id === task.category);

  // Меню (три точки)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // При клике на карточку – выбираем задачу (без проверки на completed)
  const handleCardClick = () => {
    pickTask(task.id);
  };

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

  // Редактирование
  const handleEditTask = () => {
    setTaskToEdit({ ...task, createdAt: new Date() });
    openModal();
    setIsMenuOpen(false);
  };

  // Удаление
  const handleDeleteTask = () => {
    deleteTask(task.id);
    setIsMenuOpen(false);
  };

  // При клике на чекбокс
  // 1) Меняем completed через toggleTask
  // 2) Если это "завершение" (false -> true), спрашиваем confirm
  // 3) Если "Ok", ищем следующую невыполненную задачу => pickTask
  const handleCheckboxChange = () => {
    const wasCompleted = task.completed; // текущее значение
    toggleTask(task.id); // переключаем

    // Если мы только что «завершили» (было false, стало true)
    if (!wasCompleted) {
      const yes = window.confirm("Move on to next task?");
      if (yes) {
        // Ищем следующую невыполненную (любую, кроме этой)
        const uncompleted = tasks.filter(
          (t) => !t.completed && t.id !== task.id
        );
        if (uncompleted.length > 0) {
          pickTask(uncompleted[0].id);
        } else {
          // Нет невыполненных, можно вывести сообщение
          // alert("No uncompleted tasks left!"); 
          // или просто ничего не делать
        }
      }
    }
  };

  // Стили при выполнении
  const cardBackground = task.completed ? "bg-gray-50/10" : "bg-gray-100/30";
  const textDecoration = task.completed ? "line-through" : "";

  // Стили при выбранной задаче
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
      {/* Чекбокс */}
      <div className="flex">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation(); // чтобы не срабатывал handleCardClick
            handleCheckboxChange();
          }}
          className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full 
                     checked:bg-green-400/70 checked:border-green-500 
                     focus:outline-none cursor-pointer"
        />
      </div>

      {/* Категория + текст */}
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

      {/* Меню "три точки" */}
      <div className="relative ml-auto" ref={menuRef}>
        <button
          className="p-2 rounded-full hover:opacity-60 duration-100 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <MoreVertical size={18} />
        </button>
        {isMenuOpen && (
          <div
            className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 
                       rounded-2xl shadow-lg z-10"
          >
            <ul className="p-2">
              <li>
                <button
                  onClick={handleEditTask}
                  className="flex items-center gap-4 w-full text-left px-4 py-3 text-base rounded-xl hover:bg-gray-100/70"
                >
                  <PencilLine className="size-4 opacity-35" /> Edit Task
                </button>
              </li>
              <li>
                <button
                  onClick={handleDeleteTask}
                  className="flex items-center gap-4 w-full text-left px-4 py-2 text-base rounded-xl hover:bg-gray-100/70"
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
