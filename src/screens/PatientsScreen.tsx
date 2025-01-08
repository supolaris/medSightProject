import React, { useState } from 'react';
import Patients from '../components/Patients';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { IMyPatientItems } from '../@types/CommonTypes';
import { patientsData } from '../constants/StaticData';

const PatientsScreen = ({ navigation }: MainStackScreenProps<'Patients'>) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const [myPatientsData, setMyPatientsData] = useState<IMyPatientItems[]>(
    patientsData.items,
  );

  const onHandleSearch = (val: string) => {
    setSearchVal(val);
    if (val.length > 0) {
      const filteredPatients = myPatientsData.filter((item) => {
        return item?.name[0]?.family.toLowerCase().includes(val.toLowerCase());
      });
      setMyPatientsData(filteredPatients);
    } else {
      setMyPatientsData(patientsData.items);
    }
  };

  const onPatientPressed = (item: IMyPatientItems) => {
    navigation.navigate('PatientDetails', { patient: item });
  };

  return (
    <Patients
      myPatientsData={myPatientsData}
      searchVal={searchVal}
      onPatientPressed={onPatientPressed}
      onHandleSearch={onHandleSearch}
    />
  );
};

export default PatientsScreen;
