import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../constants/AppColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IAlertPopupProps {
  title?: string;
  messageText: string;
  cancelText: string;
  confirmText: string;
  isAlertPopupVisible: boolean;
  onAlertPopupClose?: () => void;
  onAlertPopupCancel: () => void;
  onAlertPopupConfirm: () => void;
}

const AlertPopup = ({
  title,
  messageText,
  cancelText,
  confirmText,
  isAlertPopupVisible,
  onAlertPopupClose,
  onAlertPopupCancel,
  onAlertPopupConfirm,
}: IAlertPopupProps) => {
  return (
    <Modal
      transparent={true}
      visible={isAlertPopupVisible}
      onRequestClose={onAlertPopupClose}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <MaterialIcons
            style={{
              marginBottom: 20,
            }}
            size={40}
            name="logout"
            color={AppColors.black}
          />
          <View style={styles.textView}>
            {title && <Text style={styles.title}>{title}</Text>}
            <Text style={styles.message}>{messageText}</Text>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onAlertPopupCancel}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onAlertPopupConfirm}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  textView: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: AppColors.primaryColor,
  },
  confirmButton: {
    alignSelf: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 30,
    backgroundColor: AppColors.primaryColor,
  },
  buttonText: {
    fontSize: 16,
    color: AppColors.white,
  },
});

export default AlertPopup;
