import Patients from '../components/Patients';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { IMyPatientItems } from '../@types/CommonTypes';
import {
  getMyPatientsService,
  getSearchPatientsService,
} from '../utils/MyPatientServices';
import { mmkv } from '../utils/CommonFunctions';
import { getUserMicrosoftImage } from '../utils/OnBoardingServices';

let patientsStoredData: IMyPatientItems[] = [];
const PatientsScreen = ({ navigation }: MainStackScreenProps<'Patients'>) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myPatientsData, setMyPatientsData] = useState<IMyPatientItems[]>([]);

  const [userName, setUserName] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  useEffect(() => {
    const userName = mmkv.getString('userName') as string;
    setUserName(userName);
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
        await getUserPhoto();
      }
    } catch (error) {
      console.log('error in getting patients', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const getUserPhoto = async () => {
    try {
      setIsLoading(true);
      const response = await getUserMicrosoftImage();
      if (response) {
        // console.log('first', response.data);
        const base64Image = Buffer.from(response.data, 'binary').toString(
          'base64',
        );
        setUserImage(base64Image);
        mmkv.set('userImage', base64Image);
      }
    } catch (error) {
      console.error('Error fetching user photo:', error);
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

  const onMenuPressed = () => {
    navigation.navigate('SideMenu');
  };

  const onHeaderSettingsPressed = async () => {
    // console.log('hello world');
    // navigation.navigate('Splash');
  };

  return (
    <Patients
      isLoading={isLoading}
      searchVal={searchVal}
      myPatientsData={myPatientsData}
      userName={userName}
      userImage={userImage}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
      onMenuPressed={onMenuPressed}
      onHandleSearch={onHandleSearch}
      onSearchPressed={onSearchPressed}
      onPatientPressed={onPatientPressed}
      onPatientAddPressed={onPatientAddPressed}
    />
  );
};

export default PatientsScreen;
