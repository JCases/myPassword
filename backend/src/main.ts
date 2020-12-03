import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';
import { db } from './db';
import { INestApplication } from '@nestjs/common';
import {
  ROUTE_PRIVKEY,
  ROUTE_CERT,
  MAX_SIZE_JSON,
  PORT,
  PROD,
} from './app.constants';

async function bootstrap() {
  try {
    // INIT THE DB BEFORE THE APP.
    await db.init();
  } catch (e) {
    console.error('NO SE HA PODIDO CONECTAR LA BASE DE DATOS');
    console.log(e);
  }

  let app: INestApplication;

  try {
    const keyFile = readFileSync(ROUTE_PRIVKEY);
    const certFile = readFileSync(ROUTE_CERT);
    app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      },
      logger: false,
    });
  } catch (e) {
    app = await NestFactory.create(AppModule);
  }

  app.use(bodyParser.json({ limit: MAX_SIZE_JSON }));
  app.use(bodyParser.urlencoded({ limit: MAX_SIZE_JSON, extended: true }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
