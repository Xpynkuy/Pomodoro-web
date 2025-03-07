// components/StopWatch/SessionToggle.tsx
import React from "react";

import { Coffee, Pickaxe, Timer } from "lucide-react";
import { usePomodoroStore } from "../../store/usePomodoroStore";

type SessionType = "work" | "shortBreak" | "longBreak";

const sessionLabels: Record<SessionType, string> = {
  work: "Work",
  shortBreak: "Break",
  longBreak: "Long Break",
};

function indexForType(type: SessionType): number {
  switch (type) {
    case "work":
      return 0;
    case "shortBreak":
      return 1;
    case "longBreak":
      return 2;
  }
}

const SessionToggle: React.FC = () => {
  const { sessionType, setSessionType } = usePomodoroStore();

  const currentIndex = indexForType(sessionType);
  const highlightStyle = {
    left: `calc((100% / 3) * ${currentIndex})`,
  };

  return (
    <div className="relative flex w-96 h-14 bg-white/30 rounded-full p-1">
      {/* Подложка для выбранного сегмента */}
      <div
        className="absolute top-0 bottom-0 w-1/3 bg-white rounded-full shadow 
                   transition-all duration-300"
        style={highlightStyle}
      />
      {/* Три сегмента */}
      <button
        onClick={() => setSessionType("work")}
        className={`
          relative  flex-1 flex items-center justify-center gap-2 z-10 text-center text-sm font-semibold
          transition-all duration-300
          ${
            sessionType === "work"
              ? "text-black"
              : "text-gray-500 hover:text-gray-400"
          }
        `}
      >
        <Pickaxe />
        {sessionLabels.work}
      </button>
      <button
        onClick={() => setSessionType("shortBreak")}
        className={`
          relative  flex-1 flex items-center justify-center gap-2 z-10 text-center text-sm font-semibold
          transition-all duration-300
          ${
            sessionType === "shortBreak"
              ? "text-black "
              : "text-gray-500 hover:text-gray-400"
          }
        `}
      >
        <Coffee /> {sessionLabels.shortBreak}
      </button>
      <button
        onClick={() => setSessionType("longBreak")}
        className={`
          relative  flex-1 flex items-center justify-center gap-2 z-10 text-center text-sm font-semibold
          transition-all duration-300
          ${
            sessionType === "longBreak"
              ? "text-black"
              : "text-gray-500 hover:text-gray-400"
          }
        `}
      >
        <Timer /> {sessionLabels.longBreak}
      </button>
    </div>
  );
};

export default SessionToggle;
