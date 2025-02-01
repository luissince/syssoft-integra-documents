import { SizePaper } from 'src/common/enums/size.enum';
import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Quotation from 'src/model/quotation.modal';

export class InvoicesQuotationDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  quotation: Quotation;
  banks: Bank[];
}
