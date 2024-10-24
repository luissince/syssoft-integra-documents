import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';

@Injectable()
export class PersonService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'PERSONA',
    };
  }

  pdfCustomerReport() {
    return {
      ...this.data,
      title: 'REPORTE DE CLIENTES',
    };
  }

  pdfSupplierReport() {
    return {
      ...this.data,
      title: 'REPORTE DE PROVEEDORES',
    };
  }

  excel() {
    return this.data;
  }
}
