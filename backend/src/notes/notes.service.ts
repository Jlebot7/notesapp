import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "../entities/note.entity";
import { Category } from "../entities/category.entity";
import { CreateNoteDto } from "../dto/create-note.dto";
import { UpdateNoteDto } from "../dto/update-note.dto";
import { AddCategoryDto } from "../dto/add-category.dto";
import { ResponseNoteDto } from "../dto/response-note.dto";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>
  ) {}

  async findAll(): Promise<ResponseNoteDto[]> {
    const notes = await this.noteRepository.find({ relations: ["category"] });
    return notes.map((note) => new ResponseNoteDto(note));
  }

  async findById(id: number): Promise<ResponseNoteDto> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return new ResponseNoteDto(note);
  }

  async create(createNoteDto: CreateNoteDto): Promise<ResponseNoteDto> {
    const note = this.noteRepository.create({
      ...createNoteDto,
      category: createNoteDto.category
        ? { id: createNoteDto.category.id }
        : null,
    });
    const savedNote = await this.noteRepository.save(note);
    return new ResponseNoteDto(savedNote);
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto
  ): Promise<ResponseNoteDto> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    if (Object.keys(updateNoteDto).length === 0) {
      return new ResponseNoteDto(note);
    }

    const { category, ...updateData } = updateNoteDto;
    Object.assign(note, updateData);

    if (category !== undefined) {
      note.category = category ? { id: category.id } : null;
    }

    const updatedNote = await this.noteRepository.save(note);
    return new ResponseNoteDto(updatedNote);
  }

  async delete(id: number): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }

  async findByUserId(userId: number): Promise<ResponseNoteDto[]> {
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
      relations: ["category"],
    });
    return notes.map((note) => new ResponseNoteDto(note));
  }

  async findByCategory(categoryId: number): Promise<ResponseNoteDto[]> {
    const notes = await this.noteRepository.find({
      where: { category: { id: categoryId } },
      relations: ["category"],
    });
    return notes.map((note) => new ResponseNoteDto(note));
  }

  async addCategory(
    noteId: number,
    addCategoryDto: AddCategoryDto
  ): Promise<ResponseNoteDto> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ["category"],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    const category = { id: addCategoryDto.categoryId } as Category;
    note.category = category;

    const updatedNote = await this.noteRepository.save(note);
    return new ResponseNoteDto(updatedNote);
  }

  async updateArchive(
    noteId: number,
    updateArchiveDto: { isArchived: boolean }
  ): Promise<ResponseNoteDto> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ["category"],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    note.isArchived = updateArchiveDto.isArchived;

    const updatedNote = await this.noteRepository.save(note);
    return new ResponseNoteDto(updatedNote);
  }
}
