import React, { memo } from 'react';
import { Search } from 'lucide-react';

interface SearchIconProps {
  onClick: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = memo(({ onClick }) => {
  return (
    <Search
      className="absolute left-2 w-6 h-6 text-gray-500 cursor-pointer"
      onClick={onClick}
    />
  );
});


export default SearchIcon; 