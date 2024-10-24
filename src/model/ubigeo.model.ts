class Ubigeo {
  private _idUbigeo: string;
  private _ubigeo: string;
  private _departamento: string;
  private _provincia: string;
  private _distrito: string;

  get idUbigeo(): string {
    return this._idUbigeo;
  }

  set idUbigeo(_idUbigeo: string) {
    this._idUbigeo = _idUbigeo;
  }

  get ubigeo(): string {
    return this._ubigeo;
  }

  set ubigeo(_ubigeo: string) {
    this._ubigeo = _ubigeo;
  }

  get departamento(): string {
    return this._departamento;
  }

  set departamento(_departamento: string) {
    this._departamento = _departamento;
  }

  get provincia(): string {
    return this._provincia;
  }

  set provincia(_provincia: string) {
    this._provincia = _provincia;
  }

  get distrito(): string {
    return this._distrito;
  }

  set distrito(_distrito: string) {
    this._distrito = _distrito;
  }
}

export default Ubigeo;
