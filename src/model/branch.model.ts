import Ubigeo from './ubigeo.model';

class Branch {
  private _idSucursal: string;
  private _nombre: string;
  private _telefono: string;
  private _celular: string;
  private _email: string;
  private _paginaWeb: string;
  private _direccion: string;
  private _idUbigeo: number;
  private _ruta: string;
  private _estado: boolean;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;
  private _ubigeo: Ubigeo;

  get idSucursal(): string {
    return this._idSucursal;
  }

  set idSucursal(_idSucursal: string) {
    this._idSucursal = _idSucursal;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
  }

  get telefono(): string {
    return this._telefono;
  }

  set telefono(_telefono: string) {
    this._telefono = _telefono;
  }

  get celular(): string {
    return this._celular;
  }

  set celular(_celular: string) {
    this._celular = _celular;
  }

  get email(): string {
    return this._email;
  }

  set email(_email: string) {
    this._email = _email;
  }

  get paginaWeb(): string {
    return this._paginaWeb;
  }

  set paginaWeb(_paginaWeb: string) {
    this._paginaWeb = _paginaWeb;
  }

  get direccion(): string {
    return this._direccion;
  }

  set direccion(_direccion: string) {
    this._direccion = _direccion;
  }

  get idUbigeo(): number {
    return this._idUbigeo;
  }

  set idUbigeo(_idUbigeo: number) {
    this._idUbigeo = _idUbigeo;
  }

  get ruta(): string {
    return this._ruta;
  }

  set ruta(_ruta: string) {
    this._ruta = _ruta;
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

  get ubigeo(): Ubigeo {
    return this._ubigeo;
  }

  set ubigeo(_ubigeo: Ubigeo) {
    this._ubigeo = _ubigeo;
  }
}

export default Branch;
