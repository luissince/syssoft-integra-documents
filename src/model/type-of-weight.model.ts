class TypeOfWeight {
  private _idTipoPeso: string;
  private _codigo: string;
  private _nombre: string;

  get idTipoPeso(): string {
    return this._idTipoPeso;
  }

  set idTipoPeso(_idTipoPeso: string) {
    this._idTipoPeso = _idTipoPeso;
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

export default TypeOfWeight;