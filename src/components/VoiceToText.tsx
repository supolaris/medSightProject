import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { AppMessages } from '../constants/AppMessages';
import MessagePopup from './common/popups/MessagePopup';
import LoadingPopup from './common/popups/LoadingPopup';
import SimpleHeader from './common/headers/SimpleHeader';
import { IGetPatientDetailsResponse } from '../@types/ApiResponses';
import RenderIntakTab from './common/renderComponents/RenderIntakTab';
import { calculateAge, formatDateOfBirth } from '../utils/CommonFunctions';
import RenderConsultantTab from './common/renderComponents/RenderConsultantTab';
import AlertPopup from './common/popups/AlertPopup';

interface IProps {
  previousNotes: {
    summary: string;
    conditions: any[];
    medications: any[];
  };
  isLoading: boolean;
  isAlertPopupVisible: boolean;
  userImage: string;
  activeTab: string;
  isRecording: boolean;
  speechToText: string;
  transcriptText: string;
  selectedButton: string;
  selectedLanguage: string;
  intakeNotesValue: string;
  speachTextData: string[];
  isMessagePopupVisible: boolean;
  lottieRef: React.RefObject<LottieView>;
  userDetails: IGetPatientDetailsResponse | null;
  languageOptions: { label: string; value: string }[];
  onClearText: () => void;
  onEditPressed: () => void;
  onMenuPressed: () => void;
  onDeletePressed: () => void;
  onAlertPopupCancelPressed: () => void;
  onAlertPopupConfirmPressed: () => void;
  onDeleteButtonPressed: () => void;
  onVoiceRecordPressed: () => void;
  onMessagePopupConfirm: () => void;
  onHeaderSettingsPressed: () => void;
  onIntakeNotesSavePressed: () => void;
  handleTabPress: (label: string) => void;
  onLanguageChange: (value: string) => void;
  onChnageTranscriptText: (val: string) => void;
  handleIntakeNotesValue: (value: string) => void;
  handleButtonPress: (
    button: 'NewIntake' | 'StartConsultation' | 'CoPilot',
  ) => void;
  onIntakeInsightPressed: () => void;

  /// c added
  cActiveTab: string;
  cTranscriptText: string;
  cSelectedButton: string;
  cSelectedLanguage: string;
  cIntakeNotesValue: string;
  cSpeachTextData: string[];
  cLottieRef: React.RefObject<LottieView>;
  cLanguageOptions: { label: string; value: string }[];
  onCVoiceRecordPressed: () => void;
  onCIntakeNotesSavePressed: () => void;
  onCTabPress: (label: string) => void;
  onCLanguageChange: (value: string) => void;
  onCChangeTranscriptText: (val: string) => void;
  handleCIntakeNotesValue: (value: string) => void;
  onCIntakeInsightPressed: () => void;
}

