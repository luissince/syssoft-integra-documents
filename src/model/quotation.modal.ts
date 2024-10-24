import Currency from './currency.model';
import Person from './person.model';
import QuotationDetail from './quotation-detail.modal';
import Receipt from './receipt.model';
import User from './user.model';

class Quotation {
  private _idCotizacion: string;
  private _idCliente: string;
  private _idUsuario: string;
  private _idComprobante: string;
  private _idSucursal: string;
  private _idMoneda: string;
  private _serie: string;
  private _numeracion: number;
  private _observacion: string;
  private _nota: string;
  private _estado: boolean;
  private _fecha: string;
  private _hora: string;
  private _cliente: Person;
  private _comprobante: Receipt;
  private _moneda: Currency;
  private _usuario: User;
  private _cotizacionDetalles: QuotationDetail[];

  get idCotizacion(): string {
    return this._idCotizacion;
  }

  set idCotizacion(_idCotizacion: string) {
    this._idCotizacion = _idCotizacion;
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

  get usuario(): User {
    return this._usuario;
  }

  set usuario(_usuario: User) {
    this._usuario = _usuario;
  }

  get cotizacionDetalles(): QuotationDetail[] {
    return this._cotizacionDetalles;
  }

  set cotizacionDetalles(_cotizacionDetalles: QuotationDetail[]) {
    this._cotizacionDetalles = _cotizacionDetalles;
  }
}

export default Quotation;
