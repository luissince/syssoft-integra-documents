import { SizePaper } from 'src/common/enums/size.enum';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import DispatchGuide from 'src/model/dispatch-guide.model';

export class InvoicesDispatchGuideDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  dispatchGuide: DispatchGuide;
}
