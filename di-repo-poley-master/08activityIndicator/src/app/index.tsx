import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

export default function Index() {
  const [cargando, setCargando] = useState(false);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    if (!cargando) {
      return;
    }

    const temporizador = setTimeout(() => {
      setCargando(false);
      setCargado(true);
    }, 2000);

    return () => clearTimeout(temporizador);
  }, [cargando]);

  function iniciarCarga() {
    setCargado(false);
    setCargando(true);
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>EJERCICIO 08</Text>
          <Text style={styles.titulo}>Indicador de carga</Text>
          <Text style={styles.descripcion}>
            Pulsa el botón para simular una carga y ver el resultado.
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Recargar"
            disabled={cargando}
            onPress={iniciarCarga}
            style={({ pressed }) => [
              styles.boton,
              pressed && !cargando && styles.botonPulsado,
              cargando && styles.botonDesactivado,
            ]}
          >
            <SymbolView
              name={{ ios: "arrow.clockwise", android: "refresh", web: "refresh" }}
              size={22}
              tintColor="#FFFFFF"
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
          </Pressable>

          <View style={styles.estado} accessibilityLiveRegion="polite">
            {cargando ? (
              <>
                <View style={styles.indicador}>
                  <ActivityIndicator color="#2563EB" size="large" />
                </View>
                <Text style={styles.textoEstado}>Cargando...</Text>
              </>
            ) : cargado ? (
              <Text style={styles.exito}>Cargado con éxito</Text>
            ) : (
              <Text style={styles.instruccion}>La carga aparecerá aquí.</Text>
            )}
          </View>
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
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 26,
  },
  boton: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 18,
  },
  botonPulsado: {
    backgroundColor: "#1D4ED8",
    transform: [{ scale: 0.96 }],
  },
  botonDesactivado: {
    opacity: 0.65,
  },
  estado: {
    minHeight: 108,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  indicador: {
    height: 48,
    justifyContent: "center",
  },
  textoEstado: {
    color: "#475569",
    fontSize: 15,
    marginTop: 8,
  },
  exito: {
    color: "#15803D",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  instruccion: {
    color: "#94A3B8",
    fontSize: 14,
    textAlign: "center",
  },
});