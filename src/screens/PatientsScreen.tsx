import Patients from '../components/Patients';
import React, { useEffect, useState } from 'react';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { IMyPatientItems } from '../@types/CommonTypes';
import {
  getMyPatientsService,
  getSearchPatientsService,
} from '../utils/MyPatientServices';

let patientsStoredData: IMyPatientItems[] = [];
const PatientsScreen = ({ navigation }: MainStackScreenProps<'Patients'>) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myPatientsData, setMyPatientsData] = useState<IMyPatientItems[]>([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      setIsLoading(true);
      let tempPageSize = 20;
      const response = await getMyPatientsService(tempPageSize);
      if (response.items) {
        patientsStoredData = response.items;
        setMyPatientsData(response.items);
      }
    } catch (error) {
      console.log('error in getting patients', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onHandleSearch = (val: string) => {
    setSearchVal(val);
    if (val.length === 0) {
      setMyPatientsData(patientsStoredData);
    }
  };

  const onSearchPressed = async () => {
    if (searchVal?.length > 0) {
      try {
        setIsLoading(true);
        const response = await getSearchPatientsService(
          searchVal?.toLowerCase(),
        );
        if (response?.items) {
          setMyPatientsData(response?.items);
        }
      } catch (error) {
        console.log('error in getting searched patient', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onPatientPressed = (item: IMyPatientItems) => {
    navigation.navigate('PatientDetails', { patient: item });
  };

  const onPatientAddPressed = () => {
    navigation.navigate('AddNewPatient');
  };

  return (
    <Patients
      isLoading={isLoading}
      searchVal={searchVal}
      myPatientsData={myPatientsData}
      onHandleSearch={onHandleSearch}
      onSearchPressed={onSearchPressed}
      onPatientPressed={onPatientPressed}
      onPatientAddPressed={onPatientAddPressed}
    />
  );
};

export default PatientsScreen;
