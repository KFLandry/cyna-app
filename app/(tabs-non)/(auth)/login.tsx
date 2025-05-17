import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const handleLogin = () => {
    if (!email || !mdp) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }
    // Ici tu mets ta logique de connexion
    Alert.alert("Connexion", "Connexion réussie !");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Connexion</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Mot de passe"
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry
        className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-lg"
        placeholderTextColor="#888"
      />
      <View className="w-full flex-row justify-end mb-6">
        <Link href="/(tabs-non)/(auth)/forgot-password">
          <Text className="text-blue-500 text-sm">Mot de passe oublié ?</Text>
        </Link>
      </View>
      <TouchableOpacity
        className="w-full bg-blue-500 py-3 rounded-lg mb-4"
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-bold text-base">
          Se connecter
        </Text>
      </TouchableOpacity>
      <View className="flex-row">
        <Text className="text-gray-600">Pas de compte ? </Text>
        <Link href="/(tabs-non)/(auth)/logon">
          <Text className="text-blue-500 font-semibold">Créer un compte</Text>
        </Link>
      </View>
    </View>
  );
}
