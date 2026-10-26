import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Opcion = "Aceptar" | "Cancelar";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [opcionElegida, setOpcionElegida] = useState<Opcion | null>(null);

  useEffect(() => {
    if (modalVisible || opcionElegida === null) {
      return;
    }

    const mensaje = `Ha pulsado usted ${opcionElegida}`;
    if (Platform.OS === "web") {
      window.alert(mensaje);
    } else {
      Alert.alert("Aviso", mensaje);
    }
  }, [modalVisible, opcionElegida]);

  function abrirModal() {
    setOpcionElegida(null);
    setModalVisible(true);
  }

  function elegirOpcion(opcion: Opcion) {
    setOpcionElegida(opcion);
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>EJERCICIO 09</Text>
          <Text style={styles.titulo}>Modal de confirmación</Text>
          <Text style={styles.descripcion}>
            Abre el modal y elige una opción. El botón atrás también cuenta como
            cancelar.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={abrirModal}
            style={({ pressed }) => [styles.botonAbrir, pressed && styles.pulsado]}
          >
            <Text style={styles.textoBoton}>Abrir modal</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => elegirOpcion("Cancelar")}
      >
        <View style={styles.fondoModal}>
          <View accessibilityViewIsModal style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>¿Desea continuar?</Text>
            <Text style={styles.descripcionModal}>
              Seleccione Aceptar o Cancelar para cerrar este mensaje.
            </Text>
            <View style={styles.filaBotones}>
              <Pressable
                accessibilityRole="button"
                onPress={() => elegirOpcion("Cancelar")}
                style={({ pressed }) => [
                  styles.botonSecundario,
                  pressed && styles.pulsado,
                ]}
              >
                <Text style={styles.textoSecundario}>Cancelar</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => elegirOpcion("Aceptar")}
                style={({ pressed }) => [
                  styles.botonAceptar,
                  pressed && styles.pulsado,
                ]}
              >
                <Text style={styles.textoBoton}>Aceptar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 32,
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
  },
  titulo: {
    color: "#0F172A",
    fontSize: 27,
    lineHeight: 35,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },
  descripcion: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 26,
  },
  botonAbrir: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 13,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  pulsado: {
    opacity: 0.82,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  fondoModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.48)",
    padding: 20,
  },
  contenidoModal: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 26,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  tituloModal: {
    color: "#0F172A",
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  descripcionModal: {
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 9,
    marginBottom: 24,
  },
  filaBotones: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  botonSecundario: {
    minHeight: 48,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  textoSecundario: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "600",
  },
  botonAceptar: {
    minHeight: 48,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
});