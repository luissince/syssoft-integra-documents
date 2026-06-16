// src/main.worker.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { CATALOG_PDF_GENERATED_QUEUE } from './constants/queues';

function configureRabbitMq() {
    // Configurar RabbitMQ
    return {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_HOSTS],
            queue: CATALOG_PDF_GENERATED_QUEUE,
            queueOptions: {
                durable: true,
            },
        },
    };
}

async function bootstrap() {
    // Crear la aplicación NestJS
    const app =
        await NestFactory.createMicroservice(
            AppModule,
            configureRabbitMq(),
        );

    // Iniciar el microservicio
    await app.listen();
}

bootstrap();