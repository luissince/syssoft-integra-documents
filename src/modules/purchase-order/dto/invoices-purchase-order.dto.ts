import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import PurchaseOrder from 'src/model/purchase-order.model';

enum Size {
  'A4' = 'A4',
  '80mm' = '80mm',
  '58mm' = '58mm',
}

export class InvoicesPurchaseOrderDto {
  size: Size;
  company: Company;
  branch: Branch;
  purchaseOrder: PurchaseOrder;
  banks: Bank[];
}
