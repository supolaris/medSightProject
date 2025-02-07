import React, { useEffect, useState } from 'react';
import {
  deletePatientService,
  getMyPatientDetailsService,
} from '../utils/MyPatientServices';
import { AppMessages } from '../constants/AppMessages';
import PatientDetails from '../components/PatientDetails';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { IGetPatientDetailsResponse } from '../@types/ApiResponses';
import {
  checkTokenValidity,
  mmkv,
  showToast,
  userLogout,
} from '../utils/CommonFunctions';

const PatientDetailScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'PatientDetails'>) => {
  const { patient } = route.params;
  const [activeTab, setActiveTab] = useState<string>('PatientInsight');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlertPopupVisible, setIsAlertPopupVisible] = useState(false);
  const [isMessagePopupVisible, setIsMessagePopupVisible] =
    useState<boolean>(false);
  const [userDetails, setUserDetails] =
    useState<IGetPatientDetailsResponse | null>(null);

  useEffect(() => {
    getPatientDetails();
  }, []);

  const onMenuPressed = () => {
    navigation.navigate('SideMenu');
  };

  const getPatientDetails = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        const response = await getMyPatientDetailsService(patient?.id);

        if (response) {
          console.log('patient details response', patient?.id);
          setUserDetails(response);
        } else {
          showToast(AppMessages.wentWrong);
        }
      } else {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
      }
    } catch (error) {
      console.log('error in getting patient details', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewIntake = () => {
    navigation.navigate('VoiceToText', {
      flow: 'NewIntake',
      userDetails: userDetails ? userDetails : null,
    });
  };

  const handleStartConsultation = () => {
    navigation.navigate('VoiceToText', {
      flow: 'StartConsultation',
      userDetails: userDetails ? userDetails : null,
    });
  };

  const handleCoPilot = () => {
    console.log('Co-Pilot pressed');
  };

  const onChangeTab = (val: string) => {
    setActiveTab(val);
  };

  const onEditPress = () => {
    navigation.navigate('EditScreen');
  };

  const onDeleteButtonPressed = () => {
    setIsAlertPopupVisible(true); // Show confirmation popup first
  };

  const onAlertPopupCancelPressed = () => {
    setIsAlertPopupVisible(false); // Close the popup without deleting
  };

  const onAlertPopupConfirmPressed = async () => {
    setIsAlertPopupVisible(false); // Close the popup
    await deletePatient(); // Proceed with deletion
  };

  const deletePatient = async () => {
    try {
      setIsLoading(true);
      const isTokenValid = await checkTokenValidity();
      if (!isTokenValid) {
        console.log('add login popup');
        setIsMessagePopupVisible(true);
        return;
      }

      let patientId = mmkv.getString('patientId');
      if (!patientId) {
        showToast(AppMessages.wentWrong);
        return;
      }

      const response = await deletePatientService(patientId);
      if (response.status === 204) {
        mmkv.delete('patientId');
        navigation.replace('Patients', {
          flow: 'patientDeleted',
        });
      }
    } catch (error) {
      console.log('Error in deleting patient', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onHeaderSettingsPressed = async () => {
    const result = userLogout();
    if (result) {
      navigation.replace('Splash');
    } else {
      showToast(AppMessages.wentWrong);
    }
  };

  const onMessagePopupConfirm = () => {
    mmkv.clearAll();
    setIsMessagePopupVisible(false);
    navigation.replace('Splash');
  };

  return (
    <PatientDetails
      patient={patient}
      isLoading={isLoading}
      activeTab={activeTab}
      userDetails={userDetails}
      isMessagePopupVisible={isMessagePopupVisible}
      onChangeTab={onChangeTab}
      onEditPress={onEditPress}
      // onDeletePress={onDeletePress}
      onAlertPopupConfirmPressed={onAlertPopupConfirmPressed}
      onAlertPopupCancelPressed={onAlertPopupCancelPressed}
      onDeleteButtonPressed={onDeleteButtonPressed}
      isAlertPopupVisible={isAlertPopupVisible}
      onMenuPressed={onMenuPressed}
      onCoPilotPress={handleCoPilot}
      onNewIntakePress={handleNewIntake}
      onMessagePopupConfirm={onMessagePopupConfirm}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
      onStartConsultationPress={handleStartConsultation}
    />
  );
};

export default PatientDetailScreen;
