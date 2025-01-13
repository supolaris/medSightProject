// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
// } from 'react-native';
// import SimpleHeader from './common/headers/SimpleHeader';
// import { VoiceLottie } from './common/lotties/VoiceLottie';
// import LottieView from 'lottie-react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import LoadingPopup from './common/popups/LoadingPopup';

// interface IProps {
//   isLoading: boolean;
//   lottieRef: React.RefObject<LottieView>;
//   speechToText: string;
//   isRecording: boolean;
//   selectedLanguage: string;
//   languageOptions: { label: string; value: string }[];
//   onClearText: () => void;
//   onVoiceRecordPressed: () => void;
//   onLanguageChange: (value: string) => void;
//   patient: {
//     name: string;
//     dob: string;
//     age?: number;
//     gender?: string;
//     phone?: string;
//     address?: string;
//     image: any;
//   };
// }

// const VoiceToText = (props: IProps) => {
// const [selectedButton, setSelectedButton] = useState<
//   'NewIntake' | 'StartConsultation' | 'CoPilot'
// >('NewIntake');

// const handleButtonPress = (
//   button: 'NewIntake' | 'StartConsultation' | 'CoPilot',
// ) => {
//   setSelectedButton(button);
// };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}>
//       <LoadingPopup isVisible={props.isLoading} />
//       <ImageBackground
//         resizeMode="stretch"
//         style={{
//           flex: 1,
//         }}
//         source={require('../assets/images/common/appBackground.webp')}>
//         <SimpleHeader showSettingsIcon={false} title="Voice" />

//         <View style={styles.container}>
//           <View style={styles.innerContainer}>
//             <View style={styles.patientInfo}>
//               <Image
//                 source={props.patient?.image}
//                 style={styles.patientImage}
//               />
//               <View style={styles.patientDetails}>
//                 <Text style={styles.patientName}>
//                   Name: {props.patient?.name}
//                 </Text>
//                 <Text style={styles.patientDetailsText}>
//                   DOB: {props.patient?.dob} | AGE: {props.patient?.age} |
//                   GENDER: {props.patient?.gender}
//                 </Text>
//                 <Text style={styles.patientDetailsText}>
//                   PHONE: {props.patient?.phone || 'NOT AVAILABLE'} | ADDRESS:{' '}
//                   {props.patient?.address || 'NOT AVAILABLE'}
//                 </Text>
//               </View>
//             </View>

// <View style={styles.actionButtonsContainer}>
//   {/* New Intake Button */}
//   <TouchableOpacity
//     style={[
//       styles.actionButton,
//       selectedButton === 'NewIntake' && styles.selectedButton,
//     ]}
//     onPress={() => handleButtonPress('NewIntake')}>
//     <Image
//       source={require('../assets/images/PatientDetails/intakeIMage.png')}
//       style={[
//         styles.actionIcon,
//         selectedButton === 'NewIntake' && styles.selectedIcon,
//       ]}
//     />
//     <Text
//       style={[
//         styles.actionText,
//         selectedButton === 'NewIntake' && styles.selectedText,
//       ]}>
//       NEW INTAKE
//     </Text>
//   </TouchableOpacity>

//   {/* Start Consultation Button */}
//   <TouchableOpacity
//     style={[
//       styles.actionButton,
//       selectedButton === 'StartConsultation' &&
//         styles.selectedButton,
//     ]}
//     onPress={() => handleButtonPress('StartConsultation')}>
//     <Image
//       source={require('../assets/images/PatientDetails/consultationImage.png')}
//       style={[
//         styles.actionIcon,
//         selectedButton === 'StartConsultation' &&
//           styles.selectedIcon,
//       ]}
//     />
//     <Text
//       style={[
//         styles.actionText,
//         selectedButton === 'StartConsultation' &&
//           styles.selectedText,
//       ]}>
//       START CONSULTATION
//     </Text>
//   </TouchableOpacity>

