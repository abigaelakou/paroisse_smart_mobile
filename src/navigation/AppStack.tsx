/**
 * @description      :
 * @author           : AbigaelHOMENYA
 * @group            :
 * @created          : 22/05/2025 - 11:47:06
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 22/05/2025
 * - Author          : AbigaelHOMENYA
 * - Modification    :
 **/
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ProfilScreen from "../screens/ProfilScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import VoirRecuPDFScreen from "../screens/catechese/VoirRecuPDFScreen";
import DetailInscriptionScreen from "../screens/catechese/DetailInscriptionScreen";
import MesRecusScreen from "../screens/receipts/MesRecusScreen";
import HistoriquePainScreen from "../screens/HistoriquePainScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ title: "Profil" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Changer mot de passe" }}
      />
      <Stack.Screen
        name="DetailInscription"
        component={DetailInscriptionScreen}
      />
      <Stack.Screen name="VoirRecuPDF" component={VoirRecuPDFScreen} />
      <Stack.Screen
        name="MesRecus"
        component={MesRecusScreen}
        options={{ title: "Mes recus" }}
      />
      <Stack.Screen name="HistoriquePain" component={HistoriquePainScreen} />
    </Stack.Navigator>
  );
}
