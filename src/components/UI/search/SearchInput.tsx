import React, { memo } from 'react';

interface SearchInputProps {
  searchQuery: string;
  expanded: boolean;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = memo(({ 
  searchQuery, 
  expanded, 
  onChange 
}) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => onChange(e.target.value)}
      className="absolute left-0 top-0 w-full h-full pl-9 pr-2 
                 rounded-2xl border border-gray-400 
                 bg-transparent/5 focus:outline-none text-sm font-medium"
      style={{
        opacity: expanded ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: expanded ? "auto" : "none",
      }}
    />
  );
});



export default SearchInput; 