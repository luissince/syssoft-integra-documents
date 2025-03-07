import Concept from './concept.model';

class ExpenseDetail {
  private _id: number;
  private _idCobroDetalle: number;
  private _idCobro: string;
  private _idConcepto: string;
  private _cantidad: number;
  private _monto: number;
  private _concepto: Concept;

  get id(): number {
    return this._id;
  }

  set id(_id: number) {
    this._id = _id;
  }

  get idCobroDetalle(): number {
    return this._idCobroDetalle;
  }

  set idCobroDetalle(_idCobroDetalle: number) {
    this._idCobroDetalle = _idCobroDetalle;
  }

  get idCobro(): string {
    return this._idCobro;
  }

  set idCobro(_idCobro: string) {
    this._idCobro = _idCobro;
  }

  get idConcepto(): string {
    return this._idConcepto;
  }

  set idConcepto(_idConcepto: string) {
    this._idConcepto = _idConcepto;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  set cantidad(_cantidad: number) {
    this._cantidad = _cantidad;
  }

  get monto(): number {
    return this._monto;
  }

  set monto(_monto: number) {
    this._monto = _monto;
  }

  get concepto(): Concept {
    return this._concepto;
  }

  set concepto(_concepto: Concept) {
    this._concepto = _concepto;
  }
}

export default ExpenseDetail;
