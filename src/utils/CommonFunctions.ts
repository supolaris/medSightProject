import { Dimensions, Linking, PixelRatio, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { CLIENT_ID, TENANT_ID } from './Config';
import { AxiosError } from 'axios';
import { revoke } from 'react-native-app-auth';

export const borderRadius = 10;
export const activeOpacity = 0.5;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const bottomInset = initialWindowMetrics?.insets?.bottom ?? 0;
const scale = SCREEN_WIDTH / 393;
const scaleVertical = (SCREEN_HEIGHT - bottomInset) / 852;

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
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  },
  auth0: {
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    clientId: CLIENT_ID,
    redirectUrl: 'com.medsightai.android01://oauth/auth/',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'phone', 'address', 'User.Read'],
    revocationEndpoint: `https://logout.microsoftonline.com/${TENANT_ID}/oauth2/v2.0`,
  },
};
