import { SizePaper } from 'src/common/enums/size.enum';
import Bank from 'src/model/bank.model';
import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Currency from 'src/model/currency.model';

interface Transaction {
  concepto: string;
  total: number;
}

export class ReportsTransactionDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  currency: Currency;
  startDate: string;
  endDate: string;
  nameBranch: string;
  nameUser: string;
  income: number;
  expense: number;
  incomes: Transaction[];
  expenses: Transaction[];
  banks: Bank[];
}
