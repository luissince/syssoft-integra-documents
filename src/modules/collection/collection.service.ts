import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { InvoicesCollectionDto } from './dto/invoices-collection.dto';
import {
  formatNumberWithZeros,
  formatTime,
  rounded,
} from 'src/helper/utils.helper';
import NumberToCurrencyWords from 'src/helper/number-to-words.helper';

@Injectable()
export class CollectionService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'COBRO',
    };
  }

  pdfInvoice(body: InvoicesCollectionDto) {
    const total = body.collection.cobroDetalles.reduce(
      (accumulator, item) => accumulator + item.monto * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(
      body.collection.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      collection: {
        ...body.collection,
        hora: formatTime(body.collection.hora),
        comprobante: {
          ...body.collection.comprobante,
          numeracion: numeracion,
        },
      },
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.collection.moneda.nombre,
      ),
      title: `COBRO ${body.collection.comprobante.serie}-${numeracion}`,
    };
  }

  pdfReport() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
