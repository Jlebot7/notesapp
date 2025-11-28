import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import * as dotenv from "dotenv";
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

dotenv.config();

const server = express();

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

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

  return app.init();
}

export default async function handler(req: any, res: any) {
  await createNestServer(server);
  server(req, res);
}
