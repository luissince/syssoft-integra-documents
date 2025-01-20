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
import {
  generatePDF,
  sendExcelResponse,
  sendPdfResponse,
} from 'src/helper/pdf.helper';
import { Request, Response } from 'express';
import { Workbook } from 'exceljs';
import { ProductDto } from './dto/product.dto';
import { formatDecimal } from 'src/helper/utils.helper';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('pdf/reports')
  async pdfReport(@Req() req: Request, @Res() res: Response) {
    try {
      const width = 'A4';
      const fileName = 'PRODUCTO';

      const buffer: Uint8Array = await generatePDF(
        'product/reports/a4.ejs',
        width,
        this.productService.pdfReport(),
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
      const width = 'A4';
      const fileName = 'CATALOGO PRODUCTOS';
      const template = 'product/catalog/a4.ejs';

      const data = this.productService.pdfCatalog(body);

      const buffer: Uint8Array = await generatePDF(
        template,
        width,
        {
          ...data,
          formatDecimal,
        },
        false,
      );

      sendPdfResponse(res, buffer, fileName);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
