// src/helper/pdf.helper.ts
import { readFile } from 'fs/promises';
import * as path from 'path';
import * as ejs from 'ejs';
import { millimetersToPixels, pixelsToMillimeters, startTimer } from './utils.helper';
import { withNewPage } from 'src/handlers/pdf.playwright.handler';
import { Page } from 'playwright';
import PdfDto from 'src/common/class/dto/pdf.class.dto';
import { SizePaper, SizePrint } from 'src/common/enums/size.enum';

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
): Promise<number> {
  return await withNewPage(async (page) => {
    await page.setViewportSize({ width, height: 10 });
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 60000 });

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

    let options: any;
    let screenshotOptions: any = {};

    if (width === 'A4') {
      options = {
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

      options = {
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
      const buffer = await page.pdf(options);
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
 * Generates a PDF from a URL
 * @param url The URL to convert to PDF
 * @param options PDF generation options
 * @returns Promise with PDF buffer
 */
export const generatePDFFromHTML = async ({
  title,
  html,
  size,
  margin,
  outputType,
}: PdfDto): Promise<Buffer> => {
  return await withNewPage(async (page: Page) => {
    // Set page options
    await page.setContent(html, {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    // Wait for fonts to be loaded
    await page.waitForFunction(() => document.fonts.ready, {
      timeout: 60000,
    });

    // Set viewport size
    let options: any;
    let screenshotOptions: any;

    // If size is not provided, use A4 as default
    if (size === SizePaper.A4) {
      options = {
        displayHeaderFooter: true,
        format: 'A4',
        printBackground: true,
        margin: margin,
      }
    }

    // If size is provided, use it
    if (size === SizePaper.mm80 || size === SizePaper.mm58) {
      const width = size === SizePaper.mm80 ? SizePrint.mm72 : SizePrint.mm48;
      const widthMm = Number(width.replace('mm', ''));
      const widthPx = Math.round(millimetersToPixels(widthMm));
      const heightPx = await measureHeight(html, widthPx);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);

      options = {
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        printBackground: true,
        margin: margin,
      }

      await page.setViewportSize({ width: widthPx, height: heightPx });
    }

    // Return PDF buffer
    if (outputType === 'pdf') {
      return await page.pdf(options);
    }

    // Adjust screenshot options for non-PDF outputs
    screenshotOptions = {
      type: outputType,
      fullPage: true,
      scale: 'device', // Usar escala de dispositivo para mejor resolución
      quality: outputType === 'jpeg' ? 95 : undefined, // Alta calidad para JPEG
      omitBackground: false // Incluir fondo para mejor apariencia
    }

    // Return screenshot buffer
    return await page.screenshot(screenshotOptions);
  });
};