import { Response } from 'express';

/**
 * Options for sending a PDF or image response.
 */
export interface SendPdfResponseOptions {
  /** Express response object */
  res: Response;

  /** File content */
  buffer: Buffer | Uint8Array;

  /** File name without extension */
  fileName: string;

  /** Output file type */
  type?: 'pdf' | 'jpeg' | 'png' | 'jpg';

  /** Force browser download */
  download?: boolean;
}

export interface SendExcelResponseOptions {
  /** Express response object */
  res: Response;

  /** Excel or CSV content */
  buffer: ArrayBuffer;

  /** File name without extension */
  fileName: string;

  /** Output file type */
  type?: 'xlsx' | 'xls' | 'csv';

  /** Force browser download */
  download?: boolean;
}

/**
 * Options for sending a Octet-stream response.
 */
export interface SendEscPosResponseOptions {
  /** Express response object */
  res: Response;

  /** File content */
  buffer: Buffer | Uint8Array;

  /** File name without extension */
  fileName?: string;
}