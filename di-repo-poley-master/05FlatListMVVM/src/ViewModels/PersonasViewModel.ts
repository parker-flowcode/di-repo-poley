import { Persona } from '../Models/Entities/Persona';
import { RepositoryPersonas } from '../Models/Data/RepositoryPersonas';
import { Alert } from 'react-native';

/**
 * ViewModel del listado de personas.
 *
 * Solo TypeScript: no importa React, React Native ni ninguna
 * librería de UI. Expone a la Vista lo que necesita mediante
 * propiedades privadas con get y set:
 *  - `personas` -> el listado para el FlatList
 *  - `personaSeleccionada` -> la persona elegida actualmente
 */
export class PersonasViewModel {
  private _personas: Persona[];
  private _personaSeleccionada: Persona | null;

  constructor() {
    this._personas = RepositoryPersonas.getPersonas();
    this._personaSeleccionada = null;
  }

  get personas(): Persona[] {
    return this._personas;
  }

  //El set no es conveniente porque la vista nunca debe modificar este listado
  // set personas(value: Persona[]) {
  //  this._personas = value;
  // }

  get personaSeleccionada(): Persona | null {
    return this._personaSeleccionada;
  }

  set personaSeleccionada(value: Persona | null) {
    this._personaSeleccionada = value;
    this.seleccionarPersona();
  }

  //Función privada que muestra un alert con la persona seleccionada
  private seleccionarPersona(): void {
    Alert.alert(`Persona seleccionada`, this.mostrarPersonaSeleccionada());
  }

  /** Muestra en un alert el nombre y los apellidos de la persona seleccionada. */
  public mostrarPersonaSeleccionada(): string {
    if (this._personaSeleccionada) {
      return (`Persona seleccionada: ${this._personaSeleccionada.getFullName()}`);
    } else {
      return ('Ninguna persona seleccionada.');
    }
  }
}
