import React from "react";
import { Note } from "../types/Note";
import NoteCard from "./Notecard";
import moment from "moment";

interface ArchivedNotesSectionProps {
  archivedNotes: Note[];
  onArchive: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number) => void;
  onAddCategory: (noteId: number, categoryId: number) => void;
}

const ArchivedNotesSection: React.FC<ArchivedNotesSectionProps> = ({
  archivedNotes,
  onArchive,
  onDelete,
  onEdit,
}) => {
  const handleArchive = async (id: number) => {
    try {
      await onArchive(id);
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white">Archived Notes</h2>
      <div className="grid grid-cols-3 gap-3 mt-3">
        {archivedNotes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            date={moment(note.createdAt).format("Do MMM YYYY")}
            content={note.content}
            category={note.category}
            onArchive={() => handleArchive(note.id)}
            onDelete={() => handleDelete(note.id)}
            onEdit={() => onEdit(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArchivedNotesSection;
