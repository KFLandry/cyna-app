import { useUser } from "@/providers/UserProvider";
import { Ionicons } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import { Redirect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

// Stepper visuel simple
function Stepper({ step }: { step: number }) {
  const steps = ["Paiement", "Récap", "Confirmation"];
  return (
    <View className="flex-row justify-center items-center mb-6">
      {steps.map((label, idx) => (
        <View key={label} className="flex-row items-center">
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: idx <= step ? "#2563eb" : "#e5e7eb",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: idx <= step ? "#fff" : "#6b7280",
                fontWeight: "bold",
              }}
            >
              {idx + 1}
            </Text>
          </View>
          {idx < steps.length - 1 && (
            <View
              style={{
                width: 32,
                height: 2,
                backgroundColor: idx < step ? "#2563eb" : "#e5e7eb",
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
}

export default function CheckoutScreen() {
  const searchParams = useSearchParams();
  const priceId = searchParams.get("priceId");
  const [step, setStep] = useState(0);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetReady, setPaymentSheetReady] = useState(false);
  const [paymentSheetError, setPaymentSheetError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const user = useUser().user;

  // Simule si l'utilisateur a un moyen de paiement par défaut
  const [hasDefaultCard, setHasDefaultCard] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [cardNumber, setCardNumber] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  // Étape 1 : Ajout ou affichage du moyen de paiement
  const renderPaymentStep = () => (
    <View className="w-full px-6">
      {hasDefaultCard ? (
        <>
          <Text className="text-lg font-bold mb-2">Moyen de paiement</Text>
          <View className="flex-row items-center mb-4">
            <Ionicons name="card-outline" size={22} color="#2563eb" />
            <Text className="ml-2 text-gray-700">Carte enregistrée</Text>
          </View>
          <TouchableOpacity
            className="bg-blue-500 rounded-full px-4 py-2 mb-4"
            onPress={() => setHasDefaultCard(false)}
          >
            <Text className="text-white text-center font-bold">
              Changer de carte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-600 rounded-full px-4 py-2"
            onPress={() => setStep(1)}
          >
            <Text className="text-white text-center font-bold">Continuer</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-lg font-bold mb-2">
            Ajouter une carte bancaire
          </Text>
          <TextInput
            className="border rounded-lg px-3 py-2 mb-3"
            placeholder="Numéro de carte (ex: 4242 4242 4242 4242)"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-full px-4 py-2"
            onPress={() => {
              setHasDefaultCard(true);
              setCardNumber("");
            }}
          >
            <Text className="text-white text-center font-bold">
              Enregistrer la carte
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  // Étape 2 : Récapitulatif et quantité
  const renderRecapStep = () => (
    <View className="w-full px-6">
      <Text className="text-lg font-bold mb-2">Récapitulatif</Text>
      <Text className="mb-2">
        Produit sélectionné :{" "}
        <Text className="font-semibold">{priceId || "Produit"}</Text>
      </Text>
      <Text className="mb-2">
        Prix : <Text className="font-semibold">XX €</Text>
      </Text>
      <Text className="mb-2">Quantité :</Text>
      <TextInput
        className="border rounded-lg px-3 py-2 mb-4 w-24"
        keyboardType="number-pad"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity
        className="bg-blue-600 rounded-full px-4 py-2"
        onPress={() => setStep(2)}
      >
        <Text className="text-white text-center font-bold">
          Procéder au paiement
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Étape 2 : Paiement avec PaymentSheet
  const renderStripePaymentStep = () => (
    <View className="w-full px-6 items-center">
      <Text className="text-lg font-bold mb-4">Paiement sécurisé</Text>
      {paymentSheetError ? (
        <Text className="text-red-500 mb-2">{paymentSheetError}</Text>
      ) : null}
      <TouchableOpacity
        className={`rounded-full px-4 py-2 ${
          paymentSheetReady ? "bg-blue-600" : "bg-gray-300"
        }`}
        disabled={!paymentSheetReady}
        onPress={async () => {
          const { error } = await presentPaymentSheet();
          if (error) {
            setPaymentSheetError(error.message || "Erreur lors du paiement");
          } else {
            setStep(2); // Passe à la confirmation
          }
        }}
      >
        <Text className="text-white text-center font-bold">Payer</Text>
      </TouchableOpacity>
    </View>
  );

  // Étape 3 : Confirmation
  const renderConfirmationStep = () => (
    <View className="w-full px-6 items-center">
      <Ionicons
        name="checkmark-circle"
        size={64}
        color="#22c55e"
        style={{ marginBottom: 16 }}
      />
      <Text className="text-2xl font-bold mb-2 text-center">
        Abonnement réussi !
      </Text>
      <Text className="text-gray-700 mb-4 text-center">
        Merci pour votre souscription. Vous recevrez un email de confirmation.
      </Text>
      <TouchableOpacity
        className="bg-blue-500 rounded-full px-4 py-2"
        onPress={() => setStep(0)}
      >
        <Text className="text-white text-center font-bold">Retour</Text>
      </TouchableOpacity>
    </View>
  );

  // Simule la récupération du clientSecret depuis ton backend
  useEffect(() => {
    if (!user) {
      // Do not return a React element here; handle redirect in render
      return;
    }
    if (step === 1) {
      // Ici, fais un appel à ton backend pour obtenir le clientSecret Stripe
      // Exemple :
      fetch("https://ton-backend.com/create-subscription-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: user ? user.customerId : undefined,
          priceId,
          quantity: Number(quantity),
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          setClientSecret(data.clientSecret);
          const { error } = await initPaymentSheet({
            paymentIntentClientSecret: data.clientSecret,
            merchantDisplayName: "",
          });
          if (!error) setPaymentSheetReady(true);
          else setPaymentSheetError(error.message || "Erreur Stripe");
        });
    }
  }, [step, user?.customerId, priceId, quantity, user, initPaymentSheet]);

  if (!user) {
    return <Redirect href="/(tabs-non)/(auth)" />;
  }

  return (
    <View className="flex-1 bg-white pt-10">
      <Stepper step={step} />
      <View className="flex-1 justify-center items-center">
        {step === 0 && renderPaymentStep()}
        {step === 1 && renderRecapStep()}
        {step === 2 && renderStripePaymentStep()}
        {step === 3 && renderConfirmationStep()}
      </View>
    </View>
  );
}
