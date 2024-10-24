import * as qrcode from 'qrcode';

export const generateQr = async (data: string, width?: number) => {
  const qrCodeBuff = await qrcode.toBuffer(data, { width: width });

  return qrCodeBuff;
};
