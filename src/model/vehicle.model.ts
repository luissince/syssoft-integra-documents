class Vehicle {
  private _idVehiculo: string;
  private _marca: string;
  private _numeroPlaca: string;
  private _preferido: boolean;
  private _estado: boolean;
  private _fecha: string;
  private _hora: string;
  private _idUsuario: string;

  get idVehiculo(): string {
    return this._idVehiculo;
  }

  set idVehiculo(_idVehiculo: string) {
    this._idVehiculo = _idVehiculo;
  }

  get marca(): string {
    return this._marca;
  }

  set marca(_marca: string) {
    this._marca = _marca;
  }

  get numeroPlaca(): string {
    return this._numeroPlaca;
  }

  set numeroPlaca(_numeroPlaca: string) {
    this._numeroPlaca = _numeroPlaca;
  }

  get preferido(): boolean {
    return this._preferido;
  }

  set preferido(_preferido: boolean) {
    this._preferido = _preferido;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get fecha(): string {
    return this._fecha;
  }

  set fecha(_fecha: string) {
    this._fecha = _fecha;
  }

  get hora(): string {
    return this._hora;
  }

  set hora(_hora: string) {
    this._hora = _hora;
  }

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
  }
}

export default Vehicle;
