import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppColors } from '../../../constants/AppColors';
import { UserContext } from '../../../context/Context';
import { userLogout } from '../../../utils/CommonFunctions';
import AlertPopup from '../../common/popups/AlertPopup';

interface ISimpleHeaderProps {
  showMenuIcon?: boolean;
  showSettingsIcon?: boolean;
  onMenuPressed?: () => void;
}

const SimpleHeader = (props: ISimpleHeaderProps) => {
  const userContext = UserContext();
  const navigation = useNavigation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // const handleLogout = async () => {
  //   const result = userLogout();
  //   if (result) {
  //     navigation.replace('Splash');
  //   }
  // };

  const handleLogout = () => {
    setIsPopupVisible(true); // Show the popup when logout is clicked
  };

  // Close the popup without action
  const handleCancel = () => {
    setIsPopupVisible(false); // Close the popup
  };

  // Confirm logout and navigate to Splash
  const handleConfirm = () => {
    setIsPopupVisible(false); // Close the popup
    // Add any logout logic here if needed (e.g., clearing user data)
    navigation.replace('Splash'); // Navigate to Splash screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={props.onMenuPressed}>
            <Image
              style={styles.menuIcon}
              source={require('../../../assets/images/menuBar.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.logoImage}
            source={require('../../../assets/images/HeaderImage.png')}
          />
          <Text style={styles.logoText}>Medsight AI</Text>
        </View>
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => setIsPopupVisible(true)}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={
                userContext.userProfileData?.photo
                  ? {
                      uri: `data:image/jpeg;base64,${userContext.userProfileData?.photo}`,
                    }
                  : require('../../../assets/images/dummyUser.png')
              }
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <AlertPopup
        messageText="Are you sure you want to logout"
        isAlertPopupVisible={isPopupVisible}
        cancelText="Cancel"
        confirmText="YES"
        onAlertPopupClose={handleCancel}
        onAlertPopupCancel={handleCancel}
        onAlertPopupConfirm={handleConfirm}
      />
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 24,
  },
  logoImage: {
    width: 41,
    height: 33,
    marginRight: 2,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3681C3',
    alignSelf: 'center',
  },
  rightIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profileTextContainer: {
    marginLeft: 8,
  },
  logoutText: {
    fontSize: 8,
    color: '#000',
  },
});
