import React, { useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { mmkv, showToast, userLogout } from '../utils/CommonFunctions';
import { AppMessages } from '../constants/AppMessages';
import { Alert } from 'react-native';
import LogoutPopup from '../components/common/popups/AlertPopup';
import showLogoutPopup from '../components/common/popups/AlertPopup';

const SideMenuScreen = ({ navigation }: MainStackScreenProps<'SideMenu'>) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

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

  const handleLogout = () => {
    setPopupVisible(true); // Show the popup when logout is clicked
  };

  // Close the popup without action
  const handleCancel = () => {
    setPopupVisible(false); // Close the popup
  };

  // Confirm logout and navigate to Splash
  const handleConfirm = () => {
    setPopupVisible(false); // Close the popup
    // Add any logout logic here if needed (e.g., clearing user data)
    navigation.replace('Splash'); // Navigate to Splash screen
  };

  return (
    <SideMenu
      userImage={userImage}
      userName={userName}
      onPressClose={onPressClose}
      onLegalPressed={onLegalPressed}
      onConfigurationPressed={onConfigurationPressed}
      onShareAppPressed={onShareAppPressed}
      handleLogout={handleLogout}
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
      isPopupVisible={isPopupVisible}
    />
  );
};

export default SideMenuScreen;
