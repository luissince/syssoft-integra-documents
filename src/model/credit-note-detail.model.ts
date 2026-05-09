import Product from './product.model';
import Tax from './tax.model';

class CreditNoteDetail {
  public idNotaCreditoDetalle: string;
  public idNotaCredito: string;
  public idProducto: string;
  public precio: number;
  public cantidad: number;
  public idImpuesto: string;
  public idMedida: string;

  public producto: Product;
  public impuesto: Tax;
}

export default CreditNoteDetail;
