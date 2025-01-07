import Measurement from './measurement.model';
import Product from './product.mode';
import Tax from './tax.model';

class PurchaseOrderDetail {
  private _id: number;
  private _idOrdenCompraDetalle: number;
  private _idOrdenCompra: string;
  private _idProducto: string;
  private _idMedida: string;
  private _costo: number;
  private _cantidad: number;
  private _idImpuesto: string;
  private _producto: Product;
  private _medida: Measurement;
  private _impuesto: Tax;

  get id(): number {
    return this._id;
  }

  set id(_id: number) {
    this._id = _id;
  }

  get idOrdenCompraDetalle(): number {
    return this._idOrdenCompraDetalle;
  }

  set idOrdenCompraDetalle(_idOrdenCompraDetalle: number) {
    this._idOrdenCompraDetalle = _idOrdenCompraDetalle;
  }

  get idOrdenCompra(): string {
    return this._idOrdenCompra;
  }

  set idOrdenCompra(_idOrdenCompra: string) {
    this._idOrdenCompra = _idOrdenCompra;
  }

  get idProducto(): string {
    return this._idProducto;
  }

  set idProducto(_idProducto: string) {
    this._idProducto = _idProducto;
  }

  get idMedida(): string {
    return this._idMedida;
  }

  set idMedida(_idMedida: string) {
    this._idMedida = _idMedida;
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

  get medida(): Measurement {
    return this._medida;
  }

  set medida(_medida: Measurement) {
    this._medida = _medida;
  }

  get impuesto(): Tax {
    return this._impuesto;
  }

  set impuesto(_impuesto: Tax) {
    this._impuesto = _impuesto;
  }
}

export default PurchaseOrderDetail;
