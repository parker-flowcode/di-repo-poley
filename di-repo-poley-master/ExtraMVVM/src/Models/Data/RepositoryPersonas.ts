import { Persona } from '../Entities/Persona';

const personas: Persona[] = [
  new Persona(1, 'Ana García', 1),
  new Persona(2, 'Luis Martín', 1),
  new Persona(3, 'Marta López', 1),
  new Persona(4, 'Pablo Ruiz', 1),
  new Persona(5, 'Sara Fernández', 1),
  new Persona(6, 'Diego Sánchez', 1),
  new Persona(7, 'Elena Pérez', 1),
  new Persona(8, 'Carmen Díaz', 1),
  new Persona(9, 'Javier Gómez', 1),
  new Persona(10, 'Lucía Romero', 1),
  new Persona(11, 'Marcos Torres', 2),
  new Persona(12, 'Nuria Castro', 2),
  new Persona(13, 'Adrián Molina', 2),
  new Persona(14, 'Claudia Ortiz', 2),
  new Persona(15, 'Hugo Navarro', 2),
  new Persona(16, 'Irene Vega', 2),
  new Persona(17, 'Álvaro Reyes', 2),
  new Persona(18, 'Paula León', 2),
  new Persona(19, 'Sergio Gil', 2),
  new Persona(20, 'Eva Márquez', 2),
  new Persona(21, 'Daniela Flores', 3),
  new Persona(22, 'Raúl Méndez', 3),
  new Persona(23, 'Alicia Cabrera', 3),
  new Persona(24, 'Iván Santos', 3),
  new Persona(25, 'Noelia Vidal', 3),
  new Persona(26, 'Gabriel Peña', 3),
  new Persona(27, 'Teresa Rojas', 3),
  new Persona(28, 'Samuel Iglesias', 3),
  new Persona(29, 'Patricia Campos', 3),
  new Persona(30, 'Mario Fuentes', 3),
  new Persona(31, 'Valeria Cruz', 4),
  new Persona(32, 'Andrés Lozano', 4),
  new Persona(33, 'Julia Serrano', 4),
  new Persona(34, 'Tomás Prieto', 4),
  new Persona(35, 'Rocío Peña', 4),
  new Persona(36, 'Nicolás Domínguez', 4),
  new Persona(37, 'Beatriz Calvo', 4),
  new Persona(38, 'Óscar Pardo', 4),
  new Persona(39, 'Miriam Soler', 4),
  new Persona(40, 'Alex Salas', 4),
];

export class RepositoryPersonas {
  public static getListadoPersonasPorDept(idDept: number): Persona[] {
    if (!Number.isInteger(idDept) || idDept <= 0) return [];
    return personas.filter((persona) => persona.idDept === idDept);
  }
}
