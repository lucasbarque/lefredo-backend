import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createWebooks } from './webhooks';

async function bootstrap() {
  const whiteList = [''];

  const options = {
    origin: process.env.NODE_ENV == 'prod' ? whiteList : true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders:
      'Content-Type,Accept,Authorization,email,x-request-id,request-type,X-Service-Identifier',
    exposedHeaders: 'X-Service-Identifier',
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: options,
  });

  const expressApp = app.getHttpAdapter().getInstance();
  app.use(cookieParser());

  app.enableCors();

  createWebooks(expressApp);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Alimentados API')
    .setDescription('Confira todas as rotas disponíveis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs/json',
  });

  app.use('/files', express.static(join(__dirname, '..', 'files')));

  await app.listen(process.env.PORT!);
}
void bootstrap();
