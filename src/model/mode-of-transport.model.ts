class ModeOfTransport {
  private _idModalidadTraslado: string;
  private _codigo: string;
  private _nombre: string;

  get idModalidadTraslado(): string {
    return this._idModalidadTraslado;
  }

  set idModalidadTraslado(_idModalidadTraslado: string) {
    this._idModalidadTraslado = _idModalidadTraslado;
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
}

export default ModeOfTransport;
