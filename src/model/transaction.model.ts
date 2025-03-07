class Transaction {
  private _idTransaccion: string;
  private _idConcepto: string;
  private _idReferencia: string;
  private _nota: string;
  private _estado: string;
  private _fecha: string;
  private _hora: string;
  private _idUsuario: string;

  get idTransaccion(): string {
    return this._idTransaccion;
  }

  set idTransaccion(value: string) {
    this._idTransaccion = value;
  }

  get idConcepto(): string {
    return this._idConcepto;
  }

  set idConcepto(value: string) {
    this._idConcepto = value;
  }

  get idReferencia(): string {
    return this._idReferencia;
  }

  set idReferencia(value: string) {
    this._idReferencia = value;
  }

  get nota(): string {
    return this._nota;
  }

  set nota(value: string) {
    this._nota = value;
  }

  get estado(): string {
    return this._estado;
  }

  set estado(value: string) {
    this._estado = value;
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

export default Transaction;
