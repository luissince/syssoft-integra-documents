// src/common/dto/paper.dto.ts
export enum PaperType {
  A4 = 'A4',
  MM80 = '80mm',
  MM58 = '58mm',
  CUSTOM = 'CUSTOM',
}

export class PdfPageFormat {
  paperType: PaperType;
  width?: number;
  height?: number;
}

export const PAPER_CONFIG = {
  A4: {
    format: 'A4',
    width: 210,
    height: 297,
  },

  '80mm': {
    width: 72,
  },

  '58mm': {
    width: 48,
  },
};