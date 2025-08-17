import { chromium, Browser, BrowserContext, Page } from 'playwright';

interface BrowserPoolOptions {
  maxConcurrentPages?: number;
}

export class BrowserPool {
  private static browser: Browser | null = null;
  private static currentPages: number = 0;
  private static maxConcurrentPages: number = 4; // Puedes ajustar este valor

  static async init(options?: BrowserPoolOptions) {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
      this.maxConcurrentPages = options?.maxConcurrentPages ?? 4;
    }
  }

  static async getPage(): Promise<{ page: Page; context: BrowserContext }> {
    if (!this.browser) {
      throw new Error('Browser not initialized. Call BrowserPool.init() first.');
    }

    // Espera si ya llegamos al límite de pestañas
    while (this.currentPages >= this.maxConcurrentPages) {
      await new Promise(resolve => setTimeout(resolve, 100)); // espera 100ms
    }

    this.currentPages++;

    const context = await this.browser.newContext();
    const page = await context.newPage();

    return {
      page,
      context,
    };
  }

  static async releasePage(context: BrowserContext) {
    await context.close();
    this.currentPages--;
  }

  static async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
