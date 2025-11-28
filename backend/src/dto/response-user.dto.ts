import { IsNumber, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class ResponseUserDto {
  @IsNumber()
  readonly id: number;
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
  }
}
