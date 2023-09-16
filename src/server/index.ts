import { NestFactory } from "@nestjs/core";
import express from "express";
import payload from "payload";
import { AppModule } from "./app.module";

require("dotenv").config();
const app = express();

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  const nest = await NestFactory.create(AppModule);
  await nest.init();
  app.use(nest.getHttpAdapter().getInstance());

  app.listen(3000);
};

start();
