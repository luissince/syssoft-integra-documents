import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';
import { Workbook } from 'exceljs';
import { ProductDto } from './dto/product.dto';
import { formatDecimal } from 'src/helper/utils.helper';
import { CodBarDto } from './dto/codbar.dto';
import { SizePrint } from 'src/common/enums/size.enum';
import {
  sendExcelResponse,
  sendPdfResponse,
} from 'src/handlers/pdf-response.handler';
import * as path from 'path';
import { runWorker } from 'src/helper/worker.helper';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('pdf/reports')
  async pdfReport(@Req() req: Request, @Res() res: Response) {
    try {
      const width = SizePrint.A4;

      const data = this.productService.pdfReport();

      const buffer: Buffer = await generatePDF(
        'product/reports/a4.ejs',
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
      const fileName = 'PRODUCTO';

      // Crear un nuevo libro de trabajo
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Mi Hoja');

      // Añadir encabezados
      worksheet.columns = [
        { header: 'Nombre', key: 'name', width: 30 },
        { header: 'Edad', key: 'age', width: 10 },
        { header: 'Email', key: 'email', width: 50 },
      ];

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

  @Post('pdf/catalog')
  async pdfCatalog(@Res() res: Response, @Body() body: ProductDto) {
    try {
      const width = SizePrint.A4;
      const template = 'product/catalog/a4.ejs';

      const data = this.productService.pdfCatalog(body);

      const workerPath = path.join(__dirname, '..', '..', 'workers', 'pdf.worker.js');

      const buffer: Buffer = await runWorker<Buffer>(workerPath, {
      template,
      width,
      data,
      isFooter: false,
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

  @Post('pdf/codbar')
  async pdf(@Res() res: Response, @Body() body: CodBarDto) {
    try {
      const width = SizePrint.A4;
      const template = 'product/codbar/a4.ejs';

      const data = await this.productService.pdfCodBar(body);

      const buffer: Buffer = await generatePDF(
        template,
        width,
        {
          ...data,
          formatDecimal,
        },
        false,
      );

      sendPdfResponse(res, buffer, data.title);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
