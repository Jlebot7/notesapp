import { Category } from '../entities/category.entity';

export class CreateNoteDto {
  title: string;
  content: string;
  category?: Category;
  isArchived?: boolean;
}
