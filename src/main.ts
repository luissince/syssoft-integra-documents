import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configureCors from './config/cors.config';
import staticConfig from './config/static.config';
import swaggerConfig from './config/swagger.config';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
import { CATALOG_PDF_GENERATED_QUEUE } from './constants/queues';

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

async function configureRabbitMq(
  app: NestExpressApplication,
): Promise<void> {
  // Configurar RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_HOSTS],
      queue: CATALOG_PDF_GENERATED_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  // Iniciar los microservicios
  await app.startAllMicroservices();
}

async function bootstrap() {
  // Crear la aplicación NestJS
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  // Configurar el servidor HTTP
  await configureHttpServer(app);

  // Configurar RabbitMQ
  await configureRabbitMq(app);

  // Iniciar el servidor HTTP
  await app.listen(process.env.PORT);
}

bootstrap();