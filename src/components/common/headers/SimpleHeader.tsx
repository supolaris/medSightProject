import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { AppColors } from '../../../constants/AppColors';

interface ISimpleHeaderProps {
  showMenuIcon?: boolean;
  showSettingsIcon?: boolean;
  title?: string;
  onMenuPressed?: () => void;
  onHeaderSettingsPressed?: () => void;
}

const SimpleHeader = (props: ISimpleHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: 'row' }}>
          {/* Menu Icon */}
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
        {/* Logo and Title */}

        {/* Profile Section */}
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={props.onHeaderSettingsPressed}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={require('../../../assets/images/profImage.png')}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>JOHN DOE</Text>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
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
    tintColor: AppColors.primaryColor,
    marginRight: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  profileName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3681C3',
  },
  logoutText: {
    fontSize: 8,
    color: '#000',
  },
});
