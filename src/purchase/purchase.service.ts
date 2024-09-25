import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchaseService {
  private data: any;

  constructor() {
    this.data = {
      style: `${process.env.API_URL}/public/css/style.css`,
      icon: `${process.env.API_URL}/public/images/icon.png`,
      title: 'COMPRA',
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
