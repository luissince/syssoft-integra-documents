import Ubigeo from './ubigeo.model';

class Catalog {
  private _idCatalogo: string;
  private _pdf_key: string;

  get idCatalogo(): string {
    return this._idCatalogo;
  }

  set idCatalogo(_idCatalogo: string) {
    this._idCatalogo = _idCatalogo;
  }

  get pdf_key(): string {
    return this._pdf_key;
  }

  set pdf_key(_pdf_key: string) {
    this._pdf_key = _pdf_key;
  }
}

export default Catalog;
