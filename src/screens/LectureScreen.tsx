/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 06/06/2025 - 20:08:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';

const LectureScreen = [
  {
    titre: "1ère Lecture",
    texte: "Lecture du livre d'Isaïe 55, 1-11..."
  },
  {
    titre: "Psaume",
    texte: "Psaume 18 : Les cieux proclament la gloire de Dieu..."
  },
  {
    titre: "Évangile",
    texte: "Évangile de Jésus-Christ selon saint Marc 1, 1-8..."
  }
];

const prieresCourantes = [
  {
    titre: "Notre Père",
    texte: "Notre Père, qui es aux cieux, que ton nom soit sanctifié..."
  },
  {
    titre: "Je vous salue Marie",
    texte: "Je vous salue, Marie, pleine de grâce ; le Seigneur est avec vous..."
  },
  {
    titre: "Acte de contrition",
    texte: "Mon Dieu, j’ai un très grand regret de vous avoir offensé..."
  }
];

export default function LecturePriereScreen() {
  const [selectedTab, setSelectedTab] = useState('lecture');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPriere, setSelectedPriere] = useState(null);

  const openPriere = (priere) => {
    setSelectedPriere(priere);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Onglets Lecture / Prière */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'lecture' && styles.activeTab]}
          onPress={() => setSelectedTab('lecture')}
        >
          <Text style={styles.tabText}>Lecture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'priere' && styles.activeTab]}
          onPress={() => setSelectedTab('priere')}
        >
          <Text style={styles.tabText}>Prière</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu */}
      <ScrollView contentContainerStyle={styles.content}>
        {selectedTab === 'lecture' ? (
          LectureScreen.map((lecture, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{lecture.titre}</Text>
              <Text style={styles.sectionText}>{lecture.texte}</Text>
            </View>
          ))
        ) : (
          prieresCourantes.map((priere, index) => (
            <TouchableOpacity key={index} onPress={() => openPriere(priere)} style={styles.section}>
              <Text style={styles.sectionTitle}>{priere.titre}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal pour afficher une prière */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.sectionTitle}>{selectedPriere?.titre}</Text>
          <ScrollView>
            <Text style={styles.sectionText}>{selectedPriere?.texte}</Text>
          </ScrollView>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTab: {
    borderBottomColor: '#007AFF'
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600'
  },
  content: {
    padding: 16
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    borderRadius: 6
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16
  }
});
