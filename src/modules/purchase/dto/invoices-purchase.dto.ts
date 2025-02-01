import { SizePaper } from 'src/common/enums/size.enum';
import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Purchase from 'src/model/purchase.model';

export class InvoicesPurchaseDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  purchase: Purchase;
  banks: Bank[];
}
