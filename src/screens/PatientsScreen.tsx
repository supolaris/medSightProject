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
      dob: '21/11/1980',
      // status: 'Active',
      gender: 'Male',
      phone: '+1 (123) 600-7981',
      image: require('../assets/images/patientImages/robImage.png'),
    },
    {
      id: '2',
      name: 'Jenny Doe',
      dob: '27/06/2000',
      status: 'Active',
      gender: 'Female',
      phone: '+1 (345) 678-9012',
      image: require('../assets/images/patientImages/jennyImage.png'),
    },
    {
      id: '3',
      name: 'Roberts John',
      dob: '24/09/2010',
      // status: 'Active',
      gender: 'Male',
      phone: '+1 (456) 789-0123',
      image: require('../assets/images/patientImages/jognImage.png'),
    },
    {
      id: '4',
      name: 'Sarah',
      dob: '05/05/2012',
      gender: 'Female',
      // status: '',
      // status: 'Active',
      phone: '+1 (567) 890-1234',
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

  const onPatientPressed = (item: any) => {
    navigation.navigate('PatientDetails', { patients: item });
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
