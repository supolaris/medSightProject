import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddNewPatient from '../components/AddNewPatient';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { mmkv } from '../utils/CommonFunctions';

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

  const [userImage, setUserImage] = useState<string>('');

  useEffect(() => {
    const userImage = mmkv.getString('userImage') as string;

    setUserImage(userImage);
  }, []);

  // Date.....................
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, birthDate: selectedDate.toISOString().split('T')[0] });
    }
  };

  // Save Button.....................
  const handleSave = () => {
    if (!form.familyName || !form.givenName || !form.contact) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }
    Alert.alert('Success', 'Patient information saved successfully!');
    //save logic here (API call)
  };

  // Back Button
  const onBackButtonPressed = () => {
    navigation.navigate('Patients');
  };

  return (
    <AddNewPatient
      userImage={userImage}
      form={form}
      showDatePicker={showDatePicker}
      setForm={setForm}
      handleSave={handleSave}
      setShowDatePicker={setShowDatePicker}
      handleDateChange={handleDateChange}
      onBackButtonPressed={onBackButtonPressed}
    />
  );
};

export default AddNewPatientScreen;
