import React, { useState, useEffect, useRef } from 'react';
import {
  checkTokenValidity,
  mmkv,
  showToast,
  userLogout,
} from '../utils/CommonFunctions';
import {
  postConsultantDocumentService,
  postConsultantNotesService,
  postIntakeDocumentService,
  postIntakeNotesService,
} from '../utils/TranscriptServices';
import LottieView from 'lottie-react-native';
import Voice from '@react-native-community/voice';
import VoiceToText from '../components/VoiceToText';
import { IMessagesData, IPatientDocumentsData } from '../@types/CommonTypes';
import { AppMessages } from '../constants/AppMessages';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import {
  deletePatientService,
  getPatientDocumentsService,
} from '../utils/MyPatientServices';
import { postCarePioletService } from '../utils/CarePilotService';
import { getPreviousNotesService } from '../utils/VoiceToTextServices';

const VoiceToTextScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'VoiceToText'>) => {
  const { flow, userDetails } = route.params;
  const lottieRef = useRef<LottieView>(null);
  const [speechToText, setSpeechToText] = useState('');
  const [cSpeechToText, setcSpeechToText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [userImage, setUserImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlertPopupVisible, setIsAlertPopupVisible] =
    useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [speachTextData, setSpeachTextData] = useState<string[]>([]);
  const [intakeNotesValue, setIntakeNotesValue] = useState<string>('');
  const [isMessagePopupVisible, setIsMessagePopupVisible] =
    useState<boolean>(false);
  // const languageOptions = [
  //   { label: 'English (US)', value: 'en-US' },
  //   { label: 'Hindi (India)', value: 'hi-IN' },
  //   { label: 'French (France)', value: 'fr-FR' },
  //   { label: 'Spanish (Spain)', value: 'es-ES' },
  //   { label: 'German (Germany)', value: 'de-DE' },
  //   { label: 'Chinese (Simplified)', value: 'zh-CN' },
  // ];


  const languageOptions = [
    { label: 'English', value: 'en-US' },
    { label: 'Spanish', value: 'es-ES' },
    { label: 'French', value: 'fr-FR' },
    { label: 'Italian', value: 'it-IT' },
    { label: 'German', value: 'de-DE' },
    { label: 'Dutch', value: 'nl-NL' },
    { label: 'Polish', value: 'pl-PL' },
    { label: 'Portuguese', value: 'pt-PT' },
    { label: 'Swedish', value: 'sv-SE' },
    { label: 'Danish (Denmark)', value: 'da-DK' },
    { label: 'Norwegian', value: 'no-NO' },
    { label: 'Finnish', value: 'fi-FI' },
    { label: 'Russian', value: 'ru-RU' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
    { label: 'Japanese', value: 'ja-JP' },
    { label: 'Korean', value: 'ko-KR' },
    { label: 'Thai', value: 'th-TH' },
    { label: 'Malay', value: 'ms-MY' },
    { label: 'Indonesian', value: 'id-ID' },
    { label: 'Hindi', value: 'hi-IN' },
    { label: 'Bengali', value: 'bn-BD' },
    { label: 'Gujarati', value: 'gu-IN' },
    { label: 'Marathi', value: 'mr-IN' },
    { label: 'Telugu', value: 'te-IN' },
    { label: 'Kannada', value: 'kn-IN' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Turkish', value: 'tr-TR' },
    { label: 'Urdu', value: 'ur' },
    { label: 'Persian', value: 'fa-IR' },
  ];
  
  

  

  //
  const [messagesData, setMessagesData] = useState<IMessagesData[]>([]);
  const [messageInputVal, setMessageInputVal] = useState<string>('');
  const [isMessageSending, setIsMessageSending] = useState<boolean>(false);

  //
  const [activeTab, setActiveTab] = useState('Recording');
  const [transcriptText, setTranscriptText] = useState('');
  // 'NewIntake' | 'StartConsultation' | 'CoPilot'
  const [selectedButton, setSelectedButton] = useState<string>(flow);

  /// c addition
  const [cActiveTab, setCActiveTab] = useState('Recording');
  const [cSelectedButton, setCSelectedButton] = useState<string>(flow);
  const [cSpeachTextData, setCSpeachTextData] = useState<string[]>([]);
  const [cTranscriptText, setCTranscriptText] = useState('');
  const [cSelectedLanguage, setCSelectedLanguage] = useState('en-US');
  const [cIntakeNotesValue, setCIntakeNotesValue] = useState<string>('');
  const cLottieRef = useRef<LottieView>(null);

  // const cLanguageOptions = [
  //   { label: 'English (US)', value: 'en-US' },
  //   { label: 'Hindi (India)', value: 'hi-IN' },
  //   { label: 'French (France)', value: 'fr-FR' },
  //   { label: 'Spanish (Spain)', value: 'es-ES' },
  //   { label: 'German (Germany)', value: 'de-DE' },
  //   { label: 'Chinese (Simplified)', value: 'zh-CN' },
  // ];


  const cLanguageOptions = [
    { label: 'English', value: 'en-US' },
    { label: 'Spanish', value: 'es-ES' },
    { label: 'French', value: 'fr-FR' },
    { label: 'Italian', value: 'it-IT' },
    { label: 'German', value: 'de-DE' },
    { label: 'Dutch', value: 'nl-NL' },
    { label: 'Polish', value: 'pl-PL' },
    { label: 'Portuguese', value: 'pt-PT' },
    { label: 'Swedish', value: 'sv-SE' },
    { label: 'Danish (Denmark)', value: 'da-DK' },
    { label: 'Norwegian', value: 'no-NO' },
    { label: 'Finnish', value: 'fi-FI' },
    { label: 'Russian', value: 'ru-RU' },
    { label: 'Chinese (Simplified)', value: 'zh-CN' },
    { label: 'Japanese', value: 'ja-JP' },
    { label: 'Korean', value: 'ko-KR' },
    { label: 'Thai', value: 'th-TH' },
    { label: 'Malay', value: 'ms-MY' },
    { label: 'Indonesian', value: 'id-ID' },
    { label: 'Hindi', value: 'hi-IN' },
    { label: 'Bengali', value: 'bn-BD' },
    { label: 'Gujarati', value: 'gu-IN' },
    { label: 'Marathi', value: 'mr-IN' },
    { label: 'Telugu', value: 'te-IN' },
    { label: 'Kannada', value: 'kn-IN' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Turkish', value: 'tr-TR' },
    { label: 'Urdu', value: 'ur' },
    { label: 'Persian', value: 'fa-IR' },
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

  const [patientDocuments, setPatientDocuments] =
    useState<IPatientDocumentsData>({
      IntakeSoapNote: '',
      IntakeSmartTranscript: '',
      IntakeRecording: '',
      ConsultationSoapNote: '',
      ConsultationSmartTranscript: '',
      ConsultationRecording: '',
    });

  useEffect(() => {
    getPatientDocuments();
  }, []);

  useEffect(() => {
    Voice.onSpeechResults = (event: any) => {
      console.log('selectedButton', selectedButton);
      if (selectedButton === 'NewIntake') {
        console.log('if entered');

        console.log('event.value[0]', event.value[0]);

        setSpeechToText([event.value[0]]);
        setSpeachTextData([event.value[0]]);
        // setSpeechToText((prev) => prev + ' ' + event.value[0]);
        // setSpeachTextData((prev) => {
        //   const updatedData = [...prev, event.value[0]];
        //   console.log('Updated speachTextData:', updatedData);
        //   return updatedData;
        // });
      } else {
        console.log('else entered');
        setcSpeechToText(event.value[0]);
        setCSpeachTextData(event.value[0]);
        // setcSpeechToText((prev) => prev + ' ' + event.value[0]);
        // setCSpeachTextData((prev) => {
        //   const updatedData = [...prev, event.value[0]];
        //   console.log('Updated speachTextData:', updatedData);
        //   return updatedData;
        // });
      }
    };

    Voice.onSpeechEnd = () => {
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [selectedButton]);

  useEffect(() => {
    console.log('speachTextData', speachTextData);
    console.log("selectedLanguage", selectedLanguage)
  }, [speachTextData, selectedLanguage]);

  useEffect(() => {
    const userName = mmkv.getString('userImage') as string;
    setUserImage(userName);
  }, []);

  useEffect(() => {
    getPreviousNotes();
  }, []);

  const getPatientDocuments = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        const patientId = mmkv.getString('patientId') as string;
        const response = await getPatientDocumentsService(patientId);

        if (response) {
          const updatedDocuments = response.reduce(
            (acc: any, doc: any) => {
              if (acc.hasOwnProperty(doc.documentType)) {
                acc[doc.documentType] = doc.textContent;
              }
              return acc;
            },
            { ...patientDocuments },
          );
          setPatientDocuments(updatedDocuments);
          setTranscriptText(patientDocuments?.IntakeSmartTranscript);
          setIntakeNotesValue(patientDocuments?.IntakeSoapNote);
          setCTranscriptText(patientDocuments?.ConsultationSmartTranscript);
          setCIntakeNotesValue(patientDocuments.ConsultationSoapNote);
        } else {
          showToast(AppMessages.wentWrong);
        }
      } else {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
      }
    } catch (error) {
      console.log('error in getting patient details', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        let patientId = mmkv.getString('patientId') as string;
        let data = {
          encounterId: 'string',
          encounterDateTime: '2025-02-09T19:20:17.305Z',
          patientId: patientId,
          rawRecordingData: speechToText,
          smartTranscript: transcriptText,
          soapNotes: intakeNotesValue,
        };
        const response = await postIntakeDocumentService(data);
        if (response) {
          showToast('Notes saved successfully');
        } else {
          showToast(AppMessages.wentWrong);
        }
      } else {
        setIsMessagePopupVisible(true);
      }
    } catch (error) {
      console.log('error in posting intake notes', error);
    } finally {
      setIsLoading(false);
    }
  };
  const onCIntakeNotesSavePressed = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        let patientId = mmkv.getString('patientId') as string;
        let data = {
          encounterId: 'string',
          encounterDateTime: '2025-02-09T19:20:17.305Z',
          patientId: patientId,
          rawRecordingData: cSpeechToText,
          smartTranscript: cTranscriptText,
          soapNotes: cIntakeNotesValue,
        };
        const response = await postConsultantDocumentService(data);
        if (response) {
          showToast('Notes saved successfully');
        } else {
          showToast(AppMessages.wentWrong);
        }
      } else {
        setIsMessagePopupVisible(true);
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
  const onDeleteButtonPressed = () => {
    setIsAlertPopupVisible(true); // Show confirmation popup first
  };

  const onAlertPopupCancelPressed = () => {
    setIsAlertPopupVisible(false); // Close the popup without deleting
  };

  const onAlertPopupConfirmPressed = async () => {
    setIsAlertPopupVisible(false); // Close the popup
    await deletePatient(); // Proceed with deletion
  };

  const deletePatient = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (!isTokenValid) {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
        return;
      }

      let patientId = mmkv.getString('patientId');
      if (!patientId) {
        showToast(AppMessages.wentWrong);
        return;
      }

      const response = await deletePatientService(patientId);
      if (response.status === 204) {
        mmkv.delete('patientId');
        navigation.replace('Patients', {
          flow: 'patientDeleted',
        });
      }
    } catch (error) {
      console.log('Error in deleting patient', error);
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
        console.log(' hello world', speechToText[0]);
        const data = {
          rawRecordingData: speechToText[0],
        };

        console.log('first =>>>>>>>>>>>>', data);
        const response = await postIntakeNotesService(data);
        console.log('response generate insight', response);
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

  const onCIntakeInsightPressed = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        console.log(' hello world');
        const data = {
          rawRecordingData: cSpeechToText,
        };
        const response = await postConsultantNotesService(data);
        if (response) {
          setCTranscriptText(response.smartTranscript);
          setCIntakeNotesValue(response.soapNotes);
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

  //
  const onChangeMessageVal = (val: string) => {
    setMessageInputVal(val);
  };

  const onMessageSendPressed = async () => {
    try {
      setIsMessageSending(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        const patientId = mmkv.getString('patientId') as string;
        let data = {
          patientID: patientId,
          userQuery: messageInputVal,
        };
        const response = await postCarePioletService(data);
        if (response) {
          setMessagesData((preVal) => [
            ...preVal,
            { type: 'sent', value: messageInputVal },
            {
              type: 'received',
              value:
                typeof response === 'object' ? response.response : response,
            },
          ]);
          setMessageInputVal('');
        } else {
          showToast(AppMessages.wentWrong);
          setIsMessageSending(false);
        }
      } else {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
      }
    } catch (error) {
      console.log('error in getting intakes notes', error);
    } finally {
      setIsMessageSending(false);
    }
  };

  return (
    <VoiceToText
      onAlertPopupCancelPressed={onAlertPopupCancelPressed}
      onAlertPopupConfirmPressed={onAlertPopupConfirmPressed}
      onDeleteButtonPressed={onDeleteButtonPressed}
      previousNotes={previousNotes}
      isLoading={isLoading}
      userImage={userImage}
      lottieRef={lottieRef}
      activeTab={activeTab}
      userDetails={userDetails}
      isRecording={isRecording}
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
      // onDeletePressed={onDeletePressed}
      isAlertPopupVisible={isAlertPopupVisible}
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
      onCIntakeInsightPressed={onCIntakeInsightPressed}
      //
      messagesData={messagesData}
      messageInputVal={messageInputVal}
      isMessageSending={isMessageSending}
      onChangeMessageVal={onChangeMessageVal}
      onMessageSendPressed={onMessageSendPressed}
    />
  );
};

export default VoiceToTextScreen;
