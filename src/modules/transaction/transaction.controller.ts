import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import {
  generatePDF,
  sendExcelResponse,
  sendPdfResponse,
} from 'src/helper/pdf.helper';
import { Request, Response } from 'express';
import { Workbook } from 'exceljs';
import { InvoicesTransactionDto } from './dto/invoices-transaction.dto';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('pdf/invoices')
  async pdfInvoices(
    @Res() res: Response,
    @Body() body: InvoicesTransactionDto,
  ) {
    try {
      const width = body.size || 'A4';
      const fileName = 'TRANSACCION';

      let template = 'transaction/invoices/a4.ejs';
      if (width === 'A4') {
        template = 'transaction/invoices/a4.ejs';
      } else if (width === '80mm') {
        template = 'transaction/invoices/ticket.ejs';
      } else if (width === '58mm') {
        template = 'transaction/invoices/ticket.ejs';
      }

      const buffer: Uint8Array = await generatePDF(
        template,
        width,
        this.transactionService.pdfInvoices(),
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
      const fileName = 'COMPRA';

      const buffer: Uint8Array = await generatePDF(
        'transaction/reports/a4.ejs',
        width,
        this.transactionService.pdfReport(),
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
      const fileName = 'COMPRA';

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
