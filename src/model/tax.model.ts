class Tax {
  private _idImpuesto: string;
  private _nombre: string;
  private _porcentaje: number;
  private _codigo: string;
  private _estado: boolean;
  private _preferido: boolean;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;

  get idImpuesto(): string {
    return this._idImpuesto;
  }

  set idImpuesto(_idImpuesto: string) {
    this._idImpuesto = _idImpuesto;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
  }

  get porcentaje(): number {
    return this._porcentaje;
  }

  set porcentaje(_porcentaje: number) {
    this._porcentaje = _porcentaje;
  }

  get codigo(): string {
    return this._codigo;
  }

  set codigo(_codigo: string) {
    this._codigo = _codigo;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get preferido(): boolean {
    return this._preferido;
  }

  set preferido(_preferido: boolean) {
    this._preferido = _preferido;
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

export default Tax;
