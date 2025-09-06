// src/workers/pdf.worker.ts
import { parentPort, workerData } from 'worker_threads';
import { generatePDF } from '../helper/pdf.helper';
import { formatDecimal } from '../helper/utils.helper';
import { getSignedUrlFromS3, uploadPdfToS3 } from 'src/helper/s3.helper';

async function run() {
  try {
    const { template, width, data, isFooter, pdf_key } = workerData;

    if (pdf_key) {
      // 1. Generar una URL firmada temporal
      const expiresIn = 3600; // 1 hora
      const url = await getSignedUrlFromS3(pdf_key, expiresIn);

      // Si ya existe, no generamos el PDF
      parentPort.postMessage({
        success: true,
        key: pdf_key,
        url,
        expiresIn,
      });
      return;
    }

    // 1. Generar buffer del PDF
    const buffer = await generatePDF(template, width, {
      ...data,
      formatDecimal,
    }, isFooter);

    // 2. Subir a S3
    const fileKey = `catalogs/catalog_${Date.now()}.pdf`;
    const key = await uploadPdfToS3(buffer, fileKey);

    // 3. Generar una URL firmada temporal
    const expiresIn = 3600; // 1 hora
    const url = await getSignedUrlFromS3(key, expiresIn);

    // 4. Retornar todo al parent
    parentPort.postMessage({
      success: true,
      key,        // Para guardar en DB
      url,        // Para usar inmediatamente
      expiresIn,  // En segundos
    });
  } catch (error) {
    parentPort.postMessage({
      success: false,
      error: error.message,
    });
  }
}

run();
