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
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../services/config';

export default function ProfilScreen() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Erreur de chargement utilisateur', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn('Erreur API logout (peut être ignorée)', err);
    }

    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>{user?.paroisse?.nom ?? 'Paroisse inconnue'}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.option}
        onPress={() => Alert.alert('Infos', 'Tu peux afficher les infos détaillées ici.')}
      >
        <Text style={styles.optionText}>🧾 Voir mes informations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <Text style={styles.optionText}>🔐 Changer le mot de passe</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MesReçus')}>
        <Text style={styles.buttonText}>Mes reçus PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, { backgroundColor: '#F8D7DA' }]}
        onPress={handleLogout}
      >
        <Text style={[styles.optionText, { color: '#721C24' }]}>🚪 Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  userInfo: { marginBottom: 20 },
  name: { fontSize: 20, fontWeight: 'bold' },
  option: {
    padding: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
