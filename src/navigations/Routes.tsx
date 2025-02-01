import React from 'react';
import EditScreen from '../screens/EditScreen';
import LegalScreen from '../screens/LegalScreen';
import SplashScreen from '../screens/SplashScreen';
import SideMenuScreen from '../screens/SideMenuScreen';
import PatientsScreen from '../screens/PatientsScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import WalkthroughScreen from '../screens/WalkthroughScreen';
import VoiceToTextScreen from '../screens/VoiceToTextScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../@types/NavigationTypes';
import AddNewPatientScreen from '../screens/AddNewPatientScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Walkthrough"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Legal" component={LegalScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="Patients" component={PatientsScreen} />
        <Stack.Screen name="SideMenu" component={SideMenuScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="VoiceToText" component={VoiceToTextScreen} />
        <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
        <Stack.Screen name="AddNewPatient" component={AddNewPatientScreen} />
        <Stack.Screen name="Configuration" component={ConfigurationScreen} />
        <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
