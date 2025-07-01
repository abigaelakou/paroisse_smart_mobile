/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 06/06/2025 - 20:58:09
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 06/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ScrollView, Image } from "react-native";
import {
  Text,
  Button,
  Divider,
  List,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { API_URL } from "../services/config";

export default function ProfilScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Erreur de chargement utilisateur", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("Erreur API logout (peut être ignorée)", err);
    }
    await AsyncStorage.removeItem("token");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating color="#228B22" size="large" />
      </View>
    );
  }

  return (
    <Animated.ScrollView
      style={styles.container}
      entering={FadeInDown.duration(600)}
    >
      {/* Image de profil */}
      <View style={styles.profileHeader}>
        <Avatar.Image
          size={100}
          source={
            user?.profile_image
              ? { uri: user.profile_image }
              : require("../../assets/icon.png")
          }
          
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.paroisse}>
          {user?.paroisse?.nom ?? "Paroisse inconnue"}
        </Text>
        <Button
          icon="account-edit"
          mode="outlined"
          onPress={() => Alert.alert("Modifier le profil", "Fonction à venir.")}
          style={styles.editButton}
        >
          Modifier mon profil
        </Button>
      </View>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Item
          title="Voir mes informations"
          description="Consulte tes informations personnelles"
          left={(props) => <List.Icon {...props} icon="information-outline" />}
          onPress={() => Alert.alert("Infos", "À personnaliser")}
        />
        <List.Item
          title="Changer le mot de passe"
          left={(props) => <List.Icon {...props} icon="lock-outline" />}
          onPress={() => navigation.navigate("ChangerMotDePasse")}
        />
        <List.Item
          title="Mes reçus PDF"
          left={(props) => <List.Icon {...props} icon="file-pdf-box" />}
          onPress={() => navigation.navigate("VoirRecuPDF")}
        />
      </List.Section>

      <Divider style={styles.divider} />

      <Button
        icon="logout"
        mode="contained-tonal"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={{ color: "#721C24" }}
      >
        Se déconnecter
      </Button>
    </Animated.ScrollView>
  );
}

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
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#228B22",
    marginTop: 10,
  },
  email: {
    color: "#666",
  },
  paroisse: {
    color: "#555",
    marginTop: 4,
    fontStyle: "italic",
  },
  editButton: {
    marginTop: 12,
    borderColor: "#228B22",
  },
  divider: {
    marginVertical: 16,
  },
  logoutButton: {
    backgroundColor: "#F8D7DA",
    marginBottom: 20,
  },
});
