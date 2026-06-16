import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PdfOptionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const data = context.switchToRpc().getData();

    if (!data) {
      return next.handle();
    }

    // solo aplicar defaults al payload PDF
    if (data.margin === undefined) {
      data.margin = { top: 0, bottom: 0, left: 0, right: 0 };
    }

    if (data.timeout === undefined) {
      data.timeout = 60000;
    }

    if (data.outputType === undefined) {
      data.outputType = 'pdf';
    }

    return next.handle();
  }
}