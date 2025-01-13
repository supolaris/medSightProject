import React, { useEffect, useState } from 'react';
import PatientDetails from '../components/PatientDetails';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { mmkv } from '../utils/CommonFunctions';

const PatientDetailScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'PatientDetails'>) => {
  const { patient } = route.params;
  const [activeTab, setActiveTab] = useState<string>('PatientInsight');
  const [userImage, setUserImage] = useState<string>('');

  useEffect(() => {
    const userName = mmkv.getString('userImage') as string;
    setUserImage(userName);
  }, []);

  const handleNewIntake = () => {
    navigation.navigate('VoiceToText', { patient: patient });
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

  return (
    <PatientDetails
      userImage={userImage}
      patient={patient}
      activeTab={activeTab}
      onNewIntakePress={handleNewIntake}
      onStartConsultationPress={handleStartConsultation}
      onCoPilotPress={handleCoPilot}
      onChangeTab={onChangeTab}
    />
  );
};

export default PatientDetailScreen;
