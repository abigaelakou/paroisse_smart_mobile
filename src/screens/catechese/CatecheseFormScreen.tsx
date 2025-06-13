/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 10/06/2025 - 09:17:13
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL } from '../../services/config';

export default function CatecheseFormScreen({ navigation }) {
  const [anneeCatechetique, setAnneeCatechetique] = useState('');
  const [dateInscription, setDateInscription] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [catechumenes, setCatechumenes] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [selectedCatechumene, setSelectedCatechumene] = useState(null);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, nivRes, sesRes] = await Promise.all([
          fetch(`${API_URL}/catechumenes`),
          fetch(`${API_URL}/niveau_catechetiques`),
          fetch(`${API_URL}/session_catecheses`),
        ]);

        if (!catRes.ok || !nivRes.ok || !sesRes.ok) {
          throw new Error('Erreur de chargement des données');
        }

        const catData = await catRes.json();
        const nivData = await nivRes.json();
        const sesData = await sesRes.json();

        setCatechumenes(catData);
        setNiveaux(nivData);
        setSessions(sesData);
      } catch (error) {
        Alert.alert('Erreur', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDateInscription(selectedDate);
  };

  const handleSubmit = async () => {
    if (!anneeCatechetique || !selectedCatechumene || !selectedNiveau || !selectedSession) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/inscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annee_catechetique: anneeCatechetique,
          date_inscription: dateInscription.toISOString().split('T')[0],
          id_catechumene: selectedCatechumene,
          id_niveau: selectedNiveau,
          id_session: selectedSession,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Erreur', JSON.stringify(errorData.error || 'Erreur inconnue'));
        return;
      }

      const data = await response.json();
      Alert.alert('Succès', 'Inscription enregistrée.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('CatecheseList'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des données...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Année catéchétique</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2025-2026"
        value={anneeCatechetique}
        onChangeText={setAnneeCatechetique}
      />

      <Text style={styles.label}>Date d'inscription</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text>{dateInscription.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={dateInscription} mode="date" display="default" onChange={onDateChange} />
      )}

      <Text style={styles.label}>Catéchumène</Text>
      {catechumenes.length === 0 ? (
        <Text>Aucun catéchumène disponible</Text>
      ) : (
        catechumenes.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[
              styles.option,
              selectedCatechumene === c.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedCatechumene(c.id)}
          >
            <Text>{c.nom}</Text>
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.label}>Niveau catéchétique</Text>
      {niveaux.length === 0 ? (
        <Text>Aucun niveau disponible</Text>
      ) : (
        niveaux.map((n) => (
          <TouchableOpacity
            key={n.id}
            style={[
              styles.option,
              selectedNiveau === n.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedNiveau(n.id)}
          >
            <Text>{n.lib_niveau}</Text>
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.label}>Session catéchèse</Text>
      {sessions.length === 0 ? (
        <Text>Aucune session disponible</Text>
      ) : (
        sessions.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[
              styles.option,
              selectedSession === s.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedSession(s.id)}
          >
            <Text>{s.lib_session}</Text>
          </TouchableOpacity>
        ))
      )}

      <Button title="Valider inscription" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
    borderRadius: 4,
  },
  dateInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    borderRadius: 4,
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
});
