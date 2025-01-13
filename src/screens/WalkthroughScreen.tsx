import { View } from 'react-native';
import React, { useEffect } from 'react';
import { addEventListener } from '@react-native-community/netinfo';
import { UserContext } from '../context/Context';
import { MicrosoftGraphConfiguration, mmkv } from '../utils/CommonFunctions';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { refresh } from 'react-native-app-auth';

const WalkthroughScreen = ({
  navigation,
}: MainStackScreenProps<'Walkthrough'>) => {
  const { updateisInternetConnected } = UserContext();

  useEffect(() => {
    handleNetworkInfo();
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    try {
      const userToken = mmkv.getString('userToken');
      if (userToken) {
        navigation.navigate('Patients');
      } else {
        navigation.navigate('Splash');
      }
    } catch (error) {
      console.log('error in authenticating user', error);
    }
  };

  const handleNetworkInfo = async () => {
    try {
      addEventListener((state) => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        updateisInternetConnected(state.isConnected!);
      });
    } catch (error) {
      console.log('Error arises on checking network info');
    }
  };

  const tokenRefresh = async () => {
    try {
      let provider = 'identifyServer';
      const config = MicrosoftGraphConfiguration[provider];
      const result = await refresh(config, {
        refreshToken: '',
      });
    } catch (error) {
      console.log('error in refresing token', error);
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
