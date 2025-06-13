/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 06/06/2025 - 20:57:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PainDuJourScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pain du jour</Text>
      <Text style={styles.subtitle}>Méditation quotidienne disponible ici.</Text>
    </View>
  );
};

export default PainDuJourScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F7FE' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2F3C7E', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555' },
});
