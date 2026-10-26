export class Persona {
  constructor(
    public readonly id: number,
    private _nombre: string,
    private _idDept: number,
  ) {}

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get idDept(): number {
    return this._idDept;
  }

  set idDept(value: number) {
    this._idDept = value;
  }
}
