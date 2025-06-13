/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 10/06/2025 - 09:03:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CatecheseListScreen from './CatecheseListScreen';
import CatecheseFormScreen from './CatecheseFormScreen';
import PaiementCatecheseScreen from './PaiementCatecheseScreen';
import DetailInscriptionScreen from './DetailInscriptionScreen';

const Tab = createMaterialTopTabNavigator();

const CatecheseNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#2F3C7E' },
      }}
    >
      <Tab.Screen name="Mes inscrits" component={CatecheseListScreen} />
      <Tab.Screen name="Inscription" component={CatecheseFormScreen} />
      <Tab.Screen name="PaiementCatechese" component={PaiementCatecheseScreen} />
      <Tab.Screen name="DetailInscription" component={DetailInscriptionScreen}   
      options={{ tabBarButton: () => null }}/>

    </Tab.Navigator>
  );
};

export default CatecheseNavigator;
