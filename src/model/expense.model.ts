import Currency from './currency.model';
import ExpenseDetail from './expense-detail.model';
import Person from './person.model';
import Receipt from './receipt.model';
import User from './user.model';

class Expense {
  private _idGasto: string;
  private _idPersona: string;
  private _idUsuario: string;
  private _idMoneda: string;
  private _idSucursal: string;
  private _idComprobante: string;
  private _serie: string;
  private _numeracion: number;
  private _estado: boolean;
  private _observacion: string;
  private _fecha: string;
  private _hora: string;
  private _proveedor: Person;
  private _comprobante: Receipt;
  private _moneda: Currency;
  private _usuario: User;
  private _gastoDetalles: ExpenseDetail[];

  get idGasto(): string {
    return this._idGasto;
  }

  set idGasto(_idGasto: string) {
    this._idGasto = _idGasto;
  }

  get idPersona(): string {
    return this._idPersona;
  }

  set idPersona(_idPersona: string) {
    this._idPersona = _idPersona;
  }

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
  }

  get idMoneda(): string {
    return this._idMoneda;
  }

  set idMoneda(_idMoneda: string) {
    this._idMoneda = _idMoneda;
  }

  get idSucursal(): string {
    return this._idSucursal;
  }

  set idSucursal(_idSucursal: string) {
    this._idSucursal = _idSucursal;
  }

  get idComprobante(): string {
    return this._idComprobante;
  }

  set idComprobante(_idComprobante: string) {
    this._idComprobante = _idComprobante;
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

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get observacion(): string {
    return this._observacion;
  }

  set observacion(_observacion: string) {
    this._observacion = _observacion;
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

  get gastoDetalles(): ExpenseDetail[] {
    return this._gastoDetalles;
  }

  set gastoDetalles(_gastoDetalles: ExpenseDetail[]) {
    this._gastoDetalles = _gastoDetalles;
  }
}

export default Expense;
