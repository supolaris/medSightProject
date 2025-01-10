import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

const Configuration = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <LoadingPopup isVisible={props.isLoading} /> */}
      <ImageBackground
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
        source={require('../assets/images/common/appBackground.webp')}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
              <Image
                source={require('../assets/images/configImage.png')} // Replace with your configuration icon
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
                source={require('../assets/images/saveIcon.png')}
                style={styles.saveIcon}
              />
              <Text style={styles.saveText}>SAVE</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',

    marginLeft: 8,
  },
  inputContainer: {
    width: '75%',
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
    backgroundColor: '#3781C3',
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
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
