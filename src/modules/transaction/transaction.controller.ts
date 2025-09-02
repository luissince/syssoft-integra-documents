import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF } from 'src/helper/pdf.helper';
import { Response } from 'express';
import { Workbook } from 'exceljs';
import { InvoicesTransactionDto } from './dto/invoices-transaction.dto';
import { SizePaper, SizePrint } from 'src/common/enums/size.enum';
import { ReportsTransactionDto } from './dto/reports-transaction.dto';
import { formatDate, formatDecimal } from 'src/helper/utils.helper';
import {
  sendExcelResponse,
  sendPdfResponse,
} from 'src/handlers/pdf-response.handler';

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
      let width: SizePaper | SizePrint = body.size || SizePaper.A4;

      let template = 'transaction/invoices/a4.ejs';
      if (width === SizePaper.A4) {
        width = SizePrint.A4;
        template = 'transaction/invoices/a4.ejs';
      } else if (width === SizePaper.mm80) {
        width = SizePrint.mm72;
        template = 'transaction/invoices/ticket.ejs';
      } else if (width === SizePaper.mm58) {
        width = SizePrint.mm48;
        template = 'transaction/invoices/ticket.ejs';
      }

      const data = this.transactionService.pdfInvoices();

      const buffer: Buffer = await generatePDF(template, width, data);

      sendPdfResponse(res, buffer, data.title);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('pdf/reports')
  async pdfReport(@Res() res: Response, @Body() body: ReportsTransactionDto) {
    try {
      let width: SizePaper | SizePrint = body.size || SizePaper.A4;

      let template = 'transaction/reports/a4.ejs';
      if (width === SizePaper.A4) {
        width = SizePrint.A4;
        template = 'transaction/reports/a4.ejs';
      } else if (width === SizePaper.mm80) {
        width = SizePrint.mm72;
        template = 'transaction/reports/ticket.ejs';
      } else if (width === SizePaper.mm58) {
        width = SizePrint.mm48;
        template = 'transaction/reports/ticket.ejs';
      }

      const data = this.transactionService.pdfReport(body);

      const buffer: Buffer = await generatePDF(template, width, {
        ...data,
        formatDate,
        formatDecimal,
      });

      sendPdfResponse(res, buffer, data.title);
    } catch (error) {
      console.log(error);
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
