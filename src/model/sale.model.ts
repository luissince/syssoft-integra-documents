import Currency from './currency.model';
import PaymentMethod from './payment-method.model';
import Person from './person.model';
import Receipt from './receipt.model';
import SaleDetail from './sale-detail.model';
import User from './user.model';

class Sale {
  private _idVenta: string;
  private _idCliente: string;
  private _idUsuario: string;
  private _idComprobante: string;
  private _idSucursal: string;
  private _idMoneda: string;
  private _serie: string;
  private _numeracion: number;
  private _comentario: string;
  private _idFormaPago: string;
  private _numeroCuota: number;
  private _frecuenciaPago: string;
  private _estado: boolean;
  private _fecha: string;
  private _hora: string;
  private _xmlSunat: string;
  private _xmlDescripcion: string;
  private _codigoHash: string;
  private _correlativo: number;
  private _fechaCorrelativo: string;
  private _xmlGenerado: string;
  private _xmlRespuesta: string;
  private _ticketConsultaSunat: string;
  private _cliente: Person;
  private _comprobante: Receipt;
  private _moneda: Currency;
  private _formaPago: PaymentMethod;
  private _usuario: User;
  private _ventaDetalles: SaleDetail[];

  get idVenta(): string {
    return this._idVenta;
  }

  set idVenta(_idVenta: string) {
    this._idVenta = _idVenta;
  }

  get idCliente(): string {
    return this._idCliente;
  }

  set idCliente(_idCliente: string) {
    this._idCliente = _idCliente;
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

  get numeracion(): number {
    return this._numeracion;
  }

  set numeracion(_numeracion: number) {
    this._numeracion = _numeracion;
  }

  get comentario(): string {
    return this._comentario;
  }

  set comentario(_comentario: string) {
    this._comentario = _comentario;
  }

  get idFormaPago(): string {
    return this._idFormaPago;
  }

  set idFormaPago(_idFormaPago: string) {
    this._idFormaPago = _idFormaPago;
  }

  get numeroCuota(): number {
    return this._numeroCuota;
  }

  set numeroCuota(_numeroCuota: number) {
    this._numeroCuota = _numeroCuota;
  }

  get frecuenciaPago(): string {
    return this._frecuenciaPago;
  }

  set frecuenciaPago(_frecuenciaPago: string) {
    this._frecuenciaPago = _frecuenciaPago;
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

  get xmlSunat(): string {
    return this._xmlSunat;
  }

  set xmlSunat(_xmlSunat: string) {
    this._xmlSunat = _xmlSunat;
  }

  get xmlDescripcion(): string {
    return this._xmlDescripcion;
  }

  set xmlDescripcion(_xmlDescripcion: string) {
    this._xmlDescripcion = _xmlDescripcion;
  }

  get codigoHash(): string {
    return this._codigoHash;
  }

  set codigoHash(_codigoHash: string) {
    this._codigoHash = _codigoHash;
  }

  get correlativo(): number {
    return this._correlativo;
  }

  set correlativo(_correlativo: number) {
    this._correlativo = _correlativo;
  }

  get fechaCorrelativo(): string {
    return this._fechaCorrelativo;
  }

  set fechaCorrelativo(_fechaCorrelativo: string) {
    this._fechaCorrelativo = _fechaCorrelativo;
  }

  get xmlGenerado(): string {
    return this._xmlGenerado;
  }

  set xmlGenerado(_xmlGenerado: string) {
    this._xmlGenerado = _xmlGenerado;
  }

  get xmlRespuesta(): string {
    return this._xmlRespuesta;
  }

  set xmlRespuesta(_xmlRespuesta: string) {
    this._xmlRespuesta = _xmlRespuesta;
  }

  get ticketConsultaSunat(): string {
    return this._ticketConsultaSunat;
  }

  set ticketConsultaSunat(_ticketConsultaSunat: string) {
    this._ticketConsultaSunat = _ticketConsultaSunat;
  }

  get cliente(): Person {
    return this._cliente;
  }

  set cliente(_cliente: Person) {
    this._cliente = _cliente;
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

  get formaPago(): PaymentMethod {
    return this._formaPago;
  }

  set formaPago(_formaPago: PaymentMethod) {
    this._formaPago = _formaPago;
  }

  get usuario(): User {
    return this._usuario;
  }

  set usuario(_usuario: User) {
    this._usuario = _usuario;
  }

  get ventaDetalles(): SaleDetail[] {
    return this._ventaDetalles;
  }

  set ventaDetalles(_ventaDetalles: SaleDetail[]) {
    this._ventaDetalles = _ventaDetalles;
  }
}

export default Sale;
