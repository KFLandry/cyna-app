export default function ErrorScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Erreur</h1>
      <p className="mt-4 text-gray-600">Une erreur est survenue lors du traitement de votre paiement.</p>
    </div>
  );
}