import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { ReportsTransactionDto } from './dto/reports-transaction.dto';

@Injectable()
export class TransactionService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'FINANZAS',
    };
  }

  pdfInvoices() {
    return this.data;
  }

  pdfReport(body: ReportsTransactionDto) {
    return {
      title: 'Reporte de Financiero',
      ...this.data,
      ...body,
    };
  }

  excel() {
    return this.data;
  }
}
