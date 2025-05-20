import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type Product = {
  image: any;
  name: string;
  description: string;
  purchases: number;
  price: string;
  priceId: string;
  onSubscribe?: () => void;
};

type TopProductsCarouselProps = {
  data: Product[];
};

export default function TopProductsCarousel({
  data,
}: TopProductsCarouselProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (idx: number) => {
    setFavorites((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <View className="w-64 bg-white rounded-xl shadow-md mr-4 p-3 relative">
      {/* Icône favoris */}
      <TouchableOpacity
        style={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}
        onPress={() => toggleFavorite(index)}
        hitSlop={10}
      >
        <Ionicons
          name={favorites.includes(index) ? "heart" : "heart-outline"}
          size={24}
          color={favorites.includes(index) ? "#ef4444" : "#d1d5db"}
        />
      </TouchableOpacity>
      <Image
        source={item.image}
        style={{
          width: "100%",
          height: 100,
          borderRadius: 12,
          resizeMode: "cover",
        }}
      />
      <Text className="mt-2 text-base font-bold text-gray-900">
        {item.name}
      </Text>
      <Text className="text-sm text-gray-500 mb-1">{item.description}</Text>
      <Text className="text-xs text-gray-400 mb-1">
        {item.purchases} achats
      </Text>
      <Text className="text-lg font-semibold text-blue-600 mb-2">
        {item.price}
      </Text>
      <Link
        className="bg-blue-500 rounded-full py-2"
        href={`/(tabs-non)/(checkout)?priceId=${item.priceId}`}
        asChild
      >
        <Text className="text-white text-center font-bold">
          Prendre un abonnement
        </Text>
      </Link>
    </View>
  );

  return (
    <View className="mt-8">
      <Text className="text-lg font-bold mb-2 px-4">Top produits</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
      />
    </View>
  );
}
