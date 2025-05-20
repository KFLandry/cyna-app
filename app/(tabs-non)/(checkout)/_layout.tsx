import { Stack } from "expo-router";

export default function CheckoutLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Checkout" }} />
      <Stack.Screen name="success" options={{ title: "Succès" }} />
      <Stack.Screen name="error" options={{ title: "Erreur" }} />
    </Stack>
  );
}
