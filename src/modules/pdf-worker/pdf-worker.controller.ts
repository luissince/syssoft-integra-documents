import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PdfWorkerService } from './pdf-worker.service';
import { CATALOG_PDF_GENERATED_PATTERN } from 'src/constants/queues';
import PdfOptions from 'src/common/dto/pdf-options.dto';
import { PdfOptionsInterceptor } from 'src/handlers/pdf-options.interceptor';

@UseInterceptors(PdfOptionsInterceptor)
@Controller()
export class PdfWorkerController {
  constructor(private readonly pdfWorkerService: PdfWorkerService) {}

  @MessagePattern(CATALOG_PDF_GENERATED_PATTERN)
  async create(@Payload() pdfOptions: PdfOptions) {
    return await this.pdfWorkerService.create(pdfOptions);
  }

}
