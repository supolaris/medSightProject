import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MainStackScreenProps } from '../@types/NavigationTypes';

const EditScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'EditScreen'>) => {
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleback = () => {
    navigation.navigate('Patients');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Patient</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/dummyUser.png')}
          style={styles.patientImage}
        />
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Given Name</Text>
        <TextInput
          style={styles.input}
          value={givenName}
          onChangeText={setGivenName}
        />

        <Text style={styles.label}>Family Name</Text>
        <TextInput
          style={styles.input}
          value={familyName}
          onChangeText={setFamilyName}
        />

        <Text style={styles.label}>Birth Date</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={birthDate}
            onChangeText={setBirthDate}
          />
          <TouchableOpacity>
            {/* <Image
              source={{ uri: 'https://via.placeholder.com/20' }} // Replace with calendar icon
              style={styles.calendarIcon}
            /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleback} style={styles.backButtonList}>
          <Text style={styles.backButtonListText}>BACK TO LIST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4AC5F8',
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonList: {
    flex: 1,
    backgroundColor: '#D6D6D6',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  backButtonListText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditScreen;
