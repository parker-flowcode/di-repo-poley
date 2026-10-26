import { useReducer } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PersonasViewModel } from '../ViewModels/PersonasViewModel';
import { Persona } from '../Models/Entities/Persona';

// Instancia del ViewModel: única fuente de datos de la Vista.
const viewModel = new PersonasViewModel();

/**
 * Vista del listado de personas (solo UI).
 * Toda la lógica vive en el ViewModel.
 */
export default function PersonasView() {
  const insets = useSafeAreaInsets();
  // Fuerza el repintado cuando cambia la persona seleccionada en el VM.
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const handlePress = (persona: Persona) => {
    viewModel.personaSeleccionada = persona;
    forceUpdate();
    viewModel.mostrarPersonaSeleccionada();
  };

  const renderItem = ({ item }: { item: Persona }) => (
    <TouchableOpacity style={styles.row} onPress={() => handlePress(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.nombre.charAt(0)}
          {item.apellidos.charAt(0)}
        </Text>
      </View>
      <View style={styles.texts}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.apellidos}>{item.apellidos}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listado de personas</Text>
        <Text style={styles.headerSubtitle}>
          {viewModel.personaSeleccionada
            ? `Seleccionada: ${viewModel.personaSeleccionada.getFullName()}`
            : 'Ninguna persona seleccionada'}
        </Text>
      </View>

      <FlatList
        data={viewModel.personas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  header: {
    backgroundColor: '#66ffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#0000ff',
  },
  headerTitle: {
    color: '#3333e6',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#3333e6',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  texts: {
    flex: 1,
  },
  nombre: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
  },
  apellidos: {
    color: '#666666',
    fontSize: 14,
    marginTop: 2,
  },
});