//   {/* Co-Pilot Button */}
//   <TouchableOpacity
//     style={[
//       styles.actionButton,
//       selectedButton === 'CoPilot' && styles.selectedButton,
//     ]}
//     onPress={() => handleButtonPress('CoPilot')}>
//     <Image
//       source={require('../assets/images/PatientDetails/coPilotImage.png')}
//       style={[
//         styles.actionIcon,
//         selectedButton === 'CoPilot' && styles.selectedIcon,
//       ]}
//     />
//     <Text
//       style={[
//         styles.actionText,
//         selectedButton === 'CoPilot' && styles.selectedText,
//       ]}>
//       CO-PILOT
//     </Text>
//   </TouchableOpacity>
// </View>

//             <View style={styles.imageView}>
//               <Image
//                 style={styles.Image}
//                 source={require('../assets/images/headingImage.png')}
//               />
//               <Text style={styles.imageViewText}>PATIENT INTAKE</Text>
//             </View>

//             <View
//               style={{
//                 width: '100%',
//                 alignSelf: 'center',
//                 flexDirection: 'row',
//               }}>
//               <View style={styles.secondView}>
//                 <View style={{ flexDirection: 'row' }}>
//                   <Image
//                     style={{ width: 12.5, height: 13.75, marginTop: 2 }}
//                     source={require('../assets/images/recordingIcon.png')}
//                   />
//                   <Text style={styles.recordingText}>Recording</Text>
//                 </View>
//                 <View>
//                   <Text style={styles.underline}></Text>
//                 </View>
//               </View>
//               <View style={{ justifyContent: 'center' }}>
//                 <TouchableOpacity
//                   onPress={props.onClearText}
//                   style={styles.clearButton}>
//                   <Text style={styles.clearText}>Clear Text</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={styles.textContainer}>
//               <Text style={styles.text}>
//                 {props.speechToText || 'Start speaking...'}
//               </Text>
//             </View>

//             <View style={styles.lottieView}>
//               <View style={styles.languageSelector}>
//                 <Text style={styles.label}>Select Language</Text>
//                 <Dropdown
//                   style={styles.dropdown}
//                   data={props.languageOptions}
//                   labelField="label"
//                   valueField="value"
//                   placeholder="Select Language"
//                   value={props.selectedLanguage}
//                   onChange={(item) => props.onLanguageChange(item.value)}
//                 />
//               </View>
//               <View>
//                 <VoiceLottie
//                   lottieRef={props.lottieRef}
//                   onVoiceRecordPressed={props.onVoiceRecordPressed}
//                 />
//               </View>
//             </View>
//           </View>
//         </View>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// export default VoiceToText;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     width: '96%',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   textContainer: {
//     height: 200,
//     width: '100%',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
//   imageView: {
//     width: '100%',
//     alignSelf: 'center',
//     backgroundColor: '#3681C3',
//     flexDirection: 'row',
//     paddingVertical: 10,
//     paddingHorizontal: 7,
//     borderRadius: 5,
//   },
//   Image: {
//     width: 25,
//     height: 25,
//   },
//   imageViewText: {
//     color: '#FFFFFF',
//     marginLeft: 10,
//     fontSize: 11,
//     alignSelf: 'center',
//   },
//   secondView: {
//     width: '75%',
//     alignSelf: 'center',
//     backgroundColor: '#F8F8F8',
//     paddingVertical: 10,
//     paddingHorizontal: 7,
//     borderRadius: 5,
//   },
//   recordingText: {
//     color: '#000000',
//     marginLeft: 1,
//     fontSize: 11,
//     fontWeight: 'bold',
//   },
//   underline: {
//     width: 69,
//     height: 1,
//     backgroundColor: '#12AAC2',
//     marginTop: 3,
//   },
//   patientInfo: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   patientImage: {
//     width: 53,
//     height: 53,
//     borderRadius: 100,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#06A2B4',
//   },
//   patientName: {
//     fontSize: 11,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginBottom: 5,
//   },
//   patientDetailsText: {
//     fontWeight: 'bold',
//     color: '#000000',
//     fontSize: 8,
//   },
// actionButtonsContainer: {
//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   width: '100%',
//   alignSelf: 'center',
//   marginVertical: 15,
// },
// actionButton: {
//   padding: 10,
//   borderRadius: 8,
//   backgroundColor: '#FFFFFF',
//   elevation: 3,
//   width: 107,
//   height: 46,
//   flexDirection: 'row',
// },
// actionIcon: {
//   width: 23,
//   height: 23,
//   marginBottom: 5,
//   tintColor: '#000000',
// },
// actionText: {
//   fontSize: 9,
//   fontWeight: 'bold',
//   color: '#000',
//   textAlign: 'center',
//   alignSelf: 'center',
//   marginLeft: 5,
// },
// selectedButton: {
//   backgroundColor: '#3781C3',
// },
// selectedIcon: {
//   tintColor: '#FFFFFF',
// },
// selectedText: {
//   color: '#FFFFFF',
// },
//   lottieView: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   languageSelector: {
//     width: '40%',
//     flexDirection: 'row',
//   },
//   label: {
//     fontSize: 9.95,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     marginTop: 5,
//   },
//   dropdown: {
//     width: 103,
//     height: 25,
//     fontSize: 5,
//     borderColor: '#F7FBFF',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: '#F7FBFF',
//     marginLeft: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8.21,
//     elevation: 5,
//   },
//   clearButton: {
//     paddingVertical: 2,
//     paddingHorizontal: 4,
//     backgroundColor: '#3781C3',
//     borderRadius: 4,
//   },
//   clearText: {
//     color: '#fff',
//     fontWeight: '500',
//   },
// });

