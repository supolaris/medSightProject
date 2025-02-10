import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  borderRadius,
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
} from '../../../utils/CommonFunctions';
import { AppColors } from '../../../constants/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IMessagesData } from '../../../@types/CommonTypes';

interface IProps {
  messagesData: IMessagesData[];
  messageInputVal: string;
  isMessageSending: boolean;
  onChangeMessageVal: (val: string) => void;
  onMessageSendPressed: () => void;
}

const RenderCoPilotTab = (props: IProps) => {
  const renderMessages = ({
    item,
    index,
  }: {
    item: IMessagesData;
    index: number;
  }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: normalizeHeight(12),
          alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
        }}>
        {index % 2 !== 0 && (
          <Image
            source={require('../../../assets/images/copilotImage.png')}
            style={styles.renderAvatar}
          />
        )}
        <View
          style={{
            ...styles.renderMessagesContainer,
            width: '60%',

            backgroundColor:
              index % 2 === 0 ? AppColors.primaryColor : '#f0f8ff',
          }}>
          <Text
            style={{
              ...styles.messageText,
              color: index % 2 === 0 ? AppColors.white : AppColors.black,
            }}>
            {item.value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Co-Pilot</Text>
        {/* <View style={styles.iconContainer}>
          <Icon
            name="volume-up"
            size={18}
            color="black"
            style={styles.headerIcon}
          />
          <Icon
            name="times"
            size={18}
            color="black"
            style={styles.headerIcon}
          />
          <Icon
            name="desktop"
            size={18}
            color="black"
            style={styles.headerIcon}
          />
        </View> */}
      </View>

      {/* Chat Bubble */}
      <View style={styles.messageContainer}>
        {props.messagesData?.length > 0 ? (
          <View style={styles.messagesFlatlistView}>
            <FlatList data={props.messagesData} renderItem={renderMessages} />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Image
              source={require('../../../assets/images/copilotImage.png')}
              style={styles.avatar}
            />
            <View style={styles.botMessage}>
              <Text style={styles.messageText}>
                Hi! This is MedSight. You can chat with me about this patient.
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={props.messageInputVal}
          onChangeText={props.onChangeMessageVal}
        />
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="microphone" size={18} color="white" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            ...styles.sendButton,
            backgroundColor: props.messageInputVal
              ? '#2E7D32'
              : AppColors.inactiveColor,
          }}
          onPress={props.onMessageSendPressed}
          disabled={props.messageInputVal ? false : true}>
          {props.isMessageSending ? (
            <ActivityIndicator
              style={{
                height: normalizeWidth(10),
                width: normalizeWidth(10),
              }}
              color={AppColors.white}
            />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  renderMessagesContainer: {
    borderRadius: borderRadius,
    paddingVertical: normalizeHeight(10),
    paddingHorizontal: normalizeWidth(10),
  },
  renderAvatar: {
    width: normalizeWidth(30),
    height: normalizeWidth(30),
    borderRadius: normalizeWidth(30),
    marginRight: 10,
    // alignSelf: 'center',
  },
  //
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 10,
  },
  messageContainer: {
    padding: 10,
    marginBottom: normalizeHeight(100),
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: 'center',
  },
  botMessage: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  messageText: {
    color: AppColors.black,
    fontSize: normalizeFont(14),
  },
  messagesFlatlistView: {
    flex: 1,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    position: 'absolute',
    bottom: 30,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  iconButton: {
    backgroundColor: '#29B6F6',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  sendButton: {
    height: normalizeHeight(45),
    width: normalizeWidth(85),
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: normalizeFont(13),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RenderCoPilotTab;
