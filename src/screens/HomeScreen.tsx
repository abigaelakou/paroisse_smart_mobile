/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 22/05/2025 - 18:30:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/05/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { fetchHomeData } from '../services/HomeService';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [nouvelles, setNouvelles] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [pain, setPain] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHomeData();
        setNouvelles(data.nouvelles);
        setAnnonces(data.annonces);
        setPain(data.pain);
      } catch (error) {
        console.error('Erreur chargement Accueil:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2F3C7E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* ✅ En-tête avec logo et message */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo-paroisse.png')}
          style={styles.logo}
        />
        <Text style={styles.welcome}>Bienvenue dans votre espace paroissien 👋</Text>
      </View>
        <Text style={styles.sectionTitle}>🍞 Pain du jour</Text>
        {pain ? (
          <View style={[styles.card, styles.painCard]}>
            <Text style={styles.painTitle}>{pain.titre}</Text>
            <Text style={styles.painText}>{pain.contenu}</Text>
            <Text style={styles.painDate}>📅 {pain.date_pain}</Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>Pas de pain pour aujourd'hui.</Text>
        )}

      {/* ✅ Nouvelles */}
      <Text style={styles.sectionTitle}>📰 Dernières nouvelles</Text>
      {nouvelles.length === 0 ? (
        <Text style={styles.emptyText}>Aucune nouvelle pour le moment.</Text>
      ) : (
        nouvelles.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.titre}</Text>
            <Text style={styles.cardText}>{item.contenu}</Text>
          </View>
        ))
      )}

      {/* ✅ Annonces de la semaine */}
      <Text style={styles.sectionTitle}>📢 Annonces de la semaine</Text>
      {annonces.length === 0 ? (
        <Text style={styles.emptyText}>Aucune annonce disponible.</Text>
      ) : (
        annonces.map((item) => (
          <View key={item.id} style={[styles.card, styles.annonceCard]}>
            <Text style={styles.cardTitle}>{item.titre}</Text>
            <Text style={styles.cardText}>{item.contenu}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FE', padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 10 },
  welcome: { fontSize: 18, color: '#2F3C7E', fontWeight: 'bold', textAlign: 'center' },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F3C7E',
    marginTop: 20,
    marginBottom: 8
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  annonceCard: {
    backgroundColor: '#E7EEFF'
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F3C7E',
    marginBottom: 4
  },

  cardText: {
    fontSize: 14,
    color: '#444'
  },

  emptyText: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 16
  }
});

export default HomeScreen;


