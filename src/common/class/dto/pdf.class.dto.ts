import { SizePaper } from 'src/common/enums/size.enum';
import { Margin } from 'src/common/interfaces/margin.interface';

export default class PdfDto {
  title: string;
  html: string;
  size?: SizePaper;
  margin?: Margin;
  outputType: 'pdf' | 'jpeg' | 'png' | 'jpg' = 'pdf';
}
