import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Quotation from 'src/model/quotation.modal';

enum Size {
  'A4' = 'A4',
  '80mm' = '80mm',
  '58mm' = '58mm',
}

export class InvoicesQuotationDto {
  size: Size;
  company: Company;
  branch: Branch;
  quotation: Quotation;
  banks: Bank[];
}
