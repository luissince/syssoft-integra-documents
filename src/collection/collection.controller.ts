import {
  Controller,
  Get,
  Render,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF, sendPdfResponse } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';

@ApiTags('Collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('web')
  @Render('sale/template.ejs')
  web() {
    return this.collectionService.web();
  }

  @Get('pdf/:size')
  async pdf(@Req() req: Request, @Res() res: Response) {
    try {
      const width = req.params.size || 'A4';
      const fileName = 'COBRO';

      const buffer: Uint8Array = await generatePDF(
        'sale/template.ejs',
        width,
        this.collectionService.pdf(),
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
    return this.collectionService.excel();
  }
}
