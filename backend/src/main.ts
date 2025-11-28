import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "default_session_secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
