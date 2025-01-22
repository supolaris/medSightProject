import { StackScreenProps } from '@react-navigation/stack';
import { IMyPatientItems } from './CommonTypes';
import { IGetPatientDetailsResponse } from './ApiResponses';

export type MainStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  EditScreen: undefined;
  Walkthrough: undefined;
  Splash: undefined;
  OnBoarding: undefined;
  Login: undefined;
  VoiceToText: {
    userDetails: IGetPatientDetailsResponse | null;
  };
  Patients: {
    flow?: string;
  };
  PatientDetails: {
    patient: IMyPatientItems;
  };
  AddNewPatient: undefined;
  SideMenu: undefined;
  Configuration: undefined;
  Legal: undefined;
};
