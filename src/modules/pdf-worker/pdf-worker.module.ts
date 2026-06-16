import { Module } from '@nestjs/common';
import { PdfWorkerService } from './pdf-worker.service';
import { PdfWorkerController } from './pdf-worker.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATALOG_NAME_QUEUE, CATALOG_PDF_COMPLETED_QUEUE } from 'src/constants/queues';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [PdfWorkerController],
  providers: [PdfWorkerService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: CATALOG_NAME_QUEUE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_HOSTS')],
            queue: CATALOG_PDF_COMPLETED_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ]
})
export class PdfWorkerModule { }
