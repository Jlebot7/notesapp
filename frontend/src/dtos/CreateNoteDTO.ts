import { Category } from "../types/Category";

export default class CreateNoteDTO {
  constructor(
    public title: string,
    public content: string,
    public isArchived?: boolean,
    public category?: Category | null
  ) {}
}
