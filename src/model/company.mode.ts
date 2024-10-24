class Company {
  private _idEmpresa: string;
  private _idTipoDocumento: string;
  private _documento: string;
  private _razonSocial: string;
  private _nombreEmpresa: string;
  private _rutaLogo: string | null;
  private _rutaImage: string;
  private _usuarioEmail: string;
  private _claveEmail: string;
  private _usuarioSolSunat: string;
  private _claveSolSunat: string;
  private _certificadoSunat: string;
  private _claveCertificadoSunat: string;
  private _certificadoPem: string;
  private _privatePem: string;
  private _idApiSunat: string;
  private _claveApiSunat: string;
  private _tipoEnvio: boolean;
  private _fecha: string;
  private _hora: string;
  private _fupdate: string;
  private _hupdate: string;
  private _idUsuario: string;

  get idEmpresa(): string {
    return this._idEmpresa;
  }

  set idEmpresa(_idEmpresa: string) {
    this._idEmpresa = _idEmpresa;
  }

  get idTipoDocumento(): string {
    return this._idTipoDocumento;
  }

  set idTipoDocumento(_idTipoDocumento: string) {
    this._idTipoDocumento = _idTipoDocumento;
  }

  get documento(): string {
    return this._documento;
  }

  set documento(_documento: string) {
    this._documento = _documento;
  }

  get razonSocial(): string {
    return this._razonSocial;
  }

  set razonSocial(_razonSocial: string) {
    this._razonSocial = _razonSocial;
  }

  get nombreEmpresa(): string {
    return this._nombreEmpresa;
  }

  set nombreEmpresa(_nombreEmpresa: string) {
    this._nombreEmpresa = _nombreEmpresa;
  }

  get rutaLogo(): string {
    return this._rutaLogo;
  }

  set rutaLogo(_rutaLogo: string) {
    this._rutaLogo = _rutaLogo;
  }

  get rutaImage(): string {
    return this._rutaImage;
  }

  set rutaImage(_rutaImage: string) {
    this._rutaImage = _rutaImage;
  }

  get usuarioEmail(): string {
    return this._usuarioEmail;
  }

  set usuarioEmail(_usuarioEmail: string) {
    this._usuarioEmail = _usuarioEmail;
  }

  get claveEmail(): string {
    return this._claveEmail;
  }

  set claveEmail(_claveEmail: string) {
    this._claveEmail = _claveEmail;
  }

  get usuarioSolSunat(): string {
    return this._usuarioSolSunat;
  }

  set usuarioSolSunat(_usuarioSolSunat: string) {
    this._usuarioSolSunat = _usuarioSolSunat;
  }

  get claveSolSunat(): string {
    return this._claveSolSunat;
  }

  set claveSolSunat(_claveSolSunat: string) {
    this._claveSolSunat = _claveSolSunat;
  }

  get certificadoSunat(): string {
    return this._certificadoSunat;
  }

  set certificadoSunat(_certificadoSunat: string) {
    this._certificadoSunat = _certificadoSunat;
  }

  get claveCertificadoSunat(): string {
    return this._claveCertificadoSunat;
  }

  set claveCertificadoSunat(_claveCertificadoSunat: string) {
    this._claveCertificadoSunat = _claveCertificadoSunat;
  }

  get certificadoPem(): string {
    return this._certificadoPem;
  }

  set certificadoPem(_certificadoPem: string) {
    this._certificadoPem = _certificadoPem;
  }

  get privatePem(): string {
    return this._privatePem;
  }

  set privatePem(_privatePem: string) {
    this._privatePem = _privatePem;
  }

  get idApiSunat(): string {
    return this._idApiSunat;
  }

  set idApiSunat(_idApiSunat: string) {
    this._idApiSunat = _idApiSunat;
  }

  get claveApiSunat(): string {
    return this._claveApiSunat;
  }

  set claveApiSunat(_claveApiSunat: string) {
    this._claveApiSunat = _claveApiSunat;
  }

  get tipoEnvio(): boolean {
    return this._tipoEnvio;
  }

  set tipoEnvio(_tipoEnvio: boolean) {
    this._tipoEnvio = _tipoEnvio;
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

  get idUsuario(): string {
    return this._idUsuario;
  }

  set idUsuario(_idUsuario: string) {
    this._idUsuario = _idUsuario;
  }
}

export default Company;
