import React, { useState, useEffect } from "react";
import { fetchNotesByCategory } from "../services/noteService";
import NoteCard from "../components/Notecard";
import moment from "moment";
import { Note } from "../types/Note";

interface NotesByCategoryProps {
  categoryId: string;
}

const NotesByCategory: React.FC<NotesByCategoryProps> = ({ categoryId }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const retrieveNotesByCategory = async () => {
      const res = await fetchNotesByCategory(Number(categoryId));
      setNotes(res);
    };
    retrieveNotesByCategory();
  }, [categoryId]);

  return (
    <div className="grid grid-cols-3 gap-3 mt-5">
      {notes
        .filter(
          (note) => note.category && note.category.id === Number(categoryId)
        )
        .map((note) => (
          <NoteCard
            key={note.id.toString()}
            title={note.title}
            date={moment(note.createdAt).format("Do MMM YYYY")}
            content={note.content}
            category={note.category}
            onEdit={() => {}}
            onDelete={() => {}}
            onArchive={() => {}}
          />
        ))}
    </div>
  );
};

export default NotesByCategory;
