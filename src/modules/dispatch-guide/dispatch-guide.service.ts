import { Injectable } from '@nestjs/common';
import { getStyle, getIcon } from 'src/config/assets.config';
import { InvoicesDispatchGuideDto } from './dto/invoices-dispatch-guide.dto';
import { formatNumberWithZeros, formatTime } from 'src/helper/utils.helper';
import { generateQr } from 'src/helper/qr.helper';

@Injectable()
export class DispatchGuideService {
  private data: any;

  constructor() {
    this.data = {
      style: getStyle(),
      icon: getIcon(),
      title: 'GUIA DE REMISION',
    };
  }

  async pdfInvoice(body: InvoicesDispatchGuideDto) {
    const buffer = await generateQr(
      body.dispatchGuide.codigoHash ?? 'https://www.syssoftintegra.com/',
    );
    const base64QR = buffer.toString('base64');

    const numeracion = formatNumberWithZeros(
      body.dispatchGuide.comprobante.numeracion,
    );

    return {
      ...this.data,
      company: body.company,
      branch: body.branch,
      dispatchGuide: {
        ...body.dispatchGuide,
        hora: formatTime(body.dispatchGuide.hora),
        comprobante: {
          ...body.dispatchGuide.comprobante,
          numeracion: numeracion,
        },
        venta: {
          ...body.dispatchGuide.venta,
          comprobante: {
            ...body.dispatchGuide.venta.comprobante,
            numeracion: formatNumberWithZeros(
              body.dispatchGuide.venta.comprobante.numeracion,
            ),
          },
        },
      },
      base64QR,
      title: `GUIA DE REMISION ${body.dispatchGuide.comprobante.serie}-${numeracion} - ${body.dispatchGuide.venta.cliente.informacion}`,
    };
  }

  pdfReport() {
    return this.data;
  }

  excel() {
    return this.data;
  }
}
