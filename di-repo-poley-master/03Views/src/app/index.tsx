import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.label}>HEADER</Text>
      </View>

      {}
      <View style={styles.middle}>
        <View style={styles.sidebarLeft} />

        <View style={styles.content}>
          <Text style={styles.label}>CONTENT</Text>
        </View>

        <View style={styles.sidebarRight} />
      </View>

      {}
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Text style={styles.label}>FOOTER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#66ffff",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  middle: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarLeft: {
    width: "13%",
    backgroundColor: "#0000ff",
  },
  content: {
    flex: 1,
    backgroundColor: "#8a8a8a",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarRight: {
    width: "13%",
    backgroundColor: "#008000",
  },
  footer: {
    backgroundColor: "#ffc0cb",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#3333e6",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
