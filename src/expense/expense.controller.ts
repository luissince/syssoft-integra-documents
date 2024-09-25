import {
  Controller,
  Get,
  Render,
  HttpException,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ApiTags } from '@nestjs/swagger';
import { generatePDF, sendPdfResponse } from 'src/helper/pdf.helper';
import { Request, Response } from 'express';

@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('web')
  @Render('sale/template.ejs')
  web() {
    return this.expenseService.web();
  }

  @Get('pdf/:size')
  async pdf(@Req() req: Request, @Res() res: Response) {
    try {
      const width = req.params.size || 'A4';
      const fileName = 'GASTO';

      const buffer: Uint8Array = await generatePDF(
        'sale/template.ejs',
        width,
        this.expenseService.pdf(),
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
    return this.expenseService.excel();
  }
}
