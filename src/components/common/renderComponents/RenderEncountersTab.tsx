import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface IProps {
  encounterData: any;
}

const RenderEncountersTab = (props: IProps) => {
  // console.log('props encounter data', props.encounterData);

  const renderEncounterItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    // console.log('iterm =>>>>>>>', item.type?.[0]?.coding?.[0]?.display);
    return (
      <View>
        {index === 0 && (
          <Text style={styles.encounterSectionTitle}>
            Name: {item.subject?.display}
          </Text>
        )}
        <Text style={styles.encounterSectionTitle}>
          {item.type?.[0]?.coding?.[0]?.display}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.encounterContainer}>
        <Text style={styles.encounterDate}>SEPTEMBER 16, 2024 (01:53)</Text>
        <View style={styles.encounterCard}>
          <FlatList
            data={props.encounterData}
            renderItem={renderEncounterItem}
          />
          {/* <Text style={styles.encounterSectionTitle}>Medications</Text>
          <Text style={styles.encounterSectionText}>Medication: 1</Text>
          <Text style={styles.encounterSectionText}>Name: Pepto-Bismol</Text>
          <Text style={styles.encounterSectionText}>Dosage: Not specified</Text>
          <Text style={styles.encounterSectionText}>
            Frequency: Four times a day
          </Text>
          <Text style={styles.encounterSectionText}>Duration: Five days</Text> */}
        </View>
        <View style={styles.encounterCard}>
          <Text style={styles.encounterSectionTitle}>Subjective</Text>
          <Text style={styles.encounterSectionText}>
            Chief Complaint: Stomach pain since last night.
          </Text>
          <Text style={styles.encounterSectionText}>
            History of Present Illness: The patient reports experiencing stomach
            pain that began the previous night. This pain is also interfering
            with sleep.
          </Text>
          <Text style={styles.encounterSectionText}>
            Relevant Personal or Family Medical History: None mentioned.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RenderEncountersTab;

const styles = StyleSheet.create({
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
