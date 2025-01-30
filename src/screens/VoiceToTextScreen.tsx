import React, { useState, useEffect, useRef } from 'react';
import Voice from '@react-native-community/voice';
import LottieView from 'lottie-react-native';
import VoiceToText from '../components/VoiceToText';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { mmkv, showToast, userLogout } from '../utils/CommonFunctions';
import { postIntakeNotesService } from '../utils/TranscriptServices';
import { deletePatientService } from '../utils/MyPatientServices';
import { AppMessages } from '../constants/AppMessages';

const VoiceToTextScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'VoiceToText'>) => {
  const { userDetails } = route.params;
  const lottieRef = useRef<LottieView>(null);
  const [speechToText, setSpeechToText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [userImage, setUserImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const languageOptions = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'Hindi (India)', value: 'hi-IN' },
    { label: 'French (France)', value: 'fr-FR' },
    { label: 'Spanish (Spain)', value: 'es-ES' },
    { label: 'German (Germany)', value: 'de-DE' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
  ];
  const [intakeNotesValue, setIntakeNotesValue] = useState<string>('');
  const [speachTextData, setSpeachTextData] = useState<string[]>([]);

  useEffect(() => {
    Voice.onSpeechResults = (event: any) => {
      setSpeechToText((prev) => prev + ' ' + event.value[0]);
      setSpeachTextData((prev) => {
        const updatedData = [...prev, event.value[0]];
        console.log('Updated speachTextData:', updatedData); // Log updated state
        return updatedData;
      });

      console.log('speachTextData', speachTextData);
    };

    Voice.onSpeechEnd = () => {
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    console.log('speachTextData', speachTextData);
  }, [speachTextData]);

  useEffect(() => {
    const userName = mmkv.getString('userImage') as string;
    setUserImage(userName);
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
    // setSpeachTextData([])
  };

  const onIntakeNotesSavePressed = async () => {
    try {
      setIsLoading(true);
      let data = {
        rawRecordingData: intakeNotesValue,
      };
      const response = await postIntakeNotesService(data);
      if (response.status === 200) {
        showToast('Notes saved successfully');
        setIntakeNotesValue('');
      }
    } catch (error) {
      console.log('error in posting intake notes', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntakeNotesValue = (value: string) => {
    setIntakeNotesValue(value.trimStart());
  };

  const onEditPressed = () => {
    navigation.navigate('EditScreen');
  };
  const onDeletePressed = async () => {
    try {
      setIsLoading(true);
      let patientId = mmkv.getString('patientId');
      if (patientId) {
        const response = await deletePatientService(patientId);
        if (response.status === 204) {
          mmkv.delete('patientId');
          navigation.replace('Patients', {
            flow: 'patientDeleted',
          });
        }
      } else {
        showToast(AppMessages.wentWrong);
      }
    } catch (error) {
      console.log('error in deleting patient', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onHeaderSettingsPressed = async () => {
    const result = userLogout();
    if (result) {
      navigation.replace('Splash');
    } else {
      showToast(AppMessages.wentWrong);
    }
  };

  const onMenuPressed = () => {
    navigation.navigate('SideMenu');
  };

  return (
    <VoiceToText
      isLoading={isLoading}
      userImage={userImage}
      userDetails={userDetails}
      lottieRef={lottieRef}
      isRecording={isRecording}
      speechToText={speechToText}
      languageOptions={languageOptions}
      selectedLanguage={selectedLanguage}
      intakeNotesValue={intakeNotesValue}
      speachTextData={speachTextData}
      handleIntakeNotesValue={handleIntakeNotesValue}
      onClearText={onClearText}
      onLanguageChange={setSelectedLanguage}
      onVoiceRecordPressed={onVoiceRecordPressed}
      onIntakeNotesSavePressed={onIntakeNotesSavePressed}
      onEditPressed={onEditPressed}
      onDeletePressed={onDeletePressed}
      onMenuPressed={onMenuPressed}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
    />
  );
};

export default VoiceToTextScreen;
