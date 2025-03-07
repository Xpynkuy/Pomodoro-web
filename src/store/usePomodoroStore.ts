import { create } from "zustand";
import { useTasksStore } from "./useTaskStore";

const WORK_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;

type SessionType = "work" | "shortBreak" | "longBreak";

interface IPomodoroStore {
  sessionType: SessionType;
  timeLeft: number;
  isRunning: boolean;
  currentTaskId: number | null;
  workCycleCount: number;

  pickTask: (taskId: number) => void;
  unselectTask: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  setSessionType: (type: SessionType) => void;
  tick: () => void;
}

export const usePomodoroStore = create<IPomodoroStore>((set, get) => ({
  sessionType: "work",
  timeLeft: WORK_DURATION,
  isRunning: false,
  currentTaskId: null,
  workCycleCount: 0,

  pickTask: (taskId) => {
    const { currentTaskId } = get();
    const tasks = useTasksStore.getState().tasks;
    const chosen = tasks.find((t) => t.id === taskId);
    if (!chosen) return; // Нет такой задачи
    if (taskId === currentTaskId) return; // Та же самая

    // Сбрасываем таймер и выбираем новую задачу
    set({
      currentTaskId: taskId,
      sessionType: "work",
      timeLeft: WORK_DURATION,
      isRunning: false,
      workCycleCount: 0,
    });
  },

  unselectTask: () => {
    set({
      currentTaskId: null,
      sessionType: "work",
      timeLeft: WORK_DURATION,
      isRunning: false,
      workCycleCount: 0,
    });
  },

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),
  resetTimer: () =>
    set({
      sessionType: "work",
      timeLeft: WORK_DURATION,
      isRunning: false,
      currentTaskId: null,
      workCycleCount: 0,
    }),

  skipSession: () => {
    const { sessionType, workCycleCount } = get();
    set({ isRunning: false });

    if (sessionType === "work") {
      const newCount = workCycleCount + 1;
      if (newCount >= 4) {
        set({
          sessionType: "longBreak",
          timeLeft: LONG_BREAK_DURATION,
          workCycleCount: 0,
        });
      } else {
        set({
          sessionType: "shortBreak",
          timeLeft: SHORT_BREAK_DURATION,
          workCycleCount: newCount,
        });
      }
    } else if (sessionType === "shortBreak" || sessionType === "longBreak") {
      set({
        sessionType: "work",
        timeLeft: WORK_DURATION,
      });
    }
  },

  setSessionType: (type) => {
    set({
      sessionType: type,
      timeLeft: getDurationFor(type),
      isRunning: false,
    });
  },

  tick: () => {
    const { timeLeft, isRunning, sessionType, workCycleCount } = get();
    if (!isRunning) return;

    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 });
    } else {
      // Фаза закончилась
      if (sessionType === "work") {
        const newCount = workCycleCount + 1;
        if (newCount >= 4) {
          set({
            sessionType: "longBreak",
            timeLeft: LONG_BREAK_DURATION,
            workCycleCount: 0,
            isRunning: true,
          });
        } else {
          set({
            sessionType: "shortBreak",
            timeLeft: SHORT_BREAK_DURATION,
            workCycleCount: newCount,
            isRunning: true,
          });
        }
      } else {
        // shortBreak или longBreak => обратно в work
        set({
          sessionType: "work",
          timeLeft: WORK_DURATION,
          isRunning: true,
        });
      }
    }
  },
}));

function getDurationFor(type: SessionType) {
  switch (type) {
    case "work":
      return WORK_DURATION;
    case "shortBreak":
      return SHORT_BREAK_DURATION;
    case "longBreak":
      return LONG_BREAK_DURATION;
  }
}
