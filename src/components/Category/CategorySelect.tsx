import React from "react";

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategoryProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (catId: string) => void;
}

const CategorySelect: React.FC<CategoryProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <>
      <h1 className="flex text-lg font-normal">Select Category</h1>
      <div className="grid grid-cols-6 gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={`flex flex-col items-center p-2 rounded-xl border ${
              selectedCategory === cat.id
                ? "border-green-500 bg-green-300/10"
                : "bg-white"
            }`}
          >
            <img src={cat.icon} alt={cat.label} className="w-8 h-8 mb-1" />
            <span className="text-sm">{cat.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default CategorySelect;
