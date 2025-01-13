import axios from 'axios';
import { baseUrl, microsoftUserDetailBaseUrl, requestTimeout } from './Config';

export const getRequest = async (endPoint: string) => {
  console.log('Api endpoint', baseUrl + endPoint);
  console.log('get global.token from get request', global.token);
  let _baseUrl = baseUrl;
  const response = await axios({
    url: `${_baseUrl}${endPoint}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${global.token}`,
    },
    timeout: requestTimeout,
  });

  return response;
};

export const getMicrosoftImageRequest = async (endPoint: string) => {
  const response = await axios({
    url: `${microsoftUserDetailBaseUrl}${endPoint}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${global.graphToken}`,
    },
    responseType: 'arraybuffer',
    timeout: requestTimeout,
  });

  return response;
};

export const getUserDetailsRequest = async () => {
  const response = await axios({
    url: `${microsoftUserDetailBaseUrl}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${global.graphToken}`,
    },
    timeout: requestTimeout,
  });

  return response;
};
