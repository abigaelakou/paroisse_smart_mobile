/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 06/06/2025 - 20:08:40
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 06/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../services/config";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Button,
  ActivityIndicator,
  Surface,
  Divider,
} from "react-native-paper";

const prieresCourantes = [
  {
    titre: "Notre Père",
    texte: "Notre Père, qui es aux cieux, que ton nom soit sanctifié...",
  },
  {
    titre: "Je vous salue Marie",
    texte:
      "Je vous salue, Marie, pleine de grâce ; le Seigneur est avec vous...",
  },
  {
    titre: "Acte de contrition",
    texte: "Mon Dieu, j’ai un très grand regret de vous avoir offensé...",
  },
];

export default function LecturePriereScreen() {
  const [selectedTab, setSelectedTab] = useState<"lecture" | "priere">(
    "lecture"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPriere, setSelectedPriere] = useState<any>(null);
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchLectures = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${API_URL}/lecture-du-jour`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        await AsyncStorage.removeItem("token");
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        return;
      }

      const data = await response.json();
      setLectures(data.lectures || []);
    } catch (error) {
      console.log("Erreur lors du chargement des lectures :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <View style={styles.container}>
      {/* Onglets Lecture / Prière */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "lecture" && styles.activeTab]}
          onPress={() => setSelectedTab("lecture")}
        >
          <Text style={styles.tabText}>📖 Lecture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "priere" && styles.activeTab]}
          onPress={() => setSelectedTab("priere")}
        >
          <Text style={styles.tabText}>🙏 Prières</Text>
        </TouchableOpacity>
      </View>

      <Divider />

      {/* Contenu */}
      <ScrollView contentContainerStyle={styles.content}>
        {selectedTab === "lecture" ? (
          loading ? (
            <ActivityIndicator animating color="#228B22" size="large" />
          ) : lectures.length === 0 ? (
            <Text style={styles.emptyText}>
              Aucune lecture disponible pour aujourd’hui.
            </Text>
          ) : (
            lectures.map((lecture, index) => (
              <Surface key={index} style={styles.card}>
                <Text style={styles.title}>{lecture.titre}</Text>
                <Text style={styles.text}>{lecture.texte}</Text>
              </Surface>
            ))
          )
        ) : (
          prieresCourantes.map((priere, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedPriere(priere);
                setModalVisible(true);
              }}
            >
              <Surface style={styles.card}>
                <Text style={styles.title}>{priere.titre}</Text>
              </Surface>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal pour afficher une prière */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedPriere?.titre}</Text>
          <ScrollView>
            <Text style={styles.modalText}>{selectedPriere?.texte}</Text>
          </ScrollView>
          <Button
            mode="contained"
            buttonColor="#228B22"
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            Fermer
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FE" },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    margin: 10,
    paddingVertical: 5,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  activeTab: {
    backgroundColor: "#C8E6C9",
    borderRadius: 20,
  },

  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#228B22",
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#228B22",
  },

  text: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },

  emptyText: {
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },

  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 12,
    textAlign: "center",
  },

  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },

  closeButton: {
    marginTop: 20,
  },
});
