import React, { useState, useRef, useCallback } from "react";
import { useSearchStore } from "../../store/useSearchStore";
import useClickOutside from "../../hooks/useClickOutside";
import SearchInput from "../UI/search/SearchInput";
import SearchIcon from "../UI/search/SearchIcon";


const TaskSearch: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const handleClickOutside = useCallback(() => {
    setExpanded(false);
  }, []);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [setSearchQuery]
  );

  useClickOutside(containerRef, handleClickOutside, expanded);

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
      <SearchInput
        searchQuery={searchQuery}
        expanded={expanded}
        onChange={handleSearchChange}
      />
      <SearchIcon onClick={toggleExpanded} />
    </div>
  );
};

export default TaskSearch;
