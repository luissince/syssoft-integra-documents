// src/handlers/pdf-browser.provider.ts
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { closePdfBrowser } from './pdf.playwright.handler';

@Injectable()
export class PdfBrowserProvider implements OnApplicationShutdown {
  async onApplicationShutdown(signal?: string) {
    console.log(`⚡ Shutdown signal recibido: ${signal}`);
    await closePdfBrowser(); // 👈 aquí liberas el singleton
  }
}
