import { IsNumber, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

export class ResponseCategoryDto {
  @IsNumber()
  readonly id: number;
  @IsString()
  readonly name?: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
