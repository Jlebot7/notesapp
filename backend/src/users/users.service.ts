import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { ResponseUserDto } from "../dto/response-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new ResponseUserDto(user));
  }

  async findById(id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ResponseUserDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return new ResponseUserDto(savedUser);
  }

  async getUser(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
      select: ["id", "username", "password"],
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<ResponseUserDto> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new ResponseUserDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
