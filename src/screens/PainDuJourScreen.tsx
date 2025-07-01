/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 16/06/2025 - 10:56:49
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Text,
  ActivityIndicator,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
} from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../services/config";
import Animated, { FadeInDown } from "react-native-reanimated";

const PainDuJourScreen = () => {
  const [pain, setPain] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchPainDuJour = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/pain-du-jour`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status) {
        setPain(response.data.pain);
      }
    } catch (error) {
      console.error("Erreur lors du chargement :", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPainDuJour();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating size="large" color="#228B22" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(500)}>
        <Title style={styles.header}>🍞 Pain du jour</Title>

        {pain ? (
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title={pain.titre || "Message spirituel"}
              subtitle={`📅 ${pain.date}`}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="cross"
                  style={{ backgroundColor: "#228B22" }}
                />
              )}
            />
            <Card.Content>
              <Paragraph style={styles.message}>{pain.message}</Paragraph>
            </Card.Content>
          </Card>
        ) : (
          <View style={styles.centered}>
            <Text style={styles.noPain}>Aucun message pour aujourd’hui.</Text>
          </View>
        )}

        <Button
          mode="text"
          onPress={() => navigation.navigate("HistoriquePain")}
          icon="history"
          style={{ marginTop: 20 }}
          labelStyle={{ color: "#2F3C7E", fontWeight: "bold" }}
        >
          Voir l’historique des pains du jour
        </Button>
      </Animated.View>
    </ScrollView>
  );
};

export default PainDuJourScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F7FE",
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    paddingBottom: 12,
  },
  message: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    lineHeight: 24,
  },
  noPain: {
    fontStyle: "italic",
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
});
