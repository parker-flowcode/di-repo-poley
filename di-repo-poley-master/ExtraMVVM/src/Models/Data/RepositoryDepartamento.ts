import { Departamento } from '../Entities/Departamento';

export class RepositoryDepartamento {
  public static getListadoCompletoDepartamentos(): Departamento[] {
    return [
      new Departamento(1, 'Administración'),
      new Departamento(2, 'Informática'),
      new Departamento(3, 'Recursos Humanos'),
      new Departamento(4, 'Ventas'),
    ];
  }
}
