import { Note } from "../entities/note.entity";

export class ResponseNoteDto {
  id: number;
  title: string;
  content: string;
  category: { id: number; name?: string } | null;
  isArchived: boolean;

  constructor(note: Note) {
    this.id = note.id;
    this.title = note.title;
    this.content = note.content;
    this.category = note.category
      ? {
          id: note.category.id,
          name: note.category.name,
        }
      : null;
    this.isArchived = note.isArchived;
  }
}
