import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import SimpleHeader from './common/headers/SimpleHeader';
import { Dropdown } from 'react-native-element-dropdown';
import LoadingPopup from './common/popups/LoadingPopup';
import { VoiceLottie } from './common/lotties/VoiceLottie';
import { IMyPatientItems } from '../@types/CommonTypes';
import {
  calculateAge,
  formatDateOfBirth,
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
} from '../utils/CommonFunctions';
import { IGetPatientDetailsResponse } from '../@types/ApiResponses';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { AppColors } from '../constants/AppColors';
import CustomTouchable from './common/touchables/CustomTouchable';
import { AppMessages } from '../constants/AppMessages';

interface IProps {
  isLoading: boolean;
  userImage: string;
  userDetails: IGetPatientDetailsResponse | null;
  lottieRef: React.RefObject<LottieView>;
  isRecording: boolean;
  speechToText: string;
  languageOptions: { label: string; value: string }[];
  selectedLanguage: string;
  intakeNotesValue: string;
  speachTextData: string[];
  handleIntakeNotesValue: (value: string) => void;
  onClearText: () => void;
  onVoiceRecordPressed: () => void;
  onLanguageChange: (value: string) => void;
  onIntakeNotesSavePressed: () => void;
  onEditPressed: () => void;
  onDeletePressed: () => void;
  onMenuPressed: () => void;
  onHeaderSettingsPressed: () => void;
}