import React, { useState, useRef } from 'react';
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
import { calculateAge, formatDateOfBirth } from '../utils/CommonFunctions';

interface IProps {
  isLoading: boolean;
  userImage: string;
  patient: IMyPatientItems;
  lottieRef: React.RefObject<LottieView>;
  isRecording: boolean;
  speechToText: string;
  languageOptions: { label: string; value: string }[];
  selectedLanguage: string;
  onClearText: () => void;
  onVoiceRecordPressed: () => void;
  onLanguageChange: (value: string) => void;
}

const VoiceToText = (props: IProps) => {
  const [activeTab, setActiveTab] = useState('Recording');
  const [transcriptText, setTranscriptText] = useState('');
  const [intakeNotesText, setIntakeNotesText] = useState('');
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
                {props.patient?.birthDate && (
                  <Text style={styles.patientDetailsText}>
                    DOB: {formatDateOfBirth(props.patient?.birthDate) + ' | '}
                  </Text>
                )}
                {props.patient?.birthDate && (
                  <Text style={styles.patientDetailsText}>
                    AGE: {calculateAge(props.patient?.birthDate) + ' | '}
                  </Text>
                )}
                <Text style={styles.patientDetailsText}>
                  GENDER: {props.patient?.gender}
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
                PHONE: {props.patient?.telecom?.[0]?.value ?? 'NOT AVAILABLE'}
              </Text>
              <Text style={styles.patientDetailsText}>
                ADDRESS:{' '}
                {props.patient?.address && props.patient.address[0]
                  ? `${
                      props.patient.address[0].line?.join(', ') ||
                      'NOT AVAILABLE'
                    }, ${props.patient.address[0].city || 'NOT AVAILABLE'}, ${
                      props.patient.address[0].state || 'NOT AVAILABLE'
                    }, ${
                      props.patient.address[0].postalCode || 'NOT AVAILABLE'
                    }, ${props.patient.address[0].country || 'NOT AVAILABLE'}`
                  : 'NOT AVAILABLE'}
              </Text>
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
                  {props.speechToText || 'Start speaking...'}
                </Text>
              </View>
              <View style={styles.lottieView}>
                <View style={styles.languageSelector}>
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
                <View>
                  <VoiceLottie
                    lottieRef={props.lottieRef}
                    onVoiceRecordPressed={props.onVoiceRecordPressed}
                  />
                </View>
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
                value={transcriptText}
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
                value={intakeNotesText}
                onChangeText={setIntakeNotesText}
              />
              <TouchableOpacity style={styles.saveButton}>
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
  patientDetails: {},
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
    fontSize: 9,
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
    marginTop: 20,
  },
  languageSelector: {
    width: '50%',
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
});
