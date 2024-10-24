import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Expense from 'src/model/expense.model';

enum Size {
  'A4' = 'A4',
  '80mm' = '80mm',
  '58mm' = '58mm',
}

export class InvoicesExpenseDto {
  size: Size;
  company: Company;
  branch: Branch;
  expense: Expense;
}
