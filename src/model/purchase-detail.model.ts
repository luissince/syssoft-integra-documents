import Product from './product.model';
import Tax from './tax.model';

class PurchaseDetail {
  private _idCompraDetalle: number;
  private _idCompra: string;
  private _idProducto: string;
  private _costo: number;
  private _cantidad: number;
  private _idImpuesto: string;
  private _producto: Product;
  private _impuesto: Tax;

  get idCompraDetalle(): number {
    return this._idCompraDetalle;
  }

  set idCompraDetalle(_idCompraDetalle: number) {
    this._idCompraDetalle = _idCompraDetalle;
  }

  get idCompra(): string {
    return this._idCompra;
  }

  set idCompra(_idCompra: string) {
    this._idCompra = _idCompra;
  }

  get idProducto(): string {
    return this._idProducto;
  }

  set idProducto(_idProducto: string) {
    this._idProducto = _idProducto;
  }

  get costo(): number {
    return this._costo;
  }

  set costo(_costo: number) {
    this._costo = _costo;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  set cantidad(_cantidad: number) {
    this._cantidad = _cantidad;
  }

  get idImpuesto(): string {
    return this._idImpuesto;
  }

  set idImpuesto(_idImpuesto: string) {
    this._idImpuesto = _idImpuesto;
  }

  get producto(): Product {
    return this._producto;
  }

  set producto(_producto: Product) {
    this._producto = _producto;
  }

  get impuesto(): Tax {
    return this._impuesto;
  }

  set impuesto(_impuesto: Tax) {
    this._impuesto = _impuesto;
  }
}

export default PurchaseDetail;
