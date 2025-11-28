import { Category } from "../entities/category.entity";

export class UpdateNoteDto {
  title?: string;
  content?: string;
  category?: Category;
  isArchived?: boolean;
}
