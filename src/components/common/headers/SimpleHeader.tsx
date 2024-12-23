import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { AppColors } from '../../../constants/AppColors';
import CustomText from '../texts/CustomText';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';

interface ISimpleHeaderProps {
  showBackIcon: boolean;
  showSettingsIcon: boolean;
  title: string;
  onHeaderBackPressed?: () => void;
  onHeaderSettingsPressed?: () => void;
}

const SimpleHeader = (props: ISimpleHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={props.onHeaderBackPressed}>
          <Image
            style={styles.backArrow}
            source={require('../../../assets/images/backArrow.png')}
          />
        </TouchableOpacity>
        {/* <CustomText
          preset={{
            text: `${props.title}`,
            color: AppColors.black,
            fontSize: 15,
            fontWeight: 'semiBold',
          }}
          style={{
            textAlign: 'center',
          }}
        /> */}

        <Image
          style={styles.HeaderImage}
          source={require('../../../assets/images/HeaderImage.png')}
        />
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={props.onHeaderSettingsPressed}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Image
                style={styles.dp}
                source={require('../../../assets/images/profImage.png')}
              />
            </View>
            <View style={{ marginLeft: 3 }}>
              <Text style={{ color: '#12AAC2', fontSize: 8 }}>John Doe</Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 8,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Logout{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    marginBottom: 10,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    // width: '10%',
    position: 'absolute',
    left: 0,
    top: 18,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  HeaderImage: {
    width: 51,
    height: 43,
  },
  backArrow: {
    width: 22,
    height: 18,
    alignSelf: 'center',
  },
  dp: {
    width: 29,
    height: 29,
    alignSelf: 'center',
  },
});
