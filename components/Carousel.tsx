import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CarouselCardProps = {
  image: any;
  text: string;
  url: string;
};

type CarouselProps = {
  data: CarouselCardProps[];
};

const CARD_WIDTH = 500; // largeur de la card (image paysage)
const CARD_MARGIN = 16;

function CarouselCard({ image, text, url }: CarouselCardProps) {
  return (
    <Link href={url} asChild>
      <TouchableOpacity className="w-screen mr-4 bg-white rounded-xl shadow-md overflow-hidden">
        <View className="p-3">
          <Text className="text-base font-semibold text-gray-900">{text}</Text>
        </View>
        <Image
          source={image}
          style={{height: 200, resizeMode: "cover" }}
          className="w-screen h-full object-cover"
        />
      </TouchableOpacity>
    </Link>
  );
}

export default function Carousel({ data }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + CARD_MARGIN));
    setActiveIndex(index);
  };

  return (
    <View className="w-full h-full px-2">
      <Text className="text-lg font-bold mb-2">Nos promotions du moment</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // snapToInterval={CARD_WIDTH + CARD_MARGIN}
        decelerationRate="fast"
        className="mb-2 h-full w-full"
        style={{ width: "100%" }}
      >
        {data.map((item, idx) => (
          <CarouselCard key={idx} {...item} />
        ))}
      </ScrollView>
      {/* Points de pagination */}
      <View className="flex-row justify-center items-center mt-2">
        {data.map((_, idx) => (
          <View
            key={idx}
            className={`mx-1 rounded-full ${
              activeIndex === idx ? "bg-blue-500 w-4" : "bg-gray-300 w-2"
            } h-2`}
            // No transition property in React Native styles
          />
        ))}
      </View>
    </View>
  );
}
