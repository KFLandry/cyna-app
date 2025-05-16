import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ProductsScreen() {
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href="/products">
          <Text className="text-blue-500">Go to profil</Text>
        </Link>
      </View>
    </>
  );
}
