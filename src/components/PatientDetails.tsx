import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import SimpleHeader from './common/headers/SimpleHeader';
import { IMyPatientItems } from '../@types/CommonTypes';
import { calculateAge, formatDateOfBirth } from '../utils/CommonFunctions';
import RenderPatientInsightTab from './common/renderComponents/RenderPatientInsightTab';
import RenderEncountersTab from './common/renderComponents/RenderEncountersTab';
import { IGetPatientDetailsResponse } from '../@types/ApiResponses';
import LoadingPopup from './common/popups/LoadingPopup';

interface IProps {
  isLoading: boolean;
  userDetails: IGetPatientDetailsResponse | null;
  userImage: string;
  patient: IMyPatientItems;
  activeTab: string;
  onNewIntakePress: () => void;
  onStartConsultationPress: () => void;
  onCoPilotPress: () => void;
  onChangeTab: (val: string) => void;
  onEditPress: () => void;
  onDeletePress: () => void;
  onMenuPressed: () => void;
  onHeaderSettingsPressed: () => void;
}

const PatientDetails = (props: IProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FBFF' }}>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.patientCard}>
            <View style={{ flexDirection: 'row', left: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                }}></View>
              <Image
                source={require('../assets/images/dummyUser.png')}
                style={styles.patientImage}
              />
              <View style={{ flexDirection: 'row', left: 90, marginTop: 7 }}>
                <TouchableOpacity onPress={props.onEditPress}>
                  <View>
                    <Image
                      source={require('../assets/images/editImage.png')}
                      style={{ width: 16, height: 16 }}
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
                <TouchableOpacity onPress={props.onDeletePress}>
                  <View style={{ left: 10 }}>
                    <Image
                      source={require('../assets/images/deleteImage.png')}
                      style={{ width: 16, height: 16 }}
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
            <Text style={styles.patientName}>
              Name: {props.userDetails?.patient?.name[0]?.family}
            </Text>
          </View>
          <View style={styles.insightView}>
            <View style={{ width: '70%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {props.userDetails?.patient?.birthDate && (
                  <Text style={styles.patientDetails}>
                    DOB:{' '}
                    {formatDateOfBirth(props.userDetails?.patient?.birthDate) +
                      ' | '}
                  </Text>
                )}
                {props.userDetails?.patient?.birthDate && (
                  <Text style={styles.patientDetails}>
                    AGE:{' '}
                    {calculateAge(props.userDetails?.patient?.birthDate) +
                      ' | '}
                  </Text>
                )}
                <Text style={styles.patientDetails}>
                  GENDER: {props.userDetails?.patient?.gender}
                </Text>
              </View>
              <Text style={styles.patientDetails}>
                PHONE:{' '}
                {props.userDetails?.patient?.telecom?.[0]?.value ??
                  'NOT AVAILABLE'}
              </Text>
              <Text style={styles.patientDetails}>
                ADDRESS:{' '}
                {props.userDetails?.patient?.address &&
                props.userDetails?.patient.address[0]
                  ? `${
                      props.userDetails?.patient?.address[0].line?.join(', ') ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient?.address[0].city ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient?.address[0].state ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient?.address[0].postalCode ||
                      'NOT AVAILABLE'
                    }, ${
                      props.userDetails?.patient?.address[0].country ||
                      'NOT AVAILABLE'
                    }`
                  : 'NOT AVAILABLE'}
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.viewInsightButton}>
                <Text style={styles.viewInsightText}>VIEW INSIGHT</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={props.onNewIntakePress}>
              <Image
                source={require('../assets/images/PatientDetails/intakeIMage.png')}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>NEW INTAKE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={props.onStartConsultationPress}>
              <Image
                source={require('../assets/images/PatientDetails/consultationImage.png')}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>START CONSULTATION</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={props.onCoPilotPress}>
              <Image
                source={require('../assets/images/PatientDetails/coPilotImage.png')}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>CO-PILOT</Text>
            </TouchableOpacity>
          </View>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                props.activeTab === 'PatientInsight' && styles.activeTab,
              ]}
              onPress={() => props.onChangeTab('PatientInsight')}>
              <Text
                style={[
                  styles.tabText,
                  props.activeTab === 'PatientInsight' && styles.activeTabText,
                ]}>
                PATIENT INSIGHT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                props.activeTab === 'Encounters' && styles.activeTab,
              ]}
              onPress={() => props.onChangeTab('Encounters')}>
              <Text
                style={[
                  styles.tabText,
                  props.activeTab === 'Encounters' && styles.activeTabText,
                ]}>
                ENCOUNTERS
              </Text>
            </TouchableOpacity>
          </View>

          {props.activeTab === 'PatientInsight' ? (
            <RenderPatientInsightTab
              patientName={
                props.userDetails?.patient?.name[0]?.family as string
              }
              patientInsightDocumentData={props.userDetails?.documentReferences}
            />
          ) : props.activeTab === 'Encounters' ? (
            <RenderEncountersTab
              encounterData={props.userDetails?.encounters}
            />
          ) : null}

          {/* <>
            <Text
              style={{
                fontSize: 10,
              }}>
              {`${props.test}`}
            </Text>
          </> */}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    width: '98%',
    alignSelf: 'center',
  },
  patientCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 10,
    elevation: 7,
  },
  patientImage: {
    width: 88.77,
    height: 88.77,
    borderRadius: 100,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#06A2B4',
    resizeMode: 'cover',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  insightView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  patientDetails: {
    fontSize: 11,
    color: '#555',
    marginBottom: 5,
  },
  viewInsightButton: {
    backgroundColor: '#3681C3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '98%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    width: 111,
    height: 46,
    flexDirection: 'row',
  },
  actionIcon: {
    width: 23,
    height: 23,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 7.4,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 5,
  },

  viewInsightText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 9,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 1,

    borderBottomColor: '#3681C3',
  },
  tabText: {
    fontSize: 12,
    color: '#555',
  },
  activeTabText: {
    color: '#3681C3',
    fontWeight: 'bold',
  },
  insightContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  insightTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  insightText: {
    fontSize: 11,
    color: '#555',
    marginBottom: 10,
  },
  medicalHistoryContainer: {
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
  },
  medicalHistoryContainer1: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 5,
    elevation: 3,
  },
  medicalHistoryContainer2: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  medicalHistoryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  medicalHistorySubTitle: {
    fontSize: 11,
    color: '#000',
    fontWeight: '900',
    marginBottom: 5,
  },
  medicationText: {
    fontSize: 11,
    color: '#000',
    marginBottom: 5,
  },
  encounterContainer: {
    margin: 10,
  },
  encounterDate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3681C3',
    marginBottom: 5,
  },
  encounterCard: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  encounterSectionTitle: {
    fontSize: 10,
    color: '#000',
  },
  encounterSectionText: {
    fontSize: 10,
    color: '#000',
  },
});
