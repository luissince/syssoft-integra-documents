import Measurement from './measurement.model';
import Price from './price.model';

class Product {
  private _idProducto: string;
  private _idCategoria: string;
  private _idMedida: string;
  private _idMarca: string;
  private _nombre: string;
  private _codigo: string;
  private _idCodigoSunat: string;
  private _descripcionCorta: string;
  private _descripcionLarga: string;
  private _idTipoTratamientoProducto: string;
  private _costo: number;
  private _idTipoProducto: string;
  private _publicar: boolean;
  private _negativo: boolean;
  private _preferido: boolean;
  private _estado: boolean;
  private _imagen: string;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;
  private _medida: Measurement;
  private _precios: Price[];

  get idProducto(): string {
    return this._idProducto;
  }

  set idProducto(_idProducto: string) {
    this._idProducto = _idProducto;
  }

  get idCategoria(): string {
    return this._idCategoria;
  }

  set idCategoria(_idCategoria: string) {
    this._idCategoria = _idCategoria;
  }

  get idMedida(): string {
    return this._idMedida;
  }

  set idMedida(_idMedida: string) {
    this._idMedida = _idMedida;
  }

  get idMarca(): string {
    return this._idMarca;
  }

  set idMarca(_idMarca: string) {
    this._idMarca = _idMarca;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
  }

  get codigo(): string {
    return this._codigo;
  }

  set codigo(_codigo: string) {
    this._codigo = _codigo;
  }

  get idCodigoSunat(): string {
    return this._idCodigoSunat;
  }

  set idCodigoSunat(_idCodigoSunat: string) {
    this._idCodigoSunat = _idCodigoSunat;
  }

  get descripcionCorta(): string {
    return this._descripcionCorta;
  }

  set descripcionCorta(_descripcionCorta: string) {
    this._descripcionCorta = _descripcionCorta;
  }

  get descripcionLarga(): string {
    return this._descripcionLarga;
  }

  set descripcionLarga(_descripcionLarga: string) {
    this._descripcionLarga = _descripcionLarga;
  }

  get idTipoTratamientoProducto(): string {
    return this._idTipoTratamientoProducto;
  }

  set idTipoTratamientoProducto(_idTipoTratamientoProducto: string) {
    this._idTipoTratamientoProducto = _idTipoTratamientoProducto;
  }

  get costo(): number {
    return this._costo;
  }

  set costo(_costo: number) {
    this._costo = _costo;
  }

  get idTipoProducto(): string {
    return this._idTipoProducto;
  }

  set idTipoProducto(_idTipoProducto: string) {
    this._idTipoProducto = _idTipoProducto;
  }

  get publicar(): boolean {
    return this._publicar;
  }

  set publicar(_publicar: boolean) {
    this._publicar = _publicar;
  }

  get negativo(): boolean {
    return this._negativo;
  }

  set negativo(_negativo: boolean) {
    this._negativo = _negativo;
  }

  get preferido(): boolean {
    return this._preferido;
  }

  set preferido(_preferido: boolean) {
    this._preferido = _preferido;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get imagen(): string {
    return this._imagen;
  }

  set imagen(_imagen: string) {
    this._imagen = _imagen;
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

  get fupdate(): string {
    return this._fupdate;
  }

  set fupdate(_fupdate: string) {
    this._fupdate = _fupdate;
  }

  get hupdate(): string {
    return this._hupdate;
  }

  set hupdate(_hupdate: string) {
    this._hupdate = _hupdate;
  }

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
  }

  get medida(): Measurement {
    return this._medida;
  }

  set medida(_medida: Measurement) {
    this._medida = _medida;
  }

  get precios(): Price[] {
    return this._precios;
  }

  set precios(_precios: Price[]) {
    this._precios = _precios;
  }
}

export default Product;
