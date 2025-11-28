import React, { useState } from "react";
import ReactModal from "react-modal";
import AddEditNote from "../components/AddEditNote";
import { Note } from "../types/Note";
import { Category } from "../types/Category";

interface NoteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  noteData: Partial<Note> | undefined;
  type: "add" | "edit";
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setArchivedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  handleAddNote: any;
  handleEditNote: any;
}

const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onRequestClose,
  noteData,
  type,
  setNotes,
  setArchivedNotes,
  handleAddNote,
  handleEditNote,
}) => {
  const [selectedCategoryObj] = useState<Category | null>(null);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(72, 61, 61, 0.5)",
        },
      }}
      contentLabel=""
      className="w-[60%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5 overflow-scroll"
    >
      <AddEditNote
        type={type}
        noteData={noteData}
        selectedCategory={selectedCategoryObj}
        onClose={onRequestClose}
        onSave={
          type === "add"
            ? (note) => handleAddNote(note, setNotes, setArchivedNotes)
            : (note) => handleEditNote(note, setNotes, setArchivedNotes)
        }
      />
    </ReactModal>
  );
};

export default NoteModal;
