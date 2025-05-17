import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initialCart = [
  {
    id: "1",
    image: require("../../assets/images/images.jpeg"),
    name: "Antivirus Pro",
    description: "Protection complète pour tous vos appareils.",
    price: "19,99€/mois",
    url: "/products/1",
  },
  {
    id: "2",
    image: require("../../assets/images/images.jpeg"),
    name: "Stockage Cloud",
    description: "Sauvegardez vos fichiers en toute sécurité.",
    price: "9,99€/mois",
    url: "/products/2",
  },
  {
    id: "3",
    image: require("../../assets/images/images.jpeg"),
    name: "VPN Ultra",
    description: "Naviguez anonymement partout dans le monde.",
    price: "7,99€/mois",
    url: "/products/3",
  },
];

export default function CartScreen() {
  const [cart, setCart] = useState(initialCart);

  const handleSubscribe = (name: string) => {
    Alert.alert("Abonnement", `Abonnement à ${name} !`);
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    Alert.alert(
      "Vider les favoris",
      "Voulez-vous vraiment supprimer tous les favoris ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Vider", style: "destructive", onPress: () => setCart([]) },
      ]
    );
  };

  const renderItem = ({ item }: { item: (typeof initialCart)[0] }) => (
    <View
      className="flex-row bg-white rounded-2xl shadow-lg mb-5 mx-4 overflow-hidden"
      style={{ minHeight: 120 }}
    >
      {/* Image à gauche */}
      <Image
        source={item.image}
        style={{
          width: 90,
          height: "100%",
          minHeight: 120,
          resizeMode: "cover",
          backgroundColor: "#f3f4f6",
        }}
      />
      {/* Centre : infos produit */}
      <View className="flex-1 px-4 py-3 justify-center">
        <Text className="text-lg font-bold text-gray-900 mb-1">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-500 mb-1" numberOfLines={2}>
          {item.description}
        </Text>
        <Text className="text-blue-600 font-semibold mb-2">{item.price}</Text>
        <TouchableOpacity
          className="bg-blue-500 rounded-full py-2 px-4 mt-1"
          onPress={() => handleSubscribe(item.name)}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-bold">
            Prendre un abonnement
          </Text>
        </TouchableOpacity>
      </View>
      {/* Actions à droite */}
      <View className="justify-between items-center py-3 pr-3">
        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          accessibilityLabel="Supprimer du panier"
          className="mb-3"
        >
          <Ionicons name="trash-outline" size={26} color="#ef4444" />
        </TouchableOpacity>
        <Link href={item.url} asChild>
          <TouchableOpacity
            className="bg-gray-100 rounded-full p-2 items-center justify-center"
            activeOpacity={0.8}
          >
            <Ionicons name="eye-outline" size={22} color="#2563eb" />
            <Text className="text-blue-600 text-xs font-semibold mt-1">
              Voir
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 pt-6">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-2xl font-bold">Mes favoris</Text>
        {cart.length > 0 && (
          <TouchableOpacity
            className="bg-red-100 px-4 py-2 rounded-full"
            onPress={handleClearAll}
            activeOpacity={0.8}
          >
            <Text className="text-red-600 font-semibold">Tout vider</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-20">
            Aucun produit en favori.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
