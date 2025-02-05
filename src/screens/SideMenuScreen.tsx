import SideMenu from '../components/SideMenu';
import { UserContext } from '../context/Context';
import React, { useEffect, useState } from 'react';
import { getUserProfileService } from '../utils/UserServices';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { checkTokenValidity, mmkv, showToast } from '../utils/CommonFunctions';

const SideMenuScreen = ({ navigation }: MainStackScreenProps<'SideMenu'>) => {
  const userContext = UserContext();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isMessagePopupVisible, setIsMessagePopupVisible] =
    useState<boolean>(false);

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
        setIsMessagePopupVisible(true);
      }
    } catch (error) {
      console.log('error in getting userDetails', error);
    }
  };

  const onMessagePopupConfirm = () => {
    mmkv.clearAll();
    setIsMessagePopupVisible(false);
    navigation.replace('Splash');
  };

  return (
    <SideMenu
      isPopupVisible={isPopupVisible}
      userProfileData={userContext.userProfileData}
      isMessagePopupVisible={isMessagePopupVisible}
      handleLogout={handleLogout}
      handleCancel={handleCancel}
      onPressClose={onPressClose}
      handleConfirm={handleConfirm}
      onLegalPressed={onLegalPressed}
      onShareAppPressed={onShareAppPressed}
      onMessagePopupConfirm={onMessagePopupConfirm}
      onConfigurationPressed={onConfigurationPressed}
    />
  );
};

export default SideMenuScreen;
