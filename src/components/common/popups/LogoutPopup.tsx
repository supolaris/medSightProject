import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface IAlertPopupProps {
  title?: string;
  isAlertPopupVisible: boolean;
  messageText: string;
  cancelText: string;
  confirmText: string;
  onAlertPopupClose: () => void;
  onAlertPopupCancel: () => void;
  onAlertPopupConfirm: () => void;
}

const AlertPopup = ({
  title,
  isAlertPopupVisible,
  messageText,
  cancelText,
  confirmText,
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
          <Image
            source={require('../../../assets/images/logoutIcon.webp')}
            style={styles.image}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  textView: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 15,
  },
  confirmButton: {
    backgroundColor: '#0397A8',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default AlertPopup;
