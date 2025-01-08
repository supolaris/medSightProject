import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import VoiceToTextScreen from '../screens/VoiceToTextScreen';
import { RootStackParamList } from '../@types/NavigationTypes';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import PatientsScreen from '../screens/PatientsScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';
const Stack = createStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Patients"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="VoiceToText" component={VoiceToTextScreen} />
        <Stack.Screen name="Patients" component={PatientsScreen} />
        <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
