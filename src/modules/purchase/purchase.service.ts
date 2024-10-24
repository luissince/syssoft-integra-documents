import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { InvoicesPurchaseDto } from './dto/invoices-purchase.dto';
import {
  calculateTax,
  calculateTaxBruto,
  formatNumberWithZeros,
  formatTime,
  rounded,
} from 'src/helper/utils.helper';
import NumberToCurrencyWords from 'src/helper/number-to-words.helper';

@Injectable()
export class PurchaseService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'COMPRA',
    };
  }

  pdfInvoice(body: InvoicesPurchaseDto) {
    const subTotal = body.purchase.compraDetalles.reduce(
      (accumulator, item) => {
        const total = item.costo * item.cantidad;
        return accumulator + calculateTaxBruto(item.impuesto.porcentaje, total);
      },
      0,
    );

    const impuestos = body.purchase.compraDetalles.reduce(
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

    const total = body.purchase.compraDetalles.reduce(
      (accumulator, item) => accumulator + item.costo * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(
      body.purchase.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      purchase: {
        ...body.purchase,
        hora: formatTime(body.purchase.hora),
        comprobante: {
          ...body.purchase.comprobante,
          numeracion: numeracion,
        },
      },
      subTotal,
      impuestos,
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.purchase.moneda.nombre,
      ),
      banks: body.banks,
      title: `COMPRA ${body.purchase.comprobante.serie}-${numeracion}`,
    };
  }

  pdfAccountPayable() {
    return {
      ...this.data,
      title: 'CUENTAS POR PAGAR',
    };
  }

  pdfReport() {
    return {
      ...this.data,
      title: 'RESPORTE DE COMPRAS',
    };
  }

  excel() {
    return this.data;
  }
}
