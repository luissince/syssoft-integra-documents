import {
  Controller,
  Get,
  Render,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF, sendPdfResponse } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';

@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get('web')
  @Render('sale/template.ejs')
  web() {
    return this.supplierService.web();
  }

  @Get('pdf/:size')
  async pdf(@Req() req: Request, @Res() res: Response) {
    try {
      const width = req.params.size || 'A4';
      const fileName = 'PROVEEDOR';

      const buffer: Uint8Array = await generatePDF(
        'sale/template.ejs',
        width,
        this.supplierService.pdf(),
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
    return this.supplierService.excel();
  }
}
