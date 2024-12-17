import React from 'react';
import VoiceToTextScreen from './src/screens/VoiceToTextScreen';
import { LogBox, StatusBar } from 'react-native';
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <VoiceToTextScreen />
    </>
  );
};

export default App;
