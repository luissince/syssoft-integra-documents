class PaymentMethod {
  private _idFormaPago: string;
  private _nombre: string;
  private _descripcion: string;

  get idFormaPago(): string {
    return this._idFormaPago;
  }

  set idFormaPago(_idFormaPago: string) {
    this._idFormaPago = _idFormaPago;
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
}

export default PaymentMethod;
