import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "../entities/user.entity";
import { NotesModule } from "../notes/notes.module";
import { AuthGuard } from "../auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
