
import { SendEscPosResponseOptions, SendExcelResponseOptions, SendPdfResponseOptions } from 'src/common/interfaces/send-response-options.interface';

/**
 * Sends a file response with proper headers.
 *
 * @param options Response options (see {@link SendPdfResponseOptions})
 */
export function sendPdfResponse({
  res,
  buffer,
  fileName,
  type = 'pdf',
  download = false,
}: SendPdfResponseOptions): void {
  // Encode the filename for URL compatibility
  const encodedFileName = encodeURIComponent(fileName);

  let contentType: string;
  let extension: string;

  switch (type) {
    case 'jpeg':
      contentType = 'image/jpeg';
      extension = 'jpg';
      break;
    case 'png':
      contentType = 'image/png';
      extension = 'png';
      break;
    case 'jpg':
      contentType = 'image/jpeg';
      extension = 'jpg';
      break;
    default:
      contentType = 'application/pdf';
      extension = 'pdf';
      break;
  }

  // Set the filename for the Content-Disposition header
  const disposition = download ? 'attachment' : 'inline';

  // Set response headers
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', buffer.byteLength);

  // Use "filename*" format to support special characters (RFC 5987)
  res.setHeader(
    'Content-Disposition',
    `${disposition}; filename="${encodedFileName}.${extension}"; filename*=UTF-8''${encodedFileName}.${extension}`,
  );

  // Send the PDF file
  res.end(buffer);
}

/**
 * Sends an Excel or CSV response with proper headers.
 *
 * @param options Response options (see {@link SendExcelResponseOptions})
 */
export function sendExcelResponse({
  res,
  buffer,
  fileName,
  type = 'xlsx',
  download = true,
}: SendExcelResponseOptions): void {
  // Encode the filename for URL compatibility
  const encodedFileName = encodeURIComponent(fileName);

  let contentType: string;
  let extension: string;

  switch (type) {
    case 'xlsx':
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      extension = 'xlsx';
      break;
    case 'xls':
      contentType = 'application/vnd.ms-excel';
      extension = 'xls';
      break;
    case 'csv':
      contentType = 'text/csv';
      extension = 'csv';
      break;
    default:
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      extension = 'xlsx';
      break;
  }

  // Set the filename for the Content-Disposition header
  const disposition = download ? 'attachment' : 'inline';

  // Set response headers
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', buffer.byteLength);

  // Use "filename*" format to support special characters (RFC 5987)
  res.setHeader(
    'Content-Disposition',
    `${disposition}; filename="${encodedFileName}.${extension}"; filename*=UTF-8''${encodedFileName}.${extension}`,
  );

  // Send the Excel file
  res.end(Buffer.from(buffer));
}

/**
 * 
 * @param options Responde options (see {@link SendEscPosResponseOptions})
 */
export function sendEscPosResponse({
  res,
  buffer,
  fileName = 'ticket',
}: SendEscPosResponseOptions): void {

  const encodedFileName = encodeURIComponent(fileName);

  res.setHeader('Content-Type', 'application/octet-stream');

  // opcional (debug / descarga manual)
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${encodedFileName}.bin"`
  );

  res.setHeader('Content-Length', buffer.byteLength);

  res.end(Buffer.from(buffer));
}