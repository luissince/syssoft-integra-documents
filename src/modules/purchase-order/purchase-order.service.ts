import { Injectable } from '@nestjs/common';
import { InvoicesPurchaseOrderDto } from './dto/invoices-purchase-order.dto';
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
export class PurchaseOrderService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'ORDEN DE COMPRA',
    };
  }

  pdfInvoice(body: InvoicesPurchaseOrderDto) {
    const subTotal = body.purchaseOrder.ordenCompraDetalles.reduce(
      (accumulator, item) => {
        const total = item.costo * item.cantidad;
        return accumulator + calculateTaxBruto(item.impuesto.porcentaje, total);
      },
      0,
    );

    const impuestos = body.purchaseOrder.ordenCompraDetalles.reduce(
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

    const total = body.purchaseOrder.ordenCompraDetalles.reduce(
      (accumulator, item) => accumulator + item.costo * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(
      body.purchaseOrder.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      purchaseOrder: {
        ...body.purchaseOrder,
        hora: formatTime(body.purchaseOrder.hora),
        comprobante: {
          ...body.purchaseOrder.comprobante,
          numeracion: numeracion,
        },
      },
      subTotal,
      impuestos,
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.purchaseOrder.moneda.nombre,
      ),
      banks: body.banks,
      title: `ORDEN DE COMPRA ${body.purchaseOrder.comprobante.serie}-${numeracion} - ${body.purchaseOrder.proveedor.informacion}`,
    };
  }

  pdfList(body: InvoicesPurchaseOrderDto) {
    const numeracion = formatNumberWithZeros(
      body.purchaseOrder.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      purchaseOrder: {
        ...body.purchaseOrder,
        hora: formatTime(body.purchaseOrder.hora),
        comprobante: {
          ...body.purchaseOrder.comprobante,
          numeracion: numeracion,
        },
      },
      banks: body.banks,
      title: `ORDEN DE COMPRA ${body.purchaseOrder.comprobante.serie}-${numeracion}`,
    };
  }

  pdfReport() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
