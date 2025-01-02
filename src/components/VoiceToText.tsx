import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, { RefObject } from 'react';
import SimpleHeader from './common/headers/SimpleHeader';
import { VoiceLottie } from './common/lotties/VoiceLottie';
import LottieView from 'lottie-react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface IProps {
  lottieRef: RefObject<LottieView>;
  speechToText: string;
  isRecording: boolean;
  selectedLanguage: string;
  languageOptions: { label: string; value: string }[];
  onClearText: () => void;
  onVoiceRecordPressed: () => void;
  onLanguageChange: (value: string) => void;
}

const VoiceToText = (props: IProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
        source={require('../assets/images/common/appBackground.webp')}>
        <View style={styles.container}>
          <SimpleHeader
            showBackIcon={false}
            showSettingsIcon={false}
            title="Voice"
          />

          <View style={styles.innerContainer}>
            <View style={styles.patientInfo}>
              <Image
                style={styles.patientImage}
                source={require('../assets/images/patientImage.png')}
              />
              <View style={styles.patientDetails}>
                <Text style={styles.patientName}>Name: Roberts John</Text>
                <Text style={styles.patientDetailsText}>
                  DOB: 01/01/1980 | AGE: 44 | GENDER: MALE
                </Text>
                <Text style={styles.patientDetailsText}>
                  PHONE: NOT AVAILABLE | ADDRESS: 123 MAIN ST
                </Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.firstbutton}>
                <Text style={styles.firstbuttonText}>NEW INTAKE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondbutton}>
                <Text style={styles.secondbuttonText}>START CONSULTATION</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.thirdbutton}>
                <Text style={styles.thirdbuttonText}>CO-PILOT</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imageView}>
              <Image
                style={styles.Image}
                source={require('../assets/images/headingImage.png')}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  marginLeft: 10,
                  fontSize: 11,
                  alignSelf: 'center',
                }}>
                PATIENT INTAKE
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View style={styles.secondView}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={{ width: 12.5, height: 13.75, marginTop: 2 }}
                    source={require('../assets/images/recordingIcon.png')}
                  />
                  <Text
                    style={{
                      color: '#000000',
                      marginLeft: 1,
                      fontSize: 11,
                      fontWeight: 'bold',
                    }}>
                    Recording
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      width: 69,
                      height: 1,
                      backgroundColor: '#12AAC2',
                      marginTop: 3,
                    }}></Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={props.onClearText}
                  style={styles.clearButton}>
                  <Text style={styles.clearText}>Clear Text</Text>
                </TouchableOpacity>
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
              <View
                style={{
                  // backgroundColor: 'red',
                  // width: '40%',
                  alignItems: 'flex-end',
                }}>
                <VoiceLottie
                  lottieRef={props.lottieRef}
                  onVoiceRecordPressed={props.onVoiceRecordPressed}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
    // justifyContent: 'center',
    alignItems: 'center',
    // bottom: 45,
    // paddingVertical: 20,
  },
  textContainer: {
    height: 200,
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

  imageView: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#3681C3',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  Image: {
    width: 25,
    height: 25,
  },
  secondView: {
    width: '75%',
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',

    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  patientDetails: {},
  patientInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientImage: {
    width: 53,
    height: 53,
    borderRadius: 50,
    marginRight: 10,
  },

  patientName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  patientDetailsText: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  firstbutton: {
    width: 90,
    height: 46,
    borderRadius: 5,
    backgroundColor: '#3681C3', // Blue button color
    justifyContent: 'center',

    marginRight: 10,
  },
  secondbutton: {
    width: 130,
    height: 46,
    borderRadius: 5,
    backgroundColor: '#ddd', // Blue button color
    justifyContent: 'center',

    marginRight: 10,
  },
  thirdbutton: {
    width: 78,
    height: 46,
    borderRadius: 5,
    backgroundColor: '#ddd', // Blue button color
    justifyContent: 'center',

    marginRight: 10,
  },
  firstbuttonText: {
    color: 'white',
    fontSize: 11,
    alignSelf: 'center',
  },
  thirdbuttonText: {
    color: 'black',
    fontSize: 11,
    alignSelf: 'center',
  },
  secondbuttonText: {
    color: 'black',
    fontSize: 11,
    alignSelf: 'center',
  },
  lottieView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageSelector: {
    width: '40%',
    flexDirection: 'row',
  },
  label: {
    fontSize: 9.95,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
  },
  dropdown: {
    width: 103,
    height: 25,
    fontSize: 5,
    borderColor: '#F7FBFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#F7FBFF',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8.21,
    elevation: 5,
  },
  // textContainer: {
  //   width: '100%',
  //   height: '30%',
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 20,
  // },
  // text: {
  //   fontSize: 16,
  //   color: '#333',
  // },
  lottie: {},
  clearButton: {
    // width: '50%',
    // marginTop: 20,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: '#3781C3',
    borderRadius: 4,
  },
  clearText: {
    color: '#fff',
    fontWeight: '500',
  },
});
