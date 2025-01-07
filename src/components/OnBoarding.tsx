// import React, { memo, RefObject } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { widthPercentageToDP } from 'react-native-responsive-screen';
// import CustomText from './common/texts/CustomText';
// import { AppColors } from '../constants/AppColors';
// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { IonBoardingData } from '../@types/CommonTypes';
// import CustomTouchable from './common/touchables/CustomTouchable';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { activeOpacity } from '../utils/CommonFunctions';
// import LoadingPopup from './common/popups/LoadingPopup';

// interface IProps {
//   isLoading: boolean;
//   currentIndex: number;
//   renderedScreen: number;
//   scrollRef: RefObject<FlatList>;
//   onBoardingData: IonBoardingData[];
//   onSkipPressed: () => void;
//   onGetStartedPressed: () => void;
//   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
// }
// const OnBoarding = (props: IProps) => {
//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: IonBoardingData;
//     index: number;
//   }) => {
//     const isLastItem = index === props.onBoardingData.length - 1;
//     return (
//       <ImageBackground
//         resizeMode="stretch"
//         style={{
//           flex: 1,
//         }}
//         source={require('../assets/images/common/appBackground.webp')}>
//         <View style={styles.container}>
//           <View style={styles.innerContainer}>
//             <Image
//               resizeMode="contain"
//               style={styles.logoImage}
//               source={require('../assets/images/common/logoName.webp')}
//             />

//             <View style={styles.textView}>
//               <CustomText
//                 preset={{
//                   text: 'Empowering healthcare with AI technology',
//                   color: AppColors.black,
//                   fontSize: 18,
//                   fontWeight: 'regular',
//                 }}
//                 style={{
//                   textAlign: 'center',
//                 }}
//               />
//             </View>

//             <Image
//               resizeMode="cover"
//               style={styles.mainImage}
//               source={item.image}
//             />

//             <View style={styles.textView}>
//               <CustomText
//                 preset={{
//                   text: item.description,
//                   color: AppColors.primaryColor,
//                   fontSize: 18,
//                   fontWeight: 'medium',
//                 }}
//                 style={{
//                   textAlign: 'center',
//                 }}
//               />
//             </View>

