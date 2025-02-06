import React, { useEffect, useState } from 'react';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import moment from 'moment';
import { AppMessages } from '../constants/AppMessages';
import AddNewPatient from '../components/AddNewPatient';
import { showToast, userLogout } from '../utils/CommonFunctions';
import { MainStackScreenProps } from '../@types/NavigationTypes';
import { addNewPatientService } from '../utils/MyPatientServices';
import { requestCameraPermission } from '../utils/PermissionsUtils';

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isImageSelectionPopupVisible, setIsImageSelectionPopupVisible] =
    useState<boolean>(false);
  const [isAlertPopupVisible, setIsAlertPopupVisible] =
    useState<boolean>(false);
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);

  // Save Button.....................
  const handleSave = () => {
    if (!form.familyName || !form.givenName || !form.contact) {
      showToast('Please fill all inputs');
    } else {
      setIsAlertPopupVisible(true);
    }
    //save logic here (API call)
  };

  const savePatient = async () => {
    try {
      setIsVisible(true);
      const data = {
        name: [
          {
            use: 'official',
            text: `${form.givenName} ${form.familyName}`,
            family: form.familyName,
            given: [form.givenName],
            prefix: ['Mr.'],
            suffix: ['Jr.'],
          },
        ],
        telecom: [
          {
            system: 'phone',
            value: form.contact,
            use: 'home',
            rank: 1,
          },
          {
            system: 'email',
            value: form.contact,
            use: 'work',
            rank: 2,
          },
        ],
        gender: 'male',
        birthDate: moment(form.birthDate).format('YYYY-MM-DD'),
        address: [
          {
            use: 'home',
            type: 'physical',
            text: `${form.address}, ${form.city}, ${form.state} ${form.postal}`,
            line: [form.address],
            city: form.city,
            district: 'TestDistrict',
            state: form.state,
            postalCode: form.postal,
            country: form.country,
          },
        ],
      };
      const response = await addNewPatientService(data);
      console.log('add patient response', response);
      if (response.status === 201) {
        navigation.replace('Patients', {
          flow: 'patientAdded',
        });
      }
    } catch (error) {
      console.log('error in saving patient');
      showToast(AppMessages.wentWrong);
    } finally {
      setIsVisible(false);
    }
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
    savePatient();
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
      isVisible={isVisible}
      userImage={userImage}
      isAlertPopupVisible={isAlertPopupVisible}
      isDatePickerVisible={isDatePickerVisible}
      isImageSelectionPopupVisible={isImageSelectionPopupVisible}
      setForm={setForm}
      handleSave={handleSave}
      onMenuPressed={onMenuPressed}
      onPressDOBPicker={onPressDOBPicker}
      onCancelDatePicker={onCancelDatePicker}
      onBackButtonPressed={onBackButtonPressed}
      onConfirmDatePicker={onConfirmDatePicker}
      onImageSelectPressed={onImageSelectPressed}
      onHeaderSettingsPressed={onHeaderSettingsPressed}
      onAlertPopupCancelPressed={onAlertPopupCancelPressed}
      onImageSelectionPopupClose={onImageSelectionPopupClose}
      onAlertPopupConfirmPressed={onAlertPopupConfirmPressed}
      onImageSelectionOptionPressed={onImageSelectionOptionPressed}
      //
    />
  );
};

export default AddNewPatientScreen;
