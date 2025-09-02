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
import { generatePDF } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';
import { Workbook } from 'exceljs';
import { InvoicesSaleDto } from './dto/invoices-sale.dto';
import { formatDecimal } from 'src/helper/utils.helper';
import { SizePaper, SizePrint } from 'src/common/enums/size.enum';
import {
  sendExcelResponse,
  sendPdfResponse,
} from 'src/handlers/pdf-response.handler';

@ApiTags('Sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('pdf/invoices')
  async pdfInvoices(@Res() res: Response, @Body() body: InvoicesSaleDto) {
    try {
      let width: SizePaper | SizePrint = body.size || SizePaper.A4;

      let template = 'sale/invoices/a4.ejs';
      if (width === SizePaper.A4) {
        width = SizePrint.A4;
        template = 'sale/invoices/a4.ejs';
      } else if (width === SizePaper.mm80) {
        width = SizePrint.mm72;
        template = 'sale/invoices/ticket.ejs';
      } else if (width === SizePaper.mm58) {
        width = SizePrint.mm48;
        template = 'sale/invoices/ticket.ejs';
      }

      const data = await this.saleService.pdfInvoice(body);

      const buffer: Buffer = await generatePDF(template, width, {
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

  @Post('pdf/account/receivable')
  async pdfAccountReceivable(
    @Res() res: Response,
    @Body() body: InvoicesSaleDto,
  ) {
    try {
      let width: SizePaper | SizePrint = body.size || SizePaper.A4;

      let template = 'sale/account-receivable/a4.ejs';
      if (width === SizePaper.A4) {
        width = SizePrint.A4;
        template = 'sale/account-receivable/a4.ejs';
      } else if (width === SizePaper.mm80) {
        width = SizePrint.mm72;
        template = 'sale/account-receivable/ticket.ejs';
      } else if (width === SizePaper.mm58) {
        width = SizePrint.mm48;
        template = 'sale/account-receivable/ticket.ejs';
      }

      const data = this.saleService.pdfAccountReceivable();

      const buffer: Buffer = await generatePDF(
        template,
        width,
        this.saleService.pdfAccountReceivable(),
      );

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

      const data = this.saleService.pdfReport();

      const buffer: Buffer = await generatePDF(
        'sale/reports/a4.ejs',
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
