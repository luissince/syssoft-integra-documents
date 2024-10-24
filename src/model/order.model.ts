import Currency from './currency.model';
import OrderDetail from './order-detail.model';
import Person from './person.model';
import Receipt from './receipt.model';
import User from './user.model';

class Order {
  private _idPedido: string;
  private _idProveedor: string;
  private _idUsuario: string;
  private _idComprobante: string;
  private _idSucursal: string;
  private _idMoneda: string;
  private _serie: string;
  private _numeracion: string;
  private _observacion: string;
  private _nota: string;
  private _estado: boolean;
  private _fecha: string;
  private _hora: string;
  private _proveedor: Person;
  private _comprobante: Receipt;
  private _moneda: Currency;
  private _usuario: User;
  private _pedidoDetalles: OrderDetail[];

  get idPedido(): string {
    return this._idPedido;
  }

  set idPedido(_idPedido: string) {
    this._idPedido = _idPedido;
  }

  get idProveedor(): string {
    return this._idProveedor;
  }

  set idProveedor(_idProveedor: string) {
    this._idProveedor = _idProveedor;
  }

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
  }

  get idComprobante(): string {
    return this._idComprobante;
  }

  set idComprobante(_idComprobante: string) {
    this._idComprobante = _idComprobante;
  }

  get idSucursal(): string {
    return this._idSucursal;
  }

  set idSucursal(_idSucursal: string) {
    this._idSucursal = _idSucursal;
  }

  get idMoneda(): string {
    return this._idMoneda;
  }

  set idMoneda(_idMoneda: string) {
    this._idMoneda = _idMoneda;
  }

  get serie(): string {
    return this._serie;
  }

  set serie(_serie: string) {
    this._serie = _serie;
  }

  get numeracion(): string {
    return this._numeracion;
  }

  set numeracion(_numeracion: string) {
    this._numeracion = _numeracion;
  }

  get observacion(): string {
    return this._observacion;
  }

  set observacion(_observacion: string) {
    this._observacion = _observacion;
  }

  get nota(): string {
    return this._nota;
  }

  set nota(_nota: string) {
    this._nota = _nota;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get fecha(): string {
    return this._fecha;
  }

  set fecha(_fecha: string) {
    this._fecha = _fecha;
  }

  get hora(): string {
    return this._hora;
  }

  set hora(_hora: string) {
    this._hora = _hora;
  }

  get proveedor(): Person {
    return this._proveedor;
  }

  set proveedor(_proveedor: Person) {
    this._proveedor = _proveedor;
  }

  get comprobante(): Receipt {
    return this._comprobante;
  }

  set comprobante(_comprobante: Receipt) {
    this._comprobante = _comprobante;
  }

  get moneda(): Currency {
    return this._moneda;
  }

  set moneda(_moneda: Currency) {
    this._moneda = _moneda;
  }

  get usuario(): User {
    return this._usuario;
  }

  set usuario(_usuario: User) {
    this._usuario = _usuario;
  }

  get pedidoDetalles(): OrderDetail[] {
    return this._pedidoDetalles;
  }

  set pedidoDetalles(_pedidoDetalles: OrderDetail[]) {
    this._pedidoDetalles = _pedidoDetalles;
  }
}

export default Order;
