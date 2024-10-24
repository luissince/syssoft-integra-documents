class User {
  private _idUsuario: string;
  private _nombres: string;
  private _apellidos: string;
  private _dni: string;
  private _genero: string;
  private _direccion: string;
  private _telefono: string;
  private _email: string;
  private _idPerfil: string;
  private _representante: string;
  private _estado: boolean;
  private _login: boolean;
  private _usuario: string;
  private _clave: string;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
  }

  get nombres(): string {
    return this._nombres;
  }

  set nombres(_nombres: string) {
    this._nombres = _nombres;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  set apellidos(_apellidos: string) {
    this._apellidos = _apellidos;
  }

  get dni(): string {
    return this._dni;
  }

  set dni(_dni: string) {
    this._dni = _dni;
  }

  get genero(): string {
    return this._genero;
  }

  set genero(_genero: string) {
    this._genero = _genero;
  }

  get direccion(): string {
    return this._direccion;
  }

  set direccion(_direccion: string) {
    this._direccion = _direccion;
  }

  get telefono(): string {
    return this._telefono;
  }

  set telefono(_telefono: string) {
    this._telefono = _telefono;
  }

  get email(): string {
    return this._email;
  }

  set email(_email: string) {
    this._email = _email;
  }

  get idPerfil(): string {
    return this._idPerfil;
  }

  set idPerfil(_idPerfil: string) {
    this._idPerfil = _idPerfil;
  }

  get representante(): string {
    return this._representante;
  }

  set representante(_representante: string) {
    this._representante = _representante;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(_estado: boolean) {
    this._estado = _estado;
  }

  get login(): boolean {
    return this._login;
  }

  set login(_login: boolean) {
    this._login = _login;
  }

  get usuario(): string {
    return this._usuario;
  }

  set usuario(_usuario: string) {
    this._usuario = _usuario;
  }

  get clave(): string {
    return this._clave;
  }

  set clave(_clave: string) {
    this._clave = _clave;
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

  get fupdate(): string {
    return this._fupdate;
  }

  set fupdate(_fupdate: string) {
    this._fupdate = _fupdate;
  }

  get hupdate(): string {
    return this._hupdate;
  }

  set hupdate(_hupdate: string) {
    this._hupdate = _hupdate;
  }
}

export default User;
