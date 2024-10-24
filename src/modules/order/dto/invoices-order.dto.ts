import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Order from 'src/model/order.model';

enum Size {
  'A4' = 'A4',
  '80mm' = '80mm',
  '58mm' = '58mm',
}

export class InvoicesOrderDto {
  size: Size;
  company: Company;
  branch: Branch;
  order: Order;
  banks: Bank[];
}
