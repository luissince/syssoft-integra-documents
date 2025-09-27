// src/helper/pdf.helper.ts
import { readFile } from 'fs/promises';
import * as path from 'path';
import * as ejs from 'ejs';
import { millimetersToPixels, pixelsToMillimeters, startTimer } from './utils.helper';
import { withNewPage } from 'src/handlers/pdf.puppeteer.handler'; // Cambiado el import
import { Page } from 'puppeteer'; // Cambiado de playwright a puppeteer

// Cache para templates
const templateCache = new Map<string, string>();

async function loadTemplate(filePath: string): Promise<string> {
  if (!templateCache.has(filePath)) {
    const content = await readFile(filePath, 'utf8');
    templateCache.set(filePath, content);
  }
  return templateCache.get(filePath);
}

// Medir altura usando Puppeteer
async function measureHeight(
  htmlContent: string,
  width: number,
): Promise<number> {
  return await withNewPage(async (page) => {
    await page.setViewport({ width, height: 10 }); // Cambiado de setViewportSize a setViewport
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0', // Cambiado de 'networkidle' a 'networkidle0'
      timeout: 30000,
    });
    
    // Esperar a que las fuentes estén listas
    await page.evaluate(() => document.fonts.ready);

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
      waitUntil: 'networkidle0', // Cambiado de 'networkidle' a 'networkidle0'
      timeout: 60000, // extendemos timeout para catálogos grandes
    });
    stopSetContent();

    const stopFonts = startTimer('waitForFonts');
    // Cambiado el método para esperar las fuentes
    await page.evaluate(() => document.fonts.ready);
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
        await page.setViewport({ width: a4WidthPx, height: a4HeightPx }); // Cambiado de setViewportSize
        screenshotOptions = {
          type: outputType,
          fullPage: true,
          // Puppeteer no tiene 'scale' como opción, se usa clip o calidad
          ...(outputType === 'jpeg' && { quality: 95 }), // Alta calidad para JPEG
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
        await page.setViewport({ width: widthPx, height: heightPx }); // Cambiado de setViewportSize
        screenshotOptions = {
          type: outputType,
          fullPage: true,
          ...(outputType === 'jpeg' && { quality: 95 }), // Alta calidad para JPEG
          omitBackground: false // Incluir fondo para mejor apariencia
        };
      }
    }

    const stopPdf = startTimer('page.pdf');
    if (outputType === 'pdf') {
      const pdfBuffer = await page.pdf(pdfOptions);
      stopPdf();
      stopAll();
      // Asegurar que retornamos un Buffer
      return Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);
    } else {
      const screenshotBuffer = await page.screenshot(screenshotOptions);
      stopPdf();
      stopAll();
      // Asegurar que retornamos un Buffer
      return Buffer.isBuffer(screenshotBuffer) ? screenshotBuffer : Buffer.from(screenshotBuffer);
    }
  });
};