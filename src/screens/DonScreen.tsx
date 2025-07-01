/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 06/06/2025 - 20:07:59
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 06/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

export default function DonScreen() {
  const [montant, setMontant] = useState("");
  const [intention, setIntention] = useState("");
  const [dons, setDons] = useState([]);

  // Fonction déclenchée au clic sur "Envoyer"
  const handleSendDon = () => {
    if (!montant || isNaN(montant)) {
      Alert.alert("Erreur", "Veuillez entrer un montant valide.");
      return;
    }

    const nouveauDon = {
      id: Date.now(),
      montant,
      intention: intention || "Sans intention",
      date: new Date().toLocaleDateString(),
    };

    setDons([nouveauDon, ...dons]);
    setMontant("");
    setIntention("");
    Alert.alert("Merci !", "Votre don a été enregistré.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faire un Don</Text>

      <TextInput
        style={styles.input}
        placeholder="Montant (ex: 500)"
        keyboardType="numeric"
        value={montant}
        onChangeText={setMontant}
      />
      <TextInput
        style={styles.input}
        placeholder="Intention (facultatif)"
        value={intention}
        onChangeText={setIntention}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendDon}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Historique des dons</Text>
      <ScrollView contentContainerStyle={styles.donList}>
        {dons.length === 0 ? (
          <Text style={styles.noDon}>Aucun don pour le moment.</Text>
        ) : (
          dons.map((don) => (
            <View key={don.id} style={styles.donItem}>
              <Text style={styles.donText}>💰 {don.montant} FCFA</Text>
              <Text style={styles.donText}>🕊 {don.intention}</Text>
              <Text style={styles.donDate}>📅 {don.date}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  donList: {
    paddingBottom: 20,
  },
  donItem: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  donText: {
    fontSize: 16,
  },
  donDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  noDon: {
    fontStyle: "italic",
    color: "#999",
  },
});
