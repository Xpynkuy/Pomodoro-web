// components/Tasks/TasksList.tsx
import React from "react";
import { useTasksStore } from "../../store/useTaskStore";
import { useSearchStore } from "../../store/useSearchStore";
import TaskCard from "../Card/TaskCard";

const TasksList: React.FC = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  // Фильтрация
  const filteredTasks = React.useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  return (
    <div className="pr-4 h-full">
      {filteredTasks.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No tasks found.
        </div>
      ) : (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TasksList;
