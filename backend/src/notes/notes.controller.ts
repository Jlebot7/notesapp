import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "../dto/create-note.dto";
import { UpdateNoteDto } from "../dto/update-note.dto";
import { AddCategoryDto } from "../dto/add-category.dto";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll() {
    return this.notesService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: number) {
    return this.notesService.findById(id);
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.notesService.delete(id);
  }

  @Put(":id/category")
  async addCategory(
    @Param("id") id: number,
    @Body() addCategoryDto: AddCategoryDto
  ) {
    return this.notesService.addCategory(id, addCategoryDto);
  }

  @Put(":id/archive")
  async updateArchive(
    @Param("id") id: number,
    @Body() updateArchiveDto: { isArchived: boolean }
  ) {
    return this.notesService.updateArchive(id, updateArchiveDto);
  }

  @Get("category/:categoryId")
  async fetchNotesByCategory(@Param("categoryId") categoryId: number) {
    return this.notesService.findByCategory(categoryId);
  }
}
