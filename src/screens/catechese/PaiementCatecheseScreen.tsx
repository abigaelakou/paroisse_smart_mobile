/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 10/06/2025 - 09:27:10
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { API_URL } from '../../services/config';

export default function PaiementCatecheseScreen({ route, navigation }) {
  const { id_inscription } = route.params;
  const [montant, setMontant] = useState('');
  const [modePaiement, setModePaiement] = useState('');
  const [contact, setContact] = useState('');

  const handlePaiement = async () => {
    if (!montant || !modePaiement) {
      Alert.alert('Erreur', 'Montant et mode de paiement sont obligatoires.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/payer-inscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_inscription,
          montant: parseFloat(montant),
          mode_paiement: modePaiement,
          contact,
          payment_status: 'Payé'
        })
      });

      const data = await res.json();

      if (res.status === 201) {
        Alert.alert('Succès', 'Paiement enregistré.', [
          { text: 'Voir le reçu', onPress: () => navigation.navigate('ListeCatechese') }
        ]);
      } else {
        Alert.alert('Erreur', data?.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d’enregistrer le paiement.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Montant</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={montant}
        onChangeText={setMontant}
        placeholder="ex: 5000"
      />

      <Text style={styles.label}>Mode de paiement</Text>
      <TextInput
        style={styles.input}
        value={modePaiement}
        onChangeText={setModePaiement}
        placeholder="ex: Espèces, Mobile Money"
      />

      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholder="Numéro de téléphone (facultatif)"
      />

      <TouchableOpacity style={styles.button} onPress={handlePaiement}>
        <Text style={styles.buttonText}>Valider le paiement</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10
  },
  button: {
    backgroundColor: '#007AFF',
    marginTop: 20,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
