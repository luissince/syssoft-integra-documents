import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';
import * as path from 'path';
import * as ejs from 'ejs';
import { Response } from 'express';

const measureHeight = async (htmlContent: string, width: number) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: width, height: 10 });
  await page.setContent(htmlContent);
  const height = await page.evaluate(() => document.body.scrollHeight);
  await browser.close();
  return height;
};

const pixelsToMillimeters = (px: number) => {
  return px / 3.77952756;
};

const millimetersToPixels = (mm: number) => {
  return mm * (96 / 25.4);
};

export const generatePDF = async (
  template: string,
  width: string,
  data: any,
): Promise<Uint8Array> => {
  try {
    const templateContent = await readFile(
      path.join(__dirname, '..', '..', 'views', template),
      'utf8',
    );

    const htmlContent = ejs.render(templateContent, data);

    if (width === 'A4') {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(htmlContent);

      const buffer = await page.pdf({
        // path: 'output.pdf',
        format: 'A4',
        printBackground: true,
      });

      await browser.close();

      return buffer;
    } else {
      const widthPx = Math.round(
        millimetersToPixels(Number(width.replace('mm', ''))),
      );

      const heightPx = await measureHeight(htmlContent, widthPx);
      const heightMm = pixelsToMillimeters(heightPx * 1.05).toFixed(2);

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(htmlContent);

      const buffer = await page.pdf({
        // path: 'output.pdf',
        width: `${width}`,
        height: `${heightMm}mm`,
        printBackground: true,
      });

      await browser.close();

      return buffer;
    }
  } catch (error) {
    throw new Error(error.message || 'Error al generar el PDF');
  }
};

export const sendPdfResponse = (
  res: Response,
  buffer: Uint8Array,
  fileName: string,
) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=${fileName}.pdf`);
  res.setHeader('Content-Length', buffer.length);
  res.end(buffer);
};

export const sendExcelResponse = (
  res: Response,
  buffer: ArrayBuffer,
  fileName: string,
) => {
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
  res.setHeader('Content-Length', buffer.byteLength);
  res.end(buffer);
};
