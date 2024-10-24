import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';

@Injectable()
export class TransactionService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'TRANSACCION',
    };
  }

  pdfInvoices() {
    return this.data;
  }

  pdfReport() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
