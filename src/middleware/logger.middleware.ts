import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== 'production') {
      const { method, url, headers, body } = req;

      console.log('Método:', method);
      console.log('URL:', url);
      console.log('Encabezados:', headers);
      console.log('Cuerpo de la solicitud:');
      console.dir(body, { depth: null });
      console.log('');
    }

    next();
  }
}
