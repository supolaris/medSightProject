import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AppColors } from '../../../constants/AppColors';
import CustomText from '../texts/CustomText';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

interface ISimpleHeaderProps {
  showBackIcon: boolean;
  showSettingsIcon: boolean;
  title: string;
  onHeaderBackPressed?: () => void;
  onHeaderSettingsPressed?: () => void;
}

const SimpleHeader = (props: ISimpleHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={props.onHeaderBackPressed}>
          {props.showBackIcon && (
            // <Ionicons name="arrow-back" size={20} color={AppColors.white} />
            <></>
          )}
        </TouchableOpacity>
        <CustomText
          preset={{
            text: `${props.title}`,
            color: AppColors.black,
            fontSize: 15,
            fontWeight: 'semiBold',
          }}
          style={{
            textAlign: 'center',
          }}
        />
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={props.onHeaderSettingsPressed}>
          {props.showSettingsIcon && (
            // <Feather name="settings" size={20} color={AppColors.white} />
            <></>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    // width: '10%',
    position: 'absolute',
    left: 0,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
});
