import React, { useEffect } from "react";
import {
  useTimerStore,
  useCurrentTaskStore,
} from "../../store/usePomodoroStore";
import { useTasksStore } from "../../store/useTaskStore";
import { categories } from "../../constants/category";
import SessionToggle from "./SessionToggle";
import MyButton from "../UI/button/MyButton";
import { RotateCcw, SkipForward } from "lucide-react";

const PomodoroTimer: React.FC = () => {
  const {
    timeLeft,
    isRunning,
    sessionType,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    tick,
    getDurationFor,
  } = useTimerStore();

  const { currentTaskId } = useCurrentTaskStore();
  const tasks = useTasksStore((s) => s.tasks);
  const currentTask = tasks.find((t) => t.id === currentTaskId);

  // Находим иконку категории для текущей задачи
  const currentCategory = currentTask
    ? categories.find((cat) => cat.id === currentTask.category)
    : null;

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Рассчитываем процент оставшегося времени
  const progressPercentage = (timeLeft / getDurationFor(sessionType)) * 100;

  return (
    <div className="flex flex-col flex-1 justify-between items-center gap-4 p-6 rounded-2xl bg-slate-100/20">
      {/* Блок с переключением режима и Reset */}
      <div className="flex justify-between gap-6">
        <SessionToggle />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-9xl font-bold">{formatTime(timeLeft)}</div>
        {/* Полоска прогресса */}
        <div className="w-full h-2 bg-gray-200/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600/70 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Блок с задачей и иконкой */}
      <div className="bg-white/30 p-3 rounded-2xl text-lg flex items-center gap-2">
        {currentTask ? (
          <>
            {/* Иконка категории */}
            {currentCategory && (
              <img
                src={currentCategory.icon}
                alt={currentCategory.label}
                className="w-6 h-6"
              />
            )}
            -<p>{currentTask.title}</p>
          </>
        ) : (
          <p>It's time to focus</p>
        )}
      </div>

      {/* Кнопки управления таймером */}
      <div className="flex justify-center gap-4 h-12">
        <button 
          onClick={resetTimer} 
          className="bg-red-600/80 rounded-full p-3 hover:scale-105 transition-transform duration-200"
        >
          <RotateCcw />
        </button>
        {isRunning ? (
          <MyButton onClick={pauseTimer}>Pause</MyButton>
        ) : (
          <MyButton onClick={startTimer}>Start</MyButton>
        )}

        <button 
          onClick={skipSession} 
          className="bg-white/70 rounded-full p-3 hover:scale-105 transition-transform duration-200"
        >
          <SkipForward />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