//             <View style={styles.dotsContainer}>
//               {props.onBoardingData.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.dot,
//                     props.currentIndex === index && styles.activeDot,
//                   ]}
//                 />
//               ))}
//             </View>
//             {!isLastItem && (
//               <TouchableOpacity
//                 activeOpacity={activeOpacity}
//                 style={styles.skipView}
//                 onPress={props.onSkipPressed}>
//                 <CustomText
//                   preset={{
//                     text: 'Skip',
//                     color: AppColors.secondaryTextColor,
//                     fontSize: 18,
//                     fontWeight: 'regular',
//                   }}
//                   style={{
//                     textAlign: 'center',
//                     marginRight: 5,
//                   }}
//                 />
//                 <AntDesign
//                   style={{
//                     paddingTop: 2,
//                   }}
//                   name="arrowright"
//                   size={18}
//                   color={AppColors.primaryColor}
//                 />
//               </TouchableOpacity>
//             )}
//             {isLastItem && (
//               <CustomTouchable
//                 preset={{
//                   text: "Let's Get Started",
//                   variant: 'primary',
//                   fontSize: 18,
//                   fontWeight: 'medium',
//                   textColor: AppColors.white,
//                 }}
//                 style={styles.getStartedButton}
//                 onPress={props.onGetStartedPressed}
//               />
//             )}
//           </View>
//         </View>
//       </ImageBackground>
//     );
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}>
//       <LoadingPopup isVisible={props.isLoading} />
//       <View
//         style={{
//           flex: 1,
//         }}>
//         <FlatList
//           horizontal
//           pagingEnabled
//           ref={props.scrollRef}
//           data={props.onBoardingData}
//           showsHorizontalScrollIndicator={false}
//           onScroll={props.onScroll}
//           renderItem={renderItem}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default memo(OnBoarding);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//     width: widthPercentageToDP(100),
//   },
//   innerContainer: {
//     flex: 1,
//     width: '90%',
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   logoImage: {
//     height: 100,
//     width: 100,
//   },
//   textView: {
//     width: '80%',
//   },
//   mainImage: {
//     width: 250,
//     height: 250,
//     marginVertical: 40,
//   },
//   skipView: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     position: 'absolute',
//     bottom: 15,
//     right: 15,
//   },
//   getStartedButton: {
//     position: 'absolute',
//     textTransform: 'capitalize',
//     bottom: 0,
//     borderRadius: 0,
//     width: widthPercentageToDP(100),
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 60,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 10,
//     backgroundColor: 'gray',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: AppColors.primaryColor,
//   },
// });

import React, { memo, RefObject } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import CustomText from './common/texts/CustomText';
import { AppColors } from '../constants/AppColors';
import {
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { IonBoardingData } from '../@types/CommonTypes';
import CustomTouchable from './common/touchables/CustomTouchable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { activeOpacity } from '../utils/CommonFunctions';
import LoadingPopup from './common/popups/LoadingPopup';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface IProps {
  isLoading: boolean;
  currentIndex: number;
  renderedScreen: number;
  scrollRef: RefObject<FlatList>;
  onBoardingData: IonBoardingData[];
  onSkipPressed: () => void;
  onGetStartedPressed: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
const OnBoarding = (props: IProps) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: IonBoardingData;
    index: number;
  }) => {
    const isLastItem = index === props.onBoardingData.length - 1;
    return (
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

            <Image
              resizeMode="cover"
              style={styles.mainImage}
              source={item.image}
            />

            <View style={styles.textView}>
              <CustomText
                preset={{
                  text: item.description,
                  color: AppColors.primaryColor,
                  fontSize: 18,
                  fontWeight: 'medium',
                }}
                style={{
                  textAlign: 'center',
                }}
              />
            </View>

            <View style={styles.dotsContainer}>
              {props.onBoardingData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    props.currentIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
            {!isLastItem && (
              <TouchableOpacity
                activeOpacity={activeOpacity}
                style={styles.skipView}
                onPress={props.onSkipPressed}>
                <CustomText
                  preset={{
                    text: 'Skip',
                    color: AppColors.secondaryTextColor,
                    fontSize: 18,
                    fontWeight: 'regular',
                  }}
                  style={{
                    textAlign: 'center',
                    marginRight: 5,
                  }}
                />
                <Image
                  style={{
                    width: 5,
                    height: 1.5,
                    alignSelf: 'center',
                    top: 10,
                  }}
                  source={require('../assets/images/backArrow.png')}
                />
                <AntDesign
                  style={{ paddingBottom: 5 }}
                  name="arrowright"
                  size={18}
                  color={AppColors.primaryColor}
                />
              </TouchableOpacity>
            )}
            {isLastItem && (
              <LinearGradient
                colors={['#3681C3', '#0397A8']} // Gradient colors
                style={styles.getStartedButton} // Apply gradient only to button container
                start={{ x: 0, y: 0 }} // Gradient starts from the left
                end={{ x: 1, y: 0 }} // Gradient ends to the right (horizontal gradient)
              >
                <View style={styles.getStartedButtonContainer}>
                  <TouchableOpacity onPress={props.onGetStartedPressed}>
                    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>
                      Let's Get Started
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <LoadingPopup isVisible={props.isLoading} />
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          horizontal
          pagingEnabled
          ref={props.scrollRef}
          data={props.onBoardingData}
          showsHorizontalScrollIndicator={false}
          onScroll={props.onScroll}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(OnBoarding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    width: widthPercentageToDP(100),
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: 100,
    width: 100,
  },
  textView: {
    width: '80%',
  },
  mainImage: {
    width: 250,
    height: 250,
    marginVertical: 40,
  },
  skipView: {
    flexDirection: 'row',
    alignItems: 'baseline',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  // getStartedButton: {
  //   position: 'absolute',
  //   textTransform: 'capitalize',
  //   bottom: 0,
  //   borderRadius: 0,
  //   width: widthPercentageToDP(100),
  // },
  getStartedButton: {
    position: 'absolute',
    textTransform: 'capitalize',
    bottom: 0,
    borderRadius: 0,
    width: widthPercentageToDP(100), // Full width of the screen
    height: 52, // Increase height for better visibility
    justifyContent: 'center',
    alignItems: 'center', // Center the text horizontally and vertically
    borderWidth: 2,
    borderColor: 'black',
  },
  getStartedButtonContainer: {
    flex: 1,
    justifyContent: 'center', // Center text vertically inside the container
    alignItems: 'center', // Center text horizontally inside the container
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: AppColors.primaryColor,
  },
});
