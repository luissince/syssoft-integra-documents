import Product from './product.model';
import Tax from './tax.model';

class SaleDetail {
  private _id: number;
  private _idVentaDetalle: string;
  private _idVenta: string;
  private _idProducto: string;
  private _descripcion: string;
  private _precio: number;
  private _cantidad: number;
  private _idImpuesto: string;
  private _producto: Product;
  private _impuesto: Tax;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get idVentaDetalle(): string {
    return this._idVentaDetalle;
  }

  set idVentaDetalle(value: string) {
    this._idVentaDetalle = value;
  }

  get idVenta(): string {
    return this._idVenta;
  }

  set idVenta(value: string) {
    this._idVenta = value;
  }

  get idProducto(): string {
    return this._idProducto;
  }

  set idProducto(value: string) {
    this._idProducto = value;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(value: string) {
    this._descripcion = value;
  }

  get precio(): number {
    return this._precio;
  }

  set precio(value: number) {
    this._precio = value;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  set cantidad(value: number) {
    this._cantidad = value;
  }

  get idImpuesto(): string {
    return this._idImpuesto;
  }

  set idImpuesto(value: string) {
    this._idImpuesto = value;
  }

  get producto(): Product {
    return this._producto;
  }

  set producto(value: Product) {
    this._producto = value;
  }

  get impuesto(): Tax {
    return this._impuesto;
  }

  set impuesto(value: Tax) {
    this._impuesto = value;
  }
}

export default SaleDetail;
