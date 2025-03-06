// ProgressCircle.tsx
import React from "react";

interface ProgressCircleProps {
  percentage: number; // от 0 до 100
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage }) => {
  // Подстрахуемся: не даём уйти за границы 0...100
  const clamped = Math.min(Math.max(percentage, 0), 100);

  // Радиус круга (r=45) и вычисление длины окружности
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // Смещение "прогресса" по окружности
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      {/* Сам SVG, повёрнут на -90°, чтобы "начало" дуги было сверху */}
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        {/* 1) Серый "фон" кольца + fill для внутренней области */}
        <circle
          className="text-white/40"    // цвет обводки (stroke)
          strokeWidth="8"
          stroke="currentColor"
          fill="#DAE0F1"               // <-- задаём цвет фона (можно поменять)
          r="45"
          cx="50"
          cy="50"
        />
        {/* 2) Закрашенная дуга (progress) */}
        <circle
          className="text-purple-600/70"
          strokeWidth="8"
          strokeDasharray={circumference} // длина окружности
          strokeDashoffset={offset}       // сдвиг по проценту
          strokeLinecap="round"           // скруглённые концы
          stroke="currentColor"
          fill="#DAE0F1"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>

      {/* Текст в центре */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-end text-xl font-bold text-gray-800 gap-0.5">
          {Math.round(clamped)} <span className="text-base">%</span>
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
