import { Product, mockProducts } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "../../../components/ProductCard";
import ProductModal from "../../../components/modals/ProductModal";

// Types pour les catégories
type Category = {
  id: number;
  name: string;
};

// Simule un fetch des catégories (remplace par ton appel API)
const fetchCategories = async (): Promise<Category[]> => [
  { id: 1, name: "Détection" },
  { id: 2, name: "Protection" },
  { id: 3, name: "Audit" },
  { id: 4, name: "Sauvegarde" },
  { id: 5, name: "Gestion d'accès" },
];
// Simule un fetch des produits (remplace par ton appel API)
const fetchProducts = async (
  categoryIds: number[],
  promoOnly: boolean,
  sort: "asc" | "desc",
  page: number,
  pageSize: number
): Promise<{ products: Product[]; total: number }> => {
  // Ici tu feras ton appel API réel avec les filtres
  // Pour la démo, on filtre localement
  let data = [...mockProducts];
  if (categoryIds.length > 0) {
    data = data.filter((p) => categoryIds.includes(p.categoryId));
  }
  if (promoOnly) {
    data = data.filter((p) => p.promo);
  }
  if (sort === "asc") {
    data = data.sort((a, b) => a.amount - b.amount);
  } else if (sort === "desc") {
    data = data.sort((a, b) => b.amount - a.amount);
  }
  const total = data.length;
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);
  return { products: paginated, total };
};

// Nombre de produits par page
const PAGE_SIZE = 6;

export default function ProductListScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [promoOnly, setPromoOnly] = useState(false);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const idProduct = useSearchParams().get("id");
  // Fetch catégories au chargement
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  // Fetch produits à chaque changement de filtre/tri/page
  useEffect(() => {
    setLoading(true);
    fetchProducts(selectedCategories, promoOnly, sort, page, PAGE_SIZE).then(
      ({ products, total }) => {
        setProducts(products);
        setTotal(total);
        setLoading(false);
      }
    );

    // Redirection vers la models detail si id Produit
    if (idProduct) {
      const product = products.find((p) => p.id === Number(idProduct));
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [selectedCategories, promoOnly, sort, page, idProduct, products]);

  // Pagination
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Changement promo
  const togglePromo = () => {
    setPage(1);
    setPromoOnly((p) => !p);
  };

  // Changement tri
  const toggleSort = () => {
    setPage(1);
    setSort((s) => (s === "asc" ? "desc" : "asc"));
  };

  // Changement page
  const goToPage = (p: number) => setPage(p);

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      {/* Filtres */}
      <View className="flex-row items-center justify-between mb-2 space-x-2">
        {/* Bouton pour ouvrir la modal de catégories */}
        <TouchableOpacity
          onPress={() => setCategoryModalVisible(true)}
          className="px-3 py-1 rounded-full border bg-gray-100 border-gray-300"
          activeOpacity={0.8}
        >
          <Text className="text-gray-700">
            {selectedCategories.length === 0
              ? "Catégorie"
              : categories.find((c) => c.id === selectedCategories[0])?.name}
          </Text>
        </TouchableOpacity>
        {/* Promo */}
        <TouchableOpacity
          onPress={togglePromo}
          className={`px-3 py-1 rounded-full border ${
            promoOnly
              ? "bg-blue-500 border-blue-500"
              : "bg-gray-100 border-gray-300"
          }`}
          activeOpacity={0.8}
        >
          <Text className={promoOnly ? "text-white" : "text-gray-700"}>
            Promo
          </Text>
        </TouchableOpacity>
        {/* Tri prix */}
        <TouchableOpacity
          onPress={toggleSort}
          className="px-3 py-1 rounded-full border bg-gray-100 border-gray-300"
          activeOpacity={0.8}
        >
          <Text className="text-gray-700">
            Prix {sort === "asc" ? "↑" : "↓"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de sélection de catégorie */}
      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 20,
              minWidth: 250,
              elevation: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedCategories([]);
                setCategoryModalVisible(false);
                setPage(1);
              }}
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={
                  selectedCategories.length === 0
                    ? "checkbox"
                    : "square-outline"
                }
                size={20}
                color="#2563eb"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
                Toutes les catégories
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => {
                    setSelectedCategories((prev) =>
                      checked
                        ? prev.filter((id) => id !== cat.id)
                        : [...prev, cat.id]
                    );
                    setPage(1);
                  }}
                  style={{
                    paddingVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name={checked ? "checkbox" : "square-outline"}
                    size={20}
                    color={checked ? "#2563eb" : "#9ca3af"}
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      color: checked ? "#2563eb" : "#1f2937",
                      fontWeight: checked ? "bold" : "normal",
                    }}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {/* Bouton de validation */}
            <TouchableOpacity
              onPress={() => setCategoryModalVisible(false)}
              style={{
                marginTop: 16,
                backgroundColor: "#2563eb",
                borderRadius: 8,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Valider
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Liste des produits */}
      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" className="mt-8" />
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={(item: Product) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => setSelectedProduct(item)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
          {/* Pagination moderne */}
          {totalPages > 1 && (
            <View className="flex-row justify-center items-center mt-2 mb-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <TouchableOpacity
                  key={i + 1}
                  onPress={() => goToPage(i + 1)}
                  className={`mx-1 px-3 py-1 rounded-full ${
                    page === i + 1 ? "bg-blue-500" : "bg-gray-200"
                  }`}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`font-bold ${
                      page === i + 1 ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}
      {/* Modal produit */}
      <ProductModal
        product={selectedProduct}
        visible={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </View>
  );
}
