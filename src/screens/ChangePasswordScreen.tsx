/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 12/06/2025 - 08:40:49
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../services/config";
import {
  TextInput,
  Button,
  Title,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        Alert.alert("Session expirée", "Veuillez vous reconnecter.");
        await AsyncStorage.removeItem("token");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        return;
      }

      if (!response.ok) {
        Alert.alert("Erreur", data.message || "Une erreur est survenue.");
      } else {
        Alert.alert("Succès", "Mot de passe modifié avec succès.");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la requête.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Title style={styles.title}>🔐 Changer le mot de passe</Title>

      <TextInput
        label="Mot de passe actuel"
        mode="outlined"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={!showCurrent}
        right={
          <TextInput.Icon
            icon={showCurrent ? "eye-off" : "eye"}
            onPress={() => setShowCurrent(!showCurrent)}
          />
        }
        style={styles.input}
      />

      <TextInput
        label="Nouveau mot de passe"
        mode="outlined"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={!showNew}
        right={
          <TextInput.Icon
            icon={showNew ? "eye-off" : "eye"}
            onPress={() => setShowNew(!showNew)}
          />
        }
        style={styles.input}
      />

      <TextInput
        label="Confirmer le mot de passe"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirm}
        right={
          <TextInput.Icon
            icon={showConfirm ? "eye-off" : "eye"}
            onPress={() => setShowConfirm(!showConfirm)}
          />
        }
        style={styles.input}
      />

      {newPassword !== confirmPassword && confirmPassword.length > 0 && (
        <HelperText type="error">
          Les mots de passe ne correspondent pas
        </HelperText>
      )}

      {loading ? (
        <ActivityIndicator
          animating={true}
          color="#228B22"
          style={{ marginTop: 20 }}
        />
      ) : (
        <Button
          mode="contained"
          onPress={handleChangePassword}
          style={styles.button}
          buttonColor="#228B22"
        >
          Valider
        </Button>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "#228B22",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
