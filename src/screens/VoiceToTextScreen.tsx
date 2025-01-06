import React, { useState, useEffect, useRef } from 'react';
import Voice from '@react-native-community/voice';
import LottieView from 'lottie-react-native';
import VoiceToText from '../components/VoiceToText';
import { getMyPatientsService } from '../utils/MyPatientServices';
import { getErrorData } from '../utils/CommonFunctions';
import axios from 'axios';
import { ApiNames } from '../constants/ApiNames';

const VoiceToTextScreen = () => {
  const [speechToText, setSpeechToText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lottieRef = useRef<LottieView>(null);

  const languageOptions = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'Hindi (India)', value: 'hi-IN' },
    { label: 'French (France)', value: 'fr-FR' },
    { label: 'Spanish (Spain)', value: 'es-ES' },
    { label: 'German (Germany)', value: 'de-DE' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
  ];

  useEffect(() => {
    // getMyPatients();
  }, []);

  const getMyPatients = async () => {
    try {
      setIsLoading(true);
      let tempPageSize = 10;
      const response = await getMyPatientsService(tempPageSize);
      console.log('response of patients=>>>>>>>>>>>>>>>', response);
    } catch (error) {
      getErrorData(error);
      console.log('error in getting my patients', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      await Voice.start(selectedLanguage);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
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
      isLoading={false}
      lottieRef={lottieRef}
      isRecording={isRecording}
      speechToText={speechToText}
      languageOptions={languageOptions}
      selectedLanguage={selectedLanguage}
      onClearText={onClearText}
      onLanguageChange={setSelectedLanguage}
      onVoiceRecordPressed={onVoiceRecordPressed}
    />
  );
};

export default VoiceToTextScreen;
