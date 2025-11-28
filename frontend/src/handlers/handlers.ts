import {
  fetchNotes,
  addNote,
  editNote,
  dropNote,
  archiveNote,
  addCategoryToNote,
} from "../services/noteService";
import { fetchCategories, deleteCategory } from "../services/categoryService";
import { Note } from "../types/Note";
import { Category } from "../types/Category";

type SetNotesFunction = React.Dispatch<React.SetStateAction<Note[]>>;
type SetArchivedNotesFunction = React.Dispatch<React.SetStateAction<Note[]>>;
type SetCategoriesFunction = React.Dispatch<React.SetStateAction<Category[]>>;
type SetOpenNoteModalFunction = React.Dispatch<
  React.SetStateAction<{
    isShown: boolean;
    type: "add" | "edit";
    data: Partial<Note> | undefined;
  }>
>;

export const retrieveNotes = async (
  setNotes: SetNotesFunction,
  setArchivedNotes: SetArchivedNotesFunction
): Promise<void> => {
  const notes = await fetchNotes();
  setNotes(notes.filter((note) => !note.isArchived));
  setArchivedNotes(notes.filter((note) => note.isArchived));
};

export const retrieveCategories = async (
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
): Promise<void> => {
  const res = await fetchCategories();
  if (res.length > 0) {
    const transformedCategories = res.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
    }));
    setCategories(transformedCategories);
  }
};

export const handleArchive = async (
  id: number,
  notes: Note[],
  archivedNotes: Note[],
  setNotes: SetNotesFunction,
  setArchivedNotes: SetArchivedNotesFunction
): Promise<void> => {
  const noteToArchive =
    notes.find((note) => note.id === id) ||
    archivedNotes.find((note) => note.id === id);
  if (noteToArchive) {
    const updatedNote = {
      ...noteToArchive,
      isArchived: !noteToArchive.isArchived,
    };
    const archivedNote = await archiveNote(id, updatedNote);
    if (archivedNote) {
      retrieveNotes(setNotes, setArchivedNotes);
      window.location.reload();
    }
  }
};

export const handleAddNote = async (
  note: Note,
  setNotes: SetNotesFunction,
  setArchivedNotes: SetArchivedNotesFunction,
  setOpenNoteModal: SetOpenNoteModalFunction
): Promise<void> => {
  if (!note.category) {
    note.category = null;
  }

  const newNote = await addNote(note);
  if (newNote) {
    retrieveNotes(setNotes, setArchivedNotes);
    setOpenNoteModal({ isShown: false, type: "add", data: undefined });
    window.location.reload();
  }
};

export const handleEditNote = async (
  note: Note,
  setNotes: SetNotesFunction,
  setArchivedNotes: SetArchivedNotesFunction,
  setOpenNoteModal: SetOpenNoteModalFunction
): Promise<void> => {
  if (!note.category) {
    note.category = null;
  }

  const updatedNote = await editNote(note.id, note);
  if (updatedNote) {
    retrieveNotes(setNotes, setArchivedNotes);
    setOpenNoteModal({ isShown: false, type: "edit", data: undefined });
  }
};

export const handleDeleteNote = async (
  id: number,
  setNotes: SetNotesFunction,
  setArchivedNotes: SetArchivedNotesFunction
): Promise<void> => {
  const success = await dropNote(id);
  if (success) {
    retrieveNotes(setNotes, setArchivedNotes);
    window.location.reload();
  }
};

export const handleDeleteCategory = async (
  categoryId: number,
  setCategories: SetCategoriesFunction
): Promise<void> => {
  await deleteCategory(categoryId);
  retrieveCategories(setCategories);
  window.location.reload();
};

export const handleAddCategoryToNote = async (
  noteId: number,
  categoryId: number,
  setNotes: SetNotesFunction,
  setArchivedNotes: SetArchivedNotesFunction
): Promise<void> => {
  const updatedNote = await addCategoryToNote(noteId, categoryId);
  if (updatedNote) {
    retrieveNotes(setNotes, setArchivedNotes);
    window.location.reload();
  }
};

export const handleEdit = (
  id: number,
  notes: Note[],
  archivedNotes: Note[],
  setOpenNoteModal: SetOpenNoteModalFunction
): void => {
  const noteToEdit =
    notes.find((note) => note.id === id) ||
    archivedNotes.find((note) => note.id === id);
  if (noteToEdit) {
    setOpenNoteModal({ isShown: true, type: "edit", data: noteToEdit });
  }
};
