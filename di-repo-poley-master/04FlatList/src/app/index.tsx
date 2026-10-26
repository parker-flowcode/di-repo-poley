import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Persona del listado.
 *
 * `id` → se usa en `keyExtractor` para que FlatList identifique cada fila.
 * `nombre` y `apellidos` → lo que se muestra en pantalla.
 */
type Persona = {
  id: string;
  nombre: string;
  apellidos: string;
};

/** Listado de personas inventadas. */
const PERSONAS: Persona[] = [
  { id: "1", nombre: "Lucía", apellidos: "Herrández Gómez" },
  { id: "2", nombre: "Martín", apellidos: "Sánchez Ortiz" },
  { id: "3", nombre: "Valeria", apellidos: "Romero Delgado" },
  { id: "4", nombre: "Bruno", apellidos: "Castro Molina" },
  { id: "5", nombre: "Alba", apellidos: "Fuentes Navarro" },
  { id: "6", nombre: "Diego", apellidos: "Vargas Peña" },
  { id: "7", nombre: "Carmen", apellidos: "Ibáñez Torres" },
  { id: "8", nombre: "Óscar", apellidos: "Mendoza Rivas" },
  { id: "9", nombre: "Paula", apellidos: "Estrada Marín" },
  { id: "10", nombre: "Héctor", apellidos: "Serrano Cabrera" },
  { id: "11", nombre: "Nerea", apellidos: "Aguilar Pastor" },
  { id: "12", nombre: "Iván", apellidos: "Cordero Lago" },
  { id: "13", nombre: "Julia", apellidos: "Bermúdez Nogales" },
  { id: "14", nombre: "Adrián", apellidos: "Quintero Sanz" },
  { id: "15", nombre: "Marta", apellidos: "Salgado Corral" },
  { id: "16", nombre: "Raúl", apellidos: "Prieto Mendizábal" },
  { id: "17", nombre: "Sofía", apellidos: "Otero Villalba" },
  { id: "18", nombre: "Elena", apellidos: "Zamora Bustamante" },
  { id: "19", nombre: "Gabriel", apellidos: "Alemán Soto" },
  { id: "20", nombre: "Teresa", apellidos: "Calderón Rueda" },
];

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/* Cabecera fija (no forma parte de la lista) */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Listado de personas</Text>
        <Text style={styles.headerSubtitle}>
          {PERSONAS.length} registros · keyExtractor = id
        </Text>
      </View>

      <FlatList
        data={PERSONAS}
        // Cada fila se identifica por su `id`
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
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
          </View>
        )}
        // Separadores y márgenes de la lista
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom }]}
        // Rellado si la lista estuviera vacía
        ListEmptyComponent={
          <Text style={styles.empty}>No hay personas en el listado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  header: {
    backgroundColor: "#66ffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#0000ff",
  },
  headerTitle: {
    color: "#3333e6",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#3333e6",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
  listContent: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0000ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  texts: {
    flex: 1,
  },
  nombre: {
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "600",
  },
  apellidos: {
    color: "#666666",
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    height: 8,
  },
  empty: {
    textAlign: "center",
    color: "#666666",
    marginTop: 24,
    fontSize: 16,
  },
});
