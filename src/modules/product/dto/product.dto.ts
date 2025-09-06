import Branch from 'src/model/branch.model';
import Catalog from 'src/model/catalog';
import Company from 'src/model/company.mode';
import Currency from 'src/model/currency.model';
import Product from 'src/model/product.model';

export class ProductDto {
  company: Company;
  branch: Branch;
  catalog: Catalog;
  moneda: Currency;
  products: Product[];
  webhook: string;
}
