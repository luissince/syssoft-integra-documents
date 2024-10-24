class Currency {
  private _idMoneda: string;
  private _nombre: string;
  private _codiso: string;
  private _simbolo: string;
  private _estado: boolean;
  private _nacional: boolean;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;

  get idMoneda(): string {
    return this._idMoneda;
  }

  set idMoneda(_idMoneda: string) {
    this._idMoneda = _idMoneda;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
  }

  get codiso(): string {
    return this._codiso;
  }

  set codiso(_codiso: string) {
    this._codiso = _codiso;
  }

  get simbolo(): string {
    return this._simbolo;
  }

  set simbolo(_simbolo: string) {
    this._simbolo = _simbolo;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get nacional(): boolean {
    return this._nacional;
  }

  set nacional(_nacional: boolean) {
    this._nacional = _nacional;
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

export default Currency;
