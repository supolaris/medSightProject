import { StackScreenProps } from '@react-navigation/stack';
import { IMyPatientItems } from './CommonTypes';

export type RootStackParamList = {
  Splash: undefined;
  OnBoarding: undefined;
  Login: undefined;
  VoiceToText: {
    patient: IMyPatientItems;
  };
  Patients: undefined;
  PatientDetails: {
    patient: IMyPatientItems;
  };
  AddNewPatient: undefined;
};

export type MainStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
