import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { generateQr } from 'src/helper/qr.helper';
import { InvoicesSaleDto } from './dto/invoices-sale.dto';
import {
  calculateTax,
  calculateTaxBruto,
  formatNumberWithZeros,
  formatTime,
  rounded,
} from 'src/helper/utils.helper';
import NumberToCurrencyWords from 'src/helper/number-to-words.helper';

@Injectable()
export class SaleService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'VENTA',
    };
  }

  async pdfInvoice(body: InvoicesSaleDto) {
    const buffer = await generateQr('https://www.syssoftintegra.com/');
    const base64QR = buffer.toString('base64');

    const subTotal = body.sale.ventaDetalles.reduce((accumulator, item) => {
      const total = item.precio * item.cantidad;
      return accumulator + calculateTaxBruto(item.impuesto.porcentaje, total);
    }, 0);

    const impuestos = body.sale.ventaDetalles.reduce(
      (
        accumulator: {
          idImpuesto: string;
          nombre: string;
          monto: number;
        }[],
        item,
      ) => {
        const total = item.cantidad * item.precio;
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

    const total = body.sale.ventaDetalles.reduce(
      (accumulator, item) => accumulator + item.precio * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(body.sale.comprobante.numeracion);

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      sale: {
        ...body.sale,
        hora: formatTime(body.sale.hora),
        comprobante: {
          ...body.sale.comprobante,
          numeracion: numeracion,
        },
      },
      subTotal,
      impuestos,
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.sale.moneda.nombre,
      ),
      base64QR,
      banks: body.banks,
      title: `VENTA ${body.sale.comprobante.serie}-${numeracion}`,
    };
  }

  pdfAccountReceivable() {
    return {
      ...this.data,
      title: 'CUENTAS POR COBRAR',
    };
  }

  pdfReport() {
    return {
      ...this.data,
      title: 'RESPORTE DE VENTAS',
    };
  }

  excel() {
    return this.data;
  }
}
