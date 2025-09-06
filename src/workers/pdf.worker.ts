// src/workers/pdf.worker.ts
import { parentPort, workerData } from 'worker_threads';
import { generatePDF } from '../helper/pdf.helper';
import { formatDecimal } from '../helper/utils.helper';
import { uploadPdfToS3 } from 'src/helper/s3.helper';

async function run() {
  try {
    const { template, width, data, isFooter } = workerData;

    // 1. Generar buffer del PDF
    const buffer = await generatePDF(template, width, {
      ...data,
      formatDecimal,
    }, isFooter);

    // 2. Subir a S3
    const fileKey = `catalogs/catalog_${Date.now()}.pdf`;
    const key = await uploadPdfToS3(buffer, fileKey);

    // 3. Retornar todo al parent
    parentPort.postMessage({
      success: true,
      key,
    });
  } catch (error) {
    parentPort.postMessage({
      success: false,
      error: error.message,
    });
  }
}

run();
