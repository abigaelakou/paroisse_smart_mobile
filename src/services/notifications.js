/**
 * @description      : 
 * @author           : AbigaelHOMENYA
 * @group            : 
 * @created          : 12/06/2025 - 09:10:24
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 12/06/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    : 
 **/
// services/notifications.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Permission refusée', 'Impossible d’obtenir la permission de notification.');
            return null;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo push token:', token);
    } else {
        Alert.alert('Erreur', 'Les notifications ne fonctionnent que sur un appareil physique.');
        return null;
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        });
    }

    return token;
}