export class Departamento {
  constructor(
    public readonly id: number,
    private _nombre: string,
  ) {}

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }
}
