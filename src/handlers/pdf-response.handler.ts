import { Response } from 'express';

/**
 * Sends a PDF response with proper headers
 * @param res The Express response object
 * @param buffer The PDF buffer
 * @param fileName The file name (without extension)
 *  @param type Output type: 'pdf' | 'png' | 'jpeg'
 */
export function sendPdfResponse(
  res: Response,
  buffer: Buffer,
  fileName: string,
  type: 'pdf' | 'jpeg' = 'pdf',
): void {
  // Encode the filename for URL compatibility
  const encodedFileName = encodeURIComponent(fileName);

  let contentType: string;
  let extension: string;

  switch (type) {
    case 'jpeg':
      contentType = 'image/jpeg';
      extension = 'jpg';
      break;
    default:
      contentType = 'application/pdf';
      extension = 'pdf';
      break;
  }

  // Set response headers
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', buffer.byteLength);

  // Use "filename*" format to support special characters (RFC 5987)
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${encodedFileName}.${extension}"; filename*=UTF-8''${encodedFileName}.${extension}`,
  );
  
  // Send the PDF file
  res.end(buffer);
}

/**
 * Sends an Excel response with proper headers
 * @param res The Express response object
 * @param buffer The Excel buffer
 * @param fileName The file name (without extension)
 */
export function sendExcelResponse(
  res: Response,
  buffer: ArrayBuffer,
  fileName: string,
): void {
  // Codificar el nombre del archivo en formato URL
  const encodedFileName = encodeURIComponent(fileName);

  // Configurar los encabezados de la respuesta
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader('Content-Length', buffer.byteLength);

  // Usar el formato "filename*" para soportar caracteres especiales (RFC 5987)
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${encodedFileName}.xlsx"; filename*=UTF-8''${encodedFileName}.xlsx`,
  );

  // Enviar el archivo Excel
  res.end(Buffer.from(buffer));
}
