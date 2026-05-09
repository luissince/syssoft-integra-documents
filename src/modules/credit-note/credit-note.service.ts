import { Injectable } from '@nestjs/common';
import { getIcon, getStyle } from 'src/config/assets.config';
import { CreateCreditNoteDto } from './dto/create-credit-note.dto';
import { generateQr } from 'src/helper/qr.helper';
import { calculateTax, calculateTaxBruto, formatNumberWithZeros, rounded } from 'src/helper/utils.helper';
import NumberToCurrencyWords from 'src/helper/number-to-words.helper';

@Injectable()
export class CreditNoteService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'NOTA DE CREDITO',
    };
  }


  async pdfInvoice(body: CreateCreditNoteDto) {
    const buffer = await generateQr('https://www.syssoftintegra.com/');
    const base64QR = buffer.toString('base64');

    const subTotal = body.creditNote.notaCreditoDetalles.reduce((accumulator, item) => {
      const total = item.precio * item.cantidad;
      return accumulator + calculateTaxBruto(item.impuesto.porcentaje, total);
    }, 0);

    const impuestos = body.creditNote.notaCreditoDetalles.reduce(
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

    const total = body.creditNote.notaCreditoDetalles.reduce(
      (accumulator, item) => accumulator + item.precio * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(body.creditNote.comprobante.numeracion);

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      creditNote: body.creditNote,
      subTotal,
      impuestos,
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.creditNote.moneda.nombre,
      ),
      base64QR,
      title: `NOTA DE CREDITO ${body.creditNote.comprobante.serie}-${numeracion} - ${body.creditNote.cliente.informacion}`,
    };
  }

}
