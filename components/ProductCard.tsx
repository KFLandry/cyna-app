import { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);

  // Pour afficher l'unité selon le modèle de paiement
function getUnit(model?: string) {
  switch (model) {
    case "PER_MONTH_PER_USER":
      return "/mois/utilisateur";
    case "PER_YEAR_PER_USER":
      return "/an/utilisateur";
    case "PER_MONTH_PER_DEVICE":
      return "/mois/appareil";
    case "PER_YEAR_PER_DEVICE":
      return "/an/appareil";
    case "PAY_AS_YOU_GO":
      return "/usage";
    default:
      return "/unité";
  }
}

  return (
    <TouchableOpacity
      className="flex-row bg-white rounded-2xl shadow mb-4 overflow-hidden"
      onPress={onPress}
      activeOpacity={0.93}
      style={{ minHeight: 110, position: "relative" }}
    >
      {/* Image à gauche */}
      <Image
        source={{
          uri: product.images?.[0]?.url || "https://via.placeholder.com/100",
        }}
        className="w-24 h-full"
        style={{
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: "#f3f4f6",
        }}
        resizeMode="cover"
      />

      {/* Infos au centre */}
      <View className="flex-1 px-4 py-3 justify-center">
        <Text className="font-bold text-lg text-gray-900" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {product.brand}
        </Text>
        <Text className="text-gray-700 text-xs mt-1" numberOfLines={1}>
          {product.pricingModel?.label || ""}
        </Text>
        <View className="flex-row items-end mt-2">
          <Text className="text-blue-600 font-bold text-xl">
            {product.amount / 100} €
            <Text className="text-blue-400 font-semibold text-base">
              {" "}
              {getUnit()}
            </Text>
          </Text>
        </View>
        {product.promo && (
          <Text className="text-xs text-red-500 font-semibold mt-1">
            En promo
          </Text>
        )}
      </View>

      {/* Bouton favoris en haut à droite */}
      <TouchableOpacity
        onPress={() => setFavorite((f) => !f)}
        style={{
          position: "absolute",
          top: 10,
          right: 14,
          zIndex: 2,
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 6,
          shadowColor: "#000",
          shadowOpacity: 0.07,
          shadowRadius: 2,
          elevation: 2,
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={22}
          color={favorite ? "#ef4444" : "#9ca3af"}
        />
      </TouchableOpacity>

      {/* Bouton abonnement en bas à droite */}
      <View
        style={{
          position: "absolute",
          bottom: 12,
          right: 14,
          zIndex: 2,
        }}
      >
        <TouchableOpacity
          className="flex-row items-center bg-blue-100 px-4 py-2 rounded-full"
          activeOpacity={0.85}
          onPress={() => {
            // logiques d'abonnement ici
          }}
        >
          <Ionicons
            name="flash-outline"
            size={18}
            color="#2563eb"
            style={{ marginRight: 6 }}
          />
          <Text className="text-blue-700 font-bold text-xs">Go</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
