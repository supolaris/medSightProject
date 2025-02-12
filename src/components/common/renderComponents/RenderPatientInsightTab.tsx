import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface IProps {
  patientName: string;
  patientInsightDocumentData: any;
}

const RenderPatientInsightTab = (props: IProps) => {
  const renderDocumentItem = ({ item }: { item: any }) => {
    return (
      <View
        style={{
          marginVertical: 5,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          padding: 5,
        }}>
        <Text style={styles.medicationText}>{`${item.textContent}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.insightContainer}>
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
      </View> */}
      <View style={styles.medicalHistoryContainer}>
        {/* <View style={styles.medicalHistoryContainer1}>
          <Text style={styles.medicalHistoryTitle}>Medical History</Text>
          <Text style={styles.medicationText}>Conditions: </Text>
          <Text style={styles.medicationText}>
            Potential Malaria Viral Pharyngitis Indigestion
          </Text>
        </View> */}
        {props.patientInsightDocumentData?.length > 0 && (
          <View style={styles.medicalHistoryContainer2}>
            {/* <Text style={styles.medicalHistorySubTitle}>Medications:</Text> */}

            <FlatList
              data={props.patientInsightDocumentData}
              renderItem={renderDocumentItem}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default RenderPatientInsightTab;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  insightContainer: {
    width: '95%',
    alignSelf: 'center',
    margin: 10,
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
