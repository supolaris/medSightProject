import React from 'react';
import SideMenu from '../components/SideMenu';
import { MainStackScreenProps } from '../@types/NavigationTypes';

const SideMenuScreen = ({ navigation }: MainStackScreenProps<'SideMenu'>) => {
  const onPressClose = () => {
    navigation.goBack();
  };

  const onLegalPressed = () => {
    navigation.navigate('Legal');
  };
  const onConfigurationPressed = () => {
    navigation.navigate('Configuration');
  };
  const onShareAppPressed = () => {};

  return (
    <SideMenu
      onPressClose={onPressClose}
      onLegalPressed={onLegalPressed}
      onConfigurationPressed={onConfigurationPressed}
      onShareAppPressed={onShareAppPressed}
    />
  );
};

export default SideMenuScreen;
