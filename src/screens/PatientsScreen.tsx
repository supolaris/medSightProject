import React, { useCallback, useEffect, useState } from 'react';
import {
  getMyPatientsService,
  getSearchPatientsService,
} from '../utils/MyPatientServices';
import {
  getUserDetailsService,
  getUserMicrosoftImage,
} from '../utils/OnBoardingServices';

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
  const [isExitPopupVisible, setIsExitPopupVisible] = useState<boolean>(false);
  const [isMessagePopupVisible, setIsMessagePopupVisible] =
    useState<boolean>(false);

  useEffect(() => {
    Promise.all([getPatients(), getUserProfile()]).finally(() => {
      setIsLoading(false);
    });
  }, [flow]);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      return () => backHandler.remove();
    }, []),
  );
  const handleBackButtonClick = () => {
    setIsExitPopupVisible(true);
    return true;
  };

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
        setIsMessagePopupVisible(true);
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
        setIsMessagePopupVisible(true);
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
          setIsMessagePopupVisible(true);
        }
      } catch (error) {
        console.log('error in getting searched patient', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onPatientPressed = (item: IMyPatientItems) => {
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
    // console.log('hello world');
    // navigation.navigate('Splash');
  };

  return (
    <Patients
      isLoading={isLoading}
      searchVal={searchVal}
      myPatientsData={myPatientsData}
      isMessagePopupVisible={isMessagePopupVisible}
      userProfileData={userContext.userProfileData}
      isExitPopupVisible={isExitPopupVisible}
      onExitPopupCancelPressed={onExitPopupCancelPressed}
      onExitPopupConfirmPressed={onExitPopupConfirmPressed}
      onMenuPressed={onMenuPressed}
      onHandleSearch={onHandleSearch}
      onSearchPressed={onSearchPressed}
      onPatientPressed={onPatientPressed}
      onPatientAddPressed={onPatientAddPressed}
      onMessagePopupConfirm={onMessagePopupConfirm}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
    />
  );
};

export default PatientsScreen;
