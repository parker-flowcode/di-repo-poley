import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [texto, setTexto] = useState("");

  return (
    <SafeAreaView style={styles.areaSegura}>
      <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>EJERCICIO 07</Text>
          <Text style={styles.titulo}>Entrada de texto</Text>
          <Text style={styles.descripcion}>
            Escribe en el campo y verás cómo el texto aparece al instante debajo.
          </Text>

          <Text style={styles.etiquetaCampo}>TU TEXTO</Text>
          <TextInput
            accessibilityLabel="Escribe tu texto"
            style={styles.entrada}
            value={texto}
            onChangeText={setTexto}
            placeholder="Empieza a escribir aquí..."
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            autoCapitalize="sentences"
            autoCorrect
          />
          <Text style={styles.contador}>{texto.length} caracteres</Text>

          <View style={styles.separador} />
          <Text style={styles.etiquetaCampo}>VISTA EN TIEMPO REAL</Text>
          <View style={styles.vistaPrevia}>
            <Text style={[styles.textoPrevisualizado, !texto && styles.textoVacio]}>
              {texto || "Tu texto aparecerá aquí."}
            </Text>
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
    maxWidth: 480,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 28,
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
  etiquetaCampo: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 9,
  },
  entrada: {
    minHeight: 130,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 15,
    color: "#0F172A",
    fontSize: 16,
    lineHeight: 24,
  },
  contador: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "right",
    marginTop: 7,
  },
  separador: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginTop: 22,
    marginBottom: 20,
  },
  vistaPrevia: {
    minHeight: 90,
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
  },
  textoPrevisualizado: {
    color: "#0F172A",
    fontSize: 16,
    lineHeight: 24,
  },
  textoVacio: {
    color: "#94A3B8",
  },
});