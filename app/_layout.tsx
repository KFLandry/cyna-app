import { Stack } from "expo-router";
import "../global.css";
import UserProvider from "../providers/UserProvider";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(tabs-non)" />
        <Stack.Screen
          name="+not-found"
          options={{
            title: "Oops! This screen doesn't exist.",
          }}
        ></Stack.Screen>
      </Stack>
    </UserProvider>
  );
}
