// src/handlers/pdf.playwright.handler.ts
import { chromium, Browser, BrowserContext, Page } from 'playwright';

let browser: Browser | null = null;

/**
 * Obtiene o crea un navegador único (singleton)
 */
export async function getBrowser(): Promise<Browser> {
  if (!browser) {
    console.log('🔧 Iniciando navegador Chromium...');
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        // '--single-process',
      ],
    });
    console.log('✅ Navegador iniciado');
  }
  return browser;
}

/**
 * Crea un nuevo contexto de navegador (aislado) para cada uso
 */
export async function newContext(): Promise<BrowserContext> {
  const browser = await getBrowser();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 3,
    isMobile: false,
    ignoreHTTPSErrors: true,
  });
  return context;
}

/**
 * Helper: crea página lista para usar y se asegura de limpiar después
 */
export async function withNewPage<T>(
  fn: (page: Page, context: BrowserContext) => Promise<T>,
): Promise<T> {
  let context: BrowserContext | null = null;
  let page: Page | null = null;

  try {
    context = await newContext();
    page = await context.newPage();
    return await fn(page, context);
  } catch (err) {
    console.error('❌ Error en withNewPage:', err);
    throw err;
  } finally {
    if (context) {
      try {
        await context.close();
      } catch (err) {
        console.warn('⚠️ Error cerrando contexto:', err);
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
