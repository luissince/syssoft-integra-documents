import {
  Controller,
  Get,
  Render,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF, sendPdfResponse } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';

@ApiTags('Quotation')
@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Get('web')
  @Render('sale/template.ejs')
  web() {
    return this.quotationService.web();
  }

  @Get('pdf/:size')
  async pdf(@Req() req: Request, @Res() res: Response) {
    try {
      const width = req.params.size || 'A4';
      const fileName = 'COTIZACIÓN';

      const buffer: Uint8Array = await generatePDF(
        'sale/template.ejs',
        width,
        this.quotationService.pdf(),
      );

      sendPdfResponse(res, buffer, fileName);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('excel')
  excel() {
    return this.quotationService.excel();
  }
}
