class Concept {
  private _idConcepto: string;
  private _nombre: string;
  private _tipo: string;
  private _codigo: string;
  private _sistema: string;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;

  get idConcepto(): string {
    return this._idConcepto;
  }

  set idConcepto(_idConcepto: string) {
    this._idConcepto = _idConcepto;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
  }

  get tipo(): string {
    return this._tipo;
  }

  set tipo(_tipo: string) {
    this._tipo = _tipo;
  }

  get codigo(): string {
    return this._codigo;
  }

  set codigo(_codigo: string) {
    this._codigo = _codigo;
  }

  get sistema(): string {
    return this._sistema;
  }

  set sistema(_sistema: string) {
    this._sistema = _sistema;
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
}

export default Concept;
