import { readFile } from 'fs/promises';
import * as path from 'path';
import * as ejs from 'ejs';
import { PdfOptions } from 'src/common/interfaces/pdf-options.inteface';
import { SizePrint } from 'src/common/enums/size.enum';
import { millimetersToPixels, pixelsToMillimeters } from './utils.helper';
import { getBrowserContext } from 'src/handlers/pdf.handler';

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
  const context = await getBrowserContext();
  const page = await context.newPage();

  try {
    await page.setViewportSize({ width, height: 10 });
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 30000 });

    const body = await page.$('body');
    const boundingBox = await body.boundingBox();
    return Math.ceil(boundingBox.height);
  } finally {
    await page.close(); // ← cerramos solo la página
  }
}

/**
 * Genera un PDF usando una plantilla EJS
 */
export const generatePDF = async (
  template: string,
  width: string,
  data: ejs.Data,
  isFooter: boolean = true,
): Promise<Uint8Array> => {
  try {
    const viewsPath = path.join(__dirname, '..', '..', 'views');
    const [templateHeader, templateContent, templateFooter] = await Promise.all(
      [
        loadTemplate(path.join(viewsPath, 'template', 'header.html')),
        loadTemplate(path.join(viewsPath, template)),
        loadTemplate(path.join(viewsPath, 'template', 'footer.html')),
      ],
    );

    const htmlMainContent = ejs.render(templateContent, data);
    const context = await getBrowserContext();
    const page = await context.newPage();

    let pdfOptions: any;

    if (width === 'A4') {
      await page.setContent(htmlMainContent, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      await page.waitForFunction(() => document.fonts.ready, {
        timeout: 30000,
      });

      pdfOptions = {
        displayHeaderFooter: true,
        headerTemplate: templateHeader,
        footerTemplate: isFooter ? templateFooter : '',
        format: 'A4',
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      };
    } else {
      const widthMm = Number(width.replace('mm', ''));
      const widthPx = Math.round(millimetersToPixels(widthMm));
      const heightPx = await measureHeight(htmlMainContent, widthPx);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);

      await page.setContent(htmlMainContent, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      await page.waitForFunction(() => document.fonts.ready, {
        timeout: 30000,
      });

      pdfOptions = {
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      };
    }

    const buffer = await page.pdf(pdfOptions);
    await page.close();

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
    const context = await getBrowserContext();
    const page = await context.newPage();

    const pdfOptions: any = {
      printBackground: true,
      margin: margin,
    };

    if (width && height) {
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      await page.waitForFunction(() => document.fonts.ready, {
        timeout: 30000,
      });

      pdfOptions.width = `${width}mm`;
      pdfOptions.height = `${height}mm`;
    } else if (width === SizePrint.A4) {
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      await page.waitForFunction(() => document.fonts.ready, {
        timeout: 30000,
      });

      pdfOptions.format = SizePrint.A4;
    } else if (width) {
      const widthPx = Math.round(
        millimetersToPixels(Number(width.replace('mm', ''))),
      );

      const heightPx = await measureHeight(htmlContent, widthPx);
      const heightMm = pixelsToMillimeters(heightPx).toFixed(2);

      await page.setContent(htmlContent, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      await page.waitForFunction(() => document.fonts.ready, {
        timeout: 30000,
      });

      pdfOptions.width = width;
      pdfOptions.height = `${heightMm}mm`;
    }

    const buffer = await page.pdf(pdfOptions);
    await page.close();

    return buffer;
  } catch (error) {
    throw error;
  }
};
