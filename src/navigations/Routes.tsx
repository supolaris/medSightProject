import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import PatientsScreen from '../screens/PatientsScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import VoiceToTextScreen from '../screens/VoiceToTextScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';
import AddNewPatientScreen from '../screens/AddNewPatientScreen';
import { RootStackParamList } from '../@types/NavigationTypes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SideMenuScreen from '../screens/SideMenuScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import LegalScreen from '../screens/LegalScreen';
import WalkthroughScreen from '../screens/WalkthroughScreen';

const Stack = createStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Walkthrough" component={WalkthroughScreen} /> */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="VoiceToText" component={VoiceToTextScreen} />
        <Stack.Screen name="Patients" component={PatientsScreen} />
        <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
        <Stack.Screen name="AddNewPatient" component={AddNewPatientScreen} />
        <Stack.Screen name="SideMenu" component={SideMenuScreen} />
        <Stack.Screen name="Configuration" component={ConfigurationScreen} />
        <Stack.Screen name="Legal" component={LegalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
