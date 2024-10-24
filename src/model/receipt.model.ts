class Receipt {
  private _idComprobante: string;
  private _idSucursal: string;
  private _idTipoComprobante: string;
  private _nombre: string;
  private _serie: string;
  private _numeracion: number;
  private _codigo: string;
  private _impresion: string;
  private _estado: boolean;
  private _preferida: boolean;
  private _numeroCampo: number;
  private _facturado: boolean;
  private _anulacion: number;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;

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

  get idTipoComprobante(): string {
    return this._idTipoComprobante;
  }

  set idTipoComprobante(_idTipoComprobante: string) {
    this._idTipoComprobante = _idTipoComprobante;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
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

  get codigo(): string {
    return this._codigo;
  }

  set codigo(_codigo: string) {
    this._codigo = _codigo;
  }

  get impresion(): string {
    return this._impresion;
  }

  set impresion(_impresion: string) {
    this._impresion = _impresion;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get preferida(): boolean {
    return this._preferida;
  }

  set preferida(_preferida: boolean) {
    this._preferida = _preferida;
  }

  get numeroCampo(): number {
    return this._numeroCampo;
  }

  set numeroCampo(_numeroCampo: number) {
    this._numeroCampo = _numeroCampo;
  }

  get facturado(): boolean {
    return this._facturado;
  }

  set facturado(_facturado: boolean) {
    this._facturado = _facturado;
  }

  get anulacion(): number {
    return this._anulacion;
  }

  set anulacion(_anulacion: number) {
    this._anulacion = _anulacion;
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

export default Receipt;
