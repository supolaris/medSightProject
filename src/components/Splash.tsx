import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import CustomText from './common/texts/CustomText';
import { AppColors } from '../constants/AppColors';

const Splash = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
        source={require('../assets/images/common/appBackground.webp')}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              resizeMode="contain"
              style={styles.logoImage}
              source={require('../assets/images/common/logoName.webp')}
            />

            <View style={styles.textView}>
              <CustomText
                preset={{
                  text: 'Empowering healthcare with AI technology',
                  color: AppColors.black,
                  fontSize: 18,
                  fontWeight: 'regular',
                }}
                style={{
                  textAlign: 'center',
                }}
              />
            </View>

            <CustomText
              preset={{
                text: 'Ver 0.1',
                color: AppColors.black,
                fontSize: 13,
                fontWeight: 'regular',
              }}
              style={{
                position: 'absolute',
                bottom: 10,
                textAlign: 'center',
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: 100,
    width: 100,
  },
  textView: {
    width: '80%',
  },
});
