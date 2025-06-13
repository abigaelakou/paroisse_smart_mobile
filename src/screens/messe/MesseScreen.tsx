/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 06/06/2025 - 21:08:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
// src/screens/messe/MesseScreen.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NouvelleDemandeScreen from './NouvelleDemandeScreen';
import MesDemandesScreen from './MesDemandesScreen';

const Tab = createMaterialTopTabNavigator();

const MesseScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#2F3C7E' },
      }}
    >
      <Tab.Screen name="Nouvelle Demande" component={NouvelleDemandeScreen} />
      <Tab.Screen name="Mes Demandes" component={MesDemandesScreen} />
    </Tab.Navigator>
  );
};

export default MesseScreen;
