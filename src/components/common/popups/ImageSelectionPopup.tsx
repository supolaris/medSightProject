import React, { memo } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomText from '../texts/CustomText';
import { AppColors } from '../../../constants/AppColors';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { activeOpacity, borderRadius } from '../../../utils/CommonFunctions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  isImageSelectionPopupVisible: boolean;
  onImageSelectionPopupClose: () => void;
  onImageSelectionOptionPressed: (value: number) => void;
}

const ImageSelectionPopup = (props: IProps) => {
  return (
    <Modal
      transparent={true}
      visible={props.isImageSelectionPopupVisible}
      onRequestClose={props.onImageSelectionPopupClose}>
      <TouchableWithoutFeedback onPress={props.onImageSelectionPopupClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer}>
              <View style={styles.horizontalLine}></View>
              <View style={styles.detailedView}>
                <TouchableOpacity
                  activeOpacity={activeOpacity}
                  style={[
                    styles.buttonTouchable,
                    {
                      marginBottom: 8,
                    },
                  ]}
                  onPress={() => props.onImageSelectionOptionPressed(1)}>
                  <Ionicons
                    style={{
                      marginRight: 10,
                    }}
                    size={20}
                    name="images-outline"
                    color={AppColors.black}
                  />

                  <CustomText
                    preset={{
                      text: 'Upload from gallery',
                      fontSize: 14,
                      color: AppColors.black,
                      fontWeight: 'regular',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={activeOpacity}
                  style={styles.buttonTouchable}
                  onPress={() => props.onImageSelectionOptionPressed(2)}>
                  <Feather
                    style={{
                      marginRight: 10,
                    }}
                    size={20}
                    name="camera"
                    color={AppColors.black}
                  />

                  <CustomText
                    preset={{
                      text: 'Open Camera',
                      fontSize: 14,
                      color: AppColors.black,
                      fontWeight: 'regular',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(ImageSelectionPopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: AppColors.transparentBg,
  },
  innerContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: borderRadius,
    backgroundColor: AppColors.white,
    height: heightPercentageToDP(25),
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  horizontalLine: {
    height: 5,
    width: '20%',
    alignSelf: 'center',
    backgroundColor: AppColors.black,
    borderRadius: borderRadius,
  },
  detailedView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonTouchable: {
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: borderRadius,
    backgroundColor: AppColors.white,
  },
});
