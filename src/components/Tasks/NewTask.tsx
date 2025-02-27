import React, { useState } from "react";
import { useTasksStore } from "../../store/store";
import CategorySelect from "../Category/CategorySelect";
import { categories } from "../../constants/category";
import MyButton from "../UI/button/MyButton";

const NewTask: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState("");
  const addTask = useTasksStore((state) => state.addTask);
  const closeModal = useTasksStore((state) => state.closeModal);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }

    addTask(title, category, description);
    setTitle("");
    setCategory("");
    setDescription("");
    setError("");
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask(e);
    }
  };

  return (
    <form onSubmit={handleAddTask} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a new task"
        className="w-full p-2"
      />
      <CategorySelect
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a desc"
        className="w-full h-40 resize-none p-2 rounded-xl border"
      />

      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="flex items-center justify-center gap-6">
        <MyButton variant="secondary" type="button" onClick={closeModal}>
          Cancel
        </MyButton>

        <MyButton type="submit">Add Task</MyButton>
      </div>
    </form>
  );
};

export default NewTask;
