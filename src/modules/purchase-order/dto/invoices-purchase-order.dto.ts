import { SizePaper } from 'src/common/enums/size.enum';
import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import PurchaseOrder from 'src/model/purchase-order.model';

export class InvoicesPurchaseOrderDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  purchaseOrder: PurchaseOrder;
  banks: Bank[];
}
