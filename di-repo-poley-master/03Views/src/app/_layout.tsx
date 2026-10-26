import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // `headerShown: false` para que la interfaz ocupe toda la pantalla,
  // igual que en el maqueta (HEADER pegado arriba y FOOTER pegado abajo).
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
