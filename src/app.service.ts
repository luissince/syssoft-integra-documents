import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDescription(): string {
    return 'API de generación de pdf o archivos excel';
  }
}
