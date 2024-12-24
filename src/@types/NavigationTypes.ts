import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  OnBoarding: undefined;
  Login: undefined;
  VoiceToText: undefined;
};

export type MainStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
