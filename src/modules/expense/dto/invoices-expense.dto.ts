import { SizePaper } from 'src/common/enums/size.enum';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Expense from 'src/model/expense.model';

export class InvoicesExpenseDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  expense: Expense;
}
