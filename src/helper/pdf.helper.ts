// src/helper/pdf.helper.ts
import { readFile } from 'fs/promises';
import * as path from 'path';
import * as ejs from 'ejs';
import { millimetersToPixels, pixelsToMillimeters, startTimer } from './utils.helper';
import { withNewPage } from 'src/handlers/pdf.playwright.handler';
import { Page } from 'playwright';
import { PAPER_CONFIG, PaperType } from 'src/common/dto/paper.dto';
import PdfOptions from 'src/common/dto/pdf-options.dto';

// Cache para templates
const templateCache = new Map<string, string>();

async function loadTemplate(filePath: string): Promise<string> {
  if (!templateCache.has(filePath)) {
    const content = await readFile(filePath, 'utf8');
    templateCache.set(filePath, content);
  }
  return templateCache.get(filePath);
}

// Medir altura usando Playwright (por ahora, lo mejoraremos después)
async function measureHeight(
  htmlContent: string,
  width: number,
  timeout: number = 30000,
): Promise<number> {
  return await withNewPage(async (page) => {
    await page.setViewportSize({ width, height: 10 });
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle',
      timeout: timeout,
    });
    await page.waitForFunction(() => document.fonts.ready, {
      timeout: timeout
    });

    const body = await page.$('body');
    const boundingBox = await body?.boundingBox();
    return Math.ceil(boundingBox?.height ?? 0);
  });
}

/**
 * Genera un PDF usando una plantilla EJS
 */
export const generatePDF = async (
  template: string,
  width: string,
  data: ejs.Data,
  isFooter: boolean = true,
  outputType: 'pdf' | 'jpeg' | 'png' | 'jpg' = 'pdf',
): Promise<Buffer> => {
  return await withNewPage(async (page: Page) => {
    const stopAll = startTimer('TOTAL generatePDF');

    const viewsPath = path.join(__dirname, '..', '..', 'views');
    const stopLoadTemplates = startTimer('Load templates');
    const [templateHeader, templateContent, templateFooter] = await Promise.all([
      loadTemplate(path.join(viewsPath, 'template', 'header.html')),
      loadTemplate(path.join(viewsPath, template)),
      loadTemplate(path.join(viewsPath, 'template', 'footer.html')),
    ]);
    stopLoadTemplates();

    const stopRender = startTimer('EJS render');
    const htmlMainContent = ejs.render(templateContent, data);
    console.log(`[DEBUG] HTML length: ${htmlMainContent.length} chars`);
    stopRender();

    const stopSetContent = startTimer('page.setContent');
    await page.setContent(htmlMainContent, {
      waitUntil: 'networkidle',
      timeout: 60000, // extendemos timeout para catálogos grandes
    });
    stopSetContent();

    const stopFonts = startTimer('waitForFonts');
    await page.waitForFunction(() => document.fonts.ready, {
      timeout: 60000,
    });
    stopFonts();

    let pdfOptions: any;
    let screenshotOptions: any = {};

    if (width === 'A4') {
      pdfOptions = {
        displayHeaderFooter: true,
        headerTemplate: templateHeader,
        footerTemplate: isFooter ? templateFooter : '',
        format: 'A4',
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      };

      if (outputType !== 'pdf') {
        const a4WidthPx = 2480; // A4 width en pixels (300 DPI para alta calidad)
        const a4HeightPx = 3508; // A4 height en pixels (300 DPI para alta calidad)
        await page.setViewportSize({ width: a4WidthPx, height: a4HeightPx });
        screenshotOptions = {
          type: outputType,
          fullPage: true,
          scale: 'device', // Usar escala de dispositivo para mejor resolución
          quality: outputType === 'jpeg' ? 95 : undefined, // Alta calidad para JPEG
          omitBackground: false // Incluir fondo para mejor apariencia
        };
      }
    } else {
      const stopMeasure = startTimer('measureHeight');
      const widthMm = Number(width.replace('mm', ''));
      const widthPx = Math.round(millimetersToPixels(widthMm));
      const heightPx = await measureHeight(htmlMainContent, widthPx);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);
      stopMeasure();

      pdfOptions = {
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      };

      if (outputType !== 'pdf') {
        await page.setViewportSize({ width: widthPx, height: heightPx });
        screenshotOptions = {
          type: outputType,
          fullPage: true,
          scale: 'device', // Usar escala de dispositivo para mejor resolución
          quality: outputType === 'jpeg' ? 95 : undefined, // Alta calidad para JPEG
          omitBackground: false // Incluir fondo para mejor apariencia
        };
      }
    }

    const stopPdf = startTimer('page.pdf');
    if (outputType === 'pdf') {
      const buffer = await page.pdf(pdfOptions);
      stopPdf();
      return buffer;
    } else {
      const buffer = await page.screenshot(screenshotOptions);
      stopPdf();
      return buffer;
    }
  });
};

/**
 * Generates a PDF from a HTML
 * @param htmlContent The HTML to convert to PDF
 * @param options PDF generation options
 * @returns Promise with PDF buffer
 */
export const generatePDFFromHTML = async ({
  htmlContent,
  paper,
  timeout,
  margin,
  outputType,
}: PdfOptions): Promise<Buffer> => {
  return await withNewPage(async (page: Page) => {
    const pdfOptions: any = {
      printBackground: true,
      margin: margin,
    };

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle',
      timeout: timeout,
    });

    await page.waitForFunction(() => document.fonts.ready, {
      timeout: timeout,
    });

    if (paper.paperType === PaperType.A4) {
      // pdfOptions.displayHeaderFooter = true;
      // pdfOptions.headerTemplate = templateHeader;
      // pdfOptions.footerTemplate = isFooter ? templateFooter : '';
      pdfOptions.format = PAPER_CONFIG[paper.paperType].format;
      pdfOptions.width = `${PAPER_CONFIG[paper.paperType].width}mm`;
      pdfOptions.height = `${PAPER_CONFIG[paper.paperType].height}mm`;
    } if (paper.paperType === PaperType.CUSTOM) {
      pdfOptions.width = `${paper.width}mm`;
      pdfOptions.height = `${paper.height}mm`;
    } else {
      const widthMm = PAPER_CONFIG[paper.paperType].width;

      const widthPx = Math.round(millimetersToPixels(widthMm));
      const heightPx = await measureHeight(htmlContent, widthPx, timeout);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);

      pdfOptions.width = `${widthMm}mm`;
      pdfOptions.height = `${heightMm}mm`;
    }

    if (outputType === 'pdf') {
      return await page.pdf(pdfOptions);
    }

    const buffer = await page.screenshot({
      type: outputType,
      fullPage: true,
      scale: 'device',
      quality: 100,
      omitBackground: false,
    });

    return buffer;
  });
}