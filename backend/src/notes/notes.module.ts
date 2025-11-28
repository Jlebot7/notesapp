import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { Note } from "../entities/note.entity";
import { AuthGuard } from "../auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [
    NotesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [NotesService],
})
export class NotesModule {}
