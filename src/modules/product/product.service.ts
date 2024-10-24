import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';

@Injectable()
export class ProductService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'PRODUCTOS',
    };
  }

  pdfReport() {
    return {
      ...this.data,
      title: 'RESPORTE DE PRODUCTOS',
    };
  }

  excel() {
    return this.data;
  }
}
