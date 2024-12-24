import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './NavigationTypes';

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
