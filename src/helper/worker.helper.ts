// src/helper/worker.helper.ts
import { Worker } from 'worker_threads';

export function runWorker<T>(workerPath: string, data: any): Promise<T> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: data,
    });

    worker.on('message', (msg) => {
      if (msg.success) {
        resolve(msg as T);
      } else {
        reject(new Error(msg.error));
      }
    });

    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker finalizó con código ${code}`));
    });
  });
}
