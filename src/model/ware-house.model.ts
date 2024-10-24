class WareHouse {
  private _idAlmacen: string;
  private _idSucursal: string;
  private _nombre: string;
  private _direccion: string;
  private _idUbigeo: number;
  private _codigoSunat: string;
  private _observacion: string;
  private _predefinido: boolean;
  private _fecha: string;
  private _hora: string;
  private _idUsuario: string;

  get idAlmacen(): string {
    return this._idAlmacen;
  }

  set idAlmacen(value: string) {
    this._idAlmacen = value;
  }

  get idSucursal(): string {
    return this._idSucursal;
  }

  set idSucursal(value: string) {
    this._idSucursal = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get direccion(): string {
    return this._direccion;
  }

  set direccion(value: string) {
    this._direccion = value;
  }

  get idUbigeo(): number {
    return this._idUbigeo;
  }

  set idUbigeo(value: number) {
    this._idUbigeo = value;
  }

  get codigoSunat(): string {
    return this._codigoSunat;
  }

  set codigoSunat(value: string) {
    this._codigoSunat = value;
  }

  get observacion(): string {
    return this._observacion;
  }

  set observacion(value: string) {
    this._observacion = value;
  }

  get predefinido(): boolean {
    return this._predefinido;
  }

  set predefinido(value: boolean) {
    this._predefinido = value;
  }

  get fecha(): string {
    return this._fecha;
  }

  set fecha(value: string) {
    this._fecha = value;
  }

  get hora(): string {
    return this._hora;
  }

  set hora(value: string) {
    this._hora = value;
  }

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(value: string) {
    this._idUsuario = value;
  }
}

export default WareHouse;
