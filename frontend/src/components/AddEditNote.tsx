import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { fetchCategories, createCategory } from "../services/categoryService";
import { Category } from "../types/Category";
import { Note } from "../types/Note";

interface AddEditNoteProps {
  noteData?: Partial<Note>;
  selectedCategory: Category | null;
  type: "add" | "edit";
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
}

const AddEditNote: React.FC<AddEditNoteProps> = ({
  noteData,
  selectedCategory,
  type,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState<string>(noteData?.title || "");
  const [content, setContent] = useState<string>(noteData?.content || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryObj, setSelectedCategoryObj] =
    useState<Category | null>(selectedCategory);

  useEffect(() => {
    const retrieveCategories = async () => {
      const res = await fetchCategories();
      setCategories(res);
    };
    retrieveCategories();
  }, []);

  const handleSave = () => {
    if (!title) {
      setError("Title required");
      return;
    }
    if (!content) {
      setError("No content");
      return;
    }
    setError(null);

    const note: Partial<Note> = {
      id: noteData?.id,
      title,
      content,
      category: selectedCategoryObj || null,
    };

    onSave(note);
    onClose();
  };

  const handleCreateCategory = async () => {
    await createCategory(newCategory);
    const res = await fetchCategories();
    if (res.length > 0) {
      setCategories(res);
    }
    setNewCategory("");
  };

  return (
    <div className="relative">
      <button
        className="w-5 h-5 rounded-full flex items-center justify-center absolute -top-1 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <IoClose className="text-xl text-slate-500" />
      </button>
      <div className="flex flex-col gap-3">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-xl text-slate-500 outline-none"
          placeholder="Title Here"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-5 mt-3">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-500 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content Here"
          rows={5}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <div className="mt-3">
          <label className="input-label">CATEGORIES</label>
          <select
            className="text-sm text-slate-500 outline-none bg-slate-50 p-2 rounded"
            value={selectedCategoryObj ? selectedCategoryObj.id.toString() : ""}
            onChange={({ target }) => {
              const selectedCat =
                categories.find((cat) => cat.id.toString() === target.value) ||
                null;
              setSelectedCategoryObj(selectedCat);
            }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option
                key={category.id.toString()}
                value={category.id.toString()}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-400 text-sm pt-3">{error}</p>}
        <button
          className="btn-primary font-medium mt-2 p-2"
          onClick={handleSave}
        >
          {type === "add" ? "Add Note" : "Save Changes"}
        </button>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <label className="input-label">NEW CATEGORY</label>
        <input
          type="text"
          className="text-sm text-slate-500 outline-none bg-slate-50 p-2 rounded"
          placeholder="New Category"
          value={newCategory}
          onChange={({ target }) => setNewCategory(target.value)}
        />
        <button
          className="btn-primary font-medium mt-2 p-2"
          onClick={handleCreateCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddEditNote;
