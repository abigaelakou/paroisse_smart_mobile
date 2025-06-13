/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 10/06/2025 - 08:58:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
import { API_URL } from '../../services/config';

export default function CatecheseListScreen() {
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`${API_URL}/liste-paiements`)
      .then(res => res.json())
      .then(data => {
        setPaiements(data.paiements || []);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert('Erreur', 'Impossible de charger les paiements.');
        setLoading(false);
      });
  }, []);

  const handleOpenRecu = async (id) => {
    try {
      const res = await fetch(`${API_URL}/inscription/${id}`);
      const data = await res.json();

      if (data.paiement.status !== 'Payé') {
        Alert.alert('Paiement en attente', 'Le reçu est disponible uniquement après paiement.');
        return;
      }

      const resRecu = await fetch(`${API_URL}/recu-paiement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_inscription: id }),
      });

      const recuData = await resRecu.json();
      if (recuData.recu_url) {
        Linking.openURL(recuData.recu_url);
      } else {
        Alert.alert('Erreur', 'Aucun reçu trouvé.');
      }
    } catch (err) {
      Alert.alert('Erreur', 'Impossible d’ouvrir le reçu.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des inscriptions...</Text>
      </View>
    );
  }

  if (paiements.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Aucune inscription trouvée.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {paiements.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>Catéchumène: {item.inscription.catechumene?.nom ?? 'Inconnu'}</Text>
          <Text>Niveau: {item.inscription.niveau?.lib_niveau}</Text>
          <Text>Session: {item.inscription.session?.lib_session}</Text>
          <Text>Année: {item.inscription.annee_catechetique}</Text>
          <Text>Statut: <Text style={{ color: item.payment_status === 'Payé' ? 'green' : 'red' }}>{item.payment_status}</Text></Text>

          {item.payment_status === 'Payé' && (
            <TouchableOpacity style={styles.button} onPress={() => handleOpenRecu(item.id_inscription)}>
              <Text style={styles.buttonText}>Voir le reçu</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },
  button: {
    marginTop: 8,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  }
});
