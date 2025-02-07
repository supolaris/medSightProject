import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  normalizeFont,
  normalizeHeight,
  normalizeWidth,
} from '../../../utils/CommonFunctions';
import LottieView from 'lottie-react-native';
import { ImageBackground } from 'react-native';
import { VoiceLottie } from '../lotties/VoiceLottie';
import { AppColors } from '../../../constants/AppColors';
import { Dropdown } from 'react-native-element-dropdown';
import CustomTouchable from '../touchables/CustomTouchable';
import { AppMessages } from '../../../constants/AppMessages';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface IProps {
  activeTab: string;
  speechToText: string;
  previousNotes: {
    summary: string;
    conditions: any[];
    medications: any[];
  };
  selectedButton: string;
  transcriptText: string;
  selectedLanguage: string;
  intakeNotesValue: string;
  speachTextData: string[];
  lottieRef: React.RefObject<LottieView>;
  languageOptions: { label: string; value: string }[];
  onVoiceRecordPressed: () => void;
  onIntakeNotesSavePressed: () => void;
  handleTabPress: (label: string) => void;
  onLanguageChange: (value: string) => void;
  onChnageTranscriptText: (val: string) => void;
  handleIntakeNotesValue: (value: string) => void;
  onIntakeInsightPressed: () => void;
}

const RenderConsultantTab = (props: IProps) => {
  return (
    <View>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {[
          {
            label: 'Recording',
            icon: require('../../../assets/images/recordingIcon.png'),
          },
          {
            label: 'Smart Transcript',
            icon: require('../../../assets/images/smartIcon.png'),
          },
          {
            label: 'Intake Notes',
            icon: require('../../../assets/images/intakeIcon.png'),
          },
          {
            label: 'Previous Notes',
            icon: require('../../../assets/images/previousIcon.png'),
          },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={[
              styles.tabButton,
              props.activeTab === tab.label && styles.activeTab,
            ]}
            onPress={() => props.handleTabPress(tab.label)}>
            <Image
              source={tab.icon}
              style={[
                styles.tabIcon,
                props.activeTab === tab.label && styles.activeTabIcon,
              ]}
            />
            <Text
              style={[
                styles.tabText,
                props.activeTab === tab.label && styles.activeTabText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {props.activeTab === 'Recording' && (
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
                source={require('../../../assets/images/recordingIcon.png')}
              />
              <Text style={styles.recordingText}>Recording</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {props.speachTextData || 'Start speaking...'}
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
                  source={require('../../../assets/images/common/microphoneBg.webp')}
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
                variant: 'primary',
                fontWeight: 'medium',
                text: 'Generate Insight',
                textColor: AppColors.white,
                width: normalizeWidth(80),
                height: normalizeHeight(40),
                fontSize: normalizeFont(9.54),
                isDisabled: props.speechToText ? false : true,
              }}
              style={{
                backgroundColor: '#12AAC2',
              }}
              onPress={props.onIntakeInsightPressed}
            />
          </View>
        </View>
      )}

      {props.activeTab === 'Smart Transcript' && (
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
                source={require('../../../assets/images/smartIcon.png')}
              />
              <Text style={styles.recordingText}>Smart Transcript</Text>
            </View>
          </View>

          <TextInput
            style={styles.smartTranscriptInput}
            placeholder="Enter Text"
            placeholderTextColor="#000000"
            multiline
            editable={props.transcriptText ? false : true}
            value={props.transcriptText}
            onChangeText={props.onChnageTranscriptText}
          />
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      )}

      {props.activeTab === 'Intake Notes' && (
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
                source={require('../../../assets/images/intakeIcon.png')}
              />
              <Text style={styles.recordingText}>Intake Notes</Text>
            </View>
          </View>
          <TextInput
            style={styles.smartTranscriptInput}
            placeholder="Enter Notes"
            placeholderTextColor="#000000"
            multiline
            editable={props.intakeNotesValue ? false : true}
            value={props.intakeNotesValue}
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

      {props.activeTab === 'Previous Notes' && (
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
                source={require('../../../assets/images/previousIcon.png')}
              />
              <Text style={styles.recordingText}>Previous Notes</Text>
            </View>
          </View>
          {props.previousNotes?.summary ? (
            <View style={styles.previousNotesMainView}>
              <View style={styles.previousNotesContainer}>
                <View style={styles.previousNotesCard}>
                  <Text style={styles.noteSectionTitle}>Summary</Text>
                  <Text style={styles.noteText}>
                    {props.previousNotes?.summary}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text style={styles.noteText}>{AppMessages.noDataAvailable}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default RenderConsultantTab;

const styles = StyleSheet.create({
  container: {},
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
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
  microphoneBgImage: {
    height: 50,
    width: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
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
  noteText: {
    color: '#000',
  },
  tabButton: {
    alignItems: 'center',
    flexDirection: 'row',
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
  activeTab: {
    borderBottomWidth: 1,
    borderColor: '#12AAC2',
  },
  activeTabIcon: {
    tintColor: '#3781C3',
  },
});
