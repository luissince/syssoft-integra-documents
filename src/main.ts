import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar CORS basado en variables de entorno
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Usa el valor de CORS_ORIGIN o permite todos en caso de no estar definido
  };
  app.enableCors(corsOptions);

  // Configurar assets estáticos y motor de vistas
  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/public',
  });
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // Configurar Swagger solo si no estamos en producción
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Microservicio de reportes')
      .setDescription(
        'El microservicio de reportes que se encarga de generar reportes en formato PDF y Excel a partir de datos obtenidos por un API REST.',
      )
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  // Iniciar la aplicación
  await app.listen(process.env.PORT);
}

bootstrap();
