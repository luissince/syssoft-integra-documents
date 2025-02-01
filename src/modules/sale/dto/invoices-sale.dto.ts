import { SizePaper } from 'src/common/enums/size.enum';
import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Sale from 'src/model/sale.model';

export class InvoicesSaleDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  sale: Sale;
  banks: Bank[];
}
