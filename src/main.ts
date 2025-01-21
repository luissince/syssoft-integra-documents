import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import configureCors from './config/cors.config';
import staticConfig from './config/static.config';
import swaggerConfig from './config/swagger.config';
import * as bodyParser from 'body-parser';

/**
 * Función principal de la aplicación
 */
async function bootstrap() {
  // Crear la aplicación
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Llamar a la función para configurar CORS
  configureCors(app);

  // Llamar a la función para configurar assets estáticos
  staticConfig(app);

  // Llamar a la función para configurar Swagger
  swaggerConfig(app);

  // Iniciar la aplicación
  await app.listen(process.env.PORT);
}

// Llamar a la función principal de la aplicación
bootstrap();
