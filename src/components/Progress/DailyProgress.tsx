// components/Progress/DailyProgress.tsx
import React from "react";

import ProgressCircle from "./ProgressCircle";
import { useTasksStore } from "../../store/useTaskStore";

const DailyProgress: React.FC = () => {
  const tasks = useTasksStore((state) => state.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col rounded-2xl bg-slate-100/20 gap-3 p-6">
      <h2 className="text-lg font-semibold text-gray-800">Daily Progress</h2>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <p className="text-white font-semibold bg-blue-600/90 rounded-2xl px-3 py-1">
            {completedTasks} / {totalTasks}
          </p>
          {totalTasks > 0 ? (
            <span className="font-medium text-lg">Tasks was done</span>
          ) : (
            <span className="font-medium text-lg text-gray-500">No tasks for today</span>
          )}
        </div>

        <div className="flex justify-center">
          <ProgressCircle percentage={percentage} />
        </div>
      </div>

      <div className="text-md text-gray-500 text-left">{dateString}</div>
    </div>
  );
};

export default DailyProgress;
