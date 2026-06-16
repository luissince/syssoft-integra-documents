import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CreatePdfWorkerDto } from './dto/create-pdf-worker.dto';
import { SizePrint } from 'src/common/enums/size.enum';
import { currentDate, currentTime, formatDecimal } from 'src/helper/utils.helper';
import { generatePDF, generatePDFFromHTML } from 'src/helper/pdf.helper';
import { uploadPdfToS3 } from 'src/helper/s3.helper';
import { getIcon, getStyle } from 'src/config/assets.config';
import axios from 'axios';
import { CATALOG_NAME_QUEUE, CATALOG_PDF_COMPLETED_PATTERN } from 'src/constants/queues';
import PdfOptions from 'src/common/dto/pdf-options.dto';

@Injectable()
export class PdfWorkerService {

  private readonly logger = new Logger(PdfWorkerService.name);

  constructor(
    @Inject(CATALOG_NAME_QUEUE) private readonly rabbitClient: ClientProxy,
  ) { }

  async create(pdfOptions: PdfOptions) {
    this.logger.log('Iniciando generación PDF');

    try {
      this.logger.log('Generando PDF');

      const buffer: Buffer = await generatePDFFromHTML(pdfOptions);

      const fileKey = `catalogs/${pdfOptions.data.documento}_catalog_${Date.now()}.pdf`;
      const key = await uploadPdfToS3(buffer, fileKey);

      this.rabbitClient.emit(CATALOG_PDF_COMPLETED_PATTERN, {
        idCatalogo: pdfOptions.data.idCatalogo,
        status: 'LISTO',
        key
      });

      this.logger.log(
        `PDF generado y subido a S3 con key: ${key}`,
      );

      return { success: true };
    } catch (error) {
      this.logger.error(
        'Error generando PDF',
        error,
      );

      throw error;
    }
  }

}
