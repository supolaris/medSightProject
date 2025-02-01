import { View } from 'react-native';
import React, { useEffect } from 'react';
import { UserContext } from '../context/Context';
import { checkTokenValidity } from '../utils/CommonFunctions';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { addEventListener } from '@react-native-community/netinfo';

const WalkthroughScreen = ({
  navigation,
}: MainStackScreenProps<'Walkthrough'>) => {
  const { updateisInternetConnected } = UserContext();

  useEffect(() => {
    Promise.all([handleNetworkInfo(), checkAuthentication()]);
  }, []);

  const checkAuthentication = async () => {
    try {
      const isAuthenticated = await checkTokenValidity();

      console.log('isAuthenticated', isAuthenticated);
      if (isAuthenticated) {
        console.log('hello world authenticated');
        navigation.navigate('Patients');
      } else {
        console.log('hello world not authenticated');
        navigation.navigate('Splash');
      }
    } catch (error) {
      console.log('error in checkAuthentication', error);
    }
  };

  const handleNetworkInfo = async () => {
    try {
      addEventListener((state) => {
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        updateisInternetConnected(state.isConnected!);
      });
    } catch (error) {
      console.log('Error arises on checking network info');
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    />
  );
};

export default WalkthroughScreen;
