import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { RefObject } from 'react';
import SimpleHeader from './common/headers/SimpleHeader';
import { VoiceLottie } from './common/lotties/VoiceLottie';
import LottieView from 'lottie-react-native';

interface IProps {
  lottieRef: RefObject<LottieView>;
  speechToText: string;
  isRecording: boolean;
  onClearText: () => void;
  onVoiceRecordPressed: () => void;
}

const VoiceToText = (props: IProps) => {
  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={require('../assets/images/appBackground.webp')}>
      <View style={styles.container}>
        <SimpleHeader
          showBackIcon={false}
          showSettingsIcon={false}
          title="Voice"
        />
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {props.speechToText || 'Start speaking...'}
            </Text>
          </View>

          <View style={styles.lottieView}>
            <VoiceLottie
              lottieRef={props.lottieRef}
              onVoiceRecordPressed={props.onVoiceRecordPressed}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default VoiceToText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: '50%',
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },

  lottieView: {},
});
