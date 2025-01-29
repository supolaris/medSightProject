import Patients from '../components/Patients';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { IMyPatientItems } from '../@types/CommonTypes';
import {
  getMyPatientsService,
  getSearchPatientsService,
} from '../utils/MyPatientServices';
import { mmkv, showToast, userLogout } from '../utils/CommonFunctions';
import {
  getUserDetailsService,
  getUserMicrosoftImage,
} from '../utils/OnBoardingServices';
import { AppMessages } from '../constants/AppMessages';

let patientsStoredData: IMyPatientItems[] = [];
const PatientsScreen = ({
  navigation,
  route,
}: MainStackScreenProps<'Patients'>) => {
  let flow = route?.params;

  console.log('flow', flow);
  const [searchVal, setSearchVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myPatientsData, setMyPatientsData] = useState<IMyPatientItems[]>([]);

  const [userName, setUserName] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  useEffect(() => {
    getPatients();
    // getUserDetails();
  }, [flow]);

  const getPatients = async () => {
    try {
      setIsLoading(true);
      let tempPageSize = 20;
      const response = await getMyPatientsService(tempPageSize);
      if (response.items) {
        patientsStoredData = response.items;
        setMyPatientsData(response.items);
        // await getUserPhoto();
      }
    } catch (error) {
      console.log('error in getting patients', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPhoto = async () => {
    try {
      // setIsLoading(true);
      const response = await getUserMicrosoftImage();
      if (response) {
        // console.log('first', response.data);
        const base64Image = Buffer.from(response.data, 'binary').toString(
          'base64',
        );
        setUserImage(base64Image);
        mmkv.set('userImage', base64Image);

        await getUserDetails();
      }
    } catch (error) {
      console.error('Error fetching user photo:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await getUserDetailsService();
      if (response?.displayName) {
        setUserName(response.displayName);
        mmkv.set('userName', response.displayName);
      }
      console.log('response of user details', response);
    } catch (error) {
      console.log('error in getting userDetails', error);
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
    // console.log('patient id =>>>>>', item.id);
    mmkv.set('patientId', item.id);
    navigation.navigate('PatientDetails', { patient: item });
  };

  const onPatientAddPressed = () => {
    navigation.navigate('AddNewPatient');
  };

  const onMenuPressed = () => {
    navigation.navigate('SideMenu');
  };

  const onHeaderSettingsPressed = async () => {
    const result = userLogout();
    if (result) {
      navigation.replace('Splash');
    } else {
      showToast(AppMessages.wentWrong);
    }
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
