import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { ProductDto } from './dto/product.dto';
import { currentDate } from 'src/helper/utils.helper';
import { CodBarDto } from './dto/codbar.dto';
import { generateCodeBar } from 'src/helper/code-bar.helper';

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

  async pdfCodBar(body: CodBarDto) {
    const buffer = await generateCodeBar({
      bcid: 'code128',
      text: '0123456789',
      scale: 3,
      height: 7,
      includetext: true,
    });

    const base64QR = buffer.toString('base64');

    return {
      ...this.data,
      ...body,
      base64QR,
      title: 'LISTA DE CÓDIGO DE BARRAS PRODUCTOS',
    };
  }
}
