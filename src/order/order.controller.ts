import {
  Controller,
  Get,
  Render,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF, sendPdfResponse } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('web')
  @Render('sale/template.ejs')
  web() {
    return this.orderService.web();
  }

  @Get('pdf/:size')
  async pdf(@Req() req: Request, @Res() res: Response) {
    try {
      const width = req.params.size || 'A4';
      const fileName = 'PEDIDO';

      const buffer: Uint8Array = await generatePDF(
        'sale/template.ejs',
        width,
        this.orderService.pdf(),
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
    return this.orderService.excel();
  }
}
