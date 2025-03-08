import React from "react";

interface ProgressCircleProps {
  percentage: number; // от 0 до 100
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentage }) => {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-white/40"
          stroke="currentColor"
          fill="#DAE0F1"
          r="45"
          cx="50"
          cy="50"
        />

        <circle
          className="text-purple-600/70"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="#DAE0F1"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-end text-xl font-bold text-gray-800 gap-0.5">
          {Math.round(clamped)} <span className="text-base">%</span>
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
