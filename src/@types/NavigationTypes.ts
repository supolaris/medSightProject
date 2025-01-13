import { StackScreenProps } from '@react-navigation/stack';
import { IMyPatientItems } from './CommonTypes';

export type MainStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  Walkthrough: undefined;
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
  SideMenu: undefined;
  Configuration: undefined;
  Legal: undefined;
};
