import { Link } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Category = {
  image: any;
  text: string;
  url: string;
};

type CategoryGridProps = {
  data: Category[];
  columns?: number;
};

const CARD_SIZE = (Dimensions.get("window").width - 40) / 2; // 2 colonnes, 16px padding

function CategoryCard({ image, text, url }: Category) {
  return (
    <Link href={url} asChild>
      <TouchableOpacity
        className="bg-white rounded-xl shadow-md m-2 overflow-hidden"
        style={{ width: CARD_SIZE }}
      >
        <Image
          source={image}
          style={{ width: "100%", height: 100, resizeMode: "cover" }}
          className="w-full h-full object-fill"
        />
        <View className="p-2">
          <Text className="text-base font-medium text-gray-900">{text}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function CategoryGrid({ data, columns = 2 }: CategoryGridProps) {
  return (
    <>
      <Text className="text-lg font-bold">Nos Catégories</Text>
      <FlatList
        data={data}
        numColumns={columns}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <CategoryCard {...item} />}
        contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 5 }}
        showsVerticalScrollIndicator={false}
        className="flex justify-center items-center"
      />
    </>
  );
}
