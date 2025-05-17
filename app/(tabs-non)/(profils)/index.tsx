import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

// Exemple de user (à remplacer par ton state ou ton fetch)
const user = {
  id: 1,
  customerId: null,
  firstname: "Jean",
  lastname: "Dupont",
  email: "jean.dupont@email.com",
  enabled: true,
  emailVerified: false,
  phone: 33612345678,
  urlProfile: "",
  roles: "USER",
};

export default function ProfilsScreen() {
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone?.toString() || "");
  const [profileImage, setProfileImage] = useState(user.urlProfile);

  // Fonction pour sélectionner une image de profil
  const pickImage = async () => {
    // // Demande la permission d'accès à la galerie
    // const permissionResult =
    //   await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!permissionResult.granted) {
    //   alert("L'accès à la galerie est requis pour changer la photo de profil.");
    //   return;
    // }
    // // Ouvre la galerie pour choisir une image
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.7,
    // });
    // if (!result.canceled && result.assets && result.assets.length > 0) {
    //   setProfileImage(result.assets[0].uri);
    //   // upload backend ici si besoin
    // }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Profil" }} />
      <View className="flex-1 bg-white px-4 pt-6">
        {/* Section infos perso */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View style={{ position: "relative" }}>
              <Image
                source={{
                  uri:
                    profileImage ||
                    "https://ui-avatars.com/api/?name=" +
                      user.firstname +
                      "+" +
                      user.lastname,
                }}
                className="w-16 h-16 rounded-full bg-gray-200"
              />
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  borderRadius: 999,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={18} color="#2563eb" />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              {editMode ? (
                <>
                  <TextInput
                    value={firstname}
                    onChangeText={setFirstname}
                    placeholder="Prénom"
                    className="font-bold text-lg text-gray-900 mb-1"
                    style={{ borderBottomWidth: 1, borderColor: "#e5e7eb" }}
                  />
                  <TextInput
                    value={lastname}
                    onChangeText={setLastname}
                    placeholder="Nom"
                    className="font-bold text-lg text-gray-900"
                    style={{ borderBottomWidth: 1, borderColor: "#e5e7eb" }}
                  />
                </>
              ) : (
                <>
                  <Text className="font-bold text-xl text-gray-900">
                    {firstname} {lastname}
                  </Text>
                  <Text className="text-gray-500">{user.roles}</Text>
                </>
              )}
            </View>
            {!editMode && (
              <TouchableOpacity
                onPress={() => setEditMode(true)}
                className="ml-2"
              >
                <Ionicons name="pencil-outline" size={20} color="#2563eb" />
              </TouchableOpacity>
            )}
          </View>
          <View className="mb-2">
            <Text className="text-gray-700 font-semibold">Email</Text>
            {editMode ? (
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                className="text-gray-800"
                style={{ borderBottomWidth: 1, borderColor: "#e5e7eb" }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <View className="flex-row items-center">
                <Text className="text-gray-800 mr-2">{email}</Text>
                {user.emailVerified ? (
                  <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
                ) : (
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => {
                      /* logiques de vérification */
                    }}
                  >
                    <Ionicons name="alert-circle" size={18} color="#f59e42" />
                    <Text className="text-blue-600 ml-1 text-xs font-bold">
                      Vérifier
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View className="mb-2">
            <Text className="text-gray-700 font-semibold">Téléphone</Text>
            {editMode ? (
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Téléphone"
                className="text-gray-800"
                style={{ borderBottomWidth: 1, borderColor: "#e5e7eb" }}
                keyboardType="phone-pad"
              />
            ) : (
              <Text className="text-gray-800">
                {phone ? `+${phone}` : "Non renseigné"}
              </Text>
            )}
          </View>
          {editMode && (
            <View className="flex-row space-x-2 mt-2">
              <TouchableOpacity
                className="bg-blue-500 rounded-full px-4 py-2 flex-row items-center flex-1 justify-center"
                onPress={() => {
                  // logiques pour sauvegarder les modifications
                  setEditMode(false);
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-white font-bold">Sauvegarder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-200 rounded-full px-4 py-2 flex-row items-center justify-center"
                onPress={() => {
                  setEditMode(false);
                  setFirstname(user.firstname);
                  setLastname(user.lastname);
                  setEmail(user.email);
                  setPhone(user.phone?.toString() || "");
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={18}
                  color="#374151"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-gray-700 font-bold">Annuler</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Section Customer Stripe */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="font-semibold text-gray-700 mb-2">
            Compte Stripe
          </Text>
          {user.customerId ? (
            <>
              <Text className="text-gray-800 mb-2">
                ID Stripe: <Text className="font-mono">{user.customerId}</Text>
              </Text>
              <TouchableOpacity
                className="bg-blue-100 rounded-full px-4 py-2 flex-row items-center mb-2"
                onPress={() => {
                  /* ouvrir portail Stripe */
                }}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={18}
                  color="#2563eb"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-blue-700 font-bold">
                  Accéder au portail client
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              className="bg-blue-500 rounded-full px-4 py-2 flex-row items-center"
              onPress={() => {
                /* créer compte Stripe */
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 6 }}
              />
              <Text className="text-white font-bold">
                Créer mon compte Stripe
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Section validation email */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="font-semibold text-gray-700 mb-2">
            Validation email
          </Text>
          <View className="flex-row items-center">
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: user.emailVerified ? "#22c55e" : "#f59e42",
                marginRight: 8,
              }}
            />
            <Text className="text-gray-800">
              {user.emailVerified ? "Email vérifié" : "Email non vérifié"}
            </Text>
            {!user.emailVerified && (
              <TouchableOpacity
                className="ml-4"
                onPress={() => {
                  /* renvoyer email de validation */
                }}
              >
                <Text className="text-blue-600 font-bold text-xs">
                  Renvoyer l’email
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Section Mot de passe */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="font-semibold text-gray-700 mb-2">
            Sécurité du compte
          </Text>
          {showPwdForm ? (
            <>
              <View className="mb-2">
                <Text className="text-gray-700 text-xs mb-1">
                  Nouveau mot de passe
                </Text>
                <View className="bg-white rounded-lg border border-gray-200 px-3 py-2">
                  <TextInput
                    value={newPwd}
                    onChangeText={setNewPwd}
                    secureTextEntry
                    placeholder="Nouveau mot de passe"
                    className="text-gray-900"
                  />
                </View>
              </View>
              <View className="mb-2">
                <Text className="text-gray-700 text-xs mb-1">
                  Confirmer le mot de passe
                </Text>
                <View className="bg-white rounded-lg border border-gray-200 px-3 py-2">
                  <TextInput
                    value={confirmPwd}
                    onChangeText={setConfirmPwd}
                    secureTextEntry
                    placeholder="Confirmer le mot de passe"
                    className="text-gray-900"
                  />
                </View>
              </View>
              {pwdError ? (
                <Text className="text-red-500 text-xs mb-2">{pwdError}</Text>
              ) : null}
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  className="bg-blue-500 rounded-full px-4 py-2 flex-row items-center flex-1 justify-center"
                  onPress={() => {
                    if (!newPwd || !confirmPwd) {
                      setPwdError("Veuillez remplir les deux champs.");
                      return;
                    }
                    if (newPwd !== confirmPwd) {
                      setPwdError("Les mots de passe ne correspondent pas.");
                      return;
                    }
                    setPwdError("");
                    // logiques pour modifier le mot de passe ici
                    setShowPwdForm(false);
                    setNewPwd("");
                    setConfirmPwd("");
                  }}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-white font-bold">Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-200 rounded-full px-4 py-2 flex-row items-center justify-center"
                  onPress={() => {
                    setShowPwdForm(false);
                    setPwdError("");
                    setNewPwd("");
                    setConfirmPwd("");
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={18}
                    color="#374151"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-gray-700 font-bold">Annuler</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity
              className="bg-blue-100 rounded-full px-4 py-2 flex-row items-center"
              onPress={() => setShowPwdForm(true)}
            >
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color="#2563eb"
                style={{ marginRight: 6 }}
              />
              <Text className="text-blue-700 font-bold">
                Modifier mon mot de passe
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Danger zone */}
        <View className="mt-8">
          <TouchableOpacity
            className="bg-red-100 rounded-full px-4 py-3 flex-row items-center justify-center mb-3"
            onPress={() => {
              /* supprimer compte */
            }}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color="#ef4444"
              style={{ marginRight: 6 }}
            />
            <Text className="text-red-600 font-bold">Supprimer mon compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-200 rounded-full px-4 py-3 flex-row items-center justify-center"
            onPress={() => {
              /* déconnexion */
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={18}
              color="#374151"
              style={{ marginRight: 6 }}
            />
            <Text className="text-gray-700 font-bold">Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
