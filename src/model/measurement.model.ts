class Measurement {
  private _idMedida: string;
  private _codigo: string;
  private _nombre: string;
  private _descripcion: string;
  private _estado: boolean;
  private _preferida: boolean;
  private _fecha: string;
  private _hora: string;
  private _idUsuario: string;

  get idMedida(): string {
    return this._idMedida;
  }

  set idMedida(_idMedida: string) {
    this._idMedida = _idMedida;
  }

  get codigo(): string {
    return this._codigo;
  }

  set codigo(_codigo: string) {
    this._codigo = _codigo;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(_nombre: string) {
    this._nombre = _nombre;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(_descripcion: string) {
    this._descripcion = _descripcion;
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

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
  }
}

export default Measurement;
