class ReasonForTransport {
  private _idMotivoTraslado: string;
  private _codigo: string;
  private _nombre: string;

  get idMotivoTraslado(): string {
    return this._idMotivoTraslado;
  }

  set idMotivoTraslado(_idMotivoTraslado: string) {
    this._idMotivoTraslado = _idMotivoTraslado;
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

export default ReasonForTransport;
