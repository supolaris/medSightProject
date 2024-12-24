import React, { useEffect } from 'react';
import Splash from '../components/Splash';
import { MainStackScreenProps } from '../@types/NavigationTypes';

const SplashScreen = ({ navigation }: MainStackScreenProps<'Splash'>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <Splash />;
};

export default SplashScreen;
