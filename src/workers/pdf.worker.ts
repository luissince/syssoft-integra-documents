// src/workers/pdf.worker.ts
import { parentPort, workerData } from 'worker_threads';
import { generatePDF } from '../helper/pdf.helper';
import { formatDecimal } from '../helper/utils.helper'; 

async function run() {
  try {
    const { template, width, data, isFooter } = workerData;
     const buffer = await generatePDF(template, width, {
      ...data,
      formatDecimal,
    }, isFooter);

    parentPort.postMessage({
      success: true,
      buffer,
    });
  } catch (error) {
    parentPort.postMessage({
      success: false,
      error: error.message,
    });
  }
}

run();
