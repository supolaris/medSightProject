import React, { useEffect, useState } from 'react';
import PatientDetails from '../components/PatientDetails';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { mmkv, showToast, userLogout } from '../utils/CommonFunctions';
import {
  deletePatientService,
  getMyPatientDetailsService,
} from '../utils/MyPatientServices';
import { IGetPatientDetailsResponse } from '../@types/ApiResponses';
import { AppMessages } from '../constants/AppMessages';

const PatientDetailScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'PatientDetails'>) => {
  const { patient } = route.params;
  const [activeTab, setActiveTab] = useState<string>('PatientInsight');
  const [userImage, setUserImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userDetails, setUserDetails] =
    useState<IGetPatientDetailsResponse | null>(null);

  useEffect(() => {
    const userName = mmkv.getString('userImage') as string;
    setUserImage(userName);
    getPatientDetails();
  }, []);

  const onMenuPressed = () => {
    navigation.navigate('SideMenu');
  };

  const getPatientDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getMyPatientDetailsService(patient?.id);

      if (response) {
        console.log('patient details response', patient?.id);
        setUserDetails(response);
      }
    } catch (error) {
      console.log('error in getting patient details', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewIntake = () => {
    navigation.navigate('VoiceToText', {
      userDetails: userDetails ? userDetails : null,
    });
  };

  const handleStartConsultation = () => {
    console.log('Start Consultation pressed');
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

  const onDeletePress = async () => {
    try {
      setIsLoading(true);
      let patientId = mmkv.getString('patientId');
      if (patientId) {
        const response = await deletePatientService(patientId);
        if (response.status === 204) {
          mmkv.delete('patientId');
          navigation.replace('Patients', {
            flow: 'patientDeleted',
          });
        }
      } else {
        showToast(AppMessages.wentWrong);
      }
    } catch (error) {
      console.log('error in deleting patient', error);
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

  return (
    <PatientDetails
      isLoading={isLoading}
      userDetails={userDetails}
      userImage={userImage}
      patient={patient}
      activeTab={activeTab}
      onNewIntakePress={handleNewIntake}
      onStartConsultationPress={handleStartConsultation}
      onCoPilotPress={handleCoPilot}
      onChangeTab={onChangeTab}
      onEditPress={onEditPress}
      onDeletePress={onDeletePress}
      onMenuPressed={onMenuPressed}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
    />
  );
};

export default PatientDetailScreen;
