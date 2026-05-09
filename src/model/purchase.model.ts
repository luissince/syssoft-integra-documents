import Currency from './currency.model';
import PaymentMethod from './payment-method.model';
import PaymentTerms from './payment-terms.model';
import Person from './person.model';
import PurchaseDetail from './purchase-detail.model';
import Receipt from './receipt.model';
import User from './user.model';
import WareHouse from './ware-house.model';

class Purchase {
  private _idCompra: string;
  private _idProveedor: string;
  private _idUsuario: string;
  private _idComprobante: string;
  private _idSucursal: string;
  private _idMoneda: string;
  private _idAlmacen: string;
  private _serie: string;
  private _numeracion: number;
  private _idFormaPago: string;
  private _idPlazo: string;
  private _fechaVencimiento: string;
  private _observacion: string;
  private _nota: string;
  private _estado: boolean;
  private _fecha: string;
  private _hora: string;
  private _proveedor: Person;
  private _comprobante: Receipt;
  private _almacen: WareHouse;
  private _moneda: Currency;
  private _formaPago: PaymentMethod;
  private _plazo: PaymentTerms;
  private _usuario: User;
  private _compraDetalles: PurchaseDetail[];

  get idCompra(): string {
    return this._idCompra;
  }

  set idCompra(value: string) {
    this._idCompra = value;
  }

  get idProveedor(): string {
    return this._idProveedor;
  }

  set idProveedor(value: string) {
    this._idProveedor = value;
  }

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(value: string) {
    this._idUsuario = value;
  }

  get idComprobante(): string {
    return this._idComprobante;
  }

  set idComprobante(value: string) {
    this._idComprobante = value;
  }

  get idSucursal(): string {
    return this._idSucursal;
  }

  set idSucursal(value: string) {
    this._idSucursal = value;
  }

  get idMoneda(): string {
    return this._idMoneda;
  }

  set idMoneda(value: string) {
    this._idMoneda = value;
  }

  get idAlmacen(): string {
    return this._idAlmacen;
  }

  set idAlmacen(value: string) {
    this._idAlmacen = value;
  }

  get serie(): string {
    return this._serie;
  }

  set serie(value: string) {
    this._serie = value;
  }

  get numeracion(): number {
    return this._numeracion;
  }

  set numeracion(value: number) {
    this._numeracion = value;
  }

  get idFormaPago(): string {
    return this._idFormaPago;
  }

  set idFormaPago(value: string) {
    this._idFormaPago = value;
  }

  get idPlazo(): string {
    return this._idPlazo;
  }

  set idPlazo(value: string) {
    this._idPlazo = value;
  }

  get fechaVencimiento(): string {
    return this._fechaVencimiento;
  }

  set fechaVencimiento(value: string) {
    this._fechaVencimiento = value;
  }

  get observacion(): string {
    return this._observacion;
  }

  set observacion(value: string) {
    this._observacion = value;
  }

  get nota(): string {
    return this._nota;
  }

  set nota(value: string) {
    this._nota = value;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(value: boolean) {
    this._estado = value;
  }

  get fecha(): string {
    return this._fecha;
  }

  set fecha(value: string) {
    this._fecha = value;
  }

  get hora(): string {
    return this._hora;
  }

  set hora(value: string) {
    this._hora = value;
  }

  get proveedor(): Person {
    return this._proveedor;
  }

  set proveedor(value: Person) {
    this._proveedor = value;
  }

  get comprobante(): Receipt {
    return this._comprobante;
  }

  set comprobante(value: Receipt) {
    this._comprobante = value;
  }

  get almacen(): WareHouse {
    return this._almacen;
  }

  set almacen(value: WareHouse) {
    this._almacen = value;
  }

  get moneda(): Currency {
    return this._moneda;
  }

  set moneda(value: Currency) {
    this._moneda = value;
  }

  get formaPago(): PaymentMethod {
    return this._formaPago;
  }

  set formaPago(value: PaymentMethod) {
    this._formaPago = value;
  }

  get plazo(): PaymentTerms {
    return this._plazo;
  }

  set plazo(value: PaymentTerms) {
    this._plazo = value;
  }

  get usuario(): User {
    return this._usuario;
  }

  set usuario(value: User) {
    this._usuario = value;
  }

  get compraDetalles(): PurchaseDetail[] {
    return this._compraDetalles;
  }

  set compraDetalles(value: PurchaseDetail[]) {
    this._compraDetalles = value;
  }
}

export default Purchase;
