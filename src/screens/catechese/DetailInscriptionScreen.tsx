/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 10/06/2025 - 09:50:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 10/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../services/config";
import { useRoute, useNavigation } from "@react-navigation/native";

const DetailInscriptionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { inscriptionId } = route.params;

  const [inscription, setInscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInscription = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${API_URL}/inscriptions/${inscriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInscription(res.data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erreur",
        "Impossible de charger les détails de l'inscription."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscription();
  }, []);

  const handlePaiement = () => {
    navigation.navigate("PaiementCatechese", { inscriptionId });
  };

  const handleVoirRecu = () => {
    inscription?.paiement?.recu_pdf_url
      ? navigation.navigate("VoirRecuPDF", {
          url: inscription.paiement.recu_pdf_url,
        })
      : Alert.alert(
          "Reçu non disponible",
          "Le reçu ne peut pas être affiché pour le moment."
        );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!inscription) {
    return <Text style={styles.errorText}>Aucune donnée trouvée.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails de l'inscription</Text>

      <Text>Nom : {inscription.catechumene?.nom ?? "Inconnu"}</Text>
      <Text>Session : {inscription.session?.lib_session ?? "N/A"}</Text>
      <Text>Niveau : {inscription.niveau?.lib_niveau ?? "N/A"}</Text>
      <Text>Année : {inscription.annee_catechetique ?? "N/A"}</Text>
      <Text>
        Statut paiement :{" "}
        <Text style={{ color: inscription.paiement ? "green" : "red" }}>
          {inscription.paiement ? "Payé" : "Non payé"}
        </Text>
      </Text>

      {!inscription.paiement && (
        <View style={{ marginTop: 10 }}>
          <Button
            title="Effectuer le paiement"
            onPress={handlePaiement}
            color="#2F3C7E"
          />
        </View>
      )}

      {inscription.paiement?.recu_pdf_url && (
        <View style={{ marginTop: 10 }}>
          <Button title="Voir le reçu PDF" onPress={handleVoirRecu} />
        </View>
      )}
    </ScrollView>
  );
};

export default DetailInscriptionScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  errorText: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
});
