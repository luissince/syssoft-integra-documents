import Measurement from './measurement.model';
import Product from './product.mode';
import Tax from './tax.model';

class OrderDetail {
  private _id: number;
  private _idPedidoDetalle: number;
  private _idPedido: string;
  private _idProducto: string;
  private _idMedida: string;
  private _precio: number;
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

  get idPedidoDetalle(): number {
    return this._idPedidoDetalle;
  }

  set idPedidoDetalle(_idPedidoDetalle: number) {
    this._idPedidoDetalle = _idPedidoDetalle;
  }

  get idPedido(): string {
    return this._idPedido;
  }

  set idPedido(_idPedido: string) {
    this._idPedido = _idPedido;
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

  get precio(): number {
    return this._precio;
  }

  set precio(_precio: number) {
    this._precio = _precio;
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

export default OrderDetail;
