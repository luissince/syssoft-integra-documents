import Branch from 'src/model/branch.model';
import Collection from 'src/model/collection.model';
import Company from 'src/model/company.mode';

enum Size {
  'A4' = 'A4',
  '80mm' = '80mm',
  '58mm' = '58mm',
}

export class InvoicesCollectionDto {
  size: Size;
  company: Company;
  branch: Branch;
  collection: Collection;
}
