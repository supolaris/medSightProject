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
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SimpleHeader from './common/headers/SimpleHeader';
interface AddNewPatientProps {
  form: {
    familyName: string;
    givenName: string;
    birthDate: string;
    contact: string;
    address: string;
    city: string;
    state: string;
    postal: string;
    country: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  handleDateChange: (event: any, selectedDate?: Date) => void;
  handleSave: () => void;
  onBackButtonPressed: () => void;
}
const AddNewPatient: React.FC<AddNewPatientProps> = ({
  form,
  setForm,
  showDatePicker,
  setShowDatePicker,
  handleDateChange,
  handleSave,
  onBackButtonPressed,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        resizeMode="stretch"
        style={{ flex: 1 }}
        source={require('../assets/images/common/appBackground.webp')}>
        <SimpleHeader showSettingsIcon={false} title="Add New Patient" />
        <ScrollView contentContainerStyle={styles.formContainer}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../assets/images/profileImage.png')}
                style={styles.avatarIcon}
              />
              <TouchableOpacity style={styles.cameraIconContainer}>
                <Image
                  source={require('../assets/images/cameraIcon.png')}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Family Name</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Family Name"
              placeholderTextColor="#8A8A8A"
              //   value={form.familyName}
              onChangeText={(text) => setForm({ ...form, familyName: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Given Name</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Given Name"
              placeholderTextColor="#8A8A8A"
              //   value={form.givenName}
              onChangeText={(text) => setForm({ ...form, givenName: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Birth Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[styles.inputField, styles.dateInput]}>
              <Text style={{ color: form.birthDate ? '#000' : '#8A8A8A' }}>
                {form.birthDate || 'Select Birth Date'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="default"
                value={form.birthDate ? new Date(form.birthDate) : new Date()}
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contact (Phone/Email)</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Contact (Phone/Email)"
              placeholderTextColor="#8A8A8A"
              //   value={form.contact}
              keyboardType="phone-pad"
              onChangeText={(text) => setForm({ ...form, contact: text })}
            />
          </View>

          {/* Other Fields */}
          {['Address', 'City', 'State', 'Postal', 'Country'].map(
            (placeholder, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{placeholder}</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={placeholder}
                  placeholderTextColor="#8A8A8A"
                  //   value={(form as any)[placeholder.toLowerCase()]}
                  onChangeText={(text) =>
                    setForm({ ...form, [placeholder.toLowerCase()]: text })
                  }
                />
              </View>
            ),
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Image
                source={require('../assets/images/saveIcon.png')}
                style={styles.saveIcon}
              />
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onBackButtonPressed}
              style={styles.backButton}>
              <Text style={styles.backButtonText}>BACK TO LIST</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AddNewPatient;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },
  formContainer: {
    padding: 15,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderColor: '#12AAC2',
    borderWidth: 2,
  },
  avatarIcon: {
    width: 60,
    height: 60,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#3681C3',
    borderRadius: 15,
    padding: 5,
    elevation: 4,
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 5,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  dateInput: {
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    width: 89,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  saveIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#E5E5E5',
    width: 120,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    marginLeft: 15,
  },
  backButtonText: {
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
