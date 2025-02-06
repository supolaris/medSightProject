import React, { useState, useEffect, useRef } from 'react';
import {
  checkTokenValidity,
  mmkv,
  showToast,
  userLogout,
} from '../utils/CommonFunctions';
import LottieView from 'lottie-react-native';
import Voice from '@react-native-community/voice';
import VoiceToText from '../components/VoiceToText';
import { AppMessages } from '../constants/AppMessages';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { deletePatientService } from '../utils/MyPatientServices';
import { postIntakeNotesService } from '../utils/TranscriptServices';
import { getPreviousNotesService } from '../utils/VoiceToTextServices';

const VoiceToTextScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'VoiceToText'>) => {
  const { userDetails } = route.params;
  const lottieRef = useRef<LottieView>(null);
  const [speechToText, setSpeechToText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [userImage, setUserImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [speachTextData, setSpeachTextData] = useState<string[]>([]);
  const [intakeNotesValue, setIntakeNotesValue] = useState<string>('');
  const [isMessagePopupVisible, setIsMessagePopupVisible] =
    useState<boolean>(false);
  const languageOptions = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'Hindi (India)', value: 'hi-IN' },
    { label: 'French (France)', value: 'fr-FR' },
    { label: 'Spanish (Spain)', value: 'es-ES' },
    { label: 'German (Germany)', value: 'de-DE' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
  ];

  //
  const [activeTab, setActiveTab] = useState('Recording');
  const [transcriptText, setTranscriptText] = useState('');
  const [selectedButton, setSelectedButton] = useState<
    'NewIntake' | 'StartConsultation' | 'CoPilot'
  >('NewIntake');

  /// c addition
  const [cActiveTab, setCActiveTab] = useState('Recording');
  const [cSelectedButton, setCSelectedButton] = useState<
    'NewIntake' | 'StartConsultation' | 'CoPilot'
  >('NewIntake');
  const [cSpeachTextData, setCSpeachTextData] = useState<string[]>([]);
  const [cTranscriptText, setCTranscriptText] = useState('');
  const [cSelectedLanguage, setCSelectedLanguage] = useState('en-US');
  const [cIntakeNotesValue, setCIntakeNotesValue] = useState<string>('');
  const cLottieRef = useRef<LottieView>(null);
  const cLanguageOptions = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'Hindi (India)', value: 'hi-IN' },
    { label: 'French (France)', value: 'fr-FR' },
    { label: 'Spanish (Spain)', value: 'es-ES' },
    { label: 'German (Germany)', value: 'de-DE' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
  ];

  const [previousNotes, setPreviousNotes] = useState<{
    summary: string;
    conditions: any[];
    medications: any[];
  }>({
    summary: '',
    conditions: [],
    medications: [],
  });

  const onCTabPress = (tab: any) => {
    setCActiveTab(tab);
  };

  const onCLanguageChange = (language: string) => {
    setCSelectedLanguage(language);
  };

  const onCVoiceRecordPressed = () => {
    if (isRecording) {
      cLottieRef.current?.pause();
      stopRecording();
    } else {
      cLottieRef.current?.play();
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const onCChangeTranscriptText = (val: any) => {
    setCTranscriptText(val);
  };

  const handleCIntakeNotesValue = (value: string) => {
    setCIntakeNotesValue(value.trimStart());
  };

  const onCIntakeNotesSavePressed = async () => {
    // try {
    //   setIsLoading(true);
    //   const isTokenValid = await checkTokenValidity();
    //   if (isTokenValid) {
    //     let data = { rawRecordingData: cIntakeNotesValue };
    //     const response = await postIntakeNotesService(data);
    //     if (response.smartTranscript || response.soapNotes) {
    //       showToast('Notes saved successfully');
    //       setCIntakeNotesValue('');
    //     }
    //   } else {
    //     setIsMessagePopupVisible(true);
    //   }
    // } catch (error) {
    //   console.log('error in posting intake notes', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  /// c end

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };
  const onChnageTranscriptText = (val: any) => {
    setTranscriptText(val);
  };

  const handleButtonPress = (
    button: 'NewIntake' | 'StartConsultation' | 'CoPilot',
  ) => {
    setSelectedButton(button);
  };

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

  useEffect(() => {
    getPreviousNotes();
  }, []);

  const getPreviousNotes = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        const patientId = mmkv.getString('patientId') as string;
        const response = await getPreviousNotesService(patientId);
        if (response) {
          setPreviousNotes({
            summary: response.summary,
            conditions: response.conditions,
            medications: response.medications,
          });
        }
      } else {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
      }
    } catch (error) {
      console.log('error in getting previous notes');
    } finally {
      setIsLoading(false);
    }
  };

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
    // try {
    //   setIsLoading(true);
    //   const isTokenValid = await checkTokenValidity();
    //   if (isTokenValid) {
    //     let data = {
    //       rawRecordingData: intakeNotesValue,
    //     };
    //     const response = await postIntakeNotesService(data);
    //     if (response.smartTranscript || response.soapNotes) {
    //       showToast('Notes saved successfully');
    //       setTranscriptText(response.smartTranscript);
    //       setIntakeNotesValue(response.soapNotes);
    //     }
    //   } else {
    //     console.log('add login popup');
    //     setIsMessagePopupVisible(true);
    //   }
    // } catch (error) {
    //   console.log('error in posting intake notes', error);
    // } finally {
    //   setIsLoading(false);
    // }
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
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
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
      } else {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
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

  const onMessagePopupConfirm = () => {
    mmkv.clearAll();
    setIsMessagePopupVisible(false);
    navigation.replace('Splash');
  };

  const onIntakeInsightPressed = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        console.log(' hello world');
        const data = {
          rawRecordingData: speechToText,
        };
        const response = await postIntakeNotesService(data);
        if (response) {
          setTranscriptText(response.smartTranscript);
          setIntakeNotesValue(response.soapNotes);
        }
      } else {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
      }
    } catch (error) {
      console.log('error in getting intakes notes', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VoiceToText
      previousNotes={previousNotes}
      isLoading={isLoading}
      userImage={userImage}
      lottieRef={lottieRef}
      activeTab={activeTab}
      userDetails={userDetails}
      isRecording={isRecording}
      speechToText={speechToText}
      transcriptText={transcriptText}
      selectedButton={selectedButton}
      speachTextData={speachTextData}
      languageOptions={languageOptions}
      selectedLanguage={selectedLanguage}
      intakeNotesValue={intakeNotesValue}
      isMessagePopupVisible={isMessagePopupVisible}
      onClearText={onClearText}
      onEditPressed={onEditPressed}
      onMenuPressed={onMenuPressed}
      handleTabPress={handleTabPress}
      onDeletePressed={onDeletePressed}
      handleButtonPress={handleButtonPress}
      onLanguageChange={setSelectedLanguage}
      onVoiceRecordPressed={onVoiceRecordPressed}
      onMessagePopupConfirm={onMessagePopupConfirm}
      onChnageTranscriptText={onChnageTranscriptText}
      handleIntakeNotesValue={handleIntakeNotesValue}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
      onIntakeNotesSavePressed={onIntakeNotesSavePressed}
      onIntakeInsightPressed={onIntakeInsightPressed}
      /// c added
      cLottieRef={cLottieRef}
      cActiveTab={cActiveTab}
      cTranscriptText={cTranscriptText}
      cSelectedButton={cSelectedButton}
      cSpeachTextData={cSpeachTextData}
      cLanguageOptions={cLanguageOptions}
      cSelectedLanguage={cSelectedLanguage}
      cIntakeNotesValue={cIntakeNotesValue}
      onCTabPress={onCTabPress}
      onCLanguageChange={onCLanguageChange}
      onCVoiceRecordPressed={onCVoiceRecordPressed}
      onCChangeTranscriptText={onCChangeTranscriptText}
      handleCIntakeNotesValue={handleCIntakeNotesValue}
      onCIntakeNotesSavePressed={onCIntakeNotesSavePressed}
    />
  );
};

export default VoiceToTextScreen;
