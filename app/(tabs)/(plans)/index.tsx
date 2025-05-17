import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const isLoggedIn = true;

export default function PlanScreen() {
  const router = useRouter();

  if (!isLoggedIn) {
    return router.push("/(tabs-non)/(auth)");
  }
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Plan Screen</Text>
    </View>
  );
}
