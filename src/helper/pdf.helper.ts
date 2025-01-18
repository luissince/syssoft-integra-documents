import { readFile } from 'fs/promises';
import * as path from 'path';
import * as ejs from 'ejs';
import { Response } from 'express';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

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

    if (width === 'A4') {
      await page.setContent(htmlMainContent, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.fonts.ready);

      const buffer = await page.pdf({
        // path: 'output.pdf',
        displayHeaderFooter: true,
        headerTemplate: templateHeader,
        footerTemplate: isFooter ? templateFooter : '',
        format: 'A4',
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      });

      await browser.close();

      return buffer;
    } else {
      const widthPx = Math.round(
        millimetersToPixels(Number(width.replace('mm', ''))),
      );

      const heightPx = await measureHeight(htmlMainContent, widthPx);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);

      await page.setContent(htmlMainContent, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.fonts.ready);

      const buffer = await page.pdf({
        // path: 'output.pdf',
        width: `${width}`,
        height: `${heightMm}mm`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
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
  res.setHeader('Content-Length', buffer.byteLength);
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
