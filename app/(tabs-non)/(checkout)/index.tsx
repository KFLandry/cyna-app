import { useUser } from "@/providers/UserProvider";
import { useSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

export default function CheckoutScreen() {
  const priceId = useSearchParams().get("priceId");
  const { user } = useUser();
  return (
    <View className="flex flex-col items-center justify-center h-screen">
      <Text className="text-2xl font-bold">
        {user?.isLoggedIn ? "Checkout" : "Authentification"}
        Checkout Merci pour votre abonnement sur le produit de price Id : $
        {priceId}
      </Text>
    </View>
  );
}
