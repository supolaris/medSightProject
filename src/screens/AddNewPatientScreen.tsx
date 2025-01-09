import React, { useState } from 'react';
import { Alert } from 'react-native';
import AddNewPatient from '../components/AddNewPatient';
import { MainStackScreenProps } from '../@types/NavigationTypes';

const AddNewPatientScreen = ({
  navigation,
}: MainStackScreenProps<'AddNewPatient'>) => {
  const [form, setForm] = useState({
    familyName: '',
    givenName: '',
    birthDate: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle Date Change
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, birthDate: selectedDate.toISOString().split('T')[0] });
    }
  };

  // Save Button Handler
  const handleSave = () => {
    if (!form.familyName || !form.givenName || !form.contact) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }
    Alert.alert('Success', 'Patient information saved successfully!');
    // Add your save logic here (e.g., API call)
  };

  // Back Button Handler
  const onBackButtonPressed = () => {
    navigation.navigate('Patients'); // Navigate back to Patients screen
  };

  return (
    <AddNewPatient
      form={form}
      setForm={setForm}
      showDatePicker={showDatePicker}
      setShowDatePicker={setShowDatePicker}
      handleDateChange={handleDateChange}
      handleSave={handleSave}
      onBackButtonPressed={onBackButtonPressed}
    />
  );
};

export default AddNewPatientScreen;
