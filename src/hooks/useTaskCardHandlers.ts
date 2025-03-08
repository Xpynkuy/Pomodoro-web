import { useCallback } from 'react';
import { useTasksStore } from '../store/useTaskStore';
import { useCurrentTaskStore } from '../store/usePomodoroStore';
import { useModalStore } from '../store/useModalStore';
import { useEditTaskStore } from '../store/useEditTaskStore';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  description: string;
}

export const useTaskCardHandlers = (task: Task) => {
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const tasks = useTasksStore((state) => state.tasks);
  const openModal = useModalStore((state) => state.openModal);
  const setTaskToEdit = useEditTaskStore((state) => state.setTaskToEdit);
  const { pickTask } = useCurrentTaskStore();

  const handleCardClick = useCallback(() => {
    pickTask(task.id);
  }, [task.id, pickTask]);

  const handleEditTask = useCallback(() => {
    setTaskToEdit({ ...task, createdAt: new Date() });
    openModal();
  }, [task, setTaskToEdit, openModal]);

  const handleDeleteTask = useCallback(() => {
    deleteTask(task.id);
  }, [task.id, deleteTask]);

  const handleCheckboxChange = useCallback(() => {
    const wasCompleted = task.completed;
    toggleTask(task.id);

    if (!wasCompleted) {
      const uncompletedTasks = tasks.filter(
        (t) => !t.completed && t.id !== task.id
      );

      if (uncompletedTasks.length === 0) {
        window.alert("Congratulations! You've completed all tasks for today! 🎉");
      } else {
        const yes = window.confirm("Do you want to switch to the next task?");
        if (yes && uncompletedTasks.length > 0) {
          pickTask(uncompletedTasks[0].id);
        }
      }
    }
  }, [task, toggleTask, tasks, pickTask]);

  return {
    handleCardClick,
    handleEditTask,
    handleDeleteTask,
    handleCheckboxChange,
  };
}; 