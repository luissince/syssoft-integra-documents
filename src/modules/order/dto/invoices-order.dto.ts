import { SizePaper } from 'src/common/enums/size.enum';
import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Order from 'src/model/order.model';

export class InvoicesOrderDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  order: Order;
  banks: Bank[];
}
