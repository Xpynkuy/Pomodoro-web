import React, { useRef, useEffect, useState } from "react";
import { PencilLine, Trash2, MoreVertical } from "lucide-react";

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative ml-auto" ref={menuRef}>
      <button
        className="p-2 rounded-full hover:opacity-60 duration-100 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <MoreVertical size={18} />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 
                     rounded-2xl shadow-lg z-10"
        >
          <ul className="p-2">
            <li>
              <button
                onClick={onEdit}
                className="flex items-center gap-4 w-full text-left px-4 py-3 text-base rounded-xl hover:bg-gray-100/70"
              >
                <PencilLine className="size-4 opacity-35" /> Edit Task
              </button>
            </li>
            <li>
              <button
                onClick={onDelete}
                className="flex items-center gap-4 w-full text-left px-4 py-2 text-base rounded-xl hover:bg-gray-100/70"
              >
                <Trash2 className="size-4 opacity-35" /> Delete Task
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(DropdownMenu);