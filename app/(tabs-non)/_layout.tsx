import { useUser } from "@/providers/UserProvider";
import { Stack } from "expo-router";

export default function TabNonLayout() {
  const { user } = useUser();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Protected guard={!!user?.isLoggedIn}>
        <Stack.Screen name="(profils)" />
        <Stack.Screen
          name="(checkout)"
          initialParams={{ priceId: "1" }}
          options={{ title: "Checkout" }}
        ></Stack.Screen>
      </Stack.Protected>

      <Stack.Screen name="(auth)" options={{ title: "Authentification" }} />
      <Stack.Screen name="cart" options={{ title: "Panier" }} />
    </Stack>
  );
}
