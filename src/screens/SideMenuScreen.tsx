import React, { useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { mmkv } from '../utils/CommonFunctions';

const SideMenuScreen = ({ navigation }: MainStackScreenProps<'SideMenu'>) => {
  const [userImage, setUserImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  useEffect(() => {
    const userImage = mmkv.getString('userImage') as string;
    const userName = mmkv.getString('userName') as string;

    setUserImage(userImage);
    setUserName(userName);
  }, []);

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
      userImage={userImage}
      userName={userName}
      onPressClose={onPressClose}
      onLegalPressed={onLegalPressed}
      onConfigurationPressed={onConfigurationPressed}
      onShareAppPressed={onShareAppPressed}
    />
  );
};

export default SideMenuScreen;
