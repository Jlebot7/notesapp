import {
  retrieveNotes,
  retrieveCategories,
  handleArchive,
  handleAddNote,
  handleEditNote,
  handleDeleteNote,
  handleDeleteCategory,
  handleAddCategoryToNote,
  handleEdit,
} from "../handlers/handlers";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/Notecard";
import { IoAddCircle, IoTrash } from "react-icons/io5";
import moment from "moment";
import ArchivedNotesSection from "../components/ArchivedNotesSection";
import NoteModal from "../components/NoteModal";
import { Note } from "../types/Note";
import { Category } from "../types/Category";

const Home: React.FC = () => {
  const [openNoteModal, setOpenNoteModal] = useState<{
    isShown: boolean;
    type: "add" | "edit";
    data: Partial<Note> | undefined;
  }>({
    isShown: false,
    type: "add",
    data: undefined,
  });
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [showArchived, setShowArchived] = useState<boolean>(false);

  useEffect(() => {
    retrieveNotes(setNotes, setArchivedNotes);
    retrieveCategories(setCategories);
  }, []);

  return (
    <div>
      <Navbar
        userInfo={{ username: localStorage.getItem("username") || "guest" }}
      />
      <div className="container mx-auto">
        <div className="mt-5">
          <h2 className="text-2xl font-bold text-white">All Notes</h2>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                date={moment(note.createdAt).format("Do MMM YYYY")}
                content={note.content}
                category={note.category}
                onArchive={() =>
                  handleArchive(
                    note.id,
                    notes,
                    archivedNotes,
                    setNotes,
                    setArchivedNotes
                  )
                }
                onDelete={() =>
                  handleDeleteNote(note.id, setNotes, setArchivedNotes)
                }
                onEdit={() =>
                  setOpenNoteModal({ isShown: true, type: "edit", data: note })
                }
              />
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-2xl font-bold text-white">Categories</h2>
          <div className="flex gap-3 mt-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <button
                  className={`btn ${
                    selectedCategory === category.id ? "btn-active" : ""
                  } text-white`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setExpandedCategory(category.id);
                  }}
                >
                  {category.name}
                </button>
                <button
                  className="ml-2 text-red-500"
                  onClick={() =>
                    handleDeleteCategory(category.id, setCategories)
                  }
                >
                  <IoTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
        {expandedCategory && (
          <div className="mt-5">
            <div className="grid grid-cols-3 gap-3 mt-3">
              {notes
                .filter(
                  (note) =>
                    note.category && note.category.id === expandedCategory
                )
                .map((note) => (
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    date={moment(note.createdAt).format("Do MMM YYYY")}
                    content={note.content}
                    category={note.category}
                    onArchive={() =>
                      handleArchive(
                        note.id,
                        notes,
                        archivedNotes,
                        setNotes,
                        setArchivedNotes
                      )
                    }
                    onDelete={() =>
                      handleDeleteNote(note.id, setNotes, setArchivedNotes)
                    }
                    onEdit={() =>
                      setOpenNoteModal({
                        isShown: true,
                        type: "edit",
                        data: note,
                      })
                    }
                  />
                ))}
            </div>
          </div>
        )}
        <button
          className="mt-5 text-white hover:underline"
          onClick={() => setShowArchived(!showArchived)}
        >
          {showArchived ? "Hide archived notes" : "Show archived notes"}
        </button>
        {showArchived && (
          <ArchivedNotesSection
            archivedNotes={archivedNotes}
            onArchive={(id) =>
              handleArchive(
                id,
                notes,
                archivedNotes,
                setNotes,
                setArchivedNotes
              )
            }
            onDelete={(id) => handleDeleteNote(id, setNotes, setArchivedNotes)}
            onEdit={(id) =>
              handleEdit(id, notes, archivedNotes, setOpenNoteModal)
            }
            onAddCategory={(noteId) =>
              handleAddCategoryToNote(
                noteId,
                selectedCategory!,
                setNotes,
                setArchivedNotes
              )
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-xl hover:bg-gray-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenNoteModal({ isShown: true, type: "add", data: undefined })
        }
      >
        <IoAddCircle className="text-[40px] text-white" />
      </button>
      <NoteModal
        isOpen={openNoteModal.isShown}
        onRequestClose={() =>
          setOpenNoteModal({ isShown: false, type: "add", data: undefined })
        }
        noteData={openNoteModal.data}
        type={openNoteModal.type}
        setNotes={setNotes}
        setArchivedNotes={setArchivedNotes}
        handleAddNote={handleAddNote}
        handleEditNote={handleEditNote}
      />
    </div>
  );
};

export default Home;
