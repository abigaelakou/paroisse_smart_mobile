/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 12/06/2025 - 10:22:42
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import { API_URL } from "../../services/config";

const RECEIPT_DIR = FileSystem.documentDirectory + "recus/";

const MesRecusScreen = () => {
  const [pdfs, setPdfs] = useState<
    { uri: string; name: string; date: number }[]
  >([]);
  const [selectedUri, setSelectedUri] = useState<string | null>(null);

  const loadRecus = async () => {
    try {
      await FileSystem.makeDirectoryAsync(RECEIPT_DIR, { intermediates: true });
      const files = await FileSystem.readDirectoryAsync(RECEIPT_DIR);
      const fileDetails = await Promise.all(
        files.map(async (file) => {
          const uri = RECEIPT_DIR + file;
          const info = await FileSystem.getInfoAsync(uri);
          return {
            uri,
            name: file,
            date: info.modificationTime || 0,
          };
        })
      );

      // Trier du plus récent au plus ancien
      const sorted = fileDetails.sort((a, b) => b.date - a.date);
      setPdfs(sorted);
    } catch (error) {
      console.error("Erreur de chargement recus :", error);
    }
    {
      pdfs.length === 0 && (
        <Text style={{ fontStyle: "italic", color: "#888", marginTop: 30 }}>
          Aucun reçu enregistré pour l’instant.
        </Text>
      );
    }
  };

  const handleDelete = (uri: string) => {
    Alert.alert("Supprimer", "Supprimer ce recu ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          await FileSystem.deleteAsync(uri, { idempotent: true });
          loadRecus();
        },
      },
    ]);
  };

  const handleDeleteAll = () => {
    Alert.alert("Tout supprimer", "Supprimer tous les recus ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Tout supprimer",
        style: "destructive",
        onPress: async () => {
          const files = await FileSystem.readDirectoryAsync(RECEIPT_DIR);
          await Promise.all(
            files.map((file) =>
              FileSystem.deleteAsync(RECEIPT_DIR + file, { idempotent: true })
            )
          );
          loadRecus();
        },
      },
    ]);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return (
      date.toLocaleDateString("fr-FR") + " " + date.toLocaleTimeString("fr-FR")
    );
  };

  useEffect(() => {
    loadRecus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes recus PDF</Text>

      {pdfs.length > 0 && (
        <TouchableOpacity
          style={styles.deleteAllButton}
          onPress={handleDeleteAll}
        >
          <Text style={styles.deleteAllText}>🧹 Supprimer tous les recus</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={pdfs}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.fileName}>{item.name}</Text>
            <Text style={styles.dateText}>📅 {formatDate(item.date)}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setSelectedUri(item.uri)}>
                <Text style={styles.open}>🧾 Voir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.uri)}>
                <Text style={styles.delete}>🗑️ Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Visionneuse PDF */}
      <Modal visible={!!selectedUri} animationType="slide">
        <View style={{ flex: 1 }}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setSelectedUri(null)}>
              <Text style={styles.closeButton}>Fermer</Text>
            </Pressable>
          </View>
          <WebView source={{ uri: selectedUri! }} style={{ flex: 1 }} />
        </View>
      </Modal>
    </View>
  );
};

export default MesRecusScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  deleteAllButton: {
    backgroundColor: "#f9c2c2",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  deleteAllText: { color: "#721C24", fontWeight: "bold" },
  itemContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  fileName: { fontSize: 16, fontWeight: "600" },
  dateText: { fontSize: 14, color: "#555", marginBottom: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  open: { color: "#2F3C7E", fontWeight: "bold" },
  delete: { color: "crimson", fontWeight: "bold" },
  modalHeader: {
    padding: 10,
    backgroundColor: "#2F3C7E",
  },
  closeButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
