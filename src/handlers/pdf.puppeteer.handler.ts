// src/handlers/pdf.puppeteer.handler.ts
import puppeteer, { Browser, Page } from 'puppeteer';

let browser: Browser | null = null;

/**
 * Obtiene o crea un navegador único (singleton)
 */
export async function getBrowser(): Promise<Browser> {
  if (!browser) {
    console.log('🔧 Iniciando navegador Chromium...');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        // '--single-process', // Descomenta si necesitas un solo proceso
      ],
    });
    console.log('✅ Navegador iniciado');
  }
  return browser;
}

/**
 * Crea una nueva página (Puppeteer maneja páginas directamente)
 */
export async function newPage(): Promise<Page> {
  const browser = await getBrowser();
  const page = await browser.newPage();
  
  // Configurar viewport si necesitas uno diferente al default
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
    isMobile: false,
  });
  
  return page;
}

/**
 * Helper: crea página lista para usar y se asegura de limpiar después
 */
export async function withNewPage<T>(
  fn: (page: Page) => Promise<T>,
): Promise<T> {
  let page: Page | null = null;

  try {
    page = await newPage();
    return await fn(page);
  } catch (err) {
    console.error('❌ Error en withNewPage:', err);
    throw err;
  } finally {
    if (page) {
      try {
        await page.close();
      } catch (err) {
        console.warn('⚠️ Error cerrando página:', err);
      }
    }
  }
}

/**
 * Cierra el navegador (llamar al cerrar el servidor)
 */
export async function closePdfBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
    console.log('🛑 Navegador cerrado');
  }
}