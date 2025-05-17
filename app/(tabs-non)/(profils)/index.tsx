import { Stack } from "expo-router";
import { Text, View } from "react-native";
export default function ProfilsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Profil" }} />
      <View className="flex-1 justify-center items-center">
        <Text>Profil Screen</Text>
      </View>
    </>
  );
}
