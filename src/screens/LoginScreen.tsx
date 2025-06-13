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
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { login } from '../services/Auth';
import { registerForPushNotificationsAsync } from '../services/notifications';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔁 Redirection si déjà connecté
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.replace('Home');
      }
    };
    checkToken();
  }, []);
  const sendExpoTokenToBackend = async (expoToken, authToken) => {
  try {
    const response = await fetch(`${API_URL}/user/expo-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ expo_token: expoToken }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erreur d’enregistrement du token');

    console.log('Token Expo envoyé avec succès');
  } catch (error) {
    console.error('Erreur envoi expo token:', error);
  }
};

  const handleLogin = async () => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (json.status) {
      const token = json.token;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(json.user));

      // Récupération du token Expo
      const expoToken = await registerForPushNotificationsAsync();
      if (expoToken) {
        await sendExpoTokenToBackend(expoToken, token);
      }

      navigation.navigate('Home');
    } else {
      alert(json.message || 'Connexion échouée');
    }
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la connexion.");
  }
};



  const handleForgotPassword = () => {
    Alert.alert('Mot de passe oublié', 'Veuillez contacter votre paroisse.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Paroisse Smart</Text>
          <Text style={styles.subtitle}>Connexion paroissien</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Se connecter</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FE' },
  scrollContainer: { padding: 24, justifyContent: 'center', flexGrow: 1 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2F3C7E' },
  subtitle: { fontSize: 16, color: '#888', marginTop: 4 },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    elevation: 1,
  },
  forgotText: { color: '#2F3C7E', textAlign: 'right', marginBottom: 20, fontSize: 14 },
  button: {
    backgroundColor: '#2F3C7E',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default LoginScreen;
