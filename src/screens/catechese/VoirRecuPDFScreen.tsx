/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 12/06/2025 - 10:19:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 12/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const VoirRecuPDFScreen = () => {
  const route = useRoute();
  const { url } = route.params;

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url) return;

    try {
      setDownloading(true);
      const fileUri = FileSystem.documentDirectory + 'recu.pdf';

      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri
      );

      const { uri } = await downloadResumable.downloadAsync();
      setDownloading(false);

      Alert.alert('Téléchargement terminé', 'Voulez-vous partager ou ouvrir le reçu ?', [
        {
          text: 'Ouvrir',
          onPress: () => Sharing.shareAsync(uri),
        },
        {
          text: 'Fermer',
          style: 'cancel',
        },
      ]);
    } catch (error) {
      console.error('Erreur téléchargement :', error);
      Alert.alert('Erreur', 'Impossible de télécharger le reçu.');
      setDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      {url ? (
        <>
          <WebView
            source={{ uri: url }}
            startInLoadingState
            renderLoading={() => (
              <ActivityIndicator size="large" color="#2F3C7E" style={styles.loader} />
            )}
          />
          <TouchableOpacity style={styles.button} onPress={handleDownload} disabled={downloading}>
            <Text style={styles.buttonText}>
              {downloading ? 'Téléchargement...' : 'Télécharger le reçu'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" color="#2F3C7E" style={styles.loader} />
      )}
    </View>
  );
};

export default VoirRecuPDFScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2F3C7E',
    padding: 12,
    margin: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
