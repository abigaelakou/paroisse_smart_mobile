/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 06/06/2025 - 21:40:38
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 06/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { API_URL } from "../../services/config";

const NouvelleDemandeScreen = ({ navigation }) => {
  const [typeMesses, setTypeMesses] = useState([]);
  const [typeIntentions, setTypeIntentions] = useState([]);

  const [selectedTypeMesse, setSelectedTypeMesse] = useState("");
  const [selectedTypeIntention, setSelectedTypeIntention] = useState("");
  const [dateMesse, setDateMesse] = useState(new Date());
  const [heureMesse, setHeureMesse] = useState(new Date());
  const [intentions, setIntentions] = useState("");
  const [loading, setLoading] = useState(false);

  // 📥 Chargement des types de messe et intentions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messeRes, intentionRes] = await Promise.all([
          axios.get(`${API_URL}/types-messe`),
          axios.get(`${API_URL}/types-intention`),
        ]);
        setTypeMesses(messeRes.data);
        setTypeIntentions(intentionRes.data);
      } catch (error) {
        Alert.alert("Erreur", "Impossible de charger les données.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (
      !selectedTypeMesse ||
      !selectedTypeIntention ||
      !dateMesse ||
      !heureMesse ||
      !intentions.trim()
    ) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/messe`, {
        id_type_messe: selectedTypeMesse,
        id_type_intention: selectedTypeIntention,
        date_messe: dateMesse.toISOString().split("T")[0],
        heure_messe: heureMesse.toTimeString().split(" ")[0].slice(0, 5),
        lieu_messe: "Lieu inconnu", // à personnaliser plus tard si nécessaire
        intentions: intentions.trim(),
      });

      setLoading(false);
      Alert.alert("Succès", "Demande enregistrée avec succès.");
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Échec de l’enregistrement."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nouvelle demande de messe</Text>

      <Text style={styles.label}>Type de messe</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTypeMesse}
          onValueChange={setSelectedTypeMesse}
        >
          <Picker.Item label="Sélectionner..." value="" />
          {typeMesses.map((m) => (
            <Picker.Item key={m.id} label={m.lib_type_messe} value={m.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Type d’intention</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTypeIntention}
          onValueChange={setSelectedTypeIntention}
        >
          <Picker.Item label="Sélectionner..." value="" />
          {typeIntentions.map((i) => (
            <Picker.Item key={i.id} label={i.lib_type_intention} value={i.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Date de la messe</Text>
      <DateTimePicker
        value={dateMesse}
        mode="date"
        minimumDate={new Date()}
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={(event, selectedDate) =>
          selectedDate && setDateMesse(selectedDate)
        }
      />

      <Text style={styles.label}>Heure de la messe</Text>
      <DateTimePicker
        value={heureMesse}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={(event, selectedTime) =>
          selectedTime && setHeureMesse(selectedTime)
        }
      />

      <Text style={styles.label}>Intentions</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Ex. : Pour le repos de l’âme de..."
        multiline
        numberOfLines={4}
        value={intentions}
        onChangeText={setIntentions}
      />

      <Button
        title="Soumettre la demande"
        onPress={handleSubmit}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F7FE",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2F3C7E",
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 6,
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});

export default NouvelleDemandeScreen;
