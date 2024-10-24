import Product from './product.mode';

class DispatchGuideDetail {
  private _id: number;
  private _idGuiaRemisionDetalle: string;
  private _idGuiaRemision: string;
  private _idProducto: string;
  private _cantidad: number;
  private _producto: Product;

  get id(): number {
    return this._id;
  }

  set id(_id: number) {
    this._id = _id;
  }

  get idGuiaRemisionDetalle(): string {
    return this._idGuiaRemisionDetalle;
  }

  set idGuiaRemisionDetalle(_idGuiaRemisionDetalle: string) {
    this._idGuiaRemisionDetalle = _idGuiaRemisionDetalle;
  }

  get idGuiaRemision(): string {
    return this._idGuiaRemision;
  }

  set idGuiaRemision(_idGuiaRemision: string) {
    this._idGuiaRemision = _idGuiaRemision;
  }

  get idProducto(): string {
    return this._idProducto;
  }

  set idProducto(_idProducto: string) {
    this._idProducto = _idProducto;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  set cantidad(_cantidad: number) {
    this._cantidad = _cantidad;
  }

  get producto(): Product {
    return this._producto;
  }

  set producto(_producto: Product) {
    this._producto = _producto;
  }
}

export default DispatchGuideDetail;
