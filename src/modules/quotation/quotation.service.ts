import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { InvoicesQuotationDto } from './dto/invoices-quotation.dto';
import {
  calculateTax,
  calculateTaxBruto,
  formatNumberWithZeros,
  formatTime,
  rounded,
} from 'src/helper/utils.helper';
import NumberToCurrencyWords from 'src/helper/number-to-words.helper';

@Injectable()
export class QuotationService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'COTIZACION',
    };
  }

  pdfInvoice(body: InvoicesQuotationDto) {
    const subTotal = body.quotation.cotizacionDetalles.reduce(
      (accumulator, item) => {
        const total = item.precio * item.cantidad;
        return accumulator + calculateTaxBruto(item.impuesto.porcentaje, total);
      },
      0,
    );

    const impuestos = body.quotation.cotizacionDetalles.reduce(
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

    const total = body.quotation.cotizacionDetalles.reduce(
      (accumulator, item) => accumulator + item.precio * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(
      body.quotation.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      quotation: {
        ...body.quotation,
        hora: formatTime(body.quotation.hora),
        comprobante: {
          ...body.quotation.comprobante,
          numeracion: numeracion,
        },
      },
      subTotal,
      impuestos,
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.quotation.moneda.nombre,
      ),
      banks: body.banks,
      title: `COTIZACIÓN ${body.quotation.comprobante.serie}-${numeracion}`,
    };
  }

  pdfList(body: InvoicesQuotationDto) {
    const numeracion = formatNumberWithZeros(
      body.quotation.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      quotation: {
        ...body.quotation,
        hora: formatTime(body.quotation.hora),
        comprobante: {
          ...body.quotation.comprobante,
          numeracion: numeracion,
        },
      },
      banks: body.banks,
      title: `COTIZACIÓN ${body.quotation.comprobante.serie}-${numeracion} - ${body.quotation.cliente.informacion}`,
    };
  }

  pdfReport() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
