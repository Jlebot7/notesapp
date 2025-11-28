import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import * as dotenv from "dotenv";

dotenv.config();

let app: any;

async function bootstrap() {
  app = await NestFactory.create(AppModule);
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

  await app.init();

  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  if (!app) {
    const expressApp = await bootstrap();
    app = expressApp;
  }
  app(req, res);
}
