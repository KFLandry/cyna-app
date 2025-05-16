import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type Product = {
  image: any;
  name: string;
  description: string;
  purchases: number;
  price: string;
  onSubscribe?: () => void;
};

type TopProductsCarouselProps = {
  data: Product[];
};

function ProductCard({
  image,
  name,
  description,
  purchases,
  price,
  onSubscribe,
}: Product) {
  return (
    <View className="w-64 bg-white rounded-xl shadow-md mr-4 p-3">
      <Image
        source={image}
        style={{
          width: "100%",
          height: 100,
          borderRadius: 12,
          resizeMode: "cover",
        }}
      />
      <Text className="mt-2 text-base font-bold text-gray-900">{name}</Text>
      <Text className="text-sm text-gray-500 mb-1">{description}</Text>
      <Text className="text-xs text-gray-400 mb-1">{purchases} achats</Text>
      <Text className="text-lg font-semibold text-blue-600 mb-2">{price}</Text>
      <TouchableOpacity
        className="bg-blue-500 rounded-full py-2"
        onPress={onSubscribe}
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-bold">
          Prendre un abonnement
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TopProductsCarousel({
  data,
}: TopProductsCarouselProps) {
  return (
    <View className="mt-8">
      <Text className="text-lg font-bold mb-2 px-4">Top produits</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <ProductCard {...item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
      />
    </View>
  );
}
