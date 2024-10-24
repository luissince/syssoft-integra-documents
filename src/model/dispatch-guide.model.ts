import DispatchGuideDetail from './dispatch-guide-detail.model';
import ModeOfTransport from './mode-of-transport.model';
import Person from './person.model';
import ReasonForTransport from './reason-for-transport.model';
import Receipt from './receipt.model';
import Sale from './sale.model';
import TypeOfWeight from './type-of-weight.model';
import Ubigeo from './ubigeo.model';
import Vehicle from './vehicle.model';

class DispatchGuide {
  private _idGuiaRemision: string;
  private _idSucursal: string;
  private _idVenta: string;
  private _idComprobante: string;
  private _serie: string;
  private _numeracion: number;
  private _idModalidadTraslado: string;
  private _idMotivoTraslado: string;
  private _fechaTraslado: string;
  private _idTipoPeso: string;
  private _peso: number;
  private _idVehiculo: string;
  private _idConductor: string;
  private _direccionPartida: string;
  private _idUbigeoPartida: number;
  private _direccionLlegada: string;
  private _idUbigeoLlegada: number;
  private _fecha: string;
  private _hora: string;
  private _estado: boolean;
  private _idUsuario: string;
  private _xmlSunat: string;
  private _xmlDescripcion: string;
  private _codigoHash: string;
  private _xmlGenerado: string;
  private _numeroTicketSunat: string;
  private _venta: Sale;
  private _modalidadTraslado: ModeOfTransport;
  private _motivoTraslado: ReasonForTransport;
  private _tipoPeso: TypeOfWeight;
  private _vehiculo: Vehicle;
  private _conductor: Person;
  private _comprobante: Receipt;
  private _ubigeoPartida: Ubigeo;
  private _ubigeoLlegada: Ubigeo;
  private _guiaRemisionDetalles: DispatchGuideDetail[];

  get idGuiaRemision(): string {
    return this._idGuiaRemision;
  }

  set idGuiaRemision(_idGuiaRemision: string) {
    this._idGuiaRemision = _idGuiaRemision;
  }

  get idSucursal(): string {
    return this._idSucursal;
  }

  set idSucursal(_idSucursal: string) {
    this._idSucursal = _idSucursal;
  }

  get idVenta(): string {
    return this._idVenta;
  }

  set idVenta(_idVenta: string) {
    this._idVenta = _idVenta;
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

  get idModalidadTraslado(): string {
    return this._idModalidadTraslado;
  }

  set idModalidadTraslado(_idModalidadTraslado: string) {
    this._idModalidadTraslado = _idModalidadTraslado;
  }

  get idMotivoTraslado(): string {
    return this._idMotivoTraslado;
  }

  set idMotivoTraslado(_idMotivoTraslado: string) {
    this._idMotivoTraslado = _idMotivoTraslado;
  }

  get fechaTraslado(): string {
    return this._fechaTraslado;
  }

  set fechaTraslado(_fechaTraslado: string) {
    this._fechaTraslado = _fechaTraslado;
  }

  get idTipoPeso(): string {
    return this._idTipoPeso;
  }

  set idTipoPeso(_idTipoPeso: string) {
    this._idTipoPeso = _idTipoPeso;
  }

  get peso(): number {
    return this._peso;
  }

  set peso(_peso: number) {
    this._peso = _peso;
  }

  get idVehiculo(): string {
    return this._idVehiculo;
  }

  set idVehiculo(_idVehiculo: string) {
    this._idVehiculo = _idVehiculo;
  }

  get idConductor(): string {
    return this._idConductor;
  }

  set idConductor(_idConductor: string) {
    this._idConductor = _idConductor;
  }

  get direccionPartida(): string {
    return this._direccionPartida;
  }

  set direccionPartida(_direccionPartida: string) {
    this._direccionPartida = _direccionPartida;
  }

  get idUbigeoPartida(): number {
    return this._idUbigeoPartida;
  }

  set idUbigeoPartida(_idUbigeoPartida: number) {
    this._idUbigeoPartida = _idUbigeoPartida;
  }

  get direccionLlegada(): string {
    return this._direccionLlegada;
  }

  set direccionLlegada(_direccionLlegada: string) {
    this._direccionLlegada = _direccionLlegada;
  }

  get idUbigeoLlegada(): number {
    return this._idUbigeoLlegada;
  }

  set idUbigeoLlegada(_idUbigeoLlegada: number) {
    this._idUbigeoLlegada = _idUbigeoLlegada;
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

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
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

  get xmlGenerado(): string {
    return this._xmlGenerado;
  }

  set xmlGenerado(_xmlGenerado: string) {
    this._xmlGenerado = _xmlGenerado;
  }

  get numeroTicketSunat(): string {
    return this._numeroTicketSunat;
  }

  set numeroTicketSunat(_numeroTicketSunat: string) {
    this._numeroTicketSunat = _numeroTicketSunat;
  }

  get venta(): Sale {
    return this._venta;
  }

  set venta(_venta: Sale) {
    this._venta = _venta;
  }

  get modalidadTraslado(): ModeOfTransport {
    return this._modalidadTraslado;
  }

  set modalidadTraslado(_modalidadTraslado: ModeOfTransport) {
    this._modalidadTraslado = _modalidadTraslado;
  }

  get motivoTraslado(): ReasonForTransport {
    return this._motivoTraslado;
  }

  set motivoTraslado(_motivoTraslado: ReasonForTransport) {
    this._motivoTraslado = _motivoTraslado;
  }

  get tipoPeso(): TypeOfWeight {
    return this._tipoPeso;
  }

  set tipoPeso(_tipoPeso: TypeOfWeight) {
    this._tipoPeso = _tipoPeso;
  }

  get vehiculo(): Vehicle {
    return this._vehiculo;
  }

  set vehiculo(_vehiculo: Vehicle) {
    this._vehiculo = _vehiculo;
  }

  get conductor(): Person {
    return this._conductor;
  }

  set conductor(_conductor: Person) {
    this._conductor = _conductor;
  }

  get comprobante(): Receipt {
    return this._comprobante;
  }

  set comprobante(_comprobante: Receipt) {
    this._comprobante = _comprobante;
  }

  get ubigeoPartida(): Ubigeo {
    return this._ubigeoPartida;
  }

  set ubigeoPartida(_ubigeoPartida: Ubigeo) {
    this._ubigeoPartida = _ubigeoPartida;
  }

  get ubigeoLlegada(): Ubigeo {
    return this._ubigeoLlegada;
  }

  set ubigeoLlegada(_ubigeoLlegada: Ubigeo) {
    this._ubigeoLlegada = _ubigeoLlegada;
  }

  get guiaRemisionDetalles(): DispatchGuideDetail[] {
    return this._guiaRemisionDetalles;
  }

  set guiaRemisionDetalles(_guiaRemisionDetalles: DispatchGuideDetail[]) {
    this._guiaRemisionDetalles = _guiaRemisionDetalles;
  }
}

export default DispatchGuide;
