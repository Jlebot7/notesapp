import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get("id/:id")
  async findById(@Param("id") id: number) {
    return this.categoriesService.findById(id);
  }

  @Get("name/:name")
  async findByName(@Param("name") name: string) {
    return this.categoriesService.findByName(name);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.categoriesService.delete(id);
  }
}
