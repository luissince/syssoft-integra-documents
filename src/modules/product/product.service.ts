import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { ProductDto } from './dto/product.dto';
import { currentDate } from 'src/helper/utils.helper';

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
    };
  }

  excel() {
    return this.data;
  }

  pdfCatalog(body: ProductDto) {
    return {
      ...this.data,
      year: currentDate().split('-')[0],
      ...body,
      title: 'CATALOGO PRODUCTOS',
    };
  }
}
