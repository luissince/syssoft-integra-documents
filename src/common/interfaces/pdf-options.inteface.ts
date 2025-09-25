import { Margin } from './margin.interface';

export interface PdfOptions {
  htmlContent: string;
  width?: string;
  height?: string;
  margin?: Margin;
  outputType: 'pdf' | 'jpeg',
}
