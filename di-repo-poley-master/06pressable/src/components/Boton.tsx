import { Pressable, StyleSheet, Text } from "react-native";

type BotonProps = {
  texto: string;
};

export default function Boton({ texto }: BotonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [styles.boton, pressed && styles.botonPulsado]}
    >
      <Text style={styles.texto}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: "100%",
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 12,
  },
  botonPulsado: {
    backgroundColor: "#1D4ED8",
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