const VoiceToText = (props: IProps) => {
  const [activeTab, setActiveTab] = useState('Recording');
  const [transcriptText, setTranscriptText] = useState('');
  const [selectedButton, setSelectedButton] = useState<
    'NewIntake' | 'StartConsultation' | 'CoPilot'
  >('NewIntake');

  const handleButtonPress = (
    button: 'NewIntake' | 'StartConsultation' | 'CoPilot',
  ) => {
    setSelectedButton(button);
  };

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };

  const speachTextData = useMemo(() => {
    return props.speachTextData
      .map((text, index) => `${index + 1}. ${text}`)
      .join('\n');
  }, [props.speachTextData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingPopup isVisible={props.isLoading} />
      <ImageBackground
        resizeMode="stretch"
        style={{ flex: 1 }}
        source={require('../assets/images/common/appBackground.webp')}>
        <SimpleHeader
          showSettingsIcon={false}
          title="Voice"
          onMenuPressed={props.onMenuPressed}
          onHeaderSettingsPressed={props.onHeaderSettingsPressed}
          userImage={props.userImage}
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
              <TouchableOpacity onPress={props.onDeletePressed}>
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
                selectedButton === 'NewIntake' && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress('NewIntake')}>
              <Image
                source={require('../assets/images/PatientDetails/intakeIMage.png')}
                style={[
                  styles.actionIcon,
                  selectedButton === 'NewIntake' && styles.selectedIcon,
                ]}
              />
              <Text
                style={[
                  styles.actionText,
                  selectedButton === 'NewIntake' && styles.selectedText,
                ]}>
                NEW INTAKE
              </Text>
            </TouchableOpacity>

            {/* Start Consultation Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                selectedButton === 'StartConsultation' && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress('StartConsultation')}>
              <Image
                source={require('../assets/images/PatientDetails/consultationImage.png')}
                style={[
                  styles.actionIcon,
                  selectedButton === 'StartConsultation' && styles.selectedIcon,
                ]}
              />
              <Text
                style={[
                  styles.actionText,
                  selectedButton === 'StartConsultation' && styles.selectedText,
                ]}>
                START CONSULTATION
              </Text>
            </TouchableOpacity>

            {/* Co-Pilot Button */}
            <TouchableOpacity
              style={[
                styles.actionButton,
                selectedButton === 'CoPilot' && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress('CoPilot')}>
              <Image
                source={require('../assets/images/PatientDetails/coPilotImage.png')}
                style={[
                  styles.actionIcon,
                  selectedButton === 'CoPilot' && styles.selectedIcon,
                ]}
              />
              <Text
                style={[
                  styles.actionText,
                  selectedButton === 'CoPilot' && styles.selectedText,
                ]}>
                CO-PILOT
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {[
              {
                label: 'Recording',
                icon: require('../assets/images/recordingIcon.png'),
              },
              {
                label: 'Smart Transcript',
                icon: require('../assets/images/smartIcon.png'),
              },
              {
                label: 'Intake Notes',
                icon: require('../assets/images/intakeIcon.png'),
              },
              {
                label: 'Previous Notes',
                icon: require('../assets/images/previousIcon.png'),
              },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.label}
                style={[
                  styles.tabButton,
                  activeTab === tab.label && styles.activeTab,
                ]}
                onPress={() => handleTabPress(tab.label)}>
                <Image
                  source={tab.icon}
                  style={[
                    styles.tabIcon,
                    activeTab === tab.label && styles.activeTabIcon,
                  ]}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.label && styles.activeTabText,
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {activeTab === 'Recording' && (
            <View>
              <View style={styles.recordingContainer}>
                <View style={styles.recordingHeader}>
                  <Image
                    style={{
                      width: 12.5,
                      height: 13.75,
                      marginTop: 2,
                      tintColor: '#0397A8',
                    }}
                    source={require('../assets/images/recordingIcon.png')}
                  />
                  <Text style={styles.recordingText}>Recording</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {speachTextData || 'Start speaking...'}
                </Text>
              </View>
              <View style={styles.lottieView}>
                <View style={styles.languageSelector}>
                  <View
                    style={{
                      width: '50%',
                    }}>
                    <Text style={styles.label}>Select Language</Text>
                    <Dropdown
                      style={styles.dropdown}
                      data={props.languageOptions}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Language"
                      value={props.selectedLanguage}
                      onChange={(item) => props.onLanguageChange(item.value)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={props.onVoiceRecordPressed}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <VoiceLottie
                      lottieRef={props.lottieRef}
                      onVoiceRecordPressed={props.onVoiceRecordPressed}
                    />
                    <ImageBackground
                      resizeMode="contain"
                      source={require('../assets/images/common/microphoneBg.webp')}
                      style={styles.microphoneBgImage}>
                      <SimpleLineIcons
                        name="microphone"
                        size={20}
                        color={AppColors.white}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>

                <CustomTouchable
                  preset={{
                    text: 'Intake Insight',
                    fontSize: normalizeFont(9.54),
                    fontWeight: 'medium',
                    textColor: AppColors.white,
                    variant: 'primary',
                    width: normalizeWidth(80),
                    height: normalizeHeight(40),
                  }}
                  style={{
                    backgroundColor: '#12AAC2',
                  }}
                />
              </View>
            </View>
          )}

          {activeTab === 'Smart Transcript' && (
            <View>
              <View style={styles.recordingContainer}>
                <View style={styles.recordingHeader}>
                  <Image
                    style={{
                      width: 12.5,
                      height: 13.75,
                      marginTop: 2,
                      tintColor: '#0397A8',
                    }}
                    source={require('../assets/images/smartIcon.png')}
                  />
                  <Text style={styles.recordingText}>Smart Transcript</Text>
                </View>
              </View>

              <TextInput
                style={styles.smartTranscriptInput}
                placeholder="Enter Text"
                placeholderTextColor="#000000"
                multiline
                editable={speachTextData ? false : true}
                value={
                  speachTextData
                    ? `The language of the provided conversation transcript is ${props.selectedLanguage}. Here is the analysis of the conversation with the identification of speakers\n\n${speachTextData}`
                    : transcriptText
                }
                onChangeText={setTranscriptText}
              />
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'Intake Notes' && (
            <View>
              <View style={styles.recordingContainer}>
                <View style={styles.recordingHeader}>
                  <Image
                    style={{
                      width: 12.5,
                      height: 13.75,
                      marginTop: 2,
                      tintColor: '#0397A8',
                    }}
                    source={require('../assets/images/intakeIcon.png')}
                  />
                  <Text style={styles.recordingText}>Intake Notes</Text>
                </View>
              </View>
              <TextInput
                style={styles.smartTranscriptInput}
                placeholder="Enter Notes"
                placeholderTextColor="#000000"
                multiline
                editable={speachTextData ? false : true}
                value={
                  speachTextData
                    ? `${AppMessages.tempIntakeNotesMessage}`
                    : props.intakeNotesValue
                }
                onChangeText={props.handleIntakeNotesValue}
              />
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  {
                    backgroundColor:
                      props.intakeNotesValue?.length > 0 ? '#3781C3' : 'gray',
                  },
                ]}
                disabled={props.intakeNotesValue?.length > 0 ? false : true}
                onPress={props.onIntakeNotesSavePressed}>
                <Text style={styles.saveButtonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'Previous Notes' && (
            <View>
              <View style={styles.recordingContainer}>
                <View style={styles.recordingHeader}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      marginTop: 2,
                      tintColor: '#0397A8',
                    }}
                    source={require('../assets/images/previousIcon.png')}
                  />
                  <Text style={styles.recordingText}>Previous Notes</Text>
                </View>
              </View>
              <View style={styles.previousNotesMainView}>
                <Text style={styles.previousNotesDate}>
                  SEPTEMBER 16, 2024 (01:53)
                </Text>
                <View style={styles.previousNotesContainer}>
                  <View style={styles.previousNotesCard}>
                    <Text style={styles.noteSectionTitle}>Medications</Text>
                    <Text style={styles.noteText}>Medication: 1</Text>
                    <Text style={styles.noteText}>Name: Pepto-Bismol</Text>
                    <Text style={styles.noteText}>Dosage: Not specified</Text>
                    <Text style={styles.noteText}>
                      Frequency: Four times a day
                    </Text>
                    <Text style={styles.noteText}>Duration: Five days</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.previousNotesDate}>
                    SEPTEMBER 16, 2024 (01:53)
                  </Text>
                  <View style={styles.previousNotesContainer}>
                    <Text style={styles.noteSectionTitle}>Subjective</Text>
                    <Text style={styles.noteText}>
                      Chief Complaint: Stomach pain since last night.
                    </Text>
                    <Text style={styles.noteText}>
                      History of Present Illness: The patient reports
                      experiencing stomach pain that began the previous night.
                      This pain is also interfering with sleep.
                    </Text>
                    <Text style={styles.noteText}>
                      Relevant Personal or Family Medical History: None
                      mentioned.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
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
    marginLeft: 5,
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
