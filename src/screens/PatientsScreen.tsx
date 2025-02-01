import Patients from '../components/Patients';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { IMyPatientItems } from '../@types/CommonTypes';
import {
  getMyPatientsService,
  getSearchPatientsService,
} from '../utils/MyPatientServices';
import {
  checkTokenValidity,
  mmkv,
  showToast,
  tokenRefresh,
  userLogout,
} from '../utils/CommonFunctions';
import { AppMessages } from '../constants/AppMessages';
import { getUserProfileService } from '../utils/UserServices';
import { UserContext } from '../context/Context';

let patientsStoredData: IMyPatientItems[] = [];
const PatientsScreen = ({
  navigation,
  route,
}: MainStackScreenProps<'Patients'>) => {
  let flow = route?.params;

  const userContext = UserContext();
  const [searchVal, setSearchVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myPatientsData, setMyPatientsData] = useState<IMyPatientItems[]>([]);

  useEffect(() => {
    Promise.all([getPatients(), getUserProfile()]).finally(() => {
      setIsLoading(false);
    });
  }, [flow]);

  const getPatients = async () => {
    try {
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        let tempPageSize = 20;
        const response = await getMyPatientsService(tempPageSize);
        if (response.items) {
          patientsStoredData = response.items;
          setMyPatientsData(response.items);
        }
      } else {
        console.log('add login popup');
      }
    } catch (error) {
      console.log('error in getting patients', error);
    }
  };

  const getUserProfile = async () => {
    try {
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        const response = await getUserProfileService();
        if (response) {
          // const base64Image = Buffer.from(response.photo, 'binary').toString(
          //   'base64',
          // );
          userContext.updateUserProfileData({
            displayName: response?.displayName,
            email: response?.email,
            photo: response?.photo,
          });
        } else {
          showToast('Error in getting user profile data');
        }
      } else {
        console.log('add login popup');
      }
    } catch (error) {
      console.log('error in getting userDetails', error);
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
        const isTokenValid = await checkTokenValidity();
        if (isTokenValid) {
          const response = await getSearchPatientsService(
            searchVal?.toLowerCase(),
          );
          if (response?.items) {
            setMyPatientsData(response?.items);
          }
        } else {
          console.log('add login popup');
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
      userProfileData={userContext.userProfileData}
      onMenuPressed={onMenuPressed}
      onHandleSearch={onHandleSearch}
      onSearchPressed={onSearchPressed}
      onPatientPressed={onPatientPressed}
      onPatientAddPressed={onPatientAddPressed}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
    />
  );
};

export default PatientsScreen;
