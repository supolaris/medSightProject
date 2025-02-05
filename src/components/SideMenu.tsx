import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { UserContext } from '../context/Context';
import AlertPopup from './common/popups/AlertPopup';
import MessagePopup from './common/popups/MessagePopup';
import { AppMessages } from '../constants/AppMessages';

const { width } = Dimensions.get('window');

interface IProps {
  userProfileData: {
    displayName: string;
    email: string;
    photo: string;
  };
  isPopupVisible: boolean;
  isMessagePopupVisible: boolean;
  onPressClose: () => void;
  handleLogout: () => void;
  handleCancel: () => void;
  handleConfirm: () => void;
  onLegalPressed: () => void;
  onShareAppPressed: () => void;
  onMessagePopupConfirm: () => void;
  onConfigurationPressed: () => void;
}

const SideMenu = (props: IProps) => {
  const userContext = UserContext();
  return (
    <View style={styles.container}>
      <AlertPopup
        messageText="Are you sure you want to logout"
        isAlertPopupVisible={props.isPopupVisible}
        cancelText="Cancel"
        confirmText="YES"
        onAlertPopupClose={props.handleCancel}
        onAlertPopupCancel={props.handleCancel}
        onAlertPopupConfirm={props.handleConfirm}
      />
      <MessagePopup
        buttonText="ok"
        messageText={AppMessages.sessionExpired}
        isMessagePopupVisible={props.isMessagePopupVisible}
        onMessagePopupConfirm={props.onMessagePopupConfirm}
      />
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={
            userContext.userProfileData?.photo
              ? {
                  uri: `data:image/jpeg;base64,${userContext.userProfileData?.photo}`,
                }
              : require('../assets/images/dummyUser.png')
          }
        />
        <Text style={styles.profileName}>
          {props.userProfileData?.displayName}
        </Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={props.onPressClose}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.optionsList}
      /> */}

      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          marginTop: 50,
        }}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={props.onLegalPressed}>
          <Image
            source={require('../assets/images/legalImage.png')}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Legal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={props.onConfigurationPressed}>
          <Image
            source={require('../assets/images/configImage.png')}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Configuration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={props.onShareAppPressed}>
          <Image
            source={require('../assets/images/shareImage.png')}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Share app</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={props.handleLogout}
        style={styles.logoutButton}>
        <Image
          source={require('../assets/images/logoutImage.png')}
          style={styles.logoutImage}
        />
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SideMenu;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9ff',
    justifyContent: 'space-between',
  },
  profileContainer: {
    backgroundColor: '#3781C3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    position: 'relative',
  },
  profileImage: {
    width: 63.28,
    height: 63.28,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF',
  },
  profileName: {
    color: '#fff',
    fontSize: 20.5,
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsList: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#0397A8',
    paddingVertical: 15,
    alignItems: 'center',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: width * 0.9,
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutImage: {
    marginRight: 10,
    width: 22,
    height: 22,
  },
});
