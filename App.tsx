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
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import BottomTabs from "./src/navigation/BottomTabs"; // ta navigation onglets

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
