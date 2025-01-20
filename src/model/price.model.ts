class Price {
  private _idPrecio: string;
  private _idProducto: string;
  private _nombre: string;
  private _valor: number;
  private _preferido: boolean;

  get idPrecio(): string {
    return this._idPrecio;
  }

  set idPrecio(value: string) {
    this._idPrecio = value;
  }

  get idProducto(): string {
    return this._idProducto;
  }

  set idProducto(value: string) {
    this._idProducto = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get valor(): number {
    return this._valor;
  }

  set valor(value: number) {
    this._valor = value;
  }

  get preferido(): boolean {
    return this._preferido;
  }

  set preferido(value: boolean) {
    this._preferido = value;
  }
}

export default Price;
