import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import PdfDto from './common/class/dto/pdf.class.dto';
import { sendPdfResponse } from './handlers/pdf-response.handler';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  main(): string {
    return this.appService.getDescription();
  }

  @Post('/html-to-pdf')
  async htmlToPdf(@Res() res: Response, @Body() body: PdfDto) {
    try {
      const buffer: Buffer = await this.appService.htmlToPdf(body);
      return sendPdfResponse(res, buffer, body.title);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

}
