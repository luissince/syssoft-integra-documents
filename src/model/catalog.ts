import Ubigeo from './ubigeo.model';

class Catalog {
  private _pdf_key: string;

  get pdf_key(): string {
    return this._pdf_key;
  }

  set pdf_key(_pdf_key: string) {
    this._pdf_key = _pdf_key;
  }
}

export default Catalog;
