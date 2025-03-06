// components/StopWatch/PomodoroTimer.tsx
import React, { useEffect } from "react";
import { usePomodoroStore } from "../../store/pomodoroStore";
import { useTasksStore } from "../../store/store";
import MyButton from "../UI/button/MyButton";
import { RotateCcw, SkipForward } from "lucide-react";
import SessionToggle from "./SessionToggle";

const PomodoroTimer: React.FC = () => {
  const {
    sessionType,
    timeLeft,
    isRunning,
    currentTaskId,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    tick,
  } = usePomodoroStore();

  const tasks = useTasksStore((s) => s.tasks);
  const currentTask = tasks.find((t) => t.id === currentTaskId);

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

  return (
    <div className="flex flex-col justify-between items-center gap-4 p-6 h-2/3 rounded-2xl bg-slate-100/20">
      {/* Блок с переключением режима и Reset */}
      <div className="flex justify-between gap-6">
        <SessionToggle />
      </div>

      <div className="text-9xl font-bold">{formatTime(timeLeft)}</div>

      <div className="bg-white/30 p-3 rounded-2xl text-lg">
        {currentTask ? <p>{currentTask.title}</p> : <p>It's time to focus</p>}
      </div>

      <div className="flex justify-center gap-4 h-12">
        <button onClick={resetTimer} className="bg-red-600/80 rounded-full p-3">
          <RotateCcw />
        </button>
        {isRunning ? (
          <MyButton onClick={pauseTimer}>Pause</MyButton>
        ) : (
          <MyButton onClick={startTimer}>Start</MyButton>
        )}

        <button onClick={skipSession} className="bg-white/70 rounded-full p-3">
          <SkipForward />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
