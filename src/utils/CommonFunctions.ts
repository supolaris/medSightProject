import moment from 'moment';
import { AxiosError } from 'axios';
import { MMKV } from 'react-native-mmkv';
import Toast from 'react-native-simple-toast';
import { CLIENT_ID, TENANT_ID } from './Config';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export const borderRadius = 10;
export const activeOpacity = 0.5;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const bottomInset = initialWindowMetrics?.insets?.bottom ?? 0;
const scale = SCREEN_WIDTH / 393;
const scaleVertical = (SCREEN_HEIGHT - bottomInset) / 852;

export const mmkv = new MMKV();

export const normalizeWidth = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const normalizeFont = (size: number, factor = 0.5) => {
  return size + (normalizeWidth(size) - size) * factor;
};

export const normalizeHeight = (size: number) => {
  const newSize = size * scaleVertical;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const getErrorData = (e: unknown) => {
  try {
    if (e instanceof AxiosError && e?.response?.data?.result) {
      console.log(e?.response?.data?.result?.toLowerCase());
      return e?.response?.data?.result?.toLowerCase();
    }
  } catch (e) {}
};

export const formatDateOfBirth = (inputDate: string) => {
  return moment(inputDate).format('DD/MM/YYYY');
};

export const calculateAge = (dob: string) => {
  const birthYear = moment(dob).year();
  const currentYear = moment().year();
  return currentYear - birthYear;
};

export const showToast = (message: string) => {
  Toast.show(message, Toast.LONG);
};

export const MicrosoftConfiguration: any = {
  identifyServer: {
    serviceConfiguration: {
      authorizationEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
    clientId: CLIENT_ID,
    redirectUrl: 'com.medsightai.android01://oauth/auth/',
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      'api://425036b3-c61f-49ac-9f22-7a643e1def26/access_as_user',
      'User.Read',
      'User.ReadBasic.All',
    ],
    additionalParameters: {
      prompt: 'select_account',
    },
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    revocationEndpoint: `https://logout.microsoftonline.com/${TENANT_ID}/oauth2/v2.0`,
  },
};

export const MicrosoftGraphConfiguration: any = {
  identifyServer: {
    serviceConfiguration: {
      authorizationEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
    clientId: CLIENT_ID,
    redirectUrl: 'com.medsightai.android01://oauth/auth/',
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      'User.Read',
      'User.ReadBasic.All',
    ],
    additionalParameters: {
      prompt: 'select_account',
    },
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    revocationEndpoint: `https://logout.microsoftonline.com/${TENANT_ID}/oauth2/v2.0`,
  },
};

export const userLogout = () => {
  try {
    mmkv.clearAll();
    // mmkv.set('userToken', '');
    // mmkv.set('userGraphToken', '');
    // mmkv.set('userImage', '');
    // mmkv.set('userName', '');
    return true;
  } catch (error) {
    console.log('error in logout');
    return false;
  }
};

export const checkTokenValidity = (): boolean => {
  try {
    const authToken = mmkv.getString('userToken') as string;
    const expirationTime = mmkv.getString('tokenExpirationTime');
    if (!expirationTime) {
      console.log('No expiration time found, redirect to login');
      return false;
    }
    const currentTime = moment().utc();
    const tokenExpiryTime = moment(expirationTime);
    if (tokenExpiryTime.isAfter(currentTime)) {
      console.log('token expiration time remaining');
      global.token = authToken;
      return true;
    } else {
      console.log('Token expired, redirect to login');
      return false;
    }
  } catch (error) {
    console.log('Error while checking token validity:', error);
    return false;
  }
};
