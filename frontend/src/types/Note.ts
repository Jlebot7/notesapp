import { Category } from "./Category";

export interface Note {
  id: number;
  title: string;
  content: string;
  category?: Category | null;
  isArchived?: boolean;
  createdAt: Date;
}
