import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import OnBoarding from '../components/OnBoarding';
import { onBoardingData } from '../constants/StaticData';
import { MicrosoftConfiguration } from '../utils/Config';
import { authorize } from 'react-native-app-auth';
import { MainStackScreenProps } from '../@types/NavigationTypes';

let currentIndex = 0;
const OnBoardingScreen = ({
  navigation,
}: MainStackScreenProps<'OnBoarding'>) => {
  const scrollRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderedScreen, setRenderedScreen] = useState<number>(0);

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
    if (currentIndex < 2) {
      currentIndex++;
      scrollRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
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
      if (authResponse.accessToken) {
        navigation.replace('VoiceToText');
      }
    } catch (error) {
      console.log('error in microsoft login', error);
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
