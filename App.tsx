import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Routes } from './src/navigations/Routes';
import { UserProvider } from './src/context/Context';
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <UserProvider>
        <Routes />
      </UserProvider>
    </>
  );
};

export default App;
