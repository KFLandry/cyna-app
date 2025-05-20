import Carousel from "@/components/Carousel";
import CategoryGrid from "@/components/CategoryGrid";
import TopProductsCarousel from "@/components/TopProductsCarousel";
import { FlatList, View } from "react-native";

const categories = [
  {
    image: require("../../../assets/images/images.jpeg"),
    text: "Securité",
    url: "/products/electronics",
  },
  {
    image: require("../../../assets/images/images.jpeg"),
    text: "Stockage",
    url: "/products/clothes",
  },
  {
    image: require("../../../assets/images/images.jpeg"),
    text: "Cyber Attack",
    url: "/products/home",
  },
  {
    image: require("../../../assets/images/images.jpeg"),
    text: "Cyber Social",
    url: "/products/books",
  },
];

const topProducts = [
  {
    id: 1,
    priceId: "prod_N2v1g0x4z5",
    image: require("../../../assets/images/images.jpeg"),
    name: "Antivirus Pro",
    description: "Protection complète pour tous vos appareils.",
    purchases: 1200,
    price: "19,99€/mois",
  },
  {
    id: 1,
    priceId: "prod_N2v1g0x4z5",
    image: require("../../../assets/images/images.jpeg"),
    name: "Stockage Cloud",
    description: "Sauvegardez vos fichiers en toute sécurité.",
    purchases: 950,
    price: "9,99€/mois",
  },
  {
    id: 1,
    priceId: "prod_N2v1g0x4z5",
    image: require("../../../assets/images/images.jpeg"),
    name: "VPN Ultra",
    description: "Naviguez anonymement partout dans le monde.",
    purchases: 800,
    price: "7,99€/mois",
  },
];

const products = [
  {
    id: 1,
    image: require("../../../assets/images/images.jpeg"),
    text: "Produit 1",
    url: "/products/1",
  },
  {
    id: 2,
    image: require("../../../assets/images/images.jpeg"),
    text: "Produit 2",
    url: "/products/2",
  },
  {
    id: 3,
    image: require("../../../assets/images/images.jpeg"),
    text: "Produit 3",
    url: "/products/3",
  },
  {
    id: 4,
    image: require("../../../assets/images/images.jpeg"),
    text: "Produit 4",
    url: "/products/4",
  },
];

export default function HomeScreen() {
  return (
    <FlatList
      data={[]} // Pas de data, on utilise seulement ListHeaderComponent
      keyExtractor={() => ""}
      ListHeaderComponent={
        <View className="h-full">
          {/* Carousel */}
          <View className="mt-6 flex-1 size-fit">
            <Carousel data={products} />
          </View>

          {/* Top produits */}
          <View className="mt-2 flex-1">
            <TopProductsCarousel data={topProducts} />
          </View>

          {/* Catégories */}
          <View className="mt-6 px-4 flex-1">
            <CategoryGrid data={categories} />
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32, backgroundColor: "#f7f7f7" }}
      renderItem={undefined}
    />
  );
}
