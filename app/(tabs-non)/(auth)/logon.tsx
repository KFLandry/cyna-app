import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [mdpConfirm, setMdpConfirm] = useState("");

  const handleRegister = () => {
    if (!nom || !prenom || !email || !mdp || !mdpConfirm) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }
    if (mdp !== mdpConfirm) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
    // Ici tu mets ta logique d'inscription
    Alert.alert("Inscription", "Compte créé avec succès !");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Créer un compte</Text>
      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Mot de passe"
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry
        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Confirmer le mot de passe"
        value={mdpConfirm}
        onChangeText={setMdpConfirm}
        secureTextEntry
        className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg"
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        className="w-full bg-blue-500 py-3 rounded-lg mb-4"
        onPress={handleRegister}
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-bold text-base">
          S&apos;inscrire
        </Text>
      </TouchableOpacity>
      <View className="flex-row">
        <Text className="text-gray-600">Déjà un compte ? </Text>
        <Link href="/(tabs-non)/(auth)/login">
          <Text className="text-blue-500 font-semibold">Se connecter</Text>
        </Link>
      </View>
    </View>
  );
}
