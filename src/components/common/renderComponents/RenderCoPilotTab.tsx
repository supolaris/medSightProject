import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RenderCoPilotTab = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Co-Pilot</Text>
        <View style={styles.iconContainer}>
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
        </View>
      </View>

      {/* Chat Bubble */}
      <View style={styles.messageContainer}>
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

      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput style={styles.input} placeholder="Type a message..." />
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="microphone" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: 'center',
  },
  botMessage: {
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  messageText: {
    color: 'black',
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
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RenderCoPilotTab;
