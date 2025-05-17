import { UserProvider } from "@/providers/UserProvider";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
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
