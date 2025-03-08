import React, { useState } from "react";

import CategorySelect from "../Category/CategorySelect";
import { categories } from "../../constants/category";
import MyButton from "../UI/button/MyButton";
import { useModalStore } from "../../store/useModalStore";
import { useTasksStore } from "../../store/useTaskStore";
import { useEditTaskStore } from "../../store/useEditTaskStore";

const TaskForm: React.FC = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const { addTask, updateTask } = useTasksStore();
  const { taskToEdit, setTaskToEdit } = useEditTaskStore();

  const isEditMode = !!taskToEdit;

  const [title, setTitle] = useState(isEditMode ? taskToEdit.title : "");
  const [category, setCategory] = useState(
    isEditMode ? taskToEdit.category : ""
  );
  const [description, setDescription] = useState(
    isEditMode ? taskToEdit.description : ""
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
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

    if (isEditMode) {
      updateTask(taskToEdit.id, {
        title,
        category,
        description,
      });
    } else {
      addTask(title, category, description);
    }

    closeModal();
    setTaskToEdit(null);
  };

  const formTitle = isEditMode ? "Edit Task" : "New Task";
  const buttonText = isEditMode ? "Save Changes" : "Add Task";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{formTitle}</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        placeholder="Task Title"
        className="w-full p-2 rounded-xl border focus:outline-none"
      />

      <CategorySelect
        categories={categories}
        selectedCategory={category}
        onCategoryChange={(catId) => {
          setCategory(catId);
          setError("");
        }}
      />

      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setError("");
        }}
        placeholder="Task Description"
        className="w-full h-20 resize-none p-2 rounded-xl border focus:outline-none"
        maxLength={40}
      />

      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="flex items-center justify-center gap-6">
        <MyButton
          variant="secondary"
          type="button"
          onClick={() => {
            closeModal();
            setTaskToEdit(null);
          }}
        >
          Cancel
        </MyButton>
        <MyButton type="submit">{buttonText}</MyButton>
      </div>
    </form>
  );
};

export default TaskForm;
