import React from 'react';
import { SafeAreaView } from 'react-native';
import PatientDetails from '../components/PatientDetails';
import { MainStackScreenProps } from '../@types/NavigationTypes';

const PatientDetailScreen = ({
  route,
  navigation,
}: MainStackScreenProps<'PatientDetails'>) => {
  const { patients } = route.params;

  console.log('first,', patients);
  const handleNewIntake = () => {
    console.log('New Intake pressed');
  };

  const handleStartConsultation = () => {
    console.log('Start Consultation pressed');
  };

  const handleCoPilot = () => {
    console.log('Co-Pilot pressed');
  };

  return (
    <PatientDetails
      patient={patients}
      onNewIntakePress={handleNewIntake}
      onStartConsultationPress={handleStartConsultation}
      onCoPilotPress={handleCoPilot}
    />
  );
};

export default PatientDetailScreen;
