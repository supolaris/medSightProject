import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Routes } from './src/navigations/Routes';
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Routes />
    </>
  );
};

export default App;
