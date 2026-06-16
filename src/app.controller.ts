import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { sendEscPosResponse, sendPdfResponse } from './handlers/pdf-response.handler';
import PdfOptions from './common/dto/pdf-options.dto';
import { QueryDto } from './common/dto/query.dto';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  main(): string {
    return this.appService.getDescription();
  }

  @Post('html-to-pdf')
  async htmlToPdf(@Res() res: Response, @Body() body: PdfOptions) {
    try {
      const buffer: Uint8Array = await this.appService.htmlToPdf(body);
      return sendPdfResponse({ res, buffer, fileName: body.title, download: body.download });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Post('html-to-esc-pos')
  async htmlToEscPos(@Res() res: Response, @Body() body: PdfOptions) {
    try {
      const buffer: Uint8Array = await this.appService.htmlToEscPos(body);
      return sendEscPosResponse({ res, buffer, fileName: body.title,});
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Get('pdf/test')
  async test(@Res() res: Response, @Query() query: QueryDto) {
    try {
      const buffer: Uint8Array = await this.appService.pdfTest();
      return sendPdfResponse({ res, buffer, fileName: query.title ?? 'Test PDF', download: query.download ?? false });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

}
