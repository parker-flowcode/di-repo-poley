import { Departamento } from '../Models/Entities/Departamento';
import { Persona } from '../Models/Entities/Persona';
import { RepositoryDepartamento } from '../Models/Data/RepositoryDepartamento';
import { RepositoryPersonas } from '../Models/Data/RepositoryPersonas';

export class DeptViewModel {
  private _listarDepartamentos: Departamento[];
  private _listadoPersonasPorDepartamento: Persona[] = [];
  private _numeroPersonasPorDepartamento = 0;
  private _departamentoSeleccionado: Departamento | null;

  constructor() {
    const departamentos = RepositoryDepartamento.getListadoCompletoDepartamentos();
    this._listarDepartamentos = Array.isArray(departamentos)
      ? departamentos.filter(
          (departamento) =>
            departamento instanceof Departamento &&
            Number.isInteger(departamento.id) &&
            departamento.id > 0 &&
            typeof departamento.nombre === 'string' &&
            departamento.nombre.trim().length > 0,
        )
      : [];
    this._departamentoSeleccionado = null;
    if (this._listarDepartamentos.length > 0) {
      this._departamentoSeleccionado = this._listarDepartamentos[0];
    }
    this.rellenarListadoDePersonas();
    this.calcularNumeroPersonas();
  }

  get listarDepartamentos(): Departamento[] {
    return this._listarDepartamentos;
  }

  get listadoPersonasPorDepartamento(): Persona[] {
    return this._listadoPersonasPorDepartamento;
  }

  get numeroPersonasPorDepartamento(): number {
    return this._numeroPersonasPorDepartamento;
  }

  get departamentoSeleccionado(): Departamento | null {
    return this._departamentoSeleccionado;
  }

  public getNumeroPersonasPorDept(idDept: number): number {
    if (!Number.isInteger(idDept) || idDept <= 0) return 0;
    return RepositoryPersonas.getListadoPersonasPorDept(idDept).length;
  }

  set departamentoSeleccionado(value: Departamento | null) {
    this._departamentoSeleccionado = value instanceof Departamento && typeof value.nombre === 'string'
      ? this._listarDepartamentos.find(
          (departamento) => departamento.id === value.id && value.nombre.trim().length > 0,
        ) ?? null
      : null;
    this.rellenarListadoDePersonas();
    this.calcularNumeroPersonas();
  }

  private rellenarListadoDePersonas(): void {
    this._listadoPersonasPorDepartamento = this._departamentoSeleccionado
      ? RepositoryPersonas.getListadoPersonasPorDept(this._departamentoSeleccionado.id)
      : [];
  }

  private calcularNumeroPersonas(): void {
    this._numeroPersonasPorDepartamento = this._listadoPersonasPorDepartamento.length;
  }
}
