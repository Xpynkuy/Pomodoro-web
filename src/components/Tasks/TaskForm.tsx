import React, { useState } from "react";
import { useModalStore } from "../../store/useModalStore";
import { useTasksStore } from "../../store/useTaskStore";
import { useEditTaskStore } from "../../store/useEditTaskStore";
import CategorySelect from "../Category/CategorySelect";
import { categories } from "../../constants/category";
import MyButton from "../UI/button/MyButton";


interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
}

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
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasErrors = false;

    if (!title.trim()) {
      newErrors.title = "Please enter a task title";
      hasErrors = true;
    }
    if (!description.trim()) {
      newErrors.description = "Please enter a description";
      hasErrors = true;
    }
    if (!category) {
      newErrors.category = "Please select a category";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
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

  const clearError = (field: keyof FormErrors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{formTitle}</h2>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            clearError('title');
          }}
          placeholder="Task Title"
          className={`w-full p-2 rounded-xl border focus:outline-none transition-all duration-200
            ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
        />
        {errors.title && (
          <div className="text-red-500 text-sm pl-2 animate-fadeIn">
            {errors.title}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <CategorySelect
          categories={categories}
          selectedCategory={category}
          onCategoryChange={(catId) => {
            setCategory(catId);
            clearError('category');
          }}
        />
        {errors.category && (
          <div className="text-red-500 text-sm pl-2 animate-fadeIn">
            {errors.category}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearError('description');
          }}
          placeholder="Task Description"
          className={`w-full h-20 resize-none p-2 rounded-xl border focus:outline-none transition-all duration-200
            ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
          maxLength={40}
        />
        {errors.description && (
          <div className="text-red-500 text-sm pl-2 animate-fadeIn">
            {errors.description}
          </div>
        )}
      </div>

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
