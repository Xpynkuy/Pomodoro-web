import ModalRoot from "../components/Modal/ModalRoot";
import DailyProgress from "../components/Progress/DailyProgress";
import PomodoroTimer from "../components/StopWatch/PomodoroTimer";

import TasksLayout from "../components/Tasks/TasksLayout";

export default function App() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen flex justify-center items-center p-4">
      <div className="grid grid-cols-2 gap-10 w-full h-full">
        <TasksLayout />
        <div className="flex flex-col gap-4">
          <DailyProgress />
          <PomodoroTimer/>
        </div>
      </div>
      <ModalRoot />
    </div>
  );
}
