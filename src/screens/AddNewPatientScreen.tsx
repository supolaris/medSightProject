import React, { useState } from 'react';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { showToast, userLogout } from '../utils/CommonFunctions';
import { AppMessages } from '../constants/AppMessages';
import AddNewPatient from '../components/AddNewPatient';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { requestCameraPermission } from '../utils/PermissionsUtils';
import moment from 'moment';

const AddNewPatientScreen = ({
  navigation,
}: MainStackScreenProps<'AddNewPatient'>) => {
  const [form, setForm] = useState({
    familyName: '',
    givenName: '',
    birthDate: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: '',
  });
  const [userImage, setUserImage] = useState<string>('');
  const [isImageSelectionPopupVisible, setIsImageSelectionPopupVisible] =
    useState<boolean>(false);
  const [isAlertPopupVisible, setIsAlertPopupVisible] =
    useState<boolean>(false);
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);

  // const handleDateChange = (event: any, selectedDate?: Date) => {
  //   setShowDatePicker(false);
  //   if (selectedDate) {
  //     setForm({ ...form, birthDate: selectedDate.toISOString().split('T')[0] });
  //   }
  // };

  // Save Button.....................
  const handleSave = () => {
    if (!form.familyName || !form.givenName || !form.contact) {
      showToast('Please fill all inputs');
    } else {
      setIsAlertPopupVisible(true);
    }
    //save logic here (API call)
  };

  // Back Button
  const onBackButtonPressed = () => {
    navigation.navigate('Patients');
  };

  const onChangeImagePressed = async (flag: number) => {
    try {
      let options: {
        maxWidth: number;
        maxHeight: number;
        mediaType: MediaType;
        includeBase64: boolean;
      } = {
        maxWidth: 300,
        maxHeight: 300,
        mediaType: 'photo',
        includeBase64: false,
      };
      if (flag === 1) {
        console.warn('here');
        launchImageLibrary(options, (res) => {
          // console.log('response', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.errorCode) {
            console.warn('err');
          } else {
            // console.log('response', res);
            if (res.assets && res.assets?.length > 0) {
              const imageUri = res.assets?.[0]?.uri;
              if (imageUri) {
                setIsImageSelectionPopupVisible(false);
                setUserImage(imageUri);
              }
            }
          }
        });
      } else {
        const isCameraPermissionGranted = await requestCameraPermission();
        if (isCameraPermissionGranted) {
          launchCamera(options, (res) => {
            if (res.didCancel) {
            } else if (res.errorCode) {
            } else {
              if (res.assets && res.assets?.length > 0) {
                const imageUri = res.assets?.[0]?.uri;
                if (imageUri) {
                  setIsImageSelectionPopupVisible(false);
                  setUserImage(imageUri);
                }
              }
            }
          });
        } else {
          showToast(AppMessages.cameraPermissionNotGranted);
        }
      }
    } catch (err) {
      console.warn('err:', err);
    }
  };

  const onImageSelectionOptionPressed = (selectionValue: number) => {
    onChangeImagePressed(selectionValue);
  };

  const onImageSelectionPopupClose = () => {
    setIsImageSelectionPopupVisible(false);
  };
  const onImageSelectPressed = () => {
    setIsImageSelectionPopupVisible(true);
  };

  const onAlertPopupCancelPressed = () => {
    setIsAlertPopupVisible(false);
  };

  const onAlertPopupConfirmPressed = () => {
    setIsAlertPopupVisible(false);
    navigation.navigate('Patients');
  };

  const onConfirmDatePicker = (date: any) => {
    const selectedDate = moment(date);
    const convertedISO = selectedDate.toISOString();
    setForm({ ...form, birthDate: convertedISO });
    setIsDatePickerVisible(false);
  };

  const onCancelDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const onPressDOBPicker = () => {
    setIsDatePickerVisible(true);
  };

  const onMenuPressed = () => {
    navigation.navigate('SideMenu');
  };

  const onHeaderSettingsPressed = async () => {
    const result = userLogout();
    if (result) {
      navigation.replace('Splash');
    } else {
      showToast(AppMessages.wentWrong);
    }
  };

  return (
    <AddNewPatient
      form={form}
      userImage={userImage}
      isAlertPopupVisible={isAlertPopupVisible}
      isDatePickerVisible={isDatePickerVisible}
      isImageSelectionPopupVisible={isImageSelectionPopupVisible}
      setForm={setForm}
      handleSave={handleSave}
      onPressDOBPicker={onPressDOBPicker}
      onCancelDatePicker={onCancelDatePicker}
      onBackButtonPressed={onBackButtonPressed}
      onConfirmDatePicker={onConfirmDatePicker}
      onImageSelectPressed={onImageSelectPressed}
      onAlertPopupCancelPressed={onAlertPopupCancelPressed}
      onImageSelectionPopupClose={onImageSelectionPopupClose}
      onAlertPopupConfirmPressed={onAlertPopupConfirmPressed}
      onImageSelectionOptionPressed={onImageSelectionOptionPressed}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
      onMenuPressed={onMenuPressed}
      //
    />
  );
};

export default AddNewPatientScreen;
