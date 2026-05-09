import { Injectable } from '@nestjs/common';
import PdfDto from './common/class/dto/pdf.class.dto';
import { SizePaper, SizePrint } from './common/enums/size.enum';
import { generatePDFFromHTML } from './helper/pdf.helper';

@Injectable()
export class AppService {
  getDescription(): string {
    return 'API de generación de pdf o archivos excel';
  }

  async htmlToPdf(body: PdfDto) {
    const buffer: Buffer = await generatePDFFromHTML(body);
    return buffer;
  }
}
