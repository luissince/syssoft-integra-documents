import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default (app: NestExpressApplication) => {
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
};
