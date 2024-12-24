import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { AppColors } from '../../../constants/AppColors';

interface LoadingPopupProps {
  isVisible: boolean;
}
const LoadingPopup = (props: LoadingPopupProps) => {
  return (
    <Modal transparent={true} visible={props.isVisible}>
      <View style={styles.mainContainer}>
        <ActivityIndicator size="large" color={AppColors.primaryColor} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
});

export default LoadingPopup;
