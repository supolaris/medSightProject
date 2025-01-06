import React, { useEffect, useState } from 'react';
import Patients from '../components/Patients';
import { MainStackScreenProps } from '../@types/NavigationTypes';

const PatientsScreen = ({ navigation }: MainStackScreenProps<'Patients'>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  const patientsData = [
    {
      id: '1',
      name: 'Roberts John',
      dob: '01/01/1980',
      status: 'Active',
      image: require('../assets/images/patientImages/robImage.png'),
    },
    {
      id: '2',
      name: 'Jenny Doe',
      dob: '01/01/1990',
      status: '',
      image: require('../assets/images/patientImages/jennyImage.png'),
    },
    {
      id: '3',
      name: 'Roberts John',
      dob: '01/01/1960',
      status: '',
      image: require('../assets/images/patientImages/jognImage.png'),
    },
    {
      id: '4',
      name: 'Sarah',
      dob: '01/01/1989',
      status: '',
      image: require('../assets/images/patientImages/sarahImage.png'),
    },
  ];
  useEffect(() => {
    setFilteredPatients(patientsData);
  }, []);
  // Filter patients based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPatients(patientsData);
    } else {
      const filtered = patientsData.filter((patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredPatients(filtered);
    }
  };

  const onPatientPressed = () => {
    navigation.navigate('VoiceToText');
  };

  return (
    <Patients
      searchQuery={searchQuery}
      patientsData={filteredPatients}
      onPatientPressed={onPatientPressed}
      onSearch={handleSearch}
    />
  );
};

export default PatientsScreen;
