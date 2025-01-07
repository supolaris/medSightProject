import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import SimpleHeader from './common/headers/SimpleHeader';

const Patients = ({ searchQuery, onSearch, patientsData }) => {
  const renderPatientCard = ({ item }) => (
    <View
      style={[
        styles.patientCard,
        item.status === 'Active' && styles.activeCard,
      ]}>
      <Image source={item.image} style={styles.patientImage} />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>Name: {item.name}</Text>
        <Text style={styles.patientDetails}>DOB: {item.dob}</Text>
      </View>
      {item.status === 'Active' && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
        source={require('../assets/images/common/appBackground.webp')}>
        <SimpleHeader
          showBackIcon={false}
          showSettingsIcon={false}
          title="Voice"
        />
        <View style={styles.header}>
          <Text style={styles.welcomeText}>WELCOME JOHN DOE</Text>
          <TouchableOpacity>
            {/* Add profile image here if needed */}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Patient"
              placeholderTextColor="#9E9E9E"
              value={searchQuery}
              onChangeText={onSearch}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#0397A8',
                paddingVertical: 7,
                paddingHorizontal: 7,
                borderRadius: 100,
              }}>
              <Image
                source={require('../assets/images/searchImage.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* My Patients Title and Filter Icon */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.sectionTitle}>My Patients</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 8,
                marginRight: 5,
                fontWeight: 'bold',
              }}>
              Filter
            </Text>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/filterImage.png')}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Patient List */}
        <FlatList
          data={patientsData}
          renderItem={renderPatientCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />

        {/* Add Patient Button */}
        <TouchableOpacity style={styles.addButton}>
          <Image
            source={require('../assets/images/addPatient.png')}
            style={styles.addIcon}
          />
          <Text style={styles.addText}>Add Patient</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Patients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3681C3',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    width: 13,
    height: 13,
  },
  filterIcon: {
    width: 12,
    height: 12,
    marginRight: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  activeCard: {
    borderColor: '#0397A8',
    borderWidth: 1,
  },
  patientImage: {
    width: 42,
    height: 42,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#06A2B4',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  patientDetails: {
    fontSize: 12,
    color: '#555',
  },
  statusBadge: {
    backgroundColor: '#0397A8',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,

    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 2,
  },
  addIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  addText: {
    color: '#363636',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
