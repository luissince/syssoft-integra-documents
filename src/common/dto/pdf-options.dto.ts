// src/common/dto/pdf-options.dto.ts
import { Margin } from '../interfaces/margin.interface';
import { PdfPageFormat } from './paper.dto';

export default class PdfOptions {
  title?: string;
  url?: string;
  htmlContent: string;
  paper: PdfPageFormat;
  margin?: Margin = { top: 0, bottom: 0, left: 0, right: 0 };
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
  timeout?: number = 60000;
  outputType?: 'pdf' | 'jpeg' | 'png' = 'pdf';
  emulateMedia?: 'screen' | 'print';
  download?: boolean = false;
  data?: any;
}
