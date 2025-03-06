// components/Progress/DailyProgress.tsx
import React from "react";
import { useTasksStore } from "../../store/store";
import ProgressCircle from "./ProgressCircle";

const DailyProgress: React.FC = () => {
  const tasks = useTasksStore((state) => state.tasks);

  // Подсчёт общего и выполненных
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  // Если нет задач, процент 0, иначе вычисляем
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Получаем текущую дату в удобном формате
  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "short",   // например, "Mon"
    day: "numeric",     // число месяца
    month: "short",     // например, "Apr"
    year: "numeric",    // "2023"
  });

  return (
    <div className="flex flex-col rounded-2xl bg-slate-100/20 gap-3 p-6">
      <h2 className="text-lg font-semibold text-gray-800">Daily Progress</h2>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <p className="text-white font-semibold bg-blue-600/90 rounded-2xl px-3 py-1">
            {completedTasks} / {totalTasks}
          </p>
          <span className="font-medium text-lg">Tasks was done</span>
        </div>

        {/* Круг с процентом */}
        <div className="flex justify-center">
          <ProgressCircle percentage={percentage} />
        </div>
      </div>

      {/* Дата внизу */}
      <div className="text-md text-gray-500 text-left">
        {dateString}
      </div>
    </div>
  );
};

export default DailyProgress;
