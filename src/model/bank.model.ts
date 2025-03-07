class Bank {
  private _idBanco: string;
  private _nombre: string;
  private _tipoCuenta: string;
  private _idMoneda: string;
  private _numCuenta: string;
  private _idSucursal: string;
  private _cci: string;
  private _preferido: string;
  private _saldo: string;
  private _reporte: string;
  private _estado: string;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;

  get idBanco(): string {
    return this._idBanco;
  }

  set idBanco(_idBanco: string) {
    this._idBanco = _idBanco;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
  }

  get tipoCuenta(): string {
    return this._tipoCuenta;
  }

  set tipoCuenta(_tipoCuenta: string) {
    this._tipoCuenta = _tipoCuenta;
  }

  get idMoneda(): string {
    return this._idMoneda;
  }

  set idMoneda(_idMoneda: string) {
    this._idMoneda = _idMoneda;
  }

  get numCuenta(): string {
    return this._numCuenta;
  }

  set numCuenta(_numCuenta: string) {
    this._numCuenta = _numCuenta;
  }

  get idSucursal(): string {
    return this._idSucursal;
  }

  set idSucursal(_idSucursal: string) {
    this._idSucursal = _idSucursal;
  }

  get cci(): string {
    return this._cci;
  }

  set cci(_cci: string) {
    this._cci = _cci;
  }

  get preferido(): string {
    return this._preferido;
  }

  set preferido(_preferido: string) {
    this._preferido = _preferido;
  }

  get saldo(): string {
    return this._saldo;
  }

  set saldo(_vuelto: string) {
    this._saldo = _vuelto;
  }

  get reporte(): string {
    return this._reporte;
  }

  set reporte(_reporte: string) {
    this._reporte = _reporte;
  }

  get estado(): string {
    return this._estado;
  }

  set estado(_estado: string) {
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
}

export default Bank;
