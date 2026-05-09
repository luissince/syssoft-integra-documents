
import {
  Controller,
  HttpException,
  HttpStatus,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { CreditNoteService } from './credit-note.service';
import { CreateCreditNoteDto } from './dto/create-credit-note.dto';
import { ApiTags } from '@nestjs/swagger';
import { SizePaper, SizePrint } from 'src/common/enums/size.enum';
import { generatePDF } from 'src/helper/pdf.helper';
import { Response } from 'express';
import { formatDecimal, formatNumberWithZeros, formatTime } from 'src/helper/utils.helper';
import { sendPdfResponse } from 'src/handlers/pdf-response.handler';

@ApiTags('CreditNote')
@Controller('credit-note')
export class CreditNoteController {
  constructor(private readonly creditNoteService: CreditNoteService) { }

  @Post('/')
  async pdfInvoices(@Res() res: Response, @Body() body: CreateCreditNoteDto) {
    try {
      let width: SizePaper | SizePrint = body.size || SizePaper.A4;

      let template = 'credit-note/invoices/a4.ejs';
      if (width === SizePaper.A4) {
        width = SizePrint.A4;
        template = 'credit-note/invoices/a4.ejs';
      } else if (width === SizePaper.mm80) {
        width = SizePrint.mm72;
        template = 'credit-note/invoices/ticket.ejs';
      } else if (width === SizePaper.mm58) {
        width = SizePrint.mm48;
        template = 'credit-note/invoices/ticket.ejs';
      }

      const data = await this.creditNoteService.pdfInvoice(body);

      const buffer: Buffer = await generatePDF(template, width, {
        data,
        formatDecimal,
        formatNumberWithZeros,
        formatTime,
      },
        false,
        body.outputType
      );

      sendPdfResponse(res, buffer, data.title, body.outputType);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al generar el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
