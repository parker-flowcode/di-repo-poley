import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boton from "@/components/Boton";

export default function Index() {
  return (
    <SafeAreaView style={styles.areaSegura}>
      <ScrollView
        contentContainerStyle={styles.contenido}
        alwaysBounceVertical={false}
      >
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>EJEMPLO DE COMPONENTES</Text>
          <Text style={styles.titulo}>Botones reutilizables</Text>
          <Text style={styles.descripcion}>
            Un mismo componente puede mostrar distintos textos gracias a sus props.
          </Text>

          <View style={styles.listaBotones}>
            <Boton texto="Inicio" />
            <Boton texto="Perfil" />
            <Boton texto="Ajustes" />
            <Boton texto="Cerrar sesión" />
          </View>

          <Text style={styles.nota}>Cada botón comparte el mismo diseño.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  contenido: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  tarjeta: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  etiqueta: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.1,
    textAlign: "center",
  },
  titulo: {
    color: "#0F172A",
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },
  descripcion: {
    color: "#64748B",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  listaBotones: {
    width: "100%",
  },
  nota: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 4,
  },
});
