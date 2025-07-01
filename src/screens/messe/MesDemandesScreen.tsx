/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 06/06/2025 - 21:44:29
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 06/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../services/config";

const MesDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDemandes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${API_URL}/mes-demandes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDemandes(res.data);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de récupérer les demandes.");
      console.error("Erreur lors de la récupération des demandes :", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDemandes();
  };

  const renderItem = ({ item }) => {
    const dateStr = new Date(item.date_messe).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return (
      <View style={styles.card}>
        <Text style={styles.title}>
          {item.type_messe?.lib_type_messe || "Messe"}
        </Text>
        <Text>Date : {dateStr}</Text>
        <Text>Heure : {item.heure_messe}</Text>
        <Text>Intention : {item.intentions}</Text>
        <Text style={styles.status}>
          Statut :{" "}
          <Text
            style={item.status === "validée" ? styles.valide : styles.attente}
          >
            {item.status || "En attente"}
          </Text>
        </Text>
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  if (demandes.length === 0) {
    return <Text style={styles.empty}>Aucune demande enregistrée.</Text>;
  }

  return (
    <FlatList
      data={demandes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#2F3C7E",
  },
  status: {
    marginTop: 6,
    fontWeight: "bold",
  },
  valide: {
    color: "green",
  },
  attente: {
    color: "#FF8C00",
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
});

export default MesDemandes;
