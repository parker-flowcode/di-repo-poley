/**
 * Entidad Persona con propiedades privadas
 * y sus getters / setters para acceder a ellas.
 */
export class Persona {
  private _id: string;
  private _nombre: string;
  private _apellidos: string;

  constructor(id: string, nombre: string, apellidos: string) {
    this._id = id;
    this._nombre = nombre;
    this._apellidos = apellidos;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  set apellidos(value: string) {
    this._apellidos = value;
  }

  /** Nombre y apellidos completos. */
  public getFullName(): string {
    return `${this._nombre} ${this._apellidos}`;
  }
}
