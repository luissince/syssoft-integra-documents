import {
  Controller,
  Get,
  Render,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { DispatchGuideService } from './dispatch-guide.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF, sendPdfResponse } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';

@ApiTags('DispatchGuide')
@Controller('dispatch-guide')
export class DispatchGuideController {
  constructor(private readonly dispatchGuideService: DispatchGuideService) {}

  @Get('web')
  @Render('sale/template.ejs')
  web() {
    return this.dispatchGuideService.web();
  }

  @Get('pdf/:size')
  async pdf(@Req() req: Request, @Res() res: Response) {
    try {
      const width = req.params.size || 'A4';
      const fileName = 'GUIA DE REMISIÓN';

      const buffer: Uint8Array = await generatePDF(
        'sale/template.ejs',
        width,
        this.dispatchGuideService.pdf(),
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
    return this.dispatchGuideService.excel();
  }
}
