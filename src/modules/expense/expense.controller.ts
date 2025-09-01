import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';
import { Workbook } from 'exceljs';
import { InvoicesExpenseDto } from './dto/invoices-expense.dto';
import { formatDecimal } from 'src/helper/utils.helper';
import { SizePaper, SizePrint } from 'src/common/enums/size.enum';
import {
  sendExcelResponse,
  sendPdfResponse,
} from 'src/handlers/pdf-response.handler';

@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('pdf/invoices')
  async pdfInvoices(@Res() res: Response, @Body() body: InvoicesExpenseDto) {
    try {
      let width: SizePaper | SizePrint = body.size || SizePaper.A4;

      let template = 'expense/invoices/a4.ejs';
      if (width === SizePaper.A4) {
        width = SizePrint.A4;
        template = 'expense/invoices/a4.ejs';
      } else if (width === SizePaper.mm80) {
        width = SizePrint.mm72;
        template = 'expense/invoices/ticket.ejs';
      } else if (width === SizePaper.mm58) {
        width = SizePrint.mm48;
        template = 'expense/invoices/ticket.ejs';
      }

      const data = this.expenseService.pdfInvoice(body);

      const buffer: Uint8Array = await generatePDF(template, width, {
        data,
        formatDecimal,
      });

      sendPdfResponse(res, buffer, data.title);
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
      const width = SizePrint.A4;

      const data = this.expenseService.pdfReport();

      const buffer: Uint8Array = await generatePDF(
        'expense/reports/a4.ejs',
        width,
        data,
      );

      sendPdfResponse(res, buffer, data.title);
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
      const fileName = 'GASTO';

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
