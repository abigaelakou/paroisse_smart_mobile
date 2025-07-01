/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 22/05/2025 - 18:29:27
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 22/05/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_URL } from "../services/config";
import { registerForPushNotificationsAsync } from "../services/notifications";
import { Ionicons } from "@expo/vector-icons";
import { ENV } from "../env";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("API_URL utilisée :", API_URL);

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token && isMounted) {
        navigation.replace("Home");
      }
    };
    checkToken();
    return () => {
      isMounted = false;
    };
  }, []);

  const sendExpoTokenToBackend = async (expoToken, authToken) => {
    try {
      const response = await fetch(`${API_URL}/updateExpoToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ expo_token: expoToken }),
      });
      if (!response.ok) throw new Error("Échec envoi expoToken");
    } catch (err) {
      Alert.alert("Erreur", "Erreur lors de la connexion.");
      console.log("ERREUR DE CONNEXION :", err);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre email et mot de passe.");
      return;
    }

    setLoading(true);
    console.log("Environnement:", ENV);
    console.log("API_URL utilisée:", API_URL);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resText = await res.text();
      console.log("Réponse brute :", resText);

      let json;
      try {
        json = JSON.parse(resText);
      } catch (parseErr) {
        throw new Error("Réponse invalide, pas du JSON.");
      }

      if (json.status) {
        const token = json.token;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(json.user));

        const expoToken = await registerForPushNotificationsAsync();
        if (expoToken) {
          await sendExpoTokenToBackend(expoToken, token);
        }

        navigation.replace("Home");
      } else {
        Alert.alert("Erreur", json.message || "Connexion échouée.");
      }
    } catch (err) {
      Alert.alert("Erreur", "Erreur lors de la connexion.");
      console.log("Erreur de connexion :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Paroisse Smart</Text>
          <Text style={styles.subtitle}>Connexion des fidèles</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Mot de passe"
              style={[styles.input, { flex: 1 }]}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Mot de passe oublié",
              "Veuillez contacter votre paroisse."
            )
          }
        >
          <Text style={styles.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FE" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 24 },

  header: { alignItems: "center", marginBottom: 40 },
  title: { fontSize: 26, fontWeight: "bold", color: "#228B22" },
  subtitle: { fontSize: 15, color: "#555", marginTop: 6 },

  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    elevation: 1,
  },
  input: {
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  forgot: {
    color: "#228B22",
    textAlign: "right",
    marginBottom: 20,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#228B22",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginScreen;
