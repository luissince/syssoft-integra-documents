import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import configureCors from './config/cors.config';
import staticConfig from './config/static.config';
import swaggerConfig from './config/swagger.config';

/**
 * Función principal de la aplicación
 */
async function bootstrap() {
  // Crear la aplicación
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
