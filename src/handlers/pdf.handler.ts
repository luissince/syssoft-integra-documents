// src/handlers/pdf.handler.ts
import { chromium, Browser, BrowserContext } from 'playwright';

let browser: Browser | null = null;
let context: BrowserContext | null = null;

/**
 * Obtiene o crea el navegador y contexto únicos
 */
export async function getBrowserContext(): Promise<BrowserContext> {
  if (!browser) {
    console.log('🔧 Iniciando navegador Chromium...');
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process',
      ],
    });
    console.log('✅ Navegador iniciado');
  }

  if (!context) {
    console.log('🔧 Creando contexto de navegador...');
    context = await browser.newContext({
      viewport: { width: 1200, height: 800 },
      deviceScaleFactor: 1,
      isMobile: false,
      ignoreHTTPSErrors: true,
    });
    console.log('✅ Contexto creado');
  }

  return context;
}

/**
 * Cierra el navegador (llamar al cerrar el servidor)
 */
export async function closePdfBrowser(): Promise<void> {
  if (context) {
    await context.close();
    context = null;
    console.log('🧹 Contexto cerrado');
  }
  if (browser) {
    await browser.close();
    browser = null;
    console.log('🛑 Navegador cerrado');
  }
}
