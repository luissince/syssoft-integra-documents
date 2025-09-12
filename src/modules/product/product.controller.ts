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
import { formatDecimal } from 'src/helper/utils.helper';
import { CodBarDto } from './dto/codbar.dto';
import { SizePrint } from 'src/common/enums/size.enum';
import {
  sendExcelResponse,
  sendPdfResponse,
} from 'src/handlers/pdf-response.handler';
import { getSignedUrlFromS3 } from 'src/helper/s3.helper';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('pdf/reports')
  async pdfReport(@Req() req: Request, @Res() res: Response) {
    console.time('[PDF Report] Total execution');
    try {
      const width = SizePrint.A4;

      console.time('[PDF Report] Fetch data');
      const data = this.productService.pdfReport();
      console.timeEnd('[PDF Report] Fetch data');

      console.time('[PDF Report] Generate PDF');
      const buffer: Buffer = await generatePDF(
        'product/reports/a4.ejs',
        width,
        data,
      );
      console.timeEnd('[PDF Report] Generate PDF');

      console.time('[PDF Report] Send response');
      sendPdfResponse(res, buffer, data.title);
      console.timeEnd('[PDF Report] Send response');

    } catch (error) {
      console.error('[PDF Report] Error:', error);
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      console.timeEnd('[PDF Report] Total execution');
    }
  }

  @Post('excel')
  async excel(@Res() res: Response) {
    console.time('[Excel] Total execution');
    try {
      const fileName = 'PRODUCTO';

      console.time('[Excel] Create workbook');
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Mi Hoja');

      worksheet.columns = [
        { header: 'Nombre', key: 'name', width: 30 },
        { header: 'Edad', key: 'age', width: 10 },
        { header: 'Email', key: 'email', width: 50 },
      ];

      for (let i = 0; i < 1000; i++) {
        worksheet.addRow({ name: 'Juan Pérez', age: 30, email: 'juan@example.com' });
        worksheet.addRow({ name: 'María López', age: 25, email: 'maria@example.com' });
      }
      console.timeEnd('[Excel] Create workbook');

      console.time('[Excel] Write buffer');
      const buffer: ArrayBuffer = await workbook.xlsx.writeBuffer();
      console.timeEnd('[Excel] Write buffer');

      console.time('[Excel] Send response');
      sendExcelResponse(res, buffer, fileName);
      console.timeEnd('[Excel] Send response');

    } catch (error) {
      console.error('[Excel] Error:', error);
      throw new HttpException(
        error.message || 'Error al generar el Excel',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      console.timeEnd('[Excel] Total execution');
    }
  }

  @Post('pdf/catalog/get')
  async pdfGetCatalog(@Res() res: Response, @Body() body: { key: string }) {
    console.time('[PDF Catalog Get] Total execution');
    try {
      console.time('[PDF Catalog Get] Get signed URL');
      const url: string = await getSignedUrlFromS3(body.key);
      console.timeEnd('[PDF Catalog Get] Get signed URL');

      console.time('[PDF Catalog Get] Send response');
      res.json({ url });
      console.timeEnd('[PDF Catalog Get] Send response');
    } catch (error) {
      console.error('[PDF Catalog Get] Error:', error);
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      console.timeEnd('[PDF Catalog Get] Total execution');
    }
  }

  @Post('pdf/codbar')
  async pdf(@Res() res: Response, @Body() body: CodBarDto) {
    console.time('[PDF CodBar] Total execution');
    try {
      const width = SizePrint.A4;
      const template = 'product/codbar/a4.ejs';

      console.time('[PDF CodBar] Fetch data');
      const data = await this.productService.pdfCodBar(body);
      console.timeEnd('[PDF CodBar] Fetch data');

      console.time('[PDF CodBar] Generate PDF');
      const buffer: Buffer = await generatePDF(
        template,
        width,
        { ...data, formatDecimal },
        false,
      );
      console.timeEnd('[PDF CodBar] Generate PDF');

      console.time('[PDF CodBar] Send response');
      sendPdfResponse(res, buffer, data.title);
      console.timeEnd('[PDF CodBar] Send response');

    } catch (error) {
      console.error('[PDF CodBar] Error:', error);
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      console.timeEnd('[PDF CodBar] Total execution');
    }
  }
}
