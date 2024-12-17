import React, { useState, useEffect, useRef } from 'react';
import Voice from '@react-native-community/voice';
import LottieView from 'lottie-react-native';
import VoiceToText from '../components/VoiceToText';
import Translator from 'react-native-translator';

const VoiceToTextScreen = () => {
  const [speechToText, setSpeechToText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (!isRecording) {
      lottieRef.current?.pause();
    }
  }, [isRecording]);

  useEffect(() => {
    Voice.onSpeechResults = (event: any) => {
      setSpeechToText((prev) => prev + ' ' + event.value[0]);
    };

    Voice.onSpeechEnd = () => {
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting speech recognition', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping speech recognition', error);
    }
  };

  const onVoiceRecordPressed = () => {
    if (isRecording) {
      lottieRef.current?.pause();
      stopRecording();
    } else {
      lottieRef.current?.play();
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const onClearText = () => {
    setSpeechToText('');
  };

  return (
    <VoiceToText
      lottieRef={lottieRef}
      speechToText={speechToText}
      isRecording={isRecording}
      onClearText={onClearText}
      onVoiceRecordPressed={onVoiceRecordPressed}
    />
  );
};

export default VoiceToTextScreen;
