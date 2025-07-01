/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 16/06/2025 - 10:56:14
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../services/config";

const HistoriquePainScreen = () => {
  const [pains, setPains] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistorique = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/pains-du-jour/historique`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status) {
        setPains(response.data.data);
      }
    } catch (error) {
      console.error(
        "Erreur lors du chargement de l’historique :",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorique();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.painCard}>
      <Text style={styles.date}>📅 {item.date}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.autoLabel}>
        {item.est_auto ? "Message automatique" : "Message manuel"}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#228B22" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des pains du jour</Text>
      <FlatList
        data={pains}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HistoriquePainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF", // blanc pur
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#228B22",
    textAlign: "center",
  },
  painCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#228B22",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  message: {
    fontSize: 16,
    color: "#222",
    lineHeight: 24,
    marginBottom: 6,
  },
  autoLabel: {
    fontSize: 13,
    color: "#999",
    fontStyle: "italic",
    textAlign: "right",
  },
});
