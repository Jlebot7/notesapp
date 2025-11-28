import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "./users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { Public } from "src/auth/public.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @UseGuards(LocalAuthGuard)
  async findById(@Param("id") id: number) {
    return this.usersService.findById(id);
  }

  @Public()
  @Post("signup")
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @Put(":id")
  @UseGuards(LocalAuthGuard)
  async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
