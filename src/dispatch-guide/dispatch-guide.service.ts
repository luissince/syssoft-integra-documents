import { Injectable } from '@nestjs/common';

@Injectable()
export class DispatchGuideService {
  private data: any;

  constructor() {
    this.data = {
      style: `${process.env.APP_URL}/public/css/style.css`,
      icon: `${process.env.APP_URL}/public/images/icon.png`,
      ruc: '12345678901',
      title: 'COMPRA',
      empresa: 'Documento de Remisión',
      name: 'Juan',
      tasks: [
        { name: 'Tarea 1', completed: true },
        { name: 'Tarea 2', completed: false },
        { name: 'Tarea 3', completed: true },
      ],
    };
  }

  web() {
    return this.data;
  }

  pdf() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
