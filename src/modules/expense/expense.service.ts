import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { InvoicesExpenseDto } from './dto/invoices-expense.dto';
import {
  formatNumberWithZeros,
  formatTime,
  rounded,
} from 'src/helper/utils.helper';
import NumberToCurrencyWords from 'src/helper/number-to-words.helper';

@Injectable()
export class ExpenseService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'GASTO',
    };
  }

  pdfInvoice(body: InvoicesExpenseDto) {
    const total = body.expense.gastoDetalles.reduce(
      (accumulator, item) => accumulator + item.monto * item.cantidad,
      0,
    );

    const numeracion = formatNumberWithZeros(
      body.expense.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      expense: {
        ...body.expense,
        hora: formatTime(body.expense.hora),
        comprobante: {
          ...body.expense.comprobante,
          numeracion: numeracion,
        },
      },
      total,
      importLetras: NumberToCurrencyWords.convertir(
        String(rounded(total)),
        true,
        body.expense.moneda.nombre,
      ),
      title: `GASTO ${body.expense.comprobante.serie}-${numeracion} - ${body.expense.proveedor.informacion}`,
    };
  }

  pdfReport() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
