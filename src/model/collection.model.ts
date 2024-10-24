import CollectionDetail from './collection-detail.model';
import Currency from './currency.model';
import Person from './person.model';
import Receipt from './receipt.model';
import User from './user.model';

class Collection {
  private _idCobro: string;
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
  private _cliente: Person;
  private _comprobante: Receipt;
  private _moneda: Currency;
  private _usuario: User;
  private _cobroDetalles: CollectionDetail[];

  get idCobro(): string {
    return this._idCobro;
  }

  set idCobro(_idCobro: string) {
    this._idCobro = _idCobro;
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

  get cobroDetalles(): CollectionDetail[] {
    return this._cobroDetalles;
  }

  set cobroDetalles(_cobroDetalles: CollectionDetail[]) {
    this._cobroDetalles = _cobroDetalles;
  }
}

export default Collection;
