import React from "react";
import { useTasksStore } from "../../store/store";

import TaskCard from "../Card/TaskCard";

const TasksList: React.FC = () => {
  const filteredTasks = useTasksStore((state) => state.filteredTasks);

  return (
    <div className="pr-4 h-full">
      {filteredTasks.length === 0 ? (
        <div className="flex justify-center items-center h-full text-gray-500">
          No tasks found. 
        </div>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TasksList;
