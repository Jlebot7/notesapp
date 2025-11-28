import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { ResponseCategoryDto } from "../dto/response-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async findAll(): Promise<ResponseCategoryDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map((category) => new ResponseCategoryDto(category));
  }

  async findById(id: number): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return new ResponseCategoryDto(category);
  }

  async findByName(name: string): Promise<ResponseCategoryDto> {
    const category = await this.categoryRepository.findOne({ where: { name } });
    if (!category) {
      throw new NotFoundException(`Category with name ${name} not found`);
    }
    return new ResponseCategoryDto(category);
  }

  async create(
    createCategoryDto: CreateCategoryDto
  ): Promise<ResponseCategoryDto> {
    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    return new ResponseCategoryDto(savedCategory);
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
