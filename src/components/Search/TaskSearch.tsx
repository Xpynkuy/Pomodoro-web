import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchStore } from "../../store/useSearchStore";

const TaskSearch: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        expanded &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  return (
    <div
      ref={containerRef}
      className={`
        relative h-8 flex 
        items-center       
        overflow-hidden
        transition-all duration-300
        ${expanded ? "w-52" : "w-10"}
      `}
    >
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="absolute left-0 top-0 w-full h-full pl-9 pr-2 
                   rounded-2xl border border-gray-400 
                   bg-transparent/5 focus:outline-none text-sm font-medium"
        style={{
          opacity: expanded ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: expanded ? "auto" : "none",
        }}
      />

      <Search
        className="absolute left-2 w-6 h-6 text-gray-500 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      />
    </div>
  );
};

export default TaskSearch;
