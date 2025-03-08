import { create } from "zustand";
import { persist } from "zustand/middleware";


const WORK_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;

type SessionType = "work" | "shortBreak" | "longBreak";

// стор для состояния таймера
interface ITimerStore {
  sessionType: SessionType;
  timeLeft: number;
  isRunning: boolean;
  workCycleCount: number;

  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  setSessionType: (type: SessionType) => void;
  tick: () => void;
  getDurationFor: (type: SessionType) => number;
}

// стор для текущей задачи
interface ICurrentTaskStore {
  currentTaskId: number | null;
  pickTask: (taskId: number) => void;
  unselectTask: () => void;
}

export const useTimerStore = create<ITimerStore>()(
  persist(
    (set, get) => ({
      sessionType: "work",
      timeLeft: WORK_DURATION,
      isRunning: false,
      workCycleCount: 0,

      startTimer: () => set({ isRunning: true }),
      pauseTimer: () => set({ isRunning: false }),
      resetTimer: () =>
        set({
          sessionType: "work",
          timeLeft: WORK_DURATION,
          isRunning: false,
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
        const store = get();
        set({
          sessionType: type,
          timeLeft: store.getDurationFor(type),
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

      getDurationFor: (type: SessionType) => {
        switch (type) {
          case "work":
            return WORK_DURATION;
          case "shortBreak":
            return SHORT_BREAK_DURATION;
          case "longBreak":
            return LONG_BREAK_DURATION;
        }
      },
    }),
    {
      name: "pomodoro-storage",
      partialize: (state) => ({
        sessionType: state.sessionType,
        timeLeft: state.timeLeft,
        workCycleCount: state.workCycleCount,
      }),
    }
  )
);

export const useCurrentTaskStore = create<ICurrentTaskStore>()(
  persist(
    (set) => ({
      currentTaskId: null,

      pickTask: (taskId) => {
        const timerStore = useTimerStore.getState();
        
        timerStore.resetTimer();

        set({ currentTaskId: taskId });
      },

      unselectTask: () => {
        const timerStore = useTimerStore.getState();
        timerStore.resetTimer();

        set({ currentTaskId: null });
      },
    }),
    {
      name: "pomodoro-task-storage"
    }
  )
);

// Для обратной совместимости
export const usePomodoroStore = {
  ...useTimerStore,
  ...useCurrentTaskStore,
};
