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

interface IProps {
  patient: {
    name: string;
    dob: string;
    age?: number;
    gender?: string;
    phone?: string;
    address?: string;
    image: any;
  };
  onNewIntakePress: () => void;
  onStartConsultationPress: () => void;
  onCoPilotPress: () => void;
}

const PatientDetails = (props: IProps) => {
  const [activeTab, setActiveTab] = useState<'PatientInsight' | 'Encounters'>(
    'PatientInsight',
  );

  const renderContent = () => {
    if (activeTab === 'PatientInsight') {
      return (
        <View>
          <View style={styles.insightContainer}>
            <Text style={styles.insightText}>
              The patient, {props.patient?.name}, has had multiple general
              examination encounters with Dr. Austin18 Test18 from May to June
              2024.
            </Text>
            <Text style={styles.insightTitle}>RECENT NOTES</Text>
            <Text style={styles.insightText}>
              Indicate treatment for fever and sore throat with a variety of
              medications, potential malaria screening, and elevated CRP
              suggesting an underlying infection or inflammation. Records show
              blood pressure issues, stomach pain managed with Pepto-Bismol, and
              continued monitoring of symptoms with appropriate follow-ups and
              instructions for hydration and rest.
            </Text>
          </View>
          <View style={styles.medicalHistoryContainer}>
            <View style={styles.medicalHistoryContainer1}>
              <Text style={styles.medicalHistoryTitle}>Medical History</Text>
              <Text style={styles.medicationText}>Conditions: </Text>
              <Text style={styles.medicationText}>
                Potential Malaria Viral Pharyngitis Indigestion
              </Text>
            </View>
            <View style={styles.medicalHistoryContainer2}>
              <Text style={styles.medicalHistorySubTitle}>Medications:</Text>
              <Text style={styles.medicationText}>
                - Medicine A 500 mg twice a day for 5 days
              </Text>
              <Text style={styles.medicationText}>
                - Medicine B 250 mg twice a day for 5 days
              </Text>
              <Text style={styles.medicationText}>
                - Medicine C 50 mg three times a day for 5 days
              </Text>
              <Text style={styles.medicationText}>
                - Cough Syrup 10 ml twice a day for 5 days
              </Text>
              <Text style={styles.medicationText}>
                - Panadol as needed for fever
              </Text>
              <Text style={styles.medicationText}>
                - Pepto-Bismol four times a day for five days
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (activeTab === 'Encounters') {
      return (
        <View>
          <View style={styles.encounterContainer}>
            <Text style={styles.encounterDate}>SEPTEMBER 16, 2024 (01:53)</Text>
            <View style={styles.encounterCard}>
              <Text style={styles.encounterSectionTitle}>Medications</Text>
              <Text style={styles.encounterSectionText}>Medication: 1</Text>
              <Text style={styles.encounterSectionText}>
                Name: Pepto-Bismol
              </Text>
              <Text style={styles.encounterSectionText}>
                Dosage: Not specified
              </Text>
              <Text style={styles.encounterSectionText}>
                Frequency: Four times a day
              </Text>
              <Text style={styles.encounterSectionText}>
                Duration: Five days
              </Text>
            </View>
            <View style={styles.encounterCard}>
              <Text style={styles.encounterSectionTitle}>Subjective</Text>
              <Text style={styles.encounterSectionText}>
                Chief Complaint: Stomach pain since last night.
              </Text>
              <Text style={styles.encounterSectionText}>
                History of Present Illness: The patient reports experiencing
                stomach pain that began the previous night. This pain is also
                interfering with sleep.
              </Text>
              <Text style={styles.encounterSectionText}>
                Relevant Personal or Family Medical History: None mentioned.
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FBFF' }}>
      <ImageBackground
        resizeMode="stretch"
        style={{ flex: 1 }}
        source={require('../assets/images/common/appBackground.webp')}>
        <SimpleHeader showSettingsIcon={false} title="Voice" />
        <ScrollView contentContainerStyle={styles.container}>
          {/* Patient Info */}
          <View style={styles.patientCard}>
            <Image source={props.patient?.image} style={styles.patientImage} />
            <Text style={styles.patientName}>Name: {props.patient?.name}</Text>
          </View>
          <View style={styles.insightView}>
            <View style={{ width: '70%' }}>
              <Text style={styles.patientDetails}>
                DOB: {props.patient?.dob} | AGE: {props.patient?.age} | GENDER:{' '}
                {props.patient?.gender}
              </Text>
              <Text style={styles.patientDetails}>
                PHONE: {props.patient?.phone || 'NOT AVAILABLE'} | ADDRESS:{' '}
                {props.patient?.address || 'NOT AVAILABLE'}
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
                activeTab === 'PatientInsight' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('PatientInsight')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'PatientInsight' && styles.activeTabText,
                ]}>
                PATIENT INSIGHT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'Encounters' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('Encounters')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Encounters' && styles.activeTabText,
                ]}>
                ENCOUNTERS
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {renderContent()}
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
    fontSize: 9,
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
