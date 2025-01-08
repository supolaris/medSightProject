import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import OnBoarding from '../components/OnBoarding';
import { onBoardingData } from '../constants/StaticData';

import { authorize } from 'react-native-app-auth';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { MicrosoftConfiguration, showToast } from '../utils/CommonFunctions';
import { AppMessages } from '../constants/AppMessages';

let currentIndex = 0;
const OnBoardingScreen = ({
  navigation,
}: MainStackScreenProps<'OnBoarding'>) => {
  const scrollRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderedScreen, setRenderedScreen] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    currentIndex = 0;
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = widthPercentageToDP(100);
    currentIndex = Math.round(contentOffsetX / itemWidth);
    setRenderedScreen(currentIndex);
  };

  const onSkipPressed = () => {
    const lastIndex = onBoardingData.length - 1;
    scrollRef.current?.scrollToIndex({
      index: lastIndex,
      animated: true,
    });
    currentIndex = lastIndex;
    setRenderedScreen(currentIndex);
  };

  const onMicrosoftLoginPressed = async () => {
    try {
      setIsLoading(true);
      let provider = 'identifyServer';
      const config = MicrosoftConfiguration[provider];
      let authResponse = await authorize({
        ...config,
        connectionTimeoutSeconds: 5,
        iosPrefersEphemeralSession: true,
      });
      if (authResponse?.idToken) {
        global.token = authResponse?.accessToken;
        navigation.replace('Patients');
      } else {
        showToast(AppMessages.wentWrong);
      }
    } catch (error) {
      console.log('error in microsoft login ', error);
      showToast(AppMessages.wentWrong);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnBoarding
      isLoading={isLoading}
      currentIndex={currentIndex}
      scrollRef={scrollRef}
      renderedScreen={renderedScreen}
      onBoardingData={onBoardingData}
      onScroll={onScroll}
      onSkipPressed={onSkipPressed}
      onGetStartedPressed={onMicrosoftLoginPressed}
    />
  );
};

export default OnBoardingScreen;
