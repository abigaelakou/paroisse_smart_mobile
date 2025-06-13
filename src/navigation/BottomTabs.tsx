/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 06/06/2025 - 20:51:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/06/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DonScreen from '../screens/DonScreen';
import LectureScreen from '../screens/LectureScreen';
import ProfilScreen from '../screens/ProfilScreen';
import PainDuJourScreen from '../screens/PainDuJourScreen';
import CatecheseNavigator from '../screens/catechese/CatecheseNavigator';
import MesseScreen from '../screens/messe/MesseScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2F3C7E',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 5 },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Accueil':
              iconName = 'home';
              break;
            case 'Don':
              iconName = 'cash';
              break;
            case 'Lecture':
              iconName = 'book';
              break;
            case 'Catéchèse':
              iconName = 'school';
              break;
            case 'Messe':
              iconName = 'calendar';
              break;
            case 'Profil':
              iconName = 'person';
              break;
            case 'Pain du Jour':
              iconName = 'restaurant';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Don" component={DonScreen} />
      <Tab.Screen name="Lecture" component={LectureScreen} />
      <Tab.Screen name="Pain du Jour" component={PainDuJourScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
      
      <Tab.Screen
      name="Messe"
      component={MesseScreen}
      options={{
        tabBarLabel: 'Messe',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" color={color} size={size} />
        ),
      }}
    />
    {/* CATECHESE */}
    <Tab.Screen
      name="Catéchèse"
      component={CatecheseNavigator}
      options={{
        tabBarLabel: 'Catéchèse',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="school" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
    name="Profil"
    component={ProfilScreen}
    options={{
      tabBarLabel: 'Profil',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person" size={size} color={color} />
      ),
    }}
  />




    </Tab.Navigator>
  );
}
