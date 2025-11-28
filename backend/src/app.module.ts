import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotesModule } from "./notes/notes.module";
import { CategoriesModule } from "./categories/categories.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { Note } from "./entities/note.entity";
import { Category } from "./entities/category.entity";
import { User } from "./entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_DATABASE || "notests",
      entities: [Note, Category, User],
      synchronize: true,
    }),
    NotesModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
