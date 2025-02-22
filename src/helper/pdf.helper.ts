import { readFile } from 'fs/promises';
import * as path from 'path';
import * as ejs from 'ejs';
import { Response } from 'express';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { PdfOptions } from 'src/common/interfaces/pdf-options.inteface';
import { SizePrint } from 'src/common/enums/size.enum';

async function measureHeight(
  htmlContent: string,
  width: number,
): Promise<number> {
  let browser: Browser | null = null;
  let context: BrowserContext | null = null;
  let page: Page | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext({
      viewport: { width: width, height: 10 },
      // screen: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      isMobile: false,
    });
    page = await context.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle' });

    const bodyHandle = await page.$('body');
    const boundingBox = await bodyHandle.boundingBox();

    return Math.ceil(boundingBox.height);
  } finally {
    await page?.close();
    await context?.close();
    await browser?.close();
  }
}

const pixelsToMillimeters = (px: number) => {
  return px / 3.77952756;
};

const millimetersToPixels = (mm: number) => {
  return mm * (96 / 25.4);
};

export const generatePDF = async (
  template: string,
  width: string,
  data: ejs.Data,
  isFooter: boolean = true,
): Promise<Uint8Array> => {
  try {
    const templateHeader = await readFile(
      path.join(__dirname, '..', '..', 'views', 'template', 'header.html'),
      'utf8',
    );
    const templateContent = await readFile(
      path.join(__dirname, '..', '..', 'views', template),
      'utf8',
    );
    const templateFooter = await readFile(
      path.join(__dirname, '..', '..', 'views', 'template', 'footer.html'),
      'utf8',
    );

    const htmlMainContent = ejs.render(templateContent, data);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    let pdfOptions: any;

    if (width === 'A4') {
      await page.setContent(htmlMainContent, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.fonts.ready);

      pdfOptions = {
        // path: 'output.pdf',
        displayHeaderFooter: true,
        headerTemplate: templateHeader,
        footerTemplate: isFooter ? templateFooter : '',
        format: 'A4',
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      };
    } else {
      const widthPx = Math.round(
        millimetersToPixels(Number(width.replace('mm', ''))),
      );

      const heightPx = await measureHeight(htmlMainContent, widthPx);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);

      await page.setContent(htmlMainContent, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.fonts.ready);

      pdfOptions = {
        // path: 'output.pdf',
        width: `${width}`,
        height: `${heightMm}mm`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      };
    }

    const buffer = await page.pdf(pdfOptions);

    await browser.close();

    return buffer;
  } catch (error) {
    throw error;
  }
};

export const generatePDFFromHTML = async ({
  htmlContent,
  width,
  height,
  margin = { top: 0, bottom: 0, left: 0, right: 0 },
}: PdfOptions): Promise<Uint8Array> => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.fonts.ready);

    const pdfOptions: any = {
      printBackground: true,
      margin: margin,
    };

    if (width && height) {
      pdfOptions.width = `${width}mm`;
      pdfOptions.height = `${height}mm`;
    } else if (width === SizePrint.A4) {
      pdfOptions.format = SizePrint.A4;
    } else if (width) {
      const widthPx = Math.round(
        millimetersToPixels(Number(width.replace('mm', ''))),
      );

      const heightPx = await measureHeight(htmlContent, widthPx);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);

      pdfOptions.width = width;
      pdfOptions.height = `${heightMm}mm`;
    }

    const buffer = await page.pdf(pdfOptions);

    await browser.close();

    return buffer;
  } catch (error) {
    throw error;
  }
};

export const sendPdfResponse = (
  res: Response,
  buffer: Uint8Array,
  fileName: string,
) => {
  // Codificar el nombre del archivo en formato URL
  const encodedFileName = encodeURIComponent(fileName);

  // Configurar los encabezados de la respuesta
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', buffer.byteLength);

  // Usar el formato "filename*" para soportar caracteres especiales (RFC 5987)
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${encodedFileName}.pdf"; filename*=UTF-8''${encodedFileName}.pdf`,
  );

  // Enviar el archivo PDF
  res.end(buffer);
};

export const sendExcelResponse = (
  res: Response,
  buffer: ArrayBuffer,
  fileName: string,
) => {
  // Codificar el nombre del archivo en formato URL
  const encodedFileName = encodeURIComponent(fileName);

  // Configurar los encabezados de la respuesta
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader('Content-Length', buffer.byteLength);

  // Usar el formato "filename*" para soportar caracteres especiales (RFC 5987)
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${encodedFileName}.xlsx"; filename*=UTF-8''${encodedFileName}.xlsx`,
  );

  // Enviar el archivo Excel
  res.end(Buffer.from(buffer));
};
