import axiosInstance from "../utils/AxiosInstance";
import { Category } from "../types/Category";

const fetchCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};

const fetchCategoryById = async (id: number): Promise<Category | null> => {
  const res = await axiosInstance.get(`/categories/id/${id}`);
  return res.data || null;
};

const fetchCategoryByName = async (name: string): Promise<Category | null> => {
  const res = await axiosInstance.get(`/categories/name/${name}`);
  return res.data || null;
};

const createCategory = async (name: string): Promise<Category> => {
  const res = await axiosInstance.post("/categories", { name });
  return res.data;
};

const deleteCategory = async (id: number): Promise<boolean> => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data.success;
};

const getCategoryNameById = (id: number, categories: Category[]): string => {
  const category = categories.find((cat) => cat.id === id);
  return category ? category.name : "Unknown Category";
};

export {
  fetchCategories,
  fetchCategoryById,
  fetchCategoryByName,
  createCategory,
  deleteCategory,
  getCategoryNameById,
};
