import { Persona } from '../Entities/Persona';

export class RepositoryPersonas {
  /**
   * Función que devuelve un array de personas. El array es estático de prueba
   * Pre: ninguna
   * Post: el array nunca va a estar vacío
   * @returns Persona[]
   */
  public static getPersonas(): Persona[] {
    return [
      new Persona('1', 'Juan', 'García López'),
      new Persona('2', 'María', 'Fernández Sánchez'),
      new Persona('3', 'Pedro', 'Martínez Ruiz'),
      new Persona('4', 'Ana', 'López Gómez'),
      new Persona('5', 'Luis', 'Sánchez Díaz'),
      new Persona('6', 'Laura', 'Gómez Pérez'),
      new Persona('7', 'Carlos', 'Ruiz Molina'),
      new Persona('8', 'Sofía', 'Díaz Castro'),
      new Persona('9', 'Miguel', 'Pérez Lorenzo'),
      new Persona('10', 'Elena', 'Hernández Ortiz'),
    ];
  }
}
