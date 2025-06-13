/**
    * @description      : 
    * @author           : AbigaelHOMENYA
    * @group            : 
    * @created          : 22/05/2025 - 19:47:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/05/2025
    * - Author          : AbigaelHOMENYA
    * - Modification    : 
**/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import BottomTabs from './src/navigation/BottomTabs';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/services/notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default function HomeScreen() {
  useEffect(() => {
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      
      if (token) {
        // Tu peux envoyer ce token à ton backend pour l'enregistrer
        console.log('Token de notification :', token);
      }

      // Gestion des notifications reçues
      Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification reçue:', notification);
      });

      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Interaction avec la notification:', response);
      });
    };

    setupNotifications();
  }, []);

  return (
    // ton UI
  );
}
