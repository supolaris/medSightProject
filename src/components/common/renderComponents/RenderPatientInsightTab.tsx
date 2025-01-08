import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
  patientName: string;
}

const RenderPatientInsightTab = (props: IProps) => {
  return (
    <View>
      <View style={styles.insightContainer}>
        <Text style={styles.insightText}>
          The patient, {props.patientName}, has had multiple general examination
          encounters with Dr. Austin18 Test18 from May to June 2024.
        </Text>
        <Text style={styles.insightTitle}>RECENT NOTES</Text>
        <Text style={styles.insightText}>
          Indicate treatment for fever and sore throat with a variety of
          medications, potential malaria screening, and elevated CRP suggesting
          an underlying infection or inflammation. Records show blood pressure
          issues, stomach pain managed with Pepto-Bismol, and continued
          monitoring of symptoms with appropriate follow-ups and instructions
          for hydration and rest.
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
};

export default RenderPatientInsightTab;

const styles = StyleSheet.create({
  insightContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  insightText: {
    fontSize: 11,
    color: '#555',
    marginBottom: 10,
  },
  insightTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
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
});
