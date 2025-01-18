import Branch from 'src/model/branch.model';
import Company from 'src/model/company.mode';
import Product from 'src/model/product.model';

export class ProductDto {
  company: Company;
  branch: Branch;
  products: Product[];
}
