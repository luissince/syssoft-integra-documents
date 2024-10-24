import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import DispatchGuide from 'src/model/dispatch-guide.model';

enum Size {
  'A4' = 'A4',
  '80mm' = '80mm',
  '58mm' = '58mm',
}

export class InvoicesDispatchGuideDto {
  size: Size;
  company: Company;
  branch: Branch;
  dispatchGuide: DispatchGuide;
}
