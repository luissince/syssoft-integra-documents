import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { ApiTags } from '@nestjs/swagger';
import {
  generatePDF,
  sendExcelResponse,
  sendPdfResponse,
} from 'src/helper/pdf.helper';
import { Request, Response } from 'express';
import { Workbook } from 'exceljs';
import { InvoicesPurchaseOrderDto } from './dto/invoices-purchase-order.dto';
import { formatDecimal } from 'src/helper/utils.helper';

@ApiTags('PurchaseOrder')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post('pdf/invoices')
  async pdfInvoices(
    @Res() res: Response,
    @Body() body: InvoicesPurchaseOrderDto,
  ) {
    try {
      const width = body.size || 'A4';

      let template = 'purchase-order/invoices/a4.ejs';
      if (width === 'A4') {
        template = 'purchase-order/invoices/a4.ejs';
      } else if (width === '80mm') {
        template = 'purchase-order/invoices/ticket.ejs';
      } else if (width === '58mm') {
        template = 'purchase-order/invoices/ticket.ejs';
      }

      const data = this.purchaseOrderService.pdfInvoice(body);

      const fileName = data.tile;

      const buffer: Uint8Array = await generatePDF(template, width, {
        data,
        formatDecimal,
      });

      sendPdfResponse(res, buffer, fileName);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('pdf/lists')
  async pdfList(@Res() res: Response, @Body() body: InvoicesPurchaseOrderDto) {
    try {
      const width = 'A4';

      const template = 'purchase-order/list/a4.ejs';

      const data = this.purchaseOrderService.pdfList(body);

      const fileName = data.title;

      const buffer: Uint8Array = await generatePDF(template, width, {
        data,
        formatDecimal,
      });

      sendPdfResponse(res, buffer, fileName);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('pdf/reports')
  async pdfReport(@Req() req: Request, @Res() res: Response) {
    try {
      const width = 'A4';
      const fileName = 'ORDEN DE COMPRA';

      const buffer: Uint8Array = await generatePDF(
        'purchase-order/reports/a4.ejs',
        width,
        this.purchaseOrderService.pdfReport(),
      );

      sendPdfResponse(res, buffer, fileName);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('excel')
  async excel(@Res() res: Response) {
    try {
      const fileName = 'ORDEN DE COMPRA';

      // Crear un nuevo libro de trabajo
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Mi Hoja');

      // Añadir encabezados
      worksheet.columns = [
        { header: 'Nombre', key: 'name', width: 30 },
        { header: 'Edad', key: 'age', width: 10 },
        { header: 'Email', key: 'email', width: 50 },
      ];

      // Añadir datos
      worksheet.addRow({
        name: 'Juan Pérez',
        age: 30,
        email: 'juan@example.com',
      });
      worksheet.addRow({
        name: 'María López',
        age: 25,
        email: 'maria@example.com',
      });

      const buffer: ArrayBuffer = await workbook.xlsx.writeBuffer();

      // Enviar el archivo
      sendExcelResponse(res, buffer, fileName);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
