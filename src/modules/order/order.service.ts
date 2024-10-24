import { Injectable } from '@nestjs/common';
import { InvoicesOrderDto } from './dto/invoices-order.dto';
import NumberToCurrencyWords from 'src/helper/number-to-words.helper';
import {
  formatNumberWithZeros,
  rounded,
  formatTime,
  calculateTaxBruto,
  calculateTax,
} from 'src/helper/utils.helper';
import { getStyle, getIcon } from 'src/config/assets.config';

@Injectable()
export class OrderService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'PEDIDO',
    };
  }

  pdfInvoice(body: InvoicesOrderDto) {
    const subTotal = body.order.pedidoDetalles.reduce((accumulator, item) => {
      const total = item.costo * item.cantidad;
      return accumulator + calculateTaxBruto(item.impuesto.porcentaje, total);
    }, 0);

    const impuestos = body.order.pedidoDetalles.reduce(
      (
        accumulator: {
          idImpuesto: string;
          nombre: string;
          monto: number;
        }[],
        item,
      ) => {
        const total = item.cantidad * item.costo;
        const subTotal = calculateTaxBruto(item.impuesto.porcentaje, total);
        const monto = calculateTax(item.impuesto.porcentaje, subTotal);

        const existingImpuesto = accumulator.find(
          (imp) => imp.idImpuesto === item.impuesto.idImpuesto,
        );

        if (existingImpuesto) {
          existingImpuesto.monto += monto;
        } else {
          const tax = {
            idImpuesto: item.impuesto.idImpuesto,
            nombre: item.impuesto.nombre,
            monto: monto,
          };
          accumulator.push(tax);
        }

        return accumulator;
      },
      [],
    );

    const total = body.order.pedidoDetalles.reduce(
      (accumulator, item) => accumulator + item.costo * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(body.order.comprobante.numeracion);

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      order: {
        ...body.order,
        hora: formatTime(body.order.hora),
        comprobante: {
          ...body.order.comprobante,
          numeracion: numeracion,
        },
      },
      subTotal,
      impuestos,
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.order.moneda.nombre,
      ),
      banks: body.banks,
      title: `PEDIDO ${body.order.comprobante.serie}-${numeracion}`,
    };
  }

  pdfList(body: InvoicesOrderDto) {
    const numeracion = formatNumberWithZeros(body.order.comprobante.numeracion);

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      order: {
        ...body.order,
        hora: formatTime(body.order.hora),
        comprobante: {
          ...body.order.comprobante,
          numeracion: numeracion,
        },
      },
      banks: body.banks,
      title: `PEDIDO ${body.order.comprobante.serie}-${numeracion}`,
    };
  }

  pdfReport() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