const VoiceToText = (props: IProps) => {
  const speachTextData = useMemo(() => {
    return props.speachTextData
      .map((text, index) => `${index + 1}. ${text}`)
      .join('\n');
  }, [props.speachTextData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingPopup isVisible={props.isLoading} />
      <MessagePopup
        buttonText="ok"
        messageText={AppMessages.sessionExpired}
        isMessagePopupVisible={props.isMessagePopupVisible}
        onMessagePopupConfirm={props.onMessagePopupConfirm}
      />
      <AlertPopup
        confirmText="Yes"
        cancelText="Cancel"
        messageText={AppMessages.DeleteText}
        isAlertPopupVisible={props.isAlertPopupVisible}
        onAlertPopupCancel={props.onAlertPopupCancelPressed}
        onAlertPopupConfirm={props.onAlertPopupConfirmPressed}
      />
      <ImageBackground
        resizeMode="stretch"
        style={{ flex: 1 }}
        source={require('../assets/images/common/appBackground.webp')}>
        <SimpleHeader
          showSettingsIcon={false}
          onMenuPressed={props.onMenuPressed}
          // onHeaderSettingsPressed={props.onHeaderSettingsPressed}
        />
        <ScrollView contentContainerStyle={styles.container}>
          {/* Patient Info */}
          <View style={styles.patientInfo}>
            <Image
              source={require('../assets/images/dummyUser.png')}
              style={styles.patientImage}
            />
            <View style={styles.patientDetails}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {props.userDetails?.patient?.birthDate && (
                  <Text style={styles.patientDetailsText}>
                    DOB:{' '}
                    {formatDateOfBirth(props.userDetails?.patient?.birthDate) +
                      ' | '}
                  </Text>
                )}
                {props.userDetails?.patient?.birthDate && (
                  <Text style={styles.patientDetailsText}>
                    AGE:{' '}
                    {calculateAge(props.userDetails?.patient?.birthDate) +
                      ' | '}
                  </Text>
                )}
                <Text style={styles.patientDetailsText}>
                  GENDER: {props.userDetails?.patient?.gender}
                </Text>
              </View>
              {/* <Text style={styles.patientName}>
                Name: {props.patient?.name[0]?.family}
              </Text>
              <Text style={styles.patientDetailsText}>
                DOB:{' '}
                {formatDateOfBirth(
                  props.patient?.birthDate ? props.patient?.birthDate : '',
                )}{' '}
                | AGE: {'age here'} | GENDER: {props.patient?.gender}
              </Text> */}
              <Text style={styles.patientDetailsText}>
                PHONE:{' '}
                {props.userDetails?.patient?.telecom?.[0]?.value ??
                  'NOT AVAILABLE'}
              </Text>
              <Text style={styles.patientDetailsText}>
                ADDRESS:{' '}
                {props.userDetails?.patient?.address &&
                props.userDetails?.patient.address[0]
                  ? `${
                      props.userDetails?.patient.address[0].line?.join(', ') ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient.address[0].city ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient.address[0].state ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient.address[0].postalCode ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient.address[0].country ||
                      'NOT AVAILABLE'
                    }`
                  : 'NOT AVAILABLE'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 7 }}>
              <TouchableOpacity onPress={props.onEditPressed}>
                <View>
                  <Image
                    source={require('../assets/images/editImage.png')}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text
                    style={{
                      fontSize: 6,
                      color: '#000000',
                      top: 2,
                      fontWeight: 'bold',
                    }}>
                    EDIT
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onDeleteButtonPressed}>
                <View style={{ left: 10 }}>
                  <Image
                    source={require('../assets/images/deleteImage.png')}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text
                    style={{
                      fontSize: 6,
                      color: '#000000',
                      top: 2,
                      fontWeight: 'bold',
                    }}>
                    DELETE
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            {/* New Intake Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                props.selectedButton === 'NewIntake' && styles.selectedButton,
              ]}
              onPress={() => props.handleButtonPress('NewIntake')}>
              <Image
                source={require('../assets/images/PatientDetails/intakeIMage.png')}
                style={[
                  styles.actionIcon,
                  props.selectedButton === 'NewIntake' && styles.selectedIcon,
                ]}
              />
              <Text
                style={[
                  styles.actionText,
                  props.selectedButton === 'NewIntake' && styles.selectedText,
                ]}>
                NEW INTAKE
              </Text>
            </TouchableOpacity>

            {/* Start Consultation Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                props.selectedButton === 'StartConsultation' &&
                  styles.selectedButton,
              ]}
              onPress={() => props.handleButtonPress('StartConsultation')}>
              <Image
                source={require('../assets/images/PatientDetails/consultationImage.png')}
                style={[
                  styles.actionIcon,
                  props.selectedButton === 'StartConsultation' &&
                    styles.selectedIcon,
                ]}
              />
              <Text
                style={[
                  styles.actionText,
                  props.selectedButton === 'StartConsultation' &&
                    styles.selectedText,
                ]}>
                START CONSULTATION
              </Text>
            </TouchableOpacity>

            {/* Co-Pilot Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                props.selectedButton === 'CoPilot' && styles.selectedButton,
              ]}
              onPress={() => props.handleButtonPress('CoPilot')}>
              <Image
                source={require('../assets/images/PatientDetails/coPilotImage.png')}
                style={[
                  styles.actionIcon,
                  props.selectedButton === 'CoPilot' && styles.selectedIcon,
                ]}
              />
              <Text
                style={[
                  styles.actionText,
                  props.selectedButton === 'CoPilot' && styles.selectedText,
                ]}>
                CO-PILOT
              </Text>
            </TouchableOpacity>
          </View>

          {/* add here */}

          {props.selectedButton === 'NewIntake' ? (
            <RenderIntakTab
              speechToText={props.speechToText}
              previousNotes={props.previousNotes}
              activeTab={props.activeTab}
              lottieRef={props.lottieRef}
              selectedButton={props.selectedButton}
              speachTextData={props.speachTextData}
              transcriptText={props.transcriptText}
              languageOptions={props.languageOptions}
              selectedLanguage={props.selectedLanguage}
              intakeNotesValue={props.intakeNotesValue}
              handleTabPress={props.handleTabPress}
              onLanguageChange={props.onLanguageChange}
              onVoiceRecordPressed={props.onVoiceRecordPressed}
              onChnageTranscriptText={props.onChnageTranscriptText}
              handleIntakeNotesValue={props.handleIntakeNotesValue}
              onIntakeNotesSavePressed={props.onIntakeNotesSavePressed}
              onIntakeInsightPressed={props.onIntakeInsightPressed}
            />
          ) : (
            <RenderConsultantTab
              speechToText={props.speechToText}
              previousNotes={props.previousNotes}
              activeTab={props.cActiveTab}
              lottieRef={props.cLottieRef}
              selectedButton={props.cSelectedButton}
              speachTextData={props.cSpeachTextData}
              transcriptText={props.cTranscriptText}
              languageOptions={props.cLanguageOptions}
              selectedLanguage={props.cSelectedLanguage}
              intakeNotesValue={props.cIntakeNotesValue}
              handleTabPress={props.onCTabPress}
              onLanguageChange={props.onCLanguageChange}
              onVoiceRecordPressed={props.onCVoiceRecordPressed}
              onChnageTranscriptText={props.onCChangeTranscriptText}
              handleIntakeNotesValue={props.handleCIntakeNotesValue}
              onIntakeNotesSavePressed={props.onCIntakeNotesSavePressed}
              onIntakeInsightPressed={props.onCIntakeInsightPressed}
            />
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default VoiceToText;

const styles = StyleSheet.create({
  container: {
    width: '96%',
    alignSelf: 'center',
    flexGrow: 1,
  },
  patientInfo: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  patientImage: {
    width: 53,
    height: 53,
    borderRadius: 50,
    marginRight: 10,
  },
  patientDetails: {
    width: '65%',
  },
  patientName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  patientDetailsText: {
    fontSize: 10,
    color: '#555',
  },

  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderColor: '#12AAC2',
  },
  tabText: {
    fontSize: 10.5,
    color: '#555',
    marginRight: 6,
  },
  activeTabText: {
    color: '#12AAC2',
    fontWeight: 'bold',
  },
  tabIcon: {
    width: 12,
    height: 12,
    tintColor: '#555',
    marginRight: 2,
  },
  activeTabIcon: {
    tintColor: '#3781C3', // Active (selected) color
  },
  recordingContainer: {
    padding: 10,

    borderRadius: 8,
    marginBottom: 4,
  },
  recordingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0397A8',
    marginLeft: 5,
  },

  textContainer: {
    height: 200,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    width: 107,
    height: 46,
    flexDirection: 'row',
  },
  actionIcon: {
    width: 23,
    height: 23,
    marginBottom: 5,
    tintColor: '#000000',
  },
  actionText: {
    fontSize: 7.4,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 3,
    width: '65%',
  },
  selectedButton: {
    backgroundColor: '#3781C3',
  },
  selectedIcon: {
    tintColor: '#FFFFFF',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  lottieView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  dropdown: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  smartTranscriptHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0397A8',
    marginBottom: 10,
    marginTop: 5,
  },
  smartTranscriptInput: {
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3781C3',
    padding: 10,
    marginBottom: 20,
    color: '#000',
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#3781C3',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteText: {
    color: '#000',
  },
  previousNotesHeader: {
    color: '#12AAC2',
    marginVertical: 7,
  },
  previousNotesContainer: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    elevation: 3,
  },
  previousNotesCard: {},

  noteSectionTitle: {
    color: '#000',
    fontWeight: 'bold',
  },
  previousNotesMainView: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#0397A8',
    borderRadius: 7,
  },
  previousNotesDate: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
  },

  microphoneBgImage: {
    height: 50,
    width: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
