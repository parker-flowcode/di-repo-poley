import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // `headerShown: false` para que la app ocupe toda la pantalla y la
  // cabecera la pinte nuestro propio componente dentro de `index.tsx`.
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
