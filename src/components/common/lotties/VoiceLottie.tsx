import React, { RefObject } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { activeOpacity } from '../../../utils/CommonFunctions';

interface IProps {
  lottieRef: RefObject<LottieView>;
  onVoiceRecordPressed: () => void;
}

export const VoiceLottie = (props: IProps) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={props.onVoiceRecordPressed}>
      <LottieView
        ref={props.lottieRef}
        autoPlay={false}
        loop
        style={styles.lottie}
        source={require('../../../assets/lotties/wavesLottie.json')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
