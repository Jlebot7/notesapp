import { Category } from "../types/Category";

export default class EditNoteDTO {
  constructor(
    public title: string,
    public content: string,
    public category: Category | null
  ) {}
}
