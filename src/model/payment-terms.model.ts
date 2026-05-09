class PaymentTerms {
    private _idPlazo: string;
    private _nombre: string;
    private _dias: number;

    get idPlazo(): string {
        return this._idPlazo;
    }

    set idPlazo(_idPlazo: string) {
        this._idPlazo = _idPlazo;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(_nombre: string) {
        this._nombre = _nombre;
    }

    get dias(): number {
        return this._dias;
    }

    set dias(_dias: number) {
        this._dias = _dias;
    }
}

export default PaymentTerms;