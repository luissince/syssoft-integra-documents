import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

export default (app: NestExpressApplication) => {
  // Configurar assets estáticos y motor de vistas
  app.useStaticAssets(path.join(__dirname, '..', '..', 'public'), {
    prefix: '/public',
  });
  app.setBaseViewsDir(path.join(__dirname, '..', '..', 'views'));
  app.setViewEngine('ejs');
};
