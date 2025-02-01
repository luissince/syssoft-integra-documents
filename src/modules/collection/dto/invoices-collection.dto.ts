import { SizePaper } from 'src/common/enums/size.enum';
import Branch from 'src/model/branch.model';
import Collection from 'src/model/collection.model';
import Company from 'src/model/company.mode';

export class InvoicesCollectionDto {
  size: SizePaper;
  company: Company;
  branch: Branch;
  collection: Collection;
}
