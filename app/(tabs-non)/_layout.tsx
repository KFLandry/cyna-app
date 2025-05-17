import { Stack } from "expo-router";

const isLoggedIn = true;

export default function TabNonLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "fade",
      }}
    >
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(profils)/index" />
      </Stack.Protected>

      <Stack.Screen name="(auth)" options={{ title: "Authentification" }} />
      <Stack.Screen name="cart" />
    </Stack>
  );
}
