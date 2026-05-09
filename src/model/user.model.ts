import Person from "./person.model";

class User {
  public idUsuario: string;
  public idPersona: string;
  public idPerfil: string;
  public estado: boolean;
  public login: boolean;
  public usuario: string;
  public clave: string;
  public fecha: string;
  public hora: string;
  public fupdate: string;
  public hupdate: string;

  public persona: Person;
}

export default User;
