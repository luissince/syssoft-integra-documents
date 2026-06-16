// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configureCors from './config/cors.config';
import staticConfig from './config/static.config';
import swaggerConfig from './config/swagger.config';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function configureHttpServer(
  app: NestExpressApplication,
): Promise<void> {
  // Configurar el parser de body
  app.use(bodyParser.json({ limit: '10mb' }));

  // Configurar el parser de URL
  app.use(
    bodyParser.urlencoded({
      limit: '10mb',
      extended: true,
    }),
  );

  // Llamar a la función para configurar CORS
  configureCors(app);

  // Llamar a la función para configurar assets estáticos
  staticConfig(app);

  // Llamar a la función para configurar Swagger
  swaggerConfig(app);
}


async function bootstrap() {
  // Crear la aplicación NestJS
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  // Configurar el servidor HTTP
  await configureHttpServer(app);

  // Iniciar el servidor HTTP
  await app.listen(process.env.PORT);
}

bootstrap();