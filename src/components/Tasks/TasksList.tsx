import React from "react";
import { useTasksStore } from "../../store/store";
import TaskCard from "../Card/TaskCard";

const TasksList: React.FC = () => {
  const filteredTasks = useTasksStore((state) => state.filteredTasks);

  return (
    <div className="pr-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
