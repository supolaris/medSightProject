import React from 'react';
import { AppColors } from '../../../constants/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface IMessagePopupProps {
  title?: string;
  messageText: string;
  buttonText: string;
  isMessagePopupVisible: boolean;
  onMessagePopupConfirm: () => void;
}

const MessagePopup = (props: IMessagePopupProps) => {
  return (
    <Modal transparent={true} visible={props.isMessagePopupVisible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Ionicons
            size={40}
            name="alert-circle"
            color={AppColors.primaryColor}
            style={{
              marginBottom: 20,
            }}
          />
          <View style={styles.textView}>
            {props.title && <Text style={styles.title}>{props.title}</Text>}
            <Text style={styles.message}>{props.messageText}</Text>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={props.onMessagePopupConfirm}>
              <Text style={styles.buttonText}>{props.buttonText}</Text>
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
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

export default MessagePopup;
