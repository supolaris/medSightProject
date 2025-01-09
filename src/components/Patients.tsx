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
import { IMyPatientItems } from '../@types/CommonTypes';
import RenderPatientListCard from './common/renderComponents/RenderPatientListCard';
import LoadingPopup from './common/popups/LoadingPopup';
import RenderNoDataView from './common/renderComponents/RenderNoDataView';

interface IProps {
  isLoading: boolean;
  myPatientsData: IMyPatientItems[];
  searchVal: string;
  onSearchPressed: () => void;
  onHandleSearch: (val: string) => void;
  onPatientPressed: (item: any) => void;
  onPatientAddPressed: () => void;
  onMenuPressed: () => void;
}

const Patients = (props: IProps) => {
  const renderPatientCard = ({ item }: { item: IMyPatientItems }) => (
    <RenderPatientListCard
      item={item}
      onPatientPressed={props.onPatientPressed}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <LoadingPopup isVisible={props.isLoading} />
      <ImageBackground
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
        source={require('../assets/images/common/appBackground.webp')}>
        <SimpleHeader
          showSettingsIcon={false}
          title="Voice"
          onMenuPressed={props.onMenuPressed}
        />
        <View style={styles.header}>
          <Text style={styles.welcomeText}>WELCOME JOHN DOE</Text>
          <TouchableOpacity></TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Patient"
              placeholderTextColor="#9E9E9E"
              value={props.searchVal}
              onChangeText={(val: string) => props.onHandleSearch(val)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#0397A8',
                paddingVertical: 7,
                paddingHorizontal: 7,
                borderRadius: 100,
              }}
              onPress={props.onSearchPressed}>
              <Image
                source={require('../assets/images/searchImage.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

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
        <View style={styles.flatlistView}>
          {props.myPatientsData?.length > 0 ? (
            <FlatList
              data={props.myPatientsData}
              renderItem={renderPatientCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <RenderNoDataView />
          )}
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={props.onPatientAddPressed}>
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
  flatlistView: {
    flex: 1,
  },
});
