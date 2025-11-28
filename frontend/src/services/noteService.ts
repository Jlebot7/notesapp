import axiosInstance from "../utils/AxiosInstance";
import CreateNoteDTO from "../dtos/CreateNoteDTO";
import EditNoteDTO from "../dtos/EditNoteDTO";
import AddCategoryToNoteDTO from "../dtos/AddCategoryToNoteDTO";
import { Note } from "../types/Note";

const fetchNotes = async (): Promise<Note[]> => {
  const res = await axiosInstance.get("/notes");
  return res.data;
};

const fetchNoteById = async (id: number): Promise<Note | null> => {
  const res = await axiosInstance.get(`/notes/${id}`);
  return res.data || null;
};

const addNote = async (note: Note): Promise<Note | null> => {
  const createNoteDTO = new CreateNoteDTO(
    note.title,
    note.content,
    false,
    note.category || null
  );
  const res = await axiosInstance.post("/notes", createNoteDTO);
  if (res.data && res.data.note) {
    return res.data.note;
  }
  return null;
};

const editNote = async (
  noteId: number,
  updatedNote: Note
): Promise<Note | null> => {
  const editNoteDTO = new EditNoteDTO(
    updatedNote.title,
    updatedNote.content,
    updatedNote.category || null
  );
  const res = await axiosInstance.put(`/notes/${noteId}`, editNoteDTO);
  if (res.data && res.data.note) {
    return res.data.note;
  }
  return null;
};

const dropNote = async (noteId: number): Promise<boolean> => {
  const res = await axiosInstance.delete(`/notes/${noteId}`);
  if (res.data && res.data.success) {
    return true;
  }
  return false;
};

const archiveNote = async (
  noteId: number,
  updatedNote: { isArchived: boolean }
): Promise<Note | null> => {
  const res = await axiosInstance.put(`/notes/${noteId}/archive`, updatedNote);
  if (res.data && res.data.note) {
    return res.data.note;
  }
  return null;
};

const fetchNotesByCategory = async (categoryId: number): Promise<Note[]> => {
  try {
    const res = await axiosInstance.get(`/notes/category/${categoryId}`);
    if (res.data) {
      return res.data.map((note: Note) => ({
        ...note,
        category: note.category || null,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching notes by category:", error);
    return [];
  }
};

const addCategoryToNote = async (
  noteId: number,
  categoryId: number
): Promise<Note | null> => {
  const addCategoryToNoteDTO = new AddCategoryToNoteDTO(categoryId);
  const res = await axiosInstance.put(
    `/notes/${noteId}/category`,
    addCategoryToNoteDTO
  );
  if (res.data && res.data.note) {
    return res.data.note;
  }
  return null;
};

export {
  fetchNotes,
  fetchNoteById,
  addNote,
  editNote,
  dropNote,
  archiveNote,
  fetchNotesByCategory,
  addCategoryToNote,
};
