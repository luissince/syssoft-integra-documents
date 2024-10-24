import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { ApiTags } from '@nestjs/swagger';
import {
  generatePDF,
  sendExcelResponse,
  sendPdfResponse,
} from 'src/helper/pdf.helper';
import { Request, Response } from 'express';
import { Workbook } from 'exceljs';
import { InvoicesSaleDto } from './dto/invoices-sale.dto';
import { formatDecimal } from 'src/helper/utils.helper';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('pdf/invoices')
  async pdfInvoices(@Res() res: Response, @Body() body: InvoicesSaleDto) {
    try {
      const width = body.size || 'A4';

      let template = 'sale/invoices/a4.ejs';
      if (width === 'A4') {
        template = 'sale/invoices/a4.ejs';
      } else if (width === '80mm') {
        template = 'sale/invoices/ticket.ejs';
      } else if (width === '58mm') {
        template = 'sale/invoices/ticket.ejs';
      }

      const data = await this.saleService.pdfInvoice(body);

      const fileName = data.title;

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

  @Post('pdf/account/receivable')
  async pdfAccountReceivable(
    @Res() res: Response,
    @Body() body: InvoicesSaleDto,
  ) {
    try {
      const width = body.size || 'A4';
      const fileName = 'CUENTAS POR COBRAR';

      let template = 'purchase/invoices/a4.ejs';
      if (width === 'A4') {
        template = 'purchase/invoices/a4.ejs';
      } else if (width === '80mm') {
        template = 'purchase/invoices/ticket.ejs';
      } else if (width === '58mm') {
        template = 'purchase/invoices/ticket.ejs';
      }

      const buffer: Uint8Array = await generatePDF(
        template,
        width,
        this.saleService.pdfAccountReceivable(),
      );

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
      const fileName = 'VENTA';

      const buffer: Uint8Array = await generatePDF(
        'sale/reports/a4.ejs',
        width,
        this.saleService.pdfReport(),
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
      const fileName = 'VENTAS';

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
      for (let i = 0; i < 1000; i++) {
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
      }

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
