import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.screen}>
      {}
      <View style={styles.card}>
        <Image
          style={styles.avatar}
          source={require("@/assets/images/spiderman.png")}
          contentFit="cover"
          transition={200}
        />
        <Text style={styles.name}>Pedro Poley</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ededed",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 24,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ffffff",
  },
  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
  },
});
