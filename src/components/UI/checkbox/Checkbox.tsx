import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full 
               checked:bg-green-400/70 checked:border-green-500 
               focus:outline-none cursor-pointer"
  />
);

export default Checkbox; 