import React, { useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import {
  checkTokenValidity,
  mmkv,
  showToast,
  userLogout,
} from '../utils/CommonFunctions';
import { AppMessages } from '../constants/AppMessages';
import { Alert } from 'react-native';
import LogoutPopup from '../components/common/popups/AlertPopup';
import showLogoutPopup from '../components/common/popups/AlertPopup';
import { getUserProfileService } from '../utils/UserServices';
import { UserContext } from '../context/Context';

const SideMenuScreen = ({ navigation }: MainStackScreenProps<'SideMenu'>) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const userContext = UserContext();
  const [userImage, setUserImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  useEffect(() => {
    const userImage = mmkv.getString('userImage') as string;
    const userName = mmkv.getString('userName') as string;

    setUserImage(userImage);
    setUserName(userName);
  }, []);

  useEffect(() => {
    Promise.all([, getUserProfile()]).finally(() => {});
  });

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

  const getUserProfile = async () => {
    try {
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        const response = await getUserProfileService();
        if (response) {
          // const base64Image = Buffer.from(response.photo, 'binary').toString(
          //   'base64',
          // );
          userContext.updateUserProfileData({
            displayName: response?.displayName,
            email: response?.email,
            photo: response?.photo,
          });
        } else {
          showToast('Error in getting user profile data');
        }
      } else {
        console.log('add login popup');
        // navigation.replace("Splash")
      }
    } catch (error) {
      console.log('error in getting userDetails', error);
    }
  };

  return (
    <SideMenu
      onPressClose={onPressClose}
      onLegalPressed={onLegalPressed}
      onConfigurationPressed={onConfigurationPressed}
      onShareAppPressed={onShareAppPressed}
      handleLogout={handleLogout}
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
      isPopupVisible={isPopupVisible}
      userProfileData={userContext.userProfileData}
    />
  );
};

export default SideMenuScreen;
