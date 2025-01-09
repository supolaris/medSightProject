import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Configuration = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/appLogo.webp')} // Replace with your configuration icon
            style={styles.icon}
          />
          <Text style={styles.title}>Configuration</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>GPT Version</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>GPT-40</Text>
          </View>

          <Text style={styles.label}>SKU</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>Copilot</Text>
          </View>

          <Text style={styles.label}>Organization</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>Default Health</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Image
            source={require('../assets/images/patientImage.png')} // Replace with your save icon
            style={styles.saveIcon}
          />
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Configuration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9ff', // Light gradient-like background
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    alignSelf: 'center',
    marginLeft: 8,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
