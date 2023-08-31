import { NestFactory } from '@nestjs/core';
import { PraanModule } from './praan.module';
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { urlencoded, json } from 'express';

async function bootstrap() {
  let logger = new Logger();
  const port:number = 8080;
  const app = await NestFactory.create(PraanModule, {
    cors: true,
    logger: ['log', 'debug', 'verbose', 'warn', 'error'],
  });
  logger.log(`Nest started on port ${port}`,'NestBootstrap');
  app.enableCors({
    credentials: true,
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
    preflightContinue: true,
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    optionsSuccessStatus: 204
  });
  app.use(json({limit: '50mb'}));
  app.use(urlencoded({extended: true, limit: '50mb'}));
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('Praan App')
  .setDescription('Praan API description')
  .setVersion('1.0')
  .addTag('praan')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  logger.log(`For swagger check http://localhost:${port}/swagger`,'NestSwagger');
  await app.listen(port);
}
bootstrap();